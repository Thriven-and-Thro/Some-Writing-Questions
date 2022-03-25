// 有问题
function parseString(template, data = globalThis) {
  const reg = /\{\{(\w+)\}\}/;
  if (reg.test(template)) {
    const name = reg.exec(template)[1];
    template = template.replace(reg, data[name]);
    return parseString(template, data);
  }
  return template;
}
var b = {
  b: 123,
  c: "456",
  e: "789",
  d: {
    f: "10",
  },
};
console.log(parseString("a{{b.b}}aa{{b.c}}aa {{b.d.f}}aaaa"));
