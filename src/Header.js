//----- main.js -----
import React from 'react';

class Header extends React.Component {
  handleKeyDown(e){
    const text = e.target.value;//target은 input
    if(!text || e.keyCode !== 13) return; //텍스트가 없거나 엔터키가 아닌경우(13코드는 엔터키)
    this.props.addTodo(text);
    e.target.value='';
  }
  render(){
    return(
      <header>
        <h1 className="todo-app__header">todos</h1>
        <input
          type="text"
          className="todo-app__new-todo"
          placeholder="what needs to be done?"
          onKeyDown={e => this.handleKeyDown(e)}
        />
        <div className="toggle-all"/>
      </header>

    );
  }
}

export default Header;
