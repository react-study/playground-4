//----- App.js -----
import React from 'react';
import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

class App extends React.Component {
  constructor(){
    super();
    this.state={
      todos:[
        {
          text: '내용1',
          isDone: false,
          id: 1000
        },
        {
          text: '내용22',
          isDone: true,
          id: 1001
        },
        {
          text: '내용333',
          isDone: false,
          id: 1002
        }
      ],
      editingId: null
    };
  }
  addTodo(text){
    this.setState({//변경시 setState 사용
      todos:[
        ...this.state.todos,
        {
          text,
          isDone: false,
          id: Date.now()
        }
      ]
    });
  }

  deleteTodo(id){
    const newTodos = [...this.state.todos];
    const deleteIndex = newTodos.findIndex(v => v.id === id);
    newTodos.splice(deleteIndex, 1);
    this.setState({
      todos: newTodos
    })
  }

  editTodo(id){
    this.setState({
      editingId: id
    })
  }

  cancleEdit(){
    this.setState({
      editingId : null
    })
  }

  saveTodo(id, newText){
    const newTodos = [...this.state.todos];
    const editIndex = newTodos.findIndex(v => v.id === id);
    newTodos[editIndex] = Object.assign({}, newTodos[editIndex], {
      text: newText
    });
    this.setState({
      todos: newTodos,
      editingId : null
    })
  }

  toggleTodo(id){
    const newTodos = [...this.state.todos];
    const toggleIndex = newTodos.findIndex(v => v.id === id);
    newTodos[toggleIndex] = Object.assign({}, newTodos[toggleIndex], {
      isDone: !newTodos[toggleIndex].isDone
    });
    this.setState({
      todos: newTodos
    })
  }

  toggleAll(){
    const newToggleAll = !this.state.todos.every(v => v.isDone);
    const newTodos = this.state.todos.map(todo => Object.assign({}, todo, {
        isDone: newToggleAll
    }));
    this.setState({
      todos: newTodos
    })
  }

  deleteCompleted(){
    const newTodos = this.state.todos.filter(todo => !todo.isDone);
    this.setState({
      todos: newTodos
    });
  }

  render(){
    const {
      todos,
      editingId
    } = this.state;
    return(
        <div className="todo-app">
          <Header
            addTodo={text => this.addTodo(text)}
            toggleAll={() => this.toggleAll()}
          />
          <TodoList
            todos      = {todos}
            editingId  = {editingId}
            deleteTodo = {id => this.deleteTodo(id)}
            editTodo   = {id => this.editTodo(id)}
            cancleEdit = {() => this.cancleEdit()}
            saveTodo   = {(id, newText) => this.saveTodo(id, newText)}
            toggleTodo = {id => this.toggleTodo(id)}
           />
          <Footer
            deleteCompleted = {() => this.deleteCompleted()}
          />
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
