// Array.prototype.slice
console.log("---------Array.prototype.slice----------");
Array.prototype.cfSlice = function (start = 0, end = this.length) {
  const newArr = [];
  for (let i = start; i < end; i++) {
    newArr.push(this[i]);
  }
  return newArr;
};
// test
console.log([1, 2, 3].cfSlice(1, 2));
console.log([1, 2, 3].cfSlice());
var obj = {
  0: 1,
  1: 10,
  length: 2,
};
console.log([].cfSlice.call(obj));

// 一下代码验证出 filte 的属性会顺着原型链查找，但前提是更改 length
// const arr = [1, 2, 3, 4];
// Object.setPrototypeOf(arr, { 4: 4 });
// arr.length = 5;
// const arr1 = Array.prototype.filter.call(arr, (v) => v !== 0);
// console.log("arr1" + arr1);

// Array.prototype.filter
console.log("---------Array.prototype.filter----------");
Array.prototype.cfFliter = function (callback, thisArg) {
  if (typeof callback !== "function") throw new Error("需要传入回调函数");
  // Object
  const arr = Object(this);
  const res = [];
  // len
  const len = arr.length | 0;
  for (let i = 0; i < len; i++) {
    // in
    // call(thisArg, arr[i], i, this)
    if (i in arr && callback.call(thisArg, arr[i], i, this)) {
      res.push(arr[i]);
    }
  }
  return res;
};
// test
console.log([-1, -2, 1, 2].cfFliter((v) => v < 0));
// 一下代码验证出 filte 的属性会顺着原型链查找，但前提是更改 length
const arr = [1, 2, 3, 4];
Object.setPrototypeOf(arr, { 4: 4 });
arr.length = 5;
console.log(Array.prototype.cfFliter.call(arr, (v) => v !== 0));

// Array.prototype.map
console.log("---------Array.prototype.map----------");
Array.prototype.cfMap = function (callback, thisArg) {
  if (typeof callback !== "function") {
    throw new Error("需要传入回调函数");
  }
  const arr = Object(this);
  const len = arr.length | 0;
  const res = [];
  for (let i = 0; i < len; i++) {
    if (i in arr) {
      res[i] = callback.call(thisArg, arr[i], i, this);
    }
  }
  return res;
};
// test
console.log([-1, -2, 1, 2].cfMap((v) => v * 10));

// Array.prototype.forEch
console.log("---------Array.prototype.forEach----------");
Array.prototype.cfForEach = function (callback, thisArg) {
  if (typeof callback !== "function") {
    throw new Error("需要传入回调函数");
  }
  const arr = Object(this);
  const len = arr.length | 0;
  for (let i = 0; i < len; i++) {
    if (i in arr) {
      callback.call(thisArg, arr[i], i, this);
    }
  }
};
// test
console.log([-1, -2, 1, 2].cfForEach((v) => console.log(v)));

// Array.prototype.reduce
console.log("---------Array.prototype.reduce----------");
Array.prototype.cfReduce = function (callback, init) {
  if (typeof callback !== "function") {
    throw new Error("需要传入回调函数");
  }
  const arr = Object(this);
  const len = arr.length | 0;
  if (len <= 0) {
    throw new Error("数组长度为0");
  }
  let i, pre;
  if (init === undefined) {
    i = 1;
    pre = arr[0];
  } else {
    i = 0;
    pre = init;
  }
  for (; i < len; i++) {
    pre = callback.call(undefined, pre, arr[i], i, this);
  }
  return pre;
};
// test
console.log([-1, 2, 1, 2].cfReduce((pre, cur) => pre + cur, 1));

// Array.prototype.some
console.log("---------Array.prototype.some----------");
Array.prototype.cfSome = function (callback, thisArg) {
  if (typeof callback !== "function") {
    throw new Error("需要传入回调函数");
  }

  const arr = Object(this);
  const len = arr.length | 0;
  for (let i = 0; i < len; i++) {
    if (i in arr) {
      if (callback.call(thisArg, arr[i], i, arr)) return true;
    }
  }
  return false;
};
// test
console.log(
  [1, 2, 1, 2].cfSome((v) => {
    return v < 0;
  })
);
