// code
Function.prototype.cfBind = function (thisArg, ...arrayArg) {
  thisArg = Object(thisArg ?? window);
  thisArg.fn = this;

  return function (...paramArg) {
    const result = thisArg.fn(...[...arrayArg, ...paramArg]);
    delete thisArg.fn;
    return result;
  };
};

// test
function foo(...params) {
  console.log(this);
  return params;
}
var obj = {};
console.log(foo.cfBind(obj, 1)(1)); // obj [1, 1]
foo.cfBind(0)(); // Number []
foo.cfBind(undefined)(); // Window []
foo.cfBind()(); // Window []
