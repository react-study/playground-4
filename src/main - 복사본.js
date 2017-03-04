
//------ main.js ------

import lib, { square as sq, sqrt } from 'lib';  //as는 변경할 이름
console.log(lib);             // (4)
console.log(sq(5));       // (5)
console.log(sqrt(4));         // (6)
lib();




//------ main.js ------
/* 이 방법이 더 많이 사용된다
import {square, sqrt} from './lib';
console.log(square(5));   // (2)
console.log(sqrt(4));     // (3)

*/