// code
Function.prototype.cfApply = function (thisArg, arrayArg = []) {
  thisArg = Object(thisArg ?? window);
  thisArg.fn = this;
  const result = thisArg.fn(...arrayArg);
  delete thisArg.fn;
  return result;
};

// test
function foo(...params) {
  console.log(this);
  return params;
}
var obj = {};
console.log(foo.cfApply(obj, [1, 1])); // obj [1, 1]
foo.cfApply(0); // Number []
foo.cfApply(undefined); // Window []
foo.cfApply(); // Window []
