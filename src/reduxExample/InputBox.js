import React, {Component} from 'react';

class InputBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            money: ''
        }
    }

    changeMoney(e) {
        this.setState({
            money: e.target.value
        });
    }
    onlyNumver(e) {
        const val = e.target.value;
        if (/\D/g.test(val)) {
            e.target.value = val.replace(/\D/g, '');
        }
    }
    render() {
        return (
            <div>
                <input
                    type="text"
                    placeholder="금액"
                    onChange={(e) => this.changeMoney(e)}
                    value={this.state.money}
                    onKeyUp={(e) => this.onlyNumver(e)}
                />
                <button
                    onClick={() => {
                        this.props.deposit(this.state.money);
                        this.setState({
                            money: ''
                        });
                    }}
                >
                    입금
                </button>
                <button
                    onClick={() => {
                        this.props.withdraw(this.state.money);
                        this.setState({
                            money: ''
                        });
                    }}
                >
                    출금
                </button>
            </div>
        )
    }
}

export default InputBox;
