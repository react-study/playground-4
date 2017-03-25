//----- App.js -----
import React from 'react';
import axios from 'axios';
import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

const ax = axios.create({
  baseURL: 'http://localhost:2403/todos',
  timeout: 1000
});

class App extends React.Component {
  constructor(){
    super();
    this.state={
      todos:[],
      editingId: null,
      filterName: 'All'
    };
  }
  componentWillMount(){
    ax.get('/').then(res => {
      this.setState({
        todos: res.data
      })
    })
  }

  addTodo(text){
    ax.post('/', {text}).then(res =>{
      this.setState({//변경시 setState 사용
        todos:[...this.state.todos, res.data]
      });
    });
  }

  deleteTodo(id){
    ax.delete(`/${id}`).then(() =>{
      const newTodos = [...this.state.todos];
      const deleteIndex = newTodos.findIndex(v => v.id === id);
      newTodos.splice(deleteIndex, 1);
      this.setState({
        todos: newTodos
      })
    });
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

  selectFilter(f){
    this.setState({
      filterName: f
    });
  }

  render(){
    const {
      todos,
      editingId,
      filterName
    } = this.state;

    const filteredTodos = todos.filter(v => {
      if(
        filterName === 'All'||
        (filterName === 'Active' && !v.isDone) ||
        (filterName === 'Completed' && v.isDone)
      ) return true;
    });

    const activeLength = todos.filter(v => !v.isDone).length;

    return(
        <div className="todo-app">
          <Header
            addTodo={text => this.addTodo(text)}
            toggleAll={() => this.toggleAll()}
          />
          <TodoList
            todos      = {filteredTodos}
            editingId  = {editingId}
            deleteTodo = {id => this.deleteTodo(id)}
            editTodo   = {id => this.editTodo(id)}
            cancleEdit = {() => this.cancleEdit()}
            saveTodo   = {(id, newText) => this.saveTodo(id, newText)}
            toggleTodo = {id => this.toggleTodo(id)}
           />
          <Footer
            filterName = {filterName}
            selectFilter = {f => this.selectFilter(f)}
            deleteCompleted = {() => this.deleteCompleted()}
            activeLength = {activeLength}
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
