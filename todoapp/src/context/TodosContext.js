import React, {createContext, useReducer} from 'react';
import * as Reducer from '../store/Reducers/Reducers';

export const TodosContext = createContext();

const TodosProvider = (props) => {
    const [todos, setTodos] = useReducer(Reducer.TodosReducer, Reducer.initialTodos);
    return (
        <TodosContext.Provider value={{todos, setTodos}}>
            {props.children}
        </TodosContext.Provider>
    )
}

export default TodosProvider;