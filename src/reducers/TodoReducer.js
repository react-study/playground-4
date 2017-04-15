import update from 'immutability-helper';

const initialState = {
  todos: [],
  editingId: null
};

const TodoReducer = (state = initialState, action) => {
  switch(action.type){
    case 'GET_TODOS_RESPONSE': {
      return update(state, {
        todos: {
          $set:action.todos
        }
      })
    }
    case 'ADD_TODO': {
      return update(state, {
        todos: {
          $push: [{
            id: Date.now(),
            text: action.text,
            isDone: false
          }]
        }
      });
    }
    case 'DELETE_TODO': {
      return update(state, {
        todos: {
          $splice: [
            [ state.todos.findIndex(v => v.id === action.id), 1]
          ]
        }
      });
    }
    case 'EDIT_TODO': {
      return update(state, {
        editingId: {
          $set: action.id
        }
      });
    }
    case 'CANCEL_EDIT': {
      return update(state, {
        editingId: {
          $set: null
        }
      });
    }
    case 'SAVE_TODO': {
      return update(state, {
        todos: {
          [state.todos.findIndex(v => v.id === action.id)]: {
            text: {
              $set: action.newText
            }
          }
        }
      });
    }
    case 'TOGGLE_TODO': {
      const toggleIndex = state.todos.findIndex(v => v.id === action.id);
      return update(state, {
        todos: {
          [toggleIndex]: {
            isDone: {
              $set: !state.todos[toggleIndex].isDone
            }
          }
        }
      });
    }
    case 'TOGGLE_ALL': {
      const newToggleAll = !state.todos.every(v => v.isDone);
      return update(state, {
          todos: {
            $apply: todos => todos.map(todo => {
              todo.isDone = newToggleAll;
              return todo;
            })
          }
      });
    }
    case 'DELETE_COMPLETED': {
      return update(state, {
        todos: {
          $set: state.todos.filter(v => !v.isDone)
        }
      });
    }
    default: return state;
  }
}

export default TodoReducer;
