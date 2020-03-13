import React, {useContext} from 'react';
import {TodosContext} from '../context/TodosContext';
import TodoItem from './TodoItem';
import Divider from '@material-ui/core/Divider';

function TodoList(){
    const {todos} = useContext(TodosContext);
    return (
        todos.map((todo, i) => (
            <>
                <TodoItem
                    key={todo.id}
                    task={todo.task} 
                    id={todo.id} 
                    completed={todo.completed} 
                    isEditing={todo.isEditing} 
                />
                {i < todos.length - 1 && <Divider />}
            </>
        ))
    )
    
}

export default TodoList;