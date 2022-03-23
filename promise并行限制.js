class Scheduler {
  constructor(count) {
    this.queue = [];
    this.maxCount = count;
  }

  add(promiseFn) {
    this.queue.push(promiseFn);
  }

  taskStart() {
    for (let i = 0; i < this.maxCount; i++) {
      this.request();
    }
  }

  request() {
    if (!this.queue || !this.queue.length) {
      return;
    }

    this.queue
      .shift()()
      .then(() => {
        this.request();
      });
  }
}
// test
const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler(2);

const addTask = (time, order) => {
  scheduler.add(() => timeout(time).then(() => console.log(order)));
};

addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");
scheduler.taskStart();
