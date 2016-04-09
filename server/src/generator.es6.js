var r = require('rethinkdbdash')();
// var r = require('rethinkdb');
// var ProceduriaBuilder = require('./ProceduriaBuilder.es6.js')

var cnx = null;
var tables = [
  'client',
  'vertices'
];
r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
    if (err) throw err;
    cnx = conn;
});

var onCheckDone = function () {
  // var builder = new ProceduriaBuilder();
  // builder.make();
  return;
};

var onTableList = function (tableList) {

  if (0 === tableList.length) {
    tables.forEach(function (tablename) {
      console.log('creating table', tablename);
      r.db('proceduria').tableCreate(tablename).run(cnx);
    });
  }
  onCheckDone();
};

var onDbList = function(dbList) {
  var found = dbList.some(function (dbname) {
    if ('proceduria' === dbname) {
      return true;
    }
  });
  if (!found) {
    console.log('not found: db proceduria');
    r.dbCreate('proceduria').run(cnx, onDbList);
  } else {
    r.db('proceduria').tableList().run(cnx).then(onTableList);
  }
};

r.dbList().run(cnx).then(onDbList);
