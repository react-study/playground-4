import axios from 'axios';
const ax = axios.create({
    baseURL: 'http://localhost:2403/todos',
    timeout: 1000
});

const TodoAction = {
    getTodos:() => dispatch => {
        dispatch({
            type: 'GET_TODOS_RESPONSE'
        });

        ax.get('/')
        .then(res => {
            dispatch({
                type: 'GET_TODOS_RESPONSE',
                todos: res.data
            })
        })
    },

    addTodo: text => ({
        type: 'ADD_TODO',
        text
    }),
    deleteTodo: id => ({
        type: 'DELETE_TODO',
        id
    }),
    editTodo: id => ({
        type: 'EDIT_TODO',
        id
    }),
    cancelEdit: () => ({
        type: 'CANCEL_EDIT'
    }),
    saveTodo: (id, newText) => ({
        type: 'SAVE_TODO'
        ,id
        ,newText
    }),
    toggleTodo: id => ({
        type: 'TOGGLE_TODO',
        id
    }),
    toggleAll: () => ({
        type: 'TOGGLE_ALL'
    }),
    deleteCompleted: () => ({
        type: 'DELETE_COMPLETED'
    })
};

export default TodoAction;