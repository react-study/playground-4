import React, { Component } from 'react';
import InputBox from './InputBox';
import AccountBook from './AccountBook';
import Tabs from './Tabs';

import { connect } from 'react-redux';
import AccountAction from '../actions/AccountAction';
import TabAction from '../actions/TabAction';

// store에 있는 state를 props로
const mapStateToProps = state => ({
    accountList: state.account.accountList,
    focused: state.tab.focused
});

// action(dispatch. method) => props
const mapDispatchToProps = dispatch => ({
    calc: (type, money) => dispatch(AccountAction[type](money)), // {type, money} 이 객체가 action or // AccountAction = action creater
    changeTab: (i) => dispatch(TabAction.changeTab(i))
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
export default connect(mapStateToProps, mapDispatchToProps)(App);
