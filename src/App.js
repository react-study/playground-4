import React from 'react';
import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      todos: [
        {text: '하핫', id: 1000},
        {text: '힘내', id: 1001},
        {text: '오키', id: 1002}
      ]
    };
    // this.addTodo = this.addTodo.bind(this);
  }
  addTodo(text) {
    this.setState({ // state를 바꾸며 렌더도 해라. 
      todos: [
        ... this.state.todos,
        {
          text, 
          id: Data.now()  // 나중엔 서버에서 관리. 새로운 값을 넣을 의도로 그냥 한 것임. 전세계 서비스하면 겹칠수있다. 
        }
      ]
    });
  }
  deleteTodo(id) {
    const newTodos = [... this.state.todos];
    const deleteIndex = newTodos.findIndex(v => v.id === id);
    newTodos.splice(deleteIndex, 1);
    this.setState({
      todos: newTodos
    });
  }
  render(){
    return (
      <div className="todo-app">
        <Header
          addTodo={text => this.addTodo(text)} 
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