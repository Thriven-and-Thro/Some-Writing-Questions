// 观察者模式
// event: type => [ handler :{ callback } ]
// 但感觉以下是发布订阅者模式
class EventEmitter {
  constructor() {
    this.events = new Map();
  }
}

function wrapCallback(listener, once = false) {
  return {
    callback: listener,
    once,
  };
}

EventEmitter.prototype.addListener = function (type, listener) {
  const handlers = this.events.get(type);

  if (!handlers) {
    this.events.set(type, [wrapCallback(listener)]);
  } else {
    handlers.push(wrapCallback(listener));
  }
};

EventEmitter.prototype.emit = function (type, ...arg) {
  const handlers = this.events.get(type);
  if (!handlers) return;
  else {
    for (let handler of handlers) {
      handler.callback.apply(this, arg);
      if (handler.once) {
        this.removeListener(type, handler);
      }
    }
  }
};

EventEmitter.prototype.removeListener = function (type, listener) {
  const handlers = this.events.get(type);
  if (!handlers) return;
  else {
    const newHandlers = [...handlers];
    for (let i = 0; i < newHandlers.length; i++) {
      if (newHandlers[i].callback === listener.callback) {
        handlers.splice(i, 1);
      }
    }
  }
};

EventEmitter.prototype.once = function (type, listener) {
  const handlers = this.events.get(type);

  if (!handlers) {
    this.events.set(type, [wrapCallback(listener, true)]);
  } else {
    handlers.push(wrapCallback(listener, true));
  }
};

// test
const mitt = new EventEmitter();
mitt.addListener("aaa", (a, b) => {
  console.log("i'm aaa" + a + b);
});
mitt.emit("aaa", "b", "c");
mitt.once("bbb", (a) => {
  console.log(a);
});
mitt.emit("bbb", "b");
mitt.emit("bbb", "b");
