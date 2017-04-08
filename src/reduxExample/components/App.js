import React, {Component} from 'react';
import InputBox from './InputBox';
import AccountBook from './AccountBook';
import {connect} from 'react-redux';
import AccountAction from '../actions/AccountAction';


// store에 있는 state => props 로..
const mapStateToProps = state => ({
    accountList: state.accountList
});

// action(dispatch. mmethod)=>props
const mapDispatchToProps = dispatch => ({
    calc: (type, money) => dispatch(
        AccountAction[type](money)) // {type,money}가 action
});


class App extends Component {
    render() {
        const {
            accountList,
            calc,
        } = this.props;
        return (
            <div>
                <InputBox
                    calc={calc}
                />
                <AccountBook accountList={accountList}/>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


