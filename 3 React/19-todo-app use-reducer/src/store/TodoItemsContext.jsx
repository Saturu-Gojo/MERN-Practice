import { createContext, useState } from "react";
import initialTodoItems from "./InitialTodoItems";
import TodoItemsReducer from "./TodoItemsReducer";
import { useReducer } from "react";

export const TodoItemsContext = createContext();

export const TodoItemsProvider = ({children}) => {

  const [todoItems, dispatch] = useReducer(TodoItemsReducer, initialTodoItems);

  const addTodoItem = (todoText, todoDate) => {
    dispatch({
      type: 'Add-Item',
      payload:{
        todoText, todoDate
      }
    })
  }

  const deleteTodoItem = (todoId) => {
    dispatch({
      type: 'Delete-Item',
      payload:{
        todoId
      }
    })
  }

  return <TodoItemsContext.Provider value={{todoItems, addTodoItem, deleteTodoItem}}>
    {children}
  </TodoItemsContext.Provider>
}