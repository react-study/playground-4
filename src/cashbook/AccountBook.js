import React from 'react';

class AccountBook extends React.Component {
    render() {
      const {
        depositMoney,
        withdrawMoney,
        remainderMoney
      } = this.props;
      return(
        <tr>
          <td>{depositMoney}</td>
          <td>{withdrawMoney}</td>
          <td>{remainderMoney}</td>
        </tr>
    );
  }
}

export default AccountBook;
