import React from 'react';
import Child from './Child';

class Parent extends React.Component {
  constructor() {
    super();
    this.state = {
      people: [{
        name: 'gomugom',
        phone: '010-1111-2222',
        show: false
      }, {
        name: 'iu',
        phone: '010-2222-3333',
        show: false
      }, {
        name: 'akmu',
        phone: '010-1133-3245',
        show: false
      }]
    };
  }
  handleClick(i) {
    console.log(this.state);
    const newPeople = this.state.people;
    newPeople[i].show = !newPeople[i].show;
    this.setState({
      people: newPeople
    });
  }
  render() {
    const people = this.state.people;
    const children = people.map(({name,phone,show}, i) => (
      <Child
        key = {`Child#${i}`}
        name={name}
        phone = {phone}
        show = {show}
        handleClick= {this.handleClick.bind(this, i)}
      />
    ));
    return (
      <ul>
        {children}
      </ul>
    );
  }
}

export default Parent;
