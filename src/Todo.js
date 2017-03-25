import React from 'react';
import ClassNames from 'classnames';

class Todo extends React.Component {
  componentDidUpdate(prevProps) {
    if( this.props.isEditing && !prevProps.isEditing ) {
      this._input.value = this.props.text;
      this._input.focus();
    }
  }
  handleKeyDown(e) {
    const text = e.target.value;
    if( e.keyCode !== 13 || !text ) return;
    this.props.saveTodo(text);
    e.target.value = '';
  }
  render() {
    const {
      text,
      isDone,
      isEditing,
      deleteTodo,
      editTodo,
      cancelEdit,
      toggleTodo
    } = this.props;

    return (
      <li className={ClassNames(
        'todo-item', {
          editing: isEditing,
          completed: isDone
        }
      )}>
        <div
          className="toggle"
          onClick={toggleTodo}
        ></div>
        <div className="todo-item__view">
          <div
            className="todo-item__view__text"
            onDoubleClick={editTodo}
          >
            {text}
          </div>
          <button
            className="todo-item__destroy"
            onClick={deleteTodo}
          ></button>
        </div>
        <input
          type="text"
          ref={ref => this._input = ref}
          className="todo-item__edit"
          onBlur={cancelEdit}
          onKeyDown={e => this.handleKeyDown(e)}
        />
      </li>
    );
  }
}

export default Todo;
