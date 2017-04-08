import React from 'react';
import axios from 'axios';
import update from 'immutability-helper';

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
      editingId: null
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
      this.setState(
        update(this.state, {
          todos: {
            $push: [res.data]
          }
        })
      )
    });
  }
  deleteTodo(id) {
    ax.delete(`/${id}`).then(() => {
      // const newTodos = [ ... this.state.todos ];
      // const deleteIndex = ;
      //newTodos.splice(deleteIndex, 1);

      this.setState( update(this.state, {
          todos: {
            $splice: [
              [ this.state.todos.findIndex(v => v.id === id), 1 ]
            ]
          }
        })
      );

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
    const prevState = this.state;
    const editIndex = prevState.todos.findIndex( v => v.id === id )
    this.setState(
      update(prevState, {
        todos: {
          [editIndex]: {
            text: {
              $set: newText
            }
          }
        },
        editingId: {
          $set: null
        }
      })
    );

    ax.put(`/${id}`,{
      text: newText
    }).catch(err => {
      this.setState({
        todos: prevState.todos,
        editingId: null
      });
    })
  }

  toggleTodo(id) {
    const toggleIndex = this.state.todos.findIndex(v => v.id === id);
    ax.put(`/${id}`, {isDone: !this.state.todos[toggleIndex].isDone}).then(res=> {
      //newTodos[toggleIndex] = res.data;
      this.setState(
        update(this.state, {
          todos: {
            [toggleIndex]: {
              $set: res.data
            }
          }
        })
      )
    });

  }
  toggleAll() {
    const newToggleAll = !this.state.todos.every(v => v.isDone); // every =  전부 참인지 판단해주는 메서드
    const axArray = this.state.todos.map(v =>
      ax.put(`/${v.id}`, {isDone: newToggleAll})
    );
    axios.all(axArray).then(res => {
      this.setState(
        update(this.state, {
          todos: {
            $apply: () => res.map(v => v.data)
          }
        })
      )
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


    //const newTodos = this.state.todos.filter(todo => !todo.isDone);
    const axArray = this.state.todos
      .filter(todo => todo.isDone)
      .map( v => {
          console.log(v);
          return ax.delete(`/${v.id}`)
        }
      );

    axios.all(axArray).then(() => {
      this.setState(
        update(this.state, {
          todos: {
            $apply: todos => todos.filter( v=> !v.isDone)
          }
        })
      )
    });
  }
  render() {
    const {
      todos,
      editingId
    } = this.state;
    const {
        match: {
            params
        }
    } = this.props;
    const filterName = params.filterName || '';

    const filteredTodos = todos.filter(v => {
      if(
        !filterName ||
        (filterName === 'active' && !v.isDone) ||
        (filterName === 'completed' && v.isDone)
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
