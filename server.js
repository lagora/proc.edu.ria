var http = require('http');
var url = require('url');
var fs = require('fs');
var index = fs.readFileSync('./index.html').toString();
var _static = ['/node_modules', '/src/css', '/dist']
var cache = {};

var server = http.createServer(function(req, res) {
  console.log('req.url', req.url);
  if (0 === req.url.indexOf('/')) {
    res.write(index);
  } else {
    for (var i = 0; i < _static.length; i++) {
      if (-1 < req.url.indexOf(_static[i])) {
        console.log('undefined === cache[req.url]', undefined === cache[req.url]);
        if (undefined === cache[req.url]) {
          console.log('cache', cache);
          cache[req.url] = fs.readFileSync('.' + req.url).toString();
        }
        res.write(cache[req.url]);
      }
    }
  }
  res.end();
});
server.listen(8080);
