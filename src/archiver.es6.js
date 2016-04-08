import waterfall from 'async-waterfall'
import fs from 'fs-extra'
import r from 'rethinkdb'

var proceduriaDbName = 'proceduria'
// var tables = [
//   'data_0'
// ]
var cnx = null

waterfall([
  (next) => {
    r.connect( {host: 'localhost', port: 28015}, (err, conn) => {
      if (err) {
        console.error(err);
        next(err)
      } else {
        console.info('OK: cnx')
        cnx = conn
        next()
      }
    })
  },
  (next) => {
    r.dbDrop(proceduriaDbName).run(cnx, (err) => {
      console[err ? 'error':'info'](err ? 'KO':'OK', err, 'dbDrop', proceduriaDbName)

      next(null)
    })
  },
  (next) => {
    r.dbCreate(proceduriaDbName).run(cnx, (err) => {
      console[err ? 'error':'info'](err ? 'KO':'OK', err, 'dbCreate', proceduriaDbName)
      next(err)
    })
  },
  (next) => {
    r.db(proceduriaDbName).tableList().run(cnx, (err, list) => {
      console[err ? 'error':'info'](err ? 'KO':'OK', err, 'tableList', list)
      next(err)
    })
  },
  // (next) => {
  //   let i = 0
  //   let max = tables.length
  //   tables.forEach((tableName) => {
  //     r.db(proceduriaDbName).tableCreate(tableName).run(cnx, (err) => {
  //       console[err ? 'error':'info'](err ? 'KO':'OK', err, 'tableCreate', tableName)
  //       i++
  //       if (i === max) {
  //         next(err)
  //       }
  //     })
  //   })
  // },
  (next) => {
    fs.walk('./data')
    .on('data', (item) => {
      console.log(item)
      if (-1 < item.path.indexOf('.json')) {
        fs.readJson(item.path, (err, data) => {
          console[err ? 'error':'info'](err ? 'KO':'OK', err, item.path)
          if (err) {
            next(err)
          } else {
            let tableName = item.path.split('/').reverse()[0].split('.')[0]
            console.log('tableName', tableName)
            r.db(proceduriaDbName).tableCreate(tableName).run(cnx, (err) => {
              console[err ? 'error':'info'](err ? 'KO':'OK', err, 'tableCreate', tableName)
              if (err) {
                next(err)
              } else {
                r.db(proceduriaDbName).table('data').insert(data).run(cnx, (err) => {
                  console[err ? 'error':'info'](err ? 'KO':'OK', err, 'insert')
                  if (err) {
                    next(err)
                  }
                })
              }
            })
          }
        })
      }
    })
    .on('end', () => {
      next()
    })
  }
], (err, results) => {

})
