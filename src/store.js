import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
//import thunk from 'redux-thunk';

import TodoReducer from './reducers/TodoReducer';

const logger = store => next => action => {
  if(typeof action === 'object'){
    //console.log('dispatching', action);
  }else{
    //console.log('dispatching', typeof action)
  }
  let result = next(action);
  //console.log('next state', store.getState());
  return result;
};

const thunk = store => dispatch => action => {
  if(typeof action === 'function'){
    action(store.dispatch, store.getState)
  }else{
    dispatch(action);
  }
};

const composeResult = compose(
  applyMiddleware(logger, thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default createStore(
  TodoReducer,
  composeResult
);
