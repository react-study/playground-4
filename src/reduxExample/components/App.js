import React, { Component } from 'react';
import InputBox from './InputBox';
import AccountBook from './AccountBook';
import { connect } from 'react-redux';
import AccountAction from '../actions/AccountAction';

// store에 있는 state 를 => props 로
const mapStateToProps = state => ({
    accountList: state.accountList
});

// action(dispatch. method) => props
const mapDispatchToProps = dispatch => ({
    calc: (type, money) => dispatch(AccountAction[type](money))
    // calc: (type, money) => dispatch()
});

class App extends Component {
    render() {
        const {
            accountList,
            calc
        } = this.props;

        return (
            <div>
                <InputBox calc={calc} />
                <AccountBook accountList={accountList} />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
