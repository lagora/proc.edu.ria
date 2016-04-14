import waterfall from 'async-waterfall'
// import r from 'rethinkdbdash'
var r = require('rethinkdb')

var proceduriaDbName = 'proceduria'
var tables = [
  'raw'
  // ,'vertices'
  // ,'faces'
  // ,'colors'
  // ,'shaders'
]
var cnx = null

var resetDb = (callback) => {
  console.log('\tSTART: resetDb')
  waterfall([
    (next) => {
      r.connect( {host: 'localhost', port: 28015}, (err, conn) => {
        if (err) {
          console.error('\t\t', err);
          next(err)
        } else {
          console.info('\t\tOK: cnx')
          cnx = conn
          next()
        }
      })
    },
    (next) => {
      r.dbDrop(proceduriaDbName).run(cnx, (err) => {
        console[err ? 'error':'info']('\t\t' + (err ? 'KO':'OK'), err, 'dbDrop', proceduriaDbName)
        next(err)
      })
    },
    (next) => {
      r.dbCreate(proceduriaDbName).run(cnx, (err) => {
        console[err ? 'error':'info']('\t\t' + (err ? 'KO':'OK'), err, 'dbCreate', proceduriaDbName)
        next(err)
      })
    },
    (next) => {
      r.db(proceduriaDbName).tableList().run(cnx, (err, list) => {
        console[err ? 'error':'info']('\t\t' + (err ? 'KO':'OK'), err, 'tableList', list)
        next(err)
      })
    },
    (next) => {
      let i = 0
      let max = tables.length
      tables.forEach((tableName) => {
        r.db(proceduriaDbName).tableCreate(tableName).run(cnx, (err) => {
          console[err ? 'error':'info']('\t\t' + (err ? 'KO':'OK'), err, 'tableCreate', tableName)
          i++
          if (i === max) {
            next(err)
          }
        })
      })
    },
  ], (err, results) => {
    console.info('\tEND: resetDb')
    callback(err)
  })
}

export default resetDb
