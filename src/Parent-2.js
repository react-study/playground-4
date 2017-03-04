import React from 'react';  
import Child from './Child';

class Parent extends React.Component {
  constructor() { // 최초에 실행됨. 렌더가 일어나기 전 state를 쓴다. 
    super();
    this.state = {
      // isToggle: false // 직접 객체를 만들었다. 
      index: 0
    };
  }
  handleClick(i) { // 렌더 후 : setState를 쓰라. 
    this.setState({ // state를 바꿀땐 setState를 쓰라. 
      index: i
    });
  }
  render() {
    // const { isToggle } = this.state;
    const { index } = this.state;
    return (
      <div>
        <Child 
          isSelected={index === 0}
          setIndex={()=>this.handleClick(0)}
          name="gomugom" gender="male" />
        <Child 
          isSelected={index === 1}
          setIndex={()=>this.handleClick(1)}
          name="iu" gender="female" />
        <Child 
          isSelected={index === 2}
          setIndex={()=>this.handleClick(2)}
          name="hoho" />
      </div>
    );
  }
}

export default Parent;