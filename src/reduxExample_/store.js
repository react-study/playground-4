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

/* 컴바인리듀서(2개 이상인 경우 뎁스가 한번 늘어난다)
this.state ={
  account:{
    accountList:[]
  },
  tab: {
    focused:0
  }
}
*/
