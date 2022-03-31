function cfNew(obj, ...arg) {
  if (!obj.prototype) throw new TypeError();
  const newObj = {};
  const res = obj.call(newObj, ...arg);
  Object.setPrototypeOf(newObj, obj.prototype);
  return res instanceof Object ? res : newObj;
}
// test
function Person() {
  this.name = "a";
}
function Student() {
  return cfNew(Person);
}
const obj1 = cfNew(Person);
console.log(obj1);
const obj2 = cfNew(Student);
console.log(obj2);
