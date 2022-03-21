function debounce(fn, delay, immediate = false, resultCallback) {
  // 保存定时器的引用
  let timer = null;
  // 是否立即执行
  let isInvoke = true;

  function _debounce(...arg) {
    return new Promise((resolve, reject) => {
      // 事件监听真正的执行函数，所以该this指向元素
      // 同时含有事件监听函数的各种参数，event等
      if (timer) clearTimeout(timer);

      if (immediate && isInvoke) {
        const result = fn.apply(this, arg);
        // 执行函数时回调出去
        if (resultCallback) resultCallback(result);
        // 有结果resolve出去
        resolve(result);
        isInvoke = false;
      } else {
        timer = setTimeout(() => {
          const result = fn.apply(this, arg);
          if (resultCallback) resultCallback(result);
          resolve(result);
          isInvoke = true;
          timer = null;
        }, delay);
      }
    });
  }

  _debounce.cancel = () => {
    if (timer) clearTimeout(timer);
    timer = null;
  };

  return _debounce;
}
