import React from 'react';

import AccountBook from './AccountBook';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      list : [
        {
          withdrawMoney:0,
          depositMoney:0,
          remainderMoney:0
        }
      ],
      money: ''
    }
    this.depositClick = this.depositClick.bind(this);
    this.withdrawClick = this.withdrawClick.bind(this);
    this.inputMoney = this.inputMoney.bind(this);
  }
  inputMoney(e) {
    const newMoney = 1*e.target.value;
    console.log(newMoney);
    if(newMoney < 1){
        return alert('0원이상 입력해주세요');
      } else {
        this.setState({
         ...this.state,
         money : newMoney
    });}
  }
  depositClick() {
    this.setState({
      ...this.state,
      money : '',
      list : [
        ...this.state.list,
        {
          depositMoney : this.state.money,
          remainderMoney : this.state.list[this.state.list.length-1].remainderMoney +this.state.money
        }
      ]
    });
  }
  withdrawClick() {
    this.setState({
      ...this.state,
      money : '',
      list : [
        ...this.state.list,
        {
          withdrawMoney : this.state.money,
          remainderMoney : this.state.list[this.state.list.length-1].remainderMoney - this.state.money
        }
      ]
    });
  }

  render() {
    const cashList = this.state.list.map(
      ({depositMoney, withdrawMoney, remainderMoney}) =>
        (<AccountBook
          depositMoney = {depositMoney}
          withdrawMoney = {withdrawMoney}
          remainderMoney = {remainderMoney}
        />
      )
    );
      return(
        <div>
          <input
            name="keyword"
            placeholder="금액을 입력해주세요"
            value={this.state.money}
            onChange={this.inputMoney}
          />
          <button onClick={this.depositClick}>입금</button>
          <button onClick={this.withdrawClick}>출금</button>
            <table>
              <thead>
                <tr>
                  <th>입금</th>
                  <th>출금</th>
                  <th>잔액</th>
                </tr>
              </thead>
              <tbody>
                  {cashList}
              </tbody>
            </table>
        </div>
      );
    }
}

export default App;
