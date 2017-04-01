import React from 'react';
import axios from 'axios';

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

// jquery ajax 쓰기에는 무겁다. 가벼운 axios를 사용
// baseURL 경로만 실제 서버로로 연결하면 된다.
const ax = axios.create({
  baseURL: 'http://localhost:2403/todos',
  timeout: 1000
});

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      todos: [], 
      editingId: null,
      filterName: 'All'
    };
  }

  componentWillMount(){
    ax.get('/').then(res => {
      // console.log(res);

      this.setState({
        todos : res.data
      });
    });
  }


  // addTodo, deleteTodo 부분 수정하기
  addTodo(text) {
        ax.post('/', { text }).then(res => {
            this.setState({
                todos: [ ...this.state.todos, res.data ]
            });
        });
    }

  deleteTodo(id) {
        ax.delete(`/${id}`).then(() => {
            const newTodos = [...this.state.todos];
            const deleteIndex = newTodos.findIndex(v => v.id === id);
            newTodos.splice(deleteIndex, 1);
            this.setState({
                todos: newTodos
            });
        });
    }


  editTodo(id) {
    this.setState({
      editingId: id
    });
  }

  cancelEdit(){
    this.setState({
      editingId: null
    });
  }

  saveTodo(id, newText) {
    const newTodos = [ ...this.state.todos ];
    const editIndex = newTodos.findIndex(v => v.id === id);
    newTodos[editIndex] = Object.assign({}, newTodos[editIndex], {
      text: newText
    });
    this.setState({
      todos: newTodos,
      editingId: null
    });
  }

  toggleTodo(id) {
    const newTodos = [ ...this.state.todos ];
    const editIndex = newTodos.findIndex(v => v.id === id);
    newTodos[editIndex] = Object.assign({}, newTodos[editIndex], {
      isDone: !newTodos[editIndex].isDone
    });
    this.setState({
      todos: newTodos
    });
  }

  toggleAll() {
    const newToggleAll = !this.state.todos.every( v => v.isDone);
    const newTodos = this.state.todos.map(todo => Object.assign({}, todo, {
        isDone: newToggleAll
    }));
    this.setState({
      todos: newTodos
    });
  }

  //Clear Completed
  deleteCompleted() {
    const newTodos = this.state.todos.filter(todo => !todo.isDone);
    this.setState({
      todos: newTodos
    });
  }

  selectFilter(f) {
    this.setState({
      filterName: f
    });
  }

  render(){
    console.log('render'); // render 두번
    const {
      todos,
      editingId,
      filterName
    } = this.state;

    // 1. if 3개 방법
    const filteredTodos = todos.filter(v=> {
      if(
        filterName  === 'All' ||
        (filterName === 'Active' && !v.isDone) ||
        (filterName === 'Completed' && v.isDone)
      ) return true;
    });

    // 2. 삼항식 방법
    // const filteredTodos = filterName === 'All' ? todos : (
    //     filterName === 'Active' ? todos.filter( v => !v.isDone) : todos.filter( v => v.isDone)
    //   )

    const activeLength = todos.filter(v => !v.isDone).length;

    return (
      <div className="todo-app">
        <Header
          addTodo={text => this.addTodo(text)} 
          toggleAll={()=> this.toggleAll()}
        />
        <TodoList
          todos={filteredTodos}
          editingId = {editingId}
          deleteTodo={id => this.deleteTodo(id)}
          editTodo={id => this.editTodo(id)}
          cancelEdit={() => this.cancelEdit()}
          saveTodo={(id, newText) => this.saveTodo(id, newText)}
          toggleTodo={id => this.toggleTodo(id)}
        />
        <Footer 
          filterName = {filterName}
          activeLength = {activeLength}
          selectFilter = {f => this.selectFilter(f)}
          deleteCompleted = {() => this.deleteCompleted()}
        />
      </div>
    );
  }
}

export default App;