import { createStore, combineReducers } from 'redux';
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

/*
this.state = {
    account: {
        accountList: []
    },
    tab: {
        focused: 0
    }
}
*/
