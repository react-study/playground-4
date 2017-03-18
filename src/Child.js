import React from 'react';

class Child extends React.Component {
  static defaultProps = {
    name: '이름없음',
    gender: '성별없음'
  };

  render() {
    const {
      name,
      gender,
      setIndex,
      isSelected
    } = this.props;

    return (
      <div
        style={{color: isSelected ? '#f00' : '#00f'}}
        onClick={setIndex}
      >
        <h2>{name}</h2>
        <strong>{gender}</strong>
      </div>
    )
  }
}
// Child.defaultProps = {
//   name: '이름없음',
//   gender: '성별없음'
// }

export default Child;
