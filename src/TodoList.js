//----- TodoList.js -----
import React from 'react';
import Todo from './Todo';


class TodoList extends React.Component {
  render(){
    const {
      todos,
      editingId,
      deleteTodo,
      editTodo,
      cancleEdit,
      saveTodo,
      toggleTodo
    } = this.props;
    const todoList = todos.map(({text, isDone, id}) => (
      <Todo
        key        = {`todo#${id}`}
        text       = {text}
        isDone     = {isDone}
        isEditing  = {editingId === id}
        deleteTodo = {() => deleteTodo(id)}
        editTodo   = {() => editTodo(id)}
        cancleEdit = {() => cancleEdit()}
        saveTodo   = {text => saveTodo(id, text)}
        toggleTodo = {() => toggleTodo(id)}
      />
    ));
    return(
      <div className="todo-app__main">
        <ul className="todo-list">
          {todoList}
        </ul>
      </div>
    );
  }
}

export default TodoList;
