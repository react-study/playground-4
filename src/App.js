import React from "react";
import Header from "./Header";
import TodoList from "./TodoList";
import Footer from "./Footer";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            todos: [
                {text: " 배고파 ", id: 1000},
                {text: " 졸려 ", id: 1001},
                {text: " 날씨좋다 ", id: 1002},
            ]
        };
    }

    addTodo(text) {
        // setState는 render까지 한다
        this.setState({
            todos: [
                ...this.state.todos,
                {
                    text,
                    id: Date.now()
                }
            ]
        })
    }

    deleteTodo(id) {
        const newTodos = [...this.state.todos];
        const deleteIndex = newTodos.findIndex(v => v.id === id);
        newTodos.splice(deleteIndex, 1);
        this.setState({
            todos: newTodos
        });
    }

    render() {
        return (
            <div className="todo-app">
                <Header
                    addTodo={text => this.addTodo(text)}
                />
                <TodoList
                    todos={this.state.todos}
                    deleteTodo={id => this.deleteTodo(id)}
                />
                <Footer />
            </div>
        );
    }
}


export default App;