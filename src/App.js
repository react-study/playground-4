//----- App.js -----
import React from 'react';
import axios from 'axios';
import update from 'immutability-helper';
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
      editingId: null
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
        //[res.data, ...this.state.todos]
        todos: update(this.state.todos, {
          $push: [res.data]
        })
      });
    });
  }

  deleteTodo(id) {
    ax.delete(`/${id}`).then(() => {
        this.setState(
            update(this.state, {
                todos: {
                    $splice: [
                        [ this.state.todos.findIndex(v => v.id === id), 1 ]
                    ]
                }
            })
        );
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
    const prevState = this.state;
    const editIndex = prevState.todos.findIndex(v => v.id === id);

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

    ax.put(`/${id}`, {
      text: newText
    }).catch(res => {
      this.setState(prevState);
      /*
        this.setState({
          todos: prevState.todos,
          editingId: null
        });
        */
    })
  }

  toggleTodo(id){
    const toggleIndex = this.state.todos.findIndex(v => v.id === id);
    ax.put(`/${id}`, {
      isDone: !this.state.todos[toggleIndex].isDone
    }).then(res => {
      //newTodos[toggleIndex] = res.data;
      this.setState(
        update(this.state,{
          todos: {
            [toggleIndex]: {
              $set: res.data
            }
          }
        })
      );
    })
  }

  toggleAll(){
    const newToggleAll = !this.state.todos.every(v => v.isDone);
    const axArray = this.state.todos.map(v =>
      ax.put(`/${v.id}`, {
        isDone: newToggleAll
      })
    )

    axios.all(axArray).then(res => {
      this.setState(
        update(this.state, {
          todos : {
            $apply: () => res.map(v => v.data)
          }
        })
      )
    })

    const newTodos = this.state.todos.map(todo => Object.assign({}, todo, {
        isDone: newToggleAll
    }));
    this.setState({
      todos: newTodos
    })
  }

  deleteCompleted(){
    //const newTodos = this.state.todos.filter(todo => !todo.isDone);
    const axArray = this.state.todos
                  .filter(todo => todo.isDone)
                  .map(v => ax.delete(`/${v.id}`));
    axios.all(axArray).then(() => {
      this.setState(
        update(this.state, {
          todos:{
            $apply: todos => todos.filter(v => !v.isDone)
          }
        })
      );
    });
  }

  render(){
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
