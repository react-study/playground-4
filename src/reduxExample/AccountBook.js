import React from 'react';
import Book from './Book';

class AccountBook extends React.Component {
    render() {
        const {
            books
        } = this.props;

        const booklist = books.map(({deposit, withdraw, total, id}) => (
            <Book
                key      = {`book#${id}`}
                deposit  = {deposit}
                withdraw = {withdraw}
                total    = {total}
            />
        ));
        return (
            <div className="AccountBook">
                <table>
                    <caption>금전출납부</caption>
                    <colgroup>
                        <col width="33%" />
                        <col width="34%" />
                        <col width="33%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col">입금</th>
                            <th scope="col">출금</th>
                            <th scope="col">잔액</th>
                        </tr>
                    </thead>
                    <tbody>
                        {booklist}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default AccountBook;
