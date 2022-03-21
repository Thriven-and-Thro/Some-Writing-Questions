// 1.set或map
const unique1 = (arr) => Array.from(new Set(arr));
// 2.index或include或filter
const unique2 = (arr) => {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    if (res.indexOf(arr[i]) === -1) res.push(arr[i]);
  }
  return res;
};

// test
const arr = [1, 1, 2, 3, 4, 4, 4];
console.log(unique1(arr));
console.log(unique2(arr));
