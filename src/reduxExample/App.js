import React, {Component} from 'react';
import update from 'immutability-helper';

import InputBox from './InputBox';
import AccountBook from './AccountBook';


class App extends Component {
    constructor(props) {
        super(props);
        this.state ={
            cashList: [],
            cash: 0
        }
    }

    deposit(m) {
        //입금
        if( m === '') {
            return false;
        }
        const money = Math.abs(+m);
        const cash = this.state.cash + money;
        this.setState(update(this.state, {
            cashList: {
                $push: [{
                    deposit: money,
                    withdraw: '',
                    cash: cash
                }]
            },
            cash: {
                $set: cash
            }
        }));
    }
    withdraw(m) {
        //출금
        if( m === '') {
            return false;
        }
        const money = -Math.abs(+m);
        const cash = this.state.cash + money;
        if( cash < 0 ) {
            alert('잔액 부족');
            return false;
        }
        this.setState(update(this.state, {
            cashList: {
                $push: [{
                    deposit: '',
                    withdraw: money,
                    cash: cash
                }]
            },
            cash: {
                $set: cash
            }
        }));
    }
    render() {
        return (
            <div>
                <InputBox
                    deposit={(m) => this.deposit(m)}
                    withdraw={(m) => this.withdraw(m)}
                />
                <AccountBook
                    cashList={this.state.cashList}
                    cash={this.state.cash}
                />
            </div>
        )
    }
}

export default App;
