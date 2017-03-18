// lib.js
export const sqrt = Math.sqrt; // export 방출해라.
export function square(x) {
    return x * x;
}

export default function lib() {
  console.log('this is lib default function');
}