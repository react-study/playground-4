import React from 'react';
import axios from 'axios';
import update from 'immutability-helper';

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';


const ax = axios.create({
    baseURL : 'http://localhost:2403/todos',
    timeout :1000
});

class App extends React.Component {
    constructor() {
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
                todos:res.data
            });
        });
    }
    addTodo(text) {
        ax.post('/', { text }).then(res => {
            this.setState({
                // todos: [...this.state.todos, res.data]
                todos: update(this.state.todos, {
                    $push: [ res.data ]
                })
            });
        });
    }
    deleteTodo(id) {
        ax.delete(`/${id}`).then(() => {
            //const newTodos = [...this.state.todos];
            //const deleteIndex = this.state.todos.findIndex(v => v.id === id);
            //newTodos.splice(deleteIndex, 1);
            this.setState({
                todos: update(newTodos, {
                    $splice: [
                        [ this.state.todos.findIndex(v => v.id === id), 1 ]
                    ]
                })
            });
        })
    }
    editTodo(id) {
        this.setState({
            editingId: id
        });
    }
    cancelEdit() {
        this.setState({
            editingId: null
        });
    }
    saveTodo(id, newText) {
        //const newTodos = [ ...this.state.todos ];
        //const editIndex = newTodos.findIndex(v => v.id === id);
        const prevState = this.state;
        const editIndex = prevState.todos.findIndex(v => e.id === id);
        this.setState(
            update(this.state, {
                todos: {
                    [editIndex] : {
                        text: {
                            $set : newText
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
            this.setState(prevState);
        });
    }
    toggleTodo(id){
        const newTodos = [ ...this.state.todos ];
        const toggleIndex = newTodos.findIndex(v => v.id === id);

        ax.put(`/${id}`, {
            isDone : !newTodos[toggleIndex].isDone
        }).then(res => {
            //newTodos[toggleIndex] = res.data;
            this.setState({
                todos : update(newTodos, {
                    [toggleIndex] : {
                        $set : res.data
                    }
                })
            })
        })
    }
    toggleAll(){
        const newToggleAll = !this.state.todos.every(v => v.isDone);
        const axArray = this.state.todos.map(v =>
            ax.put(`/${v.id}`,{
                isDone: newToggleAll
            })
        );

        axios.all(axArray).then(res => {
            this.setState(
                update(this.state,{
                    todos: {
                        $apply : () => res.map(v => v.data)
                    }
                })
            );
        }).catch(err => {
            console.log(err);
        });
    }
    deleteCompleted(){
        //const newTodos = this.state.todos.filter(todo => !todo.isDone);
        const axArray = this.state.todos
            .filter(todo => todo.isDone)
            .map(v => ax.delete(`/${v.id}`));

        axios.all(axArray).then(() => {
            this.setState({
                todos: update(this.state.todos, {
                    $apply: todos => todos.filter(v => !v.isDone)
                })
            });
        });
    }
    selectFilter(f){
        this.setState({
            filterName: f
        });
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
            ) return true;
        });
        const activeLength = todos.filter(v => !v.isDone).length;

        return (
            <div className="todo-app">
                <Header
                    addTodo={text => this.addTodo(text)}
                    toggleAll = {() => this.toggleAll()}
                />
                <TodoList
                    todos      = {filteredTodos}
                    editingId  = {editingId}
                    deleteTodo = {id => this.deleteTodo(id)}
                    editTodo   = {id => this.editTodo(id)}
                    cancelEdit = {() => this.cancelEdit()}
                    saveTodo   = {(id, newText) => this.saveTodo(id, newText)}
                    toggleTodo = {id => this.toggleTodo(id)}
                />
                <Footer
                    filterName = {filterName}
                    activeLength = {activeLength}
                    selectFilter = {f =>  this.selectFilter(f)}
                    deleteCompleted = {() => this.deleteCompleted()}
                />
            </div>
        );
    }
}

export default App;
