import AsyncStorage from "@react-native-async-storage/async-storage";
import { ADD_TODO, DELETE_TODO, EDIT_TODO, REMOVE_TODO } from "../Actiontypes";

const initialState = {
  todo: [],
};

const TodoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      const newTodoList = [...state.todo, action.payload];
      AsyncStorage.setItem("todo", JSON.stringify(newTodoList));
      return {
        ...state,
        todo: newTodoList,
      };
    case REMOVE_TODO:
      const { id } = action.payload;
      const updatedTodo = state.todo.filter((todo) => todo.id != id);
      AsyncStorage.setItem("todo", JSON.stringify(updatedTodo));
      return {
        ...state,
        todo: updatedTodo,
      };
    case DELETE_TODO:
      const updatedTodos = state.todo.filter(
        (todo) => todo.id !== action.payload
      );
      AsyncStorage.setItem("todo", JSON.stringify(updatedTodos));
      return { ...state, todo: updatedTodos };
    case EDIT_TODO:
      const updatedTodoList = state.todo.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            text: action.payload.text,
            date: action.payload.date,
            status: action.payload.status,
          };
        }
        return todo;
      });
      AsyncStorage.setItem("todo", JSON.stringify(updatedTodoList));
      return {
        ...state,
        todo: updatedTodoList,
      };
    default:
      AsyncStorage.getItem("todo").then((value) => {
        if (value !== null) {
          state = {
            ...state,
            todo: JSON.parse(value),
          };
        }
      });
      return state;
  }
};

export default TodoReducer;
