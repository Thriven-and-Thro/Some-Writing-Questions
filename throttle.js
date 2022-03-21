function throttle(
  fn,
  interval,
  options = { leading: true, trailing: false, resultCallback: null }
) {
  let { leading, trailing, resultCallback } = options;

  // 保存上一次的结束时间
  let lastTime = 0;
  // 保存定时器，同于最后一次执行
  let timer = null;
  function _throttle(...arg) {
    return new Promise((resolve, reject) => {
      const nowTime = new Date().getTime();
      // 第一次不执行
      if (!lastTime && !leading) lastTime = nowTime;
      // nowTime - lastTime：两次间距
      const remainTime = interval - (nowTime - lastTime);
      // 两次间距已经大于规定间距，可以触发函数
      if (remainTime <= 0) {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        const result = fn.apply(this, arg);
        if (resultCallback) resultCallback(result);
        resolve(result);
        lastTime = nowTime;
        // 刚好触发不需要后续定时器
        return;
      }

      if (trailing) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          timer = null;
          // 如果第一次执行，需要设置实时时间，防止连续执行两次
          lastTime = !leading ? 0 : new Date().getTime();
          const result = fn.apply(this, arg);
          if (resultCallback) resultCallback(result);
          resolve(result);
        }, remainTime);
      }
    });
  }

  _throttle.cancel = () => {
    if (timer) clearTimeout(timer);
    timer = null;
    lastTime = 0;
  };

  return _throttle;
}
