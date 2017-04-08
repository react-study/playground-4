import React from 'react';
import InputBox from './InputBox';
import AccountBook from './AccountBook';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            books: [],
            saveTotal : 0
        };
    }

    addBook(asset) {
        const type    = asset.cashType;
        const cash    = asset.cash;
        const newCash = {
            deposit:  type ? cash : 0,
            withdraw: type ? 0 : cash,
            total:    type ? this.state.saveTotal + cash : this.state.saveTotal - cash
        };
        this.setState({
            books: [
                ...this.state.books,
                {
                    deposit:  newCash.deposit,
                    withdraw: newCash.withdraw,
                    total:    newCash.total,
                    id:       Date.now()
                }
            ],
            saveTotal : newCash.total
        });
    }

    render() {
        return (
            <div className="cash">
                <InputBox
                    addBook   = {asset => this.addBook(asset)}
                />
                <AccountBook
                    books     = {this.state.books}
                />
            </div>
        );
    }
}

export default App;
