import * as ACTIONTYPES from '../Actions/ActionTypes';
import uuid from 'uuid/v4';

export const initialTodos = [
    {id: 1, task: 'React', completed: false, isEditing: false},
    {id: 2, task: 'Vue', completed: false, isEditing: false}
]

export const initialThemeStatus = false

export const TodosReducer = (todos = initialTodos, action) => {
    switch(action.type){
        case ACTIONTYPES.ADDTODO:
            return [...todos, {id: uuid(), task: action.newTodo, completed: false}]
        case ACTIONTYPES.REMOVETODO:
            return todos.filter(todo => todo.id !== action.todoId)
        case ACTIONTYPES.TOGGLETODO:
            return todos.map(todo => todo.id === action.todoId ? {...todo, completed: !todo.completed} : todo)
        case ACTIONTYPES.TOGGLEEDIT:
            return todos.map(todo => todo.id === action.todoId ? {...todo, isEditing: !todo.isEditing} : todo)
        case ACTIONTYPES.EDITTODO:
            return todos.map(todo => todo.id === action.todoId ? {...todo, task: action.newTodo} : todo)
        default:
            return todos
    }
}

export const ThemeReducer = (state = initialThemeStatus, action) => {
    switch(action.type) {
        case ACTIONTYPES.TOGGLETHEME:
            return !state
        default:
            return state
    }
}
