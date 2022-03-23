// 发布订阅者模式
class CfEventBus {
  constructor() {
    this.eventBus = {};
  }

  // 在on方法创建监听数组handlers
  on(eventName, eventCallback, thisArg) {
    let handlers = this.eventBus[eventName];
    if (!handlers) {
      handlers = [];
      this.eventBus[eventName] = handlers;
    }

    handlers.push({
      eventCallback,
      thisArg,
    });
  }

  off(eventName, eventCallback) {
    const handlers = this.eventBus[eventName];
    if (!handlers) return;
    // 复制后在复制的数组中查找
    // 防止操作原数组使索引改变而遗漏
    const newHandlers = [...handlers];
    for (let i = 0; i < newHandlers.length; i++) {
      if (newHandlers[i].eventCallback === eventCallback) {
        handlers.splice(handlers.indexOf(newHandlers[i]), 1);
      }
    }
  }

  emit(eventName, ...arg) {
    const handlers = this.eventBus[eventName];
    if (!handlers) return;
    handlers.forEach((handler) => {
      handler.eventCallback.apply(handler.thisArg, arg);
    });
  }
}

// test
const mitt = new CfEventBus();
mitt.on(
  "aaa",
  function () {
    console.log(this.name);
  },
  { name: "aaa" }
);
const logB = function () {
  console.log("bbb");
};
mitt.on("aaa", logB);
mitt.on("aaa", logB);

mitt.emit("aaa");
mitt.off("aaa", logB);
console.log("----------");
mitt.emit("aaa");
