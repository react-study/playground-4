import React from 'react';

class Child extends React.Component {
  constructor() { // 생성자함수
    super(); // React.Component의 생성자함수 호출 
    this.state = { // state는 다음시간에 
      isToggle: false 
    }
  }
  handleClick() {
    this.setState({ // this는 Child의 인스턴스 
      isToggle: !this.state.isToggle
    });
  }
  render () {
    const { isToggle } = this.state; // isToggle객체명, 값 같으므로 생략가능 
    return (
      <h1
        style={{ color: isToggle ? '#f00' : '#00f' }} // {}안에는 식이나 값이 온다. 지금은 객체가 들어와있다. 
        onClick={this.handleClick.bind(this)} // 원래 html의 onclick은 카멜케이스가 아니다. 여기선 카멜케이스 
                                              // this는 Child의 인스턴스 
      >
        Hello!!
      </h1>
    );
  }
}
export default Child;