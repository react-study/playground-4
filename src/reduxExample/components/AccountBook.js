import React, { Component } from 'react';

const AccountBook = ({
    accountList
}) => {
    const tableData = accountList.map(({type, money, result}, i) => (
        <tr key={i}>
            <td>{type === 'SAVE_MONEY' ? money : ''}</td>
            <td>{type === 'WITHDRAW_MONEY' ? money : ''}</td>
            <td>{result}</td>
        </tr>
    ));
    return (
        <table>
            <thead>
                <tr>
                    <th>입금</th>
                    <th>출금</th>
                    <th>계</th>
                </tr>
            </thead>
            <tbody>
                {tableData}
            </tbody>
        </table>
    );
}
export default AccountBook;
