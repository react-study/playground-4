import React from "react";
import axios from "axios";
import update from "immutability-helper";
import Header from "./Header";
import TodoList from "./TodoList";
import Footer from "./Footer";

// axios 초기 설정
const ax = axios.create({
    baseURL: "http://localhost:2403/todos",
    timeout: 1000
});


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            todos: [],
            editingId: null,
        };
    }

    // 최초에 값 가져오기
    componentWillMount() {
        // get 전체리스트 가져오기
        ax.get("/").then(res => {
            this.setState({
                todos: res.data
            })
        })
    }

    // 내용추가
    addTodo(text) {
        // post는 추가
        ax.post('/', {text}).then(res => {
            this.setState({
                todos: update(this.state.todos, {
                    $push: [res.data]
                })
            });
        });
    }

    deleteTodo(id) {
        // 아이템 삭제
        ax.delete(`/${id}`).then(() => {
            const newTodos = [...this.state.todos];
            const deleteIndex = newTodos.findIndex(v => v.id === id);
            // newTodos.splice(deleteIndex, 1);

            this.setState({
                todos: update(newTodos, {
                    $splice: [
                        [deleteIndex, 1]
                    ]
                })
            });
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
        }).catch(err => {
            this.setState(prevState);
        })
    }

    toggleTodo(id) {
        //findIndex는 Array.prototype.findIndex.
        //v.id와 같은 id를 리턴
        const toggleIndex = this.state.todos.findIndex(v => v.id === id);

        ax.put(`/${id}`, {
            isDone: !this.state.todos[toggleIndex].isDone
        }).then(res => {
            this.setState(
                update(this.state, {
                    todos: {
                        [this.state.todos.findIndex(v => v.id === id)]: {
                            $set: res.data
                        }
                    }
                }),
            )
            ;
        });
    }

    toggleAll() {
        const newToggleAll = !this.state.todos.every(v => v.isDone);
        const axArray = this.state.todos.map(v =>
            ax.put(`/${v.id}`, {
                isDone: newToggleAll
            })
        );

        // 모두 response가 왔을 때 then을 실행할 수 있음
        axios.all(axArray).then(res => {
            this.setState(
                updata(this.state, {
                    todos: {
                        $apply: () => res.map(v = v.data)
                    }
                })
                //문제가 있을 경우
            )
        })
    }

    deleteCompleted() {
        // const newTodos = this.state.todos.filter(todo => !todo.isDone);
        const axArray = this.state.todos
            .filter(todo => todo.isDone)
            .map(v => ax.delete(`/${v.id}`));

        axios.all(axArray).then(() => {
            this.setState({
                // todos: newTodos
                todos: update(this.state.todos, {
                    $apply: todos => todos.filter(v => !v.isDone)
                })
            });
        });
    }

    /*    selectFilter(f) {
     this.setState({
     filterName: f
     });
     }*/

    render() {

        const {
            todos,
            editingId,
            // filterName
        } = this.state;

        const {
            match : {
                params
            }
        } = this.props;

        const filterName = params.filterName || "";

        const filteredTodos = todos.filter(v => {
            if (!filterName ||
                (filterName === "active" && !v.isDone) ||
                (filterName === "completed" && v.isDone)
            ) return true;
        });

        const activeLength = todos.filter(v => !v.isDone).length;


        return (
            <div className="todo-app">
                <Header
                    addTodo={text => this.addTodo(text)}
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
                    filterName={filterName}
                    activeLength={activeLength}
                    deleteCompleted={() => this.deleteCompleted()}
                />
            </div>
        );
    }
}

export
default
App;
