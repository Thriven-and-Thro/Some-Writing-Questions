function isObject(obj) {
  const type = typeof obj;
  return type !== "null" && (type === "object" || type === "function");
}

function deepClone(obj, map = new WeakMap()) {
  // 若循环引用，直接返回保存的引用
  if (map.has(obj)) return map.get(obj);

  // 此处set、map只是浅拷贝
  if (obj instanceof Set) return new Set([...obj]);
  if (obj instanceof Map) return new Map([...obj]);

  // Symbol作为value直接赋值即可
  if (typeof obj === "symbol") return obj;

  // 函数直接赋值即可，不需要深拷贝
  // 因为函数本来就是用来复用的，拷贝没有意义
  if (typeof obj === "function") return obj;

  if (!isObject(obj)) return obj;
  const newObj = Array.isArray(obj) ? [] : {};

  // 保存引用
  map.set(obj, newObj);

  for (let key in obj) {
    newObj[key] = deepClone(obj[key], map);
  }

  // Symbol作为key
  const sKeys = Object.getOwnPropertySymbols(obj);
  for (let skey of sKeys) {
    newObj[skey] = deepClone(obj[skey], map);
  }

  return newObj;
}

// test
const s1 = Symbol(1);
const s2 = Symbol(2);
const obj = {
  name: "a",
  age: 12,
  friend: {
    name: "b",
  },
  hobby: ["games"],
  foo: () => {},
  // Symbol作为key
  [s1]: "s1",
  // Symbol作为value
  s2: s2,
  set: new Set([1, 2, 3]),
  map: new Map([
    [1, "a"],
    [2, "b"],
  ]),
};
obj.info = obj;
const newObj = deepClone(obj);
obj.friend.name = "c";
obj.hobby = [];
console.log(newObj);
