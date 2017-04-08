import React from 'react';


class InputBox extends React.Component {

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
                    onClick={() => deposit(this._input)}
                >입금</button>
                <button
                    type="button"
                    className="btn"
                    onClick={() => withdraw(this._input)}
                >출금</button>
            </div>
        )
    }
}

export default InputBox;