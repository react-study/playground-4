import React, { Component } from 'react';
import InputBox from './InputBox';
import AccountBook from './AccountBook';
import { connect } from 'react-redux';
import AccountAction from '../actions/AccountAction';

// store에 있는 state를 => props 로
const mapStateToProps = state => ({
    accountList: state.accountList
});
// action(dispatch, method) => props //계산하는건 action 상태변화는 reducer 가
const mapDispatchToProps = dispath => ({
    calc : (type, money) => dispath(AccountAction[type](money)) // { type, money} 요게 액션 == AccountAction[type](money)
});

class App extends Component {

    render() {
        const {
            accountList,
            calc
        } = this.props;
        return (
            <div>
                <InputBox
                    calc={calc}
                />
                <AccountBook accountList={accountList} />
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App); //connect

