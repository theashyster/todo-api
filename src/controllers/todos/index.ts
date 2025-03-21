import { Request, Response } from 'express';
import { Todo } from '../../entity/todo';
import { TodoRequest, TodoResponse } from '../../types';
import { TODO_NOT_FOUND } from '../../utils/constants';

const findTodo = async (req: Request): Promise<Todo | null> => {
  const id = Number(req.params.id);
  return Todo.findOneBy({ id });
};

const filterChildren = (todos: Todo[], id: number | null): TodoResponse[] => {
  return todos
    .filter((todo) => todo.parentId === id)
    .map((todo) => ({ ...todo, children: filterChildren(todos, todo.id) } as TodoResponse));
};

export const getTodos = async (req: Request, res: Response): Promise<void> => {
  const parentId = req.query.parentId ? Number(req.query.parentId) : null;
  const todos = await Todo.find({ order: { id: 'ASC' } });
  const tree = filterChildren(todos, parentId);

  res.status(200).json(tree);
};

export const getTodo = async (req: Request, res: Response): Promise<void> => {
  const todo = await findTodo(req);

  if (todo) {
    res.status(200).json(todo);
  } else {
    res.status(404).json({ message: TODO_NOT_FOUND });
  }
};

export const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<TodoRequest, 'name' | 'description' | 'cost' | 'parentId'>;

    const todo = new Todo();
    todo.name = body.name;
    todo.description = body.description;
    todo.cost = body.cost;
    todo.parentId = body.parentId;

    await todo.save();

    res.status(201).json(todo);
  } catch (error: any) {
    res.status(400).json({ message: 'Something went wrong' });
  }
};

export const updateTodo = async (req: Request, res: Response): Promise<void> => {
  const todo = await findTodo(req);

  if (todo) {
    const body = req.body as Partial<Pick<TodoRequest, 'name' | 'description' | 'cost' | 'completed'>>;

    if (body.name !== undefined && body.name !== '') {
      todo.name = body.name;
    }

    if (body.description !== undefined && body.description !== '') {
      todo.description = body.description;
    }

    if (body.cost !== undefined) {
      todo.cost = body.cost;
    }

    if (body.completed !== undefined) {
      todo.completed = body.completed;
    }

    await todo.save();

    res.status(200).json(todo);
  } else {
    res.status(404).json({ message: TODO_NOT_FOUND });
  }
};

export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  const todo = await findTodo(req);

  if (todo) {
    await todo.remove();

    res.status(204).send();
  } else {
    res.status(404).json({ message: TODO_NOT_FOUND });
  }
};
