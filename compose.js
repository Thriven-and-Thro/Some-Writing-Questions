/**
 * 关键点：
 * 1.过滤非函数
 * 2.通过 reduce 和 call 实现连续调用
 */
// code
function cfCompose(...arg) {
  arg = arg.filter((v) => typeof v === "function");
  if (!arg.length) throw new TypeError("Error input");

  return function (...params) {
    return arg.reduce((pre, cur) => cur.call(this, pre), ...params);
  };
}

// test
const sum = (num) => num * 2;
const spr1 = (num) => num ** 2;
const spr2 = (num) => num ** 2;
const fn = cfCompose(sum, spr1, spr2);
console.log(fn(10));
