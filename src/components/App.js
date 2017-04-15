import React from 'react';
import update from 'immutability-helper';
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
  getTodos:        () => dispatch(TodoAction.getTodos()),
  addTodo:         (text) => dispatch(TodoAction.addTodo(text)),
  deleteTodo:      id => dispatch(TodoAction.deleteTodo(id)),
  editTodo:        id => dispatch(TodoAction.editTodo(id)),
  cancelEdit:      () => dispatch(TodoAction.cancelEdit()),
  saveTodo:        (id, newText) => dispatch(TodoAction.saveTodo(id, newText)),
  toggleTodo:      id => dispatch(TodoAction.toggleTodo(id)),
  toggleAll:       () => dispatch(TodoAction.toggleAll()),
  deleteCompleted: () => dispatch(TodoAction.deleteCompleted())
});

class App extends React.Component {
    componentWillMount() {
      this.props.getTodos();

    }

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
                    toggleAll={toggleAll}
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
                    deleteCompleted = {deleteCompleted}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
