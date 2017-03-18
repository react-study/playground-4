//----- main.js -----
import React from 'react';
import Todo from './Todo';


class TodoList extends React.Component {
  render(){
    const {
      todos,
      deleteTodo
    } = this.props;
    const todoList = todos.map(({text, id}) => (
      <Todo
        key={`todo#${id}`}
        text={text}
        deleteTodo={() => deleteTodo(id)}
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
