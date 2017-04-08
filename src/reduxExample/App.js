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

    deposit(input){
        const money = input.value;
        if(!money) return;

        const newItem = {
            act : 'deposit',
            money,
            sum : this.state.total + money*1,
            id : `deposit${new Date()}`
        };
        const newList = [...this.state.accountList, newItem];

        this.setState({
            accountList : newList,
            total : newItem.sum
        });
        input.value = '';
    }
    withdraw(input){
        const money = input.value;
        if(!money) return;

        const newItem = {
            act : 'withdraw',
            money,
            sum : this.state.total - money*1,
            id : `withdraw${new Date()}`
        };
        const newList = [...this.state.accountList, newItem];

        this.setState({
            accountList : newList,
            total : newItem.sum
        });
        input.value = '';
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