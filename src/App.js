import React from 'react';
import axios from 'axios';

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

const ax = axios.create({
  baseURL: 'http://localhost:2403/todos',
  timeout: 1000
})

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      editingId: null,
      filterName: 'All'
    }
  }
  componentWillMount() {
    ax.get('/').then(res => {
      this.setState({
        todos: res.data
      })
    })
  }
  addTodo(text) {
    ax.post('/', {text}).then(res => {
      this.setState({
        todos: [
          ... this.state.todos,
          res.data
        ]
      })
    });
  }
  deleteTodo(id) {
    ax.delete(`/${id}`).then(() => {
      const newTodos = [ ... this.state.todos ];
      const deleteIndex = newTodos.findIndex(v => v.id === id);
      newTodos.splice(deleteIndex, 1);

      this.setState({
        todos: newTodos
      })
    });
  }
  editTodo(id) {
    this.setState({
      editingId: id
    })
  }
  cancelEdit() {
    this.setState({
      editingId: null
    })
  }
  saveTodo(id, newText) {
    const newTodos = [ ... this.state.todos ]
    const editIndex = newTodos.findIndex( v => v.id === id );
    ax.put(`/${id}`,{text: newText}).then(res => {
      console.log(res);
      newTodos[editIndex].text = res.data.text;
      this.setState({
        todos: newTodos,
        editingId: null
      });
    });
  }

  toggleTodo(id) {
    const newTodos = [ ... this.state.todos ];
    const toggleIndex = newTodos.findIndex(v => v.id === id);

    ax.put(`/${id}`, {isDone: !newTodos[toggleIndex].isDone}).then(res=> {
      newTodos[toggleIndex] = res.data;
      this.setState({
        todos: newTodos
      })
    });

  }
  toggleAll() {
    const newToggleAll = !this.state.todos.every(v => v.isDone); // every =  전부 참인지 판단해주는 메서드
    const axArray = this.state.todos.map(v =>
      ax.put(`/${v.id}`, {isDone: newToggleAll})
    );
    axios.all(axArray).then(res => {
      this.setState({
        todos: res.map(v => v.data)
      })
    });
    //
    // const newTodos = this.state.todos.map(todo => {
    //   ax.put(`/${todo.id}`, {isDone: newToggleAll});
    //   todo.isDone = newToggleAll;
    //   return todo
    //   // return Object.assign({}, todo, {isDone: newToggleAll});
    // });
    // console.log( newTodos );
    // this.setState({
    //   todos: newTodos
    // });
  }
  deleteCompleted() {
    // const newTodos = this.state.todos.filter(todo => {
    //   if( todo.isDone ) {
    //     ax.delete(`/${todo.id}`);
    //   }
    //   return !todo.isDone
    // });
    // this.setState({
    //   todos: newTodos
    // })
    const newTodos = this.state.todos.filter(todo => !todo.isDone);
    const axArray = this.state.todos
      .filter(todo => todo.isDone)
      .map( v =>
        ax.delete(`/${v.id}`)
      );

    axios.all(axArray).then(() => {
      this.setState({
        todos: newTodos
      })
    });
  }
  selectFilter(f) {
    this.setState({
      filterName: f
    })
  }
  render() {
    const {
      todos,
      editingId,
      filterName
    } = this.state;

    const filteredTodos = todos.filter(v => {
      if(
        filterName === 'All' ||
        (filterName === 'Active' && !v.isDone) ||
        (filterName === 'Completed' && v.isDone)
      ) return true
    })

    // filterName === 'All' ? todos : (
    //   filterName === 'Active' ? todos.filter(v => !v.isDone) : todos.filter(v => v.isDone)
    // )
    const activeLength = todos.filter(v => !v.isDone).length;
    return (
      <div className="todo-app">
        <Header
          addTodo={ text => this.addTodo(text) }
          toggleAll={() => this.toggleAll()}
        />
        <TodoList
          todos={filteredTodos}
          editingId={editingId}
          deleteTodo={id => this.deleteTodo(id)}
          editTodo={id => this.editTodo(id)}
          cancelEdit={() => this.cancelEdit()}
          saveTodo={(id, newText) => this.saveTodo(id, newText)}
          toggleTodo={id => this.toggleTodo(id)}
        />
        <Footer
          filterName = {filterName}
          activeLength = {activeLength}
          deleteCompleted={() => this.deleteCompleted()}
          selectFilter={f => this.selectFilter(f)}
        />
      </div>
    );
  }
}

export default App;

// 메서드 this 바인딩 3가지
// 1. render() { this.fnc.bind(this) } // 바인드가 계속 됨..
// 2. constructor 안에서 this.fnc = this.fnc.bind(this); 바꿔야할 곳이 3개 라는 단점
// 3. render() { () => this.fnc() } // 불필요한 함수 스텍 하나가 늘어나는 단점
