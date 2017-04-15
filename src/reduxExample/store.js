import { createStore, combineReducers } from 'redux';//combineReducers -> reducer들을 한데 묶는 역할
import AccountReducer from './reducers/AccountReducer';
import TabReducer from './reducers/TabReducer';

const reducers = combineReducers({
    account: AccountReducer,
    tab: TabReducer
});

export default createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
