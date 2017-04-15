import React, { Component } from 'react';

class InputBox extends Component {
    calc(type) {
        this.props.calc(type, this._input.value);
        this._input.value = '';
        this._input.focus();
    }
    render() {
        return (
            <div>
                <input type="number" ref={ref => this._input = ref}/>
                <button
                    style={{
                        display: 'inline-block',
                        border: '1px solid #000',
                        marginLeft: 5
                    }}
                    onClick={()=> this.calc('save')}>입금</button>
                <button
                    style={{
                        display: 'inline-block',
                        border: '1px solid #000',
                        marginLeft: 5
                    }}
                    onClick={()=> this.calc('withdraw')}>출금</button>
            </div>
        )
    }
}

export default InputBox;
