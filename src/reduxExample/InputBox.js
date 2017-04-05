import React from 'react';

class InputBox extends React.Component {

    componentDidUpdate() {
        this.inputCash.focus();
    }

    onSubmit(type) {
      const cash = Number(this.inputCash.value);
      const asset = {
          cash:     cash,
          cashType: type
      };
      if(!this.inputCash.value){
        alert(this.inputCash.placeholder);
        this.inputCash.focus();
        return;
      }
      this.props.addBook(asset);
      this.inputCash.value = '';
    }

    render() {
        return (
            <div className="inputBox">
                <input
                    type="text"
                    placeholder="금액을 입력하세요"
                    ref= {ref => this.inputCash = ref}
                />
                <button type="button" onClick={e => this.onSubmit(true)}>입금</button>
                <button type="button" onClick={e => this.onSubmit(false)}>출금</button>
            </div>
        );
    }
}

export default InputBox;
