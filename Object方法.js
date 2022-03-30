// Object.is
console.log("-------------Object.is-------------");
Object.defineProperty(Object, "cfIs", {
  value: function (x, y) {
    if (x === y) {
      return x !== 0 || y !== 0 || 1 / x === 1 / y;
    } else {
      return x !== x && y !== y;
    }
  },
  enumerable: false,
  configurable: true,
  writable: true,
});
// test
console.log(Object.cfIs(0, -0));
console.log(Object.cfIs(NaN, NaN));
console.log(Object.cfIs(NaN));

// Object.assign
console.log("-----------Object.assign-----------");
Object.defineProperty(Object, "cfAssign", {
  value: function (target, ...arg) {
    if (!target) throw new Error("目标对象不能为空");

    const res = Object(target);

    for (let i = 0; i < arg.length; i++) {
      const newArg = arg[i];
      if (newArg !== null && newArg !== undefined) {
        for (let newKey in newArg) {
          if (Object.prototype.hasOwnProperty.call(newArg, newKey)) {
            res[newKey] = newArg[newKey];
          }
        }
      }
    }
    return res;
  },
  enumerable: false,
  writable: true,
  configurable: true,
});
// test
const obj = { a: 1 };
console.log(Object.cfAssign(obj, { b: 2 }));
