import React, { Component } from 'react';
import InputBox from './InputBox';
import AccountBook from './AccountBook';
import { connect } from 'react-redux';
import AccountAction from '../actions/AccountAction';
import Tabs from './Tabs'
import TabAction from '../actions/TabAction';

// store에 있는 state를 => props 로
const mapStateToProps = state => ({
    accountList: state.account.accountList,
    focused: state.tab.focused
});
// action(dispatch, method)에 있는 동작을 => props로 //계산하는건 action 상태변화는 reducer 가
const mapDispatchToProps = dispath => ({
    calc : (type, money) => dispath(AccountAction[type](money)), // { type, money} 요게 액션 == AccountAction[type](money)
    changeTab : (i) => dispath(TabAction.changeTab(i))
    //action이라는 객체를 만들어주는 ActionCreate 함수를 실행
    /*
    {
        type,
        ...data
    }
    * */
});

class App extends Component {
    render() {
        const {
            accountList,
            calc,
            focused,
            changeTab
        } = this.props;
        return (
            <div>
                <Tabs focused={focused} changeTab={changeTab}/>
                <InputBox
                    calc={calc}
                />
                <AccountBook accountList={accountList} />
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App); //connect

