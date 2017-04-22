import axios from 'axios';
const ax = axios.create({
    baseURL: 'http://localhost:2403/todos',
    timeout: 1000
});


const TodoAction = {
  getTodos: () => dispatch => {
    ax.get('/').then(res => {
      dispatch({
        type: 'GET_TODOS_RESPONSE',
        todos: res.data
      });
    });
  },
  addTodo: text => dispatch => {
    ax.post('/', { text })
    .then(res => {
      dispatch({
        type: 'ADD_TODO',
        newTodo: res.data
      });
    });
  },
  deleteTodo: id => dispatch =>{
    ax.delete(`/${id}`)
    .then(() => {
      dispatch({
        type: 'DELETE_TODO',
        id
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
  saveTodo: (id, newText) => dispatch => {
      ax.put(`/${id}`, { text: newText})
      .then(res => {
        dispatch({
          type: 'SAVE_TODO',
          id,
          editedTodo: res.data
        });
      });
  },
  toggleTodo: (id, newDone) => dispatch => {
      ax.put(`/${id}`, { isDone: newDone})
      .then(res => {
        dispatch({
          type: 'TOGGLE_TODO',
          id,
          toggledTodo: res.data
        });
      });
  },
  toggleAll: todos => dispatch => {
    const newToggleAll = !todos.every(v => v.isDone);
    const axArray = todos.map(todo =>
      ax.put(`/${todo.id}`, { isDone: newToggleAll})
    );
    axios.all(axArray).then(res => {
      dispatch({
        type: 'TOGGLE_ALL',
        toggledTodos: res.map(v => v.data)
      })
    });
  },
  deleteCompleted: todos => dispatch => {
    const axArray = todos.filter(todo => todo.isDone)
      .map(v => ax.delete(`/${v.id}`));
    axios.all(axArray).then(() => {
      dispatch({
        type: 'DELETE_COMPLETED'
      });
    });
  }
}

export default TodoAction;
