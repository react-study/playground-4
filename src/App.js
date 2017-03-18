import React from 'react';

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos : [
        { text : '배고파', id : 1000 },
        { text : '배고파2', id : 1001 },
        { text : '배고파3', id : 1002 }
      ]
    };
  }
  addTodo(text) {
    this.setState({
      todos: [
        ...this.state.todos,
        {
          text,
          id: Date.now()
        }
      ]
    });
  }
  deleteTodo(id) {
    const newTodos = [ ...this.state.todos];
    const deleteIndex = newTodos.findIndex(v=> v.id ===id );
    newTodos.splice(deleteIndex, 1);
    this.setState({
      todos: newTodos
    });
  }
  render() {
    return (
      <div className="todo-app">
        <Header
          addTodo={ text=>this.addTodo(text)}
        />
        <TodoList
          todos={this.state.todos}
          deleteTodo={id => this.deleteTodo(id)}
        />
        <Footer />
      </div>
    );
  }
}

export default App;


// 1. render(){ this.addTodo.bind(this);}
// 2. constructor() { this.addTodo = this.addTodo.bind(this);}
// 3. render() { () => this.addTodo()}
