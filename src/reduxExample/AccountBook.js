import React, {Component} from 'react';

class AccountBook extends Component {
    constructor(props) {
        super(props);
    }
    AccountList() {
        this.props.cashList.map((v,i) => {
            console.log(v > 0)
            if( v > 0 ) {
                return `
                    <tr>
                        <td>${v}</td>
                        <td></td>
                        <td>${this.props.cash}</td>
                    </tr>
                `;
            } else {
                return `
                    <tr>
                        <td></td>
                        <td>${Math.abs(v)}</td>
                        <td>${this.props.cash}</td>
                    </tr>
                `;
            }
        });
    }
    render() {
        return (
            <table style={{borderCollapse: 'collapse'}}>
                <thead>
                <tr>
                    <th>입금</th>
                    <th>출금</th>
                    <th>잔액</th>
                </tr>
                </thead>
                <tbody>
                    {
                        this.props.cashList.map(({deposit, withdraw, cash},i) => {
                            if( withdraw === '' ) {
                                return (
                                    <tr key={`data-row${i}`}>
                                        <td>{deposit}</td>
                                        <td></td>
                                        <td>{cash}</td>
                                    </tr>
                                )
                            } else {
                                return (
                                    <tr key={`data-row${i}`}>
                                        <td></td>
                                        <td>{Math.abs(withdraw)}</td>
                                        <td>{cash}</td>
                                    </tr>
                                )
                            }
                        })
                    }
                </tbody>
            </table>
        )
    }
}

export default AccountBook;
