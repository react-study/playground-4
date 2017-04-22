import update from 'immutability-helper';

const initialState = {
    todos: [],
    editingId: null
}

const TodoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_TODOS_RESPONSE':
            return update(state, {
                todos: {
                    $set: action.todos
                }
            });
            break;
        case 'ADD_TODO':
            return update(state, {
                todos: {
                    $push: [ action.newTodo ]
                }
            });
            break;
        case 'DELETE_TODO':
            return update(state, {
                todos: {
                    $splice: [[state.todos.findIndex(v => v.id === action.id), 1]]
                }
            });
            break;
        case 'EDIT_TODO':
            return update(state, {
                editingId: {
                    $set: action.id
                }
            });
            break;
        case 'CANCEL_EDIT':
            return update(state, {
                editingId: {
                    $set: null
                }
            });
            break;
        case 'SAVE_TODO':
            return update(state, {
                todos: {
                    [state.todos.findIndex(v => v.id === action.id)] : {
                        $set: action.editedTodo
                    }
                },
                editingId: {
                    $set: null
                }
            });
            break;
        case 'TOGGLE_TODO':
            return update(state, {
                todos: {
                    [state.todos.findIndex(v => v.id === action.id)] : {
                        $set: action.toggledTodo
                    }
                }
            });
            break;
        case 'TOGGLE_ALL':
            return update(state, {
                todos: {
                    $set: action.toggledTodos
                }
            });
            break;
        case 'DELETE_COMPLETED':
            const activeTodos = state.todos.filter(v => !v.isDone);
            return update(state, {
                todos: {
                    $set: activeTodos
                }
            });
            break;
        default: return state;
    }
}

export default TodoReducer;
