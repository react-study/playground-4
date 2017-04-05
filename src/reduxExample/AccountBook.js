import React, {Component} from 'react';

class AccountBook extends Component {
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
                        this.props.cashList.map(({deposit = '', withdraw = '', cash},i) => {
                            return (
                                <tr key={`data-row${i}`}>
                                    <td>{deposit}</td>
                                    <td>{withdraw ? Math.abs(withdraw) : ''}</td>
                                    <td>{cash}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )
    }
}

export default AccountBook;
