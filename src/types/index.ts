export interface TodoRequest {
  name: string;
  description: string;
  cost?: number;
  parentId?: number;
  completed?: boolean;
}

export interface TodoResponse {
  id: number;
  name: string;
  description: string;
  cost: number;
  parentId: number;
  completed: boolean;
  children: TodoResponse[];
}
