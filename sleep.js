function sleep1(fn, delay) {
  setTimeout(fn, delay);
}

sleep1(() => console.log("aaa"), 1000);

function sleep2(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}
sleep2(1000).then(() => console.log("bbb"));
