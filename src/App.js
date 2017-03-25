import React from 'react';

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          text: '하나',
          isDone: false,
          id: 1000
        },
        {
          text: '두울',
          isDone: true,
          id: 1001
        },
        {
          text: '세엣',
          isDone: false,
          id: 1002
        }
      ],
      editingId: null
    }
  }

  addTodo(text) {
    this.setState({
      todos: [
        ... this.state.todos,
        {
          text,
          isDone: false,
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
    newTodos[editIndex] = Object.assign({}, newTodos[editIndex], {
      text: newText
    });

    this.setState({
      todos: newTodos,
      editingId: null
    });
  }

  toggleTodo(id) {
    const newTodos = [ ... this.state.todos ];
    const toggleIndex = newTodos.findIndex(v => v.id === id);
    newTodos[toggleIndex] = Object.assign({}, newTodos[toggleIndex], {
      isDone: !newTodos[toggleIndex].isDone
    });
    this.setState({
      todos: newTodos
    })
  }
  toggleAll() {
    console.log(123);
    const newToggleAll = !this.state.todos.every(v => v.isDone); // every =  전부 참인지 판단해주는 메서드
    const newTodos = this.state.todos.map(todo => {
      todo.isDone = newToggleAll;
      return todo
      // return Object.assign({}, todo, {isDone: newToggleAll});
    });
    console.log( newTodos )
    this.setState({
      todos: newTodos
    });
  }
  deleteCompleted() {
    const newTodos = this.state.todos.filter(todo => !todo.isDone);
    this.setState({
      todos: newTodos
    })
  }

  render() {
    const {
      todos,
      editingId
    } = this.state;
    return (
      <div className="todo-app">
        <Header
          addTodo={ text => this.addTodo(text) }
          toggleAll={() => this.toggleAll()}
        />
        <TodoList
          todos={todos}
          editingId={editingId}
          deleteTodo={id => this.deleteTodo(id)}
          editTodo={id => this.editTodo(id)}
          cancelEdit={() => this.cancelEdit()}
          saveTodo={(id, newText) => this.saveTodo(id, newText)}
          toggleTodo={id => this.toggleTodo(id)}
        />
        <Footer
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
