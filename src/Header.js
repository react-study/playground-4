import React from 'react';

class Header extends React.Component {
  handleKeyDown(e) {
    const text = e.target.value;
    if(!text || e.keyCode !== 13) return; // text가 없고 엔터기가 아닌경우 아래 실행하지않음
    this.props.addTodo(text);
    e.target.value = '';
  }
  render(){
    return (
      <header>
        <h1 className="todo-app__header">todos</h1>
        <input
          type="text"
          className="todo-app__new-todo"
          placeholder="What needs to be done?"
          onKeyDown={e => this.handleKeyDown(e)}
        />
        <div className="toggle-all" 
          onClick={this.props.toggleAll}
        />
      </header>
    );
  }
}

export default Header;