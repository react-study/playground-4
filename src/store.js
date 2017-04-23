import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
//import thunk from 'redux-thunk';

import TodoReducer from './reducers/TodoReducer';

const logger = store => dispatch => action => {
    if(typeof action === 'object'){
        console.log('dispatch',action);
    } else{
        console.log('dispatch',typeof action);
    }
    let result = dispatch(action);
    console.log('dispatch state',store.getState());
    return result;
};

const thunk = store => dispatch => action =>
    typeof action === 'function' ? action(store.dispatch, store.getState) : dispatch(action);

const composeResult = compose(
    applyMiddleware(logger, thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default createStore(
    TodoReducer,
    composeResult
);
