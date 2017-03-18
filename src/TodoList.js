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
            saveTodo
        } = this.props;

        const todolist = todos.map(({text, id}) => (
            <Todo
                key        = {`todo#${id}`}
                text       = {text}
                isEditing  = {editingId === id}
                deleteTodo = {()=> deleteTodo(id)}
                editTodo   = {()=> editTodo(id)}
                cancelEdit = {()=> cancelEdit()}
                saveTodo   = {text => saveTodo(id, text)}
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
