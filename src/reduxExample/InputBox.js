import React from 'react';

class InputBox extends React.Component {
    handleClick(fn) {
        const money = this._input.value;
        if (!money) return false;
        fn(money);
        this._input.value = '';
    }
    render(){
        const {
            deposit,
            withdraw
        } = this.props;

        return (
            <div>
                <input
                    type="text"
                    placeholder="숫자를 입력하세요"
                    ref={ ref => { this._input = ref }}
                />
                <button
                    type="button"
                    className="btn"
                    onClick={() => this.handleClick(deposit)}
                >입금</button>
                <button
                    type="button"
                    className="btn"
                    onClick={() => this.handleClick(withdraw)}
                >출금</button>
            </div>
        )
    }
}

export default InputBox;