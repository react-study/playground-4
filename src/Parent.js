//----- Parent.js -----
import React from "react";
import Child from "./Child";

class Parent extends React.Component {
    // 최초에 호출됨
    constructor() {
        super(); // 부모 클래스 호출
        // 최초에 설정하는 것이기에 setSate로 하지 않아도 된다
        this.state = {
            index: 0
        };
    }

    handleClick(i) {
        // 아래처럼 setSate로 state로 바꾸어야 render가 작동 한다.
        this.setState({
            index: i
        });
    }

    render() {
        const {index} = this.state;
        return (
            <div>
                <Child
                    isSelected={index === 0}
                    setIndex={() => this.handleClick(0)}
                    name="gomugom"
                    gender="male"/>

                <Child
                    isSelected={index === 1}
                    setIndex={() => this.handleClick(1)}
                    name="iu"
                    gender="female"/>

                <Child
                    isSelected={index === 2}
                    setIndex={() => this.handleClick(2)}
                    name="jn"/>
            </div>
        )
    }
}

export default Parent;


// v1

//class Parent extends React.Component {
//    // 최초에 호출됨
//    constructor() {
//        super(); // 부모 클래스 호출
//        // 최초에 설정하는 것이기에 setSate로 하지 않아도 된다
//        this.state = {
//            isToggle: false
//        };
//    }
//
//    handleClick() {
//        // 아래처럼 setSate로 state로 바꾸어야 render가 작동 한다.
//        this.setState({
//            isToggle: !this.state.isToggle
//        });
//    }
//
//    render() {
//        const {isToggle} = this.state;
//        return (
//            <div
//                style={{color: isToggle ? "#f00" : "#00f"}}
//                onClick={() => this.handleClick()}
//            >
//                <Child name="gomugom" gender="male"/>
//                <Child name="iu" gender="female"/>
//                <Child name="iu"/>
//            </div>
//        )
//    }
//}

//export default Parent;
