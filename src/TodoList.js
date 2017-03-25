import React from 'react';
import Todo from './Todo';

class TodoList extends React.Component {
  render() {
    const {
      todos,
      deleteTodo,
      editingId,
      editTodo,
      cancelEdit,
      toggleTodo,
      saveTodo
    } = this.props;
    //해체할당
    const todolist = todos.map(({text, isDone, id}) => (
      <Todo
        key         = { `todo#${id}` }
        text        = { text }
        isDone      = { isDone }
        isEditing   = { editingId === id }
        deleteTodo  = { () => deleteTodo(id) }
        editTodo    = { () => editTodo(id) }
        cancelEdit  = { () => cancelEdit() }
        saveTodo    = { text => saveTodo(id, text) }
        toggleTodo  = { () => toggleTodo(id) }
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
