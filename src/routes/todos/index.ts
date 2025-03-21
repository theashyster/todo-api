import { Router } from 'express';
import { addTodo, deleteTodo, getTodo, getTodos, updateTodo } from '../../controllers/todos';
import { TODO_ROUTE } from '../../utils/constants';

const router = Router();

router.get(TODO_ROUTE, getTodos);
router.get(`${TODO_ROUTE}/:id(\\d+)`, getTodo);
router.post(TODO_ROUTE, addTodo);
router.put(`${TODO_ROUTE}/:id(\\d+)`, updateTodo);
router.delete(`${TODO_ROUTE}/:id(\\d+)`, deleteTodo);

export default router;
