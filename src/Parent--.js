import React from 'react'; // react 모듈 불러오기. 경로를 알아서 찾아준다. 
import Child from './Child'; // 내 경로와 같은 경로에 있는 Child파일 .js생략가능 

class Parent extends React.Component { // React.Component를 상속받는 Parent class 
  render() { // 프로토타입 메소드. virual dom반환함. 필수!
    return (
      <Child /> // Child의 인스턴스
    )
  }
}
export default Parent;