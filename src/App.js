//----- main.js -----
import React from 'react';
import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

class App extends React.Component {
  constructor(){
    super();
    this.state={
      todos: [
        {text: '내용1', id: 1000},
        {text: '내용22', id: 1001},
        {text: '내용333', id: 1002}
      ]
    }
  }
  addTodo(text){
    this.setState({//변경시 setState 사용
      todos:[
        ...this.state.todos,
        {
          text,
          id: Date.now()
        }
      ]
    })

  }
  deleteTodo(id){
    const newTodos = [...this.state.todos];
    const deleteIndex = newTodos.findIndex(v => v.id === id);
    newTodos.splice(deleteIndex, 1);
    this.setState({
      todos: newTodos
    })

  }
  render(){
    return(
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
//형제끼리는 데이터를 주고받을 수 없으며, 상위요소(App.js)에서 받아온다
//1. render(){ this.addTodo.bind(this);
//2. constructor(){ this.addTodo = this.addTodo.bind(this);
//3. render(){ ()=>this.addTodo();
//3번방법 추천,
