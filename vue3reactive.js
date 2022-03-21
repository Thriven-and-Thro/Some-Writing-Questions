let currentFn = null;
class Depend {
  constructor() {
    this.reactiveSet = new Set();
  }

  depend() {
    if (currentFn) this.reactiveSet.add(currentFn);
  }

  notify() {
    this.reactiveSet.forEach((fn) => {
      fn();
    });
  }
}

const weakMap = new WeakMap();
function getDepend(target, key) {
  let map = weakMap.get(target);
  if (!map) {
    map = new Map();
    weakMap.set(target, map);
  }
  let depend = map.get(key);
  if (!depend) {
    depend = new Depend();
    map.set(key, depend);
  }
  return depend;
}

const reactive = (obj) => {
  return new Proxy(obj, {
    get(target, key, receiver) {
      const depend = getDepend(target, key);
      depend.depend();
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      const depend = getDepend(target, key);
      Reflect.set(target, key, value, receiver);
      depend.notify();
    },
  });
};

function watchFn(fn) {
  currentFn = fn;
  fn();
  currentFn = null;
}

// test
const obj1 = reactive({
  name: "one",
  age: 1,
});
const obj2 = reactive({
  address: "Guangzhou",
});

watchFn(() => {
  console.log(obj1.name);
});
watchFn(() => {
  console.log(obj2.address);
});
watchFn(() => {
  console.log(obj1.name);
  console.log(obj1.age);
});
console.log("------------------");
obj1.name = "two";
console.log("------------------");
obj2.address = "Beijing";
console.log("------------------");
obj1.age = 2;
