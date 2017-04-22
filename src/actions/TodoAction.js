import axios from 'axios';
const ax = axios.create({
    baseURL: 'http://localhost:2403/todos',
    timeout: 1000
});

const TodoAction = {
    getTodos: () => dispatch => {
        dispatch({
            type: 'GET_TODOS_REQUEST'
        });

        ax.get('/')
        .then(res => {
            dispatch({
                type: 'GET_TODOS_RESPONSE',
                todos: res.data
            });
        });
    },
    addTodo: text => dispatch => {
        const tempId = Date.now();
        dispatch({
            type: 'ADD_TODO_TEMPORAL',
            newTodo: {
                id: tempId,
                text
            }
        });

        ax.post('/', { text })
        .then(res => {
            dispatch({
                type: 'ADD_TODO_SUCCESS',
                tempId,
                newTodo: res.data
            });
        })
        .catch(err => {
            console.error(err);
            dispatch({
                type: 'ADD_TODO_FAILED',
                tempId
            });
        });
    },
    deleteTodo: id => (dispatch, getState) => {
        const prevTodos = getState().todos;
        dispatch({
            type: 'DELETE_TODO',
            id
        });
        ax.delete(`/${id}`)
        .then(() => {
            dispatch({
                type: 'DELETE_TODO_SUCCESS'
            });
        })
        .catch(err => {
            console.error(err);
            dispatch({
                type: 'DELETE_TODO_FAILED',
                todos: prevTodos
            });
        });
    },
    editTodo: id => ({
        type: 'EDIT_TODO',
        id
    }),
    cancelEdit: () => ({
        type: 'CANCEL_EDIT'
    }),
    saveTodo: (id, newText) => (dispatch, getState) => {
        const prevText = getState().todos.find(v => v.id === id).text;
        dispatch({
            type: 'SAVE_TODO_TEMPORAL',
            id,
            newText
        });
        ax.put(`/${id}`, { text: newText })
        .then(() => {
            dispatch({
                type: 'SAVE_TODO_SUCCESS'
            });
        })
        .catch(err => {
            console.error(err);
            dispatch({
                type: 'SAVE_TODO_FAILED',
                id,
                newText: prevText
            });
        });
    },
    toggleTodo: id => (dispatch, getState) => {
        const prevDone = getState().todos.find(v => v.id === id).isDone;
        dispatch({
            type: 'TOGGLE_TODO_TEMPORAL',
            id,
            isDone: !prevDone
        });

        ax.put(`/${id}`, { isDone: !prevDone })
        .then(() => {
            dispatch({
                type: 'TOGGLE_TODO_SUCCESS'
            });
        })
        .catch(err => {
            console.error(err);
            dispatch({
                type: 'TOGGLE_TODO_FAILED',
                id,
                isDone: prevDone
            });
        });
    },
    toggleAll: () => (dispatch, getState) => {
        const todos = getState().todos;
        const newToggleAll = !todos.every(v => v.isDone);
        dispatch({
            type: 'TOGGLE_ALL_TEMPORAL',
            toggledTodos: todos.map(v => Object.assign({}, v, {
                isDone: newToggleAll
            }))
        });

        const axArray = todos.map(todo =>
            ax.put(`/${todo.id}`, { isDone: newToggleAll })
        );
        axios.all(axArray)
        .then(() => {
            dispatch({
                type: 'TOGGLE_ALL_SUCCESS'
            });
        })
        .catch(err => {
            console.error(err);
            dispatch({
                type: 'TOGGLE_ALL_FAILED',
                toggledTodos: todos
            });
        });
    },
    deleteCompleted: () => (dispatch, getState) => {
        const todos = getState().todos;
        dispatch({
            type: 'DELETE_COMPLETED_TEMPORAL',
            todos: todos.filter(v => !v.isDone)
        });

        const axArray = todos.filter(todo => todo.isDone)
            .map(v => ax.delete(`/${v.id}`));
        axios.all(axArray).then(() => {
            dispatch({
                type: 'DELETE_COMPLETED_SUCCESS'
            });
        })
        .catch(err => {
            console.error(err);
            dispatch({
                type: 'DELETE_COMPLETED_FAILED',
                todos
            });
        });
    }
};
export default TodoAction;
