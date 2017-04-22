import update from 'immutability-helper';

const initialState = {
    todos: [],
    editingId: null
};

const TodoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_TODOS_RESPONSE' : {
            return update(state, {
                todos: {
                    $set: action.todos

                }
            })
        }
        case 'ADD_TODO': {
            return update(state, {
                todos: {
                    $push: [action.newTodo]
                }
            });
        }
        case 'DELETE_TODO': {
            return update(state, {
                todos: {
                    $splice: [
                        [state.todos.findIndex(v => v.id === action.id), 1]
                    ]
                }
            })
        }
        case 'EDIT_TODO': {
            return update(state, {
                editingId: {
                    $set: action.id
                }
            })
        }
        case 'CANCEL_EDIT': {
            return update(state, {
                editingId: {
                    $set: null
                }
            })
        }
        case 'SAVE_TODO': {
            return update(state, {
                todos: {
                    [state.todos.findIndex(v => v.id === action.id)]: {
                        $set: action.editedTodo
                    }
                },
                editingId:{
                    $set:null
                }
            })
        }
        case 'TOGGLE_TODO': {
            return update(state, {
                todos: {
                    [state.todos.findIndex(v => v.id === action.id)]: {
                        $set: action.toggledTodo
                    }
                }
            })
        }
        case 'TOGGLE_ALL': {
            return update(state, {
                todos: {
                    $set:action.toggleTodos
                }
            })
        }
        case 'DELETE_COMPLETED': {
            return update(state, {
                todos: {
                    $set: state.todos.filter(v => !v.isDone)
                }
            });
        }
        default :
            return state;
    }
};

export default TodoReducer;
