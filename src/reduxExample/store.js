import { createStore} from 'redux';
import AccountReducer from './reducers/AccountReducer';

export default createStore(
    AccountReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
