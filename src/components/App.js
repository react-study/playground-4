import React from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

import TodoAction from '../actions/TodoAction';


const mapStateToProps = state => ({
    todos: state.todos,
    editingId: state.editingId
});
const mapDispatchToProps = dispatch => ({
    getTodos: () => dispatch(TodoAction.getTodos()),
    addTodo: text => dispatch(TodoAction.addTodo(text)),
    deleteTodo: id => dispatch(TodoAction.deleteTodo(id)),
    editTodo: id => dispatch(TodoAction.editTodo(id)),
    cancelEdit: () => dispatch(TodoAction.cancelEdit()),
    saveTodo: (id, newText) => dispatch(TodoAction.saveTodo(id, newText)),
    toggleTodo: (id, newDone) => dispatch(TodoAction.toggleTodo(id, newDone)),
    toggleAll: todos => dispatch(TodoAction.toggleAll(todos)),
    deleteCompleted: todos => dispatch(TodoAction.deleteCompleted(todos))
});

class App extends React.Component {
    componentWillMount() {
        this.props.getTodos();
        /*
        ax.get('/').then(res => {
            this.setState({
                todos: res.data
            });
        });
        */
    }
    // addTodo(text) {
    //     ax.post('/', { text }).then(res => {
    //         this.setState({
    //             // todos: [ ...this.state.todos, res.data]
    //             todos: update(this.state.todos, {
    //                 $push: [ res.data ]
    //             })
    //         });
    //     });
    // }
    // deleteTodo(id) {
    //     ax.delete(`/${id}`).then(() => {
    //         this.setState(
    //             update(this.state, {
    //                 todos: {
    //                     $splice: [
    //                         [ this.state.todos.findIndex(v => v.id === id), 1 ]
    //                     ]
    //                 }
    //             })
    //         );
    //     });
    // }
    // editTodo(id) {
    //     this.setState({
    //         editingId: id
    //     });
    // }
    // cancelEdit() {
    //     this.setState({
    //         editingId: null
    //     });
    // }
    // saveTodo(id, newText) {
    //     const prevState = this.state;
    //     const editIndex = prevState.todos.findIndex(v => v.id === id);
    //     this.setState(
    //         update(prevState, {
    //             todos: {
    //                 [editIndex]: {
    //                     text: {
    //                         $set: newText
    //                     }
    //                 }
    //             },
    //             editingId: {
    //                 $set: null
    //             }
    //         })
    //     );
    //     ax.put(`/${id}`, {
    //         text: newText
    //     }).catch(err => {
    //         this.setState(prevState);
    //     });
    // }
    // toggleTodo(id) {
    //     const toggleIndex = this.state.todos.findIndex(v => v.id === id);
    //     ax.put(`/${id}`, {
    //         isDone: !this.state.todos[toggleIndex].isDone
    //     }).then(res => {
    //         this.setState(
    //             update(this.state, {
    //                 todos: {
    //                     [toggleIndex]: {
    //                         $set: res.data
    //                     }
    //                 }
    //             })
    //         );
    //     });
    // }
    // toggleAll() {
    //     const newToggleAll = !this.state.todos.every(v => v.isDone);
    //     const axArray = this.state.todos.map(v =>
    //         ax.put(`/${v.id}`, {
    //             isDone: newToggleAll
    //         })
    //     );
    //     axios.all(axArray).then(res => {
    //         this.setState(
    //             update(this.state, {
    //                 todos: {
    //                     $apply: () => res.map(v => v.data)
    //                 }
    //             })
    //         );
    //     });
    // }
    // deleteCompleted() {
    //     const axArray = this.state.todos
    //         .filter(todo => todo.isDone)
    //         .map(v => ax.delete(`/${v.id}`));
    //
    //     axios.all(axArray).then(() => {
    //         this.setState(
    //             update(this.state, {
    //                 todos: {
    //                     $apply: todos => todos.filter(v => !v.isDone)
    //                 }
    //             })
    //         );
    //     });
    // }
    render() {
        const {
            todos,
            editingId,
            addTodo,
            deleteTodo,
            editTodo,
            cancelEdit,
            saveTodo,
            toggleTodo,
            toggleAll,
            deleteCompleted,
            match: {
                params
            }
        } = this.props;

        const filterName = params.filterName || '';

        const filteredTodos = todos.filter(v => {
            if (
                !filterName ||
                (filterName === 'active' && !v.isDone) ||
                (filterName === 'completed' && v.isDone)
            ) return true;
        });
        const activeLength = todos.filter(v => !v.isDone).length;

        return (
            <div className="todo-app">
                <Header
                    addTodo={addTodo}
                    toggleAll={() => toggleAll(todos)}
                />
                <TodoList
                    todos      = {filteredTodos}
                    editingId  = {editingId}
                    deleteTodo = {deleteTodo}
                    editTodo   = {editTodo}
                    cancelEdit = {cancelEdit}
                    saveTodo   = {saveTodo}
                    toggleTodo = {toggleTodo}
                />
                <Footer
                    filterName      = {filterName}
                    activeLength    = {activeLength}
                    deleteCompleted = {() => deleteCompleted(todos)}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
