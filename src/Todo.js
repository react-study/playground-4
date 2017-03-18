import React from 'react';

class Todo extends React.Component {
  render() {
    const {
      text,
      deleteTodo
    } = this.props;

    return (
      <li className="todo-item">
        <div className="toggle" />
        <div className="todo-item__view">
          <div className="todo-item__view__text">
            {text}
          </div>
          <buttom
            className="todo-item__destroy"
            onClick={deleteTodo}
          />
        </div>
        <input
          type="text"
          className="todo-item__edit"
        />
      </li>
    );
  }
}

export default Todo;
