import React from 'react';
import Child from './Child';

class Parent extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0
    };
  }
  handleClick(i) {
    this.setState({
      index: i
    });
  }
  render() {
    const { index } = this.state;
    return (
      <div>
        <Child
          isSelected={index === 0}
          setIndex={() => this.handleClick(0)}
          name="gomugom"
          gender="male"
        />

        <Child
          isSelected={index === 1}
          setIndex={() => this.handleClick(1)}
          name="iu"
          gender="female"
        />

        <Child
          isSelected={index === 2}
          setIndex={() => this.handleClick(2)}
          name="jn"
        />
      </div>
    );
  }
}

export default Parent;
