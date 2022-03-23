function cfInstanceof(ins, con) {
  if ((typeof ins !== "object" && typeof ins !== "function") || ins === null) {
    return false;
  }
  let proto = Object.getPrototypeOf(ins);
  while (1) {
    if (con.prototype === proto) return true;
    else if (proto === null) return false;
    else proto = Object.getPrototypeOf(proto);
  }
}
// test
console.log(cfInstanceof({}, Object));
console.log(cfInstanceof(1, Object));
function foo() {}
console.log(cfInstanceof(foo, Object));
