//------ lib.js ------
export default function lib() {
  console.log('this is lib default function');
}
export const sqrt = Math.sqrt;
export function square(x) {
    return x * x;
}