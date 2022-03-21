// code
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
