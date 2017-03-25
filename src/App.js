
import React from 'react';

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            todos: [
                {
                    text: '배고파',
                    id: 1000,
                    isDone: false
                },
                {
                    text: '졸려',
                    id: 1001,
                    isDone: false
                },
                {
                    text: '날씨좋다',
                    id: 1002,
                    isDone: false
                }
            ],
            editingId: null,
            filterName: 'All'
        };
    }
    addTodo(text) {
        this.setState({
            todos: [
                ...this.state.todos,
                {
                    text,
                    id: Date.now(),
                    isDone: false
                }
            ]
        });
    }
    deleteTodo(id) {
        const newTodos = [...this.state.todos];
        const deleteIndex = newTodos.findIndex(v => v.id === id);
        newTodos.splice(deleteIndex, 1);
        this.setState({
            todos: newTodos
        });
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
    toggleTodo(id){
        const newTodos = [ ...this.state.todos ];
        const toggleIndex = newTodos.findIndex(v => v.id === id);
        newTodos[toggleIndex] = Object.assign({}, newTodos[toggleIndex], {
            isDone : !newTodos[toggleIndex].isDone
        });
        this.setState({
            todos : newTodos
        })
    }
    toggleAll(){
        const newToggleAll = !this.state.todos.every(v => v.isDone);
        const newTodos = this.state.todos.map(todo => Object.assign({}, todo, {
            isDone : newToggleAll
        }));
        this.setState({
            todos: newTodos
        });
    }
    deleteCompleted(){
        const newTodos = this.state.todos.filter(todo => !todo.isDone);
        this.setState({
            todos: newTodos
        })
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
