import { ADD_TODO, EDIT_TODO, REMOVE_TODO, DELETE_TODO } from "../Actiontypes";

export const AddTodo = (payload) => ({
  type: ADD_TODO,
  payload: { ...payload },
});
export const RemoveTodo = (payload) => ({
  type: REMOVE_TODO,
  payload: { ...payload },
});
export const EditTodo = (payload) => ({
  type: EDIT_TODO,
  payload: { ...payload },
});
export const DeleteTodo = (payload) => ({
  type: DELETE_TODO,
  payload: { ...payload },
});
