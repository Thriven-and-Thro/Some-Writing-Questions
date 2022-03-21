const PROMISE_STATUS_PENDING = "pending";
const PROMISE_STATUS_FULFILLED = "fulfilled";
const PROMISE_STATUS_REJECTED = "rejected";

function execFunctionWithCatchError(execFn, value, resolve, reject) {
  try {
    const result = execFn(value);
    resolve(result);
  } catch (err) {
    reject(err);
  }
}

class CfPromise {
  constructor(executor) {
    // 以下的 resolve、reject、this 都是本实例的
    this.status = PROMISE_STATUS_PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledFns = [];
    this.onRejectedFns = [];

    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return;
          this.status = PROMISE_STATUS_FULFILLED;
          this.value = value;
          this.onFulfilledFns.forEach((fn) => {
            fn(this.value);
          });
        });
      }
    };

    const reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return;
          this.status = PROMISE_STATUS_REJECTED;
          this.reason = reason;
          this.onRejectedFns.forEach((fn) => {
            fn(this.reason);
          });
        });
      }
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    onRejected =
      onRejected ||
      ((err) => {
        throw err;
      });

    onFulfilled = onFulfilled || ((value) => value);

    return new CfPromise((resolve, reject) => {
      // 以下的 resolve、reject、this 都是新实例的
      // then 异步调用
      if (this.status === PROMISE_STATUS_FULFILLED && onFulfilled) {
        execFunctionWithCatchError(onFulfilled, this.value, resolve, reject);
      }
      if (this.status === PROMISE_STATUS_REJECTED && onRejected) {
        execFunctionWithCatchError(onRejected, this.reason, resolve, reject);
      }

      // then 同步调用
      if (this.status === PROMISE_STATUS_PENDING) {
        if (onFulfilled)
          this.onFulfilledFns.push(() => {
            execFunctionWithCatchError(
              onFulfilled,
              this.value,
              resolve,
              reject
            );
          });
        if (onRejected)
          this.onRejectedFns.push(() => {
            execFunctionWithCatchError(
              onRejected,
              this.reason,
              resolve,
              reject
            );
          });
      }
    });
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  finally(onFinally) {
    this.then(onFinally, onFinally);
  }

  static resolve(value) {
    return new CfPromise((resolve) => resolve(value));
  }

  static reject(reason) {
    return new CfPromise((resolve, reject) => reject(reason));
  }

  static all(promises) {
    return new CfPromise((resolve, reject) => {
      const result = [];
      promises.forEach((promise) => {
        promise.then((res) => {
          result.push(res);
          if (result.length === promises.length) resolve(result);
        }, reject);
      });
    });
  }

  static allSettled(promises) {
    return new CfPromise((resolve) => {
      const result = [];
      promises.forEach((promise) => {
        promise.then(
          (res) => {
            result.push({ status: PROMISE_STATUS_FULFILLED, value: res });
            if (result.length === promises.length) resolve(result);
          },
          (err) => {
            result.push({ status: PROMISE_STATUS_REJECTED, value: err });
            if (result.length === promises.length) resolve(result);
          }
        );
      });
    });
  }

  static race(promises) {
    return new CfPromise((resolve, reject) => {
      promises.forEach((promise) => {
        promise.then(resolve, reject);
      });
    });
  }

  static any(promises) {
    return new CfPromise((resolve, reject) => {
      const reason = [];
      promises.forEach((promise) => {
        promise.then(resolve, (err) => {
          reason.push(err);
          if (reason.length === promises.length)
            reject(new AggregateError(reason));
        });
      });
    });
  }
}

// test
const promise = new CfPromise((resolve, reject) => {
  console.log("状态pending");
  reject(2222);
});

// // then
// promise
//   .then(
//     (res) => {
//       console.log("res1:", res);
//       return "aaaa";
//     },
//     (err) => {
//       console.log("err1:", err);
//       return "bbbbb";
//     }
//   )
//   .then(
//     (res) => {
//       console.log("res2:", res);
//     },
//     (err) => {
//       console.log("err2:", err);
//     }
//   );

// // catch
// promise
//   .then((res) => {
//     console.log("res:", res);
//   })
//   .catch((err) => {
//     console.log("err:", err);
//   });

// // finally
// promise
//   .then((res) => {
//     console.log("res1:", res);
//     return "aaaaa";
//   })
//   .then((res) => {
//     console.log("res2:", res);
//   })
//   .catch((err) => {
//     console.log("err:", err);
//   })
//   .finally(() => {
//     console.log("finally");
//   });

// // resolve reject race
// CfPromise.resolve("Hello World").then((res) => {
//   console.log("res:", res);
// });
// CfPromise.reject("Error Message").catch((err) => {
//   console.log("err:", err);
// });

const p1 = new CfPromise((resolve, reject) => {
  setTimeout(() => resolve("res1"), 1000);
});
const p2 = new CfPromise((resolve, reject) => {
  setTimeout(() => reject("res2"), 2000);
});
const p3 = new CfPromise((resolve, reject) => {
  setTimeout(() => resolve("res3"), 3000);
});

// all allSettled race any
CfPromise.all([p1, p2, p3])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
