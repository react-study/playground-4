import {createStore, combineReducers} from "redux";
import AccountReducer from "./reducers/AccountReducer";
import TabReducer from './reducers/TabReducer';

// 레듀서를 묶는 컴바인리듀서
const reducers = combineReducers({
    account: AccountReducer,
    tab: TabReducer
});

export default createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);