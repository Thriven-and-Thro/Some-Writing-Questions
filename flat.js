// 1.flat
// 2.正则
// 3.递归
const flatten1 = (arr) => {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flatten1(cur) : cur);
  }, []);
};

// test
const a = [1, 2, [3, [5]]];
console.log(flatten1(a));
