var fs = require('fs-extra');
var waterfall = require('async-waterfall');
// var scan = require('./xyzScanner.es6.js');
import scan from './xyzScanner.es6.js'

var ProceduriaBuilder = function () {
  var builder = {};
  var rulesJson = fs.readJsonSync('rules.json');
  builder.rules = rulesJson.files.filter(function (filename) {
    var filepath = './' + rulesJson.path + '/' + filename;
    var exists = fs.existsSync(filepath);
    console.log('filepath', exists, filepath);
    return exists
  }).map(function (filename) {
    var rule = fs.readJsonSync(rulesJson.path + '/' + filename);
    return rule;
  });
  builder.scan = scan
  builder.make = function () {
    console.log('make', 'builder.rules', require('util').inspect(builder.rules, {depth:42}));
    waterfall([
      (callback) => {
        // builder.rules[0][builder.method]() => {
        //
        // }
        callback(null)
      }
    ])
  }
  return builder;
};

module.exports = ProceduriaBuilder;
