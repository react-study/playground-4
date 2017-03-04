import React from 'react';
import Child from './Child';

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index : 0
    };
  }
  handleClick(i) {
    this.setState({
      index: i
    });
  }
  render () {
    const { index } = this.state;
    return (
      <div>
        <Child
          isSelected = { index === 0 }
          setIndex={() => this.handleClick(0)}
          name="yum"
          gender="female" />
        <Child
          isSelected = { index === 1 }
          setIndex={() => this.handleClick(1)}
          name="yum2"
          gender="female" />
      </div>

    );
  }
}

export default Parent;
