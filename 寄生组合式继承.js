function inherit(subType, superType) {
  subType.prototype = Object.create(superType.prototype);
  Object.defineProperty(subType.prototype, "constructor", {
    enumerable: false,
    configurable: true,
    writable: true,
    value: subType,
  });
}

function Person(name) {
  this.name = name;
}
Person.prototype.running = function () {
  console.log("runnning");
};

function Student(name, age) {
  Person.call(this, name);
  this.age = age;
}

inherit(Student, Person);

Student.prototype.saying = function () {
  console.log("saying");
};

const stu = new Student("stu", 10);
stu.running();
console.log(stu.name);
