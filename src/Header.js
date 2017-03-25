import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  handleKeyDown(e) {
    const text = e.target.value;
    if( e.keyCode !== 13 || !text ) return;

    this.props.addTodo(text);
    e.target.value = '';
  }
  render() {
    return (
      <header>
        <h1 className="todo-app__header">todos</h1>
        <input
          type="text"
          className="todo-app__new-todo"
          placeholder="What needs to be done?"
          onKeyDown={e => this.handleKeyDown(e) }
        />
        <div
          className="toggle-all"
          onClick={ this.props.toggleAll }
        ></div>
      </header>
    );
  }
}

export default Header;
