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

## Performance Optimization

**1.**

Now as you can see I have export both `todos` and `dispatch` from one `context`, but this has a performance problem, to solve this issue you have to `split` this context into 2 contexts.

How??

```js
import React, { createContext, useReducer } from 'react';
import { todosReducer } from './reducers/todos.reducer.js';

export const TodosContext = createContext();
export const DispatchContext = createContext();

const initialState = {
  todos: []
}

const TodosProvider = (props) => {
  const [todos, dispatch] = useReducer(todosReducer, initialState);
  
  return (
    <TodosContext.Provider value={{ todos }}>
      <DispatchContext.Provider value={{ dispatch }}>
         {props.children}
      </DispatchContext.Provider>
    </TodosContext.Provider>
  )
}
```

Then when you want to disatch an action inside a component, you just need to import the dispatch from `DispatchContext` not `TodosContext` just it.


**2.**

second optimization you have to handle is that, **if you return just one single value from the context just do it inside {} not inside {{}}, because every time you make a change inside this components actually you create an object and this a re-render which is not good**

```js
import React, { createContext, useReducer } from 'react';
import { todosReducer } from './reducers/todos.reducer.js';

export const TodosContext = createContext();
export const DispatchContext = createContext();

const initialState = {
  todos: []
}

const TodosProvider = (props) => {
  const [todos, dispatch] = useReducer(todosReducer, initialState);
  
  return (
    <TodosContext.Provider value={todos}>  // AS YOU CAN SEE I HAVE EXPORTED IT FROM {} not from {{}} 
      <DispatchContext.Provider value={dispatch}>  // AS YOU CAN SEE I HAVE EXPORTED IT FROM {} not from {{}} 
         {props.children}
      </DispatchContext.Provider>
    </TodosContext.Provider>
  )
}
```

and when you extract it from context inside you component extract it just like below:

correct:
```js
const todos = useContext(TodosContext)
```

wrong:
```js
const { todos } = useContext(TodosContext)
```


**3. (memo)** 
for example imagine I have a list of todos inside my component. And I edit just one todo from my list. and I just console.logged the re-render and I noticed that whenever I change just one todo, other todos re-render as well. And this is a problem for performance.

To performance optimization I use `memo`. **This is the idea of `memoization`**

**This is an optimization technique used primarily to speed up omputer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again**

in class based components we use `PureComponent` but in functional components we use `memo`


```js
import React, { memo } from 'react';

.
.
.

export default memo(App)
```

Now if I change one of the todos, Just that todo will be re-rendered, and the others not. So, this is a great solution.

**Very important tip**

always for example to define initialState in `context` do this:

correct
```js
const initialTodos = [];
```

wrong
```js
const initialState = {
  todos: []
}
```


## Custom Hook Reducer + LocalStorage

```js
import { useState, useEffect } from "react";

function useLocalStorageState(key, defaultVal) {
  const [state, setState] = useState(() => {
    let value;
    try {
      value = JSON.parse(
        window.localStorage.getItem(key) || String(defaultVal)
      );
    } catch (e) {
      value = defaultVal;
    }
    return value;
  });
  useEffect(() => {
    window.localStorage.getItem(key) || String(defaultVal);
  }, [state]);
  return [state, setState];
}

export { useLocalStorageState };
```
