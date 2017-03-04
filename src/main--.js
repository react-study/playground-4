// main.js
// import * as lib from './lib'; // import 가져와라. * 전부를. 이름을 lib으로. 같은폴더의 lib파일로부터. 
import lib, { square as sq, sqrt } from './lib'; // lib는 defalt로 선언한거 들어온다. 
// square as sq : square 를 sq로 이름을 바꾸기. 

// console.log(lib); // 객체로 모두 들어있는 것 확인할 수 있다. 
console.log(sq(5)); // 25
console.log(sqrt(4));  // 2

// lib.default(); // 된다. 
lib();