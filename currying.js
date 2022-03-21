// code
function cfCurrying(fn) {
  function currying(...arg1) {
    if (arg1.length >= fn.length) {
      // 注意绑定 this
      return fn.apply(this, arg1);
    } else {
      return function (...arg2) {
        // 注意绑定 this
        return currying.apply(this, [...arg1, ...arg2]);
      };
    }
  }
  return currying;
}

// test
function foo(x, y, z) {
  return x + y + z;
}
const baz = cfCurrying(foo);
console.log(baz(1, 2, 3));
console.log(baz(1)(2, 3));
console.log(baz(1)(2)(3));
