import React, {Component} from 'react';
import InputBox from './InputBox';
import AccountBook from './AccountBook';
import Tabs from './Tabs';

import {connect} from 'react-redux';
import AccountAction from '../actions/AccountAction';
import TabAction from '../actions/TabAction';


// connect
// store에 있는 state => props 로.. , 감시
const mapStateToProps = state => ({
    accountList: state.account.accountList,
    focused: state.tab.focused
});

// action(dispatch. method)=>props,  액션 정의
const mapDispatchToProps = dispatch => ({
    calc: (type, money) => dispatch(
        AccountAction[type](money)), // {type,money}가 action
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
                <InputBox calc={calc}/>
                <AccountBook accountList={accountList}/>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


