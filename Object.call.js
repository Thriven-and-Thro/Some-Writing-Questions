// code
Function.prototype.cfCall = function (thisArg, ...params) {
  thisArg = Object(thisArg ?? window);
  thisArg.fn = this;
  const result = thisArg.fn(...params);
  delete thisArg.fn;
  return result;
};

// test
function foo(...params) {
  console.log(this);
  return params;
}
var obj = {};
console.log(foo.cfCall(obj, 1, 1)); // obj [1, 1]
foo.cfCall(0); // Number []
foo.cfCall(undefined); // Window []
foo.cfCall(); // Window []
