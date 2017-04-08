import React from 'react';
import InputBox from './InputBox';
import AccountBook from './AccountBook';

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            accountList : [
                //{act : 'deposit', money : 200, sum : 200, id : 1001}
            ],
            total : 0
        }
    }

    deposit(money){
        const newItem = {
            act : 'deposit',
            money,
            sum : this.state.total + money*1,
            id : `deposit${new Date()}`
        };

        this.setState({
            accountList : [...this.state.accountList, newItem],
            total : newItem.sum
        });
    }
    withdraw(money){
        const newItem = {
            act : 'withdraw',
            money,
            sum : this.state.total - money*1,
            id : `withdraw${new Date()}`
        };

        this.setState({
            accountList : [...this.state.accountList, newItem],
            total : newItem.sum
        });
    }

    render(){
        return (
            <div>
                <InputBox
                    deposit={(input)=>this.deposit(input)}
                    withdraw={(input)=>this.withdraw(input)}
                />
                <AccountBook
                    accountList={this.state.accountList}
                />
            </div>
        )
    }
}

export default App;