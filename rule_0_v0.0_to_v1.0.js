var fs = require('fs-extra');
var rule_0_v00 = fs.readJsonSync('./rules/0.0/rule.0.json');
var keys = Object.keys(rule_0_v00.data);
var data = [];
var elements = ['position', 'size'];
var axes = ['x','y','z'];
keys.forEach(function (key) {
  var item = rule_0_v00.data[key];
  elements.forEach(function (element) {
    axes.forEach(function (axis) {  
      data.push(item[element][axis]);
    });
  });
});

var rule_0_v10 = rule_0_v00;
rule_0_v10.data = data;

fs.writeJsonSync('./rules/1.0/rule.1.json', rule_0_v10);