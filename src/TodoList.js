import React from 'react';
import Todo from './Todo';

class TodoList extends React.Component {
    render() {
        const {
            todos,
            editingId,
            deleteTodo,
            editTodo,
            cancelEdit,
            saveTodo,
            toggleTodo
        } = this.props;

        const todolist = todos.map(({text, id, isDone}) => (
            <Todo
                key        = {`todo#${id}`}
                text       = {text}
                isDone     = {isDone}
                isEditing  = {editingId === id}
                deleteTodo = {()=> deleteTodo(id)}
                editTodo   = {()=> editTodo(id)}
                cancelEdit = {()=> cancelEdit()}
                saveTodo   = {text => saveTodo(id, text)}
                toggleTodo = {()=> toggleTodo(id)}
            />
        ));
        return (
            <div className="todo-app__main">
                <ul className="todo-list">
                    {todolist}
                </ul>
            </div>
        );
    }
}

export default TodoList;