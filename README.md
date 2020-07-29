# TodoApp-Context-useReducer

Here, we're gonna create a store just like `Redux` using `useReducer` hook in `context` to manage our state in App

## TodoApp

Here we're gonna define out `Todo Reducer`.

Create a folder called `reducers` and inside that create a file called `Todos.reducer.js`

### Create the todosReducer

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

### importing the todosReducer to the todosContext

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


### now using todosContext inside the component

now we want to use the `todos` and `dispatch` which we have created, inside our components

to use them inside our component exactly the same before, for example I want to show `todos` and using `dispatch` inside our component;

```js
import React, { useContext } from 'react';
import { TodosContext } from '../context/todos.context.js'; 

function App() {
   const {  todos, dispatch } = useContext(TodosContext);
   
   return (
    <>
      <button onClick={() => dispatch({ type: 'ADD', payload: newTodo })}>dispatch</button>
      {todos.map(todo => <p key={todo.id}>{todo.task}</p>)}
    </>
   )
}
```
