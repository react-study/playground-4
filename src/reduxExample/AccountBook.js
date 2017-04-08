import React from 'react';

class AccountBook extends React.Component {
    render(){
        const {
            accountList
        } = this.props;

        const tbRow = accountList.map( v => {
                const {act, money, sum, id} = v;
                return (
                    <tr key={id}>
                        <td>{act === 'deposit' ? money : ''}</td>
                        <td>{act === 'withdraw' ? money : ''}</td>
                        <td>{sum}</td>
                    </tr>
                )
            }
        );

        return (
            <div className="tb-account-book">
                <table>
                    <thead>
                    <tr>
                        <th>입금</th>
                        <th>출금</th>
                        <th>잔액</th>
                    </tr>
                    </thead>
                    <tbody>
                        {tbRow}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default AccountBook;