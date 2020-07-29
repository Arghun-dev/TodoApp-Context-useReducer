# TodoApp-Context-useReducer

Here, we're gonna create a store just like `Redux` using `useReducer` hook in `context` to manage our state in App

## TodoApp

Here we're gonna define out `Todo Reducer`.

Create a folder called `reducers` and inside that create a file called `Todos.reducer.js`

todos.reducer.js
```js 
import uuid from "uuid/v4";

export const todosReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, { id: uuid(), newTodo: action.payload, completed: false }]
    case 'REMOVE':
      return state.filter(todo => todo.id !== action.payload)
    case 'TOGGLE':
      return state.map(todo => todo.id === action.payload ? { ...todo, completed: !todo.completed }) : todo
    case 'EDIT':
      return state.map(todo => todo.id === action.payload ? { ...todo, newTodo: action.payload }) : todo
    default: return state
  }
}
```

todos.context.js
```js
import React, { createContext, useReducer } from 'react';
import todosReducer from '../reducers/todo.reducer.js';

export const TodosContext = createContext();
const initialTodos = []

const TodosProvider = (props) => {
  const [todos, dispatch] = useReducer(todosReducer, initialTodos);
  
  return (
    <TodosContext.Provider value={{ todos, dispatch }}>
      {props.children}
    </TodosContext.Provider>
  )
}
```

**As you can see I have created a `reducer` file for todos exactly the same with `Redux` and then I imported the reducer to the `TodosContext.js` file and also I imported the `useReducer` hook to use the Reducer that I have created and imported it to my context file. That's it!!!**
