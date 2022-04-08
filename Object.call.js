/**
 * 关键点：
 * 1.使用 Object 转换
 * 2.使用 this 获取调用的函数
 * 3.将函数作为属性挂载到指定的对象上
 */

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
