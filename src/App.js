import React from 'react';

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        { text: '하나', id: 1000},
        { text: '두울', id: 1001},
        { text: '세엣', id: 1002}
      ]
    }
  }

  addTodo(text) {
    this.setState({
      todos: [
        ... this.state.todos,
        {
          text,
          id: Date.now()
        }
      ]
    })
  }
  deleteTodo(id) {
    const newTodos = [ ... this.state.todos ];
    const deleteIndex = newTodos.findIndex(v => v.id === id);
    newTodos.splice(deleteIndex, 1);

    this.setState({
      todos: newTodos
    })
  }
  render() {
    return (
      <div className="todo-app">
        <Header
          addTodo={ text => this.addTodo(text) }
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

// 메서드 this 바인딩 3가지
// 1. render() { this.fnc.bind(this) } // 바인드가 계속 됨..
// 2. constructor 안에서 this.fnc = this.fnc.bind(this); 바꿔야할 곳이 3개 라는 단점
// 3. render() { () => this.fnc() } // 불필요한 함수 스텍 하나가 늘어나는 단점
