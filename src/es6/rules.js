
var seed = `31d6cfe0d16ae931`
var functionsByRules = [{}]
for (var i = 0x0; i < 0xf; i++) {
  functionsByRules[0][i] = (i) => 0xa < i
}
console.log('functionsByRules', functionsByRules)

var rules = (data) => {
  if (1 < data.length) {
    let r = []
    for (var i = 0; i < data.length; i++) {
      r.push(rules(data.substring(i, i+1)))
    }
    return r
  } else {
    // console.log('data', data);
    return data;
  }
}
var done = rules(seed)
console.log('done', done)
export { seed }
export default rules
