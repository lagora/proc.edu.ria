/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(57);
	__webpack_require__(116);
	__webpack_require__(58);
	module.exports = __webpack_require__(117);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var r = __webpack_require__(2)();
	// var r = require('rethinkdb');
	// var ProceduriaBuilder = require('./ProceduriaBuilder.es6.js')

	var cnx = null;
	var tables = ['client', 'vertices'];
	r.connect({ host: 'localhost', port: 28015 }, function (err, conn) {
	  if (err) throw err;
	  cnx = conn;
	});

	var onCheckDone = function onCheckDone() {
	  // var builder = new ProceduriaBuilder();
	  // builder.make();
	  return;
	};

	var onTableList = function onTableList(tableList) {

	  if (0 === tableList.length) {
	    tables.forEach(function (tablename) {
	      console.log('creating table', tablename);
	      r.db('proceduria').tableCreate(tablename).run(cnx);
	    });
	  }
	  onCheckDone();
	};

	var onDbList = function onDbList(dbList) {
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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Promise = __webpack_require__(3);

	var helper = __webpack_require__(39);
	var Connection = __webpack_require__(42);
	var Term = __webpack_require__(51);
	var Error = __webpack_require__(46);
	var PoolMaster = __webpack_require__(54);
	var termTypes = __webpack_require__(40).Term.TermType;

	function r(options) {
	  var self = this;
	  var _r = function(x) {
	    return new Term(_r).expr(x);
	  }
	  helper.changeProto(_r, self);

	  Term.prototype._setNestingLevel(r.prototype.nestingLevel);
	  Term.prototype._setArrayLimit(r.prototype.arrayLimit);

	  _r.row = new Term(_r).row();

	  _r.monday = new Term(_r).monday();
	  _r.tuesday = new Term(_r).tuesday();
	  _r.wednesday = new Term(_r).wednesday();
	  _r.thursday = new Term(_r).thursday();
	  _r.friday = new Term(_r).friday();
	  _r.saturday = new Term(_r).saturday();
	  _r.sunday =  new Term(_r).sunday();

	  _r.january = new Term(_r).january();
	  _r.february = new Term(_r).february();
	  _r.march = new Term(_r).march();
	  _r.april = new Term(_r).april();
	  _r.may = new Term(_r).may();
	  _r.june = new Term(_r).june();
	  _r.july = new Term(_r).july();
	  _r.august = new Term(_r).august();
	  _r.september = new Term(_r).september();
	  _r.october = new Term(_r).october();
	  _r.november = new Term(_r).november();
	  _r.december = new Term(_r).december();
	  _r.minval = new Term(_r).minval();
	  _r.maxval = new Term(_r).maxval();

	  _r.nextVarId = 1;
	  _r._Term = Term;
	  return _r;
	};
	r.prototype._host = 'localhost';
	r.prototype._port = 28015;
	r.prototype._authKey = '';
	r.prototype._timeoutConnect = 20;

	r.prototype._nestingLevel = 100;
	r.prototype._arrayLimit = 100000;
	r.prototype._db = 'test';
	r.prototype._useOutdated = false;
	r.prototype._timeFormat = 'native';
	r.prototype._profile = false;


	r.prototype.setNestingLevel = function(nestingLevel) {
	  if (typeof nestingLevel !== 'number') throw new Error.ReqlDriverError('The first argument of `setNestingLevel` must be a number.')
	  this.nestingLevel = nestingLevel;
	}
	r.prototype.setArrayLimit = function(arrayLimit) {
	  if (typeof arrayLimit !== 'number') throw new Error.ReqlDriverError('The first argument of `setArrayLimit` must be a number.')
	  this.arrayLimit = arrayLimit;
	}

	r.prototype.connect = function(options, callback) {
	  if (typeof options === 'function') {
	    callback = options;
	    options = {};
	  }
	  var self = this;

	  var p = new Promise(function(resolve, reject) {
	    new Connection(self, options, resolve, reject);
	  }).nodeify(callback);
	  return p;
	};

	r.prototype.createPools = function(options) {
	  this._poolMaster = new PoolMaster(this, options);
	  return this;
	}

	r.prototype.getPoolMaster = function() {
	  return this._poolMaster;
	}
	r.prototype.getPool = function(i) {
	  if (i === undefined) {
	    if (this.getPoolMaster().getPools().length === 1) {
	      return this.getPoolMaster().getPools()[0];
	    }
	    else {
	      throw new Error('You have multiple pools. Use `getPool(index)` or `getPools()`');
	    }
	  }
	  else {
	    return this.getPoolMaster().getPools()[i];
	  }
	}

	r.prototype.expr = function(expression, nestingLevel) {
	  if (Term.prototype._fastArityRange(arguments.length, 1, 2) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    Term.prototype._arityRange(_args, 1, 2, 'expr', this);
	  }
	  var _nestingLevel = nestingLevel || this.nestingLevel;
	  return new Term(this).expr(expression, _nestingLevel);
	};
	r.prototype.db = function(db) {
	  if (Term.prototype._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    Term.prototype._arity(_args, 1, 'r.db', this);
	  }
	  return new Term(this).db(db);
	};
	r.prototype.table = function(table, options) {
	  if (Term.prototype._fastArityRange(arguments.length, 1, 2) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    Term.prototype._arityRange(_args, 1, 2, 'table', this);
	  }
	  return new Term(this).table(table, options);
	};
	r.prototype.js = function(jsString, options) {
	  if (Term.prototype._fastArityRange(arguments.length, 1, 2) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    Term.prototype._arityRange(_args, 1, 2, 'r.js', this);
	  }
	  return new Term(this).js(jsString, options);
	};
	r.prototype.tableCreate = function(table, options) {
	  if (Term.prototype._fastArityRange(arguments.length, 1, 2) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    Term.prototype._arityRange(_args, 1, 2, 'r.tableCreate', this);
	  }
	  return new Term(this).tableCreate(table, options);
	};
	r.prototype.tableDrop = function(db) {
	  if (Term.prototype._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    Term.prototype._arity(_args, 1, 'r.tableDrop', this);
	  }
	  return new Term(this).tableDrop(db);
	};
	r.prototype.tableList = function() {
	  if (Term.prototype._fastArity(arguments.length, 0) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    Term.prototype._arity(_args, 0, 'r.tableList', this);
	  }
	  return new Term(this).tableList();
	};
	r.prototype.dbCreate = function(db) {
	  if (Term.prototype._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    Term.prototype._arity(_args, 1, 'dbCreate', this);
	  }
	  return new Term(this).dbCreate(db);
	};
	r.prototype.dbDrop = function(db) {
	  if (Term.prototype._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    Term.prototype._arity(_args, 1, 'dbDrop', this);
	  }
	  return new Term(this).dbDrop(db);
	};
	r.prototype.dbList = function() {
	  if (Term.prototype._fastArity(arguments.length, 0) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    Term.prototype._arity(_args, 0, 'dbList', this);
	  }
	  return new Term(this).dbList();
	};
	r.prototype.literal = function(obj) {
	  if (Term.prototype._fastArityRange(arguments.length, 0, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    Term.prototype._arityRange(_args, 1, 2, 'r.literal', this);
	  }
	  if (obj === undefined) {
	    return new Term(this).literal();
	  }
	  else {
	    return new Term(this).literal(obj);
	  }
	};
	r.prototype.desc = function(field) {
	  if (Term.prototype._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    Term.prototype._arity(_args, 1, 'r.desc', this);
	  }
	  return new Term(this).desc(field);
	};
	r.prototype.asc = function(field) {
	  if (Term.prototype._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    Term.prototype._arity(_args, 1, 'r.asc', this);
	  }
	  return new Term(this).asc(field);
	};
	r.prototype.union = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}

	  var term = new Term(this).expr(_args[0]);
	  return term.union.apply(term, _args.slice(1));
	};
	r.prototype.add = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  Term.prototype._arityRange(_args, 2, Infinity, 'r.add', this);

	  var term = new Term(this).expr(_args[0]);
	  return term.add.apply(term, _args.slice(1));
	};
	r.prototype.sub = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  Term.prototype._arityRange(_args, 2, Infinity, 'r.sub', this);

	  var term = new Term(this).expr(_args[0]);
	  return term.sub.apply(term, _args.slice(1));
	};
	r.prototype.div = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  Term.prototype._arityRange(_args, 2, Infinity, 'r.div', this);

	  var term = new Term(this).expr(_args[0]);
	  return term.div.apply(term, _args.slice(1));
	};
	r.prototype.mul = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  Term.prototype._arityRange(_args, 2, Infinity, 'r.mul', this);

	  var term = new Term(this).expr(_args[0]);
	  return term.mul.apply(term, _args.slice(1));
	};
	r.prototype.mod = function(a, b) {
	  if (Term.prototype._fastArity(arguments.length, 2) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    Term.prototype._arity(_args, 2, 'r.mod', this);
	  }

	  return new Term(this).expr(a).mod(b);
	};
	r.prototype.and = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  Term.prototype._arityRange(_args, 1, Infinity, 'r.and', this);

	  var term = new Term(this).expr(_args[0]);
	  return term.and.apply(term, _args.slice(1));
	};
	r.prototype.or = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  Term.prototype._arityRange(_args, 1, Infinity, 'r.or', this);

	  var term = new Term(this).expr(_args[0]);
	  return term.or.apply(term, _args.slice(1));
	};
	r.prototype.eq = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  Term.prototype._arityRange(_args, 2, Infinity, 'r.eq', this);

	  var term = new Term(this).expr(_args[0]);
	  return term.eq.apply(term, _args.slice(1));
	};
	r.prototype.ne = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  Term.prototype._arityRange(_args, 2, Infinity, 'r.ne', this);

	  var term = new Term(this).expr(_args[0]);
	  return term.ne.apply(term, _args.slice(1));
	};
	r.prototype.gt = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  Term.prototype._arityRange(_args, 2, Infinity, 'r.gt', this);

	  var term = new Term(this).expr(_args[0]);
	  return term.gt.apply(term, _args.slice(1));
	};
	r.prototype.ge = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  Term.prototype._arityRange(_args, 2, Infinity, 'r.ge', this);

	  var term = new Term(this).expr(_args[0]);
	  return term.ge.apply(term, _args.slice(1));
	};
	r.prototype.lt = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  Term.prototype._arityRange(_args, 2, Infinity, 'r.lt', this);

	  var term = new Term(this).expr(_args[0]);
	  return term.lt.apply(term, _args.slice(1));
	};
	r.prototype.le = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  Term.prototype._arityRange(_args, 2, Infinity, 'r.le', this);

	  var term = new Term(this).expr(_args[0]);
	  return term.le.apply(term, _args.slice(1));
	};
	r.prototype.not = function(bool) {
	  if (Term.prototype._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    Term.prototype._arity(_args, 1, 'r.not', this);
	  }
	  return new Term(this).expr(bool).not();
	}
	r.prototype.floor = function(num) {
	  if (Term.prototype._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    Term.prototype._arity(_args, 1, 'r.floor', this);
	  }
	  return new Term(this).expr(num).floor();
	}
	r.prototype.ceil = function(num) {
	  if (Term.prototype._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    Term.prototype._arity(_args, 1, 'r.ceil', this);
	  }
	  return new Term(this).expr(num).ceil();
	}
	r.prototype.round = function(num) {
	  if (Term.prototype._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    Term.prototype._arity(_args, 1, 'r.round', this);
	  }
	  return new Term(this).expr(num).round();
	}


	r.prototype.now = function() {
	  if (Term.prototype._fastArity(arguments.length, 0) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    Term.prototype._arity(_args, 0, 'now', this);
	  }
	  return new Term(this).now();
	}
	r.prototype.time = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  var term = new Term(this);
	  return term.time.apply(term, _args);
	}
	r.prototype.epochTime = function(epochTime) {
	  if (Term.prototype._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    Term.prototype._arity(_args, 1, 'r.epochTime', this);
	  }
	  return new Term(this).epochTime(epochTime);
	}
	r.prototype.ISO8601 = function(isoTime, options) {
	  if (Term.prototype._fastArityRange(arguments.length, 1, 2) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    Term.prototype._arityRange(_args, 1, 2, 'r.ISO8601', this);
	  }
	  return new Term(this).ISO8601(isoTime, options);
	}
	r.prototype.branch = function(predicate, trueBranch, falseBranch) {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  Term.prototype._arityRange(_args, 3, Infinity, 'r.branch', this);

	  var term = new Term(this).expr(predicate);
	  return term.branch.apply(term, _args.slice(1));
	}
	r.prototype.error = function(errorStr) {
	  if (Term.prototype._fastArityRange(arguments.length, 0, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    Term.prototype._arityRange(_args, 0, 1, 'r.error', this);
	  }
	  var term = new Term(this);
	  term._query.push(termTypes.ERROR);
	  if (errorStr !== undefined) {
	    term._query.push([new Term(this).expr(errorStr)._query]);
	  }
	  return term;

	}
	r.prototype.json = function(json) {
	  if (Term.prototype._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    Term.prototype._arity(_args, 1, 'r.json', this);
	  }
	  return new Term(this).json(json);
	}

	r.prototype.object = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  var term = new Term(this);
	  return term.object.apply(term, _args);
	}
	r.prototype.args = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  var term = new Term(this);
	  return term.args.apply(term, _args);
	}
	r.prototype.random = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  var term = new Term(this);
	  return term.random.apply(term, _args);
	}
	r.prototype.http = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  var term = new Term(this);
	  return term.http.apply(term, _args);
	}
	r.prototype.do = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  Term.prototype._arityRange(_args, 2, Infinity, 'r.do', this);

	  var term = new Term(this).expr(_args[0]);
	  return term.do.apply(term, _args.slice(1));
	}
	r.prototype.binary = function(bin) {
	  if (Term.prototype._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    Term.prototype._arity(_args, 1, 'r.binary', this);
	  }
	  var term = new Term(this);
	  return term.binary(bin);
	}
	r.prototype.uuid = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  Term.prototype._arityRange(_args, 0, 1, 'r.uuid', this);
	  var term = new Term(this);
	  return term.uuid(_args[0]);
	}

	r.prototype.line = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  Term.prototype._arityRange(_args, 2, Infinity, 'r.line', this);

	  var term = new Term(this);
	  return term.line.apply(term, _args);
	}
	r.prototype.point = function(longitude, latitude) {
	  if (Term.prototype._fastArity(arguments.length, 2) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    Term.prototype._arity(_args, 2, 'r.point', this);
	  }
	  return new Term(this).point(longitude, latitude);
	}
	r.prototype.polygon = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  Term.prototype._arityRange(_args, 3, Infinity, 'r.polygon', this);

	  var term = new Term(this);
	  return term.polygon.apply(term, _args);
	}
	r.prototype.circle = function(center, radius, options) {
	  if (Term.prototype._fastArityRange(arguments.length, 2, 3) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    Term.prototype._arityRange(_args, 2, 3, 'r.circle', this);
	  }
	  var term = new Term(this);
	  if (options !== undefined) {
	    return term.circle(center, radius, options);
	  }
	  else {
	    return term.circle(center, radius);
	  }
	}
	r.prototype.geojson = function(value) {
	  if (Term.prototype._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    Term.prototype._arity(_args, 1, 'r.geojson', this);
	  }
	  var term = new Term(this);
	  return term.geojson(value);
	}
	r.prototype.range = function(start, end) {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  Term.prototype._arityRange(_args, 1, 2, 'r.range', this);

	  var term = new Term(this);
	  if (end !== undefined) {
	    return term.range(start, end);
	  }
	  else {
	    return term.range(start);
	  }
	}
	r.prototype.wait = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  Term.prototype._arityRange(_args, 0, 1, 'r.wait', this);

	  var term = new Term(this);
	  return term.wait(_args[0]);
	}
	r.prototype.reconfigure = function(config) {
	  if (Term.prototype._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    Term.prototype._arity(_args, 1, 'r.reconfigure', this);
	  }
	  var term = new Term(this);
	  return term.reconfigure(config);
	}
	r.prototype.rebalance = function(config) {
	  if (Term.prototype._fastArity(arguments.length, 0) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    Term.prototype._arity(_args, 0, 'r.rebalance', this);
	  }
	  var term = new Term(this);
	  return term.rebalance();
	}
	r.prototype.map = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  Term.prototype._arityRange(_args, 1, Infinity, 'r.map', this);

	  var term = new Term(this);
	  return term.map.apply(term, _args);
	};
	r.prototype.typeOf = function(value) {
	  if (Term.prototype._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    Term.prototype._arity(_args, 1, 'r.typeOf', this);
	  }
	  var term = new Term(this);
	  return term.expr(value).typeOf();
	}


	r.prototype.Error = Error;


	function main(options) {
	  var _r = new r();

	  if (!helper.isPlainObject(options)) options = {};
	  if (options.pool !== false) _r.createPools(options);
	  _r._options = {};
	  if (options.cursor === true) _r._options.cursor = true;
	  if (options.stream === true) _r._options.stream = true;
	  if (options.optionalRun === false) {
	    delete _r._Term.prototype.then
	    delete _r._Term.prototype.error
	    delete _r._Term.prototype.catch
	    delete _r._Term.prototype.finally
	  }
	  return _r;
	}
	module.exports = main;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var old;
	if (typeof Promise !== "undefined") old = Promise;
	function noConflict() {
	    try { if (Promise === bluebird) Promise = old; }
	    catch (e) {}
	    return bluebird;
	}
	var bluebird = __webpack_require__(4)();
	bluebird.noConflict = noConflict;
	module.exports = bluebird;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function() {
	var makeSelfResolutionError = function () {
	    return new TypeError("circular promise resolution chain\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	};
	var reflectHandler = function() {
	    return new Promise.PromiseInspection(this._target());
	};
	var apiRejection = function(msg) {
	    return Promise.reject(new TypeError(msg));
	};
	function Proxyable() {}
	var UNDEFINED_BINDING = {};
	var util = __webpack_require__(5);

	var getDomain;
	if (util.isNode) {
	    getDomain = function() {
	        var ret = process.domain;
	        if (ret === undefined) ret = null;
	        return ret;
	    };
	} else {
	    getDomain = function() {
	        return null;
	    };
	}
	util.notEnumerableProp(Promise, "_getDomain", getDomain);

	var es5 = __webpack_require__(6);
	var Async = __webpack_require__(7);
	var async = new Async();
	es5.defineProperty(Promise, "_async", {value: async});
	var errors = __webpack_require__(10);
	var TypeError = Promise.TypeError = errors.TypeError;
	Promise.RangeError = errors.RangeError;
	var CancellationError = Promise.CancellationError = errors.CancellationError;
	Promise.TimeoutError = errors.TimeoutError;
	Promise.OperationalError = errors.OperationalError;
	Promise.RejectionError = errors.OperationalError;
	Promise.AggregateError = errors.AggregateError;
	var INTERNAL = function(){};
	var APPLY = {};
	var NEXT_FILTER = {};
	var tryConvertToPromise = __webpack_require__(11)(Promise, INTERNAL);
	var PromiseArray =
	    __webpack_require__(12)(Promise, INTERNAL,
	                               tryConvertToPromise, apiRejection, Proxyable);
	var Context = __webpack_require__(13)(Promise);
	 /*jshint unused:false*/
	var createContext = Context.create;
	var debug = __webpack_require__(14)(Promise, Context);
	var CapturedTrace = debug.CapturedTrace;
	var PassThroughHandlerContext =
	    __webpack_require__(15)(Promise, tryConvertToPromise);
	var catchFilter = __webpack_require__(16)(NEXT_FILTER);
	var nodebackForPromise = __webpack_require__(17);
	var errorObj = util.errorObj;
	var tryCatch = util.tryCatch;
	function check(self, executor) {
	    if (typeof executor !== "function") {
	        throw new TypeError("expecting a function but got " + util.classString(executor));
	    }
	    if (self.constructor !== Promise) {
	        throw new TypeError("the promise constructor cannot be invoked directly\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	}

	function Promise(executor) {
	    this._bitField = 0;
	    this._fulfillmentHandler0 = undefined;
	    this._rejectionHandler0 = undefined;
	    this._promise0 = undefined;
	    this._receiver0 = undefined;
	    if (executor !== INTERNAL) {
	        check(this, executor);
	        this._resolveFromExecutor(executor);
	    }
	    this._promiseCreated();
	    this._fireEvent("promiseCreated", this);
	}

	Promise.prototype.toString = function () {
	    return "[object Promise]";
	};

	Promise.prototype.caught = Promise.prototype["catch"] = function (fn) {
	    var len = arguments.length;
	    if (len > 1) {
	        var catchInstances = new Array(len - 1),
	            j = 0, i;
	        for (i = 0; i < len - 1; ++i) {
	            var item = arguments[i];
	            if (util.isObject(item)) {
	                catchInstances[j++] = item;
	            } else {
	                return apiRejection("expecting an object but got " + util.classString(item));
	            }
	        }
	        catchInstances.length = j;
	        fn = arguments[i];
	        return this.then(undefined, catchFilter(catchInstances, fn, this));
	    }
	    return this.then(undefined, fn);
	};

	Promise.prototype.reflect = function () {
	    return this._then(reflectHandler,
	        reflectHandler, undefined, this, undefined);
	};

	Promise.prototype.then = function (didFulfill, didReject) {
	    if (debug.warnings() && arguments.length > 0 &&
	        typeof didFulfill !== "function" &&
	        typeof didReject !== "function") {
	        var msg = ".then() only accepts functions but was passed: " +
	                util.classString(didFulfill);
	        if (arguments.length > 1) {
	            msg += ", " + util.classString(didReject);
	        }
	        this._warn(msg);
	    }
	    return this._then(didFulfill, didReject, undefined, undefined, undefined);
	};

	Promise.prototype.done = function (didFulfill, didReject) {
	    var promise =
	        this._then(didFulfill, didReject, undefined, undefined, undefined);
	    promise._setIsFinal();
	};

	Promise.prototype.spread = function (fn) {
	    if (typeof fn !== "function") {
	        return apiRejection("expecting a function but got " + util.classString(fn));
	    }
	    return this.all()._then(fn, undefined, undefined, APPLY, undefined);
	};

	Promise.prototype.toJSON = function () {
	    var ret = {
	        isFulfilled: false,
	        isRejected: false,
	        fulfillmentValue: undefined,
	        rejectionReason: undefined
	    };
	    if (this.isFulfilled()) {
	        ret.fulfillmentValue = this.value();
	        ret.isFulfilled = true;
	    } else if (this.isRejected()) {
	        ret.rejectionReason = this.reason();
	        ret.isRejected = true;
	    }
	    return ret;
	};

	Promise.prototype.all = function () {
	    if (arguments.length > 0) {
	        this._warn(".all() was passed arguments but it does not take any");
	    }
	    return new PromiseArray(this).promise();
	};

	Promise.prototype.error = function (fn) {
	    return this.caught(util.originatesFromRejection, fn);
	};

	Promise.is = function (val) {
	    return val instanceof Promise;
	};

	Promise.fromNode = Promise.fromCallback = function(fn) {
	    var ret = new Promise(INTERNAL);
	    ret._captureStackTrace();
	    var multiArgs = arguments.length > 1 ? !!Object(arguments[1]).multiArgs
	                                         : false;
	    var result = tryCatch(fn)(nodebackForPromise(ret, multiArgs));
	    if (result === errorObj) {
	        ret._rejectCallback(result.e, true);
	    }
	    if (!ret._isFateSealed()) ret._setAsyncGuaranteed();
	    return ret;
	};

	Promise.all = function (promises) {
	    return new PromiseArray(promises).promise();
	};

	Promise.cast = function (obj) {
	    var ret = tryConvertToPromise(obj);
	    if (!(ret instanceof Promise)) {
	        ret = new Promise(INTERNAL);
	        ret._captureStackTrace();
	        ret._setFulfilled();
	        ret._rejectionHandler0 = obj;
	    }
	    return ret;
	};

	Promise.resolve = Promise.fulfilled = Promise.cast;

	Promise.reject = Promise.rejected = function (reason) {
	    var ret = new Promise(INTERNAL);
	    ret._captureStackTrace();
	    ret._rejectCallback(reason, true);
	    return ret;
	};

	Promise.setScheduler = function(fn) {
	    if (typeof fn !== "function") {
	        throw new TypeError("expecting a function but got " + util.classString(fn));
	    }
	    var prev = async._schedule;
	    async._schedule = fn;
	    return prev;
	};

	Promise.prototype._then = function (
	    didFulfill,
	    didReject,
	    _,    receiver,
	    internalData
	) {
	    var haveInternalData = internalData !== undefined;
	    var promise = haveInternalData ? internalData : new Promise(INTERNAL);
	    var target = this._target();
	    var bitField = target._bitField;

	    if (!haveInternalData) {
	        promise._propagateFrom(this, 3);
	        promise._captureStackTrace();
	        if (receiver === undefined &&
	            ((this._bitField & 2097152) !== 0)) {
	            if (!((bitField & 50397184) === 0)) {
	                receiver = this._boundValue();
	            } else {
	                receiver = target === this ? undefined : this._boundTo;
	            }
	        }
	        this._fireEvent("promiseChained", this, promise);
	    }

	    var domain = getDomain();
	    if (!((bitField & 50397184) === 0)) {
	        var handler, value, settler = target._settlePromiseCtx;
	        if (((bitField & 33554432) !== 0)) {
	            value = target._rejectionHandler0;
	            handler = didFulfill;
	        } else if (((bitField & 16777216) !== 0)) {
	            value = target._fulfillmentHandler0;
	            handler = didReject;
	            target._unsetRejectionIsUnhandled();
	        } else {
	            settler = target._settlePromiseLateCancellationObserver;
	            value = new CancellationError("late cancellation observer");
	            target._attachExtraTrace(value);
	            handler = didReject;
	        }

	        async.invoke(settler, target, {
	            handler: domain === null ? handler
	                : (typeof handler === "function" && domain.bind(handler)),
	            promise: promise,
	            receiver: receiver,
	            value: value
	        });
	    } else {
	        target._addCallbacks(didFulfill, didReject, promise, receiver, domain);
	    }

	    return promise;
	};

	Promise.prototype._length = function () {
	    return this._bitField & 65535;
	};

	Promise.prototype._isFateSealed = function () {
	    return (this._bitField & 117506048) !== 0;
	};

	Promise.prototype._isFollowing = function () {
	    return (this._bitField & 67108864) === 67108864;
	};

	Promise.prototype._setLength = function (len) {
	    this._bitField = (this._bitField & -65536) |
	        (len & 65535);
	};

	Promise.prototype._setFulfilled = function () {
	    this._bitField = this._bitField | 33554432;
	    this._fireEvent("promiseFulfilled", this);
	};

	Promise.prototype._setRejected = function () {
	    this._bitField = this._bitField | 16777216;
	    this._fireEvent("promiseRejected", this);
	};

	Promise.prototype._setFollowing = function () {
	    this._bitField = this._bitField | 67108864;
	    this._fireEvent("promiseResolved", this);
	};

	Promise.prototype._setIsFinal = function () {
	    this._bitField = this._bitField | 4194304;
	};

	Promise.prototype._isFinal = function () {
	    return (this._bitField & 4194304) > 0;
	};

	Promise.prototype._unsetCancelled = function() {
	    this._bitField = this._bitField & (~65536);
	};

	Promise.prototype._setCancelled = function() {
	    this._bitField = this._bitField | 65536;
	    this._fireEvent("promiseCancelled", this);
	};

	Promise.prototype._setAsyncGuaranteed = function() {
	    this._bitField = this._bitField | 134217728;
	};

	Promise.prototype._receiverAt = function (index) {
	    var ret = index === 0 ? this._receiver0 : this[
	            index * 4 - 4 + 3];
	    if (ret === UNDEFINED_BINDING) {
	        return undefined;
	    } else if (ret === undefined && this._isBound()) {
	        return this._boundValue();
	    }
	    return ret;
	};

	Promise.prototype._promiseAt = function (index) {
	    return this[
	            index * 4 - 4 + 2];
	};

	Promise.prototype._fulfillmentHandlerAt = function (index) {
	    return this[
	            index * 4 - 4 + 0];
	};

	Promise.prototype._rejectionHandlerAt = function (index) {
	    return this[
	            index * 4 - 4 + 1];
	};

	Promise.prototype._boundValue = function() {};

	Promise.prototype._migrateCallback0 = function (follower) {
	    var bitField = follower._bitField;
	    var fulfill = follower._fulfillmentHandler0;
	    var reject = follower._rejectionHandler0;
	    var promise = follower._promise0;
	    var receiver = follower._receiverAt(0);
	    if (receiver === undefined) receiver = UNDEFINED_BINDING;
	    this._addCallbacks(fulfill, reject, promise, receiver, null);
	};

	Promise.prototype._migrateCallbackAt = function (follower, index) {
	    var fulfill = follower._fulfillmentHandlerAt(index);
	    var reject = follower._rejectionHandlerAt(index);
	    var promise = follower._promiseAt(index);
	    var receiver = follower._receiverAt(index);
	    if (receiver === undefined) receiver = UNDEFINED_BINDING;
	    this._addCallbacks(fulfill, reject, promise, receiver, null);
	};

	Promise.prototype._addCallbacks = function (
	    fulfill,
	    reject,
	    promise,
	    receiver,
	    domain
	) {
	    var index = this._length();

	    if (index >= 65535 - 4) {
	        index = 0;
	        this._setLength(0);
	    }

	    if (index === 0) {
	        this._promise0 = promise;
	        this._receiver0 = receiver;
	        if (typeof fulfill === "function") {
	            this._fulfillmentHandler0 =
	                domain === null ? fulfill : domain.bind(fulfill);
	        }
	        if (typeof reject === "function") {
	            this._rejectionHandler0 =
	                domain === null ? reject : domain.bind(reject);
	        }
	    } else {
	        var base = index * 4 - 4;
	        this[base + 2] = promise;
	        this[base + 3] = receiver;
	        if (typeof fulfill === "function") {
	            this[base + 0] =
	                domain === null ? fulfill : domain.bind(fulfill);
	        }
	        if (typeof reject === "function") {
	            this[base + 1] =
	                domain === null ? reject : domain.bind(reject);
	        }
	    }
	    this._setLength(index + 1);
	    return index;
	};

	Promise.prototype._proxy = function (proxyable, arg) {
	    this._addCallbacks(undefined, undefined, arg, proxyable, null);
	};

	Promise.prototype._resolveCallback = function(value, shouldBind) {
	    if (((this._bitField & 117506048) !== 0)) return;
	    if (value === this)
	        return this._rejectCallback(makeSelfResolutionError(), false);
	    var maybePromise = tryConvertToPromise(value, this);
	    if (!(maybePromise instanceof Promise)) return this._fulfill(value);

	    if (shouldBind) this._propagateFrom(maybePromise, 2);

	    var promise = maybePromise._target();

	    if (promise === this) {
	        this._reject(makeSelfResolutionError());
	        return;
	    }

	    var bitField = promise._bitField;
	    if (((bitField & 50397184) === 0)) {
	        var len = this._length();
	        if (len > 0) promise._migrateCallback0(this);
	        for (var i = 1; i < len; ++i) {
	            promise._migrateCallbackAt(this, i);
	        }
	        this._setFollowing();
	        this._setLength(0);
	        this._setFollowee(promise);
	    } else if (((bitField & 33554432) !== 0)) {
	        this._fulfill(promise._value());
	    } else if (((bitField & 16777216) !== 0)) {
	        this._reject(promise._reason());
	    } else {
	        var reason = new CancellationError("late cancellation observer");
	        promise._attachExtraTrace(reason);
	        this._reject(reason);
	    }
	};

	Promise.prototype._rejectCallback =
	function(reason, synchronous, ignoreNonErrorWarnings) {
	    var trace = util.ensureErrorObject(reason);
	    var hasStack = trace === reason;
	    if (!hasStack && !ignoreNonErrorWarnings && debug.warnings()) {
	        var message = "a promise was rejected with a non-error: " +
	            util.classString(reason);
	        this._warn(message, true);
	    }
	    this._attachExtraTrace(trace, synchronous ? hasStack : false);
	    this._reject(reason);
	};

	Promise.prototype._resolveFromExecutor = function (executor) {
	    var promise = this;
	    this._captureStackTrace();
	    this._pushContext();
	    var synchronous = true;
	    var r = this._execute(executor, function(value) {
	        promise._resolveCallback(value);
	    }, function (reason) {
	        promise._rejectCallback(reason, synchronous);
	    });
	    synchronous = false;
	    this._popContext();

	    if (r !== undefined) {
	        promise._rejectCallback(r, true);
	    }
	};

	Promise.prototype._settlePromiseFromHandler = function (
	    handler, receiver, value, promise
	) {
	    var bitField = promise._bitField;
	    if (((bitField & 65536) !== 0)) return;
	    promise._pushContext();
	    var x;
	    if (receiver === APPLY) {
	        if (!value || typeof value.length !== "number") {
	            x = errorObj;
	            x.e = new TypeError("cannot .spread() a non-array: " +
	                                    util.classString(value));
	        } else {
	            x = tryCatch(handler).apply(this._boundValue(), value);
	        }
	    } else {
	        x = tryCatch(handler).call(receiver, value);
	    }
	    var promiseCreated = promise._popContext();
	    bitField = promise._bitField;
	    if (((bitField & 65536) !== 0)) return;

	    if (x === NEXT_FILTER) {
	        promise._reject(value);
	    } else if (x === errorObj) {
	        promise._rejectCallback(x.e, false);
	    } else {
	        debug.checkForgottenReturns(x, promiseCreated, "",  promise, this);
	        promise._resolveCallback(x);
	    }
	};

	Promise.prototype._target = function() {
	    var ret = this;
	    while (ret._isFollowing()) ret = ret._followee();
	    return ret;
	};

	Promise.prototype._followee = function() {
	    return this._rejectionHandler0;
	};

	Promise.prototype._setFollowee = function(promise) {
	    this._rejectionHandler0 = promise;
	};

	Promise.prototype._settlePromise = function(promise, handler, receiver, value) {
	    var isPromise = promise instanceof Promise;
	    var bitField = this._bitField;
	    var asyncGuaranteed = ((bitField & 134217728) !== 0);
	    if (((bitField & 65536) !== 0)) {
	        if (isPromise) promise._invokeInternalOnCancel();

	        if (receiver instanceof PassThroughHandlerContext &&
	            receiver.isFinallyHandler()) {
	            receiver.cancelPromise = promise;
	            if (tryCatch(handler).call(receiver, value) === errorObj) {
	                promise._reject(errorObj.e);
	            }
	        } else if (handler === reflectHandler) {
	            promise._fulfill(reflectHandler.call(receiver));
	        } else if (receiver instanceof Proxyable) {
	            receiver._promiseCancelled(promise);
	        } else if (isPromise || promise instanceof PromiseArray) {
	            promise._cancel();
	        } else {
	            receiver.cancel();
	        }
	    } else if (typeof handler === "function") {
	        if (!isPromise) {
	            handler.call(receiver, value, promise);
	        } else {
	            if (asyncGuaranteed) promise._setAsyncGuaranteed();
	            this._settlePromiseFromHandler(handler, receiver, value, promise);
	        }
	    } else if (receiver instanceof Proxyable) {
	        if (!receiver._isResolved()) {
	            if (((bitField & 33554432) !== 0)) {
	                receiver._promiseFulfilled(value, promise);
	            } else {
	                receiver._promiseRejected(value, promise);
	            }
	        }
	    } else if (isPromise) {
	        if (asyncGuaranteed) promise._setAsyncGuaranteed();
	        if (((bitField & 33554432) !== 0)) {
	            promise._fulfill(value);
	        } else {
	            promise._reject(value);
	        }
	    }
	};

	Promise.prototype._settlePromiseLateCancellationObserver = function(ctx) {
	    var handler = ctx.handler;
	    var promise = ctx.promise;
	    var receiver = ctx.receiver;
	    var value = ctx.value;
	    if (typeof handler === "function") {
	        if (!(promise instanceof Promise)) {
	            handler.call(receiver, value, promise);
	        } else {
	            this._settlePromiseFromHandler(handler, receiver, value, promise);
	        }
	    } else if (promise instanceof Promise) {
	        promise._reject(value);
	    }
	};

	Promise.prototype._settlePromiseCtx = function(ctx) {
	    this._settlePromise(ctx.promise, ctx.handler, ctx.receiver, ctx.value);
	};

	Promise.prototype._settlePromise0 = function(handler, value, bitField) {
	    var promise = this._promise0;
	    var receiver = this._receiverAt(0);
	    this._promise0 = undefined;
	    this._receiver0 = undefined;
	    this._settlePromise(promise, handler, receiver, value);
	};

	Promise.prototype._clearCallbackDataAtIndex = function(index) {
	    var base = index * 4 - 4;
	    this[base + 2] =
	    this[base + 3] =
	    this[base + 0] =
	    this[base + 1] = undefined;
	};

	Promise.prototype._fulfill = function (value) {
	    var bitField = this._bitField;
	    if (((bitField & 117506048) >>> 16)) return;
	    if (value === this) {
	        var err = makeSelfResolutionError();
	        this._attachExtraTrace(err);
	        return this._reject(err);
	    }
	    this._setFulfilled();
	    this._rejectionHandler0 = value;

	    if ((bitField & 65535) > 0) {
	        if (((bitField & 134217728) !== 0)) {
	            this._settlePromises();
	        } else {
	            async.settlePromises(this);
	        }
	    }
	};

	Promise.prototype._reject = function (reason) {
	    var bitField = this._bitField;
	    if (((bitField & 117506048) >>> 16)) return;
	    this._setRejected();
	    this._fulfillmentHandler0 = reason;

	    if (this._isFinal()) {
	        return async.fatalError(reason, util.isNode);
	    }

	    if ((bitField & 65535) > 0) {
	        async.settlePromises(this);
	    } else {
	        this._ensurePossibleRejectionHandled();
	    }
	};

	Promise.prototype._fulfillPromises = function (len, value) {
	    for (var i = 1; i < len; i++) {
	        var handler = this._fulfillmentHandlerAt(i);
	        var promise = this._promiseAt(i);
	        var receiver = this._receiverAt(i);
	        this._clearCallbackDataAtIndex(i);
	        this._settlePromise(promise, handler, receiver, value);
	    }
	};

	Promise.prototype._rejectPromises = function (len, reason) {
	    for (var i = 1; i < len; i++) {
	        var handler = this._rejectionHandlerAt(i);
	        var promise = this._promiseAt(i);
	        var receiver = this._receiverAt(i);
	        this._clearCallbackDataAtIndex(i);
	        this._settlePromise(promise, handler, receiver, reason);
	    }
	};

	Promise.prototype._settlePromises = function () {
	    var bitField = this._bitField;
	    var len = (bitField & 65535);

	    if (len > 0) {
	        if (((bitField & 16842752) !== 0)) {
	            var reason = this._fulfillmentHandler0;
	            this._settlePromise0(this._rejectionHandler0, reason, bitField);
	            this._rejectPromises(len, reason);
	        } else {
	            var value = this._rejectionHandler0;
	            this._settlePromise0(this._fulfillmentHandler0, value, bitField);
	            this._fulfillPromises(len, value);
	        }
	        this._setLength(0);
	    }
	    this._clearCancellationData();
	};

	Promise.prototype._settledValue = function() {
	    var bitField = this._bitField;
	    if (((bitField & 33554432) !== 0)) {
	        return this._rejectionHandler0;
	    } else if (((bitField & 16777216) !== 0)) {
	        return this._fulfillmentHandler0;
	    }
	};

	function deferResolve(v) {this.promise._resolveCallback(v);}
	function deferReject(v) {this.promise._rejectCallback(v, false);}

	Promise.defer = Promise.pending = function() {
	    debug.deprecated("Promise.defer", "new Promise");
	    var promise = new Promise(INTERNAL);
	    return {
	        promise: promise,
	        resolve: deferResolve,
	        reject: deferReject
	    };
	};

	util.notEnumerableProp(Promise,
	                       "_makeSelfResolutionError",
	                       makeSelfResolutionError);

	__webpack_require__(18)(Promise, INTERNAL, tryConvertToPromise, apiRejection,
	    debug);
	__webpack_require__(19)(Promise, INTERNAL, tryConvertToPromise, debug);
	__webpack_require__(20)(Promise, PromiseArray, apiRejection, debug);
	__webpack_require__(21)(Promise);
	__webpack_require__(22)(Promise);
	__webpack_require__(23)(
	    Promise, PromiseArray, tryConvertToPromise, INTERNAL, debug);
	Promise.Promise = Promise;
	__webpack_require__(24)(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
	__webpack_require__(25)(Promise, apiRejection, tryConvertToPromise, createContext, INTERNAL, debug);
	__webpack_require__(26)(Promise, INTERNAL, debug);
	__webpack_require__(27)(Promise, apiRejection, INTERNAL, tryConvertToPromise, Proxyable, debug);
	__webpack_require__(28)(Promise);
	__webpack_require__(29)(Promise);
	__webpack_require__(30)(Promise, PromiseArray, tryConvertToPromise, apiRejection);
	__webpack_require__(31)(Promise, INTERNAL, tryConvertToPromise, apiRejection);
	__webpack_require__(32)(Promise, PromiseArray, apiRejection, tryConvertToPromise, INTERNAL, debug);
	__webpack_require__(33)(Promise, PromiseArray, debug);
	__webpack_require__(34)(Promise, PromiseArray, apiRejection);
	__webpack_require__(35)(Promise, INTERNAL);
	__webpack_require__(36)(Promise);
	__webpack_require__(37)(Promise, INTERNAL);
	__webpack_require__(38)(Promise, INTERNAL);
	                                                         
	    util.toFastProperties(Promise);                                          
	    util.toFastProperties(Promise.prototype);                                
	    function fillTypes(value) {                                              
	        var p = new Promise(INTERNAL);                                       
	        p._fulfillmentHandler0 = value;                                      
	        p._rejectionHandler0 = value;                                        
	        p._promise0 = value;                                                 
	        p._receiver0 = value;                                                
	    }                                                                        
	    // Complete slack tracking, opt out of field-type tracking and           
	    // stabilize map                                                         
	    fillTypes({a: 1});                                                       
	    fillTypes({b: 2});                                                       
	    fillTypes({c: 3});                                                       
	    fillTypes(1);                                                            
	    fillTypes(function(){});                                                 
	    fillTypes(undefined);                                                    
	    fillTypes(false);                                                        
	    fillTypes(new Promise(INTERNAL));                                        
	    debug.setBounds(Async.firstLineError, util.lastLineError);               
	    return Promise;                                                          

	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var es5 = __webpack_require__(6);
	var canEvaluate = typeof navigator == "undefined";

	var errorObj = {e: {}};
	var tryCatchTarget;
	var globalObject = typeof self !== "undefined" ? self :
	    typeof window !== "undefined" ? window :
	    typeof global !== "undefined" ? global :
	    this !== undefined ? this : null;

	function tryCatcher() {
	    try {
	        var target = tryCatchTarget;
	        tryCatchTarget = null;
	        return target.apply(this, arguments);
	    } catch (e) {
	        errorObj.e = e;
	        return errorObj;
	    }
	}
	function tryCatch(fn) {
	    tryCatchTarget = fn;
	    return tryCatcher;
	}

	var inherits = function(Child, Parent) {
	    var hasProp = {}.hasOwnProperty;

	    function T() {
	        this.constructor = Child;
	        this.constructor$ = Parent;
	        for (var propertyName in Parent.prototype) {
	            if (hasProp.call(Parent.prototype, propertyName) &&
	                propertyName.charAt(propertyName.length-1) !== "$"
	           ) {
	                this[propertyName + "$"] = Parent.prototype[propertyName];
	            }
	        }
	    }
	    T.prototype = Parent.prototype;
	    Child.prototype = new T();
	    return Child.prototype;
	};


	function isPrimitive(val) {
	    return val == null || val === true || val === false ||
	        typeof val === "string" || typeof val === "number";

	}

	function isObject(value) {
	    return typeof value === "function" ||
	           typeof value === "object" && value !== null;
	}

	function maybeWrapAsError(maybeError) {
	    if (!isPrimitive(maybeError)) return maybeError;

	    return new Error(safeToString(maybeError));
	}

	function withAppended(target, appendee) {
	    var len = target.length;
	    var ret = new Array(len + 1);
	    var i;
	    for (i = 0; i < len; ++i) {
	        ret[i] = target[i];
	    }
	    ret[i] = appendee;
	    return ret;
	}

	function getDataPropertyOrDefault(obj, key, defaultValue) {
	    if (es5.isES5) {
	        var desc = Object.getOwnPropertyDescriptor(obj, key);

	        if (desc != null) {
	            return desc.get == null && desc.set == null
	                    ? desc.value
	                    : defaultValue;
	        }
	    } else {
	        return {}.hasOwnProperty.call(obj, key) ? obj[key] : undefined;
	    }
	}

	function notEnumerableProp(obj, name, value) {
	    if (isPrimitive(obj)) return obj;
	    var descriptor = {
	        value: value,
	        configurable: true,
	        enumerable: false,
	        writable: true
	    };
	    es5.defineProperty(obj, name, descriptor);
	    return obj;
	}

	function thrower(r) {
	    throw r;
	}

	var inheritedDataKeys = (function() {
	    var excludedPrototypes = [
	        Array.prototype,
	        Object.prototype,
	        Function.prototype
	    ];

	    var isExcludedProto = function(val) {
	        for (var i = 0; i < excludedPrototypes.length; ++i) {
	            if (excludedPrototypes[i] === val) {
	                return true;
	            }
	        }
	        return false;
	    };

	    if (es5.isES5) {
	        var getKeys = Object.getOwnPropertyNames;
	        return function(obj) {
	            var ret = [];
	            var visitedKeys = Object.create(null);
	            while (obj != null && !isExcludedProto(obj)) {
	                var keys;
	                try {
	                    keys = getKeys(obj);
	                } catch (e) {
	                    return ret;
	                }
	                for (var i = 0; i < keys.length; ++i) {
	                    var key = keys[i];
	                    if (visitedKeys[key]) continue;
	                    visitedKeys[key] = true;
	                    var desc = Object.getOwnPropertyDescriptor(obj, key);
	                    if (desc != null && desc.get == null && desc.set == null) {
	                        ret.push(key);
	                    }
	                }
	                obj = es5.getPrototypeOf(obj);
	            }
	            return ret;
	        };
	    } else {
	        var hasProp = {}.hasOwnProperty;
	        return function(obj) {
	            if (isExcludedProto(obj)) return [];
	            var ret = [];

	            /*jshint forin:false */
	            enumeration: for (var key in obj) {
	                if (hasProp.call(obj, key)) {
	                    ret.push(key);
	                } else {
	                    for (var i = 0; i < excludedPrototypes.length; ++i) {
	                        if (hasProp.call(excludedPrototypes[i], key)) {
	                            continue enumeration;
	                        }
	                    }
	                    ret.push(key);
	                }
	            }
	            return ret;
	        };
	    }

	})();

	var thisAssignmentPattern = /this\s*\.\s*\S+\s*=/;
	function isClass(fn) {
	    try {
	        if (typeof fn === "function") {
	            var keys = es5.names(fn.prototype);

	            var hasMethods = es5.isES5 && keys.length > 1;
	            var hasMethodsOtherThanConstructor = keys.length > 0 &&
	                !(keys.length === 1 && keys[0] === "constructor");
	            var hasThisAssignmentAndStaticMethods =
	                thisAssignmentPattern.test(fn + "") && es5.names(fn).length > 0;

	            if (hasMethods || hasMethodsOtherThanConstructor ||
	                hasThisAssignmentAndStaticMethods) {
	                return true;
	            }
	        }
	        return false;
	    } catch (e) {
	        return false;
	    }
	}

	function toFastProperties(obj) {
	    /*jshint -W027,-W055,-W031*/
	    function FakeConstructor() {}
	    FakeConstructor.prototype = obj;
	    var l = 8;
	    while (l--) new FakeConstructor();
	    return obj;
	    eval(obj);
	}

	var rident = /^[a-z$_][a-z$_0-9]*$/i;
	function isIdentifier(str) {
	    return rident.test(str);
	}

	function filledRange(count, prefix, suffix) {
	    var ret = new Array(count);
	    for(var i = 0; i < count; ++i) {
	        ret[i] = prefix + i + suffix;
	    }
	    return ret;
	}

	function safeToString(obj) {
	    try {
	        return obj + "";
	    } catch (e) {
	        return "[no string representation]";
	    }
	}

	function isError(obj) {
	    return obj !== null &&
	           typeof obj === "object" &&
	           typeof obj.message === "string" &&
	           typeof obj.name === "string";
	}

	function markAsOriginatingFromRejection(e) {
	    try {
	        notEnumerableProp(e, "isOperational", true);
	    }
	    catch(ignore) {}
	}

	function originatesFromRejection(e) {
	    if (e == null) return false;
	    return ((e instanceof Error["__BluebirdErrorTypes__"].OperationalError) ||
	        e["isOperational"] === true);
	}

	function canAttachTrace(obj) {
	    return isError(obj) && es5.propertyIsWritable(obj, "stack");
	}

	var ensureErrorObject = (function() {
	    if (!("stack" in new Error())) {
	        return function(value) {
	            if (canAttachTrace(value)) return value;
	            try {throw new Error(safeToString(value));}
	            catch(err) {return err;}
	        };
	    } else {
	        return function(value) {
	            if (canAttachTrace(value)) return value;
	            return new Error(safeToString(value));
	        };
	    }
	})();

	function classString(obj) {
	    return {}.toString.call(obj);
	}

	function copyDescriptors(from, to, filter) {
	    var keys = es5.names(from);
	    for (var i = 0; i < keys.length; ++i) {
	        var key = keys[i];
	        if (filter(key)) {
	            try {
	                es5.defineProperty(to, key, es5.getDescriptor(from, key));
	            } catch (ignore) {}
	        }
	    }
	}

	var asArray = function(v) {
	    if (es5.isArray(v)) {
	        return v;
	    }
	    return null;
	};

	if (typeof Symbol !== "undefined" && Symbol.iterator) {
	    var ArrayFrom = typeof Array.from === "function" ? function(v) {
	        return Array.from(v);
	    } : function(v) {
	        var ret = [];
	        var it = v[Symbol.iterator]();
	        var itResult;
	        while (!((itResult = it.next()).done)) {
	            ret.push(itResult.value);
	        }
	        return ret;
	    };

	    asArray = function(v) {
	        if (es5.isArray(v)) {
	            return v;
	        } else if (v != null && typeof v[Symbol.iterator] === "function") {
	            return ArrayFrom(v);
	        }
	        return null;
	    };
	}

	var isNode = typeof process !== "undefined" &&
	        classString(process).toLowerCase() === "[object process]";

	function env(key, def) {
	    return isNode ? process.env[key] : def;
	}

	var ret = {
	    isClass: isClass,
	    isIdentifier: isIdentifier,
	    inheritedDataKeys: inheritedDataKeys,
	    getDataPropertyOrDefault: getDataPropertyOrDefault,
	    thrower: thrower,
	    isArray: es5.isArray,
	    asArray: asArray,
	    notEnumerableProp: notEnumerableProp,
	    isPrimitive: isPrimitive,
	    isObject: isObject,
	    isError: isError,
	    canEvaluate: canEvaluate,
	    errorObj: errorObj,
	    tryCatch: tryCatch,
	    inherits: inherits,
	    withAppended: withAppended,
	    maybeWrapAsError: maybeWrapAsError,
	    toFastProperties: toFastProperties,
	    filledRange: filledRange,
	    toString: safeToString,
	    canAttachTrace: canAttachTrace,
	    ensureErrorObject: ensureErrorObject,
	    originatesFromRejection: originatesFromRejection,
	    markAsOriginatingFromRejection: markAsOriginatingFromRejection,
	    classString: classString,
	    copyDescriptors: copyDescriptors,
	    hasDevTools: typeof chrome !== "undefined" && chrome &&
	                 typeof chrome.loadTimes === "function",
	    isNode: isNode,
	    env: env,
	    global: globalObject
	};
	ret.isRecentNode = ret.isNode && (function() {
	    var version = process.versions.node.split(".").map(Number);
	    return (version[0] === 0 && version[1] > 10) || (version[0] > 0);
	})();

	if (ret.isNode) ret.toFastProperties(process);

	try {throw new Error(); } catch (e) {ret.lastLineError = e;}
	module.exports = ret;


/***/ },
/* 6 */
/***/ function(module, exports) {

	var isES5 = (function(){
	    "use strict";
	    return this === undefined;
	})();

	if (isES5) {
	    module.exports = {
	        freeze: Object.freeze,
	        defineProperty: Object.defineProperty,
	        getDescriptor: Object.getOwnPropertyDescriptor,
	        keys: Object.keys,
	        names: Object.getOwnPropertyNames,
	        getPrototypeOf: Object.getPrototypeOf,
	        isArray: Array.isArray,
	        isES5: isES5,
	        propertyIsWritable: function(obj, prop) {
	            var descriptor = Object.getOwnPropertyDescriptor(obj, prop);
	            return !!(!descriptor || descriptor.writable || descriptor.set);
	        }
	    };
	} else {
	    var has = {}.hasOwnProperty;
	    var str = {}.toString;
	    var proto = {}.constructor.prototype;

	    var ObjectKeys = function (o) {
	        var ret = [];
	        for (var key in o) {
	            if (has.call(o, key)) {
	                ret.push(key);
	            }
	        }
	        return ret;
	    };

	    var ObjectGetDescriptor = function(o, key) {
	        return {value: o[key]};
	    };

	    var ObjectDefineProperty = function (o, key, desc) {
	        o[key] = desc.value;
	        return o;
	    };

	    var ObjectFreeze = function (obj) {
	        return obj;
	    };

	    var ObjectGetPrototypeOf = function (obj) {
	        try {
	            return Object(obj).constructor.prototype;
	        }
	        catch (e) {
	            return proto;
	        }
	    };

	    var ArrayIsArray = function (obj) {
	        try {
	            return str.call(obj) === "[object Array]";
	        }
	        catch(e) {
	            return false;
	        }
	    };

	    module.exports = {
	        isArray: ArrayIsArray,
	        keys: ObjectKeys,
	        names: ObjectKeys,
	        defineProperty: ObjectDefineProperty,
	        getDescriptor: ObjectGetDescriptor,
	        freeze: ObjectFreeze,
	        getPrototypeOf: ObjectGetPrototypeOf,
	        isES5: isES5,
	        propertyIsWritable: function() {
	            return true;
	        }
	    };
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var firstLineError;
	try {throw new Error(); } catch (e) {firstLineError = e;}
	var schedule = __webpack_require__(8);
	var Queue = __webpack_require__(9);
	var util = __webpack_require__(5);

	function Async() {
	    this._isTickUsed = false;
	    this._lateQueue = new Queue(16);
	    this._normalQueue = new Queue(16);
	    this._haveDrainedQueues = false;
	    this._trampolineEnabled = true;
	    var self = this;
	    this.drainQueues = function () {
	        self._drainQueues();
	    };
	    this._schedule = schedule;
	}

	Async.prototype.enableTrampoline = function() {
	    this._trampolineEnabled = true;
	};

	Async.prototype.disableTrampolineIfNecessary = function() {
	    if (util.hasDevTools) {
	        this._trampolineEnabled = false;
	    }
	};

	Async.prototype.haveItemsQueued = function () {
	    return this._isTickUsed || this._haveDrainedQueues;
	};


	Async.prototype.fatalError = function(e, isNode) {
	    if (isNode) {
	        process.stderr.write("Fatal " + (e instanceof Error ? e.stack : e) +
	            "\n");
	        process.exit(2);
	    } else {
	        this.throwLater(e);
	    }
	};

	Async.prototype.throwLater = function(fn, arg) {
	    if (arguments.length === 1) {
	        arg = fn;
	        fn = function () { throw arg; };
	    }
	    if (typeof setTimeout !== "undefined") {
	        setTimeout(function() {
	            fn(arg);
	        }, 0);
	    } else try {
	        this._schedule(function() {
	            fn(arg);
	        });
	    } catch (e) {
	        throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	};

	function AsyncInvokeLater(fn, receiver, arg) {
	    this._lateQueue.push(fn, receiver, arg);
	    this._queueTick();
	}

	function AsyncInvoke(fn, receiver, arg) {
	    this._normalQueue.push(fn, receiver, arg);
	    this._queueTick();
	}

	function AsyncSettlePromises(promise) {
	    this._normalQueue._pushOne(promise);
	    this._queueTick();
	}

	if (!util.hasDevTools) {
	    Async.prototype.invokeLater = AsyncInvokeLater;
	    Async.prototype.invoke = AsyncInvoke;
	    Async.prototype.settlePromises = AsyncSettlePromises;
	} else {
	    Async.prototype.invokeLater = function (fn, receiver, arg) {
	        if (this._trampolineEnabled) {
	            AsyncInvokeLater.call(this, fn, receiver, arg);
	        } else {
	            this._schedule(function() {
	                setTimeout(function() {
	                    fn.call(receiver, arg);
	                }, 100);
	            });
	        }
	    };

	    Async.prototype.invoke = function (fn, receiver, arg) {
	        if (this._trampolineEnabled) {
	            AsyncInvoke.call(this, fn, receiver, arg);
	        } else {
	            this._schedule(function() {
	                fn.call(receiver, arg);
	            });
	        }
	    };

	    Async.prototype.settlePromises = function(promise) {
	        if (this._trampolineEnabled) {
	            AsyncSettlePromises.call(this, promise);
	        } else {
	            this._schedule(function() {
	                promise._settlePromises();
	            });
	        }
	    };
	}

	Async.prototype.invokeFirst = function (fn, receiver, arg) {
	    this._normalQueue.unshift(fn, receiver, arg);
	    this._queueTick();
	};

	Async.prototype._drainQueue = function(queue) {
	    while (queue.length() > 0) {
	        var fn = queue.shift();
	        if (typeof fn !== "function") {
	            fn._settlePromises();
	            continue;
	        }
	        var receiver = queue.shift();
	        var arg = queue.shift();
	        fn.call(receiver, arg);
	    }
	};

	Async.prototype._drainQueues = function () {
	    this._drainQueue(this._normalQueue);
	    this._reset();
	    this._haveDrainedQueues = true;
	    this._drainQueue(this._lateQueue);
	};

	Async.prototype._queueTick = function () {
	    if (!this._isTickUsed) {
	        this._isTickUsed = true;
	        this._schedule(this.drainQueues);
	    }
	};

	Async.prototype._reset = function () {
	    this._isTickUsed = false;
	};

	module.exports = Async;
	module.exports.firstLineError = firstLineError;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util = __webpack_require__(5);
	var schedule;
	var noAsyncScheduler = function() {
	    throw new Error("No async scheduler available\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	};
	if (util.isNode && typeof MutationObserver === "undefined") {
	    var GlobalSetImmediate = global.setImmediate;
	    var ProcessNextTick = process.nextTick;
	    schedule = util.isRecentNode
	                ? function(fn) { GlobalSetImmediate.call(global, fn); }
	                : function(fn) { ProcessNextTick.call(process, fn); };
	} else if ((typeof MutationObserver !== "undefined") &&
	          !(typeof window !== "undefined" &&
	            window.navigator &&
	            window.navigator.standalone)) {
	    schedule = (function() {
	        var div = document.createElement("div");
	        var opts = {attributes: true};
	        var toggleScheduled = false;
	        var div2 = document.createElement("div");
	        var o2 = new MutationObserver(function() {
	            div.classList.toggle("foo");
	          toggleScheduled = false;
	        });
	        o2.observe(div2, opts);

	        var scheduleToggle = function() {
	            if (toggleScheduled) return;
	          toggleScheduled = true;
	          div2.classList.toggle("foo");
	        };

	        return function schedule(fn) {
	          var o = new MutationObserver(function() {
	            o.disconnect();
	            fn();
	          });
	          o.observe(div, opts);
	          scheduleToggle();
	        };
	    })();
	} else if (typeof setImmediate !== "undefined") {
	    schedule = function (fn) {
	        setImmediate(fn);
	    };
	} else if (typeof setTimeout !== "undefined") {
	    schedule = function (fn) {
	        setTimeout(fn, 0);
	    };
	} else {
	    schedule = noAsyncScheduler;
	}
	module.exports = schedule;


/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	function arrayMove(src, srcIndex, dst, dstIndex, len) {
	    for (var j = 0; j < len; ++j) {
	        dst[j + dstIndex] = src[j + srcIndex];
	        src[j + srcIndex] = void 0;
	    }
	}

	function Queue(capacity) {
	    this._capacity = capacity;
	    this._length = 0;
	    this._front = 0;
	}

	Queue.prototype._willBeOverCapacity = function (size) {
	    return this._capacity < size;
	};

	Queue.prototype._pushOne = function (arg) {
	    var length = this.length();
	    this._checkCapacity(length + 1);
	    var i = (this._front + length) & (this._capacity - 1);
	    this[i] = arg;
	    this._length = length + 1;
	};

	Queue.prototype._unshiftOne = function(value) {
	    var capacity = this._capacity;
	    this._checkCapacity(this.length() + 1);
	    var front = this._front;
	    var i = (((( front - 1 ) &
	                    ( capacity - 1) ) ^ capacity ) - capacity );
	    this[i] = value;
	    this._front = i;
	    this._length = this.length() + 1;
	};

	Queue.prototype.unshift = function(fn, receiver, arg) {
	    this._unshiftOne(arg);
	    this._unshiftOne(receiver);
	    this._unshiftOne(fn);
	};

	Queue.prototype.push = function (fn, receiver, arg) {
	    var length = this.length() + 3;
	    if (this._willBeOverCapacity(length)) {
	        this._pushOne(fn);
	        this._pushOne(receiver);
	        this._pushOne(arg);
	        return;
	    }
	    var j = this._front + length - 3;
	    this._checkCapacity(length);
	    var wrapMask = this._capacity - 1;
	    this[(j + 0) & wrapMask] = fn;
	    this[(j + 1) & wrapMask] = receiver;
	    this[(j + 2) & wrapMask] = arg;
	    this._length = length;
	};

	Queue.prototype.shift = function () {
	    var front = this._front,
	        ret = this[front];

	    this[front] = undefined;
	    this._front = (front + 1) & (this._capacity - 1);
	    this._length--;
	    return ret;
	};

	Queue.prototype.length = function () {
	    return this._length;
	};

	Queue.prototype._checkCapacity = function (size) {
	    if (this._capacity < size) {
	        this._resizeTo(this._capacity << 1);
	    }
	};

	Queue.prototype._resizeTo = function (capacity) {
	    var oldCapacity = this._capacity;
	    this._capacity = capacity;
	    var front = this._front;
	    var length = this._length;
	    var moveItemsCount = (front + length) & (oldCapacity - 1);
	    arrayMove(this, 0, this, oldCapacity, moveItemsCount);
	};

	module.exports = Queue;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var es5 = __webpack_require__(6);
	var Objectfreeze = es5.freeze;
	var util = __webpack_require__(5);
	var inherits = util.inherits;
	var notEnumerableProp = util.notEnumerableProp;

	function subError(nameProperty, defaultMessage) {
	    function SubError(message) {
	        if (!(this instanceof SubError)) return new SubError(message);
	        notEnumerableProp(this, "message",
	            typeof message === "string" ? message : defaultMessage);
	        notEnumerableProp(this, "name", nameProperty);
	        if (Error.captureStackTrace) {
	            Error.captureStackTrace(this, this.constructor);
	        } else {
	            Error.call(this);
	        }
	    }
	    inherits(SubError, Error);
	    return SubError;
	}

	var _TypeError, _RangeError;
	var Warning = subError("Warning", "warning");
	var CancellationError = subError("CancellationError", "cancellation error");
	var TimeoutError = subError("TimeoutError", "timeout error");
	var AggregateError = subError("AggregateError", "aggregate error");
	try {
	    _TypeError = TypeError;
	    _RangeError = RangeError;
	} catch(e) {
	    _TypeError = subError("TypeError", "type error");
	    _RangeError = subError("RangeError", "range error");
	}

	var methods = ("join pop push shift unshift slice filter forEach some " +
	    "every map indexOf lastIndexOf reduce reduceRight sort reverse").split(" ");

	for (var i = 0; i < methods.length; ++i) {
	    if (typeof Array.prototype[methods[i]] === "function") {
	        AggregateError.prototype[methods[i]] = Array.prototype[methods[i]];
	    }
	}

	es5.defineProperty(AggregateError.prototype, "length", {
	    value: 0,
	    configurable: false,
	    writable: true,
	    enumerable: true
	});
	AggregateError.prototype["isOperational"] = true;
	var level = 0;
	AggregateError.prototype.toString = function() {
	    var indent = Array(level * 4 + 1).join(" ");
	    var ret = "\n" + indent + "AggregateError of:" + "\n";
	    level++;
	    indent = Array(level * 4 + 1).join(" ");
	    for (var i = 0; i < this.length; ++i) {
	        var str = this[i] === this ? "[Circular AggregateError]" : this[i] + "";
	        var lines = str.split("\n");
	        for (var j = 0; j < lines.length; ++j) {
	            lines[j] = indent + lines[j];
	        }
	        str = lines.join("\n");
	        ret += str + "\n";
	    }
	    level--;
	    return ret;
	};

	function OperationalError(message) {
	    if (!(this instanceof OperationalError))
	        return new OperationalError(message);
	    notEnumerableProp(this, "name", "OperationalError");
	    notEnumerableProp(this, "message", message);
	    this.cause = message;
	    this["isOperational"] = true;

	    if (message instanceof Error) {
	        notEnumerableProp(this, "message", message.message);
	        notEnumerableProp(this, "stack", message.stack);
	    } else if (Error.captureStackTrace) {
	        Error.captureStackTrace(this, this.constructor);
	    }

	}
	inherits(OperationalError, Error);

	var errorTypes = Error["__BluebirdErrorTypes__"];
	if (!errorTypes) {
	    errorTypes = Objectfreeze({
	        CancellationError: CancellationError,
	        TimeoutError: TimeoutError,
	        OperationalError: OperationalError,
	        RejectionError: OperationalError,
	        AggregateError: AggregateError
	    });
	    es5.defineProperty(Error, "__BluebirdErrorTypes__", {
	        value: errorTypes,
	        writable: false,
	        enumerable: false,
	        configurable: false
	    });
	}

	module.exports = {
	    Error: Error,
	    TypeError: _TypeError,
	    RangeError: _RangeError,
	    CancellationError: errorTypes.CancellationError,
	    OperationalError: errorTypes.OperationalError,
	    TimeoutError: errorTypes.TimeoutError,
	    AggregateError: errorTypes.AggregateError,
	    Warning: Warning
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise, INTERNAL) {
	var util = __webpack_require__(5);
	var errorObj = util.errorObj;
	var isObject = util.isObject;

	function tryConvertToPromise(obj, context) {
	    if (isObject(obj)) {
	        if (obj instanceof Promise) return obj;
	        var then = getThen(obj);
	        if (then === errorObj) {
	            if (context) context._pushContext();
	            var ret = Promise.reject(then.e);
	            if (context) context._popContext();
	            return ret;
	        } else if (typeof then === "function") {
	            if (isAnyBluebirdPromise(obj)) {
	                var ret = new Promise(INTERNAL);
	                obj._then(
	                    ret._fulfill,
	                    ret._reject,
	                    undefined,
	                    ret,
	                    null
	                );
	                return ret;
	            }
	            return doThenable(obj, then, context);
	        }
	    }
	    return obj;
	}

	function doGetThen(obj) {
	    return obj.then;
	}

	function getThen(obj) {
	    try {
	        return doGetThen(obj);
	    } catch (e) {
	        errorObj.e = e;
	        return errorObj;
	    }
	}

	var hasProp = {}.hasOwnProperty;
	function isAnyBluebirdPromise(obj) {
	    return hasProp.call(obj, "_promise0");
	}

	function doThenable(x, then, context) {
	    var promise = new Promise(INTERNAL);
	    var ret = promise;
	    if (context) context._pushContext();
	    promise._captureStackTrace();
	    if (context) context._popContext();
	    var synchronous = true;
	    var result = util.tryCatch(then).call(x, resolve, reject);
	    synchronous = false;

	    if (promise && result === errorObj) {
	        promise._rejectCallback(result.e, true, true);
	        promise = null;
	    }

	    function resolve(value) {
	        if (!promise) return;
	        promise._resolveCallback(value);
	        promise = null;
	    }

	    function reject(reason) {
	        if (!promise) return;
	        promise._rejectCallback(reason, synchronous, true);
	        promise = null;
	    }
	    return ret;
	}

	return tryConvertToPromise;
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise, INTERNAL, tryConvertToPromise,
	    apiRejection, Proxyable) {
	var util = __webpack_require__(5);
	var isArray = util.isArray;

	function toResolutionValue(val) {
	    switch(val) {
	    case -2: return [];
	    case -3: return {};
	    }
	}

	function PromiseArray(values) {
	    var promise = this._promise = new Promise(INTERNAL);
	    if (values instanceof Promise) {
	        promise._propagateFrom(values, 3);
	    }
	    promise._setOnCancel(this);
	    this._values = values;
	    this._length = 0;
	    this._totalResolved = 0;
	    this._init(undefined, -2);
	}
	util.inherits(PromiseArray, Proxyable);

	PromiseArray.prototype.length = function () {
	    return this._length;
	};

	PromiseArray.prototype.promise = function () {
	    return this._promise;
	};

	PromiseArray.prototype._init = function init(_, resolveValueIfEmpty) {
	    var values = tryConvertToPromise(this._values, this._promise);
	    if (values instanceof Promise) {
	        values = values._target();
	        var bitField = values._bitField;
	        ;
	        this._values = values;

	        if (((bitField & 50397184) === 0)) {
	            this._promise._setAsyncGuaranteed();
	            return values._then(
	                init,
	                this._reject,
	                undefined,
	                this,
	                resolveValueIfEmpty
	           );
	        } else if (((bitField & 33554432) !== 0)) {
	            values = values._value();
	        } else if (((bitField & 16777216) !== 0)) {
	            return this._reject(values._reason());
	        } else {
	            return this._cancel();
	        }
	    }
	    values = util.asArray(values);
	    if (values === null) {
	        var err = apiRejection(
	            "expecting an array or an iterable object but got " + util.classString(values)).reason();
	        this._promise._rejectCallback(err, false);
	        return;
	    }

	    if (values.length === 0) {
	        if (resolveValueIfEmpty === -5) {
	            this._resolveEmptyArray();
	        }
	        else {
	            this._resolve(toResolutionValue(resolveValueIfEmpty));
	        }
	        return;
	    }
	    this._iterate(values);
	};

	PromiseArray.prototype._iterate = function(values) {
	    var len = this.getActualLength(values.length);
	    this._length = len;
	    this._values = this.shouldCopyValues() ? new Array(len) : this._values;
	    var result = this._promise;
	    var isResolved = false;
	    var bitField = null;
	    for (var i = 0; i < len; ++i) {
	        var maybePromise = tryConvertToPromise(values[i], result);

	        if (maybePromise instanceof Promise) {
	            maybePromise = maybePromise._target();
	            bitField = maybePromise._bitField;
	        } else {
	            bitField = null;
	        }

	        if (isResolved) {
	            if (bitField !== null) {
	                maybePromise.suppressUnhandledRejections();
	            }
	        } else if (bitField !== null) {
	            if (((bitField & 50397184) === 0)) {
	                maybePromise._proxy(this, i);
	                this._values[i] = maybePromise;
	            } else if (((bitField & 33554432) !== 0)) {
	                isResolved = this._promiseFulfilled(maybePromise._value(), i);
	            } else if (((bitField & 16777216) !== 0)) {
	                isResolved = this._promiseRejected(maybePromise._reason(), i);
	            } else {
	                isResolved = this._promiseCancelled(i);
	            }
	        } else {
	            isResolved = this._promiseFulfilled(maybePromise, i);
	        }
	    }
	    if (!isResolved) result._setAsyncGuaranteed();
	};

	PromiseArray.prototype._isResolved = function () {
	    return this._values === null;
	};

	PromiseArray.prototype._resolve = function (value) {
	    this._values = null;
	    this._promise._fulfill(value);
	};

	PromiseArray.prototype._cancel = function() {
	    if (this._isResolved() || !this._promise.isCancellable()) return;
	    this._values = null;
	    this._promise._cancel();
	};

	PromiseArray.prototype._reject = function (reason) {
	    this._values = null;
	    this._promise._rejectCallback(reason, false);
	};

	PromiseArray.prototype._promiseFulfilled = function (value, index) {
	    this._values[index] = value;
	    var totalResolved = ++this._totalResolved;
	    if (totalResolved >= this._length) {
	        this._resolve(this._values);
	        return true;
	    }
	    return false;
	};

	PromiseArray.prototype._promiseCancelled = function() {
	    this._cancel();
	    return true;
	};

	PromiseArray.prototype._promiseRejected = function (reason) {
	    this._totalResolved++;
	    this._reject(reason);
	    return true;
	};

	PromiseArray.prototype._resultCancelled = function() {
	    if (this._isResolved()) return;
	    var values = this._values;
	    this._cancel();
	    if (values instanceof Promise) {
	        values.cancel();
	    } else {
	        for (var i = 0; i < values.length; ++i) {
	            if (values[i] instanceof Promise) {
	                values[i].cancel();
	            }
	        }
	    }
	};

	PromiseArray.prototype.shouldCopyValues = function () {
	    return true;
	};

	PromiseArray.prototype.getActualLength = function (len) {
	    return len;
	};

	return PromiseArray;
	};


/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	module.exports = function(Promise) {
	var longStackTraces = false;
	var contextStack = [];

	Promise.prototype._promiseCreated = function() {};
	Promise.prototype._pushContext = function() {};
	Promise.prototype._popContext = function() {return null;};
	Promise._peekContext = Promise.prototype._peekContext = function() {};

	function Context() {
	    this._trace = new Context.CapturedTrace(peekContext());
	}
	Context.prototype._pushContext = function () {
	    if (this._trace !== undefined) {
	        this._trace._promiseCreated = null;
	        contextStack.push(this._trace);
	    }
	};

	Context.prototype._popContext = function () {
	    if (this._trace !== undefined) {
	        var trace = contextStack.pop();
	        var ret = trace._promiseCreated;
	        trace._promiseCreated = null;
	        return ret;
	    }
	    return null;
	};

	function createContext() {
	    if (longStackTraces) return new Context();
	}

	function peekContext() {
	    var lastIndex = contextStack.length - 1;
	    if (lastIndex >= 0) {
	        return contextStack[lastIndex];
	    }
	    return undefined;
	}
	Context.CapturedTrace = null;
	Context.create = createContext;
	Context.deactivateLongStackTraces = function() {};
	Context.activateLongStackTraces = function() {
	    var Promise_pushContext = Promise.prototype._pushContext;
	    var Promise_popContext = Promise.prototype._popContext;
	    var Promise_PeekContext = Promise._peekContext;
	    var Promise_peekContext = Promise.prototype._peekContext;
	    var Promise_promiseCreated = Promise.prototype._promiseCreated;
	    Context.deactivateLongStackTraces = function() {
	        Promise.prototype._pushContext = Promise_pushContext;
	        Promise.prototype._popContext = Promise_popContext;
	        Promise._peekContext = Promise_PeekContext;
	        Promise.prototype._peekContext = Promise_peekContext;
	        Promise.prototype._promiseCreated = Promise_promiseCreated;
	        longStackTraces = false;
	    };
	    longStackTraces = true;
	    Promise.prototype._pushContext = Context.prototype._pushContext;
	    Promise.prototype._popContext = Context.prototype._popContext;
	    Promise._peekContext = Promise.prototype._peekContext = peekContext;
	    Promise.prototype._promiseCreated = function() {
	        var ctx = this._peekContext();
	        if (ctx && ctx._promiseCreated == null) ctx._promiseCreated = this;
	    };
	};
	return Context;
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise, Context) {
	var getDomain = Promise._getDomain;
	var async = Promise._async;
	var Warning = __webpack_require__(10).Warning;
	var util = __webpack_require__(5);
	var canAttachTrace = util.canAttachTrace;
	var unhandledRejectionHandled;
	var possiblyUnhandledRejection;
	var bluebirdFramePattern =
	    /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/;
	var stackFramePattern = null;
	var formatStack = null;
	var indentStackFrames = false;
	var printWarning;
	var debugging = !!(util.env("BLUEBIRD_DEBUG") != 0 &&
	                        (false ||
	                         util.env("BLUEBIRD_DEBUG") ||
	                         util.env("NODE_ENV") === "development"));

	var warnings = !!(util.env("BLUEBIRD_WARNINGS") != 0 &&
	    (debugging || util.env("BLUEBIRD_WARNINGS")));

	var longStackTraces = !!(util.env("BLUEBIRD_LONG_STACK_TRACES") != 0 &&
	    (debugging || util.env("BLUEBIRD_LONG_STACK_TRACES")));

	var wForgottenReturn = util.env("BLUEBIRD_W_FORGOTTEN_RETURN") != 0 &&
	    (warnings || !!util.env("BLUEBIRD_W_FORGOTTEN_RETURN"));

	Promise.prototype.suppressUnhandledRejections = function() {
	    var target = this._target();
	    target._bitField = ((target._bitField & (~1048576)) |
	                      524288);
	};

	Promise.prototype._ensurePossibleRejectionHandled = function () {
	    if ((this._bitField & 524288) !== 0) return;
	    this._setRejectionIsUnhandled();
	    async.invokeLater(this._notifyUnhandledRejection, this, undefined);
	};

	Promise.prototype._notifyUnhandledRejectionIsHandled = function () {
	    fireRejectionEvent("rejectionHandled",
	                                  unhandledRejectionHandled, undefined, this);
	};

	Promise.prototype._setReturnedNonUndefined = function() {
	    this._bitField = this._bitField | 268435456;
	};

	Promise.prototype._returnedNonUndefined = function() {
	    return (this._bitField & 268435456) !== 0;
	};

	Promise.prototype._notifyUnhandledRejection = function () {
	    if (this._isRejectionUnhandled()) {
	        var reason = this._settledValue();
	        this._setUnhandledRejectionIsNotified();
	        fireRejectionEvent("unhandledRejection",
	                                      possiblyUnhandledRejection, reason, this);
	    }
	};

	Promise.prototype._setUnhandledRejectionIsNotified = function () {
	    this._bitField = this._bitField | 262144;
	};

	Promise.prototype._unsetUnhandledRejectionIsNotified = function () {
	    this._bitField = this._bitField & (~262144);
	};

	Promise.prototype._isUnhandledRejectionNotified = function () {
	    return (this._bitField & 262144) > 0;
	};

	Promise.prototype._setRejectionIsUnhandled = function () {
	    this._bitField = this._bitField | 1048576;
	};

	Promise.prototype._unsetRejectionIsUnhandled = function () {
	    this._bitField = this._bitField & (~1048576);
	    if (this._isUnhandledRejectionNotified()) {
	        this._unsetUnhandledRejectionIsNotified();
	        this._notifyUnhandledRejectionIsHandled();
	    }
	};

	Promise.prototype._isRejectionUnhandled = function () {
	    return (this._bitField & 1048576) > 0;
	};

	Promise.prototype._warn = function(message, shouldUseOwnTrace, promise) {
	    return warn(message, shouldUseOwnTrace, promise || this);
	};

	Promise.onPossiblyUnhandledRejection = function (fn) {
	    var domain = getDomain();
	    possiblyUnhandledRejection =
	        typeof fn === "function" ? (domain === null ? fn : domain.bind(fn))
	                                 : undefined;
	};

	Promise.onUnhandledRejectionHandled = function (fn) {
	    var domain = getDomain();
	    unhandledRejectionHandled =
	        typeof fn === "function" ? (domain === null ? fn : domain.bind(fn))
	                                 : undefined;
	};

	var disableLongStackTraces = function() {};
	Promise.longStackTraces = function () {
	    if (async.haveItemsQueued() && !config.longStackTraces) {
	        throw new Error("cannot enable long stack traces after promises have been created\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	    if (!config.longStackTraces && longStackTracesIsSupported()) {
	        var Promise_captureStackTrace = Promise.prototype._captureStackTrace;
	        var Promise_attachExtraTrace = Promise.prototype._attachExtraTrace;
	        config.longStackTraces = true;
	        disableLongStackTraces = function() {
	            if (async.haveItemsQueued() && !config.longStackTraces) {
	                throw new Error("cannot enable long stack traces after promises have been created\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	            }
	            Promise.prototype._captureStackTrace = Promise_captureStackTrace;
	            Promise.prototype._attachExtraTrace = Promise_attachExtraTrace;
	            Context.deactivateLongStackTraces();
	            async.enableTrampoline();
	            config.longStackTraces = false;
	        };
	        Promise.prototype._captureStackTrace = longStackTracesCaptureStackTrace;
	        Promise.prototype._attachExtraTrace = longStackTracesAttachExtraTrace;
	        Context.activateLongStackTraces();
	        async.disableTrampolineIfNecessary();
	    }
	};

	Promise.hasLongStackTraces = function () {
	    return config.longStackTraces && longStackTracesIsSupported();
	};

	var fireDomEvent = (function() {
	    try {
	        var event = document.createEvent("CustomEvent");
	        event.initCustomEvent("testingtheevent", false, true, {});
	        util.global.dispatchEvent(event);
	        return function(name, event) {
	            var domEvent = document.createEvent("CustomEvent");
	            domEvent.initCustomEvent(name.toLowerCase(), false, true, event);
	            return !util.global.dispatchEvent(domEvent);
	        };
	    } catch (e) {}
	    return function() {
	        return false;
	    };
	})();

	var fireGlobalEvent = (function() {
	    if (util.isNode) {
	        return function() {
	            return process.emit.apply(process, arguments);
	        };
	    } else {
	        if (!util.global) {
	            return function() {
	                return false;
	            };
	        }
	        return function(name) {
	            var methodName = "on" + name.toLowerCase();
	            var method = util.global[methodName];
	            if (!method) return false;
	            method.apply(util.global, [].slice.call(arguments, 1));
	            return true;
	        };
	    }
	})();

	function generatePromiseLifecycleEventObject(name, promise) {
	    return {promise: promise};
	}

	var eventToObjectGenerator = {
	    promiseCreated: generatePromiseLifecycleEventObject,
	    promiseFulfilled: generatePromiseLifecycleEventObject,
	    promiseRejected: generatePromiseLifecycleEventObject,
	    promiseResolved: generatePromiseLifecycleEventObject,
	    promiseCancelled: generatePromiseLifecycleEventObject,
	    promiseChained: function(name, promise, child) {
	        return {promise: promise, child: child};
	    },
	    warning: function(name, warning) {
	        return {warning: warning};
	    },
	    unhandledRejection: function (name, reason, promise) {
	        return {reason: reason, promise: promise};
	    },
	    rejectionHandled: generatePromiseLifecycleEventObject
	};

	var activeFireEvent = function (name) {
	    var globalEventFired = false;
	    try {
	        globalEventFired = fireGlobalEvent.apply(null, arguments);
	    } catch (e) {
	        async.throwLater(e);
	        globalEventFired = true;
	    }

	    var domEventFired = false;
	    try {
	        domEventFired = fireDomEvent(name,
	                    eventToObjectGenerator[name].apply(null, arguments));
	    } catch (e) {
	        async.throwLater(e);
	        domEventFired = true;
	    }

	    return domEventFired || globalEventFired;
	};

	Promise.config = function(opts) {
	    opts = Object(opts);
	    if ("longStackTraces" in opts) {
	        if (opts.longStackTraces) {
	            Promise.longStackTraces();
	        } else if (!opts.longStackTraces && Promise.hasLongStackTraces()) {
	            disableLongStackTraces();
	        }
	    }
	    if ("warnings" in opts) {
	        var warningsOption = opts.warnings;
	        config.warnings = !!warningsOption;
	        wForgottenReturn = config.warnings;

	        if (util.isObject(warningsOption)) {
	            if ("wForgottenReturn" in warningsOption) {
	                wForgottenReturn = !!warningsOption.wForgottenReturn;
	            }
	        }
	    }
	    if ("cancellation" in opts && opts.cancellation && !config.cancellation) {
	        if (async.haveItemsQueued()) {
	            throw new Error(
	                "cannot enable cancellation after promises are in use");
	        }
	        Promise.prototype._clearCancellationData =
	            cancellationClearCancellationData;
	        Promise.prototype._propagateFrom = cancellationPropagateFrom;
	        Promise.prototype._onCancel = cancellationOnCancel;
	        Promise.prototype._setOnCancel = cancellationSetOnCancel;
	        Promise.prototype._attachCancellationCallback =
	            cancellationAttachCancellationCallback;
	        Promise.prototype._execute = cancellationExecute;
	        propagateFromFunction = cancellationPropagateFrom;
	        config.cancellation = true;
	    }
	    if ("monitoring" in opts) {
	        if (opts.monitoring && !config.monitoring) {
	            config.monitoring = true;
	            Promise.prototype._fireEvent = activeFireEvent;
	        } else if (!opts.monitoring && config.monitoring) {
	            config.monitoring = false;
	            Promise.prototype._fireEvent = defaultFireEvent;
	        }
	    }
	};

	function defaultFireEvent() { return false; }

	Promise.prototype._fireEvent = defaultFireEvent;
	Promise.prototype._execute = function(executor, resolve, reject) {
	    try {
	        executor(resolve, reject);
	    } catch (e) {
	        return e;
	    }
	};
	Promise.prototype._onCancel = function () {};
	Promise.prototype._setOnCancel = function (handler) { ; };
	Promise.prototype._attachCancellationCallback = function(onCancel) {
	    ;
	};
	Promise.prototype._captureStackTrace = function () {};
	Promise.prototype._attachExtraTrace = function () {};
	Promise.prototype._clearCancellationData = function() {};
	Promise.prototype._propagateFrom = function (parent, flags) {
	    ;
	    ;
	};

	function cancellationExecute(executor, resolve, reject) {
	    var promise = this;
	    try {
	        executor(resolve, reject, function(onCancel) {
	            if (typeof onCancel !== "function") {
	                throw new TypeError("onCancel must be a function, got: " +
	                                    util.toString(onCancel));
	            }
	            promise._attachCancellationCallback(onCancel);
	        });
	    } catch (e) {
	        return e;
	    }
	}

	function cancellationAttachCancellationCallback(onCancel) {
	    if (!this.isCancellable()) return this;

	    var previousOnCancel = this._onCancel();
	    if (previousOnCancel !== undefined) {
	        if (util.isArray(previousOnCancel)) {
	            previousOnCancel.push(onCancel);
	        } else {
	            this._setOnCancel([previousOnCancel, onCancel]);
	        }
	    } else {
	        this._setOnCancel(onCancel);
	    }
	}

	function cancellationOnCancel() {
	    return this._onCancelField;
	}

	function cancellationSetOnCancel(onCancel) {
	    this._onCancelField = onCancel;
	}

	function cancellationClearCancellationData() {
	    this._cancellationParent = undefined;
	    this._onCancelField = undefined;
	}

	function cancellationPropagateFrom(parent, flags) {
	    if ((flags & 1) !== 0) {
	        this._cancellationParent = parent;
	        var branchesRemainingToCancel = parent._branchesRemainingToCancel;
	        if (branchesRemainingToCancel === undefined) {
	            branchesRemainingToCancel = 0;
	        }
	        parent._branchesRemainingToCancel = branchesRemainingToCancel + 1;
	    }
	    if ((flags & 2) !== 0 && parent._isBound()) {
	        this._setBoundTo(parent._boundTo);
	    }
	}

	function bindingPropagateFrom(parent, flags) {
	    if ((flags & 2) !== 0 && parent._isBound()) {
	        this._setBoundTo(parent._boundTo);
	    }
	}
	var propagateFromFunction = bindingPropagateFrom;

	function boundValueFunction() {
	    var ret = this._boundTo;
	    if (ret !== undefined) {
	        if (ret instanceof Promise) {
	            if (ret.isFulfilled()) {
	                return ret.value();
	            } else {
	                return undefined;
	            }
	        }
	    }
	    return ret;
	}

	function longStackTracesCaptureStackTrace() {
	    this._trace = new CapturedTrace(this._peekContext());
	}

	function longStackTracesAttachExtraTrace(error, ignoreSelf) {
	    if (canAttachTrace(error)) {
	        var trace = this._trace;
	        if (trace !== undefined) {
	            if (ignoreSelf) trace = trace._parent;
	        }
	        if (trace !== undefined) {
	            trace.attachExtraTrace(error);
	        } else if (!error.__stackCleaned__) {
	            var parsed = parseStackAndMessage(error);
	            util.notEnumerableProp(error, "stack",
	                parsed.message + "\n" + parsed.stack.join("\n"));
	            util.notEnumerableProp(error, "__stackCleaned__", true);
	        }
	    }
	}

	function checkForgottenReturns(returnValue, promiseCreated, name, promise,
	                               parent) {
	    if (returnValue === undefined && promiseCreated !== null &&
	        wForgottenReturn) {
	        if (parent !== undefined && parent._returnedNonUndefined()) return;
	        var bitField = promise._bitField;
	        if ((bitField & 65535) === 0) return;

	        if (name) name = name + " ";
	        var msg = "a promise was created in a " + name +
	            "handler but was not returned from it";
	        promise._warn(msg, true, promiseCreated);
	    }
	}

	function deprecated(name, replacement) {
	    var message = name +
	        " is deprecated and will be removed in a future version.";
	    if (replacement) message += " Use " + replacement + " instead.";
	    return warn(message);
	}

	function warn(message, shouldUseOwnTrace, promise) {
	    if (!config.warnings) return;
	    var warning = new Warning(message);
	    var ctx;
	    if (shouldUseOwnTrace) {
	        promise._attachExtraTrace(warning);
	    } else if (config.longStackTraces && (ctx = Promise._peekContext())) {
	        ctx.attachExtraTrace(warning);
	    } else {
	        var parsed = parseStackAndMessage(warning);
	        warning.stack = parsed.message + "\n" + parsed.stack.join("\n");
	    }

	    if (!activeFireEvent("warning", warning)) {
	        formatAndLogError(warning, "", true);
	    }
	}

	function reconstructStack(message, stacks) {
	    for (var i = 0; i < stacks.length - 1; ++i) {
	        stacks[i].push("From previous event:");
	        stacks[i] = stacks[i].join("\n");
	    }
	    if (i < stacks.length) {
	        stacks[i] = stacks[i].join("\n");
	    }
	    return message + "\n" + stacks.join("\n");
	}

	function removeDuplicateOrEmptyJumps(stacks) {
	    for (var i = 0; i < stacks.length; ++i) {
	        if (stacks[i].length === 0 ||
	            ((i + 1 < stacks.length) && stacks[i][0] === stacks[i+1][0])) {
	            stacks.splice(i, 1);
	            i--;
	        }
	    }
	}

	function removeCommonRoots(stacks) {
	    var current = stacks[0];
	    for (var i = 1; i < stacks.length; ++i) {
	        var prev = stacks[i];
	        var currentLastIndex = current.length - 1;
	        var currentLastLine = current[currentLastIndex];
	        var commonRootMeetPoint = -1;

	        for (var j = prev.length - 1; j >= 0; --j) {
	            if (prev[j] === currentLastLine) {
	                commonRootMeetPoint = j;
	                break;
	            }
	        }

	        for (var j = commonRootMeetPoint; j >= 0; --j) {
	            var line = prev[j];
	            if (current[currentLastIndex] === line) {
	                current.pop();
	                currentLastIndex--;
	            } else {
	                break;
	            }
	        }
	        current = prev;
	    }
	}

	function cleanStack(stack) {
	    var ret = [];
	    for (var i = 0; i < stack.length; ++i) {
	        var line = stack[i];
	        var isTraceLine = "    (No stack trace)" === line ||
	            stackFramePattern.test(line);
	        var isInternalFrame = isTraceLine && shouldIgnore(line);
	        if (isTraceLine && !isInternalFrame) {
	            if (indentStackFrames && line.charAt(0) !== " ") {
	                line = "    " + line;
	            }
	            ret.push(line);
	        }
	    }
	    return ret;
	}

	function stackFramesAsArray(error) {
	    var stack = error.stack.replace(/\s+$/g, "").split("\n");
	    for (var i = 0; i < stack.length; ++i) {
	        var line = stack[i];
	        if ("    (No stack trace)" === line || stackFramePattern.test(line)) {
	            break;
	        }
	    }
	    if (i > 0) {
	        stack = stack.slice(i);
	    }
	    return stack;
	}

	function parseStackAndMessage(error) {
	    var stack = error.stack;
	    var message = error.toString();
	    stack = typeof stack === "string" && stack.length > 0
	                ? stackFramesAsArray(error) : ["    (No stack trace)"];
	    return {
	        message: message,
	        stack: cleanStack(stack)
	    };
	}

	function formatAndLogError(error, title, isSoft) {
	    if (typeof console !== "undefined") {
	        var message;
	        if (util.isObject(error)) {
	            var stack = error.stack;
	            message = title + formatStack(stack, error);
	        } else {
	            message = title + String(error);
	        }
	        if (typeof printWarning === "function") {
	            printWarning(message, isSoft);
	        } else if (typeof console.log === "function" ||
	            typeof console.log === "object") {
	            console.log(message);
	        }
	    }
	}

	function fireRejectionEvent(name, localHandler, reason, promise) {
	    var localEventFired = false;
	    try {
	        if (typeof localHandler === "function") {
	            localEventFired = true;
	            if (name === "rejectionHandled") {
	                localHandler(promise);
	            } else {
	                localHandler(reason, promise);
	            }
	        }
	    } catch (e) {
	        async.throwLater(e);
	    }

	    if (name === "unhandledRejection") {
	        if (!activeFireEvent(name, reason, promise) && !localEventFired) {
	            formatAndLogError(reason, "Unhandled rejection ");
	        }
	    } else {
	        activeFireEvent(name, promise);
	    }
	}

	function formatNonError(obj) {
	    var str;
	    if (typeof obj === "function") {
	        str = "[function " +
	            (obj.name || "anonymous") +
	            "]";
	    } else {
	        str = obj && typeof obj.toString === "function"
	            ? obj.toString() : util.toString(obj);
	        var ruselessToString = /\[object [a-zA-Z0-9$_]+\]/;
	        if (ruselessToString.test(str)) {
	            try {
	                var newStr = JSON.stringify(obj);
	                str = newStr;
	            }
	            catch(e) {

	            }
	        }
	        if (str.length === 0) {
	            str = "(empty array)";
	        }
	    }
	    return ("(<" + snip(str) + ">, no stack trace)");
	}

	function snip(str) {
	    var maxChars = 41;
	    if (str.length < maxChars) {
	        return str;
	    }
	    return str.substr(0, maxChars - 3) + "...";
	}

	function longStackTracesIsSupported() {
	    return typeof captureStackTrace === "function";
	}

	var shouldIgnore = function() { return false; };
	var parseLineInfoRegex = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;
	function parseLineInfo(line) {
	    var matches = line.match(parseLineInfoRegex);
	    if (matches) {
	        return {
	            fileName: matches[1],
	            line: parseInt(matches[2], 10)
	        };
	    }
	}

	function setBounds(firstLineError, lastLineError) {
	    if (!longStackTracesIsSupported()) return;
	    var firstStackLines = firstLineError.stack.split("\n");
	    var lastStackLines = lastLineError.stack.split("\n");
	    var firstIndex = -1;
	    var lastIndex = -1;
	    var firstFileName;
	    var lastFileName;
	    for (var i = 0; i < firstStackLines.length; ++i) {
	        var result = parseLineInfo(firstStackLines[i]);
	        if (result) {
	            firstFileName = result.fileName;
	            firstIndex = result.line;
	            break;
	        }
	    }
	    for (var i = 0; i < lastStackLines.length; ++i) {
	        var result = parseLineInfo(lastStackLines[i]);
	        if (result) {
	            lastFileName = result.fileName;
	            lastIndex = result.line;
	            break;
	        }
	    }
	    if (firstIndex < 0 || lastIndex < 0 || !firstFileName || !lastFileName ||
	        firstFileName !== lastFileName || firstIndex >= lastIndex) {
	        return;
	    }

	    shouldIgnore = function(line) {
	        if (bluebirdFramePattern.test(line)) return true;
	        var info = parseLineInfo(line);
	        if (info) {
	            if (info.fileName === firstFileName &&
	                (firstIndex <= info.line && info.line <= lastIndex)) {
	                return true;
	            }
	        }
	        return false;
	    };
	}

	function CapturedTrace(parent) {
	    this._parent = parent;
	    this._promisesCreated = 0;
	    var length = this._length = 1 + (parent === undefined ? 0 : parent._length);
	    captureStackTrace(this, CapturedTrace);
	    if (length > 32) this.uncycle();
	}
	util.inherits(CapturedTrace, Error);
	Context.CapturedTrace = CapturedTrace;

	CapturedTrace.prototype.uncycle = function() {
	    var length = this._length;
	    if (length < 2) return;
	    var nodes = [];
	    var stackToIndex = {};

	    for (var i = 0, node = this; node !== undefined; ++i) {
	        nodes.push(node);
	        node = node._parent;
	    }
	    length = this._length = i;
	    for (var i = length - 1; i >= 0; --i) {
	        var stack = nodes[i].stack;
	        if (stackToIndex[stack] === undefined) {
	            stackToIndex[stack] = i;
	        }
	    }
	    for (var i = 0; i < length; ++i) {
	        var currentStack = nodes[i].stack;
	        var index = stackToIndex[currentStack];
	        if (index !== undefined && index !== i) {
	            if (index > 0) {
	                nodes[index - 1]._parent = undefined;
	                nodes[index - 1]._length = 1;
	            }
	            nodes[i]._parent = undefined;
	            nodes[i]._length = 1;
	            var cycleEdgeNode = i > 0 ? nodes[i - 1] : this;

	            if (index < length - 1) {
	                cycleEdgeNode._parent = nodes[index + 1];
	                cycleEdgeNode._parent.uncycle();
	                cycleEdgeNode._length =
	                    cycleEdgeNode._parent._length + 1;
	            } else {
	                cycleEdgeNode._parent = undefined;
	                cycleEdgeNode._length = 1;
	            }
	            var currentChildLength = cycleEdgeNode._length + 1;
	            for (var j = i - 2; j >= 0; --j) {
	                nodes[j]._length = currentChildLength;
	                currentChildLength++;
	            }
	            return;
	        }
	    }
	};

	CapturedTrace.prototype.attachExtraTrace = function(error) {
	    if (error.__stackCleaned__) return;
	    this.uncycle();
	    var parsed = parseStackAndMessage(error);
	    var message = parsed.message;
	    var stacks = [parsed.stack];

	    var trace = this;
	    while (trace !== undefined) {
	        stacks.push(cleanStack(trace.stack.split("\n")));
	        trace = trace._parent;
	    }
	    removeCommonRoots(stacks);
	    removeDuplicateOrEmptyJumps(stacks);
	    util.notEnumerableProp(error, "stack", reconstructStack(message, stacks));
	    util.notEnumerableProp(error, "__stackCleaned__", true);
	};

	var captureStackTrace = (function stackDetection() {
	    var v8stackFramePattern = /^\s*at\s*/;
	    var v8stackFormatter = function(stack, error) {
	        if (typeof stack === "string") return stack;

	        if (error.name !== undefined &&
	            error.message !== undefined) {
	            return error.toString();
	        }
	        return formatNonError(error);
	    };

	    if (typeof Error.stackTraceLimit === "number" &&
	        typeof Error.captureStackTrace === "function") {
	        Error.stackTraceLimit += 6;
	        stackFramePattern = v8stackFramePattern;
	        formatStack = v8stackFormatter;
	        var captureStackTrace = Error.captureStackTrace;

	        shouldIgnore = function(line) {
	            return bluebirdFramePattern.test(line);
	        };
	        return function(receiver, ignoreUntil) {
	            Error.stackTraceLimit += 6;
	            captureStackTrace(receiver, ignoreUntil);
	            Error.stackTraceLimit -= 6;
	        };
	    }
	    var err = new Error();

	    if (typeof err.stack === "string" &&
	        err.stack.split("\n")[0].indexOf("stackDetection@") >= 0) {
	        stackFramePattern = /@/;
	        formatStack = v8stackFormatter;
	        indentStackFrames = true;
	        return function captureStackTrace(o) {
	            o.stack = new Error().stack;
	        };
	    }

	    var hasStackAfterThrow;
	    try { throw new Error(); }
	    catch(e) {
	        hasStackAfterThrow = ("stack" in e);
	    }
	    if (!("stack" in err) && hasStackAfterThrow &&
	        typeof Error.stackTraceLimit === "number") {
	        stackFramePattern = v8stackFramePattern;
	        formatStack = v8stackFormatter;
	        return function captureStackTrace(o) {
	            Error.stackTraceLimit += 6;
	            try { throw new Error(); }
	            catch(e) { o.stack = e.stack; }
	            Error.stackTraceLimit -= 6;
	        };
	    }

	    formatStack = function(stack, error) {
	        if (typeof stack === "string") return stack;

	        if ((typeof error === "object" ||
	            typeof error === "function") &&
	            error.name !== undefined &&
	            error.message !== undefined) {
	            return error.toString();
	        }
	        return formatNonError(error);
	    };

	    return null;

	})([]);

	if (typeof console !== "undefined" && typeof console.warn !== "undefined") {
	    printWarning = function (message) {
	        console.warn(message);
	    };
	    if (util.isNode && process.stderr.isTTY) {
	        printWarning = function(message, isSoft) {
	            var color = isSoft ? "\u001b[33m" : "\u001b[31m";
	            console.warn(color + message + "\u001b[0m\n");
	        };
	    } else if (!util.isNode && typeof (new Error().stack) === "string") {
	        printWarning = function(message, isSoft) {
	            console.warn("%c" + message,
	                        isSoft ? "color: darkorange" : "color: red");
	        };
	    }
	}

	var config = {
	    warnings: warnings,
	    longStackTraces: false,
	    cancellation: false,
	    monitoring: false
	};

	if (longStackTraces) Promise.longStackTraces();

	return {
	    longStackTraces: function() {
	        return config.longStackTraces;
	    },
	    warnings: function() {
	        return config.warnings;
	    },
	    cancellation: function() {
	        return config.cancellation;
	    },
	    monitoring: function() {
	        return config.monitoring;
	    },
	    propagateFromFunction: function() {
	        return propagateFromFunction;
	    },
	    boundValueFunction: function() {
	        return boundValueFunction;
	    },
	    checkForgottenReturns: checkForgottenReturns,
	    setBounds: setBounds,
	    warn: warn,
	    deprecated: deprecated,
	    CapturedTrace: CapturedTrace,
	    fireDomEvent: fireDomEvent,
	    fireGlobalEvent: fireGlobalEvent
	};
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise, tryConvertToPromise) {
	var util = __webpack_require__(5);
	var CancellationError = Promise.CancellationError;
	var errorObj = util.errorObj;

	function PassThroughHandlerContext(promise, type, handler) {
	    this.promise = promise;
	    this.type = type;
	    this.handler = handler;
	    this.called = false;
	    this.cancelPromise = null;
	}

	PassThroughHandlerContext.prototype.isFinallyHandler = function() {
	    return this.type === 0;
	};

	function FinallyHandlerCancelReaction(finallyHandler) {
	    this.finallyHandler = finallyHandler;
	}

	FinallyHandlerCancelReaction.prototype._resultCancelled = function() {
	    checkCancel(this.finallyHandler);
	};

	function checkCancel(ctx, reason) {
	    if (ctx.cancelPromise != null) {
	        if (arguments.length > 1) {
	            ctx.cancelPromise._reject(reason);
	        } else {
	            ctx.cancelPromise._cancel();
	        }
	        ctx.cancelPromise = null;
	        return true;
	    }
	    return false;
	}

	function succeed() {
	    return finallyHandler.call(this, this.promise._target()._settledValue());
	}
	function fail(reason) {
	    if (checkCancel(this, reason)) return;
	    errorObj.e = reason;
	    return errorObj;
	}
	function finallyHandler(reasonOrValue) {
	    var promise = this.promise;
	    var handler = this.handler;

	    if (!this.called) {
	        this.called = true;
	        var ret = this.isFinallyHandler()
	            ? handler.call(promise._boundValue())
	            : handler.call(promise._boundValue(), reasonOrValue);
	        if (ret !== undefined) {
	            promise._setReturnedNonUndefined();
	            var maybePromise = tryConvertToPromise(ret, promise);
	            if (maybePromise instanceof Promise) {
	                if (this.cancelPromise != null) {
	                    if (maybePromise.isCancelled()) {
	                        var reason =
	                            new CancellationError("late cancellation observer");
	                        promise._attachExtraTrace(reason);
	                        errorObj.e = reason;
	                        return errorObj;
	                    } else if (maybePromise.isPending()) {
	                        maybePromise._attachCancellationCallback(
	                            new FinallyHandlerCancelReaction(this));
	                    }
	                }
	                return maybePromise._then(
	                    succeed, fail, undefined, this, undefined);
	            }
	        }
	    }

	    if (promise.isRejected()) {
	        checkCancel(this);
	        errorObj.e = reasonOrValue;
	        return errorObj;
	    } else {
	        checkCancel(this);
	        return reasonOrValue;
	    }
	}

	Promise.prototype._passThrough = function(handler, type, success, fail) {
	    if (typeof handler !== "function") return this.then();
	    return this._then(success,
	                      fail,
	                      undefined,
	                      new PassThroughHandlerContext(this, type, handler),
	                      undefined);
	};

	Promise.prototype.lastly =
	Promise.prototype["finally"] = function (handler) {
	    return this._passThrough(handler,
	                             0,
	                             finallyHandler,
	                             finallyHandler);
	};

	Promise.prototype.tap = function (handler) {
	    return this._passThrough(handler, 1, finallyHandler);
	};

	return PassThroughHandlerContext;
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(NEXT_FILTER) {
	var util = __webpack_require__(5);
	var getKeys = __webpack_require__(6).keys;
	var tryCatch = util.tryCatch;
	var errorObj = util.errorObj;

	function catchFilter(instances, cb, promise) {
	    return function(e) {
	        var boundTo = promise._boundValue();
	        predicateLoop: for (var i = 0; i < instances.length; ++i) {
	            var item = instances[i];

	            if (item === Error ||
	                (item != null && item.prototype instanceof Error)) {
	                if (e instanceof item) {
	                    return tryCatch(cb).call(boundTo, e);
	                }
	            } else if (typeof item === "function") {
	                var matchesPredicate = tryCatch(item).call(boundTo, e);
	                if (matchesPredicate === errorObj) {
	                    return matchesPredicate;
	                } else if (matchesPredicate) {
	                    return tryCatch(cb).call(boundTo, e);
	                }
	            } else if (util.isObject(e)) {
	                var keys = getKeys(item);
	                for (var j = 0; j < keys.length; ++j) {
	                    var key = keys[j];
	                    if (item[key] != e[key]) {
	                        continue predicateLoop;
	                    }
	                }
	                return tryCatch(cb).call(boundTo, e);
	            }
	        }
	        return NEXT_FILTER;
	    };
	}

	return catchFilter;
	};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var util = __webpack_require__(5);
	var maybeWrapAsError = util.maybeWrapAsError;
	var errors = __webpack_require__(10);
	var OperationalError = errors.OperationalError;
	var es5 = __webpack_require__(6);

	function isUntypedError(obj) {
	    return obj instanceof Error &&
	        es5.getPrototypeOf(obj) === Error.prototype;
	}

	var rErrorKey = /^(?:name|message|stack|cause)$/;
	function wrapAsOperationalError(obj) {
	    var ret;
	    if (isUntypedError(obj)) {
	        ret = new OperationalError(obj);
	        ret.name = obj.name;
	        ret.message = obj.message;
	        ret.stack = obj.stack;
	        var keys = es5.keys(obj);
	        for (var i = 0; i < keys.length; ++i) {
	            var key = keys[i];
	            if (!rErrorKey.test(key)) {
	                ret[key] = obj[key];
	            }
	        }
	        return ret;
	    }
	    util.markAsOriginatingFromRejection(obj);
	    return obj;
	}

	function nodebackForPromise(promise, multiArgs) {
	    return function(err, value) {
	        if (promise === null) return;
	        if (err) {
	            var wrapped = wrapAsOperationalError(maybeWrapAsError(err));
	            promise._attachExtraTrace(wrapped);
	            promise._reject(wrapped);
	        } else if (!multiArgs) {
	            promise._fulfill(value);
	        } else {
	            var $_len = arguments.length;var args = new Array($_len - 1); for(var $_i = 1; $_i < $_len; ++$_i) {args[$_i - 1] = arguments[$_i];};
	            promise._fulfill(args);
	        }
	        promise = null;
	    };
	}

	module.exports = nodebackForPromise;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports =
	function(Promise, INTERNAL, tryConvertToPromise, apiRejection, debug) {
	var util = __webpack_require__(5);
	var tryCatch = util.tryCatch;

	Promise.method = function (fn) {
	    if (typeof fn !== "function") {
	        throw new Promise.TypeError("expecting a function but got " + util.classString(fn));
	    }
	    return function () {
	        var ret = new Promise(INTERNAL);
	        ret._captureStackTrace();
	        ret._pushContext();
	        var value = tryCatch(fn).apply(this, arguments);
	        var promiseCreated = ret._popContext();
	        debug.checkForgottenReturns(
	            value, promiseCreated, "Promise.method", ret);
	        ret._resolveFromSyncValue(value);
	        return ret;
	    };
	};

	Promise.attempt = Promise["try"] = function (fn) {
	    if (typeof fn !== "function") {
	        return apiRejection("expecting a function but got " + util.classString(fn));
	    }
	    var ret = new Promise(INTERNAL);
	    ret._captureStackTrace();
	    ret._pushContext();
	    var value;
	    if (arguments.length > 1) {
	        debug.deprecated("calling Promise.try with more than 1 argument");
	        var arg = arguments[1];
	        var ctx = arguments[2];
	        value = util.isArray(arg) ? tryCatch(fn).apply(ctx, arg)
	                                  : tryCatch(fn).call(ctx, arg);
	    } else {
	        value = tryCatch(fn)();
	    }
	    var promiseCreated = ret._popContext();
	    debug.checkForgottenReturns(
	        value, promiseCreated, "Promise.try", ret);
	    ret._resolveFromSyncValue(value);
	    return ret;
	};

	Promise.prototype._resolveFromSyncValue = function (value) {
	    if (value === util.errorObj) {
	        this._rejectCallback(value.e, false);
	    } else {
	        this._resolveCallback(value, true);
	    }
	};
	};


/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";
	module.exports = function(Promise, INTERNAL, tryConvertToPromise, debug) {
	var calledBind = false;
	var rejectThis = function(_, e) {
	    this._reject(e);
	};

	var targetRejected = function(e, context) {
	    context.promiseRejectionQueued = true;
	    context.bindingPromise._then(rejectThis, rejectThis, null, this, e);
	};

	var bindingResolved = function(thisArg, context) {
	    if (((this._bitField & 50397184) === 0)) {
	        this._resolveCallback(context.target);
	    }
	};

	var bindingRejected = function(e, context) {
	    if (!context.promiseRejectionQueued) this._reject(e);
	};

	Promise.prototype.bind = function (thisArg) {
	    if (!calledBind) {
	        calledBind = true;
	        Promise.prototype._propagateFrom = debug.propagateFromFunction();
	        Promise.prototype._boundValue = debug.boundValueFunction();
	    }
	    var maybePromise = tryConvertToPromise(thisArg);
	    var ret = new Promise(INTERNAL);
	    ret._propagateFrom(this, 1);
	    var target = this._target();
	    ret._setBoundTo(maybePromise);
	    if (maybePromise instanceof Promise) {
	        var context = {
	            promiseRejectionQueued: false,
	            promise: ret,
	            target: target,
	            bindingPromise: maybePromise
	        };
	        target._then(INTERNAL, targetRejected, undefined, ret, context);
	        maybePromise._then(
	            bindingResolved, bindingRejected, undefined, ret, context);
	        ret._setOnCancel(maybePromise);
	    } else {
	        ret._resolveCallback(target);
	    }
	    return ret;
	};

	Promise.prototype._setBoundTo = function (obj) {
	    if (obj !== undefined) {
	        this._bitField = this._bitField | 2097152;
	        this._boundTo = obj;
	    } else {
	        this._bitField = this._bitField & (~2097152);
	    }
	};

	Promise.prototype._isBound = function () {
	    return (this._bitField & 2097152) === 2097152;
	};

	Promise.bind = function (thisArg, value) {
	    return Promise.resolve(value).bind(thisArg);
	};
	};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise, PromiseArray, apiRejection, debug) {
	var util = __webpack_require__(5);
	var tryCatch = util.tryCatch;
	var errorObj = util.errorObj;
	var async = Promise._async;

	Promise.prototype["break"] = Promise.prototype.cancel = function() {
	    if (!debug.cancellation()) return this._warn("cancellation is disabled");

	    var promise = this;
	    var child = promise;
	    while (promise.isCancellable()) {
	        if (!promise._cancelBy(child)) {
	            if (child._isFollowing()) {
	                child._followee().cancel();
	            } else {
	                child._cancelBranched();
	            }
	            break;
	        }

	        var parent = promise._cancellationParent;
	        if (parent == null || !parent.isCancellable()) {
	            if (promise._isFollowing()) {
	                promise._followee().cancel();
	            } else {
	                promise._cancelBranched();
	            }
	            break;
	        } else {
	            if (promise._isFollowing()) promise._followee().cancel();
	            child = promise;
	            promise = parent;
	        }
	    }
	};

	Promise.prototype._branchHasCancelled = function() {
	    this._branchesRemainingToCancel--;
	};

	Promise.prototype._enoughBranchesHaveCancelled = function() {
	    return this._branchesRemainingToCancel === undefined ||
	           this._branchesRemainingToCancel <= 0;
	};

	Promise.prototype._cancelBy = function(canceller) {
	    if (canceller === this) {
	        this._branchesRemainingToCancel = 0;
	        this._invokeOnCancel();
	        return true;
	    } else {
	        this._branchHasCancelled();
	        if (this._enoughBranchesHaveCancelled()) {
	            this._invokeOnCancel();
	            return true;
	        }
	    }
	    return false;
	};

	Promise.prototype._cancelBranched = function() {
	    if (this._enoughBranchesHaveCancelled()) {
	        this._cancel();
	    }
	};

	Promise.prototype._cancel = function() {
	    if (!this.isCancellable()) return;

	    this._setCancelled();
	    async.invoke(this._cancelPromises, this, undefined);
	};

	Promise.prototype._cancelPromises = function() {
	    if (this._length() > 0) this._settlePromises();
	};

	Promise.prototype._unsetOnCancel = function() {
	    this._onCancelField = undefined;
	};

	Promise.prototype.isCancellable = function() {
	    return this.isPending() && !this.isCancelled();
	};

	Promise.prototype._doInvokeOnCancel = function(onCancelCallback, internalOnly) {
	    if (util.isArray(onCancelCallback)) {
	        for (var i = 0; i < onCancelCallback.length; ++i) {
	            this._doInvokeOnCancel(onCancelCallback[i], internalOnly);
	        }
	    } else if (onCancelCallback !== undefined) {
	        if (typeof onCancelCallback === "function") {
	            if (!internalOnly) {
	                var e = tryCatch(onCancelCallback).call(this._boundValue());
	                if (e === errorObj) {
	                    this._attachExtraTrace(e.e);
	                    async.throwLater(e.e);
	                }
	            }
	        } else {
	            onCancelCallback._resultCancelled(this);
	        }
	    }
	};

	Promise.prototype._invokeOnCancel = function() {
	    var onCancelCallback = this._onCancel();
	    this._unsetOnCancel();
	    async.invoke(this._doInvokeOnCancel, this, onCancelCallback);
	};

	Promise.prototype._invokeInternalOnCancel = function() {
	    if (this.isCancellable()) {
	        this._doInvokeOnCancel(this._onCancel(), true);
	        this._unsetOnCancel();
	    }
	};

	Promise.prototype._resultCancelled = function() {
	    this.cancel();
	};

	};


/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";
	module.exports = function(Promise) {
	function returner() {
	    return this.value;
	}
	function thrower() {
	    throw this.reason;
	}

	Promise.prototype["return"] =
	Promise.prototype.thenReturn = function (value) {
	    if (value instanceof Promise) value.suppressUnhandledRejections();
	    return this._then(
	        returner, undefined, undefined, {value: value}, undefined);
	};

	Promise.prototype["throw"] =
	Promise.prototype.thenThrow = function (reason) {
	    return this._then(
	        thrower, undefined, undefined, {reason: reason}, undefined);
	};

	Promise.prototype.catchThrow = function (reason) {
	    if (arguments.length <= 1) {
	        return this._then(
	            undefined, thrower, undefined, {reason: reason}, undefined);
	    } else {
	        var _reason = arguments[1];
	        var handler = function() {throw _reason;};
	        return this.caught(reason, handler);
	    }
	};

	Promise.prototype.catchReturn = function (value) {
	    if (arguments.length <= 1) {
	        if (value instanceof Promise) value.suppressUnhandledRejections();
	        return this._then(
	            undefined, returner, undefined, {value: value}, undefined);
	    } else {
	        var _value = arguments[1];
	        if (_value instanceof Promise) _value.suppressUnhandledRejections();
	        var handler = function() {return _value;};
	        return this.caught(value, handler);
	    }
	};
	};


/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";
	module.exports = function(Promise) {
	function PromiseInspection(promise) {
	    if (promise !== undefined) {
	        promise = promise._target();
	        this._bitField = promise._bitField;
	        this._settledValueField = promise._isFateSealed()
	            ? promise._settledValue() : undefined;
	    }
	    else {
	        this._bitField = 0;
	        this._settledValueField = undefined;
	    }
	}

	PromiseInspection.prototype._settledValue = function() {
	    return this._settledValueField;
	};

	var value = PromiseInspection.prototype.value = function () {
	    if (!this.isFulfilled()) {
	        throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	    return this._settledValue();
	};

	var reason = PromiseInspection.prototype.error =
	PromiseInspection.prototype.reason = function () {
	    if (!this.isRejected()) {
	        throw new TypeError("cannot get rejection reason of a non-rejected promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	    return this._settledValue();
	};

	var isFulfilled = PromiseInspection.prototype.isFulfilled = function() {
	    return (this._bitField & 33554432) !== 0;
	};

	var isRejected = PromiseInspection.prototype.isRejected = function () {
	    return (this._bitField & 16777216) !== 0;
	};

	var isPending = PromiseInspection.prototype.isPending = function () {
	    return (this._bitField & 50397184) === 0;
	};

	var isResolved = PromiseInspection.prototype.isResolved = function () {
	    return (this._bitField & 50331648) !== 0;
	};

	PromiseInspection.prototype.isCancelled =
	Promise.prototype._isCancelled = function() {
	    return (this._bitField & 65536) === 65536;
	};

	Promise.prototype.isCancelled = function() {
	    return this._target()._isCancelled();
	};

	Promise.prototype.isPending = function() {
	    return isPending.call(this._target());
	};

	Promise.prototype.isRejected = function() {
	    return isRejected.call(this._target());
	};

	Promise.prototype.isFulfilled = function() {
	    return isFulfilled.call(this._target());
	};

	Promise.prototype.isResolved = function() {
	    return isResolved.call(this._target());
	};

	Promise.prototype.value = function() {
	    return value.call(this._target());
	};

	Promise.prototype.reason = function() {
	    var target = this._target();
	    target._unsetRejectionIsUnhandled();
	    return reason.call(target);
	};

	Promise.prototype._value = function() {
	    return this._settledValue();
	};

	Promise.prototype._reason = function() {
	    this._unsetRejectionIsUnhandled();
	    return this._settledValue();
	};

	Promise.PromiseInspection = PromiseInspection;
	};


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports =
	function(Promise, PromiseArray, tryConvertToPromise, INTERNAL) {
	var util = __webpack_require__(5);
	var canEvaluate = util.canEvaluate;
	var tryCatch = util.tryCatch;
	var errorObj = util.errorObj;
	var reject;

	if (true) {
	if (canEvaluate) {
	    var thenCallback = function(i) {
	        return new Function("value", "holder", "                             \n\
	            'use strict';                                                    \n\
	            holder.pIndex = value;                                           \n\
	            holder.checkFulfillment(this);                                   \n\
	            ".replace(/Index/g, i));
	    };

	    var promiseSetter = function(i) {
	        return new Function("promise", "holder", "                           \n\
	            'use strict';                                                    \n\
	            holder.pIndex = promise;                                         \n\
	            ".replace(/Index/g, i));
	    };

	    var generateHolderClass = function(total) {
	        var props = new Array(total);
	        for (var i = 0; i < props.length; ++i) {
	            props[i] = "this.p" + (i+1);
	        }
	        var assignment = props.join(" = ") + " = null;";
	        var cancellationCode= "var promise;\n" + props.map(function(prop) {
	            return "                                                         \n\
	                promise = " + prop + ";                                      \n\
	                if (promise instanceof Promise) {                            \n\
	                    promise.cancel();                                        \n\
	                }                                                            \n\
	            ";
	        }).join("\n");
	        var passedArguments = props.join(", ");
	        var name = "Holder$" + total;


	        var code = "return function(tryCatch, errorObj, Promise) {           \n\
	            'use strict';                                                    \n\
	            function [TheName](fn) {                                         \n\
	                [TheProperties]                                              \n\
	                this.fn = fn;                                                \n\
	                this.now = 0;                                                \n\
	            }                                                                \n\
	            [TheName].prototype.checkFulfillment = function(promise) {       \n\
	                var now = ++this.now;                                        \n\
	                if (now === [TheTotal]) {                                    \n\
	                    promise._pushContext();                                  \n\
	                    var callback = this.fn;                                  \n\
	                    var ret = tryCatch(callback)([ThePassedArguments]);      \n\
	                    promise._popContext();                                   \n\
	                    if (ret === errorObj) {                                  \n\
	                        promise._rejectCallback(ret.e, false);               \n\
	                    } else {                                                 \n\
	                        promise._resolveCallback(ret);                       \n\
	                    }                                                        \n\
	                }                                                            \n\
	            };                                                               \n\
	                                                                             \n\
	            [TheName].prototype._resultCancelled = function() {              \n\
	                [CancellationCode]                                           \n\
	            };                                                               \n\
	                                                                             \n\
	            return [TheName];                                                \n\
	        }(tryCatch, errorObj, Promise);                                      \n\
	        ";

	        code = code.replace(/\[TheName\]/g, name)
	            .replace(/\[TheTotal\]/g, total)
	            .replace(/\[ThePassedArguments\]/g, passedArguments)
	            .replace(/\[TheProperties\]/g, assignment)
	            .replace(/\[CancellationCode\]/g, cancellationCode);

	        return new Function("tryCatch", "errorObj", "Promise", code)
	                           (tryCatch, errorObj, Promise);
	    };

	    var holderClasses = [];
	    var thenCallbacks = [];
	    var promiseSetters = [];

	    for (var i = 0; i < 8; ++i) {
	        holderClasses.push(generateHolderClass(i + 1));
	        thenCallbacks.push(thenCallback(i + 1));
	        promiseSetters.push(promiseSetter(i + 1));
	    }

	    reject = function (reason) {
	        this._reject(reason);
	    };
	}}

	Promise.join = function () {
	    var last = arguments.length - 1;
	    var fn;
	    if (last > 0 && typeof arguments[last] === "function") {
	        fn = arguments[last];
	        if (true) {
	            if (last <= 8 && canEvaluate) {
	                var ret = new Promise(INTERNAL);
	                ret._captureStackTrace();
	                var HolderClass = holderClasses[last - 1];
	                var holder = new HolderClass(fn);
	                var callbacks = thenCallbacks;

	                for (var i = 0; i < last; ++i) {
	                    var maybePromise = tryConvertToPromise(arguments[i], ret);
	                    if (maybePromise instanceof Promise) {
	                        maybePromise = maybePromise._target();
	                        var bitField = maybePromise._bitField;
	                        ;
	                        if (((bitField & 50397184) === 0)) {
	                            maybePromise._then(callbacks[i], reject,
	                                               undefined, ret, holder);
	                            promiseSetters[i](maybePromise, holder);
	                        } else if (((bitField & 33554432) !== 0)) {
	                            callbacks[i].call(ret,
	                                              maybePromise._value(), holder);
	                        } else if (((bitField & 16777216) !== 0)) {
	                            ret._reject(maybePromise._reason());
	                        } else {
	                            ret._cancel();
	                        }
	                    } else {
	                        callbacks[i].call(ret, maybePromise, holder);
	                    }
	                }
	                if (!ret._isFateSealed()) {
	                    ret._setAsyncGuaranteed();
	                    ret._setOnCancel(holder);
	                }
	                return ret;
	            }
	        }
	    }
	    var $_len = arguments.length;var args = new Array($_len); for(var $_i = 0; $_i < $_len; ++$_i) {args[$_i] = arguments[$_i];};
	    if (fn) args.pop();
	    var ret = new PromiseArray(args).promise();
	    return fn !== undefined ? ret.spread(fn) : ret;
	};

	};


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise,
	                          PromiseArray,
	                          apiRejection,
	                          tryConvertToPromise,
	                          INTERNAL,
	                          debug) {
	var getDomain = Promise._getDomain;
	var util = __webpack_require__(5);
	var tryCatch = util.tryCatch;
	var errorObj = util.errorObj;
	var EMPTY_ARRAY = [];

	function MappingPromiseArray(promises, fn, limit, _filter) {
	    this.constructor$(promises);
	    this._promise._captureStackTrace();
	    var domain = getDomain();
	    this._callback = domain === null ? fn : domain.bind(fn);
	    this._preservedValues = _filter === INTERNAL
	        ? new Array(this.length())
	        : null;
	    this._limit = limit;
	    this._inFlight = 0;
	    this._queue = limit >= 1 ? [] : EMPTY_ARRAY;
	    this._init$(undefined, -2);
	}
	util.inherits(MappingPromiseArray, PromiseArray);

	MappingPromiseArray.prototype._init = function () {};

	MappingPromiseArray.prototype._promiseFulfilled = function (value, index) {
	    var values = this._values;
	    var length = this.length();
	    var preservedValues = this._preservedValues;
	    var limit = this._limit;

	    if (index < 0) {
	        index = (index * -1) - 1;
	        values[index] = value;
	        if (limit >= 1) {
	            this._inFlight--;
	            this._drainQueue();
	            if (this._isResolved()) return true;
	        }
	    } else {
	        if (limit >= 1 && this._inFlight >= limit) {
	            values[index] = value;
	            this._queue.push(index);
	            return false;
	        }
	        if (preservedValues !== null) preservedValues[index] = value;

	        var promise = this._promise;
	        var callback = this._callback;
	        var receiver = promise._boundValue();
	        promise._pushContext();
	        var ret = tryCatch(callback).call(receiver, value, index, length);
	        var promiseCreated = promise._popContext();
	        debug.checkForgottenReturns(
	            ret,
	            promiseCreated,
	            preservedValues !== null ? "Promise.filter" : "Promise.map",
	            promise
	        );
	        if (ret === errorObj) {
	            this._reject(ret.e);
	            return true;
	        }

	        var maybePromise = tryConvertToPromise(ret, this._promise);
	        if (maybePromise instanceof Promise) {
	            maybePromise = maybePromise._target();
	            var bitField = maybePromise._bitField;
	            ;
	            if (((bitField & 50397184) === 0)) {
	                if (limit >= 1) this._inFlight++;
	                values[index] = maybePromise;
	                maybePromise._proxy(this, (index + 1) * -1);
	                return false;
	            } else if (((bitField & 33554432) !== 0)) {
	                ret = maybePromise._value();
	            } else if (((bitField & 16777216) !== 0)) {
	                this._reject(maybePromise._reason());
	                return true;
	            } else {
	                this._cancel();
	                return true;
	            }
	        }
	        values[index] = ret;
	    }
	    var totalResolved = ++this._totalResolved;
	    if (totalResolved >= length) {
	        if (preservedValues !== null) {
	            this._filter(values, preservedValues);
	        } else {
	            this._resolve(values);
	        }
	        return true;
	    }
	    return false;
	};

	MappingPromiseArray.prototype._drainQueue = function () {
	    var queue = this._queue;
	    var limit = this._limit;
	    var values = this._values;
	    while (queue.length > 0 && this._inFlight < limit) {
	        if (this._isResolved()) return;
	        var index = queue.pop();
	        this._promiseFulfilled(values[index], index);
	    }
	};

	MappingPromiseArray.prototype._filter = function (booleans, values) {
	    var len = values.length;
	    var ret = new Array(len);
	    var j = 0;
	    for (var i = 0; i < len; ++i) {
	        if (booleans[i]) ret[j++] = values[i];
	    }
	    ret.length = j;
	    this._resolve(ret);
	};

	MappingPromiseArray.prototype.preservedValues = function () {
	    return this._preservedValues;
	};

	function map(promises, fn, options, _filter) {
	    if (typeof fn !== "function") {
	        return apiRejection("expecting a function but got " + util.classString(fn));
	    }
	    var limit = typeof options === "object" && options !== null
	        ? options.concurrency
	        : 0;
	    limit = typeof limit === "number" &&
	        isFinite(limit) && limit >= 1 ? limit : 0;
	    return new MappingPromiseArray(promises, fn, limit, _filter).promise();
	}

	Promise.prototype.map = function (fn, options) {
	    return map(this, fn, options, null);
	};

	Promise.map = function (promises, fn, options, _filter) {
	    return map(promises, fn, options, _filter);
	};


	};


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function (Promise, apiRejection, tryConvertToPromise,
	    createContext, INTERNAL, debug) {
	    var util = __webpack_require__(5);
	    var TypeError = __webpack_require__(10).TypeError;
	    var inherits = __webpack_require__(5).inherits;
	    var errorObj = util.errorObj;
	    var tryCatch = util.tryCatch;

	    function thrower(e) {
	        setTimeout(function(){throw e;}, 0);
	    }

	    function castPreservingDisposable(thenable) {
	        var maybePromise = tryConvertToPromise(thenable);
	        if (maybePromise !== thenable &&
	            typeof thenable._isDisposable === "function" &&
	            typeof thenable._getDisposer === "function" &&
	            thenable._isDisposable()) {
	            maybePromise._setDisposable(thenable._getDisposer());
	        }
	        return maybePromise;
	    }
	    function dispose(resources, inspection) {
	        var i = 0;
	        var len = resources.length;
	        var ret = new Promise(INTERNAL);
	        function iterator() {
	            if (i >= len) return ret._fulfill();
	            var maybePromise = castPreservingDisposable(resources[i++]);
	            if (maybePromise instanceof Promise &&
	                maybePromise._isDisposable()) {
	                try {
	                    maybePromise = tryConvertToPromise(
	                        maybePromise._getDisposer().tryDispose(inspection),
	                        resources.promise);
	                } catch (e) {
	                    return thrower(e);
	                }
	                if (maybePromise instanceof Promise) {
	                    return maybePromise._then(iterator, thrower,
	                                              null, null, null);
	                }
	            }
	            iterator();
	        }
	        iterator();
	        return ret;
	    }

	    function Disposer(data, promise, context) {
	        this._data = data;
	        this._promise = promise;
	        this._context = context;
	    }

	    Disposer.prototype.data = function () {
	        return this._data;
	    };

	    Disposer.prototype.promise = function () {
	        return this._promise;
	    };

	    Disposer.prototype.resource = function () {
	        if (this.promise().isFulfilled()) {
	            return this.promise().value();
	        }
	        return null;
	    };

	    Disposer.prototype.tryDispose = function(inspection) {
	        var resource = this.resource();
	        var context = this._context;
	        if (context !== undefined) context._pushContext();
	        var ret = resource !== null
	            ? this.doDispose(resource, inspection) : null;
	        if (context !== undefined) context._popContext();
	        this._promise._unsetDisposable();
	        this._data = null;
	        return ret;
	    };

	    Disposer.isDisposer = function (d) {
	        return (d != null &&
	                typeof d.resource === "function" &&
	                typeof d.tryDispose === "function");
	    };

	    function FunctionDisposer(fn, promise, context) {
	        this.constructor$(fn, promise, context);
	    }
	    inherits(FunctionDisposer, Disposer);

	    FunctionDisposer.prototype.doDispose = function (resource, inspection) {
	        var fn = this.data();
	        return fn.call(resource, resource, inspection);
	    };

	    function maybeUnwrapDisposer(value) {
	        if (Disposer.isDisposer(value)) {
	            this.resources[this.index]._setDisposable(value);
	            return value.promise();
	        }
	        return value;
	    }

	    function ResourceList(length) {
	        this.length = length;
	        this.promise = null;
	        this[length-1] = null;
	    }

	    ResourceList.prototype._resultCancelled = function() {
	        var len = this.length;
	        for (var i = 0; i < len; ++i) {
	            var item = this[i];
	            if (item instanceof Promise) {
	                item.cancel();
	            }
	        }
	    };

	    Promise.using = function () {
	        var len = arguments.length;
	        if (len < 2) return apiRejection(
	                        "you must pass at least 2 arguments to Promise.using");
	        var fn = arguments[len - 1];
	        if (typeof fn !== "function") {
	            return apiRejection("expecting a function but got " + util.classString(fn));
	        }
	        var input;
	        var spreadArgs = true;
	        if (len === 2 && Array.isArray(arguments[0])) {
	            input = arguments[0];
	            len = input.length;
	            spreadArgs = false;
	        } else {
	            input = arguments;
	            len--;
	        }
	        var resources = new ResourceList(len);
	        for (var i = 0; i < len; ++i) {
	            var resource = input[i];
	            if (Disposer.isDisposer(resource)) {
	                var disposer = resource;
	                resource = resource.promise();
	                resource._setDisposable(disposer);
	            } else {
	                var maybePromise = tryConvertToPromise(resource);
	                if (maybePromise instanceof Promise) {
	                    resource =
	                        maybePromise._then(maybeUnwrapDisposer, null, null, {
	                            resources: resources,
	                            index: i
	                    }, undefined);
	                }
	            }
	            resources[i] = resource;
	        }

	        var reflectedResources = new Array(resources.length);
	        for (var i = 0; i < reflectedResources.length; ++i) {
	            reflectedResources[i] = Promise.resolve(resources[i]).reflect();
	        }

	        var resultPromise = Promise.all(reflectedResources)
	            .then(function(inspections) {
	                for (var i = 0; i < inspections.length; ++i) {
	                    var inspection = inspections[i];
	                    if (inspection.isRejected()) {
	                        errorObj.e = inspection.error();
	                        return errorObj;
	                    } else if (!inspection.isFulfilled()) {
	                        resultPromise.cancel();
	                        return;
	                    }
	                    inspections[i] = inspection.value();
	                }
	                promise._pushContext();

	                fn = tryCatch(fn);
	                var ret = spreadArgs
	                    ? fn.apply(undefined, inspections) : fn(inspections);
	                var promiseCreated = promise._popContext();
	                debug.checkForgottenReturns(
	                    ret, promiseCreated, "Promise.using", promise);
	                return ret;
	            });

	        var promise = resultPromise.lastly(function() {
	            var inspection = new Promise.PromiseInspection(resultPromise);
	            return dispose(resources, inspection);
	        });
	        resources.promise = promise;
	        promise._setOnCancel(resources);
	        return promise;
	    };

	    Promise.prototype._setDisposable = function (disposer) {
	        this._bitField = this._bitField | 131072;
	        this._disposer = disposer;
	    };

	    Promise.prototype._isDisposable = function () {
	        return (this._bitField & 131072) > 0;
	    };

	    Promise.prototype._getDisposer = function () {
	        return this._disposer;
	    };

	    Promise.prototype._unsetDisposable = function () {
	        this._bitField = this._bitField & (~131072);
	        this._disposer = undefined;
	    };

	    Promise.prototype.disposer = function (fn) {
	        if (typeof fn === "function") {
	            return new FunctionDisposer(fn, this, createContext());
	        }
	        throw new TypeError();
	    };

	};


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise, INTERNAL, debug) {
	var util = __webpack_require__(5);
	var TimeoutError = Promise.TimeoutError;

	function HandleWrapper(handle)  {
	    this.handle = handle;
	}

	HandleWrapper.prototype._resultCancelled = function() {
	    clearTimeout(this.handle);
	};

	var afterValue = function(value) { return delay(+this).thenReturn(value); };
	var delay = Promise.delay = function (ms, value) {
	    var ret;
	    var handle;
	    if (value !== undefined) {
	        ret = Promise.resolve(value)
	                ._then(afterValue, null, null, ms, undefined);
	        if (debug.cancellation() && value instanceof Promise) {
	            ret._setOnCancel(value);
	        }
	    } else {
	        ret = new Promise(INTERNAL);
	        handle = setTimeout(function() { ret._fulfill(); }, +ms);
	        if (debug.cancellation()) {
	            ret._setOnCancel(new HandleWrapper(handle));
	        }
	    }
	    ret._setAsyncGuaranteed();
	    return ret;
	};

	Promise.prototype.delay = function (ms) {
	    return delay(ms, this);
	};

	var afterTimeout = function (promise, message, parent) {
	    var err;
	    if (typeof message !== "string") {
	        if (message instanceof Error) {
	            err = message;
	        } else {
	            err = new TimeoutError("operation timed out");
	        }
	    } else {
	        err = new TimeoutError(message);
	    }
	    util.markAsOriginatingFromRejection(err);
	    promise._attachExtraTrace(err);
	    promise._reject(err);

	    if (parent != null) {
	        parent.cancel();
	    }
	};

	function successClear(value) {
	    clearTimeout(this.handle);
	    return value;
	}

	function failureClear(reason) {
	    clearTimeout(this.handle);
	    throw reason;
	}

	Promise.prototype.timeout = function (ms, message) {
	    ms = +ms;
	    var ret, parent;

	    var handleWrapper = new HandleWrapper(setTimeout(function timeoutTimeout() {
	        if (ret.isPending()) {
	            afterTimeout(ret, message, parent);
	        }
	    }, ms));

	    if (debug.cancellation()) {
	        parent = this.then();
	        ret = parent._then(successClear, failureClear,
	                            undefined, handleWrapper, undefined);
	        ret._setOnCancel(handleWrapper);
	    } else {
	        ret = this._then(successClear, failureClear,
	                            undefined, handleWrapper, undefined);
	    }

	    return ret;
	};

	};


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise,
	                          apiRejection,
	                          INTERNAL,
	                          tryConvertToPromise,
	                          Proxyable,
	                          debug) {
	var errors = __webpack_require__(10);
	var TypeError = errors.TypeError;
	var util = __webpack_require__(5);
	var errorObj = util.errorObj;
	var tryCatch = util.tryCatch;
	var yieldHandlers = [];

	function promiseFromYieldHandler(value, yieldHandlers, traceParent) {
	    for (var i = 0; i < yieldHandlers.length; ++i) {
	        traceParent._pushContext();
	        var result = tryCatch(yieldHandlers[i])(value);
	        traceParent._popContext();
	        if (result === errorObj) {
	            traceParent._pushContext();
	            var ret = Promise.reject(errorObj.e);
	            traceParent._popContext();
	            return ret;
	        }
	        var maybePromise = tryConvertToPromise(result, traceParent);
	        if (maybePromise instanceof Promise) return maybePromise;
	    }
	    return null;
	}

	function PromiseSpawn(generatorFunction, receiver, yieldHandler, stack) {
	    var promise = this._promise = new Promise(INTERNAL);
	    promise._captureStackTrace();
	    promise._setOnCancel(this);
	    this._stack = stack;
	    this._generatorFunction = generatorFunction;
	    this._receiver = receiver;
	    this._generator = undefined;
	    this._yieldHandlers = typeof yieldHandler === "function"
	        ? [yieldHandler].concat(yieldHandlers)
	        : yieldHandlers;
	    this._yieldedPromise = null;
	}
	util.inherits(PromiseSpawn, Proxyable);

	PromiseSpawn.prototype._isResolved = function() {
	    return this._promise === null;
	};

	PromiseSpawn.prototype._cleanup = function() {
	    this._promise = this._generator = null;
	};

	PromiseSpawn.prototype._promiseCancelled = function() {
	    if (this._isResolved()) return;
	    var implementsReturn = typeof this._generator["return"] !== "undefined";

	    var result;
	    if (!implementsReturn) {
	        var reason = new Promise.CancellationError(
	            "generator .return() sentinel");
	        Promise.coroutine.returnSentinel = reason;
	        this._promise._attachExtraTrace(reason);
	        this._promise._pushContext();
	        result = tryCatch(this._generator["throw"]).call(this._generator,
	                                                         reason);
	        this._promise._popContext();
	        if (result === errorObj && result.e === reason) {
	            result = null;
	        }
	    } else {
	        this._promise._pushContext();
	        result = tryCatch(this._generator["return"]).call(this._generator,
	                                                          undefined);
	        this._promise._popContext();
	    }
	    var promise = this._promise;
	    this._cleanup();
	    if (result === errorObj) {
	        promise._rejectCallback(result.e, false);
	    } else {
	        promise.cancel();
	    }
	};

	PromiseSpawn.prototype._promiseFulfilled = function(value) {
	    this._yieldedPromise = null;
	    this._promise._pushContext();
	    var result = tryCatch(this._generator.next).call(this._generator, value);
	    this._promise._popContext();
	    this._continue(result);
	};

	PromiseSpawn.prototype._promiseRejected = function(reason) {
	    this._yieldedPromise = null;
	    this._promise._attachExtraTrace(reason);
	    this._promise._pushContext();
	    var result = tryCatch(this._generator["throw"])
	        .call(this._generator, reason);
	    this._promise._popContext();
	    this._continue(result);
	};

	PromiseSpawn.prototype._resultCancelled = function() {
	    if (this._yieldedPromise instanceof Promise) {
	        var promise = this._yieldedPromise;
	        this._yieldedPromise = null;
	        this._promiseCancelled();
	        promise.cancel();
	    }
	};

	PromiseSpawn.prototype.promise = function () {
	    return this._promise;
	};

	PromiseSpawn.prototype._run = function () {
	    this._generator = this._generatorFunction.call(this._receiver);
	    this._receiver =
	        this._generatorFunction = undefined;
	    this._promiseFulfilled(undefined);
	};

	PromiseSpawn.prototype._continue = function (result) {
	    var promise = this._promise;
	    if (result === errorObj) {
	        this._cleanup();
	        return promise._rejectCallback(result.e, false);
	    }

	    var value = result.value;
	    if (result.done === true) {
	        this._cleanup();
	        return promise._resolveCallback(value);
	    } else {
	        var maybePromise = tryConvertToPromise(value, this._promise);
	        if (!(maybePromise instanceof Promise)) {
	            maybePromise =
	                promiseFromYieldHandler(maybePromise,
	                                        this._yieldHandlers,
	                                        this._promise);
	            if (maybePromise === null) {
	                this._promiseRejected(
	                    new TypeError(
	                        "A value %s was yielded that could not be treated as a promise\u000a\u000a    See http://goo.gl/MqrFmX\u000a\u000a".replace("%s", value) +
	                        "From coroutine:\u000a" +
	                        this._stack.split("\n").slice(1, -7).join("\n")
	                    )
	                );
	                return;
	            }
	        }
	        maybePromise = maybePromise._target();
	        var bitField = maybePromise._bitField;
	        ;
	        if (((bitField & 50397184) === 0)) {
	            this._yieldedPromise = maybePromise;
	            maybePromise._proxy(this, null);
	        } else if (((bitField & 33554432) !== 0)) {
	            this._promiseFulfilled(maybePromise._value());
	        } else if (((bitField & 16777216) !== 0)) {
	            this._promiseRejected(maybePromise._reason());
	        } else {
	            this._promiseCancelled();
	        }
	    }
	};

	Promise.coroutine = function (generatorFunction, options) {
	    if (typeof generatorFunction !== "function") {
	        throw new TypeError("generatorFunction must be a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	    var yieldHandler = Object(options).yieldHandler;
	    var PromiseSpawn$ = PromiseSpawn;
	    var stack = new Error().stack;
	    return function () {
	        var generator = generatorFunction.apply(this, arguments);
	        var spawn = new PromiseSpawn$(undefined, undefined, yieldHandler,
	                                      stack);
	        var ret = spawn.promise();
	        spawn._generator = generator;
	        spawn._promiseFulfilled(undefined);
	        return ret;
	    };
	};

	Promise.coroutine.addYieldHandler = function(fn) {
	    if (typeof fn !== "function") {
	        throw new TypeError("expecting a function but got " + util.classString(fn));
	    }
	    yieldHandlers.push(fn);
	};

	Promise.spawn = function (generatorFunction) {
	    debug.deprecated("Promise.spawn()", "Promise.coroutine()");
	    if (typeof generatorFunction !== "function") {
	        return apiRejection("generatorFunction must be a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	    var spawn = new PromiseSpawn(generatorFunction, this);
	    var ret = spawn.promise();
	    spawn._run(Promise.spawn);
	    return ret;
	};
	};


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise) {
	var util = __webpack_require__(5);
	var async = Promise._async;
	var tryCatch = util.tryCatch;
	var errorObj = util.errorObj;

	function spreadAdapter(val, nodeback) {
	    var promise = this;
	    if (!util.isArray(val)) return successAdapter.call(promise, val, nodeback);
	    var ret =
	        tryCatch(nodeback).apply(promise._boundValue(), [null].concat(val));
	    if (ret === errorObj) {
	        async.throwLater(ret.e);
	    }
	}

	function successAdapter(val, nodeback) {
	    var promise = this;
	    var receiver = promise._boundValue();
	    var ret = val === undefined
	        ? tryCatch(nodeback).call(receiver, null)
	        : tryCatch(nodeback).call(receiver, null, val);
	    if (ret === errorObj) {
	        async.throwLater(ret.e);
	    }
	}
	function errorAdapter(reason, nodeback) {
	    var promise = this;
	    if (!reason) {
	        var newReason = new Error(reason + "");
	        newReason.cause = reason;
	        reason = newReason;
	    }
	    var ret = tryCatch(nodeback).call(promise._boundValue(), reason);
	    if (ret === errorObj) {
	        async.throwLater(ret.e);
	    }
	}

	Promise.prototype.asCallback = Promise.prototype.nodeify = function (nodeback,
	                                                                     options) {
	    if (typeof nodeback == "function") {
	        var adapter = successAdapter;
	        if (options !== undefined && Object(options).spread) {
	            adapter = spreadAdapter;
	        }
	        this._then(
	            adapter,
	            errorAdapter,
	            undefined,
	            this,
	            nodeback
	        );
	    }
	    return this;
	};
	};


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var cr = Object.create;
	if (cr) {
	    var callerCache = cr(null);
	    var getterCache = cr(null);
	    callerCache[" size"] = getterCache[" size"] = 0;
	}

	module.exports = function(Promise) {
	var util = __webpack_require__(5);
	var canEvaluate = util.canEvaluate;
	var isIdentifier = util.isIdentifier;

	var getMethodCaller;
	var getGetter;
	if (true) {
	var makeMethodCaller = function (methodName) {
	    return new Function("ensureMethod", "                                    \n\
	        return function(obj) {                                               \n\
	            'use strict'                                                     \n\
	            var len = this.length;                                           \n\
	            ensureMethod(obj, 'methodName');                                 \n\
	            switch(len) {                                                    \n\
	                case 1: return obj.methodName(this[0]);                      \n\
	                case 2: return obj.methodName(this[0], this[1]);             \n\
	                case 3: return obj.methodName(this[0], this[1], this[2]);    \n\
	                case 0: return obj.methodName();                             \n\
	                default:                                                     \n\
	                    return obj.methodName.apply(obj, this);                  \n\
	            }                                                                \n\
	        };                                                                   \n\
	        ".replace(/methodName/g, methodName))(ensureMethod);
	};

	var makeGetter = function (propertyName) {
	    return new Function("obj", "                                             \n\
	        'use strict';                                                        \n\
	        return obj.propertyName;                                             \n\
	        ".replace("propertyName", propertyName));
	};

	var getCompiled = function(name, compiler, cache) {
	    var ret = cache[name];
	    if (typeof ret !== "function") {
	        if (!isIdentifier(name)) {
	            return null;
	        }
	        ret = compiler(name);
	        cache[name] = ret;
	        cache[" size"]++;
	        if (cache[" size"] > 512) {
	            var keys = Object.keys(cache);
	            for (var i = 0; i < 256; ++i) delete cache[keys[i]];
	            cache[" size"] = keys.length - 256;
	        }
	    }
	    return ret;
	};

	getMethodCaller = function(name) {
	    return getCompiled(name, makeMethodCaller, callerCache);
	};

	getGetter = function(name) {
	    return getCompiled(name, makeGetter, getterCache);
	};
	}

	function ensureMethod(obj, methodName) {
	    var fn;
	    if (obj != null) fn = obj[methodName];
	    if (typeof fn !== "function") {
	        var message = "Object " + util.classString(obj) + " has no method '" +
	            util.toString(methodName) + "'";
	        throw new Promise.TypeError(message);
	    }
	    return fn;
	}

	function caller(obj) {
	    var methodName = this.pop();
	    var fn = ensureMethod(obj, methodName);
	    return fn.apply(obj, this);
	}
	Promise.prototype.call = function (methodName) {
	    var $_len = arguments.length;var args = new Array($_len - 1); for(var $_i = 1; $_i < $_len; ++$_i) {args[$_i - 1] = arguments[$_i];};
	    if (true) {
	        if (canEvaluate) {
	            var maybeCaller = getMethodCaller(methodName);
	            if (maybeCaller !== null) {
	                return this._then(
	                    maybeCaller, undefined, undefined, args, undefined);
	            }
	        }
	    }
	    args.push(methodName);
	    return this._then(caller, undefined, undefined, args, undefined);
	};

	function namedGetter(obj) {
	    return obj[this];
	}
	function indexedGetter(obj) {
	    var index = +this;
	    if (index < 0) index = Math.max(0, index + obj.length);
	    return obj[index];
	}
	Promise.prototype.get = function (propertyName) {
	    var isIndex = (typeof propertyName === "number");
	    var getter;
	    if (!isIndex) {
	        if (canEvaluate) {
	            var maybeGetter = getGetter(propertyName);
	            getter = maybeGetter !== null ? maybeGetter : namedGetter;
	        } else {
	            getter = namedGetter;
	        }
	    } else {
	        getter = indexedGetter;
	    }
	    return this._then(getter, undefined, undefined, propertyName, undefined);
	};
	};


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(
	    Promise, PromiseArray, tryConvertToPromise, apiRejection) {
	var util = __webpack_require__(5);
	var isObject = util.isObject;
	var es5 = __webpack_require__(6);
	var Es6Map;
	if (typeof Map === "function") Es6Map = Map;

	var mapToEntries = (function() {
	    var index = 0;
	    var size = 0;

	    function extractEntry(value, key) {
	        this[index] = value;
	        this[index + size] = key;
	        index++;
	    }

	    return function mapToEntries(map) {
	        size = map.size;
	        index = 0;
	        var ret = new Array(map.size * 2);
	        map.forEach(extractEntry, ret);
	        return ret;
	    };
	})();

	var entriesToMap = function(entries) {
	    var ret = new Es6Map();
	    var length = entries.length / 2 | 0;
	    for (var i = 0; i < length; ++i) {
	        var key = entries[length + i];
	        var value = entries[i];
	        ret.set(key, value);
	    }
	    return ret;
	};

	function PropertiesPromiseArray(obj) {
	    var isMap = false;
	    var entries;
	    if (Es6Map !== undefined && obj instanceof Es6Map) {
	        entries = mapToEntries(obj);
	        isMap = true;
	    } else {
	        var keys = es5.keys(obj);
	        var len = keys.length;
	        entries = new Array(len * 2);
	        for (var i = 0; i < len; ++i) {
	            var key = keys[i];
	            entries[i] = obj[key];
	            entries[i + len] = key;
	        }
	    }
	    this.constructor$(entries);
	    this._isMap = isMap;
	    this._init$(undefined, -3);
	}
	util.inherits(PropertiesPromiseArray, PromiseArray);

	PropertiesPromiseArray.prototype._init = function () {};

	PropertiesPromiseArray.prototype._promiseFulfilled = function (value, index) {
	    this._values[index] = value;
	    var totalResolved = ++this._totalResolved;
	    if (totalResolved >= this._length) {
	        var val;
	        if (this._isMap) {
	            val = entriesToMap(this._values);
	        } else {
	            val = {};
	            var keyOffset = this.length();
	            for (var i = 0, len = this.length(); i < len; ++i) {
	                val[this._values[i + keyOffset]] = this._values[i];
	            }
	        }
	        this._resolve(val);
	        return true;
	    }
	    return false;
	};

	PropertiesPromiseArray.prototype.shouldCopyValues = function () {
	    return false;
	};

	PropertiesPromiseArray.prototype.getActualLength = function (len) {
	    return len >> 1;
	};

	function props(promises) {
	    var ret;
	    var castValue = tryConvertToPromise(promises);

	    if (!isObject(castValue)) {
	        return apiRejection("cannot await properties of a non-object\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    } else if (castValue instanceof Promise) {
	        ret = castValue._then(
	            Promise.props, undefined, undefined, undefined, undefined);
	    } else {
	        ret = new PropertiesPromiseArray(castValue).promise();
	    }

	    if (castValue instanceof Promise) {
	        ret._propagateFrom(castValue, 2);
	    }
	    return ret;
	}

	Promise.prototype.props = function () {
	    return props(this);
	};

	Promise.props = function (promises) {
	    return props(promises);
	};
	};


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(
	    Promise, INTERNAL, tryConvertToPromise, apiRejection) {
	var util = __webpack_require__(5);

	var raceLater = function (promise) {
	    return promise.then(function(array) {
	        return race(array, promise);
	    });
	};

	function race(promises, parent) {
	    var maybePromise = tryConvertToPromise(promises);

	    if (maybePromise instanceof Promise) {
	        return raceLater(maybePromise);
	    } else {
	        promises = util.asArray(promises);
	        if (promises === null)
	            return apiRejection("expecting an array or an iterable object but got " + util.classString(promises));
	    }

	    var ret = new Promise(INTERNAL);
	    if (parent !== undefined) {
	        ret._propagateFrom(parent, 3);
	    }
	    var fulfill = ret._fulfill;
	    var reject = ret._reject;
	    for (var i = 0, len = promises.length; i < len; ++i) {
	        var val = promises[i];

	        if (val === undefined && !(i in promises)) {
	            continue;
	        }

	        Promise.cast(val)._then(fulfill, reject, undefined, ret, null);
	    }
	    return ret;
	}

	Promise.race = function (promises) {
	    return race(promises, undefined);
	};

	Promise.prototype.race = function () {
	    return race(this, undefined);
	};

	};


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise,
	                          PromiseArray,
	                          apiRejection,
	                          tryConvertToPromise,
	                          INTERNAL,
	                          debug) {
	var getDomain = Promise._getDomain;
	var util = __webpack_require__(5);
	var tryCatch = util.tryCatch;

	function ReductionPromiseArray(promises, fn, initialValue, _each) {
	    this.constructor$(promises);
	    var domain = getDomain();
	    this._fn = domain === null ? fn : domain.bind(fn);
	    if (initialValue !== undefined) {
	        initialValue = Promise.resolve(initialValue);
	        initialValue._attachCancellationCallback(this);
	    }
	    this._initialValue = initialValue;
	    this._currentCancellable = null;
	    this._eachValues = _each === INTERNAL ? [] : undefined;
	    this._promise._captureStackTrace();
	    this._init$(undefined, -5);
	}
	util.inherits(ReductionPromiseArray, PromiseArray);

	ReductionPromiseArray.prototype._gotAccum = function(accum) {
	    if (this._eachValues !== undefined && accum !== INTERNAL) {
	        this._eachValues.push(accum);
	    }
	};

	ReductionPromiseArray.prototype._eachComplete = function(value) {
	    this._eachValues.push(value);
	    return this._eachValues;
	};

	ReductionPromiseArray.prototype._init = function() {};

	ReductionPromiseArray.prototype._resolveEmptyArray = function() {
	    this._resolve(this._eachValues !== undefined ? this._eachValues
	                                                 : this._initialValue);
	};

	ReductionPromiseArray.prototype.shouldCopyValues = function () {
	    return false;
	};

	ReductionPromiseArray.prototype._resolve = function(value) {
	    this._promise._resolveCallback(value);
	    this._values = null;
	};

	ReductionPromiseArray.prototype._resultCancelled = function(sender) {
	    if (sender === this._initialValue) return this._cancel();
	    if (this._isResolved()) return;
	    this._resultCancelled$();
	    if (this._currentCancellable instanceof Promise) {
	        this._currentCancellable.cancel();
	    }
	    if (this._initialValue instanceof Promise) {
	        this._initialValue.cancel();
	    }
	};

	ReductionPromiseArray.prototype._iterate = function (values) {
	    this._values = values;
	    var value;
	    var i;
	    var length = values.length;
	    if (this._initialValue !== undefined) {
	        value = this._initialValue;
	        i = 0;
	    } else {
	        value = Promise.resolve(values[0]);
	        i = 1;
	    }

	    this._currentCancellable = value;

	    if (!value.isRejected()) {
	        for (; i < length; ++i) {
	            var ctx = {
	                accum: null,
	                value: values[i],
	                index: i,
	                length: length,
	                array: this
	            };
	            value = value._then(gotAccum, undefined, undefined, ctx, undefined);
	        }
	    }

	    if (this._eachValues !== undefined) {
	        value = value
	            ._then(this._eachComplete, undefined, undefined, this, undefined);
	    }
	    value._then(completed, completed, undefined, value, this);
	};

	Promise.prototype.reduce = function (fn, initialValue) {
	    return reduce(this, fn, initialValue, null);
	};

	Promise.reduce = function (promises, fn, initialValue, _each) {
	    return reduce(promises, fn, initialValue, _each);
	};

	function completed(valueOrReason, array) {
	    if (this.isFulfilled()) {
	        array._resolve(valueOrReason);
	    } else {
	        array._reject(valueOrReason);
	    }
	}

	function reduce(promises, fn, initialValue, _each) {
	    if (typeof fn !== "function") {
	        return apiRejection("expecting a function but got " + util.classString(fn));
	    }
	    var array = new ReductionPromiseArray(promises, fn, initialValue, _each);
	    return array.promise();
	}

	function gotAccum(accum) {
	    this.accum = accum;
	    this.array._gotAccum(accum);
	    var value = tryConvertToPromise(this.value, this.array._promise);
	    if (value instanceof Promise) {
	        this.array._currentCancellable = value;
	        return value._then(gotValue, undefined, undefined, this, undefined);
	    } else {
	        return gotValue.call(this, value);
	    }
	}

	function gotValue(value) {
	    var array = this.array;
	    var promise = array._promise;
	    var fn = tryCatch(array._fn);
	    promise._pushContext();
	    var ret;
	    if (array._eachValues !== undefined) {
	        ret = fn.call(promise._boundValue(), value, this.index, this.length);
	    } else {
	        ret = fn.call(promise._boundValue(),
	                              this.accum, value, this.index, this.length);
	    }
	    if (ret instanceof Promise) {
	        array._currentCancellable = ret;
	    }
	    var promiseCreated = promise._popContext();
	    debug.checkForgottenReturns(
	        ret,
	        promiseCreated,
	        array._eachValues !== undefined ? "Promise.each" : "Promise.reduce",
	        promise
	    );
	    return ret;
	}
	};


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports =
	    function(Promise, PromiseArray, debug) {
	var PromiseInspection = Promise.PromiseInspection;
	var util = __webpack_require__(5);

	function SettledPromiseArray(values) {
	    this.constructor$(values);
	}
	util.inherits(SettledPromiseArray, PromiseArray);

	SettledPromiseArray.prototype._promiseResolved = function (index, inspection) {
	    this._values[index] = inspection;
	    var totalResolved = ++this._totalResolved;
	    if (totalResolved >= this._length) {
	        this._resolve(this._values);
	        return true;
	    }
	    return false;
	};

	SettledPromiseArray.prototype._promiseFulfilled = function (value, index) {
	    var ret = new PromiseInspection();
	    ret._bitField = 33554432;
	    ret._settledValueField = value;
	    return this._promiseResolved(index, ret);
	};
	SettledPromiseArray.prototype._promiseRejected = function (reason, index) {
	    var ret = new PromiseInspection();
	    ret._bitField = 16777216;
	    ret._settledValueField = reason;
	    return this._promiseResolved(index, ret);
	};

	Promise.settle = function (promises) {
	    debug.deprecated(".settle()", ".reflect()");
	    return new SettledPromiseArray(promises).promise();
	};

	Promise.prototype.settle = function () {
	    return Promise.settle(this);
	};
	};


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports =
	function(Promise, PromiseArray, apiRejection) {
	var util = __webpack_require__(5);
	var RangeError = __webpack_require__(10).RangeError;
	var AggregateError = __webpack_require__(10).AggregateError;
	var isArray = util.isArray;
	var CANCELLATION = {};


	function SomePromiseArray(values) {
	    this.constructor$(values);
	    this._howMany = 0;
	    this._unwrap = false;
	    this._initialized = false;
	}
	util.inherits(SomePromiseArray, PromiseArray);

	SomePromiseArray.prototype._init = function () {
	    if (!this._initialized) {
	        return;
	    }
	    if (this._howMany === 0) {
	        this._resolve([]);
	        return;
	    }
	    this._init$(undefined, -5);
	    var isArrayResolved = isArray(this._values);
	    if (!this._isResolved() &&
	        isArrayResolved &&
	        this._howMany > this._canPossiblyFulfill()) {
	        this._reject(this._getRangeError(this.length()));
	    }
	};

	SomePromiseArray.prototype.init = function () {
	    this._initialized = true;
	    this._init();
	};

	SomePromiseArray.prototype.setUnwrap = function () {
	    this._unwrap = true;
	};

	SomePromiseArray.prototype.howMany = function () {
	    return this._howMany;
	};

	SomePromiseArray.prototype.setHowMany = function (count) {
	    this._howMany = count;
	};

	SomePromiseArray.prototype._promiseFulfilled = function (value) {
	    this._addFulfilled(value);
	    if (this._fulfilled() === this.howMany()) {
	        this._values.length = this.howMany();
	        if (this.howMany() === 1 && this._unwrap) {
	            this._resolve(this._values[0]);
	        } else {
	            this._resolve(this._values);
	        }
	        return true;
	    }
	    return false;

	};
	SomePromiseArray.prototype._promiseRejected = function (reason) {
	    this._addRejected(reason);
	    return this._checkOutcome();
	};

	SomePromiseArray.prototype._promiseCancelled = function () {
	    if (this._values instanceof Promise || this._values == null) {
	        return this._cancel();
	    }
	    this._addRejected(CANCELLATION);
	    return this._checkOutcome();
	};

	SomePromiseArray.prototype._checkOutcome = function() {
	    if (this.howMany() > this._canPossiblyFulfill()) {
	        var e = new AggregateError();
	        for (var i = this.length(); i < this._values.length; ++i) {
	            if (this._values[i] !== CANCELLATION) {
	                e.push(this._values[i]);
	            }
	        }
	        if (e.length > 0) {
	            this._reject(e);
	        } else {
	            this._cancel();
	        }
	        return true;
	    }
	    return false;
	};

	SomePromiseArray.prototype._fulfilled = function () {
	    return this._totalResolved;
	};

	SomePromiseArray.prototype._rejected = function () {
	    return this._values.length - this.length();
	};

	SomePromiseArray.prototype._addRejected = function (reason) {
	    this._values.push(reason);
	};

	SomePromiseArray.prototype._addFulfilled = function (value) {
	    this._values[this._totalResolved++] = value;
	};

	SomePromiseArray.prototype._canPossiblyFulfill = function () {
	    return this.length() - this._rejected();
	};

	SomePromiseArray.prototype._getRangeError = function (count) {
	    var message = "Input array must contain at least " +
	            this._howMany + " items but contains only " + count + " items";
	    return new RangeError(message);
	};

	SomePromiseArray.prototype._resolveEmptyArray = function () {
	    this._reject(this._getRangeError(0));
	};

	function some(promises, howMany) {
	    if ((howMany | 0) !== howMany || howMany < 0) {
	        return apiRejection("expecting a positive integer\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	    var ret = new SomePromiseArray(promises);
	    var promise = ret.promise();
	    ret.setHowMany(howMany);
	    ret.init();
	    return promise;
	}

	Promise.some = function (promises, howMany) {
	    return some(promises, howMany);
	};

	Promise.prototype.some = function (howMany) {
	    return some(this, howMany);
	};

	Promise._SomePromiseArray = SomePromiseArray;
	};


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	module.exports = function(Promise, INTERNAL) {
	var THIS = {};
	var util = __webpack_require__(5);
	var nodebackForPromise = __webpack_require__(17);
	var withAppended = util.withAppended;
	var maybeWrapAsError = util.maybeWrapAsError;
	var canEvaluate = util.canEvaluate;
	var TypeError = __webpack_require__(10).TypeError;
	var defaultSuffix = "Async";
	var defaultPromisified = {__isPromisified__: true};
	var noCopyProps = [
	    "arity",    "length",
	    "name",
	    "arguments",
	    "caller",
	    "callee",
	    "prototype",
	    "__isPromisified__"
	];
	var noCopyPropsPattern = new RegExp("^(?:" + noCopyProps.join("|") + ")$");

	var defaultFilter = function(name) {
	    return util.isIdentifier(name) &&
	        name.charAt(0) !== "_" &&
	        name !== "constructor";
	};

	function propsFilter(key) {
	    return !noCopyPropsPattern.test(key);
	}

	function isPromisified(fn) {
	    try {
	        return fn.__isPromisified__ === true;
	    }
	    catch (e) {
	        return false;
	    }
	}

	function hasPromisified(obj, key, suffix) {
	    var val = util.getDataPropertyOrDefault(obj, key + suffix,
	                                            defaultPromisified);
	    return val ? isPromisified(val) : false;
	}
	function checkValid(ret, suffix, suffixRegexp) {
	    for (var i = 0; i < ret.length; i += 2) {
	        var key = ret[i];
	        if (suffixRegexp.test(key)) {
	            var keyWithoutAsyncSuffix = key.replace(suffixRegexp, "");
	            for (var j = 0; j < ret.length; j += 2) {
	                if (ret[j] === keyWithoutAsyncSuffix) {
	                    throw new TypeError("Cannot promisify an API that has normal methods with '%s'-suffix\u000a\u000a    See http://goo.gl/MqrFmX\u000a"
	                        .replace("%s", suffix));
	                }
	            }
	        }
	    }
	}

	function promisifiableMethods(obj, suffix, suffixRegexp, filter) {
	    var keys = util.inheritedDataKeys(obj);
	    var ret = [];
	    for (var i = 0; i < keys.length; ++i) {
	        var key = keys[i];
	        var value = obj[key];
	        var passesDefaultFilter = filter === defaultFilter
	            ? true : defaultFilter(key, value, obj);
	        if (typeof value === "function" &&
	            !isPromisified(value) &&
	            !hasPromisified(obj, key, suffix) &&
	            filter(key, value, obj, passesDefaultFilter)) {
	            ret.push(key, value);
	        }
	    }
	    checkValid(ret, suffix, suffixRegexp);
	    return ret;
	}

	var escapeIdentRegex = function(str) {
	    return str.replace(/([$])/, "\\$");
	};

	var makeNodePromisifiedEval;
	if (true) {
	var switchCaseArgumentOrder = function(likelyArgumentCount) {
	    var ret = [likelyArgumentCount];
	    var min = Math.max(0, likelyArgumentCount - 1 - 3);
	    for(var i = likelyArgumentCount - 1; i >= min; --i) {
	        ret.push(i);
	    }
	    for(var i = likelyArgumentCount + 1; i <= 3; ++i) {
	        ret.push(i);
	    }
	    return ret;
	};

	var argumentSequence = function(argumentCount) {
	    return util.filledRange(argumentCount, "_arg", "");
	};

	var parameterDeclaration = function(parameterCount) {
	    return util.filledRange(
	        Math.max(parameterCount, 3), "_arg", "");
	};

	var parameterCount = function(fn) {
	    if (typeof fn.length === "number") {
	        return Math.max(Math.min(fn.length, 1023 + 1), 0);
	    }
	    return 0;
	};

	makeNodePromisifiedEval =
	function(callback, receiver, originalName, fn, _, multiArgs) {
	    var newParameterCount = Math.max(0, parameterCount(fn) - 1);
	    var argumentOrder = switchCaseArgumentOrder(newParameterCount);
	    var shouldProxyThis = typeof callback === "string" || receiver === THIS;

	    function generateCallForArgumentCount(count) {
	        var args = argumentSequence(count).join(", ");
	        var comma = count > 0 ? ", " : "";
	        var ret;
	        if (shouldProxyThis) {
	            ret = "ret = callback.call(this, {{args}}, nodeback); break;\n";
	        } else {
	            ret = receiver === undefined
	                ? "ret = callback({{args}}, nodeback); break;\n"
	                : "ret = callback.call(receiver, {{args}}, nodeback); break;\n";
	        }
	        return ret.replace("{{args}}", args).replace(", ", comma);
	    }

	    function generateArgumentSwitchCase() {
	        var ret = "";
	        for (var i = 0; i < argumentOrder.length; ++i) {
	            ret += "case " + argumentOrder[i] +":" +
	                generateCallForArgumentCount(argumentOrder[i]);
	        }

	        ret += "                                                             \n\
	        default:                                                             \n\
	            var args = new Array(len + 1);                                   \n\
	            var i = 0;                                                       \n\
	            for (var i = 0; i < len; ++i) {                                  \n\
	               args[i] = arguments[i];                                       \n\
	            }                                                                \n\
	            args[i] = nodeback;                                              \n\
	            [CodeForCall]                                                    \n\
	            break;                                                           \n\
	        ".replace("[CodeForCall]", (shouldProxyThis
	                                ? "ret = callback.apply(this, args);\n"
	                                : "ret = callback.apply(receiver, args);\n"));
	        return ret;
	    }

	    var getFunctionCode = typeof callback === "string"
	                                ? ("this != null ? this['"+callback+"'] : fn")
	                                : "fn";
	    var body = "'use strict';                                                \n\
	        var ret = function (Parameters) {                                    \n\
	            'use strict';                                                    \n\
	            var len = arguments.length;                                      \n\
	            var promise = new Promise(INTERNAL);                             \n\
	            promise._captureStackTrace();                                    \n\
	            var nodeback = nodebackForPromise(promise, " + multiArgs + ");   \n\
	            var ret;                                                         \n\
	            var callback = tryCatch([GetFunctionCode]);                      \n\
	            switch(len) {                                                    \n\
	                [CodeForSwitchCase]                                          \n\
	            }                                                                \n\
	            if (ret === errorObj) {                                          \n\
	                promise._rejectCallback(maybeWrapAsError(ret.e), true, true);\n\
	            }                                                                \n\
	            if (!promise._isFateSealed()) promise._setAsyncGuaranteed();     \n\
	            return promise;                                                  \n\
	        };                                                                   \n\
	        notEnumerableProp(ret, '__isPromisified__', true);                   \n\
	        return ret;                                                          \n\
	    ".replace("[CodeForSwitchCase]", generateArgumentSwitchCase())
	        .replace("[GetFunctionCode]", getFunctionCode);
	    body = body.replace("Parameters", parameterDeclaration(newParameterCount));
	    return new Function("Promise",
	                        "fn",
	                        "receiver",
	                        "withAppended",
	                        "maybeWrapAsError",
	                        "nodebackForPromise",
	                        "tryCatch",
	                        "errorObj",
	                        "notEnumerableProp",
	                        "INTERNAL",
	                        body)(
	                    Promise,
	                    fn,
	                    receiver,
	                    withAppended,
	                    maybeWrapAsError,
	                    nodebackForPromise,
	                    util.tryCatch,
	                    util.errorObj,
	                    util.notEnumerableProp,
	                    INTERNAL);
	};
	}

	function makeNodePromisifiedClosure(callback, receiver, _, fn, __, multiArgs) {
	    var defaultThis = (function() {return this;})();
	    var method = callback;
	    if (typeof method === "string") {
	        callback = fn;
	    }
	    function promisified() {
	        var _receiver = receiver;
	        if (receiver === THIS) _receiver = this;
	        var promise = new Promise(INTERNAL);
	        promise._captureStackTrace();
	        var cb = typeof method === "string" && this !== defaultThis
	            ? this[method] : callback;
	        var fn = nodebackForPromise(promise, multiArgs);
	        try {
	            cb.apply(_receiver, withAppended(arguments, fn));
	        } catch(e) {
	            promise._rejectCallback(maybeWrapAsError(e), true, true);
	        }
	        if (!promise._isFateSealed()) promise._setAsyncGuaranteed();
	        return promise;
	    }
	    util.notEnumerableProp(promisified, "__isPromisified__", true);
	    return promisified;
	}

	var makeNodePromisified = canEvaluate
	    ? makeNodePromisifiedEval
	    : makeNodePromisifiedClosure;

	function promisifyAll(obj, suffix, filter, promisifier, multiArgs) {
	    var suffixRegexp = new RegExp(escapeIdentRegex(suffix) + "$");
	    var methods =
	        promisifiableMethods(obj, suffix, suffixRegexp, filter);

	    for (var i = 0, len = methods.length; i < len; i+= 2) {
	        var key = methods[i];
	        var fn = methods[i+1];
	        var promisifiedKey = key + suffix;
	        if (promisifier === makeNodePromisified) {
	            obj[promisifiedKey] =
	                makeNodePromisified(key, THIS, key, fn, suffix, multiArgs);
	        } else {
	            var promisified = promisifier(fn, function() {
	                return makeNodePromisified(key, THIS, key,
	                                           fn, suffix, multiArgs);
	            });
	            util.notEnumerableProp(promisified, "__isPromisified__", true);
	            obj[promisifiedKey] = promisified;
	        }
	    }
	    util.toFastProperties(obj);
	    return obj;
	}

	function promisify(callback, receiver, multiArgs) {
	    return makeNodePromisified(callback, receiver, undefined,
	                                callback, null, multiArgs);
	}

	Promise.promisify = function (fn, options) {
	    if (typeof fn !== "function") {
	        throw new TypeError("expecting a function but got " + util.classString(fn));
	    }
	    if (isPromisified(fn)) {
	        return fn;
	    }
	    options = Object(options);
	    var receiver = options.context === undefined ? THIS : options.context;
	    var multiArgs = !!options.multiArgs;
	    var ret = promisify(fn, receiver, multiArgs);
	    util.copyDescriptors(fn, ret, propsFilter);
	    return ret;
	};

	Promise.promisifyAll = function (target, options) {
	    if (typeof target !== "function" && typeof target !== "object") {
	        throw new TypeError("the target of promisifyAll must be an object or a function\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }
	    options = Object(options);
	    var multiArgs = !!options.multiArgs;
	    var suffix = options.suffix;
	    if (typeof suffix !== "string") suffix = defaultSuffix;
	    var filter = options.filter;
	    if (typeof filter !== "function") filter = defaultFilter;
	    var promisifier = options.promisifier;
	    if (typeof promisifier !== "function") promisifier = makeNodePromisified;

	    if (!util.isIdentifier(suffix)) {
	        throw new RangeError("suffix must be a valid identifier\u000a\u000a    See http://goo.gl/MqrFmX\u000a");
	    }

	    var keys = util.inheritedDataKeys(target);
	    for (var i = 0; i < keys.length; ++i) {
	        var value = target[keys[i]];
	        if (keys[i] !== "constructor" &&
	            util.isClass(value)) {
	            promisifyAll(value.prototype, suffix, filter, promisifier,
	                multiArgs);
	            promisifyAll(value, suffix, filter, promisifier, multiArgs);
	        }
	    }

	    return promisifyAll(target, suffix, filter, promisifier, multiArgs);
	};
	};



/***/ },
/* 36 */
/***/ function(module, exports) {

	"use strict";
	module.exports = function(Promise) {
	var SomePromiseArray = Promise._SomePromiseArray;
	function any(promises) {
	    var ret = new SomePromiseArray(promises);
	    var promise = ret.promise();
	    ret.setHowMany(1);
	    ret.setUnwrap();
	    ret.init();
	    return promise;
	}

	Promise.any = function (promises) {
	    return any(promises);
	};

	Promise.prototype.any = function () {
	    return any(this);
	};

	};


/***/ },
/* 37 */
/***/ function(module, exports) {

	"use strict";
	module.exports = function(Promise, INTERNAL) {
	var PromiseReduce = Promise.reduce;
	var PromiseAll = Promise.all;

	function promiseAllThis() {
	    return PromiseAll(this);
	}

	function PromiseMapSeries(promises, fn) {
	    return PromiseReduce(promises, fn, INTERNAL, INTERNAL);
	}

	Promise.prototype.each = function (fn) {
	    return this.mapSeries(fn)
	            ._then(promiseAllThis, undefined, undefined, this, undefined);
	};

	Promise.prototype.mapSeries = function (fn) {
	    return PromiseReduce(this, fn, INTERNAL, INTERNAL);
	};

	Promise.each = function (promises, fn) {
	    return PromiseMapSeries(promises, fn)
	            ._then(promiseAllThis, undefined, undefined, promises, undefined);
	};

	Promise.mapSeries = PromiseMapSeries;
	};


/***/ },
/* 38 */
/***/ function(module, exports) {

	"use strict";
	module.exports = function(Promise, INTERNAL) {
	var PromiseMap = Promise.map;

	Promise.prototype.filter = function (fn, options) {
	    return PromiseMap(this, fn, options, INTERNAL);
	};

	Promise.filter = function (promises, fn, options) {
	    return PromiseMap(promises, fn, options, INTERNAL);
	};
	};


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var protodef = __webpack_require__(40);
	var termTypes = protodef.Term.TermType;
	var datumTypes = protodef.Datum.DatumType;
	var net = __webpack_require__(41);


	function createLogger(poolMaster, silent) {
	  return function(message) {
	    if (silent !== true) {
	      console.error(message);
	    }
	    poolMaster.emit('log', message);
	  }
	}
	module.exports.createLogger = createLogger;

	function isPlainObject(obj) {
	  return Object.prototype.toString.call(obj) === '[object Object]';
	}
	module.exports.isPlainObject = isPlainObject;

	function toArray(args) {
	  return Array.prototype.slice.call(args);
	}
	module.exports.toArray = toArray;

	function hasImplicit(arg) {
	  if (Array.isArray(arg)) {
	    if (arg[0] === termTypes.IMPLICIT_VAR) return true;

	    if (Array.isArray(arg[1])) {
	      for(var i=0; i<arg[1].length; i++) {
	        if (hasImplicit(arg[1][i])) return true;
	      }
	    }
	    if (isPlainObject(arg[2])) {
	      for(var key in arg[2]) {
	        if (hasImplicit(arg[2][key])) return true;
	      }
	    }
	  }
	  else if (isPlainObject(arg)) {
	    for(var key in arg) {
	      if (hasImplicit(arg[key])) return true;
	    }
	  }
	  return false;
	}
	module.exports.hasImplicit = hasImplicit;

	function loopKeys(obj, fn) {
	  var keys = Object.keys(obj);
	  var result;
	  var keysLength = keys.length;
	  for(var i=0; i<keysLength; i++) {
	    result = fn(obj, keys[i]);
	    if (result === false) return;
	  }
	}
	module.exports.loopKeys = loopKeys;

	function convertPseudotype(obj, options) {
	  var reqlType = obj['$reql_type$'];
	  if (reqlType === 'TIME' && options['timeFormat'] !== 'raw') {
	    return new Date(obj['epoch_time'] * 1000);
	  }
	  else if (reqlType === 'GROUPED_DATA' && options['groupFormat'] !== 'raw') {
	    var result = [];
	    for (var i = 0, len = obj['data'].length, ref; i < len; i++) {
	      ref = obj.data[i];
	      result.push({
	        group: ref[0],
	        reduction: ref[1]
	      });
	    }
	    return result;
	  }
	  else if (reqlType === 'BINARY' && options['binaryFormat'] !== 'raw') {
	    return new Buffer(obj['data'], 'base64');
	  }
	  return obj;
	}
	function recursivelyConvertPseudotype(obj, options) {
	  var i, value, len, key;
	  if (Array.isArray(obj)) {
	    for (i = 0, len = obj.length; i < len; i++) {
	      value = obj[i];
	      obj[i] = recursivelyConvertPseudotype(value, options);
	    }
	  }
	  else if (obj && typeof obj === 'object') {
	    for (key in obj) {
	      value = obj[key];
	      obj[key] = recursivelyConvertPseudotype(value, options);
	    }
	    obj = convertPseudotype(obj, options);
	  }
	  return obj;
	}
	function makeAtom(response, options) {
	  options = options || {};
	  return recursivelyConvertPseudotype(response.r[0], options);
	}
	module.exports.makeAtom = makeAtom;

	function makeSequence(response, options) {
	  options = options || {};
	  return recursivelyConvertPseudotype(response.r, options);
	}

	module.exports.makeSequence = makeSequence;

	function changeProto(object, other) {
	  object.__proto__ = other.__proto__;
	}
	module.exports.changeProto = changeProto;

	// Try to extract the most global address
	// Note: Mutate the input
	function getCanonicalAddress(addresses) {
	  // We suppose that the addresses are all valid, and therefore use loose regex
	  for(var i=0; i<addresses.length; i++) {
	    var addresse = addresses[i];
	    if ((/^127(\.\d{1,3}){3}$/.test(addresse.host)) || (/0?:?0?:?0?:?0?:?0?:?0?:0?:1/.test(addresse.host))) {
	      addresse.value = 0;
	    }
	    else if ((net.isIPv6(addresse.host)) && (/^[fF]|[eE]80:.*\:.*\:/.test(addresse.host))) {
	      addresse.value = 1;
	    }
	    else if (/^169\.254\.\d{1,3}\.\d{1,3}$/.test(addresse.host)) {
	      addresse.value = 2;
	    }
	    else if (/^192\.168\.\d{1,3}\.\d{1,3}$/.test(addresse.host)) {
	      addresse.value = 3;
	    }
	    else if (/^172\.(1\d|2\d|30|31)\.\d{1,3}\.\d{1,3}$/.test(addresse.host)) {
	      addresse.value = 4;
	    }
	    else if (/^10(\.\d{1,3}){3}$/.test(addresse.host)) {
	      addresse.value = 5;
	    }
	    else if ((net.isIPv6(addresse.host)) && (/^[fF]|[cCdD].*\:.*\:/.test('addresse.host'))) {
	      addresse.value = 6;
	    }
	    else {
	      addresse.value = 7;
	    }
	  }
	  var result = addresses[0];
	  var max = addresses[0].value;
	  for(var i=0; i<addresses.length; i++) {
	    if (addresses[i].value > max) {
	      result = addresses[i];
	      max = addresses[i].value;
	    }
	  }
	  return result;
	}
	module.exports.getCanonicalAddress = getCanonicalAddress;


	module.exports.localhostAliases = {
	  'localhost': true,
	  '127.0.0.1': true,
	  '::1': true
	}

	module.exports.tryCatch = function tryCatch(toTry, handleError) {
	  try{
	  toTry()
	  }
	  catch(err) {
	  handleError(err)
	  }
	}


/***/ },
/* 40 */
/***/ function(module, exports) {

	// DO NOT EDIT
	// Autogenerated by convert_protofile

	module.exports = {
		VersionDummy: {
			Version: {
				V0_1: 1063369270,
				V0_2: 1915781601,
				V0_3: 1601562686,
				V0_4: 1074539808
			},
			
			Protocol: {
				PROTOBUF: 656407617,
				JSON: 2120839367
			}
		},
		
		Query: {
			QueryType: {
				START: 1,
				CONTINUE: 2,
				STOP: 3,
				NOREPLY_WAIT: 4,
				SERVER_INFO: 5
			},
			
			AssocPair: {}
		},
		
		Frame: {
			FrameType: {
				POS: 1,
				OPT: 2
			}
		},
		
		Backtrace: {},
		
		Response: {
			ResponseType: {
				SUCCESS_ATOM: 1,
				SUCCESS_SEQUENCE: 2,
				SUCCESS_PARTIAL: 3,
				WAIT_COMPLETE: 4,
				SERVER_INFO: 5,
				CLIENT_ERROR: 16,
				COMPILE_ERROR: 17,
				RUNTIME_ERROR: 18
			},
			
			ErrorType: {
				INTERNAL: 1000000,
				RESOURCE_LIMIT: 2000000,
				QUERY_LOGIC: 3000000,
				NON_EXISTENCE: 3100000,
				OP_FAILED: 4100000,
				OP_INDETERMINATE: 4200000,
				USER: 5000000
			},
			
			ResponseNote: {
				SEQUENCE_FEED: 1,
				ATOM_FEED: 2,
				ORDER_BY_LIMIT_FEED: 3,
				UNIONED_FEED: 4,
				INCLUDES_STATES: 5
			}
		},
		
		Datum: {
			DatumType: {
				R_NULL: 1,
				R_BOOL: 2,
				R_NUM: 3,
				R_STR: 4,
				R_ARRAY: 5,
				R_OBJECT: 6,
				R_JSON: 7
			},
			
			AssocPair: {}
		},
		
		Term: {
			TermType: {
				DATUM: 1,
				MAKE_ARRAY: 2,
				MAKE_OBJ: 3,
				VAR: 10,
				JAVASCRIPT: 11,
				UUID: 169,
				HTTP: 153,
				ERROR: 12,
				IMPLICIT_VAR: 13,
				DB: 14,
				TABLE: 15,
				GET: 16,
				GET_ALL: 78,
				EQ: 17,
				NE: 18,
				LT: 19,
				LE: 20,
				GT: 21,
				GE: 22,
				NOT: 23,
				ADD: 24,
				SUB: 25,
				MUL: 26,
				DIV: 27,
				MOD: 28,
				FLOOR: 183,
				CEIL: 184,
				ROUND: 185,
				APPEND: 29,
				PREPEND: 80,
				DIFFERENCE: 95,
				SET_INSERT: 88,
				SET_INTERSECTION: 89,
				SET_UNION: 90,
				SET_DIFFERENCE: 91,
				SLICE: 30,
				SKIP: 70,
				LIMIT: 71,
				OFFSETS_OF: 87,
				CONTAINS: 93,
				GET_FIELD: 31,
				KEYS: 94,
				VALUES: 186,
				OBJECT: 143,
				HAS_FIELDS: 32,
				WITH_FIELDS: 96,
				PLUCK: 33,
				WITHOUT: 34,
				MERGE: 35,
				BETWEEN_DEPRECATED: 36,
				BETWEEN: 182,
				REDUCE: 37,
				MAP: 38,
				FILTER: 39,
				CONCAT_MAP: 40,
				ORDER_BY: 41,
				DISTINCT: 42,
				COUNT: 43,
				IS_EMPTY: 86,
				UNION: 44,
				NTH: 45,
				BRACKET: 170,
				INNER_JOIN: 48,
				OUTER_JOIN: 49,
				EQ_JOIN: 50,
				ZIP: 72,
				RANGE: 173,
				INSERT_AT: 82,
				DELETE_AT: 83,
				CHANGE_AT: 84,
				SPLICE_AT: 85,
				COERCE_TO: 51,
				TYPE_OF: 52,
				UPDATE: 53,
				DELETE: 54,
				REPLACE: 55,
				INSERT: 56,
				DB_CREATE: 57,
				DB_DROP: 58,
				DB_LIST: 59,
				TABLE_CREATE: 60,
				TABLE_DROP: 61,
				TABLE_LIST: 62,
				CONFIG: 174,
				STATUS: 175,
				WAIT: 177,
				RECONFIGURE: 176,
				REBALANCE: 179,
				SYNC: 138,
				INDEX_CREATE: 75,
				INDEX_DROP: 76,
				INDEX_LIST: 77,
				INDEX_STATUS: 139,
				INDEX_WAIT: 140,
				INDEX_RENAME: 156,
				FUNCALL: 64,
				BRANCH: 65,
				OR: 66,
				AND: 67,
				FOR_EACH: 68,
				FUNC: 69,
				ASC: 73,
				DESC: 74,
				INFO: 79,
				MATCH: 97,
				UPCASE: 141,
				DOWNCASE: 142,
				SAMPLE: 81,
				DEFAULT: 92,
				JSON: 98,
				TO_JSON_STRING: 172,
				ISO8601: 99,
				TO_ISO8601: 100,
				EPOCH_TIME: 101,
				TO_EPOCH_TIME: 102,
				NOW: 103,
				IN_TIMEZONE: 104,
				DURING: 105,
				DATE: 106,
				TIME_OF_DAY: 126,
				TIMEZONE: 127,
				YEAR: 128,
				MONTH: 129,
				DAY: 130,
				DAY_OF_WEEK: 131,
				DAY_OF_YEAR: 132,
				HOURS: 133,
				MINUTES: 134,
				SECONDS: 135,
				TIME: 136,
				MONDAY: 107,
				TUESDAY: 108,
				WEDNESDAY: 109,
				THURSDAY: 110,
				FRIDAY: 111,
				SATURDAY: 112,
				SUNDAY: 113,
				JANUARY: 114,
				FEBRUARY: 115,
				MARCH: 116,
				APRIL: 117,
				MAY: 118,
				JUNE: 119,
				JULY: 120,
				AUGUST: 121,
				SEPTEMBER: 122,
				OCTOBER: 123,
				NOVEMBER: 124,
				DECEMBER: 125,
				LITERAL: 137,
				GROUP: 144,
				SUM: 145,
				AVG: 146,
				MIN: 147,
				MAX: 148,
				SPLIT: 149,
				UNGROUP: 150,
				RANDOM: 151,
				CHANGES: 152,
				ARGS: 154,
				BINARY: 155,
				GEOJSON: 157,
				TO_GEOJSON: 158,
				POINT: 159,
				LINE: 160,
				POLYGON: 161,
				DISTANCE: 162,
				INTERSECTS: 163,
				INCLUDES: 164,
				CIRCLE: 165,
				GET_INTERSECTING: 166,
				FILL: 167,
				GET_NEAREST: 168,
				POLYGON_SUB: 171,
				MINVAL: 180,
				MAXVAL: 181
			},
			
			AssocPair: {}
		}
	}


/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = require("net");

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var net = __webpack_require__(41);
	var tls = __webpack_require__(43);
	var Promise = __webpack_require__(3);
	var events = __webpack_require__(44);
	var util = __webpack_require__(45);

	var helper = __webpack_require__(39);
	var Err = __webpack_require__(46);
	var Cursor = __webpack_require__(47);
	var ReadableStream = __webpack_require__(48);
	var Metadata = __webpack_require__(50);

	var protodef = __webpack_require__(40);
	var responseTypes = protodef.Response.ResponseType;

	function Connection(r, options, resolve, reject) {
	  var self = this;
	  this.r = r;

	  // Set default options - We have to save them in case the user tries to reconnect
	  if (!helper.isPlainObject(options)) options = {};
	  this.host = options.host || r._host;
	  this.port = options.port || r._port;
	  this.authKey = options.authKey || r._authKey;
	  this.timeoutConnect = options.timeout || r._timeoutConnect; // period in *seconds* for the connection to be opened

	  if (options.db) this.db = options.db; // Pass to each query

	  this.token = 1;
	  this.buffer = new Buffer(0);

	  this.metadata = {}

	  this.open = false; // true only if the user can write on the socket
	  this.timeout = null;

	  if (options.connection) {
	    this.connection = options.connection;
	  }
	  else {
	    var family = 'IPv4';
	    if (net.isIPv6(self.host)) {
	      family = 'IPv6';
	    }

	    var connectionArgs = {
	      host: self.host,
	      port: self.port,
	      family: family
	    }

	    var tlsOptions = options.ssl || false;
	    if (tlsOptions === false) {
	      self.connection = net.connect(connectionArgs);
	    } else {
	      if (helper.isPlainObject(tlsOptions)) {
	        // Copy the TLS options in connectionArgs
	        helper.loopKeys(tlsOptions, function(tlsOptions, key) {
	          connectionArgs[key] = tlsOptions[key];
	        });
	      }
	      self.connection = tls.connect(connectionArgs);
	    }
	  }

	  self.connection.setKeepAlive(true);

	  self.timeoutOpen = setTimeout(function() {
	    self.connection.end(); // Send a FIN packet
	    reject(new Err.ReqlDriverError('Failed to connect to '+self.host+':'+self.port+' in less than '+self.timeoutConnect+'s').setOperational());
	  }, self.timeoutConnect*1000);

	  self.connection.on('end', function(error) {
	    // We emit end or close just once
	    self.connection.removeAllListeners();
	    self.open = false;
	    self.emit('end');
	    // We got a FIN packet, so we'll just flush
	    self._flush();
	  });
	  self.connection.on('close', function(error) {
	    // We emit end or close just once
	    clearTimeout(self.timeoutOpen)
	    self.connection.removeAllListeners();
	    self.open = false;
	    self.emit('closed');
	    // The connection is fully closed, flush (in case 'end' was not triggered)
	    self._flush();
	  });
	  self.connection.setNoDelay();
	  self.connection.once('error', function(error) {
	    reject(new Err.ReqlDriverError('Failed to connect to '+self.host+':'+self.port+'\nFull error:\n'+JSON.stringify(error)).setOperational());
	  });
	  self.connection.on('connect', function() {
	    self.connection.removeAllListeners('error');
	    self.connection.on('error', function(error) {
	      self.emit('error', error);
	    });

	    var initBuffer = new Buffer(4)
	    initBuffer.writeUInt32LE(protodef.VersionDummy.Version.V0_4, 0)

	    var authBuffer = new Buffer(self.authKey, 'ascii')
	    var lengthBuffer = new Buffer(4);
	    lengthBuffer.writeUInt32LE(authBuffer.length, 0)

	    var protocolBuffer = new Buffer(4)
	    protocolBuffer.writeUInt32LE(protodef.VersionDummy.Protocol.JSON, 0)
	    helper.tryCatch(function() {
	      self.connection.write(Buffer.concat([initBuffer, lengthBuffer, authBuffer, protocolBuffer]));
	    }, function(err) {
	      // The TCP connection is open, but the ReQL connection wasn't established.
	      // We can just abort the whole thing
	      self.open = false;
	      reject(new Err.ReqlDriverError('Failed to perform handshake with '+self.host+':'+self.port));
	    });
	  });
	  self.connection.once('end', function() {
	    self.open = false;
	  });

	  self.connection.on('data', function(buffer) {
	    self.buffer = Buffer.concat([self.buffer, buffer]);

	    if (self.open == false) {
	      for(var i=0; i<self.buffer.length; i++) {
	        if (buffer[i] === 0) {
	          clearTimeout(self.timeoutOpen)
	          var connectionStatus = buffer.slice(0, i).toString();
	          if (connectionStatus === 'SUCCESS') {
	            self.open = true;
	            resolve(self);
	          }
	          else {
	            reject(new Err.ReqlDriverError('Server dropped connection with message: \''+connectionStatus+'\''));
	          }
	          self.buffer = buffer.slice(i+1);
	          break;
	        }
	      }
	      self.connection.removeAllListeners('error');
	      self.connection.on('error', function(e) {
	        self.open = false;
	      });
	    }
	    else {
	      while(self.buffer.length >= 12) {
	        var token = self.buffer.readUInt32LE(0) + 0x100000000 * self.buffer.readUInt32LE(4);
	        var responseLength = self.buffer.readUInt32LE(8);

	        if (self.buffer.length < 12+responseLength) break;

	        var responseBuffer = self.buffer.slice(12, 12+responseLength);
	        var response = JSON.parse(responseBuffer);

	        self._processResponse(response, token);

	        self.buffer = self.buffer.slice(12+responseLength);
	      }
	    }
	  });

	  self.connection.on('timeout', function(buffer) {
	    self.connection.open = false;
	    self.emit('timeout');
	  })
	  self.connection.toJSON = function() { // We want people to be able to jsonify a cursor
	    return '"A socket object cannot be converted to JSON due to circular references."'
	  }
	}

	util.inherits(Connection, events.EventEmitter);

	Connection.prototype._processResponse = function(response, token) {
	  //console.log('Connection.prototype._processResponse: '+token);
	  //console.log(JSON.stringify(response, null, 2));
	  var self = this;

	  var type = response.t;
	  var result;
	  var cursor;
	  var stream;
	  var currentResolve, currentReject;
	  var datum;
	  var options;

	  if (type === responseTypes.COMPILE_ERROR) {
	    self.emit('release');
	    if (typeof self.metadata[token].reject === 'function') {
	      self.metadata[token].reject(new Err.ReqlCompileError(helper.makeAtom(response), self.metadata[token].query, response));
	    }

	    delete self.metadata[token]
	  }
	  else if (type === responseTypes.CLIENT_ERROR) {
	    self.emit('release');

	    if (typeof self.metadata[token].reject === 'function') {
	      currentResolve = self.metadata[token].resolve;
	      currentReject = self.metadata[token].reject;
	      self.metadata[token].removeCallbacks();
	      currentReject(new Err.ReqlClientError(helper.makeAtom(response), self.metadata[token].query, response));
	      if (typeof self.metadata[token].endReject !== 'function') {
	        // No pending STOP query, we can delete
	        delete self.metadata[token]
	      }
	    }
	    else if (typeof self.metadata[token].endResolve === 'function') {
	      currentResolve = self.metadata[token].endResolve;
	      currentReject = self.metadata[token].endReject;
	      self.metadata[token].removeEndCallbacks();
	      currentReject(new Err.ReqlClientError(helper.makeAtom(response), self.metadata[token].query, response));
	      delete self.metadata[token]
	    }
	    else if (token === -1) { // This should not happen now since 1.13 took the token out of the query
	      var error = new Err.ReqlClientError(helper.makeAtom(response)+'\nClosing all outstanding queries...');
	      self.emit('error', error);
	      // We don't want a function to yield forever, so we just reject everything
	      helper.loopKeys(self.rejectMap, function(rejectMap, key) {
	        rejectMap[key](error);
	      });
	      self.close();
	      delete self.metadata[token]
	    }
	  }
	  else if (type === responseTypes.RUNTIME_ERROR) {
	    self.emit('release');
	    if (typeof self.metadata[token].reject === 'function') {
	    }

	    if (typeof self.metadata[token].reject === 'function') {
	      currentResolve = self.metadata[token].resolve;
	      currentReject = self.metadata[token].reject;
	      self.metadata[token].removeCallbacks();
	      var error = new Err.ReqlRuntimeError(helper.makeAtom(response), self.metadata[token].query, response);
	      error.setName(response.e);
	      currentReject(error);
	      if (typeof self.metadata[token].endReject !== 'function') {
	        // No pending STOP query, we can delete
	        delete self.metadata[token]
	      }
	    }
	    else if (typeof self.metadata[token].endResolve === 'function') {
	      currentResolve = self.metadata[token].endResolve;
	      currentReject = self.metadata[token].endReject;
	      self.metadata[token].removeEndCallbacks();
	      currentReject(new Err.ReqlRuntimeError(helper.makeAtom(response), self.metadata[token].query, response));
	      delete self.metadata[token]
	    }
	  }
	  else if (type === responseTypes.SUCCESS_ATOM) {
	    self.emit('release');
	    // self.metadata[token].resolve is always a function
	    datum = helper.makeAtom(response, self.metadata[token].options);

	    if ((Array.isArray(datum)) &&
	        ((self.metadata[token].options.cursor === true) || ((self.metadata[token].options.cursor === undefined) && (self.r._options.cursor === true)))) {
	      cursor = new Cursor(self, token, self.metadata[token].options, 'cursor');
	      if (self.metadata[token].options.profile === true) {
	        self.metadata[token].resolve({
	          profile: response.p,
	          result: cursor
	        });
	      }
	      else {
	        self.metadata[token].resolve(cursor);
	      }

	      cursor._push({done: true, response: { r: datum }});
	    }
	    else if ((Array.isArray(datum)) &&
	        ((self.metadata[token].options.stream === true || self.r._options.stream === true))) {
	      cursor = new Cursor(self, token, self.metadata[token].options, 'cursor');
	      stream = new ReadableStream({}, cursor);
	      if (self.metadata[token].options.profile === true) {
	        self.metadata[token].resolve({
	          profile: response.p,
	          result: stream 
	        });
	      }
	      else {
	        self.metadata[token].resolve(stream);
	      }

	      cursor._push({done: true, response: { r: datum }});

	    }
	    else {
	      if (self.metadata[token].options.profile === true) {
	        result = {
	          profile: response.p,
	          result: cursor || datum
	        }
	      }
	      else {
	        result = datum;
	      }
	      self.metadata[token].resolve(result);
	    }

	    delete self.metadata[token];
	  }
	  else if (type === responseTypes.SUCCESS_PARTIAL) {
	    // We save the current resolve function because we are going to call cursor._fetch before resuming the user's yield
	    var done = false;
	    if (typeof self.metadata[token].resolve !== 'function') {
	      // According to issues/190, we can get a SUCESS_COMPLETE followed by a
	      // SUCCESS_PARTIAL when closing an feed. So resolve/reject will be undefined
	      // in this case.
	      currentResolve = self.metadata[token].endResolve;
	      currentReject = self.metadata[token].endReject;
	      if (typeof currentResolve === 'function') {
	        done = true;
	      }
	    }
	    else {
	      currentResolve = self.metadata[token].resolve;
	      currentReject = self.metadata[token].reject;
	    }

	    // We need to delete before calling cursor._push
	    self.metadata[token].removeCallbacks();

	    if (!self.metadata[token].cursor) { //No cursor, let's create one
	      self.metadata[token].cursor = true;

	      var typeResult = 'Cursor';
	      var includesStates = false;;
	      if (Array.isArray(response.n)) {
	        for(var i=0; i<response.n.length; i++) {
	          if (response.n[i] === protodef.Response.ResponseNote.SEQUENCE_FEED) {
	            typeResult = 'Feed';
	          }
	          else if (response.n[i] === protodef.Response.ResponseNote.ATOM_FEED) {
	            typeResult = 'AtomFeed';
	          }
	          else if (response.n[i] === protodef.Response.ResponseNote.ORDER_BY_LIMIT_FEED) {
	            typeResult = 'OrderByLimitFeed';
	          }
	          else if (response.n[i] === protodef.Response.ResponseNote.UNIONED_FEED) {
	            typeResult = 'UnionedFeed';
	          }
	          else if (response.n[i] === protodef.Response.ResponseNote.INCLUDES_STATES) {
	            includesStates = true;
	          }
	          else {
	            currentReject(new Err.ReqlDriverError('Unknown ResponseNote '+response.n[i]+', the driver is probably out of date.'));
	            return;
	          }
	        }
	      }
	      cursor = new Cursor(self, token, self.metadata[token].options, typeResult);
	      if (includesStates === true) {
	        cursor.setIncludesStates();
	      }
	      if ((self.metadata[token].options.cursor === true) || ((self.metadata[token].options.cursor === undefined) && (self.r._options.cursor === true))) {
	        // Return a cursor
	        if (self.metadata[token].options.profile === true) {
	          currentResolve({
	            profile: response.p,
	            result: cursor
	          });
	        }
	        else {
	          currentResolve(cursor);
	        }
	      }
	      else if ((self.metadata[token].options.stream === true || self.r._options.stream === true)) {
	        stream = new ReadableStream({}, cursor);
	        if (self.metadata[token].options.profile === true) {
	          currentResolve({
	            profile: response.p,
	            result: stream 
	          });
	        }
	        else {
	          currentResolve(stream);
	        }
	      }
	      else if (typeResult !== 'Cursor') {
	        // Return a feed
	        if (self.metadata[token].options.profile === true) {
	          currentResolve({
	            profile: response.p,
	            result: cursor
	          });
	        }
	        else {
	          currentResolve(cursor);
	        }
	      }
	      else {
	        // When we get SUCCESS_SEQUENCE, we will delete self.metadata[token].options
	        // So we keep a reference of it here
	        options = self.metadata[token].options;

	        // Fetch everything and return an array
	        cursor.toArray().then(function(result) {
	          if (options.profile === true) {
	            currentResolve({
	              profile: response.p,
	              result: result
	            });
	          }
	          else {
	            currentResolve(result);
	          }
	        }).error(currentReject)
	      }
	      cursor._push({done: false, response: response});
	    }
	    else { // That was a continue query
	      currentResolve({done: done, response: response});
	    }
	  }
	  else if (type === responseTypes.SUCCESS_SEQUENCE) {
	    self.emit('release');

	    if (typeof self.metadata[token].resolve === 'function') {
	      currentResolve = self.metadata[token].resolve;
	      currentReject = self.metadata[token].reject;
	      self.metadata[token].removeCallbacks();
	    }
	    else if (typeof self.metadata[token].endResolve === 'function') {
	      currentResolve = self.metadata[token].endResolve;
	      currentReject = self.metadata[token].endReject;
	      self.metadata[token].removeEndCallbacks();
	    }

	    if (!self.metadata[token].cursor) { // No cursor, let's create one
	      cursor = new Cursor(self, token, self.metadata[token].options, 'Cursor');

	      if ((self.metadata[token].options.cursor === true) || ((self.metadata[token].options.cursor === undefined) && (self.r._options.cursor === true))) {
	        if (self.metadata[token].options.profile === true) {
	          currentResolve({
	            profile: response.p,
	            result: cursor
	          });
	        }
	        else {
	          currentResolve(cursor);
	        }

	        // We need to keep the options in the else statement, so we clean it inside the if/else blocks
	        if (typeof self.metadata[token].endResolve !== 'function') {
	          delete self.metadata[token];
	        }
	      }
	      else if ((self.metadata[token].options.stream === true || self.r._options.stream === true)) {
	        stream = new ReadableStream({}, cursor);
	        if (self.metadata[token].options.profile === true) {
	          currentResolve({
	            profile: response.p,
	            result: stream
	          });
	        }
	        else {
	          currentResolve(stream);
	        }

	        // We need to keep the options in the else statement,
	        // so we clean it inside the if/else blocks (the one looking 
	        // if a cursor was already created)
	        if (typeof self.metadata[token].endResolve !== 'function') {
	          // We do not want to delete the metadata if there is an END query waiting
	          delete self.metadata[token];
	        }

	      }
	      else {
	        cursor.toArray().then(function(result) {
	          if (self.metadata[token].options.profile === true) {
	            currentResolve({
	              profile: response.p,
	              result: result
	            });
	          }
	          else {
	            currentResolve(result);
	          }
	          if (typeof self.metadata[token].endResolve !== 'function') {
	            delete self.metadata[token];
	          }

	        }).error(currentReject)
	      }
	      done = true;
	      cursor._push({done: true, response: response});
	    }
	    else { // That was a continue query
	      // If there is a pending STOP query we do not want to close the cursor yet
	      done = true;
	      if (typeof self.metadata[token].endResolve === 'function') {
	        done = false;
	      }
	      currentResolve({done: done, response: response});
	    }
	  }
	  else if (type === responseTypes.WAIT_COMPLETE) {
	    self.emit('release');
	    self.metadata[token].resolve();

	    delete self.metadata[token];
	  }
	  else if (type === responseTypes.SERVER_INFO) {
	    self.emit('release');
	    datum = helper.makeAtom(response, self.metadata[token].options);
	    self.metadata[token].resolve(datum);
	    delete self.metadata[token];
	  }
	}

	Connection.prototype.reconnect = function(options, callback) {
	  var self = this;

	  if (typeof options === 'function') {
	    callback = options;
	    options = {};
	  }

	  if (!helper.isPlainObject(options)) options = {};

	  if (options.noreplyWait === true) {
	    var p = new Promise(function(resolve, reject) {
	      self.close(options).then(function() {
	        self.r.connect({
	          host: self.host,
	          port: self.port,
	          authKey: self.authKey,
	          db: self.db
	        }).then(function(c) {
	          resolve(c);
	        }).error(function(e) {
	          reject(e);
	        });
	      }).error(function(e) {
	        reject(e)
	      })
	    }).nodeify(callback);
	  }
	  else {
	    return self.r.connect({
	      host: self.host,
	      port: self.port,
	      authKey: self.authKey,
	      db: self.db
	    }, callback);
	  }

	  return p;
	}

	Connection.prototype._send = function(query, token, resolve, reject, originalQuery, options, end) {
	  //console.log('Connection.prototype._send: '+token);
	  //console.log(JSON.stringify(query, null, 2));

	  var self = this;
	  if (self.open === false) {
	    var err = new Err.ReqlDriverError('The connection was closed by the other party');
	    err.setOperational();
	    reject(err);
	    return;
	  }

	  var queryStr = JSON.stringify(query);
	  var querySize = Buffer.byteLength(queryStr);

	  var buffer = new Buffer(8+4+querySize);
	  buffer.writeUInt32LE(token & 0xFFFFFFFF, 0)
	  buffer.writeUInt32LE(Math.floor(token / 0xFFFFFFFF), 4)

	  buffer.writeUInt32LE(querySize, 8);

	  buffer.write(queryStr, 12);

	  // noreply instead of noReply because the otpions are translated for the server
	  if ((!helper.isPlainObject(options)) || (options.noreply != true)) {
	    if (!self.metadata[token]) {
	      self.metadata[token] = new Metadata(resolve, reject, originalQuery, options);
	    }
	    else if (end === true) {
	      self.metadata[token].setEnd(resolve, reject);
	    }
	    else {
	      self.metadata[token].setCallbacks(resolve, reject);
	    }
	  }
	  else {
	    if (typeof resolve === 'function') resolve();
	    this.emit('release');
	  }

	  // This will emit an error if the connection is closed
	  helper.tryCatch(function() {
	    self.connection.write(buffer);
	  }, function(err) {
	    self.metadata[token].reject(err);
	    delete self.metadata[token]
	  });

	};

	Connection.prototype._continue = function(token, resolve, reject) {
	  var query = [protodef.Query.QueryType.CONTINUE];
	  this._send(query, token, resolve, reject);
	}
	Connection.prototype._end = function(token, resolve, reject) {
	  var query = [protodef.Query.QueryType.STOP];
	  this._send(query, token, resolve, reject, undefined, undefined, true);
	}


	Connection.prototype.use = function(db) {
	  if (typeof db !== 'string') throw new Err.ReqlDriverError('First argument of `use` must be a string')
	  this.db = db;
	}

	Connection.prototype.server = function(callback) {
	  var self = this;
	  return new Promise(function(resolve, reject) {
	    var query = [protodef.Query.QueryType.SERVER_INFO];
	    self._send(query, self._getToken(), resolve, reject, undefined, undefined, true);
	  }).nodeify(callback);
	}

	// Return the next token and update it.
	Connection.prototype._getToken = function() {
	  return this.token++;
	}

	Connection.prototype.close = function(options, callback) {
	  if (typeof options === 'function') {
	    callback = options;
	    options = {};
	  }
	  var self = this;

	  var p = new Promise(function(resolve, reject) {
	    if (!helper.isPlainObject(options)) options = {};
	    if (options.noreplyWait === true) {
	      self.noreplyWait().then(function(r) {
	        self.open = false;
	        self.connection.end()
	        resolve(r);
	      }).error(function(e) {
	        reject(e)
	      });
	    }
	    else{
	      self.open = false;
	      self.connection.end();
	      resolve();
	    }
	  }).nodeify(callback);
	  return p;
	};


	Connection.prototype.noReplyWait = function() {
	  throw new Err.ReqlDriverError('Did you mean to use `noreplyWait` instead of `noReplyWait`?')
	}
	Connection.prototype.noreplyWait = function(callback) {
	  var self = this;
	  var token = self._getToken();

	  var p = new Promise(function(resolve, reject) {
	    var query = [protodef.Query.QueryType.NOREPLY_WAIT];

	    self._send(query, token, resolve, reject);
	  }).nodeify(callback);
	  return p;
	}
	Connection.prototype._isConnection = function() {
	  return true;
	}
	Connection.prototype._isOpen = function() {
	  return this.open;
	}

	Connection.prototype._flush = function() {
	  helper.loopKeys(this.metadata, function(metadata, key) {
	    if (typeof metadata[key].reject === 'function') {
	      metadata[key].reject(new Err.ReqlServerError(
	            'The connection was closed before the query could be completed.',
	            metadata[key].query));
	    }
	    if (typeof metadata[key].endReject === 'function') {
	      metadata[key].endReject(new Err.ReqlServerError(
	            'The connection was closed before the query could be completed.',
	            metadata[key].query));
	    }
	  });
	  this.metadata = {};
	}

	module.exports = Connection


/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = require("tls");

/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = require("events");

/***/ },
/* 45 */
/***/ function(module, exports) {

	module.exports = require("util");

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var helper = __webpack_require__(39);
	var INDENT = 4;
	var LIMIT = 80;
	var IS_OPERATIONAL = 'isOperational';

	var protodef = __webpack_require__(40);
	var responseTypes = protodef.Response.ResponseType;
	var protoErrorType = protodef.Response.ErrorType;
	var termTypes = protodef.Term.TermType;
	var datumTypes = protodef.Datum.DatumType;
	var frameTypes = protodef.Frame.FrameType;


	function ReqlDriverError(message, query, secondMessage) {
	  Error.captureStackTrace(this, ReqlDriverError);
	  this.message = message;
	  if ((Array.isArray(query) && (query.length > 0)) || (!Array.isArray(query) && query != null)) {
	    if ((this.message.length > 0) && (this.message[this.message.length-1] === '.')) {
	      this.message = this.message.slice(0, this.message.length-1);
	    }

	    this.message += ' after:\n';

	    var backtrace = generateBacktrace(query, 0, null, [], {indent: 0, extra: 0});

	    this.message += backtrace.str;
	  }
	  else {
	    if (this.message[this.message.length-1] !== '?') this.message += '.';
	  }
	  if (secondMessage) this.message += '\n'+secondMessage;
	};
	ReqlDriverError.prototype = new Error();
	ReqlDriverError.prototype.name = 'ReqlDriverError';
	ReqlDriverError.prototype.setOperational = function() {
	  this[IS_OPERATIONAL] = true;
	  return this;
	};

	module.exports.ReqlDriverError = ReqlDriverError;


	function ReqlServerError(message, query) {
	  Error.captureStackTrace(this, ReqlServerError);
	  this.message = message;

	  if ((Array.isArray(query) && (query.length > 0)) || (!Array.isArray(query) && query != null)) {
	    if ((this.message.length > 0) && (this.message[this.message.length-1] === '.')) {
	      this.message = this.message.slice(0, this.message.length-1);
	    }

	    this.message += ' for:\n';

	    var backtrace = generateBacktrace(query, 0, null, [], {indent: 0, extra: 0});

	    this.message += backtrace.str;
	  }
	  else {
	    if (this.message[this.message.length-1] !== '?') this.message += '.';
	  }
	};
	ReqlServerError.prototype = new Error();
	ReqlServerError.prototype.name = 'ReqlServerError';
	ReqlServerError.prototype[IS_OPERATIONAL] = true;

	module.exports.ReqlServerError = ReqlServerError;


	function ReqlRuntimeError(message, query, frames) {
	  Error.captureStackTrace(this, ReqlRuntimeError);
	  this.message = message;

	  if ((query != null) && (frames)) {
	    if ((this.message.length > 0) && (this.message[this.message.length-1] === '.')) {
	      this.message = this.message.slice(0, this.message.length-1);
	    }
	    this.message += ' in:\n';

	    frames = frames.b;
	    if (frames) this.frames = frames.slice(0);
	    //this.frames = JSON.stringify(frames, null, 2);

	    var backtrace = generateBacktrace(query, 0, null, frames, {indent: 0, extra: 0});

	    var queryLines = backtrace.str.split('\n');
	    var carrotLines = backtrace.car.split('\n');

	    for(var i=0; i<queryLines.length; i++) {
	      this.message += queryLines[i]+'\n';
	      if (carrotLines[i].match(/\^/)) {
	        var pos = queryLines[i].match(/[^\s]/);
	        if ((pos) && (pos.index)) {
	          this.message += space(pos.index)+carrotLines[i].slice(pos.index)+'\n';
	        }
	        else {
	          this.message += carrotLines[i]+'\n';
	        }
	      }
	    }
	  }
	  //this.query = JSON.stringify(query, null, 2);
	};
	ReqlRuntimeError.prototype = new Error();
	ReqlRuntimeError.prototype.name = 'ReqlRuntimeError';
	ReqlRuntimeError.prototype.setName = function(type) {
	  switch(type) {
	    case protoErrorType.INTERNAL:
	      this.name = 'ReqlInternalError';
	      break;
	    case protoErrorType.RESOURCE_LIMIT:
	      this.name = 'ReqlResourceError';
	      break;
	    case protoErrorType.QUERY_LOGIC:
	      this.name = 'ReqlLogicError';
	      break;
	    case protoErrorType.OP_FAILED:
	      this.name = 'ReqlOpFailedError';
	      break;
	    case protoErrorType.OP_INDETERMINATE:
	      this.name = 'ReqlOpIndeterminateError';
	      break;
	    case protoErrorType.USER:
	      this.name = 'ReqlUserError';
	      break;
	    //default: // Do nothing
	  }
	}
	ReqlRuntimeError.prototype[IS_OPERATIONAL] = true;

	module.exports.ReqlRuntimeError = ReqlRuntimeError;


	function ReqlCompileError(message, query, frames) {
	  Error.captureStackTrace(this, ReqlCompileError);
	  this.message = message;

	  if ((query != null) && (frames)) {
	    if ((this.message.length > 0) && (this.message[this.message.length-1] === '.')) {
	      this.message = this.message.slice(0, this.message.length-1);
	    }

	    this.message += ' in:\n';

	    frames = frames.b;
	    if (frames) this.frames = frames.slice(0);
	    //this.frames = JSON.stringify(frames, null, 2);

	    var backtrace = generateBacktrace(query, 0, null, frames, {indent: 0, extra: 0});

	    var queryLines = backtrace.str.split('\n');
	    var carrotLines = backtrace.car.split('\n');

	    for(var i=0; i<queryLines.length; i++) {
	      this.message += queryLines[i]+'\n';
	      if (carrotLines[i].match(/\^/)) {
	        var pos = queryLines[i].match(/[^\s]/);
	        if ((pos) && (pos.index)) {
	          this.message += space(pos.index)+carrotLines[i].slice(pos.index)+'\n';
	        }
	        else {
	          this.message += carrotLines[i]+'\n';
	        }
	      }
	    }
	  }
	};
	ReqlCompileError.prototype = new Error();
	ReqlCompileError.prototype.name = 'ReqlCompileError';
	ReqlCompileError.prototype[IS_OPERATIONAL] = true;

	module.exports.ReqlCompileError = ReqlCompileError;


	function ReqlClientError(message) {
	  Error.captureStackTrace(this, ReqlClientError);
	  this.message = message;
	};
	ReqlClientError.prototype = new Error();
	ReqlClientError.prototype.name = 'ReqlClientError';
	ReqlClientError.prototype[IS_OPERATIONAL] = true;

	module.exports.ReqlClientError = ReqlClientError;



	var _constants = {
	  MONDAY: true,
	  TUESDAY: true,
	  WEDNESDAY: true,
	  THURSDAY: true,
	  FRIDAY: true,
	  SATURDAY: true,
	  SUNDAY: true,
	  JANUARY: true,
	  FEBRUARY: true,
	  MARCH: true,
	  APRIL: true,
	  MAY: true,
	  JUNE: true,
	  JULY: true,
	  AUGUST: true,
	  SEPTEMBER: true,
	  OCTOBER: true,
	  NOVEMBER: true,
	  DECEMBER: true,
	  MINVAL: true,
	  MAXVAL: true,
	}
	var constants = {};
	for(var key in _constants) {
	  constants[termTypes[key]] = true;
	}


	var _nonPrefix = {
	  DB: true,
	  DB_CREATE: true,
	  DB_LIST: true,
	  DB_DROP: true,
	  JS: true,
	  NOW: true,
	  TIME: true,
	  EPOCH_TIME: true,
	  ISO8601: true,
	  BRANCH: true,
	  JAVASCRIPT: true,
	  ERROR: true,
	  MAKE_ARRAY: true,
	  JSON: true,
	  ARGS: true,
	  HTTP: true,
	  RANDOM: true,
	  BINARY: true,
	  OBJECT: true,
	  CIRCLE: true,
	  GEOJSON: true,
	  POINT: true,
	  LINE: true,
	  POLYGON: true,
	  UUID: true,
	  DESC: true,
	  ASC: true,
	  RANGE: true,
	  LITERAL: 'true'
	}
	var nonPrefix = {};
	for(var key in _nonPrefix) {
	  nonPrefix[termTypes[key]] = true;
	}
	// Constants are also in nonPrefix
	for(var key in _constants) {
	  nonPrefix[termTypes[key]] = true;
	}


	var _typeToString = {
	  DB: 'db',
	  DB_CREATE: 'dbCreate',
	  DB_LIST: 'dbList',
	  DB_DROP: 'dbDrop',
	  TABLE_CREATE: 'tableCreate',
	  TABLE_LIST: 'tableList',
	  TABLE_DROP: 'tableDrop',
	  TABLE: 'table',
	  INDEX_CREATE: 'indexCreate',
	  INDEX_DROP: 'indexDrop',
	  INDEX_LIST: 'indexList',
	  INDEX_WAIT: 'indexWait',
	  INDEX_STATUS: 'indexStatus',
	  INSERT: 'insert',
	  UPDATE: 'update',
	  REPLACE: 'replace',
	  DELETE: 'delete',
	  SYNC: 'sync',
	  GET: 'get',
	  GET_ALL: 'getAll',
	  BETWEEN: 'between',
	  FILTER: 'filter',
	  INNER_JOIN: 'innerJoin',
	  OUTER_JOIN: 'outerJoin',
	  EQ_JOIN: 'eqJoin',
	  ZIP: 'zip',
	  MAP: 'map',
	  WITH_FIELDS: 'withFields',
	  CONCAT_MAP: 'concatMap',
	  ORDER_BY: 'orderBy',
	  DESC: 'desc',
	  ASC: 'asc',
	  SKIP: 'skip',
	  LIMIT: 'limit',
	  SLICE: 'slice',
	  NTH: 'nth',
	  OFFSETS_OF: 'offsetsOf',
	  IS_EMPTY: 'isEmpty',
	  UNION: 'union',
	  SAMPLE: 'sample',
	  REDUCE: 'reduce',
	  COUNT: 'count',
	  SUM: 'sum',
	  AVG: 'avg',
	  MIN: 'min',
	  MAX: 'max',
	  OBJECT: 'object',
	  DISTINCT: 'distinct',
	  GROUP: 'group',
	  UNGROUP: 'ungroup',
	  CONTAINS: 'contains',
	  IMPLICIT_VAR: 'row',
	  PLUCK: 'pluck',
	  WITHOUT: 'without',
	  MERGE: 'merge',
	  APPEND: 'append',
	  PREPEND: 'prepend',
	  DIFFERENCE: 'difference',
	  SET_INSERT: 'setInsert',
	  SET_UNION: 'setUnion',
	  SET_INTERSECTION: 'setIntersection',
	  SET_DIFFERENCE: 'setDifference',
	  HAS_FIELDS: 'hasFields',
	  INSERT_AT: 'insertAt',
	  SPLICE_AT: 'spliceAt',
	  DELETE_AT: 'deleteAt',
	  CHANGE_AT: 'changeAt',
	  KEYS: 'keys',
	  VALUES: 'values',
	  MATCH: 'match',
	  UPCASE: 'upcase',
	  DOWNCASE: 'downcase',
	  ADD: 'add',
	  SUB: 'sub',
	  MUL: 'mul',
	  DIV: 'div',
	  MOD: 'mod',
	  AND: 'and',
	  OR: 'or',
	  EQ: 'eq',
	  NE: 'ne',
	  GT: 'gt',
	  GE: 'ge',
	  LT: 'lt',
	  LE: 'le',
	  NOT: 'not',
	  FLOOR: 'floor',
	  CEIL: 'ceil',
	  ROUND: 'round',
	  NOW: 'now',
	  TIME: 'time',
	  EPOCH_TIME: 'epochTime',
	  ISO8601: 'ISO8601',
	  IN_TIMEZONE: 'inTimezone',
	  TIMEZONE: 'timezone',
	  DURING: 'during',
	  DATE: 'date',
	  TIME_OF_DAY: 'timeOfDay',
	  YEAR: 'year',
	  MONTH: 'month',
	  DAY: 'day',
	  DAY_OF_WEEK: 'dayOfWeek',
	  DAY_OF_YEAR: 'dayOfYear',
	  HOURS: 'hours',
	  MINUTES: 'minutes',
	  SECONDS: 'seconds',
	  TO_ISO8601: 'toISO8601',
	  TO_EPOCH_TIME: 'toEpochTime',
	  FUNCALL: 'do',
	  BRANCH: 'branch',
	  FOR_EACH: 'forEach',
	  ERROR: 'error',
	  DEFAULT: 'default',
	  JAVASCRIPT: 'js',
	  COERCE_TO: 'coerceTo',
	  TYPE_OF: 'typeOf',
	  INFO: 'info',
	  JSON: 'json',
	  ARGS: 'args',
	  HTTP: 'http',
	  RANDOM: 'random',
	  CHANGES: 'changes',
	  BINARY: 'binary',
	  INDEX_RENAME: 'indexRename',
	  CIRCLE: 'circle',
	  DISTANCE: 'distance',
	  FILL: 'fill',
	  GEOJSON: 'geojson',
	  TO_GEOJSON: 'toGeojson',
	  GET_INTERSECTING: 'getIntersecting',
	  GET_NEAREST: 'getNearest',
	  INCLUDES: 'includes',
	  INTERSECTS: 'intersects',
	  LINE: 'line',
	  POINT: 'point',
	  POLYGON: 'polygon',
	  POLYGON_SUB: 'polygonSub',
	  UUID: 'uuid',
	  RANGE: 'range',
	  TO_JSON_STRING: 'toJSON',
	  CONFIG: 'config',
	  STATUS: 'status',
	  WAIT: 'wait',
	  RECONFIGURE: 'reconfigure',
	  REBALANCE: 'rebalance',
	  SPLIT: 'split',
	  LITERAL: 'literal',
	  MONDAY: 'monday',
	  TUESDAY: 'tuesday',
	  WEDNESDAY: 'wednesday',
	  THURSDAY: 'thursday',
	  FRIDAY: 'friday',
	  SATURDAY: 'saturday',
	  SUNDAY: 'sunday',
	  JANUARY: 'january',
	  FEBRUARY: 'february',
	  MARCH: 'march',
	  APRIL: 'april',
	  MAY: 'may',
	  JUNE: 'june',
	  JULY: 'july',
	  AUGUST: 'august',
	  SEPTEMBER: 'september',
	  OCTOBER: 'october',
	  NOVEMBER: 'november',
	  DECEMBER: 'december' ,
	  MINVAL: 'minval',
	  MAXVAL: 'maxval',
	}
	var typeToString = {};
	for(var key in _typeToString) {
	  typeToString[termTypes[key]] = _typeToString[key];
	}

	var _noPrefixOptargs = {
	  ISO8601: true,
	}
	var noPrefixOptargs = {};
	for(var key in _noPrefixOptargs) {
	  noPrefixOptargs[termTypes[key]] = true;
	}

	var _specialType = {
	  DATUM: function(term, index, father, frames, options, optarg) {
	    optarg = optarg || false;

	    var underline = Array.isArray(frames) && (frames.length === 0);
	    var currentFrame, backtrace;
	    if (Array.isArray(frames)) currentFrame = frames.shift();

	    var result = {
	      str: '',
	      car: ''
	    }

	    if ((helper.isPlainObject(term)) && (term.$reql_type$ === 'BINARY')) {
	      carify(result, 'r.binary(<Buffer>)', underline);
	      return result;
	    }

	    if ((index === 0) && ((father == null) || (!nonPrefix[father[0]]))) carify(result, 'r.expr(', underline)

	    if (typeof term === 'string' ) {
	      carify(result, '"'+term+'"', underline);
	    }
	    else if (helper.isPlainObject(term)) {
	      var totalKeys = Object.keys(term).length;
	      if (totalKeys === 0) {
	        carify(result, '{}', underline);
	      }
	      else {
	        carify(result, '{\n', underline);
	        var countKeys = 0;
	        var extraToRemove = options.extra;
	        options.indent += INDENT+options.extra;
	        options.extra = 0;
	        for(var key in term) {
	          countKeys++;
	          //if (!((father) && (Array.isArray(father[2])) && (Object.keys(father[2]).length > 0))) options.extra = 0;

	          if (optarg) {
	            carify(result, space(options.indent)+camelCase(key)+': ', underline);
	          }
	          else {
	            carify(result, space(options.indent)+key+': ', underline);
	          }
	          if ((currentFrame != null) && (currentFrame === key)) {
	            backtrace = generateBacktrace(term[key], i, term, frames, options);
	          }
	          else {
	            backtrace = generateBacktrace(term[key], i, term, null, options);
	          }
	          result.str += backtrace.str;
	          result.car += backtrace.car;
	          
	          if (countKeys !== totalKeys) { 
	            carify(result, ',\n', underline);
	          }

	        }
	        options.indent -= INDENT+extraToRemove;
	        carify(result, '\n'+space(options.indent+extraToRemove)+'}', underline);
	      }
	    }
	    else if (Array.isArray(term)) {
	      carify(result, '[', underline);
	      for(var i=0; i<term.length; i++) {
	        if ((currentFrame != null) && (currentFrame === i)) {
	          backtrace = generateBacktrace(term[i], i, term, frames, options);
	        }
	        else {
	          backtrace = generateBacktrace(term[i], i, term, null, options);
	        }
	        result.str += backtrace.str;
	        result.car += backtrace.car;
	      }
	      carify(result, ']', underline);
	    }
	    else {
	      carify(result, ''+term, underline);
	    }

	    if ((index === 0) && ((father == null) || (!nonPrefix[father[0]]))) carify(result, ')', underline);

	    if (underline) result.car = result.str.replace(/./g, '^');

	    return result;
	  },
	  TABLE: function(term, index, father, frames, options) {
	    var result = {
	      str: '',
	      car: ''
	    }
	    var backtrace, underline, currentFrame;


	    if ((term.length === 1) || (term[1].length === 0) || (term[1][0][0] !== termTypes.DB)) {
	      var underline = Array.isArray(frames) && (frames.length === 0);
	      if (Array.isArray(frames)) currentFrame = frames.shift();

	      carify(result, 'r.'+typeToString[term[0]]+'(', underline);
	      if (Array.isArray(term[1])) {
	        for(var i=0; i<term[1].length; i++) {
	          if (i !==0) result.str += ', ';


	          if ((currentFrame != null) && (currentFrame === 1)) {
	            // +1 for index because it's like if there was a r.db(...) before .table(...)
	            backtrace = generateBacktrace(term[1][i], i+1, term, frames, options)
	          }
	          else {
	            backtrace = generateBacktrace(term[1][i], i+1, term, null, options)
	          }
	          result.str += backtrace.str;
	          result.car += backtrace.car
	        }
	      }

	      backtrace = makeOptargs(term, i, term, frames, options, currentFrame)
	      result.str += backtrace.str;
	      result.car += backtrace.car;

	      carify(result, ')', underline);

	      if (underline) result.car = result.str.replace(/./g, '^');
	    }
	    else {
	      backtrace = generateNormalBacktrace(term, index, father, frames, options);
	      result.str = backtrace.str;
	      result.car = backtrace.car;
	    }

	    return result;
	  },
	  GET_FIELD: function(term, index, father, frames, options) {
	    var result = {
	      str: '',
	      car: ''
	    }
	    var backtrace, underline, currentFrame;

	    var underline = Array.isArray(frames) && (frames.length === 0);
	    if (Array.isArray(frames)) currentFrame = frames.shift();

	    if ((currentFrame != null) && (currentFrame === 0)) {
	      backtrace = generateBacktrace(term[1][0], 0, term, frames, options)
	    }
	    else {
	      backtrace = generateBacktrace(term[1][0], 0, term, null, options)
	    }
	    result.str = backtrace.str;
	    result.car = backtrace.car;

	    carify(result, '(', underline);

	    if ((currentFrame != null) && (currentFrame === 1)) {
	      backtrace = generateBacktrace(term[1][1], 1, term, frames, options)
	    }
	    else {
	      backtrace = generateBacktrace(term[1][1], 1, term, null, options)
	    }
	    result.str += backtrace.str;
	    result.car += backtrace.car;

	    carify(result, ')', underline);

	    if (underline) result.car = result.str.replace(/./g, '^');

	    return result;
	  },
	  MAKE_ARRAY: function(term, index, father, frames, options) {
	    var result = {
	      str: '',
	      car: ''
	    };
	    var backtrace, underline, currentFrame;

	    var underline = Array.isArray(frames) && (frames.length === 0);
	    if (Array.isArray(frames)) currentFrame = frames.shift();

	    if ((index === 0) && ((father == null) || (!nonPrefix[father[0]]))) carify(result, 'r.expr(', underline)

	    if (!((options) && (options.noBracket))) {
	      carify(result, '[', underline);
	    }
	    for(var i=0; i<term[1].length; i++) {
	      if (i !== 0) {
	        carify(result, ', ', underline);
	      }

	      if ((currentFrame != null) && (currentFrame  === i)) {
	        backtrace = generateBacktrace(term[1][i], i, term, frames, options);
	      }
	      else {
	        backtrace = generateBacktrace(term[1][i], i, term, null, options);
	      }
	      result.str += backtrace.str;
	      result.car += backtrace.car;

	    }

	    if (!((options) && (options.noBracket))) {
	      carify(result, ']', underline);
	    }

	    if ((index === 0) && ((father == null) || (!nonPrefix[father[0]]))) {
	      carify(result, ')', underline);
	    }

	    if (underline) result.car = result.str.replace(/./g, '^');

	    return result;
	  },
	  FUNC: function(term, index, father, frames, options) {
	    var result = {
	      str: '',
	      car: ''
	    };
	    var backtrace, underline, currentFrame;

	    var underline = Array.isArray(frames) && (frames.length === 0);
	    if (Array.isArray(frames)) currentFrame = frames.shift();

	    if ((term[1][0][1].length === 1) && (helper.hasImplicit(term[1][1]))) {
	      if ((currentFrame != null) && (currentFrame === 1)) {
	        backtrace = generateBacktrace(term[1][1], 1, term, frames, options);
	      }
	      else {
	        backtrace = generateBacktrace(term[1][1], 1, term, null, options);
	      }
	      result.str = backtrace.str;
	      result.car = backtrace.car;
	    }
	    else {
	      carify(result, 'function(', underline);

	      for(var i=0; i<term[1][0][1].length; i++) {
	        if (i !== 0) {
	          carify(result, ', ', underline);
	        }
	        carify(result, 'var_'+term[1][0][1][i], underline);
	      }

	      options.indent += INDENT+options.extra;
	      var extraToRemove = options.extra;
	      options.extra = 0;
	      //if (!((Array.isArray(term[2])) && (term[2].length > 0))) options.extra = 0;

	      carify(result, ') {\n'+space(options.indent)+'return ', underline);

	      if ((currentFrame != null) && (currentFrame === 1)) {
	        backtrace = generateBacktrace(term[1][1], 1, term, frames, options);
	      }
	      else {
	        backtrace = generateBacktrace(term[1][1], 1, term, null, options);
	      }

	      result.str += backtrace.str;
	      result.car += backtrace.car;

	      options.indent -= INDENT+extraToRemove;
	      options.extra = extraToRemove;

	      carify(result, '\n'+space(options.indent+extraToRemove)+'}', underline);

	    }

	    if (underline) result.car = result.str.replace(/./g, '^');

	    return result;
	  },
	  VAR: function(term, index, father, frames, options) {
	    var result = {
	      str: '',
	      car: ''
	    }
	    var backtrace, underline, currentFrame;

	    var underline = Array.isArray(frames) && (frames.length === 0);
	    if (Array.isArray(frames)) currentFrame = frames.shift();

	    carify(result, 'var_'+term[1][0], underline);

	    if (underline) result.car = result.str.replace(/./g, '^');
	    return result;
	  },
	  FUNCALL: function(term, index, father, frames, options) {
	    // The syntax is args[1].do(args[0])
	    var result = {
	      str: '',
	      car: ''
	    };
	    var backtrace, underline, currentFrame;

	    var underline = Array.isArray(frames) && (frames.length === 0);
	    if (Array.isArray(frames)) currentFrame = frames.shift();

	    if (term[1].length === 2) {
	      if ((currentFrame != null) && (currentFrame === 1)) {
	        backtrace = generateBacktrace(term[1][1], 0, term, frames, options);
	      }
	      else {
	        backtrace = generateBacktrace(term[1][1], 0, term, null, options);
	      }
	      result.str = backtrace.str;
	      result.car = backtrace.car;

	      carify(result, '.do(', underline);
	    }
	    else {
	      carify(result, 'r.do(', underline);

	      for(var i=1; i<term[1].length; i++) {
	        if ((currentFrame != null) && (currentFrame === i)) {
	          backtrace = generateBacktrace(term[1][i], i, term, frames, options);
	        }
	        else {
	          backtrace = generateBacktrace(term[1][i], i, term, null, options);
	        }
	        result.str += backtrace.str;
	        result.car += backtrace.car;

	        if (i !== term[1].length) {
	          carify(result, ', ' , underline);
	        }
	      }
	    }

	    if ((currentFrame != null) && (currentFrame === 0)) {
	      backtrace = generateBacktrace(term[1][0], 0, term, frames, options);
	    }
	    else {
	      backtrace = generateBacktrace(term[1][0], 0, term, null, options);
	    }
	    result.str += backtrace.str;
	    result.car += backtrace.car;

	    carify(result, ')', underline);

	    if (underline) result.car = result.str.replace(/./g, '^');

	    return result;
	  },
	  IMPLICIT_VAR: function(term, index, father, frames, options) {
	    var result = {
	      str: '',
	      car: ''
	    }
	    var backtrace, underline, currentFrame;

	    var underline = Array.isArray(frames) && (frames.length === 0);
	    if (Array.isArray(frames)) currentFrame = frames.shift();

	    carify(result, 'r.row', underline);

	    if (underline) result.car = result.str.replace(/./g, '^');
	    return result;
	  },
	  WAIT: function(term, index, father, frames, options) {
	    var result = {
	      str: '',
	      car: ''
	    }
	    var backtrace, underline, currentFrame;

	    if (term.length === 1 || term[1].length === 0) {
	      backtrace = generateWithoutPrefixBacktrace(term, index, father, frames, options);
	      result.str = backtrace.str;
	      result.car = backtrace.car;
	    }
	    else {
	      backtrace = generateNormalBacktrace(term, index, father, frames, options);
	      result.str = backtrace.str;
	      result.car = backtrace.car;
	    }
	    return result;
	  },
	  MAP: function(term, index, father, frames, options) {
	    var result = {
	      str: '',
	      car: ''
	    }
	    var backtrace, underline, currentFrame;

	    if (term.length > 1 && term[1].length > 2) {
	      backtrace = generateWithoutPrefixBacktrace(term, index, father, frames, options);
	      result.str = backtrace.str;
	      result.car = backtrace.car;
	    }
	    else {
	      backtrace = generateNormalBacktrace(term, index, father, frames, options);
	      result.str = backtrace.str;
	      result.car = backtrace.car;
	    }
	    return result;
	  },
	}
	_specialType.TABLE_CREATE = _specialType.TABLE;
	_specialType.TABLE_DROP = _specialType.TABLE;
	_specialType.TABLE_LIST = _specialType.TABLE;
	_specialType.RECONFIGURE = _specialType.WAIT;
	_specialType.REBALANCE = _specialType.WAIT;
	_specialType.BRACKET = _specialType.GET_FIELD;

	var specialType = {};
	for(var key in _specialType) {
	  specialType[termTypes[key]] = _specialType[key];
	}


	function space(n) {
	  return new Array(n+1).join(' ');
	}
	function carify(result, str, underline) {
	  if (underline === true) {
	    result.str += str;
	    result.car += str.replace(/[^\n]/g, '^');
	  }
	  else {
	    result.str += str;
	    result.car += str.replace(/[^\n]/g, ' ');
	  }
	}
	function makeOptargs(term, index, father, frames, options, currentFrame) {
	  var result = {
	    str: '',
	    car: ''
	  }
	  var backtrace, currentFrame, underline;

	  if (helper.isPlainObject(term[2])) {
	    //if ((currentFrame != null) && (frames != null)) frames.unshift(currentFrame);

	    //underline = Array.isArray(frames) && (frames.length === 0);
	    var underline = false;
	    //if (Array.isArray(frames)) currentFrame = frames.shift();

	    // This works before there is no prefix term than can be called with no normal argument but with an optarg
	    if (Array.isArray(term[1]) && (term[1].length > 1)) {
	      carify(result, ', ' , underline);
	    }
	    else if (Array.isArray(term[1]) && (term[1].length > 0) && (noPrefixOptargs[term[0]])) {
	      carify(result, ', ' , underline);
	    }

	    backtrace = specialType[termTypes.DATUM](term[2], index, term[2], frames, options, true);

	    result.str += backtrace.str;
	    result.car += backtrace.car;

	    if (underline) result.car = result.str.replace(/./g, '^');
	  }

	  return result;
	}
	function generateNormalBacktrace(term, index, father, frames, options) {
	  var result = {
	    str: '',
	    car: ''
	  }
	  var backtrace, currentFrame, underline;

	  //if (term[1]) {
	    var underline = Array.isArray(frames) && (frames.length === 0);
	    if (Array.isArray(frames)) currentFrame = frames.shift();

	    if ((currentFrame != null) && (currentFrame === 0)) {
	      backtrace = generateBacktrace(term[1][0], 0, term, frames, options);
	    }
	    else {
	      backtrace = generateBacktrace(term[1][0], 0, term, null, options);
	    }
	    result.str = backtrace.str;
	    result.car = backtrace.car;

	    var lines = backtrace.str.split('\n');
	    var line = lines[lines.length-1];
	    var pos = line.match(/[^\s]/);
	    pos = (pos) ? pos.index : 0;

	    if (line.length-pos > LIMIT) {
	      if (options.extra === 0) options.extra += INDENT;
	      carify(result, '\n'+space(options.indent+options.extra) , underline);
	    }

	    carify(result, '.'+typeToString[term[0]]+'(' , underline);
	    options.indent += options.extra;
	    var extraToRemove = options.extra;
	    options.extra = 0;

	    for(var i=1; i<term[1].length; i++) {
	      if (i !== 1) {
	        carify(result, ', ' , underline);
	      }
	      if ((currentFrame != null) && (currentFrame === i)) {
	        backtrace = generateBacktrace(term[1][i], i, term, frames, options);
	      }
	      else {
	        backtrace = generateBacktrace(term[1][i], i, term, null, options);
	      }
	      result.str += backtrace.str;
	      result.car += backtrace.car;
	    }

	    backtrace = makeOptargs(term, i, term, frames, options, currentFrame)
	    result.str += backtrace.str;
	    result.car += backtrace.car;

	    options.indent -= extraToRemove;
	    options.extra = extraToRemove;

	    carify(result, ')' , underline);

	    if (underline) result.car = result.str.replace(/./g, '^');
	  /*
	  }
	  else {
	    throw new Error('The driver should never enter this condition. Please report the query to the developers -- End 1 --\n'+JSON.stringify(term, null, 2))
	  }
	  */


	  return result;
	}

	function generateWithoutPrefixBacktrace(term, index, father, frames, options) {
	  var result = {
	    str: '',
	    car: ''
	  }

	  var backtrace, currentFrame, underline;

	  var underline = Array.isArray(frames) && (frames.length === 0);
	  if (Array.isArray(frames)) currentFrame = frames.shift();

	  if (constants[term[0]]) {
	    carify(result, 'r.'+typeToString[term[0]], underline); 
	    return result;
	  }

	  carify(result, 'r.'+typeToString[term[0]]+'(', underline); 

	  if (Array.isArray(term[1])) {
	    for(var i=0; i<term[1].length; i++) {
	      if (i !== 0) carify(result, ', ', underline)

	      if ((currentFrame != null) && (currentFrame === i)) {
	        backtrace = generateBacktrace(term[1][i], i, term, frames, options)
	      }
	      else {
	        backtrace = generateBacktrace(term[1][i], i, term, null, options)
	      }
	      result.str += backtrace.str;
	      result.car += backtrace.car;
	    }
	  }

	  backtrace = makeOptargs(term, i, term, frames, options, currentFrame)
	  result.str += backtrace.str;
	  result.car += backtrace.car;

	  carify(result, ')', underline);

	  if (underline) result.car = result.str.replace(/./g, '^');

	  return result;
	}

	function generateBacktrace(term, index, father, frames, options) {
	  var result = {
	    str: '',
	    car: ''
	  }
	  var backtrace, currentFrame, underline;

	  // frames = null -> do not underline
	  // frames = [] -> underline

	  if (Array.isArray(term)) {
	    if (term.length === 0) {
	      var underline = Array.isArray(frames) && (frames.length === 0);
	      carify(result, 'undefined', underline);
	    }
	    else if (specialType[term[0]]) {
	      backtrace = specialType[term[0]](term, index, father, frames, options);
	      result.str = backtrace.str;
	      result.car = backtrace.car;
	    }
	    else if (nonPrefix[term[0]]) {
	      backtrace = generateWithoutPrefixBacktrace(term, index, father, frames, options);
	      result.str = backtrace.str;
	      result.car = backtrace.car;
	    }
	    else { // normal type -- this.<method>( this.args... )
	      backtrace = generateNormalBacktrace(term, index, father, frames, options);
	      result.str = backtrace.str;
	      result.car = backtrace.car;
	    }
	  }
	  else if (term !== undefined) {
	    backtrace = specialType[termTypes.DATUM](term, index, father, frames, options);

	    result.str = backtrace.str;
	    result.car = backtrace.car;
	  }
	  else {
	    //throw new Error('The driver should never enter this condition. Please report the query to the developers -- End 2')
	  }
	  return result;
	}

	function camelCase(str) {
	  return str.replace(/_(.)/g, function (m, char) { return char.toUpperCase() });
	}
	module.exports.generateBacktrace = generateBacktrace;

	module.exports.setOperational = function(error) {
	  error[IS_OPERATIONAL] = true;
	  return error;
	};



/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var Promise = __webpack_require__(3);
	var Err = __webpack_require__(46);
	var helper = __webpack_require__(39);
	var EventEmitter = __webpack_require__(44).EventEmitter;

	function Cursor(connection, token, options, type) {
	  this.connection = connection;
	  this.token = token;

	  this._index = 0; // Position in this._data[0]
	  this._data = []; // Array of non empty arrays
	  this._fetching = false; // Are we fetching data
	  this._canFetch = true; // Can we fetch more data?
	  this._pendingPromises = []; // Pending promises' resolve/reject
	  this.options = options || {};
	  this._closed = false;
	  this._type = type;
	  this._setIncludesStates = false;
	  if ((type === 'feed') || (type === 'atomFeed')) {
	    this.toArray = function() {
	      throw new Error('The `toArray` method is not available on feeds.')
	    }
	  }
	  this.each = this._each;
	  this.eachAsync = this._eachAsync;
	  this.next = this._next;
	  this._emittedEnd = false;
	}

	Cursor.prototype.toString = function() {
	  return '[object '+this._type+']';
	}
	Cursor.prototype.setIncludesStates = function() {
	  this._setIncludesStates = true;
	}
	Cursor.prototype.includesStates = function() {
	  return this._setIncludesStates;
	}
	Cursor.prototype.getType = function() {
	  return this._type;
	}

	Cursor.prototype.toJSON = function() {
	  if (this._type === 'Cursor') {
	    throw new Err.ReqlDriverError('You cannot serialize a Cursor to JSON. Retrieve data from the cursor with `toArray` or `next`');
	  }
	  else {
	    throw new Err.ReqlDriverError('You cannot serialize a '+this._type+' to JSON. Retrieve data from the cursor with `each` or `next`');
	  }
	}

	Cursor.prototype._next = function(callback) {
	  var self = this;
	  return new Promise(function(resolve, reject) {
	    if (self._closed === true) {
	      reject(new Err.ReqlDriverError('You cannot call `next` on a closed '+this._type))
	    }
	    else if ((self._data.length === 0) && (self._canFetch === false)) {
	      reject(new Err.ReqlDriverError('No more rows in the '+self._type.toLowerCase()).setOperational())
	    }
	    else {
	      if ((self._data.length > 0) && (self._data[0].length > self._index)) {
	        var result = self._data[0][self._index++];
	        if (result instanceof Error) {
	          reject(result);
	        }
	        else {
	          resolve(result);

	          // This could be possible if we get back batch with just one document?
	          if (self._data[0].length === self._index) {
	            self._index = 0;
	            self._data.shift();
	            if ((self._data.length === 1)
	              && (self._canFetch === true)
	              && (self._closed === false)
	              && (self._fetching === false)) {
	                self._fetch();
	            }
	          }
	        }
	      }
	      else {
	        self._pendingPromises.push({resolve: resolve, reject: reject});
	      }
	    }
	  }).nodeify(callback);
	}
	Cursor.prototype.hasNext = function() {
	  throw new Error('The `hasNext` command has been removed in 1.13, please use `next`.')
	}
	Cursor.prototype.toArray = function(callback) {
	  var self = this;
	  var p = new Promise(function(resolve, reject) {
	    var result = [];
	    var i =0;
	    self._each(function(err, data) {
	      if (err) {
	        reject(err);
	      }
	      else {
	        result.push(data);
	      }
	    }, function() {
	      resolve(result);
	    });
	  }).nodeify(callback);
	  return p;
	}

	Cursor.prototype._fetch = function() {
	  var self = this;
	  this._fetching = true;

	  var p = new Promise(function(resolve, reject) {
	    self.connection._continue(self.token, resolve, reject);
	  }).then(function(response) {
	    self._push(response);
	    return null;
	  }).error(function(error) {
	    self._fetching = false;
	    self._canFetch = false;
	    self._pushError(error);
	  })
	}

	Cursor.prototype._push = function(data) {
	  var couldfetch = this._canFetch;
	  if (data.done) this._done();
	  var response = data.response;
	  this._fetching = false;
	  // If the cursor was closed, we ignore all following response
	  if ((response.r.length > 0) && (couldfetch === true)) {
	    this._data.push(helper.makeSequence(response, this.options));
	  }
	  // this._fetching = false
	  if ((this._closed === false) && (this._canFetch) && (this._data.length <= 1)) this._fetch();
	  this._flush();
	}
	// Try to solve as many pending promises as possible
	Cursor.prototype._flush = function() {
	  while ((this._pendingPromises.length > 0) && ((this._data.length > 0) || ((this._fetching === false) && (this._canFetch === false)))) {
	    var fullfiller = this._pendingPromises.shift(); 
	    var resolve = fullfiller.resolve;
	    var reject = fullfiller.reject;

	    if (this._data.length > 0) {
	      var result = this._data[0][this._index++];
	      if (result instanceof Error) {
	        reject(result);
	      }
	      else {
	        resolve(result);
	      }

	      if (this._data[0].length === this._index) {
	        this._index = 0;
	        this._data.shift();
	        if ((this._data.length <= 1)
	          && (this._canFetch === true)
	          && (this._closed === false)
	          && (this._fetching === false)) {
	            this._fetch();
	        }
	      }
	    }
	    else {
	      reject(new Err.ReqlDriverError('No more rows in the '+this._type.toLowerCase()).setOperational())
	    }
	  }
	}
	Cursor.prototype._pushError = function(error) {
	  this._data.push([error]);
	  this._flush();
	}

	Cursor.prototype._done = function() {
	  this._canFetch = false;
	  if (this._eventEmitter) {
	    this._eventEmitter.emit('end');
	  }
	}

	Cursor.prototype._set = function(ar) {
	  this._fetching = false;
	  this._canFetch = false;
	  if (ar.length > 0) {
	    this._data.push(ar);
	  }
	  this._flush();
	}

	Cursor.prototype.close = function(callback) {
	  var self = this;

	  self._closed = true;

	  var p = new Promise(function(resolve, reject) {
	    if ((self._canFetch === false) && (self._fetching === false)) {
	      resolve()
	    }
	    else { // since v0_4 (RethinkDB 2.0) we can (must) force a STOP request even if a CONTINUE query is pending
	      var endCallback = function() {
	        if (self._eventEmitter && (self._emittedEnd === false)) {
	          self._emittedEnd = true;
	          self._eventEmitter.emit('end');
	        }
	        resolve();
	      }
	      self.connection._end(self.token, endCallback, reject);
	    }
	  }).nodeify(callback);
	  return p;
	}
	Cursor.prototype._each = function(callback, onFinish) {
	  if (this._closed === true) {
	    return callback(new Err.ReqlDriverError('You cannot retrieve data from a cursor that is closed').setOperational());
	  }
	  var self = this;

	  var reject = function(err) {
	    if (err.message === 'No more rows in the '+self._type.toLowerCase()+'.') {
	      if (typeof onFinish === 'function') {
	        onFinish();
	      }
	    }
	    else {
	      callback(err);
	    }
	    return null;
	  }
	  var resolve = function(data) {
	    var keepGoing = callback(null, data);
	    if (keepGoing === false) {
	      if (typeof onFinish === 'function') {
	        onFinish();
	      }
	    }
	    else {
	      if (self._closed === false) {
	        self._next().then(resolve).error(function(error) {
	          if ((error.message !== 'You cannot retrieve data from a cursor that is closed.') &&
	              (error.message.match(/You cannot call `next` on a closed/) === null)) {
	            reject(error);
	          }
	        });
	      }
	    }
	    return null;
	  }

	  self._next().then(resolve).error(function(error) {
	    // We can silence error when the cursor is closed as this 
	    if ((error.message !== 'You cannot retrieve data from a cursor that is closed.') &&
	        (error.message.match(/You cannot call `next` on a closed/) === null)) {
	      reject(error);
	    }
	  });
	  return null;
	}
	Cursor.prototype._eachAsync = function(callback) {
	  if (this._closed === true) {
	    throw new Err.ReqlDriverError('You cannot retrieve data from a cursor that is closed').setOperational();
	  }
	  var self = this;

	  var nextCb = function() {
	    return self._next().then(callback).then(nextCb).error(function(error) {
	      if ((error.message === 'No more rows in the '+self._type.toLowerCase()+'.') ||
	          (error.message === 'You cannot retrieve data from a cursor that is closed.') ||
	          (error.message.match(/You cannot call `next` on a closed/) !== null)) {
	        return;
	      }

	      throw Err.setOperational(error);
	    });
	  }

	  return nextCb();
	}

	Cursor.prototype._makeEmitter = function() {
	  this.next = function() {
	    throw new Err.ReqlDriverError('You cannot call `next` once you have bound listeners on the '+this._type)
	  }
	  this.each = function() {
	    throw new Err.ReqlDriverError('You cannot call `each` once you have bound listeners on the '+this._type)
	  }
	  this.eachAsync = function() {
	    throw new Err.ReqlDriverError('You cannot call `eachAsync` once you have bound listeners on the '+this._type)
	  }
	  this.toArray = function() {
	    throw new Err.ReqlDriverError('You cannot call `toArray` once you have bound listeners on the '+this._type)
	  }
	  this._eventEmitter = new EventEmitter();
	}
	Cursor.prototype._eachCb = function(err, data) {
	  // We should silent things if the cursor/feed is closed
	  if (this._closed === false) {
	    if (err) {
	      this._eventEmitter.emit('error', err);
	    }
	    else {
	      this._eventEmitter.emit('data', data);
	    }
	  }
	}

	var methods = [
	  'addListener',
	  'on',
	  'once',
	  'removeListener',
	  'removeAllListeners',
	  'setMaxListeners',
	  'listeners',
	  'emit'
	];

	for(var i=0; i<methods.length; i++) {
	  (function(n) {
	    var method = methods[n];
	    Cursor.prototype[method] = function() {
	      var self = this;
	      if (self._eventEmitter == null) {
	        self._makeEmitter();
	        setImmediate(function() {
	          self._each(self._eachCb.bind(self), function() {
	            if (self._emittedEnd === false) {
	              self._emittedEnd = true;
	              self._eventEmitter.emit('end');
	            }
	          });
	        });
	      }
	      var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	      self._eventEmitter[method].apply(self._eventEmitter, _args);
	    };
	  })(i);
	}

	module.exports = Cursor;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var Readable = __webpack_require__(49).Readable;
	var Cursor = __webpack_require__(47);
	var util = __webpack_require__(45);

	// Experimental, but should work fine.
	function ReadableStream(options, cursor) {
	  if (cursor) this._cursor = cursor;
	  this._pending = 0; // How many time we called _read while no cursor was available
	  this._index = 0;
	  this._maxRecursion = 1000; // Hardcoded
	  this._highWaterMark = options.highWaterMark;
	  this._closed = false;

	  Readable.call(this, {
	    objectMode: true,
	    highWaterMark: this._highWaterMark
	  });
	};
	util.inherits(ReadableStream, Readable);


	ReadableStream.prototype._setCursor = function(cursor) {
	  if (cursor instanceof Cursor === false) {
	    this.emit('error', new Error('Cannot create a stream on a single value.'));
	    return this;
	  }
	  this._cursor = cursor;
	  this._fetchAndDecrement();
	}
	ReadableStream.prototype._read = function(size) {
	  this._count++;
	  if (this._cursor === undefined) {
	    this._pending++;
	    return;
	  }

	  this._recursion = 0;
	  this._fetch();
	}

	//TODO: Refactor with _fetch?
	ReadableStream.prototype._fetchAndDecrement = function() {
	  var self = this;
	  self._pending--;
	  if (self._pending < 0 || self._closed === true) {
	    return;
	  }

	  if (self._cursor._closed === true) {
	    self.push(null);
	  }
	  else {
	    self._cursor._next().then(function(data) {
	      // Silently drop null values for now
	      if (data === null) {
	        if (self._recursion++ === self._maxRecursion) {
	          //Avoid maximum call stack errors
	          process.nextTick(function() {
	            self._fetchAndDecrement();
	          });
	        }
	        else {
	          self._fetchAndDecrement();
	        }
	      }
	      else {
	        if (self.push(data) !== false) {
	          if (self._recursion++ === self._maxRecursion) {
	            process.nextTick(function() {
	              self._fetchAndDecrement();
	            });
	          }
	          else {
	            self._fetchAndDecrement();
	          }
	        }
	      }
	    }).error(function(error) {
	      if (error.message.match(/No more rows in the/)) {
	        self.push(null);
	      }
	      else if (error.message === 'You cannot retrieve data from a cursor that is closed.') {
	        // if the user call `close`, the cursor may reject pending requests. We just
	        // ignore them here.
	      }
	      else {
	        self.emit('error', error);
	      }
	    });
	  }
	}

	ReadableStream.prototype._fetch = function() {
	  var self = this;
	  if (self._closed === true) {
	    return;
	  }
	  if (self._cursor._closed === true) {
	    self.push(null);
	  }
	  else {
	    self._cursor._next().then(function(data) {
	      if (self._closed === true) {
	        return;
	      }
	      // Silently drop null values for now
	      if (data === null) {
	        if (self._recursion++ === self._maxRecursion) {
	          process.nextTick(function() {
	            self._fetch();
	          });
	        }
	        else {
	          self._fetch();
	        }
	      }
	      else {
	        if (self.push(data) !== false) {
	          if (self._recursion++ === self._maxRecursion) {
	            process.nextTick(function() {
	              self._fetch();
	            });
	          }
	          else {
	            self._fetch();
	          }
	        }
	      }
	    }).error(function(error) {
	      if (error.message.match(/No more rows in the/)) {
	        self.push(null);
	      }
	      else if (error.message === 'You cannot retrieve data from a cursor that is closed.') {
	        // if the user call `close`, the cursor may reject pending requests. We just
	        // ignore them here.
	      }
	      else {
	        self.emit('error', error);
	      }
	    });
	  }
	}


	ReadableStream.prototype.close = function() {
	  this._closed = true;
	  this.push(null);
	  return this._cursor.close();
	}

	module.exports = ReadableStream;


/***/ },
/* 49 */
/***/ function(module, exports) {

	module.exports = require("stream");

/***/ },
/* 50 */
/***/ function(module, exports) {

	// Metadata we keep per query
	function Metadata(resolve, reject, query, options) {
	  this.resolve = resolve;
	  this.reject = reject;
	  this.query = query; // The query in case we have to build a backtrace
	  this.options = options;
	  this.cursor = false;
	}

	Metadata.prototype.setCursor = function() {
	  this.cursor = true;
	}

	Metadata.prototype.setEnd = function(resolve, reject) {
	  this.endResolve = resolve;
	  this.endReject = reject;
	}

	Metadata.prototype.setCallbacks = function(resolve, reject) {
	  this.resolve = resolve;
	  this.reject = reject;
	}
	Metadata.prototype.removeCallbacks = function() {
	  this.resolve = null;
	  this.reject = null;
	}
	Metadata.prototype.removeEndCallbacks = function() {
	  this.endResolve = null;
	  this.endReject = null;
	}

	module.exports = Metadata;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var Promise = __webpack_require__(3);
	var protodef = __webpack_require__(40);
	var termTypes = protodef.Term.TermType;

	var Error = __webpack_require__(46);
	var helper = __webpack_require__(39);
	var ReadableStream = __webpack_require__(48);
	var WritableStream = __webpack_require__(52);
	var TransformStream = __webpack_require__(53);

	function Term(r, value, error) {
	  var self = this;
	  var term = function(field) {
	    if (Term.prototype._fastArity(arguments.length, 1) === false) {
	      var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	      Term.prototype._arity(_args, 1, '(...)', self);
	    }
	    return term.bracket(field);
	  }
	  helper.changeProto(term, self);

	  if (value === undefined) {
	    term._query = [];
	  }
	  else {
	    term._query = value;
	  }
	  term._r = r; // Keep a reference to r for global settings

	  if (error !== undefined) {
	    term._error = error;
	    term._frames = [];
	  }

	  return term;
	}

	// run([connection][, options][, callback])
	Term.prototype.run = function(connection, options, callback) {
	  var self = this;

	  if (self._error != null) {
	    var error = new Error.ReqlRuntimeError(self._error, self._query, {b: self._frames});
	    return Promise.reject(error);
	  }

	  if (helper.isPlainObject(connection) && (typeof connection._isConnection === 'function') && (connection._isConnection() === true)) {
	    if (typeof options === 'function') {
	      callback = options;
	      options = {};
	    }
	    else {
	      if (!helper.isPlainObject(options)) options = {};
	    }

	    if (connection._isOpen() !== true) {
	      return new Promise(function(resolve, reject) {
	        reject(new Error.ReqlDriverError('`run` was called with a closed connection', self._query).setOperational());
	      });
	    }
	    var p = new Promise(function(resolve, reject) {
	      var token = connection._getToken();

	      var query = [protodef.Query.QueryType.START];
	      query.push(self._query);

	      var _options = {};
	      var sendOptions = false;
	      if (connection.db != null) {
	        sendOptions = true;
	        _options.db = self._r.db(connection.db)._query;
	      }

	      if (self._r.arrayLimit != null) {
	        sendOptions = true;
	        _options[self._translateArgs['arrayLimit']] = self._r.arrayLimit;
	      };


	      var keepGoing = true; // we need it just to avoir calling resolve/reject multiple times
	      helper.loopKeys(options, function(options, key) {
	        if (keepGoing === true) {
	          if ((key === 'readMode') || (key === 'durability') || (key === 'db') ||
	            (key === 'noreply') || (key === 'arrayLimit') || (key === 'profile') ||
	            (key === 'minBatchRows') || (key === 'maxBatchRows') || (key === 'maxBatchBytes') ||
	            (key === 'maxBatchSeconds') || (key === 'firstBatchScaledownFactor')) {

	            sendOptions = true;
	            if (key === 'db') {
	              _options[key] = self._r.db(options[key])._query;
	            }
	            else if (self._translateArgs.hasOwnProperty(key)) {
	              _options[self._translateArgs[key]] = new Term(self._r).expr(options[key])._query;
	            }
	            else {
	              _options[key] = new Term(self._r).expr(options[key])._query;
	            }
	          }
	          else if ((key !== 'timeFormat') && (key !== 'groupFormat') &&
	              (key !== 'binaryFormat') && (key !== 'cursor') &&
	              (key !== 'readable') && (key !== 'writable') &&
	              (key !== 'transform') && (key !== 'stream') &&
	              (key !== 'highWaterMark')) {
	            reject(new Error.ReqlDriverError('Unrecognized option `'+key+'` in `run`. Available options are readMode <string>, durability <string>, noreply <bool>, timeFormat <string>, groupFormat: <string>, profile <bool>, binaryFormat <bool>, cursor <bool>, stream <bool>'));
	            keepGoing = false;
	          }
	        }
	      });

	      if (keepGoing === false) {
	        connection.emit('release');
	        return // The promise was rejected in the loopKeys
	      }

	      if (sendOptions === true) {
	        query.push(_options);
	      }
	      connection._send(query, token, resolve, reject, self._query, options);
	    }).nodeify(callback);
	  }
	  else {
	    var poolMaster = self._r.getPoolMaster(); // if self._r is defined, so is self._r.getPool()
	    if (!poolMaster) {
	      throw new Error.ReqlDriverError('`run` was called without a connection and no pool has been created', self._query);
	    }
	    else {
	      if (typeof connection === 'function') {
	        // run(callback);
	        callback = connection;
	        options = {};
	      }
	      else if (helper.isPlainObject(connection)) {
	        // run(options[, callback])
	        callback = options;
	        options = connection;
	      }
	      else {
	        options = {};
	      }


	      var p = new Promise(function(resolve, reject) {
	        poolMaster.getConnection().then(function(connection) {
	          var token = connection._getToken();
	          var query = [protodef.Query.QueryType.START];
	          query.push(self._query);

	          var _options = {};
	          var sendOptions = false;
	          if (connection.db != null) {
	            sendOptions = true;
	            _options.db = self._r.db(connection.db)._query;
	          }
	          if (self._r.arrayLimit != null) {
	            sendOptions = true;
	            _options[self._translateArgs['arrayLimit']] = self._r.arrayLimit;
	          };

	          var keepGoing = true;
	          helper.loopKeys(options, function(options, key) {
	            if (keepGoing === true) {
	              if ((key === 'readMode') || (key === 'durability') || (key === 'db') ||
	                  (key === 'noreply') || (key === 'arrayLimit') || (key === 'profile') ||
	                  (key === 'minBatchRows') || (key === 'maxBatchRows') || (key === 'maxBatchBytes') ||
	                  (key === 'maxBatchSeconds') || (key === 'firstBatchScaledownFactor')) {


	                sendOptions = true;
	                if (key === 'db') {
	                  _options[key] = self._r.db(options[key])._query;
	                }
	                else if (self._translateArgs.hasOwnProperty(key)) {
	                  _options[self._translateArgs[key]] = new Term(self._r).expr(options[key])._query
	                }
	                else {
	                  _options[key] = new Term(self._r).expr(options[key])._query
	                }
	              }
	              else if ((key !== 'timeFormat') && (key !== 'groupFormat') &&
	                  (key !== 'binaryFormat') && (key !== 'cursor') &&
	                  (key !== 'readable') && (key !== 'writable') &&
	                  (key !== 'transform') && (key !== 'stream') &&
	                  (key !== 'highWaterMark')) {

	                setTimeout( function() {
	                  reject(new Error.ReqlDriverError('Unrecognized option `'+key+'` in `run`. Available options are readMode <string>, durability <string>, noreply <bool>, timeFormat <string>, groupFormat: <string>, profile <bool>, binaryFormat <string>, cursor <bool>, stream <bool>'));
	                }, 0);
	                keepGoing = false;
	                return false;
	              }
	            }
	          });

	          if (keepGoing === false) {
	            connection.emit('release');
	            return // The promise was rejected in the loopKeys
	          }

	          if (sendOptions === true) {
	            query.push(_options);
	          }
	          connection._send(query, token, resolve, reject, self._query, options);
	        }).error(function(error) {
	          reject(error);
	        });
	      }).nodeify(callback);
	    }
	  }

	  //if (options.noreply) return self; // Do not return a promise if the user ask for no reply.

	  return p;
	}

	Term.prototype.toStream = function(connection, options) {
	  if (helper.isPlainObject(connection) && (typeof connection._isConnection === 'function') && (connection._isConnection() === true)) {
	    if (helper.isPlainObject(options) === false) {
	      options = {};
	    }
	    if (options.readable === true) {
	      return this._toReadableStream(connection, options);
	    }
	    else if (options.writable === true) {
	      return this._toWritableStream(connection, options);
	    }
	    else if (options.transform === true) {
	      return this._toTransformStream(connection, options);
	    }
	    else {
	      return this._toReadableStream(connection, options);
	    }
	  }
	  else {
	    options = connection;
	    if (helper.isPlainObject(options) === false) {
	      options = {};
	    }
	    if (options.readable === true) {
	      return this._toReadableStream(options);
	    }
	    else if (options.writable === true) {
	      return this._toWritableStream(options);
	    }
	    else if (options.transform === true) {
	      return this._toTransformStream(options);
	    }
	    else {
	      return this._toReadableStream(options);
	    }
	  }
	}

	Term.prototype._toReadableStream = function(connection, options) {
	  var stream;

	  var _options = {};
	  if (helper.isPlainObject(connection) && (typeof connection._isConnection === 'function') && (connection._isConnection() === true)) {
	    //toStream make sure that options is an object
	    helper.loopKeys(options, function(obj, key) {
	      _options[key] = obj[key];
	    });
	    _options.cursor = true;
	    stream = new ReadableStream(_options);
	    this.run(connection, _options).then(function(cursor) {
	      stream._setCursor(cursor);
	    }).error(function(error) {
	      stream.emit('error', error);
	    });
	  }
	  else {
	    helper.loopKeys(connection, function(obj, key) {
	      _options[key] = obj[key];
	    });
	    _options.cursor = true;
	    stream = new ReadableStream(_options);
	    this.run(_options).then(function(cursor) {
	      stream._setCursor(cursor);
	    }).error(function(error) {
	      stream.emit('error', error);
	    });
	  }
	  return stream;
	}

	Term.prototype._toWritableStream = function(connection, options) {
	  if (this._query[0] !== termTypes.TABLE) {
	    throw new Error.ReqlDriverError('Cannot create a writable stream on something else than a table.');
	  }

	  if (helper.isPlainObject(connection) && (typeof connection._isConnection === 'function') && (connection._isConnection() === true)) {
	    return new WritableStream(this, options, connection);
	  }
	  else {
	    return new WritableStream(this, connection);
	  }
	}
	Term.prototype._toTransformStream = function(connection, options) {
	  if (this._query[0] !== termTypes.TABLE) {
	    throw new Error.ReqlDriverError('Cannot create a writable stream on something else than a table.');
	  }

	  if (helper.isPlainObject(connection) && (typeof connection._isConnection === 'function') && (connection._isConnection() === true)) {
	    return new TransformStream(this, options, connection);
	  }
	  else {
	    return new TransformStream(this, connection);
	  }
	}


	// Manipulating databases
	Term.prototype.dbCreate = function(db) {
	  // Check for arity is done in r.prototype.dbCreate
	  this._noPrefix(this, 'dbCreate');

	  var term = new Term(this._r);
	  term._query.push(termTypes.DB_CREATE);
	  var args = [new Term(this._r).expr(db)._query]
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.dbDrop = function(db) {
	  this._noPrefix(this, 'dbDrop');

	  var term = new Term(this._r);
	  term._query.push(termTypes.DB_DROP);
	  var args = [new Term(this._r).expr(db)._query]
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.dbList = function() {
	  this._noPrefix(this, 'dbList');

	  var term = new Term(this._r);
	  term._query.push(termTypes.DB_LIST)
	  return term;
	}

	// Manipulating Tables
	Term.prototype.tableCreate = function(table, options) {
	  var self = this;
	  if (self._fastArityRange(arguments.length, 1, 2) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    self._arityRange(_args, 1, 2, 'tableCreate', self);
	  }


	  var term = new Term(self._r);
	  term._query.push(termTypes.TABLE_CREATE)

	  var args = [];
	  if (Array.isArray(self._query) && (self._query.length > 0)) {
	    args.push(self); // Push db
	  }
	  args.push(new Term(self._r).expr(table))
	  term._fillArgs(args);

	  if (helper.isPlainObject(options)) {
	    // Check for non valid key
	    helper.loopKeys(options, function(obj, key) {
	      if ((key !== 'primaryKey')
	          && (key !== 'durability')
	          && (key !== 'shards')
	          && (key !== 'replicas')
	          && (key !== 'primaryReplicaTag')) {
	        throw new Error.ReqlDriverError('Unrecognized option `'+key+'` in `tableCreate`', self._query, 'Available options are primaryKey <string>, durability <string>, shards <number>, replicas <number/object>, primaryReplicaTag <object>');
	      }
	    });
	    term._query.push(new Term(self._r).expr(translateOptions(options))._query);
	  }
	  return term;
	}

	Term.prototype.tableDrop = function(table) {
	  if (this._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 1, 'tableDrop', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.TABLE_DROP)

	  var args = [];
	  if (Array.isArray(this._query) && (this._query.length > 0)) {
	    args.push(this); // push db
	  }
	  args.push(new Term(this._r).expr(table))
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.tableList = function() {
	  if (this._fastArity(arguments.length, 0) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 0, 'tableList', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.TABLE_LIST);

	  var args = [];
	  if (Array.isArray(this._query) && (this._query.length > 0)) {
	    args.push(this);
	  }
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.indexList = function() {
	  if (this._fastArity(arguments.length, 0) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 0, 'indexList', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.INDEX_LIST);
	  var args = [this];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.indexCreate = function(name, fn, options) {
	  if (this._fastArityRange(arguments.length, 1, 3) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arityRange(_args, 1, 3, 'indexCreate', this);
	  }

	  if ((options == null) && (helper.isPlainObject(fn))) {
	    options = fn;
	    fn = undefined;
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.INDEX_CREATE);
	  var args = [this];
	  args.push(new Term(this._r).expr(name));
	  if (typeof fn !== 'undefined') args.push(new Term(this._r).expr(fn)._wrap());
	  term._fillArgs(args);

	  if (helper.isPlainObject(options)) {
	    // There is no need to translate here
	    helper.loopKeys(options, function(obj, key) {
	      if ((key !== 'multi') && (key !== 'geo')) {
	        throw new Error.ReqlDriverError('Unrecognized option `'+key+'` in `indexCreate`', self._query, 'Available option is multi <bool> and geo <bool>');
	      }
	    });
	    term._query.push(new Term(this._r).expr(options)._query);
	  }
	  return term;
	}
	Term.prototype.indexDrop = function(name) {
	  if (this._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 1, 'indexDrop', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.INDEX_DROP);
	  var args = [this, new Term(this._r).expr(name)];
	  term._fillArgs(args);
	  return term;
	}

	Term.prototype.indexStatus = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  var term = new Term(this._r);
	  term._query.push(termTypes.INDEX_STATUS);
	  var args = [this];
	  for(var i=0; i<_args.length; i++) {
	    args.push(new Term(this._r).expr(_args[i]))
	  }
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.indexWait = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  var term = new Term(this._r);
	  term._query.push(termTypes.INDEX_WAIT);
	  var args = [this];
	  for(var i=0; i<_args.length; i++) {
	    args.push(new Term(this._r).expr(_args[i]))
	  }
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.indexRename = function(oldName, newName, options) {
	  var self = this;
	  if (self._fastArityRange(arguments.length, 2, 3) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    self._arityRange(_args, 2, 3, 'indexRename', self);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.INDEX_RENAME);
	  var args = [this, new Term(this._r).expr(oldName), new Term(this._r).expr(newName)];
	  term._fillArgs(args);

	  if (helper.isPlainObject(options)) {
	    helper.loopKeys(options, function(obj, key) {
	      if (key !== 'overwrite') {
	        throw new Error.ReqlDriverError('Unrecognized option `'+key+'` in `indexRename`', self._query, 'Available options are overwrite <bool>');
	      }
	    });
	    term._query.push(new Term(self._r).expr(translateOptions(options))._query);
	  }


	  return term;
	}
	Term.prototype.changes = function(options) {
	  var self = this;
	  if (self._fastArityRange(arguments.length, 0, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    self._arityRange(_args, 0, 1, 'changes', self);
	  }

	  var term = new Term(self._r);
	  term._query.push(termTypes.CHANGES);
	  var args = [self];
	  term._fillArgs(args);
	  if (helper.isPlainObject(options)) {
	    helper.loopKeys(options, function(obj, key) {
	      if ((key !== 'squash') && (key !== 'includeStates')
	         && (key !== 'includeInitial')) {
	        throw new Error.ReqlDriverError('Unrecognized option `'+key+'` in `changes`', self._query, 'Available options are squash <bool>');
	      }
	    });
	    term._query.push(new Term(self._r).expr(translateOptions(options))._query);
	  }
	  return term;
	}

	// Writing data
	Term.prototype.insert = function(documents, options) {
	  var self = this;
	  if (self._fastArityRange(arguments.length, 1, 2) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    self._arityRange(_args, 1, 2, 'insert', self);
	  }

	  var term = new Term(self._r);
	  term._query.push(termTypes.INSERT);
	  var args = [self, new Term(self._r).expr(documents)];
	  term._fillArgs(args);

	  if (helper.isPlainObject(options)) {
	    helper.loopKeys(options, function(obj, key) {
	      if ((key !== 'returnChanges') && (key !== 'durability') && (key !== 'conflict')) {
	        throw new Error.ReqlDriverError('Unrecognized option `'+key+'` in `insert`', self._query, 'Available options are returnChanges <bool>, durability <string>, conflict <string>');
	      }
	    });
	    term._query.push(new Term(self._r).expr(translateOptions(options))._query);
	  }
	  return term;
	}
	Term.prototype.update = function(newValue, options) {
	  var self = this;
	  if (self._fastArityRange(arguments.length, 1, 2) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    self._arityRange(_args, 1, 2, 'update', self);
	  }

	  var term = new Term(self._r);
	  term._query.push(termTypes.UPDATE);
	  var args = [self, new Term(self._r).expr(newValue)._wrap()];
	  term._fillArgs(args);

	  if (helper.isPlainObject(options)) {
	    helper.loopKeys(options, function(obj, key) {
	      if ((key !== 'returnChanges') && (key !== 'durability') && (key !== 'nonAtomic')) {
	        throw new Error.ReqlDriverError('Unrecognized option `'+key+'` in `update`', self._query, 'Available options are returnChanges <bool>, durability <string>, nonAtomic <bool>');
	      }
	    });
	    term._query.push(new Term(self._r).expr(translateOptions(options))._query);
	  }
	  return term;
	}
	Term.prototype.replace = function(newValue, options) {
	  var self = this;
	  if (self._fastArityRange(arguments.length, 1, 2) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    self._arityRange(_args, 1, 2, 'replace', self);
	  }

	  var term = new Term(self._r);
	  term._query.push(termTypes.REPLACE);
	  var args = [self, new Term(self._r).expr(newValue)._wrap()];
	  term._fillArgs(args);

	  if (helper.isPlainObject(options)) {
	    helper.loopKeys(options, function(obj, key) {
	      if ((key !== 'returnChanges') && (key !== 'durability') && (key !== 'nonAtomic')) {
	        throw new Error.ReqlDriverError('Unrecognized option `'+key+'` in `replace`', self._query, 'Available options are returnChanges <bool>, durability <string>, nonAtomic <bool>');
	      }
	    });
	    term._query.push(new Term(self._r).expr(translateOptions(options))._query);
	  }
	  return term;
	}
	Term.prototype.delete = function(options) {
	  var self = this;
	  if (self._fastArityRange(arguments.length, 1, 2) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    self._arityRange(_args, 0, 1, 'delete', self);
	  }

	  var term = new Term(self._r);
	  term._query.push(termTypes.DELETE);
	  var args = [self];
	  term._fillArgs(args);

	  if (helper.isPlainObject(options)) {
	    helper.loopKeys(options, function(obj, key) {
	      if ((key !== 'returnChanges') && (key !== 'durability')) {
	        throw new Error.ReqlDriverError('Unrecognized option `'+key+'` in `delete`', self._query, 'Available options are returnChanges <bool>, durability <string>');
	      }
	    });
	    term._query.push(new Term(self._r).expr(translateOptions(options))._query);
	  }
	  return term;
	}
	Term.prototype.sync = function() {
	  if (this._fastArity(arguments.length, 0) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 0, 'sync', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.SYNC)
	  var args = [this._query];
	  term._fillArgs(args);
	  return term;
	}

	// Selecting data
	Term.prototype.db = function(db) {
	  this._noPrefix(this, 'db');
	  if (this._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 1, 'db', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.DB)
	  var args = [new Term(this._r).expr(db)];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.table = function(table, options) {
	  var self = this;
	  if (self._fastArityRange(arguments.length, 1, 2) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    self._arityRange(_args, 1, 2, 'table', self);
	  }

	  var term = new Term(self._r);
	  term._query.push(termTypes.TABLE)

	  var args = [];
	  if (Array.isArray(self._query) && (self._query.length > 0)) {
	    args.push(self);
	  }
	  args.push(new Term(self._r).expr(table))
	  term._fillArgs(args);

	  if (helper.isPlainObject(options)) {
	    helper.loopKeys(options, function(obj, key) {
	      if (key !== 'readMode') {
	        throw new Error.ReqlDriverError('Unrecognized option `'+key+'` in `table`', self._query, 'Available option is readMode <string>');
	      }
	    });
	    term._query.push(new Term(self._r).expr(translateOptions(options))._query);
	  }
	  return term;
	}
	Term.prototype.get = function(primaryKey) {
	  if (this._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 1, 'get', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.GET);
	  var args = [this, new Term(this._r).expr(primaryKey)]
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.getAll = function() {
	  // We explicitly _args here, so fastArityRange is not useful
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  this._arityRange(_args, 1, Infinity, 'getAll', this);

	  var term = new Term(this._r);
	  term._query.push(termTypes.GET_ALL);

	  var args = [];
	  args.push(this);
	  for(var i=0; i<_args.length-1; i++) {
	    args.push(new Term(this._r).expr(_args[i]))
	  }
	  if ((_args.length > 1) && (helper.isPlainObject(_args[_args.length-1])) && (_args[_args.length-1].index !== undefined)) {
	    term._fillArgs(args);
	    term._query.push(new Term(this._r).expr(translateOptions(_args[_args.length-1]))._query);
	  }
	  else {
	    args.push(new Term(this._r).expr(_args[_args.length-1]))
	    term._fillArgs(args);
	  }
	  return term;
	}
	Term.prototype.between = function(start, end, options) {
	  var self = this;
	  if (self._fastArityRange(arguments.length, 2, 3) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    self._arityRange(_args, 2, 3, 'between', self);
	  }

	  var term = new Term(self._r);
	  term._query.push(termTypes.BETWEEN);
	  var args = [self, new Term(self._r).expr(start), new Term(self._r).expr(end)]
	  term._fillArgs(args);

	  if (helper.isPlainObject(options)) {
	    helper.loopKeys(options, function(obj, key) {
	      if ((key !== 'index') && (key !== 'leftBound') && (key !== 'rightBound')){
	        throw new Error.ReqlDriverError('Unrecognized option `'+key+'` in `between`', self._query, 'Available options are index <string>, leftBound <string>, rightBound <string>');
	      }
	    });
	    term._query.push(new Term(self._r).expr(translateOptions(options))._query);
	  }
	  return term;
	}
	Term.prototype.minval = function() {
	  var term = new Term(this._r);
	  term._query.push(termTypes.MINVAL);
	  return term;
	}
	Term.prototype.maxval = function() {
	  var term = new Term(this._r);
	  term._query.push(termTypes.MAXVAL);
	  return term;
	}

	Term.prototype.filter = function(filter, options) {
	  var self = this;
	  if (self._fastArityRange(arguments.length, 1, 2) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    self._arityRange(_args, 1, 2, 'filter', self);
	  }

	  var term = new Term(self._r);
	  term._query.push(termTypes.FILTER);
	  var args = [self, new Term(self._r).expr(filter)._wrap()]
	  term._fillArgs(args);

	  if (helper.isPlainObject(options)) {
	    helper.loopKeys(options, function(obj, key) {
	      if (key !== 'default') {
	        throw new Error.ReqlDriverError('Unrecognized option `'+key+'` in `filter`', self._query, 'Available option is filter');
	      }
	    })
	    term._query.push(new Term(self._r).expr(translateOptions(options))._query);
	  }
	  return term;
	}

	// Joins
	Term.prototype.innerJoin = function(sequence, predicate) {
	  if (this._fastArity(arguments.length, 2) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 2, 'innerJoin', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.INNER_JOIN);
	  var args = [this._query];
	  args.push(new Term(this._r).expr(sequence)._query);
	  args.push(new Term(this._r).expr(predicate)._wrap()._query);
	  term._fillArgs(args);

	  return term;
	}
	Term.prototype.outerJoin = function(sequence, predicate) {
	  if (this._fastArity(arguments.length, 2) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 2, 'outerJoin', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.OUTER_JOIN);
	  var args = [this];
	  args.push(new Term(this._r).expr(sequence));
	  args.push(new Term(this._r).expr(predicate)._wrap());
	  term._fillArgs(args);

	  return term;
	}
	Term.prototype.eqJoin = function(rightKey, sequence, options) {
	  var self = this;
	  if (self._fastArityRange(arguments.length, 2, 3) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    self._arityRange(_args, 2, 3, 'eqJoin', self);
	  }

	  var term = new Term(self._r);
	  term._query.push(termTypes.EQ_JOIN);
	  var args = [self];
	  args.push(new Term(self._r).expr(rightKey)._wrap());
	  args.push(new Term(self._r).expr(sequence));
	  term._fillArgs(args);

	  if (helper.isPlainObject(options)) {
	    helper.loopKeys(options, function(obj, key) {
	      if (key !== 'index') {
	        throw new Error.ReqlDriverError('Unrecognized option `'+key+'` in `eqJoin`', self._query, 'Available option is index <string>');
	      }
	    })
	    term._query.push(new Term(self._r).expr(translateOptions(options))._query);
	  }
	  return term;
	}
	Term.prototype.zip = function() {
	  if (this._fastArity(arguments.length, 0) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 0, 'zip', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.ZIP);
	  var args = [this];
	  term._fillArgs(args);
	  return term;
	}



	// Transformation
	Term.prototype.map = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  this._arityRange(_args, 1, Infinity, 'map', this);

	  var term = new Term(this._r);
	  term._query.push(termTypes.MAP);
	  var args = [];
	  if (Array.isArray(this._query) && (this._query.length > 0)) {
	    args.push(this);
	  }
	  for(var i=0; i<_args.length-1; i++) {
	    args.push(new Term(this._r).expr(_args[i]))
	  }
	  // Make sure that we don't push undefined if no argument is passed to map,
	  // in which case the server will handle the case and return an error.
	  if (_args.length> 0) {
	    args.push(new Term(this._r).expr(_args[_args.length-1])._wrap())
	  }
	  term._fillArgs(args);

	  return term;
	}
	Term.prototype.withFields = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  this._arityRange(_args, 1, Infinity, 'withFields', this);

	  var term = new Term(this._r);
	  term._query.push(termTypes.WITH_FIELDS);
	  var args = [this];
	  for(var i=0; i<_args.length; i++) {
	    args.push(new Term(this._r).expr(_args[i]))
	  }
	  term._fillArgs(args);

	  return term;
	}
	Term.prototype.concatMap = function(transformation) {
	  if (this._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 1, 'concatMap', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.CONCAT_MAP);
	  var args = [this];
	  args.push(new Term(this._r).expr(transformation)._wrap())
	  term._fillArgs(args);

	  return term;
	}
	Term.prototype.orderBy = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  this._arityRange(_args, 1, Infinity, 'orderBy', this);

	  var term = new Term(this._r);
	  term._query.push(termTypes.ORDER_BY);

	  var args = [this];
	  for(var i=0; i<_args.length-1; i++) {
	    if ((_args[i] instanceof Term) &&
	        ((_args[i]._query[0] === termTypes.DESC) || (_args[i]._query[0] === termTypes.ASC))) {
	      args.push(new Term(this._r).expr(_args[i]))
	    }
	    else {
	      args.push(new Term(this._r).expr(_args[i])._wrap())
	    }
	  }
	  // We actually don't need to make the difference here, but...
	  if ((_args.length > 0) && (helper.isPlainObject(_args[_args.length-1])) && (_args[_args.length-1].index !== undefined)) {
	    term._fillArgs(args);
	    term._query.push(new Term(this._r).expr(translateOptions(_args[_args.length-1]))._query);
	  }
	  else {
	    if ((_args[_args.length-1] instanceof Term) &&
	      ((_args[_args.length-1]._query[0] === termTypes.DESC) || (_args[_args.length-1]._query[0] === termTypes.ASC))) {
	      args.push(new Term(this._r).expr(_args[_args.length-1]))
	    }
	    else {
	      args.push(new Term(this._r).expr(_args[_args.length-1])._wrap())
	    }
	    term._fillArgs(args);
	  }
	  return term;

	}
	Term.prototype.desc = function(field) {
	  this._noPrefix(this, 'desc');
	  if (this._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 1, 'desc', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.DESC)
	  var args = [new Term(this._r).expr(field)._wrap()];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.asc = function(field) {
	  this._noPrefix(this, 'asc');
	  if (this._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 1, 'asc', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.ASC)
	  var args = [new Term(this._r).expr(field)._wrap()];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.skip = function(value) {
	  if (this._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 1, 'skip', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.SKIP)
	  var args = [this, new Term(this._r).expr(value)]
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.limit = function(value) {
	  if (this._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 1, 'limit', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.LIMIT)
	  var args = [this, new Term(this._r).expr(value)]
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.slice = function(start, end, options) {
	  if (this._fastArityRange(arguments.length, 1, 2) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arityRange(_args, 1, 3, 'slice', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.SLICE);

	  var args = [];
	  args.push(this);
	  args.push(new Term(this._r).expr(start));

	  if ((end !== undefined) && (options !== undefined)) {
	    args.push(new Term(this._r).expr(end));
	    term._fillArgs(args);
	    term._query.push(new Term(this._r).expr(translateOptions(options))._query);
	  }
	  else if ((end !== undefined) && (options === undefined)) {
	    if (helper.isPlainObject(end) === false) {
	      args.push(new Term(this._r).expr(end));
	      term._fillArgs(args);
	    }
	    else {
	      term._fillArgs(args);
	      term._query.push(new Term(this._r).expr(translateOptions(end))._query);
	    }
	  }
	  else { // end and options are both undefined
	    term._fillArgs(args);
	  }
	  return term;
	}
	Term.prototype.nth = function(value) {
	  if (this._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 1, 'nth', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.NTH)
	  var args = [this._query, new Term(this._r).expr(value)]
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.offsetsOf = function(predicate) {
	  if (this._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 1, 'indexesOf', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.OFFSETS_OF)
	  var args = [this, new Term(this._r).expr(predicate)._wrap()];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.indexesOf = Term.prototype.offsetsOf;

	Term.prototype.isEmpty = function() {
	  if (this._fastArity(arguments.length, 0) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 0, 'isEmpty', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.IS_EMPTY)
	  var args = [this];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.union = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}

	  var term = new Term(this._r);
	  term._query.push(termTypes.UNION)
	  var args = [];
	  if (Array.isArray(this._query) && (this._query.length > 0)) {
	    args.push(this);
	  }

	  for(var i=0; i<_args.length; i++) {
	    args.push(new Term(this._r).expr(_args[i]))
	  }
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.sample = function(size) {
	  if (this._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 1, 'sample', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.SAMPLE)
	  var args = [this, new Term(this._r).expr(size)];
	  term._fillArgs(args);
	  return term;
	}

	// Aggregations
	Term.prototype.reduce = function(func) {
	  if (this._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 1, 'reduce', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.REDUCE)
	  var args = [this, new Term(this._r).expr(func)._wrap()];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.count = function(filter) {
	  if (this._fastArityRange(arguments.length, 0, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arityRange(_args, 0, 1, 'count', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.COUNT);
	  var args = [];
	  args.push(this);
	  if (filter !== undefined) {
	    args.push(new Term(this._r).expr(filter)._wrap())
	  }
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.distinct = function(options) {
	  var self= this;
	  if (self._fastArityRange(arguments.length, 0, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    self._arityRange(_args, 0, 1, 'distinct', self);
	  }

	  var term = new Term(self._r);
	  term._query.push(termTypes.DISTINCT)
	  var args = [self];
	  term._fillArgs(args);

	  if (helper.isPlainObject(options)) {
	    var keepGoing = true;
	    helper.loopKeys(options, function(obj, key) {
	      if ((keepGoing === true) && (key !== 'index')) {
	        throw new Error.ReqlDriverError('Unrecognized option `'+key+'` in `distinct`', self._query, 'Available option is index: <string>');
	        keepGoing = false;
	      }
	    });
	    if (keepGoing === true) {
	      term._query.push(new Term(self._r).expr(translateOptions(options))._query);
	    }
	  }

	  return term;
	}
	Term.prototype.group = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  var self = this;
	  self._arityRange(_args, 1, Infinity, 'group', self);

	  var term = new Term(self._r);
	  term._query.push(termTypes.GROUP);
	  var args = [self];
	  for(var i=0; i<_args.length-1; i++) {
	    args.push(new Term(self._r).expr(_args[i])._wrap())
	  }
	  if (_args.length > 0) {
	    if (helper.isPlainObject(_args[_args.length-1])) {
	      helper.loopKeys(_args[_args.length-1], function(obj, key) {
	         if ((key !== 'index')
	        && (key !==  'multi')) {
	          throw new Error.ReqlDriverError('Unrecognized option `'+key+'` in `group`', self._query, 'Available options are index: <string>, multi <boolean>');
	        }
	      });
	      term._fillArgs(args);
	      term._query.push(new Term(self._r).expr(translateOptions(_args[_args.length-1]))._query);
	    }
	    else {
	      args.push(new Term(self._r).expr(_args[_args.length-1])._wrap())
	      term._fillArgs(args);
	    }
	  }
	  else {
	    term._fillArgs(args);
	  }

	  return term;
	}
	Term.prototype.split = function(separator, max) {
	  if (this._fastArityRange(arguments.length, 0, 2) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arityRange(_args, 0, 2, 'split', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.SPLIT)
	  var args = [this];
	  if (separator !== undefined) {
	    args.push(new Term(this._r).expr(separator))
	    if (max !== undefined) {
	      args.push(new Term(this._r).expr(max))
	    }
	  }
	  term._fillArgs(args);

	  return term;
	}

	Term.prototype.ungroup = function() {
	  if (this._fastArity(arguments.length, 0) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 0, 'ungroup', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.UNGROUP)
	  var args = [this._query];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.contains = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  this._arityRange(_args, 1, Infinity, 'contains', this);

	  var term = new Term(this._r);
	  term._query.push(termTypes.CONTAINS)
	  var args = [this._query];
	  for(var i=0; i<_args.length; i++) {
	    args.push(new Term(this._r).expr(_args[i])._wrap())
	  }
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.sum = function(field) {
	  if (this._fastArityRange(arguments.length, 0, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arityRange(_args, 0, 1, 'sum', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.SUM);
	  var args = [this];
	  if (field !== undefined) {
	    args.push(new Term(this._r).expr(field)._wrap())
	  }
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.avg = function(field) {
	  if (this._fastArityRange(arguments.length, 0, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arityRange(_args, 0, 1, 'avg', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.AVG)
	  var args = [this];
	  if (field !== undefined) {
	    args.push(new Term(this._r).expr(field)._wrap())
	  }
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.min = function(field) {
	  if (this._fastArityRange(arguments.length, 0, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arityRange(_args, 0, 1, 'min', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.MIN)
	  var args = [this];
	  if (field !== undefined) {
	    if (helper.isPlainObject(field)) {
	      term._fillArgs(args);
	      term._query.push(new Term(this._r).expr(translateOptions(field))._query);
	    }
	    else {
	      args.push(new Term(this._r).expr(field)._wrap());
	      term._fillArgs(args);
	    }
	  }
	  else {
	    term._fillArgs(args);
	  }
	  return term;
	}
	Term.prototype.max = function(field) {
	  if (this._fastArityRange(arguments.length, 0, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arityRange(_args, 0, 1, 'max', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.MAX)
	  var args = [this];
	  if (field !== undefined) {
	    if (helper.isPlainObject(field)) {
	      term._fillArgs(args);
	      term._query.push(new Term(this._r).expr(translateOptions(field))._query);
	    }
	    else {
	      args.push(new Term(this._r).expr(field)._wrap())
	      term._fillArgs(args);
	    }
	  }
	  else {
	    term._fillArgs(args);
	  }
	  return term;
	}



	// Document manipulation
	Term.prototype.row = function() {
	  this._noPrefix(this, 'row');
	  if (this._fastArity(arguments.length, 0) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 0, 'r.row', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.IMPLICIT_VAR)
	  return term;
	}
	Term.prototype.pluck = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  this._arityRange(_args, 1, Infinity, 'pluck', this);

	  var term = new Term(this._r);
	  term._query.push(termTypes.PLUCK)
	  var args = [this];
	  for(var i=0; i<_args.length; i++) {
	    args.push(new Term(this._r).expr(_args[i]))
	  }
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.without = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  this._arityRange(_args, 1, Infinity, 'without', this);

	  var term = new Term(this._r);
	  term._query.push(termTypes.WITHOUT)
	  var args = [this];
	  for(var i=0; i<_args.length; i++) {
	    args.push(new Term(this._r).expr(_args[i]))
	  }
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.merge = function(arg) {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  this._arityRange(_args, 1, Infinity, 'merge', this);

	  var term = new Term(this._r);
	  term._query.push(termTypes.MERGE)
	  var args = [this];
	  for(var i=0; i<_args.length; i++) {
	    args.push(new Term(this._r).expr(_args[i])._wrap())
	  }
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.literal = function(obj) {
	  this._noPrefix(this, 'literal');
	  // The test for arity is performed in r.literal

	  var term = new Term(this._r);
	  term._query.push(termTypes.LITERAL);
	  if (arguments.length > 0) {
	    var args = [new Term(this._r).expr(obj)];
	    term._fillArgs(args);
	  }
	  return term;
	}
	Term.prototype.append = function(value) {
	  if (this._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 1, 'append', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.APPEND)
	  var args = [this, new Term(this._r).expr(value)];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.prepend = function(value) {
	  if (this._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 1, 'prepend', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.PREPEND)
	  var args = [this, new Term(this._r).expr(value)];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.difference = function(other) {
	  if (this._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 1, 'difference', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.DIFFERENCE)
	  var args = [this, new Term(this._r).expr(other)];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.setInsert = function(other) {
	  if (this._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 1, 'setInsert', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.SET_INSERT)
	  var args = [this, new Term(this._r).expr(other)];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.setUnion = function(other) {
	  if (this._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 1, 'setUnion', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.SET_UNION)
	  var args = [this, new Term(this._r).expr(other)];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.setIntersection = function(other) {
	  if (this._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 1, 'setIntersection', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.SET_INTERSECTION)
	  var args = [this, new Term(this._r).expr(other)];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.setDifference = function(other) {
	  if (this._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 1, 'setDifference', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.SET_DIFFERENCE)
	  var args = [this, new Term(this._r).expr(other)];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.getField = function(field) {
	  if (this._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 1, '(...)', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.GET_FIELD)
	  var args = [this, new Term(this._r).expr(field)];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.bracket = function(field) {
	  if (this._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 1, '(...)', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.BRACKET)
	  var args = [this, new Term(this._r).expr(field)];
	  term._fillArgs(args);
	  return term;
	}

	Term.prototype.hasFields = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  this._arityRange(_args, 1, Infinity, 'hasFields', this);

	  var term = new Term(this._r);
	  term._query.push(termTypes.HAS_FIELDS)
	  var args = [this];
	  for(var i=0; i<_args.length; i++) {
	    args.push(new Term(this._r).expr(_args[i]))
	  }
	  term._fillArgs(args);
	  return term;

	}
	Term.prototype.insertAt = function(index, value) {
	  if (this._fastArity(arguments.length, 2) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 2, 'insertAt', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.INSERT_AT)
	  var args = [this, new Term(this._r).expr(index), new Term(this._r).expr(value)];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.spliceAt = function(index, array) {
	  if (this._fastArityRange(arguments.length, 1, 2) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arityRange(_args, 1, 2, 'spliceAt', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.SPLICE_AT)
	  var args = [this, new Term(this._r).expr(index), new Term(this._r).expr(array)];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.deleteAt = function(start, end) {
	  if (this._fastArityRange(arguments.length, 1, 2) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arityRange(_args, 1, 2, 'deleteAt', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.DELETE_AT);
	  var args = [this, new Term(this._r).expr(start)];
	  if (end !== undefined) {
	    args.push(new Term(this._r).expr(end))
	  }
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.changeAt = function(index, value) {
	  if (this._fastArityRange(arguments.length, 1, 2) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arityRange(_args, 1, 2, 'changeAt', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.CHANGE_AT);
	  var args = [this];
	  args.push(new Term(this._r).expr(index))
	  args.push(new Term(this._r).expr(value))
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.keys = function() {
	  if (this._fastArity(arguments.length, 0) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 0, 'keys', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.KEYS)
	  var args = [this];
	  term._fillArgs(args);
	  return term;
	}

	Term.prototype.values = function() {
	  if (this._fastArity(arguments.length, 0) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 0, 'keys', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.VALUES)
	  var args = [this];
	  term._fillArgs(args);
	  return term;
	}

	Term.prototype.object = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  this._noPrefix(this, 'object');
	  this._arityRange(_args, 0, Infinity, 'object', this);

	  var term = new Term(this._r);
	  term._query.push(termTypes.OBJECT)
	  var args = [];
	  for(var i=0; i<_args.length; i++) {
	    args.push(new Term(this._r).expr(_args[i]))
	  }
	  term._fillArgs(args);
	  return term;
	}



	// String
	Term.prototype.match = function(regex) {
	  if (this._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 1, 'match', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.MATCH)
	  var args = [this, new Term(this._r).expr(regex)];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.upcase = function(regex) {
	  if (this._fastArity(arguments.length, 0) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 0, 'upcase', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.UPCASE)
	  var args = [this];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.downcase = function(regex) {
	  if (this._fastArity(arguments.length, 0) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 0, 'upcase', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.DOWNCASE)
	  var args = [this];
	  term._fillArgs(args);
	  return term;
	}




	// Math and Logic
	Term.prototype.add = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  this._arityRange(_args, 1, Infinity, 'add', this);

	  var term = new Term(this._r);
	  term._query.push(termTypes.ADD)
	  var args = [this];
	  for(var i=0; i<_args.length; i++) {
	    args.push(new Term(this._r).expr(_args[i]))
	  }
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.sub = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  this._arityRange(_args, 1, Infinity, 'sub', this);

	  var term = new Term(this._r);
	  term._query.push(termTypes.SUB)
	  var args = [this];
	  for(var i=0; i<_args.length; i++) {
	    args.push(new Term(this._r).expr(_args[i]))
	  }
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.mul = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  this._arityRange(_args, 1, Infinity, 'mul', this);

	  var term = new Term(this._r);
	  term._query.push(termTypes.MUL)
	  var args = [this];
	  for(var i=0; i<_args.length; i++) {
	    args.push(new Term(this._r).expr(_args[i]))
	  }
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.div = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  this._arityRange(_args, 1, Infinity, 'div', this);

	  var term = new Term(this._r);
	  term._query.push(termTypes.DIV)
	  var args = [this];
	  for(var i=0; i<_args.length; i++) {
	    args.push(new Term(this._r).expr(_args[i]))
	  }
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.mod = function(b) {
	  if (this._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 1, 'mod', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.MOD)
	  var args = [this, new Term(this._r).expr(b)];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.and = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}

	  var term = new Term(this._r);
	  term._query.push(termTypes.AND)
	  var args = [this];
	  for(var i=0; i<_args.length; i++) {
	    args.push(new Term(this._r).expr(_args[i]))
	  }
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.or = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}

	  var term = new Term(this._r);
	  term._query.push(termTypes.OR)
	  var args = [this];
	  for(var i=0; i<_args.length; i++) {
	    args.push(new Term(this._r).expr(_args[i]))
	  }
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.eq = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  this._arityRange(_args, 1, Infinity, 'eq', this);

	  var term = new Term(this._r);
	  term._query.push(termTypes.EQ)
	  var args = [this];
	  for(var i=0; i<_args.length; i++) {
	    args.push(new Term(this._r).expr(_args[i]))
	  }
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.ne = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  this._arityRange(_args, 1, Infinity, 'ne', this);

	  var term = new Term(this._r);
	  term._query.push(termTypes.NE)
	  var args = [this];
	  for(var i=0; i<_args.length; i++) {
	    args.push(new Term(this._r).expr(_args[i]))
	  }
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.gt = function(other) {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  this._arityRange(_args, 1, Infinity, 'gt', this);

	  var term = new Term(this._r);
	  term._query.push(termTypes.GT)
	  var args = [this];
	  for(var i=0; i<_args.length; i++) {
	    args.push(new Term(this._r).expr(_args[i]))
	  }
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.ge = function(other) {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  this._arityRange(_args, 1, Infinity, 'ge', this);

	  var term = new Term(this._r);
	  term._query.push(termTypes.GE)
	  var args = [this];
	  for(var i=0; i<_args.length; i++) {
	    args.push(new Term(this._r).expr(_args[i]))
	  }
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.lt = function(other) {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  this._arityRange(_args, 1, Infinity, 'lt', this);

	  var term = new Term(this._r);
	  term._query.push(termTypes.LT)
	  var args = [this];
	  for(var i=0; i<_args.length; i++) {
	    args.push(new Term(this._r).expr(_args[i]))
	  }
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.le = function(other) {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  this._arityRange(_args, 1, Infinity, 'le', this);

	  var term = new Term(this._r);
	  term._query.push(termTypes.LE)
	  var args = [this];
	  for(var i=0; i<_args.length; i++) {
	    args.push(new Term(this._r).expr(_args[i]))
	  }
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.not = function() {
	  if (this._fastArity(arguments.length, 0) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 0, 'not', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.NOT)
	  var args = [this];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.random = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  var self = this;
	  self._noPrefix(this, 'random');
	  self._arityRange(_args, 0, 3, 'random', self);

	  var term = new Term(self._r);
	  term._query.push(termTypes.RANDOM);

	  var args = [];
	  for(var i=0; i<_args.length-1; i++) {
	    args.push(new Term(self._r).expr(_args[i]))
	  }
	  if (_args.length > 0) {
	    if (helper.isPlainObject(_args[_args.length-1])) {
	      helper.loopKeys(_args[_args.length-1], function(obj, key) {
	        if (key !== 'float') {
	          throw new Error.ReqlDriverError('Unrecognized option `'+key+'` in `random`', self._query, 'Available option is float: <boolean>');
	        }
	      });
	      term._fillArgs(args);
	      term._query.push(new Term(self._r).expr(translateOptions(_args[_args.length-1]))._query);
	    }
	    else {
	      args.push(new Term(self._r).expr(_args[_args.length-1]))
	      term._fillArgs(args);
	    }
	  }
	  else {
	    term._fillArgs(args);
	  }
	  return term;
	}
	Term.prototype.floor = function() {
	  if (this._fastArityRange(arguments.length, 0, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arityRange(_args, 0, 1, 'floor', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.FLOOR)
	  var args = [this];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.ceil = function() {
	  if (this._fastArityRange(arguments.length, 0, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arityRange(_args, 0, 1, 'ceil', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.CEIL)
	  var args = [this];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.round = function() {
	  if (this._fastArityRange(arguments.length, 0, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arityRange(_args, 0, 1, 'round', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.ROUND)
	  var args = [this];
	  term._fillArgs(args);
	  return term;
	}

	// Dates and times
	Term.prototype.now = function() {
	  this._noPrefix(this, 'now');

	  var term = new Term(this._r);
	  term._query.push(termTypes.NOW)
	  return term;
	}
	Term.prototype.time = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  this._noPrefix(this, 'time');
	  // Special check for arity
	  var foundArgs = false;
	  for(var i=0; i<_args.length; i++) {
	    if ((_args[i] instanceof Term) && (_args[i]._query[0] === termTypes.ARGS)) {
	      foundArgs = true;
	      break;
	    }
	  }
	  if (foundArgs === false) {
	    if ((_args.length !== 4) && (_args.length !== 7)) {
	      throw new Error.ReqlDriverError('`r.time` called with '+_args.length+' argument'+((_args.length>1)?'s':''), null, '`r.time` takes 4 or 7 arguments');
	    }
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.TIME)
	  var args = [];
	  for(var i=0; i<_args.length; i++) {
	    args.push(new Term(this._r).expr(_args[i]))
	  }
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.epochTime = function(epochTime) {
	  this._noPrefix(this, 'epochTime');

	  var term = new Term(this._r);
	  term._query.push(termTypes.EPOCH_TIME)
	  var args = [new Term(this._r).expr(epochTime)];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.ISO8601 = function(isoTime, options) {
	  this._noPrefix(this, 'ISO8601');
	  if (this._fastArityRange(arguments.length, 1, 2) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arityRange(_args, 1, 2, 'ISO8601', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.ISO8601)
	  var args = [new Term(this._r).expr(isoTime)._query];
	  term._fillArgs(args);
	  if (helper.isPlainObject(options)) {
	    helper.loopKeys(options, function(obj, key) {
	      if (key !== 'defaultTimezone') {
	        throw new Error.ReqlDriverError('Unrecognized option `'+key+'` in `ISO8601`. Available options are primaryKey <string>, durability <string>, datancenter <string>');
	      }
	    });
	    term._query.push(new Term(this._r).expr(translateOptions(options))._query);
	  }

	  return term;

	  return new ISO8601(this._r, isoTime, options);
	}
	Term.prototype.inTimezone = function(timezone) {
	  if (this._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 1, 'inTimezone', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.IN_TIMEZONE)
	  var args = [this, new Term(this._r).expr(timezone)];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.timezone = function() {
	  if (this._fastArity(arguments.length, 0) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 0, 'timezone', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.TIMEZONE)
	  var args = [this];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.during = function(left, right, options) {
	  if (this._fastArityRange(arguments.length, 2, 3) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arityRange(_args, 2, 3, 'during', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.DURING);
	  var args = [];
	  args.push(this);
	  args.push(new Term(this._r).expr(left));
	  args.push(new Term(this._r).expr(right));

	  term._fillArgs(args);
	  if (helper.isPlainObject(options)) {
	    term._query.push(new Term(this._r).expr(translateOptions(options))._query);
	  }
	  return term;
	}
	Term.prototype.date = function() {
	  if (this._fastArity(arguments.length, 0) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 0, 'date', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.DATE)
	  var args = [this];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.timeOfDay = function() {
	  if (this._fastArity(arguments.length, 0) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 0, 'timeOfDay', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.TIME_OF_DAY)
	  var args = [this];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.year = function() {
	  if (this._fastArity(arguments.length, 0) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 0, 'year', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.YEAR)
	  var args = [this];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.month = function() {
	  if (this._fastArity(arguments.length, 0) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 0, 'month', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.MONTH)
	  var args = [this];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.day = function() {
	  if (this._fastArity(arguments.length, 0) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 0, 'day', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.DAY)
	  var args = [this];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.dayOfYear = function() {
	  if (this._fastArity(arguments.length, 0) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 0, 'dayOfYear', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.DAY_OF_YEAR)
	  var args = [this];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.dayOfWeek = function() {
	  if (this._fastArity(arguments.length, 0) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 0, 'dayOfWeek', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.DAY_OF_WEEK)
	  var args = [this];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.hours = function() {
	  if (this._fastArity(arguments.length, 0) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 0, 'hours', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.HOURS)
	  var args = [this];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.minutes = function() {
	  if (this._fastArity(arguments.length, 0) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 0, 'minutes', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.MINUTES)
	  var args = [this];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.seconds = function() {
	  if (this._fastArity(arguments.length, 0) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 0, 'seconds', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.SECONDS)
	  var args = [this];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.toISO8601 = function() {
	  if (this._fastArity(arguments.length, 0) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 0, 'toISO8601', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.TO_ISO8601)
	  var args = [this];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.toEpochTime = function() {
	  if (this._fastArity(arguments.length, 0) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 0, 'toEpochTime', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.TO_EPOCH_TIME)
	  var args = [this];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.monday = function() {
	  var term = new Term(this._r);
	  term._query.push(termTypes.MONDAY);
	  return term;
	}
	Term.prototype.tuesday = function() {
	  var term = new Term(this._r);
	  term._query.push(termTypes.TUESDAY);
	  return term;
	}
	Term.prototype.wednesday = function() {
	  var term = new Term(this._r);
	  term._query.push(termTypes.WEDNESDAY);
	  return term;
	}
	Term.prototype.thursday = function() {
	  var term = new Term(this._r);
	  term._query.push(termTypes.THURSDAY);
	  return term;
	}
	Term.prototype.friday = function() {
	  var term = new Term(this._r);
	  term._query.push(termTypes.FRIDAY);
	  return term;
	}
	Term.prototype.saturday = function() {
	  var term = new Term(this._r);
	  term._query.push(termTypes.SATURDAY);
	  return term;
	}
	Term.prototype.sunday = function() {
	  var term = new Term(this._r);
	  term._query.push(termTypes.SUNDAY);
	  return term;
	}

	Term.prototype.january = function() {
	  var term = new Term(this._r);
	  term._query.push(termTypes.JANUARY);
	  return term;
	}
	Term.prototype.february = function() {
	  var term = new Term(this._r);
	  term._query.push(termTypes.FEBRUARY);
	  return term;
	}
	Term.prototype.march = function() {
	  var term = new Term(this._r);
	  term._query.push(termTypes.MARCH);
	  return term;
	}
	Term.prototype.april = function() {
	  var term = new Term(this._r);
	  term._query.push(termTypes.APRIL);
	  return term;
	}
	Term.prototype.may = function() {
	  var term = new Term(this._r);
	  term._query.push(termTypes.MAY);
	  return term;
	}
	Term.prototype.june = function() {
	  var term = new Term(this._r);
	  term._query.push(termTypes.JUNE);
	  return term;
	}
	Term.prototype.july = function() {
	  var term = new Term(this._r);
	  term._query.push(termTypes.JULY);
	  return term;
	}
	Term.prototype.august = function() {
	  var term = new Term(this._r);
	  term._query.push(termTypes.AUGUST);
	  return term;
	}
	Term.prototype.september = function() {
	  var term = new Term(this._r);
	  term._query.push(termTypes.SEPTEMBER);
	  return term;
	}
	Term.prototype.october = function() {
	  var term = new Term(this._r);
	  term._query.push(termTypes.OCTOBER);
	  return term;
	}
	Term.prototype.november = function() {
	  var term = new Term(this._r);
	  term._query.push(termTypes.NOVEMBER);
	  return term;
	}
	Term.prototype.december = function() {
	  var term = new Term(this._r);
	  term._query.push(termTypes.DECEMBER);
	  return term;
	}


	Term.prototype.args = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  this._noPrefix(this, 'args');

	  var term = new Term(this._r);
	  term._query.push(termTypes.ARGS);
	  var args = [];
	  for(var i=0; i<_args.length; i++) {
	    args.push(new Term(this._r).expr(_args[i]))
	  }
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.do = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  this._arityRange(_args, 1, Infinity, 'do', this);

	  var term = new Term(this._r);
	  term._query.push(termTypes.FUNCALL);
	  var args = [new Term(this._r).expr(_args[_args.length-1])._wrap()._query];
	  args.push(this);
	  for(var i=0; i<_args.length-1; i++) {
	    args.push(new Term(this._r).expr(_args[i]))
	  }
	  term._fillArgs(args);
	  return term;
	}


	Term.prototype.branch = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  this._arityRange(_args, 2, Infinity, '', this);

	  var term = new Term(this._r);
	  term._query.push(termTypes.BRANCH)
	  var args = [];
	  args.push(this);
	  for(var i=0; i<_len; i++) {
	    args.push(new Term(this._r).expr(_args[i]))
	  }
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.forEach = function(func) {
	  if (this._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 1, 'forEach', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.FOR_EACH);
	  var args = [this, new Term(this._r).expr(func)._wrap()];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.default = function(expression) {
	  if (this._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 1, 'default', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.DEFAULT);
	  var args = [this, new Term(this._r).expr(expression)];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.expr = function(expression, nestingLevel) {
	  var self = this;
	  self._noPrefix(self, 'expr');
	  if (self._fastArityRange(arguments.length, 1, 2) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    self._arityRange(_args, 1, 2, 'expr', self);
	  }

	  // undefined will be caught in the last else
	  var ar, obj;

	  if (expression === undefined) {
	    var error = 'Cannot convert `undefined` with r.expr()';
	    return new Term(self._r, expression, error);
	  }

	  var _nestingLevel = nestingLevel;
	  if (_nestingLevel == null) {
	    _nestingLevel = self._r.nestingLevel;
	  }
	  //if (nestingLevel == null) nestingLevel = self._r.nestingLevel;
	  if (_nestingLevel < 0) throw new Error.ReqlDriverError('Nesting depth limit exceeded.\nYou probably have a circular reference somewhere')

	  if (expression instanceof Term) {
	    return expression;
	  }
	  else if (expression instanceof Function) {
	    return new Func(self._r, expression);
	  }
	  else if (expression instanceof Date) {
	    return new Term(self._r).ISO8601(expression.toISOString())
	  }
	  else if (Array.isArray(expression)) {
	    var term = new Term(self._r);
	    term._query.push(termTypes.MAKE_ARRAY);

	    var args = [];
	    for(var i=0; i<expression.length; i++) {
	      args.push(new Term(self._r).expr(expression[i], _nestingLevel-1))
	    }
	    term._fillArgs(args);
	    return term;
	  }
	  else if (expression instanceof Buffer) {
	    return self._r.binary(expression);
	  }
	  else if (helper.isPlainObject(expression)) {
	    var term = new Term(self._r);
	    var optArgs = {};
	    var foundError = false;
	    helper.loopKeys(expression, function(expression, key) {
	      if (expression[key] !== undefined) {
	        var optArg = new Term(self._r).expr(expression[key], _nestingLevel-1);
	        if (optArg instanceof Term && !foundError && optArg._error != null) {
	          foundError = true;
	          term._error = optArg._error;
	          term._frames = [key].concat(optArg._frames);
	        }
	        optArgs[key] = optArg._query;
	      }
	    });
	    term._query = optArgs;
	    return term;
	  }
	  else { // Primitive
	    if (expression === null) {
	      return new Term(self._r, null, expression);
	    }
	    else if (typeof expression === 'string') {
	      return new Term(self._r, expression);
	    }
	    else if (typeof expression === 'number') {
	      if (expression !== expression) {
	        var error = 'Cannot convert `NaN` to JSON';
	        return new Term(self._r, expression, error);
	      }
	      else if (!isFinite(expression)) {
	        var error = 'Cannot convert `Infinity` to JSON';
	        return new Term(self._r, expression, error);
	      }
	      return new Term(self._r, expression);
	    }
	    else if (typeof expression === 'boolean') {
	      return new Term(self._r, expression);
	    }
	    else {
	      //TODO
	      self._error = new Error.ReqlDriverError('Cannot convert `'+expression+'` to datum.')
	    }
	  }
	  return self;
	}

	Term.prototype.binary = function(bin) {
	  this._noPrefix(this, 'binary');
	  if (this._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 1, 'binary', this);
	  }

	  var term;
	  if (bin instanceof Buffer) {
	    // We could use BINARY, and coerce `bin` to an ASCII string, but that
	    // will break if there is a null char
	    term = new Term(this._r, {
	      $reql_type$: 'BINARY',
	      data: bin.toString('base64')
	    });
	  }
	  else {
	    term = new Term(this._r);
	    term._query.push(termTypes.BINARY)
	    var args = [new Term(this._r).expr(bin)];
	    term._fillArgs(args);
	  }
	  return term;
	}

	Term.prototype.js = function(arg, options) {
	  this._noPrefix(this, 'js');
	  if (this._fastArityRange(arguments.length, 1, 2) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arityRange(_args, 1, 2, 'js', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.JAVASCRIPT)
	  var args = [new Term(this._r).expr(arg)];
	  term._fillArgs(args);

	  if (helper.isPlainObject(options)) {
	    term._query.push(new Term(this._r).expr(translateOptions(options))._query);
	  }
	  return term;
	}
	Term.prototype.coerceTo = function(type) {
	  if (this._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 1, 'coerceTo', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.COERCE_TO)
	  var args = [this, new Term(this._r).expr(type)];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.typeOf = function() {
	  if (this._fastArity(arguments.length, 0) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 0, 'typeOf', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.TYPE_OF);
	  var args = [this];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.info = function() {
	  if (this._fastArity(arguments.length, 0) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 0, 'info', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.INFO);
	  var args = [this];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.json = function(json) {
	  this._noPrefix(this, 'json');
	  if (this._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 1, 'info', this);
	  }
	  /*
	  if ((/\\u0000/.test(json)) || (/\0/.test(json))) {
	    this._error = new Error.ReqlDriverError('The null character is currently not supported by RethinkDB');
	  }
	  */
	  var term = new Term(this._r);
	  term._query.push(termTypes.JSON);

	  var args = [new Term(this._r).expr(json)];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.http = function(url, options) {
	  this._noPrefix(this, 'http');
	  if (this._fastArityRange(arguments.length, 1, 2) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arityRange(_args, 1, 2, 'http', this);
	  }

	  var term = new Term(this._r);
	  term._query.push(termTypes.HTTP);
	  var args = [new Term(this._r).expr(url)];
	  term._fillArgs(args);
	  if (helper.isPlainObject(options)) {
	    helper.loopKeys(options, function(obj, key) {
	      if ((key !== 'timeout')
	        && (key !==  'attempts')
	        && (key !==  'redirects')
	        && (key !==  'verify')
	        && (key !==  'resultFormat')
	        && (key !==  'method')
	        && (key !==  'auth')
	        && (key !==  'params')
	        && (key !==  'header')
	        && (key !==  'data')
	        && (key !==  'page')
	        && (key !==  'pageLimit')
	        && (key !==  '')) {
	        throw new Error.ReqlDriverError('Unrecognized option `'+key+'` in `http`. Available options are attempts <number>, redirects <number>, verify <boolean>, resultFormat: <string>, method: <string>, auth: <object>, params: <object>, header: <string>, data: <string>, page: <string/function>, pageLimit: <number>');
	      }
	    });

	    term._query.push(new Term(this._r).expr(translateOptions(options))._query);
	  }
	  return term;
	}
	Term.prototype.uuid = function(str) {
	  this._noPrefix(this, 'uuid');

	  var term = new Term(this._r);
	  term._query.push(termTypes.UUID)

	  if (str !== undefined) {
	    var args = [new Term(this._r).expr(str)];
	    term._fillArgs(args);
	  }
	  return term;
	}


	Term.prototype.circle = function(center, radius, options) {
	  var self = this;

	  // Arity check is done by r.circle
	  self._noPrefix(self, 'circle');
	  var term = new Term(self._r);
	  term._query.push(termTypes.CIRCLE);
	  var args = [new Term(self._r).expr(center), new Term(self._r).expr(radius)];
	  term._fillArgs(args);

	  if (helper.isPlainObject(options)) {
	    // There is no need to translate here
	    helper.loopKeys(options, function(obj, key) {
	      if ((key !== 'numVertices') && (key !== 'geoSystem') && (key !== 'unit') && (key !== 'fill')) {
	        throw new Error.ReqlDriverError('Unrecognized option `'+key+'` in `circle`', self._query, 'Available options are numVertices <number>, geoSsystem <string>, unit <string> and fill <bool>');
	      }
	    });
	    term._query.push(new Term(self._r).expr(translateOptions(options))._query);
	  }

	  return term;
	}
	Term.prototype.distance = function(geometry, options) {
	  var self = this;
	  if (self._fastArityRange(arguments.length, 1, 2) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    self._arityRange(_args, 1, 2, 'distance', self);
	  }
	  var term = new Term(self._r);
	  term._query.push(termTypes.DISTANCE);
	  var args = [self, new Term(self._r).expr(geometry)];
	  term._fillArgs(args);
	  if (helper.isPlainObject(options)) {
	    helper.loopKeys(options, function(obj, key) {
	      if ((key !== 'geoSystem') && (key !== 'unit')) {
	        throw new Error.ReqlDriverError('Unrecognized option `'+key+'` in `distance`', self._query, 'Available options are geoSystem <string>, unit <string>');
	      }
	    });
	    term._query.push(new Term(self._r).expr(translateOptions(options))._query);
	  }
	  return term;
	}
	Term.prototype.fill = function() {
	  if (this._fastArity(arguments.length, 0) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 0, 'fill', this);
	  }
	  var term = new Term(this._r);
	  term._query.push(termTypes.FILL);
	  var args = [this];
	  term._fillArgs(args);
	  return term;
	}

	Term.prototype.geojson = function(geometry) {
	  if (this._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 1, 'geojson', this);
	  }
	  this._noPrefix(this, 'geojson');
	  var term = new Term(this._r);
	  term._query.push(termTypes.GEOJSON);
	  var args = [new Term(this._r).expr(geometry)];
	  term._fillArgs(args);
	  return term;
	}

	Term.prototype.toGeojson = function() {
	  if (this._fastArity(arguments.length, 0) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 0, 'toGeojson', this);
	  }
	  var term = new Term(this._r);
	  term._query.push(termTypes.TO_GEOJSON);
	  var args = [this];
	  term._fillArgs(args);
	  return term;
	}

	Term.prototype.getIntersecting = function(geometry, options) {
	  if (this._fastArity(arguments.length, 2) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 2, 'getIntersecting', this);
	  }
	  var term = new Term(this._r);
	  term._query.push(termTypes.GET_INTERSECTING);
	  var args = [this, new Term(this._r).expr(geometry)];
	  term._fillArgs(args);
	  if (helper.isPlainObject(options)) {
	    helper.loopKeys(options, function(obj, key) {
	      if (key !== 'index') {
	        throw new Error.ReqlDriverError('Unrecognized option `'+key+'` in `distance`', self._query, 'Available options are index <string>');
	      }
	    });
	    term._query.push(new Term(this._r).expr(translateOptions(options))._query);
	  }
	  return term;
	}

	Term.prototype.getNearest = function(geometry, options) {
	  var self = this;
	  if (self._fastArity(arguments.length, 2) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    self._arity(_args, 2, 'getNearest', self);
	  }
	  var term = new Term(self._r);
	  term._query.push(termTypes.GET_NEAREST);
	  var args = [self, new Term(self._r).expr(geometry)];
	  term._fillArgs(args);
	  if (helper.isPlainObject(options)) {
	    helper.loopKeys(options, function(obj, key) {
	      if ((key !== 'index') && (key !== 'maxResults') && (key !== 'maxDist') && (key !== 'unit') && (key !== 'geoSystem')) {
	        throw new Error.ReqlDriverError('Unrecognized option `'+key+'` in `getNearest`', self._query, 'Available options are index <string>, maxResults <number>, maxDist <number>, unit <string>, geoSystem <string>');
	      }
	    });
	    term._query.push(new Term(self._r).expr(translateOptions(options))._query);
	  }
	  return term;

	}

	Term.prototype.includes = function(geometry) {
	  if (this._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 1, 'includes', this);
	  }
	  var term = new Term(this._r);
	  term._query.push(termTypes.INCLUDES);
	  var args = [this, new Term(this._r).expr(geometry)];
	  term._fillArgs(args);
	  return term;
	}

	Term.prototype.intersects = function(geometry) {
	  if (this._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 1, 'intersects', this);
	  }
	  var term = new Term(this._r);
	  term._query.push(termTypes.INTERSECTS);
	  var args = [this, new Term(this._r).expr(geometry)];
	  term._fillArgs(args);
	  return term;
	}

	Term.prototype.line = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  // Arity check is done by r.line
	  this._noPrefix(this, 'line');

	  var term = new Term(this._r);
	  term._query.push(termTypes.LINE);

	  var args = [];
	  for(var i=0; i<_args.length; i++) {
	    args.push(new Term(this._r).expr(_args[i]))
	  }
	  term._fillArgs(args);
	  return term;
	}

	Term.prototype.point = function(longitude, latitude) {
	  // Arity check is done by r.point
	  this._noPrefix(this, 'point');

	  var term = new Term(this._r);
	  term._query.push(termTypes.POINT);
	  var args = [new Term(this._r).expr(longitude), new Term(this._r).expr(latitude)];
	  term._fillArgs(args);
	  return term;
	}

	Term.prototype.polygon = function() {
	  var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	  // Arity check is done by r.polygon
	  this._noPrefix(this, 'polygon');

	  var term = new Term(this._r);
	  term._query.push(termTypes.POLYGON);

	  var args = [];
	  for(var i=0; i<_args.length; i++) {
	    args.push(new Term(this._r).expr(_args[i]))
	  }
	  term._fillArgs(args);

	  return term;
	}

	Term.prototype.polygonSub = function(geometry) {
	  if (this._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 1, 'polygonSub', this);
	  }
	  var term = new Term(this._r);
	  term._query.push(termTypes.POLYGON_SUB);
	  var args = [this, new Term(this._r).expr(geometry)];
	  term._fillArgs(args);
	  return term;
	}

	Term.prototype.range = function(start, end) {
	  this._noPrefix(this, 'range');
	  if (this._fastArityRange(arguments.length, 1, 2) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arityRange(_args, 1, 2, 'r.range', this);
	  }
	  var term = new Term(this._r);
	  term._query.push(termTypes.RANGE);
	  var args = [];
	  args.push(new Term(this._r).expr(start));
	  if (end !== undefined) {
	    args.push(new Term(this._r).expr(end));
	  }
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.toJsonString = function() {
	  if (this._fastArity(arguments.length, 0) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 0, 'toJSON', this);
	  }
	  var term = new Term(this._r);
	  term._query.push(termTypes.TO_JSON_STRING);
	  var args = [this];
	  term._fillArgs(args);
	  return term;
	}
	Term.prototype.toJSON = Term.prototype.toJsonString;

	Term.prototype.config = function() {
	  if (this._fastArity(arguments.length, 0) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 0, 'config', this);
	  }
	  var term = new Term(this._r);
	  term._query.push(termTypes.CONFIG);
	  var args = [this];
	  term._fillArgs(args);
	  return term;
	}

	Term.prototype.status = function() {
	  if (this._fastArity(arguments.length, 0) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 0, 'status', this);
	  }
	  var term = new Term(this._r);
	  term._query.push(termTypes.STATUS);
	  var args = [this];
	  term._fillArgs(args);
	  return term;
	}

	Term.prototype.wait = function(options) {
	  var self = this;
	  if (self._fastArityRange(arguments.length, 0, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    self._arityRange(_args, 0, 1, 'wait', self);
	  }
	  var term = new Term(self._r);
	  term._query.push(termTypes.WAIT);
	  if (Array.isArray(self._query) && (self._query.length > 0)) {
	    var args = [self];
	    term._fillArgs(args);
	  }
	  if (helper.isPlainObject(options)) {
	    helper.loopKeys(options, function(obj, key) {
	      if ((key !== 'waitFor') && (key !== 'timeout')) {
	        throw new Error.ReqlDriverError('Unrecognized option `'+key+'` in `wait`', self._query, 'Available options are waitFor: <string>, timeout: <number>');
	      }
	    });
	    term._query.push(new Term(self._r).expr(translateOptions(options))._query);
	  }

	  return term;
	}

	Term.prototype.reconfigure = function(config) {
	  var self = this;
	  if (self._fastArity(arguments.length, 1) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    self._arity(_args, 1, 'reconfigure', self);
	  }
	  var term = new Term(self._r);
	  term._query.push(termTypes.RECONFIGURE);

	  if (Array.isArray(this._query) && (this._query.length > 0)) {
	    var args = [this];
	    term._fillArgs(args);
	  }
	  else{
	    term._query.push([]);
	  }
	  if (helper.isPlainObject(config)) {
	    helper.loopKeys(config, function(obj, key) {
	      if ((key !== 'shards') && (key !== 'replicas') &&
	        (key !== 'dryRun') && (key !== 'primaryReplicaTag') &&
	        (key !== 'nonvotingReplicaTags') && (key !== 'emergencyRepair')) {
	        throw new Error.ReqlDriverError('Unrecognized option `'+key+'` in `reconfigure`', self._query, 'Available options are shards: <number>, replicas: <number>, primaryReplicaTag: <object>, dryRun <boolean>, emergencyRepair: <string>, nonvotingReplicaTags: <array<string>>');
	      }
	    });
	    term._query.push(new Term(self._r).expr(translateOptions(config))._query);
	  }
	  else {
	    throw new Error.ReqlDriverError('First argument of `reconfigure` must be an object');
	  }
	  return term;
	}

	Term.prototype.rebalance = function() {
	  if (this._fastArity(arguments.length, 0) === false) {
	    var _len = arguments.length;var _args = new Array(_len); for(var _i = 0; _i < _len; _i++) {_args[_i] = arguments[_i];}
	    this._arity(_args, 0, 'rebalance', this);
	  }
	  var term = new Term(this._r);
	  term._query.push(termTypes.REBALANCE);
	  if (Array.isArray(this._query) && (this._query.length > 0)) {
	    var args = [this];
	    term._fillArgs(args);
	  }
	  return term;
	}


	Term.prototype.then = function(resolve, reject) {
	  return this.run().then(resolve, reject);
	}
	Term.prototype.error = function(reject) {
	  return this.run().error(reject);
	}
	Term.prototype.catch = function(reject) {
	  return this.run().catch(reject);
	}
	Term.prototype.finally = function(handler) {
	  return this.run().finally(handler);
	}


	Term.prototype.toString = function() {
	  return Error.generateBacktrace(this._query, 0, null, [], {indent: 0, extra: 0}).str;
	}

	Term.prototype._wrap = function() {
	  var self = this;
	  if (helper.hasImplicit(this._query)) {
	    if (this._query[0] === termTypes.ARGS) {
	      throw new Error.ReqlDriverError('Implicit variable `r.row` cannot be used inside `r.args`')
	    }
	    //Must pass at least one variable to the function or it won't accept r.row
	    return new Term(this._r).expr(function(doc) { return self; })
	  }
	  else {
	    return self;
	  }
	}

	Term.prototype._fillArgs = function(args) {
	  var foundError = false;
	  var internalArgs = [];
	  for(var i=0; i<args.length; i++) {
	  if (args[i] instanceof Term) {
	    internalArgs.push(args[i]._query);
	    if (!foundError && (args[i]._error != null)) {
	    this._error = args[i]._error;
	    this._frames = args[i]._frames;
	    this._frames.unshift(i);
	    foundError = true;
	    }
	  }
	  else {
	    internalArgs.push(args[i]);
	  }
	  }
	  this._query.push(internalArgs);
	  return this;
	}

	Term.prototype._translateArgs = {
	  returnChanges: 'return_changes',
	  includeInitial: 'include_initial',
	  primaryKey: 'primary_key',
	  readMode: 'read_mode',
	  nonAtomic: 'non_atomic',
	  leftBound: 'left_bound',
	  rightBound: 'right_bound',
	  defaultTimezone: 'default_timezone',
	  noReply: 'noreply',
	  resultFormat: 'result_format',
	  pageLimit: 'page_limit',
	  arrayLimit: 'array_limit',
	  numVertices: 'num_vertices',
	  geoSystem: 'geo_system',
	  maxResults: 'max_results',
	  maxDist: 'max_dist',
	  dryRun: 'dry_run',
	  waitFor: 'wait_for',
	  includeStates: 'include_states',
	  primaryReplicaTag: 'primary_replica_tag',
	  emergencyRepair: 'emergency_repair',
	  minBatchRows: 'min_batch_rows',
	  maxBatchRows: 'max_batch_rows',
	  maxBatchBytes: 'max_batch_bytes',
	  maxBatchSeconds: 'max_batch_seconds',
	  firstBatchScaledownFactor: 'first_batch_scaledown_factor'
	}
	function translateOptions(options) {
	  var translatedOpt = {};
	  helper.loopKeys(options, function(options, key) {
	    var keyServer = Term.prototype._translateArgs[key] || key;
	    translatedOpt[keyServer] = options[key];
	  });
	  return translatedOpt;
	}
	Term.prototype._setNestingLevel = function(nestingLevel) {
	  Term.prototype._nestingLevel = nestingLevel;
	}
	Term.prototype._setArrayLimit = function(arrayLimit) {
	  Term.prototype._arrayLimit = arrayLimit;
	}


	Term.prototype._noPrefix = function(term, method) {
	  if ((!Array.isArray(term._query)) || (term._query.length > 0)) {
	    throw new Error.ReqlDriverError('`'+method+'` is not defined', term._query);
	  }
	}
	Term.prototype._arityRange = function(args, min, max, method, term) {
	  var foundArgs = false;
	  if (args.length < min) {
	    for(var i=0; i<args.length; i++) {
	      if ((args[i] instanceof Term) && (args[i]._query[0] === termTypes.ARGS)) {
	        foundArgs = true;
	        break;
	      }
	    }
	    if (foundArgs === false) {
	      throw new Error.ReqlDriverError('`'+method+'` takes at least '+min+' argument'+((min>1)?'s':'')+', '+args.length+' provided', term._query);
	    }
	  }
	  else if (args.length > max) {
	    for(var i=0; i<args.length; i++) {
	      if ((args[i] instanceof Term) && (args[i]._query[0] === termTypes.ARGS)) {
	        foundArgs = true;
	        break;
	      }
	    }
	    if (foundArgs === false) {
	      throw new Error.ReqlDriverError('`'+method+'` takes at most '+max+' argument'+((max>1)?'s':'')+', '+args.length+' provided', term._query);
	    }
	  }
	}
	Term.prototype._arity = function(args, num, method, term) {
	  var foundArgs = false;
	  for(var i=0; i<args.length; i++) {
	    if ((args[i] instanceof Term) && (args[i]._query[0] === termTypes.ARGS)) {
	      foundArgs = true;
	      break;
	    }
	  }
	  if (foundArgs === false) {
	    throw new Error.ReqlDriverError('`'+method+'` takes '+num+' argument'+((num>1)?'s':'')+', '+args.length+' provided', term._query);
	  }
	}
	// Cheap arity check. If it fails, return false, and then we are expected to call _arity/_arityRange
	Term.prototype._fastArity = function(len, num) {
	  return (len === num);
	}
	Term.prototype._fastArityRange = function(len, min, max) {
	  return ((len >= min) && (len <= max));
	}


	// Datums
	function Func(r, func) {
	  // We can retrieve the names of the arguments with
	  // func.toString().match(/\(([^\)]*)\)/)[1].split(/\s*,\s*/)

	  var term = new Term(r);
	  term._query.push(termTypes.FUNC);
	  var args = [];
	  var argVars = [];
	  var argNums = [];

	  for(var i=0; i<func.length; i++) {
	    argVars.push(new Var(r, r.nextVarId));
	    argNums.push(r.nextVarId);

	    if (r.nextVarId === 9007199254740992) { // That seems like overdoing it... but well maybe...
	      r.nextVarId = 0;
	    }
	    else {
	      r.nextVarId++;
	    }
	  }

	  var body = func.apply(func, argVars)
	  if (body === undefined) throw new Error.ReqlDriverError('Annonymous function returned `undefined`. Did you forget a `return`? In:\n'+func.toString(), this._query);
	  body = new Term(r).expr(body);
	  args.push(new Term(r).expr(argNums));
	  args.push(body);

	  term._fillArgs(args);

	  return term;
	}
	Func.prototype.nextVarId = 1;

	function Var(r, id) {
	  var term = new Term(r);
	  term._query.push(termTypes.VAR)
	  term._query.push([new Term(r).expr(id)._query])
	  return term;
	}

	module.exports = Term;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var Writable = __webpack_require__(49).Writable;
	var Cursor = __webpack_require__(47);
	var util = __webpack_require__(45);

	// Experimental, but should work fine.
	function WritableStream(table, options, connection) {
	  this._table = table;
	  this._options = options;
	  this._cache = [];
	  this._pendingCallback = null;
	  this._inserting = false;
	  this._delayed = false;
	  this._connection = connection;
	  this._highWaterMark = options.highWaterMark || 100;

	  this._insertOptions = {};
	  this._insertOptions.durability = options.durability || 'hard';
	  this._insertOptions.conflict = options.conflict || 'error';

	  // Internal option to run some tests
	  if (options.debug === true) {
	    this._sequence = [];
	  }

	  Writable.call(this, {
	    objectMode: true,
	    highWaterMark: this._highWaterMark
	  });
	  this._i = 0;
	};
	util.inherits(WritableStream, Writable);

	WritableStream.prototype._write = function(value, encoding, done) {
	  this._i++;
	  this._cache.push(value);
	  this._next(value, encoding, done);
	}

	// Everytime we want to insert but do not have a full buffer,
	// we recurse with setImmediate to give a chance to the input
	// stream to push a few more elements
	WritableStream.prototype._next = function(value, encoding, done) {
	  if ((this._writableState.lastBufferedRequest != null) && (this._writableState.lastBufferedRequest.chunk !== value)) {
	    // There's more data to buffer
	    if (this._cache.length < this._highWaterMark) {
	      this._delayed = false;
	      // Call done now, and more data will be put in the cache
	      done();
	    }
	    else {
	      if (this._inserting === false) {
	        if (this._delayed === true) {
	          this._delayed = false;
	          // We have to flush
	          this._insert();
	          // Fill the buffer while we are inserting data
	          done();
	        }
	        else {
	          var self = this;
	          this._delayed = true;
	          setImmediate(function() {
	            self._next(value, encoding, done);
	          })
	        }

	      }
	      else {
	        this._delayed = false;
	        // to call when we are dong inserting to keep buffering
	        this._pendingCallback = done;
	      }
	    }
	  }
	  else { // We just pushed the last element in the internal buffer
	    if (this._inserting === false) {
	      if (this._delayed === true) {
	        this._delayed = false;
	        // to call when we are dong inserting to maybe flag the end
	        // We cannot call done here as we may be inserting the last batch
	        this._pendingCallback = done;
	        this._insert();
	      }
	      else {
	        var self = this;
	        this._delayed = true;
	        setImmediate(function() {
	          self._next(value, encoding, done);
	        })
	      }
	    }
	    else {
	      this._delayed = false;
	      // We cannot call done here as we may be inserting the last batch
	      this._pendingCallback = done;
	    }
	  }
	}

	WritableStream.prototype._insert = function() {
	  var self = this;
	  self._inserting = true;

	  var cache = self._cache;
	  self._cache = [];

	  if (Array.isArray(self._sequence)) {
	    self._sequence.push(cache.length);
	  }

	  self._table.insert(cache, self._insertOptions).run(self._connection).then(function(result) {
	    self._inserting = false;
	    if (result.errors > 0) {
	      self._inserting = false;
	      self.emit('error', new Error('Failed to insert some documents:'+JSON.stringify(result, null, 2)));
	    }
	    if (typeof self._pendingCallback === 'function') {
	      var pendingCallback = self._pendingCallback;
	      self._pendingCallback = null;
	      pendingCallback();
	    }

	  }).error(function(error) {
	    self._inserting = false;
	    self.emit('error', error);
	  });
	}


	module.exports = WritableStream;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var Transform = __webpack_require__(49).Transform;
	var Cursor = __webpack_require__(47);
	var util = __webpack_require__(45);

	// Experimental, but should work fine.
	function TransformStream(table, options, connection) {
	  this._table = table;
	  this._r = table._r;
	  this._options = options;
	  this._cache = [];
	  this._pendingCallback = null;
	  this._ended = false;
	  this._inserting = false;
	  this._delayed = false;
	  this._connection = connection;
	  this._highWaterMark = options.highWaterMark || 100;
	  this._insertOptions = {};
	  this._insertOptions.durability = options.durability || 'hard';
	  this._insertOptions.conflict = options.conflict || 'error';
	  this._insertOptions.returnChanges = options.returnChanges || true;

	  // Internal option to run some tests
	  if (options.debug === true) {
	    this._sequence = [];
	  }

	  Transform.call(this, {
	    objectMode: true,
	    highWaterMark: this._highWaterMark
	  });
	};
	util.inherits(TransformStream, Transform);

	TransformStream.prototype._transform = function(value, encoding, done) {
	  this._cache.push(value);
	  this._next(value, encoding, done);
	}

	// Everytime we want to insert but do not have a full buffer,
	// we recurse with setImmediate to give a chance to the input
	// stream to push a few more elements
	TransformStream.prototype._next = function(value, encoding, done) {
	  if ((this._writableState.lastBufferedRequest != null) && (this._writableState.lastBufferedRequest.chunk !== value)) {
	    // There's more data to buffer
	    if (this._cache.length < this._highWaterMark) {
	      this._delayed = false;
	      // Call done now, and more data will be put in the cache
	      done();
	    }
	    else {
	      if (this._inserting === false) {
	        if (this._delayed === true) {
	          // We have to flush
	          this._delayed = false;
	          this._insert();
	          // Fill the buffer while we are inserting data
	          done();
	        }
	        else {
	          var self = this;
	          this._delayed = true;
	          setImmediate(function() {
	            self._next(value, encoding, done);
	          })
	        }

	      }
	      else {
	        // to call when we are dong inserting to keep buffering
	        this._pendingCallback = done;
	      }
	    }
	  }
	  else { // We just pushed the last element in the internal buffer
	    if (this._inserting === false) {
	      if (this._delayed === true) {
	        this._delayed = false;
	        // to call when we are dong inserting to maybe flag the end
	        this._insert();
	        // We can call done now, because we have _flush to close the stream
	        done();
	      }
	      else {
	        var self = this;
	        this._delayed = true;
	        setImmediate(function() {
	          self._next(value, encoding, done);
	        })
	      }
	    }
	    else {
	      this._delayed = false;
	      // There is nothing left in the internal buffer
	      // But something is already inserting stuff.
	      if (this._cache.length < this._highWaterMark-1) {
	        // Call done, to attempt to buffer more
	        // This may trigger _flush
	        //this._pendingCallback = done;
	        done();
	      }
	      else {
	        this._pendingCallback = done;
	      }
	    }
	  }
	}

	TransformStream.prototype._insert = function() {
	  var self = this;
	  self._inserting = true;

	  var cache = self._cache;
	  self._cache = [];

	  if (Array.isArray(self._sequence)) {
	    self._sequence.push(cache.length);
	  }

	  var pendingCallback = self._pendingCallback;
	  self._pendingCallback = null;
	  if (typeof pendingCallback === 'function') {
	    pendingCallback();
	  }

	  var query = self._table.insert(cache, self._insertOptions);
	  if (self._options.format === 'primaryKey') {
	    query = query.do(function(result) {
	      return self._r.branch(
	        result('errors').eq(0),
	        self._table.config()('primary_key').do(function(primaryKey) {
	          return result('changes')('new_val')(primaryKey)
	        }),
	        result(self._r.error(result('errors').coerceTo('STRING').add(' errors returned. First error:\n').add(result('first_error'))))
	      )
	    })
	  }

	  query.run(self._connection).then(function(result) {
	    self._inserting = false;
	    if (self._options.format === 'primaryKey') {
	      for(var i=0; i<result.length; i++) {
	        self.push(result[i]);
	      }
	    }
	    else {
	      if (result.errors > 0) {
	        self._inserting = false;
	        self.emit('error', new Error('Failed to insert some documents:'+JSON.stringify(result, null, 2)));
	      }
	      else {
	        if (self._insertOptions.returnChanges === true) {
	          for(var i=0; i<result.changes.length; i++) {
	            self.push(result.changes[i].new_val);
	          }
	        }
	      }
	    }

	    pendingCallback = self._pendingCallback
	    self._pendingCallback = null;
	    if (typeof pendingCallback === 'function') {
	      // Mean that we can buffer more
	      pendingCallback();
	    }
	    else if (self._ended !== true) {
	      if (((((self._writableState.lastBufferedRequest === null) ||
	          self._writableState.lastBufferedRequest.chunk === self._cache[self._cache.length-1])))
	        && (self._cache.length > 0)) {
	          self._insert();
	      }
	    }
	    else if (self._ended === true) {
	      if (self._cache.length > 0) {
	        self._insert();
	      }
	      else {
	        if (typeof self._flushCallback === 'function') {
	          self._flushCallback();
	        }
	        self.push(null);
	      }
	    }
	  }).error(function(error) {
	    self._inserting = false;
	    self.emit('error', error);
	  });
	}

	TransformStream.prototype._flush = function(done) {
	  this._ended = true;
	  if ((this._cache.length === 0) && (this._inserting === false)) {
	    done();
	  }
	  else { // this._inserting === true
	    if (this._inserting === false) {
	      this._flushCallback = done;
	      this._insert();
	    }
	    else {
	      this._flushCallback = done;
	    }
	  }
	}


	module.exports = TransformStream;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(45);
	var events = __webpack_require__(44);
	var Promise = __webpack_require__(3);
	var Dequeue = __webpack_require__(55);
	var Pool = __webpack_require__(56);
	var helper = __webpack_require__(39);
	var Err = __webpack_require__(46);
	var UNKNOWN_POOLS = 'unknownPools';
	var SEPARATOR = 'feedSeparator';
	function PoolMaster(r, options) {
	  var self = this;
	  var options = options || {};
	  var lineLength = options.buffer || 50;

	  self._r = r;
	  self._line = new Dequeue(lineLength);
	  self._pools = {};
	  self._pools[UNKNOWN_POOLS] = []; // pools for which we do not know the server'id
	  self._healthyPools = [];
	  self._healthy = false;
	  self._init = false;
	  self._index = 0; // next pool to used
	  self._indexUnknown =  0 // next unknown pool to used
	  self._discovery = (typeof options.discovery === 'boolean') ? options.discovery: false; // Whether the pool master is in discovery mode or not
	  //self._refresh = (typeof options.refresh === 'number') ? options.refresh: 1000*60*60; // Refresh rate for the list of servers
	  self._options = options;
	  self._options.buffer = options.buffer || 50;
	  self._options.max = options.max || 1000;
	  self._log = helper.createLogger(self, options.silent || false);
	  self._draining = false;
	  self._numConnections = 0;
	  self._numAvailableConnections = 0;
	  self._hasPrintWarningLocalhost = false;
	  self._feed = null;
	  self._consecutiveFails = -1;
	  self._timeoutError = options.timeoutError || 1000; // How long should we wait before recreating a connection that failed?
	  self._maxExponent = options.maxExponent || 6; // Maximum timeout is 2^maxExponent*timeoutError

	  //TODO
	  //self._usingPool = true; // If we have used the pool
	  self._seed = 0;

	  var pool;
	  if (Array.isArray(options.servers) && options.servers.length > 0) {
	    self._servers = options.servers;
	    for(var i=0; i<options.servers.length; i++) {
	      var settings = self.createPoolSettings(options, options.servers[i], self._log);
	      pool = new Pool(self._r, settings);
	      self._pools[UNKNOWN_POOLS].push(pool);
	      // A pool is considered healthy by default such that people can do
	      // var = require(...)(); query.run();
	      self._healthyPools.push(pool);
	      self.emitStatus()
	    }
	  }
	  else {
	    self._servers = [{
	      host: options.host || 'localhost',
	      port: options.port || 28015
	    }]
	    var settings = self.createPoolSettings(options, {}, self._log);
	    pool = new Pool(self._r, settings);
	    self._pools[UNKNOWN_POOLS].push(pool);
	    self._healthyPools.push(pool);
	    self.emitStatus()
	  }

	  // Initialize all the pools - bind listeners
	  for(var i=0; i<self._pools[UNKNOWN_POOLS].length; i++) {
	    self.initPool(self._pools[UNKNOWN_POOLS][i]);
	  }
	  if ((self._discovery === true)) {
	    self._timeout = setTimeout(function() { self.fetchServers() }, 0);
	  }
	}
	util.inherits(PoolMaster, events.EventEmitter);

	PoolMaster.prototype.getPools = function() {
	  var result = [];
	  helper.loopKeys(this._pools, function(pools, key) {
	    if (key === UNKNOWN_POOLS) {
	      for(var i=0;i<pools[key].length; i++) {
	        result.push(pools[key][i]);
	      }
	    }
	    else {
	      result.push(pools[key]);
	    }
	  });
	  return result;
	}

	// Reject all promises in this._line
	PoolMaster.prototype._flushErrors = function() {
	  while(this._line.getLength() > 0) {
	    this._line.shift().reject(new Err.ReqlDriverError('None of the pools have an opened connection and failed to open a new one').setOperational());
	    this.emit('queueing', this._line.getLength())
	  }
	}

	PoolMaster.prototype.getConnection = function() {
	  var self = this;
	  // Find a pool with available connections
	  var result;
	  for(var i=0; i<self._healthyPools.length; i++) {
	    if (self._index >= self._healthyPools.length) {
	      self._index = 0;
	    }
	    if (self._healthyPools[self._index].getAvailableLength() > 0) {
	      result = self._healthyPools[self._index].getConnection();
	    }
	    self._index++;
	    if (self._index === self._healthyPools.length) {
	      self._index = 0;
	    }
	    if (result) {
	      return result;
	    }
	  }
	  if (self._healthyPools.length === 0) {
	    return new Promise(function(resolve, reject) {
	      reject(new Err.ReqlDriverError('None of the pools have an opened connection and failed to open a new one').setOperational());
	    });
	  }
	  else {
	    // All pool are busy, buffer the request
	    return new Promise(function(resolve, reject) {
	      self._line.push({
	        resolve: resolve,
	        reject: reject
	      });

	      self.emit('queueing', self._line.getLength())
	      // We could add a condition to be less greedy (for early start)
	      self._expandAll();
	    });

	  }
	}
	PoolMaster.prototype._expandAll = function() {
	  for(var i=0; i<this._healthyPools.length; i++) {
	    this._healthyPools[i]._expandBuffer();
	  }
	}

	// Fetch all the servers once
	PoolMaster.prototype.handleAllServersResponse = function(servers) {
	  var self = this;
	  if (self._draining === true) {
	    return;
	  }
	  // Fill all the known server from RethinkDB
	  var knownServer = {};
	  for(var i=0; i<servers.length; i++) {
	    var server = servers[i];
	    knownServer[server.id] = {count: 0, server: server};
	    if (self._pools[server.id] === undefined) {
	      // We potentially have a new server in the cluster, or we already have a pool for this server
	      // in one of the UNKNOWN_POOLS
	      var found = false;
	      for(var j=0; j<self._pools[UNKNOWN_POOLS].length; j++) {
	        if (found) break;
	        var pool = self._pools[UNKNOWN_POOLS][j]; 
	        // If a pool is created with localhost, it will probably match the first server even though it may not the the one
	        // So it gets an id
	        for(var k=0; k<server.network.canonical_addresses.length; k++) {
	          // Check for the same host (or if they are both localhost) and port
	          if (((server.network.canonical_addresses[k].host === pool.options.connection.host) ||
	               (server.network.hostname === pool.options.connection.host) ||
	            (helper.localhostAliases.hasOwnProperty(server.network.canonical_addresses[k].host) &&
	            helper.localhostAliases.hasOwnProperty(pool.options.connection.host))) &&
	            (server.network.reql_port === pool.options.connection.port)) {

	            self._pools[server.id] = self._pools[UNKNOWN_POOLS].splice(j, 1)[0];
	            // We may assign the wrong pool to this server if it's maching on localhost
	            if (helper.localhostAliases.hasOwnProperty(server.network.canonical_addresses[k].host)) {
	              self._pools[server.id].options.connection.host = helper.getCanonicalAddress(server.network.canonical_addresses).host;
	              if (!helper.getCanonicalAddress(self._pools[server.id].options.connection.host)) {
	                self._pools[server.id].drainLocalhost();
	              }
	            }
	            found = true;
	            break;
	          }
	        }
	      }
	      if (found === false) {
	        // We just found a new server, let's extract the canonical address and connect to it
	        self.createPool(server);
	      }
	    }
	  } // Each server know has a pool

	  // Check if we need to remove pools
	  helper.loopKeys(self._pools, function(pools, key) { // among the pools with a server id
	    if (key !== UNKNOWN_POOLS) {
	      if (knownServer.hasOwnProperty(key) === false) {
	        self.deletePool(key); // We just found a pool that doesn't map to any known RethinkDB server
	      }
	      else {
	        knownServer[key].count++;
	      }
	    }
	  });
	  for(var i=0;i<self._pools[UNKNOWN_POOLS].length; i++) {
	    // These pools does not match any server returned by RethinkDB.
	    var pool = self._pools[UNKNOWN_POOLS].splice(i, 1)[0];
	    self._log('Removing pool connected to: '+pool.getAddress())
	    pool.drain().then(function() {
	      pool.removeAllListeners();
	    }).error(function(error) {
	      self._log('Pool connected to: '+self._pools[UNKNOWN_POOLS][i].getAddress()+' could not be properly drained.')
	      self._log(error.message);
	      self._log(error.stack);
	    });
	  }
	}

	// Create the settings for a given pool. Merge the global options + the servers's one.
	PoolMaster.prototype.createPoolSettings = function(globalOptions, serverOptions, log) {
	  var settings = {};
	  var numServers = Array.isArray(globalOptions.servers) ? globalOptions.servers.length: 1;
	  helper.loopKeys(globalOptions, function(options, key) {
	    if ((key === 'buffer') || (key === 'max')) {
	      settings[key] = Math.ceil(options[key]/numServers);
	      settings[key] = Math.ceil(options[key]/numServers);
	    }
	    else if (key !== 'servers') {
	      settings[key] = options[key];
	    }
	  });
	  if (serverOptions) {
	    helper.loopKeys(serverOptions, function(options, key) {
	      settings[key] = options[key];
	    });
	  }
	  settings._log = log;
	  return settings;
	}

	// Create a new pool
	PoolMaster.prototype.createPool = function(server) {
	  var self = this;
	  var address = helper.getCanonicalAddress(server.network.canonical_addresses);
	  var settings = self.createPoolSettings(self._options, {
	    port: server.network.reql_port,
	    host: address.host
	  }, self._log);
	  var pool = new Pool(self._r, settings);
	  self._pools[server.id] = pool
	  self.initPool(pool);
	  self._healthyPools.push(pool);
	  self.emitStatus()
	  self.resetBufferParameters();
	}

	// Delete a known pool
	PoolMaster.prototype.deletePool = function(key) {
	  var self = this;
	  var pool = self._pools[key];
	  self._log('Removing pool connected to: '+pool.getAddress())
	  pool.drain().then(function() {
	    pool.removeAllListeners();
	  }).error(function(error) {
	    self._log('Pool connected to: '+self._pools[key].getAddress()+' could not be properly drained.')
	    self._log(error.message);
	    self._log(error.stack);
	  });
	  delete self._pools[key];
	  self.resetBufferParameters();
	}

	//  Create the feed on server_status and bind the listener to the feed
	PoolMaster.prototype.fetchServers = function(useSeeds) {
	  var self = this;
	  var query = self._r.db('rethinkdb').table('server_status')
	      .union([SEPARATOR])
	      .union(self._r.db('rethinkdb').table('server_status').changes())
	  // In case useSeeds is true, we rotate through all the seeds + the pool master
	  if (!useSeeds || self._seed === self._servers.length) {
	    if (useSeeds && self._seed === self._servers.length) {
	      // We increase the back off only when we went through all the seeds
	      self._consecutiveFails++;
	    }

	    self._seed = 0;
	    var promise = query.run({cursor: true})
	  }
	  else {
	    var settings = self._servers[self._seed];
	    self._seed++;
	    var promise = self._r.connect(settings).then(function(connection) {
	      return query.run(connection, {cursor: true})
	    });
	  }
	  promise.then(function(feed) {
	    if (self._draining === true) {
	      // There is no need to close the feed here as we'll close the connections
	      return feed.close();
	    }
	    self._feed = feed;
	    var initializing = true;
	    var servers = [];
	    feed.each(function(err, change) {
	      if (err) {
	        self._log('The changefeed on server_status returned an error: '+err.toString());
	        // We have to refetch everything as the server that was serving the feed may
	        // have died.
	        if (!self._draining) {
	          setTimeout(function() {
	            self.fetchServers();
	          }, 0); // Give a timeout to let the driver clean the pools
	        }
	        return;
	      }
	      if (initializing === true) {
	        if (change === SEPARATOR) {
	          initializing = false;
	          self.handleAllServersResponse(servers);
	          // Rerun the whole query after to make sure that a change did not skip/sneak between the union. As long
	          // as RethinkDB does not provide initial results
	          setTimeout(function() {
	            self._r.db('rethinkdb').table('server_status').run({cursor: false}).then(function(servers) {
	              self.handleAllServersResponse(servers);
	            }).error(function(error) {
	              self._log('Fail to retrieve a second copy of server_status');
	              //TODO Retry
	            });
	          }, 1000);
	        }
	        else {
	          servers.push(change);
	        }
	        return;
	      }

	      if (change.new_val !== null && change.old_val === null) {
	        // New server
	        self.createPool(change.new_val);
	      }
	      else if (change.new_val === null && change.old_val !== null) {
	        // A server was removed
	        var server = change.old_val;
	        if (self._pools[server.id] != null) {
	          self.deletePool(server.id);
	        }
	        else {
	          var found = false;
	          for(var i=0; i<self._pools[UNKNOWN_POOLS].length; i++) {
	            if (((server.network.canonical_addresses[k].host === self._pools[UNKNOWN_POOLS][i].options.connection.host) ||
	              (helper.localhostAliases.hasOwnProperty(server.network.canonical_addresses[k].host) && (helper.localhostAliases.hasOwnProperty(self._pools[UNKNOWN_POOLS][i].options.connection.host)))) &&
	              (server.network.reql_port === self._pools[UNKNOWN_POOLS][i].options.connection.port)) {
	              found = true;

	              (function (pool) {
	                self._log('Removing pool connected to: '+pool.getAddress())
	                var pool = self._pools[UNKNOWN_POOLS].splice(i, 1)[0];
	                pool.drain().then(function() {
	                  pool.removeAllListeners();
	                }).error(function(error) {
	                  if (self._options.silent !== true) {
	                    self._log('Pool connected to: '+pool.getAddress()+' could not be properly drained.')
	                    self._log(error.message);
	                    self._log(error.stack);
	                  }
	                });
	              })(self._pools[UNKNOWN_POOLS][i]);
	              break;
	            }
	          }
	        }
	        if (found === false) {
	          self._log('A server was removed but no pool for this server exists...')
	        }
	      }
	      // We ignore this change since this it doesn't affect whether the server
	      // is available or not.
	      // else if (change.new_val !== null && change.old_val !== null) {}
	    });
	    return null;
	  }).error(function(error) {
	    self._log('Could not retrieve the data from server_status: '+JSON.stringify(error));
	    
	    var timeout;
	    if (self._consecutiveFails === -1) {
	      timeout = 0;
	    }
	    else {
	      timeout = (1<<Math.min(self._maxExponent, self._consecutiveFails))*self._timeoutError;
	    }
	    setTimeout(function() {
	      self.fetchServers(true);
	    }, timeout);
	  });
	}

	// Bind listeners on the pools
	PoolMaster.prototype.initPool = function(pool) {
	  var self = this;

	  pool.on('size-diff', function(diff) {
	    self._numConnections += diff;
	    self.emit('size', self._numConnections)
	  });
	  pool.on('available-size-diff', function(diff) {
	    self._numAvailableConnections += diff;
	    self.emit('available-size', self._numAvailableConnections)
	  });

	  pool.on('new-connection', function() {
	    if (self._line.getLength() > 0) {
	      var p = self._line.shift();
	      this.getConnection().then(p.resolve).error(p.reject);
	      self.emit('queueing', self._line.getLength())
	    }
	  });
	  pool.on('not-empty', function() {
	    if (self._draining === false) {
	      var found = false;
	      for(var i=0; i<self._healthyPools.length; i++) {
	        if (self._healthyPools[i] === this) {
	          self._healthyPools.length;
	          found = true;
	          break;
	        }
	      }
	      if (found === false) {
	        self._healthyPools.push(this);
	        self.emitStatus()
	        self.resetBufferParameters();
	      }
	    }
	  });
	  pool.on('empty', function() {
	    // A pool that become empty is considered unhealthy
	    for(var i=0; i<self._healthyPools.length; i++) {
	      if (self._healthyPools[i] === this) {
	        self._healthyPools.splice(i, 1);
	        self.emitStatus()
	        break;
	      }
	    }
	    if (self._healthyPools.length === 0) {
	      self._flushErrors();
	    }

	    self.resetBufferParameters();
	  });
	  pool.on('draining', function() {
	    for(var i=0; i<self._healthyPools.length; i++) {
	      if (self._healthyPools[i] === this) {
	        self._healthyPools.splice(i, 1);
	        self.emitStatus()
	        break;
	      }
	    }

	    if (self._healthyPools === 0) {
	      self._flushErrors();
	    }
	  });
	}

	PoolMaster.prototype.getNumConnections = function() {
	  var sum = 0;
	  for(var i=0; i<this._healthyPools.length; i++) {
	    sum += this._healthyPools[i].getLength();
	  }
	  return sum;
	}
	PoolMaster.prototype.getNumAvailableConnections = function() {
	  var sum = 0;
	  for(var i=0; i<this._healthyPools.length; i++) {
	    sum += this._healthyPools[i].getAvailableLength();
	  }
	  return sum;
	}

	// Reset buffer and max for each pool
	PoolMaster.prototype.resetBufferParameters = function() {
	  var max = Math.floor(this._options.max/this._healthyPools.length)
	  var buffer = Math.floor(this._options.buffer/this._healthyPools.length)
	  for(var i=0; i<this._healthyPools.length; i++) {
	    if (this._healthyPools[i].getLength() > max) {
	      this._healthyPools[i]._extraConnections = this._healthyPools[i].getLength()-max;
	    }
	    else {
	      this._healthyPools[i]._extraConnections = 0;
	    }
	    this._healthyPools[i].options.max = max
	    this._healthyPools[i].options.buffer = buffer;
	  }
	}

	PoolMaster.prototype.getLength = function() {
	  return this._numConnections;
	}
	PoolMaster.prototype.getAvailableLength = function() {
	  return this._numAvailableConnections;
	}

	PoolMaster.prototype.drain = function() {
	  this.emit('draining');
	  if (this._discovery === true) {
	    this._discovery = false;
	    if (this._feed != null) {
	      this._feed.close();
	    }
	  }
	  this._draining = true;
	  var promises = [];
	  var pools = this.getPools();
	  for(var i=0; i<pools.length; i++) {
	    promises.push(pools[i].drain());
	  }
	  this._healthyPools = [];
	  var self = this;
	  return Promise.all(promises).then(function() {
	    for(var i=0; i<pools.length; i++) {
	      pools[i].removeAllListeners();
	    }
	  }).error(function(error) {
	    if (self._options.silent !== true) {
	      self._log('Failed to drain all the pools:');
	      self._log(error.message);
	      self._log(error.stack);
	    }
	  });
	}

	// Emit the healthy event with a boolean indicating whether the pool master
	// is healthy or not
	PoolMaster.prototype.emitStatus = function() {
	  var healthy = this._healthyPools.length !== 0;
	  if (this._healthy !== healthy) {
	    this._healthy = healthy;
	    this.emit('healthy', healthy)
	  }
	}

	module.exports = PoolMaster;


/***/ },
/* 55 */
/***/ function(module, exports) {

	// Implement a dequeue with a circular buffer
	// The buffer can expand but currently doesn't automatically shrink
	// as it is not a desired behavior. We may want to explicitly resize it though.
	function Dequeue(size) {
	  this.start = 0;
	  this.end = 0;

	  size = size || 50;
	  this.buffer = new Array(size);
	}
	Dequeue.prototype.get = function(index) {
	  if (this.start+index > this.buffer.length) {
	    return this.buffer[this.start+index-this.buffer.length]
	  }
	  else {
	    return this.buffer[this.start+index]
	  }
	}

	Dequeue.prototype.toArray = function(index) {
	  var result = [];
	  for(var i=0; i<this.getLength(); i++) {
	    result.push(this.get(i));
	  }
	  return result;
	}

	Dequeue.prototype.delete = function(index) {
	  var current, next;
	  if (this.start+index >= this.buffer.length) {
	    current = this.start+index-this.buffer.length;
	    next = this.start+index-this.buffer.length+1;
	  }
	  else {
	    current = this.start+index;
	    next = this.start+index+1;
	  }

	  for(var i=index; i<(this.buffer.length-index); i++) {
	    if (next === this.buffer.length) next = 0;
	    if (current === this.buffer.length) current = 0;

	    this.buffer[current] = this.buffer[next];
	    current++;
	    next++;
	  }

	  this.end--;
	  if (this.end < 0) this.end = this.buffer.length-1
	}

	Dequeue.prototype.push = function(element) {
	  // push on this.end and then increase this.end
	  // this.end should NEVER be equal to this.buffer.length
	  this.buffer[this.end] = element;
	  this.end++;
	  if (this.end === this.buffer.length) this.end = 0;

	  if (this.start === this.end) {
	    // Resize
	    var previousBuffer = this.buffer;

	    this.buffer = new Array(previousBuffer.length*2);

	    var i, k = 0;
	    for(i=this.start; i<previousBuffer.length; i++) {
	      this.buffer[k++] = previousBuffer[i];
	    }
	    for(i=0; i<this.start; i++) {
	      this.buffer[k++] = previousBuffer[i];
	    }
	    this.start = 0;
	    this.end = previousBuffer.length;
	  }
	}

	Dequeue.prototype.pop = function(element) {
	  //TODO: Decrease size when possible/needed? This may not be
	  //something we really need/want
	  // Return the element in this.end-1
	  if (this.getLength() > 0) {
	    var pos = this.end-1;
	    if (pos < 0) pos = this.buffer.length-1;
	    this.end = pos;
	    return this.buffer[pos];
	  }
	  else {
	    return undefined
	  }
	  var pos = this.end-1;
	  if (pos < 0) pos = this.buffer.length-1;

	  if (this.end !== this.start) {
	    this.end = pos;
	    return this.buffer[pos];
	  }
	  else {
	    return undefined
	  }
	}

	Dequeue.prototype.unshift = function(element) {
	  // push on this.start-1 and then decrease this.start.
	  // this.end should NEVER be equal to this.buffer.length

	  var pos = this.start-1;
	  if (pos < 0) pos = this.buffer.length-1;

	  this.buffer[pos] = element;
	  this.start = pos;

	  if (this.start === this.end) {
	    //Resize
	    var previousBuffer = this.buffer;

	    this.buffer = new Array(previousBuffer.length*2);

	    var i, k = 0;
	    for(i=this.start; i<previousBuffer.length; i++) {
	      this.buffer[k++] = previousBuffer[i];
	    }
	    for(i=0; i<this.start; i++) {
	      this.buffer[k++] = previousBuffer[i];
	    }
	    this.start = 0;
	    this.end = previousBuffer.length;
	  }
	}

	Dequeue.prototype.shift = function() {
	  // Return the element in this.start

	  if (this.getLength() > 0) {
	    var result = this.buffer[this.start];
	    this.start++;
	    if (this.start === this.buffer.length) this.start = 0;
	    return result;
	  }
	}

	Dequeue.prototype.getLength = function() {
	  if (this.start <= this.end) {
	    return this.end-this.start;
	  }
	  else {
	    return this.buffer.length-(this.start-this.end);
	  }
	}

	module.exports = Dequeue;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var Promise = __webpack_require__(3);
	var Dequeue = __webpack_require__(55);
	var helper = __webpack_require__(39);
	var Err = __webpack_require__(46);
	var events = __webpack_require__(44);
	var util = __webpack_require__(45);

	function Pool(r, options) {
	  this._r = r;

	  if (!helper.isPlainObject(options)) options = {};
	  this.options = {};
	  this.options.max = options.max || 1000; // 4000 is about the maximum the kernel can take
	  var buffer = (typeof options.buffer === 'number') ? options.buffer : 50;
	  this.options.buffer = (buffer < this.options.max) ? buffer : this.options.max;
	  this.options.timeoutError = options.timeoutError || 1000; // How long should we wait before recreating a connection that failed?
	  this.options.timeoutGb = options.timeoutGb || 60*60*1000; // Default timeout for TCP connection is 2 hours on Linux, we time out after one hour.
	  this.options.maxExponent = options.maxExponent || 6; // Maximum timeout is 2^maxExponent*timeoutError

	  this.options.silent = options.silent || false;

	  this.options.connection = {
	    host: options.host || this._r._host,
	    port: options.port || this._r._port,
	    db: options.db || this._r._db,
	    timeout: options.timeout || this._r._timeoutConnect,
	    authKey: options.authKey || this._r._authKey,
	    cursor: options.cursor || false,
	    stream: options.stream || false,
	    ssl: options.ssl || false
	  }
	  this._log = options._log;

	  this._pool = new Dequeue(this.options.buffer+1);
	  this._draining = false;
	  this._drainingHandlers = null; // Store the resolve/reject methods once draining is called
	  this._localhostToDrain = 0; // number of connections to "localhost" to remove
	  this._connectionToReplace = 0; // number of connections to "localhost" to remove

	  this._numConnections = 0;
	  this._openingConnections = 0; // Number of connections being opened
	  this._consecutiveFails = 0;   // In slow growth, the number of consecutive failures to open a connection
	  this._slowGrowth = false;     // Opening one connection at a time
	  this._slowlyGrowing = false;  // The next connection to be returned is one opened in slowGrowth mode
	  this._extraConnections = 0; // Number of extra connections being opened that we should eventually close

	  this._empty = true;

	  var self = this;
	  // So we can let the pool master bind listeners
	  setTimeout(function() {
	    if (self._draining === false) {
	      for(var i=0; i<self.options.buffer; i++) {
	        if (self.getLength() < self.options.max) {
	          self.createConnection();
	        }
	      }
	    }
	  }, 0);
	  this.id = Math.floor(Math.random()*100000);
	  this._log('Creating a pool connected to '+this.getAddress());
	}

	util.inherits(Pool, events.EventEmitter);
	/*
	 * Events:
	 *  - draining // when `drain` is called
	 *  - queueing(size of the queue) // the number of queries being beffered changed
	 *  - size(number of connections) // the size of the pool changed
	 *  - available-size(available size) // the number of AVAILABLE conncetions of the pool changed
	 */

	Pool.prototype.getConnection = function() {
	  var self = this;
	  var p = new Promise(function(resolve, reject) {
	    if (self._draining === true) {
	      return reject(new Err.ReqlDriverError('The pool is being drained').setOperational());
	    }

	    var connection = self._pool.pop();
	    self.emit('available-size', self._pool.getLength());
	    self.emit('available-size-diff', -1);

	    if (connection) {
	      clearTimeout(connection.timeout);
	      resolve(connection);
	    }
	    else {
	      if ((self._numConnections === 0) && (self._slowGrowth === true)) {
	        // If the server is down we do not want to buffer the queries
	        return reject(new Err.ReqlDriverError('The pool does not have any opened connections and failed to open a new one').setOperational());
	      }
	    }

	    if (self._slowGrowth === false) {
	      self._expandBuffer();
	    }

	  });
	  return p;
	};

	Pool.prototype._decreaseNumConnections = function() {
	  this._numConnections--;
	  this.emit('size', this._numConnections)
	  this.emit('size-diff', -1)
	  if ((this._drainingHandlers !== null) && (this._numConnections === 0)) {
	    this._drainingHandlers.resolve();
	  }
	  // We do not check for this._empty === false because we want to emit empty if the pool
	  // tries to connect to an unavailable server (such that the master can remove it from the
	  // healthy pool
	  if (this._numConnections === 0) {
	    this._empty = true;
	    this.emit('empty');
	  }
	}
	Pool.prototype._increaseNumConnections = function() {
	  this._numConnections++;
	  this.emit('size', this._numConnections)
	  this.emit('size-diff', 1)
	}


	Pool.prototype.putConnection = function(connection) {
	  var self = this;
	  if (connection.end === false) {
	    // Temporary attempt to fix #192 - this should not happen.
	    return;
	  }
	  if (self._empty === true) {
	    self._empty = false;
	    // We emit not-empty only we have at least one opened connection
	    self.emit('not-empty');
	  }
	  if ((self._localhostToDrain > 0) && (helper.localhostAliases.hasOwnProperty(connection.host))) {
	    self._localhostToDrain--;
	    connection.close();
	    clearTimeout(connection.timeout);
	    self.createConnection();
	  }
	  else if (self._drainingHandlers !== null) {
	    connection.close();
	    clearTimeout(connection.timeout);
	    if (self.getLength() === 0) {
	      self._drainingHandlers.resolve();
	    }
	  }
	  else if (self._extraConnections > 0) {
	    self._extraConnections--;
	    connection.close().error(function(error) {
	      self._log('Fail to properly close a connection. Error:'+JSON.stringify(error));
	    });
	    clearTimeout(connection.timeout);
	  }
	  /*
	  // We let the pool garbage collect these connections
	  else if (self.getAvailableLength()+1 > self.options.buffer) { // +1 for the connection we may put back
	    // Note that because we have available connections here, the pool master has no pending
	    // queries.
	    connection.close().error(function(error) {
	      self._log('Fail to properly close a connection. Error:'+JSON.stringify(error));
	    });
	    clearTimeout(connection.timeout);
	  }
	  */
	  else {
	    self._pool.push(connection);
	    self.emit('available-size', self._pool.getLength());
	    self.emit('available-size-diff', 1);
	    self.emit('new-connection', connection);

	    clearTimeout(connection.timeout);
	    var timeoutCb = function() {
	      if (self._pool.get(0) === connection) {
	        if (self._pool.getLength() > self.options.buffer) {
	          self._pool.shift().close();
	          self.emit('available-size', self._pool.getLength());
	          self.emit('available-size-diff', -1);
	        }
	        else {
	          connection.timeout = setTimeout(timeoutCb, self.options.timeoutGb);
	        }
	      }
	      else {
	        // This should technically never happens
	        connection.timeout = setTimeout(timeoutCb, self.options.timeoutGb);
	      }
	    }
	    connection.timeout = setTimeout(timeoutCb, self.options.timeoutGb);
	  }
	};

	Pool.prototype.createConnection = function() {
	  var self = this;
	  self._increaseNumConnections();
	  self._openingConnections++;

	  self.emit('creating-connection', self);
	  if (self._draining === true) {
	    return; // Do not create a new connection if we are draining the pool.
	  }

	  return self._r.connect(self.options.connection).then(function(connection) {
	    self.emit('created-connection', self);

	    self._openingConnections--;

	    if ((self._slowlyGrowing === false) && (self._slowGrowth === true) && (self._openingConnections === 0)) {
	      self._consecutiveFails++;
	      self._slowlyGrowing = true;
	      self.timeoutReconnect = setTimeout(function() {
	        self.createConnection();
	        //self._expandBuffer();
	      }, (1<<Math.min(self.options.maxExponent, self._consecutiveFails))*self.options.timeoutError);
	    }
	    // Need another flag
	    else if ((self._slowlyGrowing === true) && (self._slowGrowth === true) && (self._consecutiveFails > 0)) {
	      self._log('Exiting slow growth mode');
	      self._consecutiveFails = 0;
	      self._slowGrowth = false;
	      self._slowlyGrowing = false;
	      self._aggressivelyExpandBuffer();
	    }



	    connection.on('error', function(e) {
	      // We are going to close connection, but we don't want another process to use it before
	      // So we remove it from the pool now (if it's inside)
	      self._log('Error emitted by a connection: '+JSON.stringify(error));
	      for(var i=0; i<self.getAvailableLength(); i++) {
	        if (self._pool.get(i) === this) {
	          self._pool.delete(i);
	          self.emit('available-size', self._pool.getLength());
	          self.emit('available-size-diff', -1);
	          break;
	        }
	      }
	      // We want to make sure that it's not going to try to reconnect
	      clearTimeout(connection.timeout);

	      // Not sure what happened here, so let's be safe and close this connection.
	      connection.close().then(function() {
	        self._expandBuffer();
	      }).error(function(e) {
	        // We failed to close this connection, but we removed it from the pool... so err, let's just ignore that.
	        self._expandBuffer();
	      });
	      clearTimeout(connection.timeout);
	    });
	    connection.on('end', function(e) {
	      // The connection was closed by the server, let's clean...
	      for(var i=0; i<self.getAvailableLength(); i++) {
	        if (self._pool.get(i) === this) {
	          self._pool.delete(i);
	          self.emit('available-size', self._pool.getLength());
	          self.emit('available-size-diff', -1);
	          break;
	        }
	      }

	      clearTimeout(connection.timeout);
	      self._decreaseNumConnections();
	      self._expandBuffer();
	    });
	    connection.on('timeout', function() {
	      for(var i=0; i<self.getAvailableLength(); i++) {
	        if (self._pool.get(i) === this) {
	          self._pool.delete(i);
	          self.emit('available-size', self._pool.getLength());
	          self.emit('available-size-diff', -1);
	          break;
	        }
	      }

	      clearTimeout(connection.timeout);
	      self._decreaseNumConnections();
	      self._expandBuffer();
	    });
	    connection.on('release', function() {
	      if (this._isOpen()) self.putConnection(this);
	    });
	    self.putConnection(connection);
	    return null;
	  }).error(function(error) {
	    // We failed to create a connection, we are now going to create connections one by one
	    self._openingConnections--;
	    self._decreaseNumConnections();

	    self._slowGrowth = true;
	    if (self._slowlyGrowing === false) {
	      self._log('Entering slow growth mode');
	    }
	    self._slowlyGrowing = true;

	    // Log an error
	    self._log('Fail to create a new connection for the connection pool. Error:'+JSON.stringify(error));

	    if (self._openingConnections === 0) {
	      self._consecutiveFails++;
	      self.timeoutReconnect = setTimeout(function() {
	        //self._expandBuffer();
	        self.createConnection();
	      }, (1<<Math.min(self.options.maxExponent, self._consecutiveFails))*self.options.timeoutError);
	    }
	  })
	};

	Pool.prototype._aggressivelyExpandBuffer = function() {
	  for(var i=0; i<this.options.buffer; i++) {
	    this._expandBuffer();
	  }
	}
	Pool.prototype._expandBuffer = function() {
	  if ((this._draining === false) &&
	      (this._pool.getLength() < this.options.buffer+this._localhostToDrain) &&
	      (this._numConnections < this.options.max+this._localhostToDrain)) {
	    this.createConnection();
	  }
	}

	Pool.prototype.getLength = function() {
	  return this._numConnections;
	}
	Pool.prototype.getAvailableLength = function() {
	  return this._pool.getLength();
	}

	Pool.prototype.setOptions = function(options) {
	  if (helper.isPlainObject(options)) {
	    for(var key in options) {
	      this.options[key] = options[key];
	    }
	  }
	  return this.options;
	}
	Pool.prototype.drainLocalhost = function() {
	  var self = this;
	  // All the connections are to localhost, let's create new ones (not to localhost)
	  self._connectionToReplace = self._numConnections;
	  ;
	  for(var i=0, numConnections=self._numConnections; i<numConnections; i++) {
	    self.createConnection().finally(function() {
	      self._localhostToDrain++;
	      self._connectionToReplace--;
	      if ((self._connectionToReplace === 0) && (self._localhostToDrain > 0)) {
	        var len = self._pool.getLength();
	        for(var j=0; j<len; j++) {
	          if (self._localhostToDrain === 0) {
	            break;
	          }
	          var _connection = self._pool.shift();
	          if (helper.localhostAliases.hasOwnProperty(_connection.host)) {
	            self._localhostToDrain--;
	            _connection.close();
	            clearTimeout(_connection.timeout);
	          }
	          else {
	            self._pool.push(_connection);
	          }
	        }
	      }

	    });
	  }
	}

	Pool.prototype.drain = function() {
	  var self = this;
	  self._draining = true;
	  self._log('Draining the pool connected to '+this.getAddress());
	  self.emit('draining');
	  var p = new Promise(function(resolve, reject) {
	    var connection = self._pool.pop();
	    self.emit('available-size', self._pool.getLength());
	    self.emit('available-size-diff', -1);
	    while(connection) {
	      connection.close();
	      clearTimeout(connection.timeout);
	      connection = self._pool.pop();
	    }
	    if (self.timeoutReconnect !== undefined) {
	      clearTimeout(self.timeoutReconnect);
	      self.timeoutReconnect = null;
	    }
	    if (self.getLength() === 0) {
	      resolve();
	    }
	    else {
	      self._drainingHandlers = {
	        resolve: resolve,
	        reject: reject
	      }
	    }
	  });
	  return p;
	}


	Pool.prototype.getAddress = function() {
	  return this.options.connection.host+':'+this.options.connection.port;
	}
	module.exports = Pool;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _xyzScannerEs = __webpack_require__(58);

	var _xyzScannerEs2 = _interopRequireDefault(_xyzScannerEs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var fs = __webpack_require__(59);
	var waterfall = __webpack_require__(115);
	// var scan = require('./xyzScanner.es6.js');


	var ProceduriaBuilder = function ProceduriaBuilder() {
	  var builder = {};
	  var rulesJson = fs.readJsonSync('rules.json');
	  builder.rules = rulesJson.files.filter(function (filename) {
	    var filepath = './' + rulesJson.path + '/' + filename;
	    var exists = fs.existsSync(filepath);
	    console.log('filepath', exists, filepath);
	    return exists;
	  }).map(function (filename) {
	    var rule = fs.readJsonSync(rulesJson.path + '/' + filename);
	    return rule;
	  });
	  builder.scan = _xyzScannerEs2.default;
	  builder.make = function () {
	    console.log('make', 'builder.rules', __webpack_require__(45).inspect(builder.rules, { depth: 42 }));
	    waterfall([function (callback) {
	      // builder.rules[0][builder.method]() => {
	      //
	      // }
	      callback(null);
	    }]);
	  };
	  return builder;
	};

	module.exports = ProceduriaBuilder;

/***/ },
/* 58 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var scan = function scan(max, step, callback) {
	  /**
	  * for every x in x, every y in h, every z in d, callback()
	  **/
	  var i = 0;
	  for (var x = 0; x < max; x += step) {
	    for (var y = 0; y < max; y += step) {
	      for (var z = 0; z < max; z += step) {
	        callback(i, { x: x, y: y, z: z });
	        // this.data.push({x, y, z, i})
	        i++;
	      }
	    }
	  }
	};

	exports.default = scan;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var assign = __webpack_require__(60)

	var fse = {}
	var gfs = __webpack_require__(61)

	// attach fs methods to fse
	Object.keys(gfs).forEach(function (key) {
	  fse[key] = gfs[key]
	})

	var fs = fse

	assign(fs, __webpack_require__(68))
	assign(fs, __webpack_require__(77))
	assign(fs, __webpack_require__(74))
	assign(fs, __webpack_require__(80))
	assign(fs, __webpack_require__(95))
	assign(fs, __webpack_require__(100))
	assign(fs, __webpack_require__(101))
	assign(fs, __webpack_require__(103))
	assign(fs, __webpack_require__(104))
	assign(fs, __webpack_require__(111))
	assign(fs, __webpack_require__(112))

	module.exports = fs

	// maintain backwards compatibility for awhile
	var jsonfile = {}
	Object.defineProperty(jsonfile, 'spaces', {
	  get: function () {
	    return fs.spaces // found in ./json
	  },
	  set: function (val) {
	    fs.spaces = val
	  }
	})

	module.exports.jsonfile = jsonfile // so users of fs-extra can modify jsonFile.spaces


/***/ },
/* 60 */
/***/ function(module, exports) {

	// simple mutable assign
	function assign () {
	  var args = [].slice.call(arguments).filter(function (i) { return i })
	  var dest = args.shift()
	  args.forEach(function (src) {
	    Object.keys(src).forEach(function (key) {
	      dest[key] = src[key]
	    })
	  })

	  return dest
	}

	module.exports = assign


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var fs = __webpack_require__(62)
	var polyfills = __webpack_require__(63)
	var legacy = __webpack_require__(66)
	var queue = []

	var util = __webpack_require__(45)

	function noop () {}

	var debug = noop
	if (util.debuglog)
	  debug = util.debuglog('gfs4')
	else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ''))
	  debug = function() {
	    var m = util.format.apply(util, arguments)
	    m = 'GFS4: ' + m.split(/\n/).join('\nGFS4: ')
	    console.error(m)
	  }

	if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || '')) {
	  process.on('exit', function() {
	    debug(queue)
	    __webpack_require__(67).equal(queue.length, 0)
	  })
	}

	module.exports = patch(__webpack_require__(64))
	if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH) {
	  module.exports = patch(fs)
	}

	// Always patch fs.close/closeSync, because we want to
	// retry() whenever a close happens *anywhere* in the program.
	// This is essential when multiple graceful-fs instances are
	// in play at the same time.
	module.exports.close =
	fs.close = (function (fs$close) { return function (fd, cb) {
	  return fs$close.call(fs, fd, function (err) {
	    if (!err)
	      retry()

	    if (typeof cb === 'function')
	      cb.apply(this, arguments)
	  })
	}})(fs.close)

	module.exports.closeSync =
	fs.closeSync = (function (fs$closeSync) { return function (fd) {
	  // Note that graceful-fs also retries when fs.closeSync() fails.
	  // Looks like a bug to me, although it's probably a harmless one.
	  var rval = fs$closeSync.apply(fs, arguments)
	  retry()
	  return rval
	}})(fs.closeSync)

	function patch (fs) {
	  // Everything that references the open() function needs to be in here
	  polyfills(fs)
	  fs.gracefulify = patch
	  fs.FileReadStream = ReadStream;  // Legacy name.
	  fs.FileWriteStream = WriteStream;  // Legacy name.
	  fs.createReadStream = createReadStream
	  fs.createWriteStream = createWriteStream
	  var fs$readFile = fs.readFile
	  fs.readFile = readFile
	  function readFile (path, options, cb) {
	    if (typeof options === 'function')
	      cb = options, options = null

	    return go$readFile(path, options, cb)

	    function go$readFile (path, options, cb) {
	      return fs$readFile(path, options, function (err) {
	        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
	          enqueue([go$readFile, [path, options, cb]])
	        else {
	          if (typeof cb === 'function')
	            cb.apply(this, arguments)
	          retry()
	        }
	      })
	    }
	  }

	  var fs$writeFile = fs.writeFile
	  fs.writeFile = writeFile
	  function writeFile (path, data, options, cb) {
	    if (typeof options === 'function')
	      cb = options, options = null

	    return go$writeFile(path, data, options, cb)

	    function go$writeFile (path, data, options, cb) {
	      return fs$writeFile(path, data, options, function (err) {
	        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
	          enqueue([go$writeFile, [path, data, options, cb]])
	        else {
	          if (typeof cb === 'function')
	            cb.apply(this, arguments)
	          retry()
	        }
	      })
	    }
	  }

	  var fs$appendFile = fs.appendFile
	  if (fs$appendFile)
	    fs.appendFile = appendFile
	  function appendFile (path, data, options, cb) {
	    if (typeof options === 'function')
	      cb = options, options = null

	    return go$appendFile(path, data, options, cb)

	    function go$appendFile (path, data, options, cb) {
	      return fs$appendFile(path, data, options, function (err) {
	        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
	          enqueue([go$appendFile, [path, data, options, cb]])
	        else {
	          if (typeof cb === 'function')
	            cb.apply(this, arguments)
	          retry()
	        }
	      })
	    }
	  }

	  var fs$readdir = fs.readdir
	  fs.readdir = readdir
	  function readdir (path, cb) {
	    return go$readdir(path, cb)

	    function go$readdir () {
	      return fs$readdir(path, function (err, files) {
	        if (files && files.sort)
	          files.sort();  // Backwards compatibility with graceful-fs.

	        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
	          enqueue([go$readdir, [path, cb]])
	        else {
	          if (typeof cb === 'function')
	            cb.apply(this, arguments)
	          retry()
	        }
	      })
	    }
	  }


	  if (process.version.substr(0, 4) === 'v0.8') {
	    var legStreams = legacy(fs)
	    ReadStream = legStreams.ReadStream
	    WriteStream = legStreams.WriteStream
	  }

	  var fs$ReadStream = fs.ReadStream
	  ReadStream.prototype = Object.create(fs$ReadStream.prototype)
	  ReadStream.prototype.open = ReadStream$open

	  var fs$WriteStream = fs.WriteStream
	  WriteStream.prototype = Object.create(fs$WriteStream.prototype)
	  WriteStream.prototype.open = WriteStream$open

	  fs.ReadStream = ReadStream
	  fs.WriteStream = WriteStream

	  function ReadStream (path, options) {
	    if (this instanceof ReadStream)
	      return fs$ReadStream.apply(this, arguments), this
	    else
	      return ReadStream.apply(Object.create(ReadStream.prototype), arguments)
	  }

	  function ReadStream$open () {
	    var that = this
	    open(that.path, that.flags, that.mode, function (err, fd) {
	      if (err) {
	        if (that.autoClose)
	          that.destroy()

	        that.emit('error', err)
	      } else {
	        that.fd = fd
	        that.emit('open', fd)
	        that.read()
	      }
	    })
	  }

	  function WriteStream (path, options) {
	    if (this instanceof WriteStream)
	      return fs$WriteStream.apply(this, arguments), this
	    else
	      return WriteStream.apply(Object.create(WriteStream.prototype), arguments)
	  }

	  function WriteStream$open () {
	    var that = this
	    open(that.path, that.flags, that.mode, function (err, fd) {
	      if (err) {
	        that.destroy()
	        that.emit('error', err)
	      } else {
	        that.fd = fd
	        that.emit('open', fd)
	      }
	    })
	  }

	  function createReadStream (path, options) {
	    return new ReadStream(path, options)
	  }

	  function createWriteStream (path, options) {
	    return new WriteStream(path, options)
	  }

	  var fs$open = fs.open
	  fs.open = open
	  function open (path, flags, mode, cb) {
	    if (typeof mode === 'function')
	      cb = mode, mode = null

	    return go$open(path, flags, mode, cb)

	    function go$open (path, flags, mode, cb) {
	      return fs$open(path, flags, mode, function (err, fd) {
	        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
	          enqueue([go$open, [path, flags, mode, cb]])
	        else {
	          if (typeof cb === 'function')
	            cb.apply(this, arguments)
	          retry()
	        }
	      })
	    }
	  }

	  return fs
	}

	function enqueue (elem) {
	  debug('ENQUEUE', elem[0].name, elem[1])
	  queue.push(elem)
	}

	function retry () {
	  var elem = queue.shift()
	  if (elem) {
	    debug('RETRY', elem[0].name, elem[1])
	    elem[0].apply(null, elem[1])
	  }
	}


/***/ },
/* 62 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var fs = __webpack_require__(64)
	var constants = __webpack_require__(65)

	var origCwd = process.cwd
	var cwd = null
	process.cwd = function() {
	  if (!cwd)
	    cwd = origCwd.call(process)
	  return cwd
	}
	try {
	  process.cwd()
	} catch (er) {}

	var chdir = process.chdir
	process.chdir = function(d) {
	  cwd = null
	  chdir.call(process, d)
	}

	module.exports = patch

	function patch (fs) {
	  // (re-)implement some things that are known busted or missing.

	  // lchmod, broken prior to 0.6.2
	  // back-port the fix here.
	  if (constants.hasOwnProperty('O_SYMLINK') &&
	      process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
	    patchLchmod(fs)
	  }

	  // lutimes implementation, or no-op
	  if (!fs.lutimes) {
	    patchLutimes(fs)
	  }

	  // https://github.com/isaacs/node-graceful-fs/issues/4
	  // Chown should not fail on einval or eperm if non-root.
	  // It should not fail on enosys ever, as this just indicates
	  // that a fs doesn't support the intended operation.

	  fs.chown = chownFix(fs.chown)
	  fs.fchown = chownFix(fs.fchown)
	  fs.lchown = chownFix(fs.lchown)

	  fs.chmod = chownFix(fs.chmod)
	  fs.fchmod = chownFix(fs.fchmod)
	  fs.lchmod = chownFix(fs.lchmod)

	  fs.chownSync = chownFixSync(fs.chownSync)
	  fs.fchownSync = chownFixSync(fs.fchownSync)
	  fs.lchownSync = chownFixSync(fs.lchownSync)

	  fs.chmodSync = chownFix(fs.chmodSync)
	  fs.fchmodSync = chownFix(fs.fchmodSync)
	  fs.lchmodSync = chownFix(fs.lchmodSync)

	  // if lchmod/lchown do not exist, then make them no-ops
	  if (!fs.lchmod) {
	    fs.lchmod = function (path, mode, cb) {
	      process.nextTick(cb)
	    }
	    fs.lchmodSync = function () {}
	  }
	  if (!fs.lchown) {
	    fs.lchown = function (path, uid, gid, cb) {
	      process.nextTick(cb)
	    }
	    fs.lchownSync = function () {}
	  }

	  // on Windows, A/V software can lock the directory, causing this
	  // to fail with an EACCES or EPERM if the directory contains newly
	  // created files.  Try again on failure, for up to 1 second.
	  if (process.platform === "win32") {
	    fs.rename = (function (fs$rename) { return function (from, to, cb) {
	      var start = Date.now()
	      fs$rename(from, to, function CB (er) {
	        if (er
	            && (er.code === "EACCES" || er.code === "EPERM")
	            && Date.now() - start < 1000) {
	          return fs$rename(from, to, CB)
	        }
	        if (cb) cb(er)
	      })
	    }})(fs.rename)
	  }

	  // if read() returns EAGAIN, then just try it again.
	  fs.read = (function (fs$read) { return function (fd, buffer, offset, length, position, callback_) {
	    var callback
	    if (callback_ && typeof callback_ === 'function') {
	      var eagCounter = 0
	      callback = function (er, _, __) {
	        if (er && er.code === 'EAGAIN' && eagCounter < 10) {
	          eagCounter ++
	          return fs$read.call(fs, fd, buffer, offset, length, position, callback)
	        }
	        callback_.apply(this, arguments)
	      }
	    }
	    return fs$read.call(fs, fd, buffer, offset, length, position, callback)
	  }})(fs.read)

	  fs.readSync = (function (fs$readSync) { return function (fd, buffer, offset, length, position) {
	    var eagCounter = 0
	    while (true) {
	      try {
	        return fs$readSync.call(fs, fd, buffer, offset, length, position)
	      } catch (er) {
	        if (er.code === 'EAGAIN' && eagCounter < 10) {
	          eagCounter ++
	          continue
	        }
	        throw er
	      }
	    }
	  }})(fs.readSync)
	}

	function patchLchmod (fs) {
	  fs.lchmod = function (path, mode, callback) {
	    callback = callback || noop
	    fs.open( path
	           , constants.O_WRONLY | constants.O_SYMLINK
	           , mode
	           , function (err, fd) {
	      if (err) {
	        callback(err)
	        return
	      }
	      // prefer to return the chmod error, if one occurs,
	      // but still try to close, and report closing errors if they occur.
	      fs.fchmod(fd, mode, function (err) {
	        fs.close(fd, function(err2) {
	          callback(err || err2)
	        })
	      })
	    })
	  }

	  fs.lchmodSync = function (path, mode) {
	    var fd = fs.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode)

	    // prefer to return the chmod error, if one occurs,
	    // but still try to close, and report closing errors if they occur.
	    var threw = true
	    var ret
	    try {
	      ret = fs.fchmodSync(fd, mode)
	      threw = false
	    } finally {
	      if (threw) {
	        try {
	          fs.closeSync(fd)
	        } catch (er) {}
	      } else {
	        fs.closeSync(fd)
	      }
	    }
	    return ret
	  }
	}

	function patchLutimes (fs) {
	  if (constants.hasOwnProperty("O_SYMLINK")) {
	    fs.lutimes = function (path, at, mt, cb) {
	      fs.open(path, constants.O_SYMLINK, function (er, fd) {
	        cb = cb || noop
	        if (er) return cb(er)
	        fs.futimes(fd, at, mt, function (er) {
	          fs.close(fd, function (er2) {
	            return cb(er || er2)
	          })
	        })
	      })
	    }

	    fs.lutimesSync = function (path, at, mt) {
	      var fd = fs.openSync(path, constants.O_SYMLINK)
	      var ret
	      var threw = true
	      try {
	        ret = fs.futimesSync(fd, at, mt)
	        threw = false
	      } finally {
	        if (threw) {
	          try {
	            fs.closeSync(fd)
	          } catch (er) {}
	        } else {
	          fs.closeSync(fd)
	        }
	      }
	      return ret
	    }

	  } else {
	    fs.lutimes = function (_a, _b, _c, cb) { process.nextTick(cb) }
	    fs.lutimesSync = function () {}
	  }
	}

	function chownFix (orig) {
	  if (!orig) return orig
	  return function (target, uid, gid, cb) {
	    return orig.call(fs, target, uid, gid, function (er, res) {
	      if (chownErOk(er)) er = null
	      cb(er, res)
	    })
	  }
	}

	function chownFixSync (orig) {
	  if (!orig) return orig
	  return function (target, uid, gid) {
	    try {
	      return orig.call(fs, target, uid, gid)
	    } catch (er) {
	      if (!chownErOk(er)) throw er
	    }
	  }
	}

	// ENOSYS means that the fs doesn't support the op. Just ignore
	// that, because it doesn't matter.
	//
	// if there's no getuid, or if getuid() is something other
	// than 0, and the error is EINVAL or EPERM, then just ignore
	// it.
	//
	// This specific case is a silent failure in cp, install, tar,
	// and most other unix tools that manage permissions.
	//
	// When running as root, or if other types of errors are
	// encountered, then it's strict.
	function chownErOk (er) {
	  if (!er)
	    return true

	  if (er.code === "ENOSYS")
	    return true

	  var nonroot = !process.getuid || process.getuid() !== 0
	  if (nonroot) {
	    if (er.code === "EINVAL" || er.code === "EPERM")
	      return true
	  }

	  return false
	}


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var fs = __webpack_require__(62)

	module.exports = clone(fs)

	function clone (obj) {
	  if (obj === null || typeof obj !== 'object')
	    return obj

	  if (obj instanceof Object)
	    var copy = { __proto__: obj.__proto__ }
	  else
	    var copy = Object.create(null)

	  Object.getOwnPropertyNames(obj).forEach(function (key) {
	    Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key))
	  })

	  return copy
	}


/***/ },
/* 65 */
/***/ function(module, exports) {

	module.exports = require("constants");

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var Stream = __webpack_require__(49).Stream

	module.exports = legacy

	function legacy (fs) {
	  return {
	    ReadStream: ReadStream,
	    WriteStream: WriteStream
	  }

	  function ReadStream (path, options) {
	    if (!(this instanceof ReadStream)) return new ReadStream(path, options);

	    Stream.call(this);

	    var self = this;

	    this.path = path;
	    this.fd = null;
	    this.readable = true;
	    this.paused = false;

	    this.flags = 'r';
	    this.mode = 438; /*=0666*/
	    this.bufferSize = 64 * 1024;

	    options = options || {};

	    // Mixin options into this
	    var keys = Object.keys(options);
	    for (var index = 0, length = keys.length; index < length; index++) {
	      var key = keys[index];
	      this[key] = options[key];
	    }

	    if (this.encoding) this.setEncoding(this.encoding);

	    if (this.start !== undefined) {
	      if ('number' !== typeof this.start) {
	        throw TypeError('start must be a Number');
	      }
	      if (this.end === undefined) {
	        this.end = Infinity;
	      } else if ('number' !== typeof this.end) {
	        throw TypeError('end must be a Number');
	      }

	      if (this.start > this.end) {
	        throw new Error('start must be <= end');
	      }

	      this.pos = this.start;
	    }

	    if (this.fd !== null) {
	      process.nextTick(function() {
	        self._read();
	      });
	      return;
	    }

	    fs.open(this.path, this.flags, this.mode, function (err, fd) {
	      if (err) {
	        self.emit('error', err);
	        self.readable = false;
	        return;
	      }

	      self.fd = fd;
	      self.emit('open', fd);
	      self._read();
	    })
	  }

	  function WriteStream (path, options) {
	    if (!(this instanceof WriteStream)) return new WriteStream(path, options);

	    Stream.call(this);

	    this.path = path;
	    this.fd = null;
	    this.writable = true;

	    this.flags = 'w';
	    this.encoding = 'binary';
	    this.mode = 438; /*=0666*/
	    this.bytesWritten = 0;

	    options = options || {};

	    // Mixin options into this
	    var keys = Object.keys(options);
	    for (var index = 0, length = keys.length; index < length; index++) {
	      var key = keys[index];
	      this[key] = options[key];
	    }

	    if (this.start !== undefined) {
	      if ('number' !== typeof this.start) {
	        throw TypeError('start must be a Number');
	      }
	      if (this.start < 0) {
	        throw new Error('start must be >= zero');
	      }

	      this.pos = this.start;
	    }

	    this.busy = false;
	    this._queue = [];

	    if (this.fd === null) {
	      this._open = fs.open;
	      this._queue.push([this._open, this.path, this.flags, this.mode, undefined]);
	      this.flush();
	    }
	  }
	}


/***/ },
/* 67 */
/***/ function(module, exports) {

	module.exports = require("assert");

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  copy: __webpack_require__(69)
	}


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var fs = __webpack_require__(61)
	var path = __webpack_require__(70)
	var ncp = __webpack_require__(71)
	var mkdir = __webpack_require__(74)

	function copy (src, dest, options, callback) {
	  if (typeof options === 'function' && !callback) {
	    callback = options
	    options = {}
	  } else if (typeof options === 'function' || options instanceof RegExp) {
	    options = {filter: options}
	  }
	  callback = callback || function () {}
	  options = options || {}

	  // don't allow src and dest to be the same
	  var basePath = process.cwd()
	  var currentPath = path.resolve(basePath, src)
	  var targetPath = path.resolve(basePath, dest)
	  if (currentPath === targetPath) return callback(new Error('Source and destination must not be the same.'))

	  fs.lstat(src, function (err, stats) {
	    if (err) return callback(err)

	    var dir = null
	    if (stats.isDirectory()) {
	      var parts = dest.split(path.sep)
	      parts.pop()
	      dir = parts.join(path.sep)
	    } else {
	      dir = path.dirname(dest)
	    }

	    fs.exists(dir, function (dirExists) {
	      if (dirExists) return ncp(src, dest, options, callback)
	      mkdir.mkdirs(dir, function (err) {
	        if (err) return callback(err)
	        ncp(src, dest, options, callback)
	      })
	    })
	  })
	}

	module.exports = copy


/***/ },
/* 70 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	// imported from ncp (this is temporary, will rewrite)

	var fs = __webpack_require__(61)
	var path = __webpack_require__(70)
	var utimes = __webpack_require__(72)

	function ncp (source, dest, options, callback) {
	  if (!callback) {
	    callback = options
	    options = {}
	  }

	  var basePath = process.cwd()
	  var currentPath = path.resolve(basePath, source)
	  var targetPath = path.resolve(basePath, dest)

	  var filter = options.filter
	  var transform = options.transform
	  var clobber = options.clobber !== false
	  var dereference = options.dereference
	  var preserveTimestamps = options.preserveTimestamps === true

	  var errs = null

	  var started = 0
	  var finished = 0
	  var running = 0
	  // this is pretty useless now that we're using graceful-fs
	  // consider removing
	  var limit = options.limit || 512

	  startCopy(currentPath)

	  function startCopy (source) {
	    started++
	    if (filter) {
	      if (filter instanceof RegExp) {
	        if (!filter.test(source)) {
	          return doneOne(true)
	        }
	      } else if (typeof filter === 'function') {
	        if (!filter(source)) {
	          return doneOne(true)
	        }
	      }
	    }
	    return getStats(source)
	  }

	  function getStats (source) {
	    var stat = dereference ? fs.stat : fs.lstat
	    if (running >= limit) {
	      return setImmediate(function () {
	        getStats(source)
	      })
	    }
	    running++
	    stat(source, function (err, stats) {
	      if (err) return onError(err)

	      // We need to get the mode from the stats object and preserve it.
	      var item = {
	        name: source,
	        mode: stats.mode,
	        mtime: stats.mtime, // modified time
	        atime: stats.atime, // access time
	        stats: stats // temporary
	      }

	      if (stats.isDirectory()) {
	        return onDir(item)
	      } else if (stats.isFile() || stats.isCharacterDevice() || stats.isBlockDevice()) {
	        return onFile(item)
	      } else if (stats.isSymbolicLink()) {
	        // Symlinks don't really need to know about the mode.
	        return onLink(source)
	      }
	    })
	  }

	  function onFile (file) {
	    var target = file.name.replace(currentPath, targetPath)
	    isWritable(target, function (writable) {
	      if (writable) {
	        copyFile(file, target)
	      } else {
	        if (clobber) {
	          rmFile(target, function () {
	            copyFile(file, target)
	          })
	        } else {
	          doneOne()
	        }
	      }
	    })
	  }

	  function copyFile (file, target) {
	    var readStream = fs.createReadStream(file.name)
	    var writeStream = fs.createWriteStream(target, { mode: file.mode })

	    readStream.on('error', onError)
	    writeStream.on('error', onError)

	    if (transform) {
	      transform(readStream, writeStream, file)
	    } else {
	      writeStream.on('open', function () {
	        readStream.pipe(writeStream)
	      })
	    }

	    writeStream.once('finish', function () {
	      fs.chmod(target, file.mode, function (err) {
	        if (err) return onError(err)
	        if (preserveTimestamps) {
	          utimes.utimesMillis(target, file.atime, file.mtime, function (err) {
	            if (err) return onError(err)
	            return doneOne()
	          })
	        } else {
	          doneOne()
	        }
	      })
	    })
	  }

	  function rmFile (file, done) {
	    fs.unlink(file, function (err) {
	      if (err) return onError(err)
	      return done()
	    })
	  }

	  function onDir (dir) {
	    var target = dir.name.replace(currentPath, targetPath)
	    isWritable(target, function (writable) {
	      if (writable) {
	        return mkDir(dir, target)
	      }
	      copyDir(dir.name)
	    })
	  }

	  function mkDir (dir, target) {
	    fs.mkdir(target, dir.mode, function (err) {
	      if (err) return onError(err)
	      // despite setting mode in fs.mkdir, doesn't seem to work
	      // so we set it here.
	      fs.chmod(target, dir.mode, function (err) {
	        if (err) return onError(err)
	        copyDir(dir.name)
	      })
	    })
	  }

	  function copyDir (dir) {
	    fs.readdir(dir, function (err, items) {
	      if (err) return onError(err)
	      items.forEach(function (item) {
	        startCopy(path.join(dir, item))
	      })
	      return doneOne()
	    })
	  }

	  function onLink (link) {
	    var target = link.replace(currentPath, targetPath)
	    fs.readlink(link, function (err, resolvedPath) {
	      if (err) return onError(err)
	      checkLink(resolvedPath, target)
	    })
	  }

	  function checkLink (resolvedPath, target) {
	    if (dereference) {
	      resolvedPath = path.resolve(basePath, resolvedPath)
	    }
	    isWritable(target, function (writable) {
	      if (writable) {
	        return makeLink(resolvedPath, target)
	      }
	      fs.readlink(target, function (err, targetDest) {
	        if (err) return onError(err)

	        if (dereference) {
	          targetDest = path.resolve(basePath, targetDest)
	        }
	        if (targetDest === resolvedPath) {
	          return doneOne()
	        }
	        return rmFile(target, function () {
	          makeLink(resolvedPath, target)
	        })
	      })
	    })
	  }

	  function makeLink (linkPath, target) {
	    fs.symlink(linkPath, target, function (err) {
	      if (err) return onError(err)
	      return doneOne()
	    })
	  }

	  function isWritable (path, done) {
	    fs.lstat(path, function (err) {
	      if (err) {
	        if (err.code === 'ENOENT') return done(true)
	        return done(false)
	      }
	      return done(false)
	    })
	  }

	  function onError (err) {
	    if (options.stopOnError) {
	      return callback(err)
	    } else if (!errs && options.errs) {
	      errs = fs.createWriteStream(options.errs)
	    } else if (!errs) {
	      errs = []
	    }
	    if (typeof errs.write === 'undefined') {
	      errs.push(err)
	    } else {
	      errs.write(err.stack + '\n\n')
	    }
	    return doneOne()
	  }

	  function doneOne (skipped) {
	    if (!skipped) running--
	    finished++
	    if ((started === finished) && (running === 0)) {
	      if (callback !== undefined) {
	        return errs ? callback(errs) : callback(null)
	      }
	    }
	  }
	}

	module.exports = ncp


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var fs = __webpack_require__(61)
	var path = __webpack_require__(70)
	var os = __webpack_require__(73)

	// HFS, ext{2,3}, FAT do not, Node.js v0.10 does not
	function hasMillisResSync () {
	  var tmpfile = path.join('millis-test-sync' + Date.now().toString() + Math.random().toString().slice(2))
	  tmpfile = path.join(os.tmpdir(), tmpfile)

	  // 550 millis past UNIX epoch
	  var d = new Date(1435410243862)
	  fs.writeFileSync(tmpfile, 'https://github.com/jprichardson/node-fs-extra/pull/141')
	  var fd = fs.openSync(tmpfile, 'r+')
	  fs.futimesSync(fd, d, d)
	  fs.closeSync(fd)
	  return fs.statSync(tmpfile).mtime > 1435410243000
	}

	function hasMillisRes (callback) {
	  var tmpfile = path.join('millis-test' + Date.now().toString() + Math.random().toString().slice(2))
	  tmpfile = path.join(os.tmpdir(), tmpfile)

	  // 550 millis past UNIX epoch
	  var d = new Date(1435410243862)
	  fs.writeFile(tmpfile, 'https://github.com/jprichardson/node-fs-extra/pull/141', function (err) {
	    if (err) return callback(err)
	    fs.open(tmpfile, 'r+', function (err, fd) {
	      if (err) return callback(err)
	      fs.futimes(fd, d, d, function (err) {
	        if (err) return callback(err)
	        fs.close(fd, function (err) {
	          if (err) return callback(err)
	          fs.stat(tmpfile, function (err, stats) {
	            if (err) return callback(err)
	            callback(null, stats.mtime > 1435410243000)
	          })
	        })
	      })
	    })
	  })
	}

	function timeRemoveMillis (timestamp) {
	  if (typeof timestamp === 'number') {
	    return Math.floor(timestamp / 1000) * 1000
	  } else if (timestamp instanceof Date) {
	    return new Date(Math.floor(timestamp.getTime() / 1000) * 1000)
	  } else {
	    throw new Error('fs-extra: timeRemoveMillis() unknown parameter type')
	  }
	}

	function utimesMillis (path, atime, mtime, callback) {
	  // if (!HAS_MILLIS_RES) return fs.utimes(path, atime, mtime, callback)
	  fs.open(path, 'r+', function (err, fd) {
	    if (err) return callback(err)
	    fs.futimes(fd, atime, mtime, function (err) {
	      if (err) return callback(err)
	      fs.close(fd, callback)
	    })
	  })
	}

	module.exports = {
	  hasMillisRes: hasMillisRes,
	  hasMillisResSync: hasMillisResSync,
	  timeRemoveMillis: timeRemoveMillis,
	  utimesMillis: utimesMillis
	}


/***/ },
/* 73 */
/***/ function(module, exports) {

	module.exports = require("os");

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  mkdirs: __webpack_require__(75),
	  mkdirsSync: __webpack_require__(76),
	  // alias
	  mkdirp: __webpack_require__(75),
	  mkdirpSync: __webpack_require__(76),
	  ensureDir: __webpack_require__(75),
	  ensureDirSync: __webpack_require__(76)
	}


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var fs = __webpack_require__(61)
	var path = __webpack_require__(70)

	var o777 = parseInt('0777', 8)

	function mkdirs (p, opts, callback, made) {
	  if (typeof opts === 'function') {
	    callback = opts
	    opts = {}
	  } else if (!opts || typeof opts !== 'object') {
	    opts = { mode: opts }
	  }

	  var mode = opts.mode
	  var xfs = opts.fs || fs

	  if (mode === undefined) {
	    mode = o777 & (~process.umask())
	  }
	  if (!made) made = null

	  callback = callback || function () {}
	  p = path.resolve(p)

	  xfs.mkdir(p, mode, function (er) {
	    if (!er) {
	      made = made || p
	      return callback(null, made)
	    }
	    switch (er.code) {
	      case 'ENOENT':
	        if (path.dirname(p) === p) return callback(er)
	        mkdirs(path.dirname(p), opts, function (er, made) {
	          if (er) callback(er, made)
	          else mkdirs(p, opts, callback, made)
	        })
	        break

	      // In the case of any other error, just see if there's a dir
	      // there already.  If so, then hooray!  If not, then something
	      // is borked.
	      default:
	        xfs.stat(p, function (er2, stat) {
	          // if the stat fails, then that's super weird.
	          // let the original error be the failure reason.
	          if (er2 || !stat.isDirectory()) callback(er, made)
	          else callback(null, made)
	        })
	        break
	    }
	  })
	}

	module.exports = mkdirs


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var fs = __webpack_require__(61)
	var path = __webpack_require__(70)

	var o777 = parseInt('0777', 8)

	function mkdirsSync (p, opts, made) {
	  if (!opts || typeof opts !== 'object') {
	    opts = { mode: opts }
	  }

	  var mode = opts.mode
	  var xfs = opts.fs || fs

	  if (mode === undefined) {
	    mode = o777 & (~process.umask())
	  }
	  if (!made) made = null

	  p = path.resolve(p)

	  try {
	    xfs.mkdirSync(p, mode)
	    made = made || p
	  } catch (err0) {
	    switch (err0.code) {
	      case 'ENOENT' :
	        made = mkdirsSync(path.dirname(p), opts, made)
	        mkdirsSync(p, opts, made)
	        break

	      // In the case of any other error, just see if there's a dir
	      // there already.  If so, then hooray!  If not, then something
	      // is borked.
	      default:
	        var stat
	        try {
	          stat = xfs.statSync(p)
	        } catch (err1) {
	          throw err0
	        }
	        if (!stat.isDirectory()) throw err0
	        break
	    }
	  }

	  return made
	}

	module.exports = mkdirsSync


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  copySync: __webpack_require__(78)
	}


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var fs = __webpack_require__(61)
	var path = __webpack_require__(70)
	var copyFileSync = __webpack_require__(79)
	var mkdir = __webpack_require__(74)

	function copySync (src, dest, options) {
	  if (typeof options === 'function' || options instanceof RegExp) {
	    options = {filter: options}
	  }

	  options = options || {}
	  options.recursive = !!options.recursive

	  // default to true for now
	  options.clobber = 'clobber' in options ? !!options.clobber : true
	  options.preserveTimestamps = 'preserveTimestamps' in options ? !!options.preserveTimestamps : false

	  options.filter = options.filter || function () { return true }

	  var stats = options.recursive ? fs.lstatSync(src) : fs.statSync(src)
	  var destFolder = path.dirname(dest)
	  var destFolderExists = fs.existsSync(destFolder)
	  var performCopy = false

	  if (stats.isFile()) {
	    if (options.filter instanceof RegExp) performCopy = options.filter.test(src)
	    else if (typeof options.filter === 'function') performCopy = options.filter(src)

	    if (performCopy) {
	      if (!destFolderExists) mkdir.mkdirsSync(destFolder)
	      copyFileSync(src, dest, {clobber: options.clobber, preserveTimestamps: options.preserveTimestamps})
	    }
	  } else if (stats.isDirectory()) {
	    if (!fs.existsSync(dest)) mkdir.mkdirsSync(dest)
	    var contents = fs.readdirSync(src)
	    contents.forEach(function (content) {
	      var opts = options
	      opts.recursive = true
	      copySync(path.join(src, content), path.join(dest, content), opts)
	    })
	  } else if (options.recursive && stats.isSymbolicLink()) {
	    var srcPath = fs.readlinkSync(src)
	    fs.symlinkSync(srcPath, dest)
	  }
	}

	module.exports = copySync


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var fs = __webpack_require__(61)

	var BUF_LENGTH = 64 * 1024
	var _buff = new Buffer(BUF_LENGTH)

	function copyFileSync (srcFile, destFile, options) {
	  var clobber = options.clobber
	  var preserveTimestamps = options.preserveTimestamps

	  if (fs.existsSync(destFile)) {
	    if (clobber) {
	      fs.chmodSync(destFile, parseInt('777', 8))
	      fs.unlinkSync(destFile)
	    } else {
	      throw Error('EEXIST')
	    }
	  }

	  var fdr = fs.openSync(srcFile, 'r')
	  var stat = fs.fstatSync(fdr)
	  var fdw = fs.openSync(destFile, 'w', stat.mode)
	  var bytesRead = 1
	  var pos = 0

	  while (bytesRead > 0) {
	    bytesRead = fs.readSync(fdr, _buff, 0, BUF_LENGTH, pos)
	    fs.writeSync(fdw, _buff, 0, bytesRead)
	    pos += bytesRead
	  }

	  if (preserveTimestamps) {
	    fs.futimesSync(fdw, stat.atime, stat.mtime)
	  }

	  fs.closeSync(fdr)
	  fs.closeSync(fdw)
	}

	module.exports = copyFileSync


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var rimraf = __webpack_require__(81)

	function removeSync (dir) {
	  return rimraf.sync(dir)
	}

	function remove (dir, callback) {
	  return callback ? rimraf(dir, callback) : rimraf(dir, function () {})
	}

	module.exports = {
	  remove: remove,
	  removeSync: removeSync
	}


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = rimraf
	rimraf.sync = rimrafSync

	var assert = __webpack_require__(67)
	var path = __webpack_require__(70)
	var fs = __webpack_require__(62)
	var glob = __webpack_require__(82)

	var defaultGlobOpts = {
	  nosort: true,
	  silent: true
	}

	// for EMFILE handling
	var timeout = 0

	var isWindows = (process.platform === "win32")

	function defaults (options) {
	  var methods = [
	    'unlink',
	    'chmod',
	    'stat',
	    'lstat',
	    'rmdir',
	    'readdir'
	  ]
	  methods.forEach(function(m) {
	    options[m] = options[m] || fs[m]
	    m = m + 'Sync'
	    options[m] = options[m] || fs[m]
	  })

	  options.maxBusyTries = options.maxBusyTries || 3
	  options.emfileWait = options.emfileWait || 1000
	  if (options.glob === false) {
	    options.disableGlob = true
	  }
	  options.disableGlob = options.disableGlob || false
	  options.glob = options.glob || defaultGlobOpts
	}

	function rimraf (p, options, cb) {
	  if (typeof options === 'function') {
	    cb = options
	    options = {}
	  }

	  assert(p, 'rimraf: missing path')
	  assert.equal(typeof p, 'string', 'rimraf: path should be a string')
	  assert(options, 'rimraf: missing options')
	  assert.equal(typeof options, 'object', 'rimraf: options should be object')
	  assert.equal(typeof cb, 'function', 'rimraf: callback function required')

	  defaults(options)

	  var busyTries = 0
	  var errState = null
	  var n = 0

	  if (options.disableGlob || !glob.hasMagic(p))
	    return afterGlob(null, [p])

	  fs.lstat(p, function (er, stat) {
	    if (!er)
	      return afterGlob(null, [p])

	    glob(p, options.glob, afterGlob)
	  })

	  function next (er) {
	    errState = errState || er
	    if (--n === 0)
	      cb(errState)
	  }

	  function afterGlob (er, results) {
	    if (er)
	      return cb(er)

	    n = results.length
	    if (n === 0)
	      return cb()

	    results.forEach(function (p) {
	      rimraf_(p, options, function CB (er) {
	        if (er) {
	          if (isWindows && (er.code === "EBUSY" || er.code === "ENOTEMPTY" || er.code === "EPERM") &&
	              busyTries < options.maxBusyTries) {
	            busyTries ++
	            var time = busyTries * 100
	            // try again, with the same exact callback as this one.
	            return setTimeout(function () {
	              rimraf_(p, options, CB)
	            }, time)
	          }

	          // this one won't happen if graceful-fs is used.
	          if (er.code === "EMFILE" && timeout < options.emfileWait) {
	            return setTimeout(function () {
	              rimraf_(p, options, CB)
	            }, timeout ++)
	          }

	          // already gone
	          if (er.code === "ENOENT") er = null
	        }

	        timeout = 0
	        next(er)
	      })
	    })
	  }
	}

	// Two possible strategies.
	// 1. Assume it's a file.  unlink it, then do the dir stuff on EPERM or EISDIR
	// 2. Assume it's a directory.  readdir, then do the file stuff on ENOTDIR
	//
	// Both result in an extra syscall when you guess wrong.  However, there
	// are likely far more normal files in the world than directories.  This
	// is based on the assumption that a the average number of files per
	// directory is >= 1.
	//
	// If anyone ever complains about this, then I guess the strategy could
	// be made configurable somehow.  But until then, YAGNI.
	function rimraf_ (p, options, cb) {
	  assert(p)
	  assert(options)
	  assert(typeof cb === 'function')

	  // sunos lets the root user unlink directories, which is... weird.
	  // so we have to lstat here and make sure it's not a dir.
	  options.lstat(p, function (er, st) {
	    if (er && er.code === "ENOENT")
	      return cb(null)

	    if (st && st.isDirectory())
	      return rmdir(p, options, er, cb)

	    options.unlink(p, function (er) {
	      if (er) {
	        if (er.code === "ENOENT")
	          return cb(null)
	        if (er.code === "EPERM")
	          return (isWindows)
	            ? fixWinEPERM(p, options, er, cb)
	            : rmdir(p, options, er, cb)
	        if (er.code === "EISDIR")
	          return rmdir(p, options, er, cb)
	      }
	      return cb(er)
	    })
	  })
	}

	function fixWinEPERM (p, options, er, cb) {
	  assert(p)
	  assert(options)
	  assert(typeof cb === 'function')
	  if (er)
	    assert(er instanceof Error)

	  options.chmod(p, 666, function (er2) {
	    if (er2)
	      cb(er2.code === "ENOENT" ? null : er)
	    else
	      options.stat(p, function(er3, stats) {
	        if (er3)
	          cb(er3.code === "ENOENT" ? null : er)
	        else if (stats.isDirectory())
	          rmdir(p, options, er, cb)
	        else
	          options.unlink(p, cb)
	      })
	  })
	}

	function fixWinEPERMSync (p, options, er) {
	  assert(p)
	  assert(options)
	  if (er)
	    assert(er instanceof Error)

	  try {
	    options.chmodSync(p, 666)
	  } catch (er2) {
	    if (er2.code === "ENOENT")
	      return
	    else
	      throw er
	  }

	  try {
	    var stats = options.statSync(p)
	  } catch (er3) {
	    if (er3.code === "ENOENT")
	      return
	    else
	      throw er
	  }

	  if (stats.isDirectory())
	    rmdirSync(p, options, er)
	  else
	    options.unlinkSync(p)
	}

	function rmdir (p, options, originalEr, cb) {
	  assert(p)
	  assert(options)
	  if (originalEr)
	    assert(originalEr instanceof Error)
	  assert(typeof cb === 'function')

	  // try to rmdir first, and only readdir on ENOTEMPTY or EEXIST (SunOS)
	  // if we guessed wrong, and it's not a directory, then
	  // raise the original error.
	  options.rmdir(p, function (er) {
	    if (er && (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM"))
	      rmkids(p, options, cb)
	    else if (er && er.code === "ENOTDIR")
	      cb(originalEr)
	    else
	      cb(er)
	  })
	}

	function rmkids(p, options, cb) {
	  assert(p)
	  assert(options)
	  assert(typeof cb === 'function')

	  options.readdir(p, function (er, files) {
	    if (er)
	      return cb(er)
	    var n = files.length
	    if (n === 0)
	      return options.rmdir(p, cb)
	    var errState
	    files.forEach(function (f) {
	      rimraf(path.join(p, f), options, function (er) {
	        if (errState)
	          return
	        if (er)
	          return cb(errState = er)
	        if (--n === 0)
	          options.rmdir(p, cb)
	      })
	    })
	  })
	}

	// this looks simpler, and is strictly *faster*, but will
	// tie up the JavaScript thread and fail on excessively
	// deep directory trees.
	function rimrafSync (p, options) {
	  options = options || {}
	  defaults(options)

	  assert(p, 'rimraf: missing path')
	  assert.equal(typeof p, 'string', 'rimraf: path should be a string')
	  assert(options, 'rimraf: missing options')
	  assert.equal(typeof options, 'object', 'rimraf: options should be object')

	  var results

	  if (options.disableGlob || !glob.hasMagic(p)) {
	    results = [p]
	  } else {
	    try {
	      fs.lstatSync(p)
	      results = [p]
	    } catch (er) {
	      results = glob.sync(p, options.glob)
	    }
	  }

	  if (!results.length)
	    return

	  for (var i = 0; i < results.length; i++) {
	    var p = results[i]

	    try {
	      var st = options.lstatSync(p)
	    } catch (er) {
	      if (er.code === "ENOENT")
	        return
	    }

	    try {
	      // sunos lets the root user unlink directories, which is... weird.
	      if (st && st.isDirectory())
	        rmdirSync(p, options, null)
	      else
	        options.unlinkSync(p)
	    } catch (er) {
	      if (er.code === "ENOENT")
	        return
	      if (er.code === "EPERM")
	        return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er)
	      if (er.code !== "EISDIR")
	        throw er
	      rmdirSync(p, options, er)
	    }
	  }
	}

	function rmdirSync (p, options, originalEr) {
	  assert(p)
	  assert(options)
	  if (originalEr)
	    assert(originalEr instanceof Error)

	  try {
	    options.rmdirSync(p)
	  } catch (er) {
	    if (er.code === "ENOENT")
	      return
	    if (er.code === "ENOTDIR")
	      throw originalEr
	    if (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM")
	      rmkidsSync(p, options)
	  }
	}

	function rmkidsSync (p, options) {
	  assert(p)
	  assert(options)
	  options.readdirSync(p).forEach(function (f) {
	    rimrafSync(path.join(p, f), options)
	  })
	  options.rmdirSync(p, options)
	}


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	// Approach:
	//
	// 1. Get the minimatch set
	// 2. For each pattern in the set, PROCESS(pattern, false)
	// 3. Store matches per-set, then uniq them
	//
	// PROCESS(pattern, inGlobStar)
	// Get the first [n] items from pattern that are all strings
	// Join these together.  This is PREFIX.
	//   If there is no more remaining, then stat(PREFIX) and
	//   add to matches if it succeeds.  END.
	//
	// If inGlobStar and PREFIX is symlink and points to dir
	//   set ENTRIES = []
	// else readdir(PREFIX) as ENTRIES
	//   If fail, END
	//
	// with ENTRIES
	//   If pattern[n] is GLOBSTAR
	//     // handle the case where the globstar match is empty
	//     // by pruning it out, and testing the resulting pattern
	//     PROCESS(pattern[0..n] + pattern[n+1 .. $], false)
	//     // handle other cases.
	//     for ENTRY in ENTRIES (not dotfiles)
	//       // attach globstar + tail onto the entry
	//       // Mark that this entry is a globstar match
	//       PROCESS(pattern[0..n] + ENTRY + pattern[n .. $], true)
	//
	//   else // not globstar
	//     for ENTRY in ENTRIES (not dotfiles, unless pattern[n] is dot)
	//       Test ENTRY against pattern[n]
	//       If fails, continue
	//       If passes, PROCESS(pattern[0..n] + item + pattern[n+1 .. $])
	//
	// Caveat:
	//   Cache all stats and readdirs results to minimize syscall.  Since all
	//   we ever care about is existence and directory-ness, we can just keep
	//   `true` for files, and [children,...] for directories, or `false` for
	//   things that don't exist.

	module.exports = glob

	var fs = __webpack_require__(62)
	var minimatch = __webpack_require__(83)
	var Minimatch = minimatch.Minimatch
	var inherits = __webpack_require__(87)
	var EE = __webpack_require__(44).EventEmitter
	var path = __webpack_require__(70)
	var assert = __webpack_require__(67)
	var isAbsolute = __webpack_require__(88)
	var globSync = __webpack_require__(89)
	var common = __webpack_require__(90)
	var alphasort = common.alphasort
	var alphasorti = common.alphasorti
	var setopts = common.setopts
	var ownProp = common.ownProp
	var inflight = __webpack_require__(91)
	var util = __webpack_require__(45)
	var childrenIgnored = common.childrenIgnored
	var isIgnored = common.isIgnored

	var once = __webpack_require__(93)

	function glob (pattern, options, cb) {
	  if (typeof options === 'function') cb = options, options = {}
	  if (!options) options = {}

	  if (options.sync) {
	    if (cb)
	      throw new TypeError('callback provided to sync glob')
	    return globSync(pattern, options)
	  }

	  return new Glob(pattern, options, cb)
	}

	glob.sync = globSync
	var GlobSync = glob.GlobSync = globSync.GlobSync

	// old api surface
	glob.glob = glob

	function extend (origin, add) {
	  if (add === null || typeof add !== 'object') {
	    return origin
	  }

	  var keys = Object.keys(add)
	  var i = keys.length
	  while (i--) {
	    origin[keys[i]] = add[keys[i]]
	  }
	  return origin
	}

	glob.hasMagic = function (pattern, options_) {
	  var options = extend({}, options_)
	  options.noprocess = true

	  var g = new Glob(pattern, options)
	  var set = g.minimatch.set
	  if (set.length > 1)
	    return true

	  for (var j = 0; j < set[0].length; j++) {
	    if (typeof set[0][j] !== 'string')
	      return true
	  }

	  return false
	}

	glob.Glob = Glob
	inherits(Glob, EE)
	function Glob (pattern, options, cb) {
	  if (typeof options === 'function') {
	    cb = options
	    options = null
	  }

	  if (options && options.sync) {
	    if (cb)
	      throw new TypeError('callback provided to sync glob')
	    return new GlobSync(pattern, options)
	  }

	  if (!(this instanceof Glob))
	    return new Glob(pattern, options, cb)

	  setopts(this, pattern, options)
	  this._didRealPath = false

	  // process each pattern in the minimatch set
	  var n = this.minimatch.set.length

	  // The matches are stored as {<filename>: true,...} so that
	  // duplicates are automagically pruned.
	  // Later, we do an Object.keys() on these.
	  // Keep them as a list so we can fill in when nonull is set.
	  this.matches = new Array(n)

	  if (typeof cb === 'function') {
	    cb = once(cb)
	    this.on('error', cb)
	    this.on('end', function (matches) {
	      cb(null, matches)
	    })
	  }

	  var self = this
	  var n = this.minimatch.set.length
	  this._processing = 0
	  this.matches = new Array(n)

	  this._emitQueue = []
	  this._processQueue = []
	  this.paused = false

	  if (this.noprocess)
	    return this

	  if (n === 0)
	    return done()

	  var sync = true
	  for (var i = 0; i < n; i ++) {
	    this._process(this.minimatch.set[i], i, false, done)
	  }
	  sync = false

	  function done () {
	    --self._processing
	    if (self._processing <= 0) {
	      if (sync) {
	        process.nextTick(function () {
	          self._finish()
	        })
	      } else {
	        self._finish()
	      }
	    }
	  }
	}

	Glob.prototype._finish = function () {
	  assert(this instanceof Glob)
	  if (this.aborted)
	    return

	  if (this.realpath && !this._didRealpath)
	    return this._realpath()

	  common.finish(this)
	  this.emit('end', this.found)
	}

	Glob.prototype._realpath = function () {
	  if (this._didRealpath)
	    return

	  this._didRealpath = true

	  var n = this.matches.length
	  if (n === 0)
	    return this._finish()

	  var self = this
	  for (var i = 0; i < this.matches.length; i++)
	    this._realpathSet(i, next)

	  function next () {
	    if (--n === 0)
	      self._finish()
	  }
	}

	Glob.prototype._realpathSet = function (index, cb) {
	  var matchset = this.matches[index]
	  if (!matchset)
	    return cb()

	  var found = Object.keys(matchset)
	  var self = this
	  var n = found.length

	  if (n === 0)
	    return cb()

	  var set = this.matches[index] = Object.create(null)
	  found.forEach(function (p, i) {
	    // If there's a problem with the stat, then it means that
	    // one or more of the links in the realpath couldn't be
	    // resolved.  just return the abs value in that case.
	    p = self._makeAbs(p)
	    fs.realpath(p, self.realpathCache, function (er, real) {
	      if (!er)
	        set[real] = true
	      else if (er.syscall === 'stat')
	        set[p] = true
	      else
	        self.emit('error', er) // srsly wtf right here

	      if (--n === 0) {
	        self.matches[index] = set
	        cb()
	      }
	    })
	  })
	}

	Glob.prototype._mark = function (p) {
	  return common.mark(this, p)
	}

	Glob.prototype._makeAbs = function (f) {
	  return common.makeAbs(this, f)
	}

	Glob.prototype.abort = function () {
	  this.aborted = true
	  this.emit('abort')
	}

	Glob.prototype.pause = function () {
	  if (!this.paused) {
	    this.paused = true
	    this.emit('pause')
	  }
	}

	Glob.prototype.resume = function () {
	  if (this.paused) {
	    this.emit('resume')
	    this.paused = false
	    if (this._emitQueue.length) {
	      var eq = this._emitQueue.slice(0)
	      this._emitQueue.length = 0
	      for (var i = 0; i < eq.length; i ++) {
	        var e = eq[i]
	        this._emitMatch(e[0], e[1])
	      }
	    }
	    if (this._processQueue.length) {
	      var pq = this._processQueue.slice(0)
	      this._processQueue.length = 0
	      for (var i = 0; i < pq.length; i ++) {
	        var p = pq[i]
	        this._processing--
	        this._process(p[0], p[1], p[2], p[3])
	      }
	    }
	  }
	}

	Glob.prototype._process = function (pattern, index, inGlobStar, cb) {
	  assert(this instanceof Glob)
	  assert(typeof cb === 'function')

	  if (this.aborted)
	    return

	  this._processing++
	  if (this.paused) {
	    this._processQueue.push([pattern, index, inGlobStar, cb])
	    return
	  }

	  //console.error('PROCESS %d', this._processing, pattern)

	  // Get the first [n] parts of pattern that are all strings.
	  var n = 0
	  while (typeof pattern[n] === 'string') {
	    n ++
	  }
	  // now n is the index of the first one that is *not* a string.

	  // see if there's anything else
	  var prefix
	  switch (n) {
	    // if not, then this is rather simple
	    case pattern.length:
	      this._processSimple(pattern.join('/'), index, cb)
	      return

	    case 0:
	      // pattern *starts* with some non-trivial item.
	      // going to readdir(cwd), but not include the prefix in matches.
	      prefix = null
	      break

	    default:
	      // pattern has some string bits in the front.
	      // whatever it starts with, whether that's 'absolute' like /foo/bar,
	      // or 'relative' like '../baz'
	      prefix = pattern.slice(0, n).join('/')
	      break
	  }

	  var remain = pattern.slice(n)

	  // get the list of entries.
	  var read
	  if (prefix === null)
	    read = '.'
	  else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
	    if (!prefix || !isAbsolute(prefix))
	      prefix = '/' + prefix
	    read = prefix
	  } else
	    read = prefix

	  var abs = this._makeAbs(read)

	  //if ignored, skip _processing
	  if (childrenIgnored(this, read))
	    return cb()

	  var isGlobStar = remain[0] === minimatch.GLOBSTAR
	  if (isGlobStar)
	    this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb)
	  else
	    this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb)
	}

	Glob.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar, cb) {
	  var self = this
	  this._readdir(abs, inGlobStar, function (er, entries) {
	    return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb)
	  })
	}

	Glob.prototype._processReaddir2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {

	  // if the abs isn't a dir, then nothing can match!
	  if (!entries)
	    return cb()

	  // It will only match dot entries if it starts with a dot, or if
	  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
	  var pn = remain[0]
	  var negate = !!this.minimatch.negate
	  var rawGlob = pn._glob
	  var dotOk = this.dot || rawGlob.charAt(0) === '.'

	  var matchedEntries = []
	  for (var i = 0; i < entries.length; i++) {
	    var e = entries[i]
	    if (e.charAt(0) !== '.' || dotOk) {
	      var m
	      if (negate && !prefix) {
	        m = !e.match(pn)
	      } else {
	        m = e.match(pn)
	      }
	      if (m)
	        matchedEntries.push(e)
	    }
	  }

	  //console.error('prd2', prefix, entries, remain[0]._glob, matchedEntries)

	  var len = matchedEntries.length
	  // If there are no matched entries, then nothing matches.
	  if (len === 0)
	    return cb()

	  // if this is the last remaining pattern bit, then no need for
	  // an additional stat *unless* the user has specified mark or
	  // stat explicitly.  We know they exist, since readdir returned
	  // them.

	  if (remain.length === 1 && !this.mark && !this.stat) {
	    if (!this.matches[index])
	      this.matches[index] = Object.create(null)

	    for (var i = 0; i < len; i ++) {
	      var e = matchedEntries[i]
	      if (prefix) {
	        if (prefix !== '/')
	          e = prefix + '/' + e
	        else
	          e = prefix + e
	      }

	      if (e.charAt(0) === '/' && !this.nomount) {
	        e = path.join(this.root, e)
	      }
	      this._emitMatch(index, e)
	    }
	    // This was the last one, and no stats were needed
	    return cb()
	  }

	  // now test all matched entries as stand-ins for that part
	  // of the pattern.
	  remain.shift()
	  for (var i = 0; i < len; i ++) {
	    var e = matchedEntries[i]
	    var newPattern
	    if (prefix) {
	      if (prefix !== '/')
	        e = prefix + '/' + e
	      else
	        e = prefix + e
	    }
	    this._process([e].concat(remain), index, inGlobStar, cb)
	  }
	  cb()
	}

	Glob.prototype._emitMatch = function (index, e) {
	  if (this.aborted)
	    return

	  if (this.matches[index][e])
	    return

	  if (isIgnored(this, e))
	    return

	  if (this.paused) {
	    this._emitQueue.push([index, e])
	    return
	  }

	  var abs = this._makeAbs(e)

	  if (this.nodir) {
	    var c = this.cache[abs]
	    if (c === 'DIR' || Array.isArray(c))
	      return
	  }

	  if (this.mark)
	    e = this._mark(e)

	  this.matches[index][e] = true

	  var st = this.statCache[abs]
	  if (st)
	    this.emit('stat', e, st)

	  this.emit('match', e)
	}

	Glob.prototype._readdirInGlobStar = function (abs, cb) {
	  if (this.aborted)
	    return

	  // follow all symlinked directories forever
	  // just proceed as if this is a non-globstar situation
	  if (this.follow)
	    return this._readdir(abs, false, cb)

	  var lstatkey = 'lstat\0' + abs
	  var self = this
	  var lstatcb = inflight(lstatkey, lstatcb_)

	  if (lstatcb)
	    fs.lstat(abs, lstatcb)

	  function lstatcb_ (er, lstat) {
	    if (er)
	      return cb()

	    var isSym = lstat.isSymbolicLink()
	    self.symlinks[abs] = isSym

	    // If it's not a symlink or a dir, then it's definitely a regular file.
	    // don't bother doing a readdir in that case.
	    if (!isSym && !lstat.isDirectory()) {
	      self.cache[abs] = 'FILE'
	      cb()
	    } else
	      self._readdir(abs, false, cb)
	  }
	}

	Glob.prototype._readdir = function (abs, inGlobStar, cb) {
	  if (this.aborted)
	    return

	  cb = inflight('readdir\0'+abs+'\0'+inGlobStar, cb)
	  if (!cb)
	    return

	  //console.error('RD %j %j', +inGlobStar, abs)
	  if (inGlobStar && !ownProp(this.symlinks, abs))
	    return this._readdirInGlobStar(abs, cb)

	  if (ownProp(this.cache, abs)) {
	    var c = this.cache[abs]
	    if (!c || c === 'FILE')
	      return cb()

	    if (Array.isArray(c))
	      return cb(null, c)
	  }

	  var self = this
	  fs.readdir(abs, readdirCb(this, abs, cb))
	}

	function readdirCb (self, abs, cb) {
	  return function (er, entries) {
	    if (er)
	      self._readdirError(abs, er, cb)
	    else
	      self._readdirEntries(abs, entries, cb)
	  }
	}

	Glob.prototype._readdirEntries = function (abs, entries, cb) {
	  if (this.aborted)
	    return

	  // if we haven't asked to stat everything, then just
	  // assume that everything in there exists, so we can avoid
	  // having to stat it a second time.
	  if (!this.mark && !this.stat) {
	    for (var i = 0; i < entries.length; i ++) {
	      var e = entries[i]
	      if (abs === '/')
	        e = abs + e
	      else
	        e = abs + '/' + e
	      this.cache[e] = true
	    }
	  }

	  this.cache[abs] = entries
	  return cb(null, entries)
	}

	Glob.prototype._readdirError = function (f, er, cb) {
	  if (this.aborted)
	    return

	  // handle errors, and cache the information
	  switch (er.code) {
	    case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
	    case 'ENOTDIR': // totally normal. means it *does* exist.
	      var abs = this._makeAbs(f)
	      this.cache[abs] = 'FILE'
	      if (abs === this.cwdAbs) {
	        var error = new Error(er.code + ' invalid cwd ' + this.cwd)
	        error.path = this.cwd
	        error.code = er.code
	        this.emit('error', error)
	        this.abort()
	      }
	      break

	    case 'ENOENT': // not terribly unusual
	    case 'ELOOP':
	    case 'ENAMETOOLONG':
	    case 'UNKNOWN':
	      this.cache[this._makeAbs(f)] = false
	      break

	    default: // some unusual error.  Treat as failure.
	      this.cache[this._makeAbs(f)] = false
	      if (this.strict) {
	        this.emit('error', er)
	        // If the error is handled, then we abort
	        // if not, we threw out of here
	        this.abort()
	      }
	      if (!this.silent)
	        console.error('glob error', er)
	      break
	  }

	  return cb()
	}

	Glob.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar, cb) {
	  var self = this
	  this._readdir(abs, inGlobStar, function (er, entries) {
	    self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb)
	  })
	}


	Glob.prototype._processGlobStar2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {
	  //console.error('pgs2', prefix, remain[0], entries)

	  // no entries means not a dir, so it can never have matches
	  // foo.txt/** doesn't match foo.txt
	  if (!entries)
	    return cb()

	  // test without the globstar, and with every child both below
	  // and replacing the globstar.
	  var remainWithoutGlobStar = remain.slice(1)
	  var gspref = prefix ? [ prefix ] : []
	  var noGlobStar = gspref.concat(remainWithoutGlobStar)

	  // the noGlobStar pattern exits the inGlobStar state
	  this._process(noGlobStar, index, false, cb)

	  var isSym = this.symlinks[abs]
	  var len = entries.length

	  // If it's a symlink, and we're in a globstar, then stop
	  if (isSym && inGlobStar)
	    return cb()

	  for (var i = 0; i < len; i++) {
	    var e = entries[i]
	    if (e.charAt(0) === '.' && !this.dot)
	      continue

	    // these two cases enter the inGlobStar state
	    var instead = gspref.concat(entries[i], remainWithoutGlobStar)
	    this._process(instead, index, true, cb)

	    var below = gspref.concat(entries[i], remain)
	    this._process(below, index, true, cb)
	  }

	  cb()
	}

	Glob.prototype._processSimple = function (prefix, index, cb) {
	  // XXX review this.  Shouldn't it be doing the mounting etc
	  // before doing stat?  kinda weird?
	  var self = this
	  this._stat(prefix, function (er, exists) {
	    self._processSimple2(prefix, index, er, exists, cb)
	  })
	}
	Glob.prototype._processSimple2 = function (prefix, index, er, exists, cb) {

	  //console.error('ps2', prefix, exists)

	  if (!this.matches[index])
	    this.matches[index] = Object.create(null)

	  // If it doesn't exist, then just mark the lack of results
	  if (!exists)
	    return cb()

	  if (prefix && isAbsolute(prefix) && !this.nomount) {
	    var trail = /[\/\\]$/.test(prefix)
	    if (prefix.charAt(0) === '/') {
	      prefix = path.join(this.root, prefix)
	    } else {
	      prefix = path.resolve(this.root, prefix)
	      if (trail)
	        prefix += '/'
	    }
	  }

	  if (process.platform === 'win32')
	    prefix = prefix.replace(/\\/g, '/')

	  // Mark this as a match
	  this._emitMatch(index, prefix)
	  cb()
	}

	// Returns either 'DIR', 'FILE', or false
	Glob.prototype._stat = function (f, cb) {
	  var abs = this._makeAbs(f)
	  var needDir = f.slice(-1) === '/'

	  if (f.length > this.maxLength)
	    return cb()

	  if (!this.stat && ownProp(this.cache, abs)) {
	    var c = this.cache[abs]

	    if (Array.isArray(c))
	      c = 'DIR'

	    // It exists, but maybe not how we need it
	    if (!needDir || c === 'DIR')
	      return cb(null, c)

	    if (needDir && c === 'FILE')
	      return cb()

	    // otherwise we have to stat, because maybe c=true
	    // if we know it exists, but not what it is.
	  }

	  var exists
	  var stat = this.statCache[abs]
	  if (stat !== undefined) {
	    if (stat === false)
	      return cb(null, stat)
	    else {
	      var type = stat.isDirectory() ? 'DIR' : 'FILE'
	      if (needDir && type === 'FILE')
	        return cb()
	      else
	        return cb(null, type, stat)
	    }
	  }

	  var self = this
	  var statcb = inflight('stat\0' + abs, lstatcb_)
	  if (statcb)
	    fs.lstat(abs, statcb)

	  function lstatcb_ (er, lstat) {
	    if (lstat && lstat.isSymbolicLink()) {
	      // If it's a symlink, then treat it as the target, unless
	      // the target does not exist, then treat it as a file.
	      return fs.stat(abs, function (er, stat) {
	        if (er)
	          self._stat2(f, abs, null, lstat, cb)
	        else
	          self._stat2(f, abs, er, stat, cb)
	      })
	    } else {
	      self._stat2(f, abs, er, lstat, cb)
	    }
	  }
	}

	Glob.prototype._stat2 = function (f, abs, er, stat, cb) {
	  if (er) {
	    this.statCache[abs] = false
	    return cb()
	  }

	  var needDir = f.slice(-1) === '/'
	  this.statCache[abs] = stat

	  if (abs.slice(-1) === '/' && !stat.isDirectory())
	    return cb(null, false, stat)

	  var c = stat.isDirectory() ? 'DIR' : 'FILE'
	  this.cache[abs] = this.cache[abs] || c

	  if (needDir && c !== 'DIR')
	    return cb()

	  return cb(null, c, stat)
	}


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = minimatch
	minimatch.Minimatch = Minimatch

	var path = { sep: '/' }
	try {
	  path = __webpack_require__(70)
	} catch (er) {}

	var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {}
	var expand = __webpack_require__(84)

	// any single thing other than /
	// don't need to escape / when using new RegExp()
	var qmark = '[^/]'

	// * => any number of characters
	var star = qmark + '*?'

	// ** when dots are allowed.  Anything goes, except .. and .
	// not (^ or / followed by one or two dots followed by $ or /),
	// followed by anything, any number of times.
	var twoStarDot = '(?:(?!(?:\\\/|^)(?:\\.{1,2})($|\\\/)).)*?'

	// not a ^ or / followed by a dot,
	// followed by anything, any number of times.
	var twoStarNoDot = '(?:(?!(?:\\\/|^)\\.).)*?'

	// characters that need to be escaped in RegExp.
	var reSpecials = charSet('().*{}+?[]^$\\!')

	// "abc" -> { a:true, b:true, c:true }
	function charSet (s) {
	  return s.split('').reduce(function (set, c) {
	    set[c] = true
	    return set
	  }, {})
	}

	// normalizes slashes.
	var slashSplit = /\/+/

	minimatch.filter = filter
	function filter (pattern, options) {
	  options = options || {}
	  return function (p, i, list) {
	    return minimatch(p, pattern, options)
	  }
	}

	function ext (a, b) {
	  a = a || {}
	  b = b || {}
	  var t = {}
	  Object.keys(b).forEach(function (k) {
	    t[k] = b[k]
	  })
	  Object.keys(a).forEach(function (k) {
	    t[k] = a[k]
	  })
	  return t
	}

	minimatch.defaults = function (def) {
	  if (!def || !Object.keys(def).length) return minimatch

	  var orig = minimatch

	  var m = function minimatch (p, pattern, options) {
	    return orig.minimatch(p, pattern, ext(def, options))
	  }

	  m.Minimatch = function Minimatch (pattern, options) {
	    return new orig.Minimatch(pattern, ext(def, options))
	  }

	  return m
	}

	Minimatch.defaults = function (def) {
	  if (!def || !Object.keys(def).length) return Minimatch
	  return minimatch.defaults(def).Minimatch
	}

	function minimatch (p, pattern, options) {
	  if (typeof pattern !== 'string') {
	    throw new TypeError('glob pattern string required')
	  }

	  if (!options) options = {}

	  // shortcut: comments match nothing.
	  if (!options.nocomment && pattern.charAt(0) === '#') {
	    return false
	  }

	  // "" only matches ""
	  if (pattern.trim() === '') return p === ''

	  return new Minimatch(pattern, options).match(p)
	}

	function Minimatch (pattern, options) {
	  if (!(this instanceof Minimatch)) {
	    return new Minimatch(pattern, options)
	  }

	  if (typeof pattern !== 'string') {
	    throw new TypeError('glob pattern string required')
	  }

	  if (!options) options = {}
	  pattern = pattern.trim()

	  // windows support: need to use /, not \
	  if (path.sep !== '/') {
	    pattern = pattern.split(path.sep).join('/')
	  }

	  this.options = options
	  this.set = []
	  this.pattern = pattern
	  this.regexp = null
	  this.negate = false
	  this.comment = false
	  this.empty = false

	  // make the set of regexps etc.
	  this.make()
	}

	Minimatch.prototype.debug = function () {}

	Minimatch.prototype.make = make
	function make () {
	  // don't do it more than once.
	  if (this._made) return

	  var pattern = this.pattern
	  var options = this.options

	  // empty patterns and comments match nothing.
	  if (!options.nocomment && pattern.charAt(0) === '#') {
	    this.comment = true
	    return
	  }
	  if (!pattern) {
	    this.empty = true
	    return
	  }

	  // step 1: figure out negation, etc.
	  this.parseNegate()

	  // step 2: expand braces
	  var set = this.globSet = this.braceExpand()

	  if (options.debug) this.debug = console.error

	  this.debug(this.pattern, set)

	  // step 3: now we have a set, so turn each one into a series of path-portion
	  // matching patterns.
	  // These will be regexps, except in the case of "**", which is
	  // set to the GLOBSTAR object for globstar behavior,
	  // and will not contain any / characters
	  set = this.globParts = set.map(function (s) {
	    return s.split(slashSplit)
	  })

	  this.debug(this.pattern, set)

	  // glob --> regexps
	  set = set.map(function (s, si, set) {
	    return s.map(this.parse, this)
	  }, this)

	  this.debug(this.pattern, set)

	  // filter out everything that didn't compile properly.
	  set = set.filter(function (s) {
	    return s.indexOf(false) === -1
	  })

	  this.debug(this.pattern, set)

	  this.set = set
	}

	Minimatch.prototype.parseNegate = parseNegate
	function parseNegate () {
	  var pattern = this.pattern
	  var negate = false
	  var options = this.options
	  var negateOffset = 0

	  if (options.nonegate) return

	  for (var i = 0, l = pattern.length
	    ; i < l && pattern.charAt(i) === '!'
	    ; i++) {
	    negate = !negate
	    negateOffset++
	  }

	  if (negateOffset) this.pattern = pattern.substr(negateOffset)
	  this.negate = negate
	}

	// Brace expansion:
	// a{b,c}d -> abd acd
	// a{b,}c -> abc ac
	// a{0..3}d -> a0d a1d a2d a3d
	// a{b,c{d,e}f}g -> abg acdfg acefg
	// a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
	//
	// Invalid sets are not expanded.
	// a{2..}b -> a{2..}b
	// a{b}c -> a{b}c
	minimatch.braceExpand = function (pattern, options) {
	  return braceExpand(pattern, options)
	}

	Minimatch.prototype.braceExpand = braceExpand

	function braceExpand (pattern, options) {
	  if (!options) {
	    if (this instanceof Minimatch) {
	      options = this.options
	    } else {
	      options = {}
	    }
	  }

	  pattern = typeof pattern === 'undefined'
	    ? this.pattern : pattern

	  if (typeof pattern === 'undefined') {
	    throw new Error('undefined pattern')
	  }

	  if (options.nobrace ||
	    !pattern.match(/\{.*\}/)) {
	    // shortcut. no need to expand.
	    return [pattern]
	  }

	  return expand(pattern)
	}

	// parse a component of the expanded set.
	// At this point, no pattern may contain "/" in it
	// so we're going to return a 2d array, where each entry is the full
	// pattern, split on '/', and then turned into a regular expression.
	// A regexp is made at the end which joins each array with an
	// escaped /, and another full one which joins each regexp with |.
	//
	// Following the lead of Bash 4.1, note that "**" only has special meaning
	// when it is the *only* thing in a path portion.  Otherwise, any series
	// of * is equivalent to a single *.  Globstar behavior is enabled by
	// default, and can be disabled by setting options.noglobstar.
	Minimatch.prototype.parse = parse
	var SUBPARSE = {}
	function parse (pattern, isSub) {
	  var options = this.options

	  // shortcuts
	  if (!options.noglobstar && pattern === '**') return GLOBSTAR
	  if (pattern === '') return ''

	  var re = ''
	  var hasMagic = !!options.nocase
	  var escaping = false
	  // ? => one single character
	  var patternListStack = []
	  var negativeLists = []
	  var plType
	  var stateChar
	  var inClass = false
	  var reClassStart = -1
	  var classStart = -1
	  // . and .. never match anything that doesn't start with .,
	  // even when options.dot is set.
	  var patternStart = pattern.charAt(0) === '.' ? '' // anything
	  // not (start or / followed by . or .. followed by / or end)
	  : options.dot ? '(?!(?:^|\\\/)\\.{1,2}(?:$|\\\/))'
	  : '(?!\\.)'
	  var self = this

	  function clearStateChar () {
	    if (stateChar) {
	      // we had some state-tracking character
	      // that wasn't consumed by this pass.
	      switch (stateChar) {
	        case '*':
	          re += star
	          hasMagic = true
	        break
	        case '?':
	          re += qmark
	          hasMagic = true
	        break
	        default:
	          re += '\\' + stateChar
	        break
	      }
	      self.debug('clearStateChar %j %j', stateChar, re)
	      stateChar = false
	    }
	  }

	  for (var i = 0, len = pattern.length, c
	    ; (i < len) && (c = pattern.charAt(i))
	    ; i++) {
	    this.debug('%s\t%s %s %j', pattern, i, re, c)

	    // skip over any that are escaped.
	    if (escaping && reSpecials[c]) {
	      re += '\\' + c
	      escaping = false
	      continue
	    }

	    switch (c) {
	      case '/':
	        // completely not allowed, even escaped.
	        // Should already be path-split by now.
	        return false

	      case '\\':
	        clearStateChar()
	        escaping = true
	      continue

	      // the various stateChar values
	      // for the "extglob" stuff.
	      case '?':
	      case '*':
	      case '+':
	      case '@':
	      case '!':
	        this.debug('%s\t%s %s %j <-- stateChar', pattern, i, re, c)

	        // all of those are literals inside a class, except that
	        // the glob [!a] means [^a] in regexp
	        if (inClass) {
	          this.debug('  in class')
	          if (c === '!' && i === classStart + 1) c = '^'
	          re += c
	          continue
	        }

	        // if we already have a stateChar, then it means
	        // that there was something like ** or +? in there.
	        // Handle the stateChar, then proceed with this one.
	        self.debug('call clearStateChar %j', stateChar)
	        clearStateChar()
	        stateChar = c
	        // if extglob is disabled, then +(asdf|foo) isn't a thing.
	        // just clear the statechar *now*, rather than even diving into
	        // the patternList stuff.
	        if (options.noext) clearStateChar()
	      continue

	      case '(':
	        if (inClass) {
	          re += '('
	          continue
	        }

	        if (!stateChar) {
	          re += '\\('
	          continue
	        }

	        plType = stateChar
	        patternListStack.push({
	          type: plType,
	          start: i - 1,
	          reStart: re.length
	        })
	        // negation is (?:(?!js)[^/]*)
	        re += stateChar === '!' ? '(?:(?!(?:' : '(?:'
	        this.debug('plType %j %j', stateChar, re)
	        stateChar = false
	      continue

	      case ')':
	        if (inClass || !patternListStack.length) {
	          re += '\\)'
	          continue
	        }

	        clearStateChar()
	        hasMagic = true
	        re += ')'
	        var pl = patternListStack.pop()
	        plType = pl.type
	        // negation is (?:(?!js)[^/]*)
	        // The others are (?:<pattern>)<type>
	        switch (plType) {
	          case '!':
	            negativeLists.push(pl)
	            re += ')[^/]*?)'
	            pl.reEnd = re.length
	            break
	          case '?':
	          case '+':
	          case '*':
	            re += plType
	            break
	          case '@': break // the default anyway
	        }
	      continue

	      case '|':
	        if (inClass || !patternListStack.length || escaping) {
	          re += '\\|'
	          escaping = false
	          continue
	        }

	        clearStateChar()
	        re += '|'
	      continue

	      // these are mostly the same in regexp and glob
	      case '[':
	        // swallow any state-tracking char before the [
	        clearStateChar()

	        if (inClass) {
	          re += '\\' + c
	          continue
	        }

	        inClass = true
	        classStart = i
	        reClassStart = re.length
	        re += c
	      continue

	      case ']':
	        //  a right bracket shall lose its special
	        //  meaning and represent itself in
	        //  a bracket expression if it occurs
	        //  first in the list.  -- POSIX.2 2.8.3.2
	        if (i === classStart + 1 || !inClass) {
	          re += '\\' + c
	          escaping = false
	          continue
	        }

	        // handle the case where we left a class open.
	        // "[z-a]" is valid, equivalent to "\[z-a\]"
	        if (inClass) {
	          // split where the last [ was, make sure we don't have
	          // an invalid re. if so, re-walk the contents of the
	          // would-be class to re-translate any characters that
	          // were passed through as-is
	          // TODO: It would probably be faster to determine this
	          // without a try/catch and a new RegExp, but it's tricky
	          // to do safely.  For now, this is safe and works.
	          var cs = pattern.substring(classStart + 1, i)
	          try {
	            RegExp('[' + cs + ']')
	          } catch (er) {
	            // not a valid class!
	            var sp = this.parse(cs, SUBPARSE)
	            re = re.substr(0, reClassStart) + '\\[' + sp[0] + '\\]'
	            hasMagic = hasMagic || sp[1]
	            inClass = false
	            continue
	          }
	        }

	        // finish up the class.
	        hasMagic = true
	        inClass = false
	        re += c
	      continue

	      default:
	        // swallow any state char that wasn't consumed
	        clearStateChar()

	        if (escaping) {
	          // no need
	          escaping = false
	        } else if (reSpecials[c]
	          && !(c === '^' && inClass)) {
	          re += '\\'
	        }

	        re += c

	    } // switch
	  } // for

	  // handle the case where we left a class open.
	  // "[abc" is valid, equivalent to "\[abc"
	  if (inClass) {
	    // split where the last [ was, and escape it
	    // this is a huge pita.  We now have to re-walk
	    // the contents of the would-be class to re-translate
	    // any characters that were passed through as-is
	    cs = pattern.substr(classStart + 1)
	    sp = this.parse(cs, SUBPARSE)
	    re = re.substr(0, reClassStart) + '\\[' + sp[0]
	    hasMagic = hasMagic || sp[1]
	  }

	  // handle the case where we had a +( thing at the *end*
	  // of the pattern.
	  // each pattern list stack adds 3 chars, and we need to go through
	  // and escape any | chars that were passed through as-is for the regexp.
	  // Go through and escape them, taking care not to double-escape any
	  // | chars that were already escaped.
	  for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
	    var tail = re.slice(pl.reStart + 3)
	    // maybe some even number of \, then maybe 1 \, followed by a |
	    tail = tail.replace(/((?:\\{2})*)(\\?)\|/g, function (_, $1, $2) {
	      if (!$2) {
	        // the | isn't already escaped, so escape it.
	        $2 = '\\'
	      }

	      // need to escape all those slashes *again*, without escaping the
	      // one that we need for escaping the | character.  As it works out,
	      // escaping an even number of slashes can be done by simply repeating
	      // it exactly after itself.  That's why this trick works.
	      //
	      // I am sorry that you have to see this.
	      return $1 + $1 + $2 + '|'
	    })

	    this.debug('tail=%j\n   %s', tail, tail)
	    var t = pl.type === '*' ? star
	      : pl.type === '?' ? qmark
	      : '\\' + pl.type

	    hasMagic = true
	    re = re.slice(0, pl.reStart) + t + '\\(' + tail
	  }

	  // handle trailing things that only matter at the very end.
	  clearStateChar()
	  if (escaping) {
	    // trailing \\
	    re += '\\\\'
	  }

	  // only need to apply the nodot start if the re starts with
	  // something that could conceivably capture a dot
	  var addPatternStart = false
	  switch (re.charAt(0)) {
	    case '.':
	    case '[':
	    case '(': addPatternStart = true
	  }

	  // Hack to work around lack of negative lookbehind in JS
	  // A pattern like: *.!(x).!(y|z) needs to ensure that a name
	  // like 'a.xyz.yz' doesn't match.  So, the first negative
	  // lookahead, has to look ALL the way ahead, to the end of
	  // the pattern.
	  for (var n = negativeLists.length - 1; n > -1; n--) {
	    var nl = negativeLists[n]

	    var nlBefore = re.slice(0, nl.reStart)
	    var nlFirst = re.slice(nl.reStart, nl.reEnd - 8)
	    var nlLast = re.slice(nl.reEnd - 8, nl.reEnd)
	    var nlAfter = re.slice(nl.reEnd)

	    nlLast += nlAfter

	    // Handle nested stuff like *(*.js|!(*.json)), where open parens
	    // mean that we should *not* include the ) in the bit that is considered
	    // "after" the negated section.
	    var openParensBefore = nlBefore.split('(').length - 1
	    var cleanAfter = nlAfter
	    for (i = 0; i < openParensBefore; i++) {
	      cleanAfter = cleanAfter.replace(/\)[+*?]?/, '')
	    }
	    nlAfter = cleanAfter

	    var dollar = ''
	    if (nlAfter === '' && isSub !== SUBPARSE) {
	      dollar = '$'
	    }
	    var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast
	    re = newRe
	  }

	  // if the re is not "" at this point, then we need to make sure
	  // it doesn't match against an empty path part.
	  // Otherwise a/* will match a/, which it should not.
	  if (re !== '' && hasMagic) {
	    re = '(?=.)' + re
	  }

	  if (addPatternStart) {
	    re = patternStart + re
	  }

	  // parsing just a piece of a larger pattern.
	  if (isSub === SUBPARSE) {
	    return [re, hasMagic]
	  }

	  // skip the regexp for non-magical patterns
	  // unescape anything in it, though, so that it'll be
	  // an exact match against a file etc.
	  if (!hasMagic) {
	    return globUnescape(pattern)
	  }

	  var flags = options.nocase ? 'i' : ''
	  var regExp = new RegExp('^' + re + '$', flags)

	  regExp._glob = pattern
	  regExp._src = re

	  return regExp
	}

	minimatch.makeRe = function (pattern, options) {
	  return new Minimatch(pattern, options || {}).makeRe()
	}

	Minimatch.prototype.makeRe = makeRe
	function makeRe () {
	  if (this.regexp || this.regexp === false) return this.regexp

	  // at this point, this.set is a 2d array of partial
	  // pattern strings, or "**".
	  //
	  // It's better to use .match().  This function shouldn't
	  // be used, really, but it's pretty convenient sometimes,
	  // when you just want to work with a regex.
	  var set = this.set

	  if (!set.length) {
	    this.regexp = false
	    return this.regexp
	  }
	  var options = this.options

	  var twoStar = options.noglobstar ? star
	    : options.dot ? twoStarDot
	    : twoStarNoDot
	  var flags = options.nocase ? 'i' : ''

	  var re = set.map(function (pattern) {
	    return pattern.map(function (p) {
	      return (p === GLOBSTAR) ? twoStar
	      : (typeof p === 'string') ? regExpEscape(p)
	      : p._src
	    }).join('\\\/')
	  }).join('|')

	  // must match entire pattern
	  // ending in a * or ** will make it less strict.
	  re = '^(?:' + re + ')$'

	  // can match anything, as long as it's not this.
	  if (this.negate) re = '^(?!' + re + ').*$'

	  try {
	    this.regexp = new RegExp(re, flags)
	  } catch (ex) {
	    this.regexp = false
	  }
	  return this.regexp
	}

	minimatch.match = function (list, pattern, options) {
	  options = options || {}
	  var mm = new Minimatch(pattern, options)
	  list = list.filter(function (f) {
	    return mm.match(f)
	  })
	  if (mm.options.nonull && !list.length) {
	    list.push(pattern)
	  }
	  return list
	}

	Minimatch.prototype.match = match
	function match (f, partial) {
	  this.debug('match', f, this.pattern)
	  // short-circuit in the case of busted things.
	  // comments, etc.
	  if (this.comment) return false
	  if (this.empty) return f === ''

	  if (f === '/' && partial) return true

	  var options = this.options

	  // windows: need to use /, not \
	  if (path.sep !== '/') {
	    f = f.split(path.sep).join('/')
	  }

	  // treat the test path as a set of pathparts.
	  f = f.split(slashSplit)
	  this.debug(this.pattern, 'split', f)

	  // just ONE of the pattern sets in this.set needs to match
	  // in order for it to be valid.  If negating, then just one
	  // match means that we have failed.
	  // Either way, return on the first hit.

	  var set = this.set
	  this.debug(this.pattern, 'set', set)

	  // Find the basename of the path by looking for the last non-empty segment
	  var filename
	  var i
	  for (i = f.length - 1; i >= 0; i--) {
	    filename = f[i]
	    if (filename) break
	  }

	  for (i = 0; i < set.length; i++) {
	    var pattern = set[i]
	    var file = f
	    if (options.matchBase && pattern.length === 1) {
	      file = [filename]
	    }
	    var hit = this.matchOne(file, pattern, partial)
	    if (hit) {
	      if (options.flipNegate) return true
	      return !this.negate
	    }
	  }

	  // didn't get any hits.  this is success if it's a negative
	  // pattern, failure otherwise.
	  if (options.flipNegate) return false
	  return this.negate
	}

	// set partial to true to test if, for example,
	// "/a/b" matches the start of "/*/b/*/d"
	// Partial means, if you run out of file before you run
	// out of pattern, then that's fine, as long as all
	// the parts match.
	Minimatch.prototype.matchOne = function (file, pattern, partial) {
	  var options = this.options

	  this.debug('matchOne',
	    { 'this': this, file: file, pattern: pattern })

	  this.debug('matchOne', file.length, pattern.length)

	  for (var fi = 0,
	      pi = 0,
	      fl = file.length,
	      pl = pattern.length
	      ; (fi < fl) && (pi < pl)
	      ; fi++, pi++) {
	    this.debug('matchOne loop')
	    var p = pattern[pi]
	    var f = file[fi]

	    this.debug(pattern, p, f)

	    // should be impossible.
	    // some invalid regexp stuff in the set.
	    if (p === false) return false

	    if (p === GLOBSTAR) {
	      this.debug('GLOBSTAR', [pattern, p, f])

	      // "**"
	      // a/**/b/**/c would match the following:
	      // a/b/x/y/z/c
	      // a/x/y/z/b/c
	      // a/b/x/b/x/c
	      // a/b/c
	      // To do this, take the rest of the pattern after
	      // the **, and see if it would match the file remainder.
	      // If so, return success.
	      // If not, the ** "swallows" a segment, and try again.
	      // This is recursively awful.
	      //
	      // a/**/b/**/c matching a/b/x/y/z/c
	      // - a matches a
	      // - doublestar
	      //   - matchOne(b/x/y/z/c, b/**/c)
	      //     - b matches b
	      //     - doublestar
	      //       - matchOne(x/y/z/c, c) -> no
	      //       - matchOne(y/z/c, c) -> no
	      //       - matchOne(z/c, c) -> no
	      //       - matchOne(c, c) yes, hit
	      var fr = fi
	      var pr = pi + 1
	      if (pr === pl) {
	        this.debug('** at the end')
	        // a ** at the end will just swallow the rest.
	        // We have found a match.
	        // however, it will not swallow /.x, unless
	        // options.dot is set.
	        // . and .. are *never* matched by **, for explosively
	        // exponential reasons.
	        for (; fi < fl; fi++) {
	          if (file[fi] === '.' || file[fi] === '..' ||
	            (!options.dot && file[fi].charAt(0) === '.')) return false
	        }
	        return true
	      }

	      // ok, let's see if we can swallow whatever we can.
	      while (fr < fl) {
	        var swallowee = file[fr]

	        this.debug('\nglobstar while', file, fr, pattern, pr, swallowee)

	        // XXX remove this slice.  Just pass the start index.
	        if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
	          this.debug('globstar found match!', fr, fl, swallowee)
	          // found a match.
	          return true
	        } else {
	          // can't swallow "." or ".." ever.
	          // can only swallow ".foo" when explicitly asked.
	          if (swallowee === '.' || swallowee === '..' ||
	            (!options.dot && swallowee.charAt(0) === '.')) {
	            this.debug('dot detected!', file, fr, pattern, pr)
	            break
	          }

	          // ** swallows a segment, and continue.
	          this.debug('globstar swallow a segment, and continue')
	          fr++
	        }
	      }

	      // no match was found.
	      // However, in partial mode, we can't say this is necessarily over.
	      // If there's more *pattern* left, then
	      if (partial) {
	        // ran out of file
	        this.debug('\n>>> no match, partial?', file, fr, pattern, pr)
	        if (fr === fl) return true
	      }
	      return false
	    }

	    // something other than **
	    // non-magic patterns just have to match exactly
	    // patterns with magic have been turned into regexps.
	    var hit
	    if (typeof p === 'string') {
	      if (options.nocase) {
	        hit = f.toLowerCase() === p.toLowerCase()
	      } else {
	        hit = f === p
	      }
	      this.debug('string match', p, f, hit)
	    } else {
	      hit = f.match(p)
	      this.debug('pattern match', p, f, hit)
	    }

	    if (!hit) return false
	  }

	  // Note: ending in / means that we'll get a final ""
	  // at the end of the pattern.  This can only match a
	  // corresponding "" at the end of the file.
	  // If the file ends in /, then it can only match a
	  // a pattern that ends in /, unless the pattern just
	  // doesn't have any more for it. But, a/b/ should *not*
	  // match "a/b/*", even though "" matches against the
	  // [^/]*? pattern, except in partial mode, where it might
	  // simply not be reached yet.
	  // However, a/b/ should still satisfy a/*

	  // now either we fell off the end of the pattern, or we're done.
	  if (fi === fl && pi === pl) {
	    // ran out of pattern and filename at the same time.
	    // an exact hit!
	    return true
	  } else if (fi === fl) {
	    // ran out of file, but still had pattern left.
	    // this is ok if we're doing the match as part of
	    // a glob fs traversal.
	    return partial
	  } else if (pi === pl) {
	    // ran out of pattern, still have file left.
	    // this is only acceptable if we're on the very last
	    // empty segment of a file with a trailing slash.
	    // a/* should match a/b/
	    var emptyFileEnd = (fi === fl - 1) && (file[fi] === '')
	    return emptyFileEnd
	  }

	  // should be unreachable.
	  throw new Error('wtf?')
	}

	// replace stuff like \* with *
	function globUnescape (s) {
	  return s.replace(/\\(.)/g, '$1')
	}

	function regExpEscape (s) {
	  return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
	}


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var concatMap = __webpack_require__(85);
	var balanced = __webpack_require__(86);

	module.exports = expandTop;

	var escSlash = '\0SLASH'+Math.random()+'\0';
	var escOpen = '\0OPEN'+Math.random()+'\0';
	var escClose = '\0CLOSE'+Math.random()+'\0';
	var escComma = '\0COMMA'+Math.random()+'\0';
	var escPeriod = '\0PERIOD'+Math.random()+'\0';

	function numeric(str) {
	  return parseInt(str, 10) == str
	    ? parseInt(str, 10)
	    : str.charCodeAt(0);
	}

	function escapeBraces(str) {
	  return str.split('\\\\').join(escSlash)
	            .split('\\{').join(escOpen)
	            .split('\\}').join(escClose)
	            .split('\\,').join(escComma)
	            .split('\\.').join(escPeriod);
	}

	function unescapeBraces(str) {
	  return str.split(escSlash).join('\\')
	            .split(escOpen).join('{')
	            .split(escClose).join('}')
	            .split(escComma).join(',')
	            .split(escPeriod).join('.');
	}


	// Basically just str.split(","), but handling cases
	// where we have nested braced sections, which should be
	// treated as individual members, like {a,{b,c},d}
	function parseCommaParts(str) {
	  if (!str)
	    return [''];

	  var parts = [];
	  var m = balanced('{', '}', str);

	  if (!m)
	    return str.split(',');

	  var pre = m.pre;
	  var body = m.body;
	  var post = m.post;
	  var p = pre.split(',');

	  p[p.length-1] += '{' + body + '}';
	  var postParts = parseCommaParts(post);
	  if (post.length) {
	    p[p.length-1] += postParts.shift();
	    p.push.apply(p, postParts);
	  }

	  parts.push.apply(parts, p);

	  return parts;
	}

	function expandTop(str) {
	  if (!str)
	    return [];

	  return expand(escapeBraces(str), true).map(unescapeBraces);
	}

	function identity(e) {
	  return e;
	}

	function embrace(str) {
	  return '{' + str + '}';
	}
	function isPadded(el) {
	  return /^-?0\d/.test(el);
	}

	function lte(i, y) {
	  return i <= y;
	}
	function gte(i, y) {
	  return i >= y;
	}

	function expand(str, isTop) {
	  var expansions = [];

	  var m = balanced('{', '}', str);
	  if (!m || /\$$/.test(m.pre)) return [str];

	  var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
	  var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
	  var isSequence = isNumericSequence || isAlphaSequence;
	  var isOptions = /^(.*,)+(.+)?$/.test(m.body);
	  if (!isSequence && !isOptions) {
	    // {a},b}
	    if (m.post.match(/,.*\}/)) {
	      str = m.pre + '{' + m.body + escClose + m.post;
	      return expand(str);
	    }
	    return [str];
	  }

	  var n;
	  if (isSequence) {
	    n = m.body.split(/\.\./);
	  } else {
	    n = parseCommaParts(m.body);
	    if (n.length === 1) {
	      // x{{a,b}}y ==> x{a}y x{b}y
	      n = expand(n[0], false).map(embrace);
	      if (n.length === 1) {
	        var post = m.post.length
	          ? expand(m.post, false)
	          : [''];
	        return post.map(function(p) {
	          return m.pre + n[0] + p;
	        });
	      }
	    }
	  }

	  // at this point, n is the parts, and we know it's not a comma set
	  // with a single entry.

	  // no need to expand pre, since it is guaranteed to be free of brace-sets
	  var pre = m.pre;
	  var post = m.post.length
	    ? expand(m.post, false)
	    : [''];

	  var N;

	  if (isSequence) {
	    var x = numeric(n[0]);
	    var y = numeric(n[1]);
	    var width = Math.max(n[0].length, n[1].length)
	    var incr = n.length == 3
	      ? Math.abs(numeric(n[2]))
	      : 1;
	    var test = lte;
	    var reverse = y < x;
	    if (reverse) {
	      incr *= -1;
	      test = gte;
	    }
	    var pad = n.some(isPadded);

	    N = [];

	    for (var i = x; test(i, y); i += incr) {
	      var c;
	      if (isAlphaSequence) {
	        c = String.fromCharCode(i);
	        if (c === '\\')
	          c = '';
	      } else {
	        c = String(i);
	        if (pad) {
	          var need = width - c.length;
	          if (need > 0) {
	            var z = new Array(need + 1).join('0');
	            if (i < 0)
	              c = '-' + z + c.slice(1);
	            else
	              c = z + c;
	          }
	        }
	      }
	      N.push(c);
	    }
	  } else {
	    N = concatMap(n, function(el) { return expand(el, false) });
	  }

	  for (var j = 0; j < N.length; j++) {
	    for (var k = 0; k < post.length; k++) {
	      var expansion = pre + N[j] + post[k];
	      if (!isTop || isSequence || expansion)
	        expansions.push(expansion);
	    }
	  }

	  return expansions;
	}



/***/ },
/* 85 */
/***/ function(module, exports) {

	module.exports = function (xs, fn) {
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        var x = fn(xs[i], i);
	        if (isArray(x)) res.push.apply(res, x);
	        else res.push(x);
	    }
	    return res;
	};

	var isArray = Array.isArray || function (xs) {
	    return Object.prototype.toString.call(xs) === '[object Array]';
	};


/***/ },
/* 86 */
/***/ function(module, exports) {

	module.exports = balanced;
	function balanced(a, b, str) {
	  var r = range(a, b, str);

	  return r && {
	    start: r[0],
	    end: r[1],
	    pre: str.slice(0, r[0]),
	    body: str.slice(r[0] + a.length, r[1]),
	    post: str.slice(r[1] + b.length)
	  };
	}

	balanced.range = range;
	function range(a, b, str) {
	  var begs, beg, left, right, result;
	  var ai = str.indexOf(a);
	  var bi = str.indexOf(b, ai + 1);
	  var i = ai;

	  if (ai >= 0 && bi > 0) {
	    begs = [];
	    left = str.length;

	    while (i < str.length && i >= 0 && ! result) {
	      if (i == ai) {
	        begs.push(i);
	        ai = str.indexOf(a, i + 1);
	      } else if (begs.length == 1) {
	        result = [ begs.pop(), bi ];
	      } else {
	        beg = begs.pop();
	        if (beg < left) {
	          left = beg;
	          right = bi;
	        }

	        bi = str.indexOf(b, i + 1);
	      }

	      i = ai < bi && ai >= 0 ? ai : bi;
	    }

	    if (begs.length) {
	      result = [ left, right ];
	    }
	  }

	  return result;
	}


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(45).inherits


/***/ },
/* 88 */
/***/ function(module, exports) {

	'use strict';

	function posix(path) {
		return path.charAt(0) === '/';
	};

	function win32(path) {
		// https://github.com/joyent/node/blob/b3fcc245fb25539909ef1d5eaa01dbf92e168633/lib/path.js#L56
		var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
		var result = splitDeviceRe.exec(path);
		var device = result[1] || '';
		var isUnc = !!device && device.charAt(1) !== ':';

		// UNC paths are always absolute
		return !!result[2] || isUnc;
	};

	module.exports = process.platform === 'win32' ? win32 : posix;
	module.exports.posix = posix;
	module.exports.win32 = win32;


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = globSync
	globSync.GlobSync = GlobSync

	var fs = __webpack_require__(62)
	var minimatch = __webpack_require__(83)
	var Minimatch = minimatch.Minimatch
	var Glob = __webpack_require__(82).Glob
	var util = __webpack_require__(45)
	var path = __webpack_require__(70)
	var assert = __webpack_require__(67)
	var isAbsolute = __webpack_require__(88)
	var common = __webpack_require__(90)
	var alphasort = common.alphasort
	var alphasorti = common.alphasorti
	var setopts = common.setopts
	var ownProp = common.ownProp
	var childrenIgnored = common.childrenIgnored

	function globSync (pattern, options) {
	  if (typeof options === 'function' || arguments.length === 3)
	    throw new TypeError('callback provided to sync glob\n'+
	                        'See: https://github.com/isaacs/node-glob/issues/167')

	  return new GlobSync(pattern, options).found
	}

	function GlobSync (pattern, options) {
	  if (!pattern)
	    throw new Error('must provide pattern')

	  if (typeof options === 'function' || arguments.length === 3)
	    throw new TypeError('callback provided to sync glob\n'+
	                        'See: https://github.com/isaacs/node-glob/issues/167')

	  if (!(this instanceof GlobSync))
	    return new GlobSync(pattern, options)

	  setopts(this, pattern, options)

	  if (this.noprocess)
	    return this

	  var n = this.minimatch.set.length
	  this.matches = new Array(n)
	  for (var i = 0; i < n; i ++) {
	    this._process(this.minimatch.set[i], i, false)
	  }
	  this._finish()
	}

	GlobSync.prototype._finish = function () {
	  assert(this instanceof GlobSync)
	  if (this.realpath) {
	    var self = this
	    this.matches.forEach(function (matchset, index) {
	      var set = self.matches[index] = Object.create(null)
	      for (var p in matchset) {
	        try {
	          p = self._makeAbs(p)
	          var real = fs.realpathSync(p, self.realpathCache)
	          set[real] = true
	        } catch (er) {
	          if (er.syscall === 'stat')
	            set[self._makeAbs(p)] = true
	          else
	            throw er
	        }
	      }
	    })
	  }
	  common.finish(this)
	}


	GlobSync.prototype._process = function (pattern, index, inGlobStar) {
	  assert(this instanceof GlobSync)

	  // Get the first [n] parts of pattern that are all strings.
	  var n = 0
	  while (typeof pattern[n] === 'string') {
	    n ++
	  }
	  // now n is the index of the first one that is *not* a string.

	  // See if there's anything else
	  var prefix
	  switch (n) {
	    // if not, then this is rather simple
	    case pattern.length:
	      this._processSimple(pattern.join('/'), index)
	      return

	    case 0:
	      // pattern *starts* with some non-trivial item.
	      // going to readdir(cwd), but not include the prefix in matches.
	      prefix = null
	      break

	    default:
	      // pattern has some string bits in the front.
	      // whatever it starts with, whether that's 'absolute' like /foo/bar,
	      // or 'relative' like '../baz'
	      prefix = pattern.slice(0, n).join('/')
	      break
	  }

	  var remain = pattern.slice(n)

	  // get the list of entries.
	  var read
	  if (prefix === null)
	    read = '.'
	  else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
	    if (!prefix || !isAbsolute(prefix))
	      prefix = '/' + prefix
	    read = prefix
	  } else
	    read = prefix

	  var abs = this._makeAbs(read)

	  //if ignored, skip processing
	  if (childrenIgnored(this, read))
	    return

	  var isGlobStar = remain[0] === minimatch.GLOBSTAR
	  if (isGlobStar)
	    this._processGlobStar(prefix, read, abs, remain, index, inGlobStar)
	  else
	    this._processReaddir(prefix, read, abs, remain, index, inGlobStar)
	}


	GlobSync.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar) {
	  var entries = this._readdir(abs, inGlobStar)

	  // if the abs isn't a dir, then nothing can match!
	  if (!entries)
	    return

	  // It will only match dot entries if it starts with a dot, or if
	  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
	  var pn = remain[0]
	  var negate = !!this.minimatch.negate
	  var rawGlob = pn._glob
	  var dotOk = this.dot || rawGlob.charAt(0) === '.'

	  var matchedEntries = []
	  for (var i = 0; i < entries.length; i++) {
	    var e = entries[i]
	    if (e.charAt(0) !== '.' || dotOk) {
	      var m
	      if (negate && !prefix) {
	        m = !e.match(pn)
	      } else {
	        m = e.match(pn)
	      }
	      if (m)
	        matchedEntries.push(e)
	    }
	  }

	  var len = matchedEntries.length
	  // If there are no matched entries, then nothing matches.
	  if (len === 0)
	    return

	  // if this is the last remaining pattern bit, then no need for
	  // an additional stat *unless* the user has specified mark or
	  // stat explicitly.  We know they exist, since readdir returned
	  // them.

	  if (remain.length === 1 && !this.mark && !this.stat) {
	    if (!this.matches[index])
	      this.matches[index] = Object.create(null)

	    for (var i = 0; i < len; i ++) {
	      var e = matchedEntries[i]
	      if (prefix) {
	        if (prefix.slice(-1) !== '/')
	          e = prefix + '/' + e
	        else
	          e = prefix + e
	      }

	      if (e.charAt(0) === '/' && !this.nomount) {
	        e = path.join(this.root, e)
	      }
	      this.matches[index][e] = true
	    }
	    // This was the last one, and no stats were needed
	    return
	  }

	  // now test all matched entries as stand-ins for that part
	  // of the pattern.
	  remain.shift()
	  for (var i = 0; i < len; i ++) {
	    var e = matchedEntries[i]
	    var newPattern
	    if (prefix)
	      newPattern = [prefix, e]
	    else
	      newPattern = [e]
	    this._process(newPattern.concat(remain), index, inGlobStar)
	  }
	}


	GlobSync.prototype._emitMatch = function (index, e) {
	  var abs = this._makeAbs(e)
	  if (this.mark)
	    e = this._mark(e)

	  if (this.matches[index][e])
	    return

	  if (this.nodir) {
	    var c = this.cache[this._makeAbs(e)]
	    if (c === 'DIR' || Array.isArray(c))
	      return
	  }

	  this.matches[index][e] = true
	  if (this.stat)
	    this._stat(e)
	}


	GlobSync.prototype._readdirInGlobStar = function (abs) {
	  // follow all symlinked directories forever
	  // just proceed as if this is a non-globstar situation
	  if (this.follow)
	    return this._readdir(abs, false)

	  var entries
	  var lstat
	  var stat
	  try {
	    lstat = fs.lstatSync(abs)
	  } catch (er) {
	    // lstat failed, doesn't exist
	    return null
	  }

	  var isSym = lstat.isSymbolicLink()
	  this.symlinks[abs] = isSym

	  // If it's not a symlink or a dir, then it's definitely a regular file.
	  // don't bother doing a readdir in that case.
	  if (!isSym && !lstat.isDirectory())
	    this.cache[abs] = 'FILE'
	  else
	    entries = this._readdir(abs, false)

	  return entries
	}

	GlobSync.prototype._readdir = function (abs, inGlobStar) {
	  var entries

	  if (inGlobStar && !ownProp(this.symlinks, abs))
	    return this._readdirInGlobStar(abs)

	  if (ownProp(this.cache, abs)) {
	    var c = this.cache[abs]
	    if (!c || c === 'FILE')
	      return null

	    if (Array.isArray(c))
	      return c
	  }

	  try {
	    return this._readdirEntries(abs, fs.readdirSync(abs))
	  } catch (er) {
	    this._readdirError(abs, er)
	    return null
	  }
	}

	GlobSync.prototype._readdirEntries = function (abs, entries) {
	  // if we haven't asked to stat everything, then just
	  // assume that everything in there exists, so we can avoid
	  // having to stat it a second time.
	  if (!this.mark && !this.stat) {
	    for (var i = 0; i < entries.length; i ++) {
	      var e = entries[i]
	      if (abs === '/')
	        e = abs + e
	      else
	        e = abs + '/' + e
	      this.cache[e] = true
	    }
	  }

	  this.cache[abs] = entries

	  // mark and cache dir-ness
	  return entries
	}

	GlobSync.prototype._readdirError = function (f, er) {
	  // handle errors, and cache the information
	  switch (er.code) {
	    case 'ENOTSUP': // https://github.com/isaacs/node-glob/issues/205
	    case 'ENOTDIR': // totally normal. means it *does* exist.
	      var abs = this._makeAbs(f)
	      this.cache[abs] = 'FILE'
	      if (abs === this.cwdAbs) {
	        var error = new Error(er.code + ' invalid cwd ' + this.cwd)
	        error.path = this.cwd
	        error.code = er.code
	        throw error
	      }
	      break

	    case 'ENOENT': // not terribly unusual
	    case 'ELOOP':
	    case 'ENAMETOOLONG':
	    case 'UNKNOWN':
	      this.cache[this._makeAbs(f)] = false
	      break

	    default: // some unusual error.  Treat as failure.
	      this.cache[this._makeAbs(f)] = false
	      if (this.strict)
	        throw er
	      if (!this.silent)
	        console.error('glob error', er)
	      break
	  }
	}

	GlobSync.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar) {

	  var entries = this._readdir(abs, inGlobStar)

	  // no entries means not a dir, so it can never have matches
	  // foo.txt/** doesn't match foo.txt
	  if (!entries)
	    return

	  // test without the globstar, and with every child both below
	  // and replacing the globstar.
	  var remainWithoutGlobStar = remain.slice(1)
	  var gspref = prefix ? [ prefix ] : []
	  var noGlobStar = gspref.concat(remainWithoutGlobStar)

	  // the noGlobStar pattern exits the inGlobStar state
	  this._process(noGlobStar, index, false)

	  var len = entries.length
	  var isSym = this.symlinks[abs]

	  // If it's a symlink, and we're in a globstar, then stop
	  if (isSym && inGlobStar)
	    return

	  for (var i = 0; i < len; i++) {
	    var e = entries[i]
	    if (e.charAt(0) === '.' && !this.dot)
	      continue

	    // these two cases enter the inGlobStar state
	    var instead = gspref.concat(entries[i], remainWithoutGlobStar)
	    this._process(instead, index, true)

	    var below = gspref.concat(entries[i], remain)
	    this._process(below, index, true)
	  }
	}

	GlobSync.prototype._processSimple = function (prefix, index) {
	  // XXX review this.  Shouldn't it be doing the mounting etc
	  // before doing stat?  kinda weird?
	  var exists = this._stat(prefix)

	  if (!this.matches[index])
	    this.matches[index] = Object.create(null)

	  // If it doesn't exist, then just mark the lack of results
	  if (!exists)
	    return

	  if (prefix && isAbsolute(prefix) && !this.nomount) {
	    var trail = /[\/\\]$/.test(prefix)
	    if (prefix.charAt(0) === '/') {
	      prefix = path.join(this.root, prefix)
	    } else {
	      prefix = path.resolve(this.root, prefix)
	      if (trail)
	        prefix += '/'
	    }
	  }

	  if (process.platform === 'win32')
	    prefix = prefix.replace(/\\/g, '/')

	  // Mark this as a match
	  this.matches[index][prefix] = true
	}

	// Returns either 'DIR', 'FILE', or false
	GlobSync.prototype._stat = function (f) {
	  var abs = this._makeAbs(f)
	  var needDir = f.slice(-1) === '/'

	  if (f.length > this.maxLength)
	    return false

	  if (!this.stat && ownProp(this.cache, abs)) {
	    var c = this.cache[abs]

	    if (Array.isArray(c))
	      c = 'DIR'

	    // It exists, but maybe not how we need it
	    if (!needDir || c === 'DIR')
	      return c

	    if (needDir && c === 'FILE')
	      return false

	    // otherwise we have to stat, because maybe c=true
	    // if we know it exists, but not what it is.
	  }

	  var exists
	  var stat = this.statCache[abs]
	  if (!stat) {
	    var lstat
	    try {
	      lstat = fs.lstatSync(abs)
	    } catch (er) {
	      return false
	    }

	    if (lstat.isSymbolicLink()) {
	      try {
	        stat = fs.statSync(abs)
	      } catch (er) {
	        stat = lstat
	      }
	    } else {
	      stat = lstat
	    }
	  }

	  this.statCache[abs] = stat

	  var c = stat.isDirectory() ? 'DIR' : 'FILE'
	  this.cache[abs] = this.cache[abs] || c

	  if (needDir && c !== 'DIR')
	    return false

	  return c
	}

	GlobSync.prototype._mark = function (p) {
	  return common.mark(this, p)
	}

	GlobSync.prototype._makeAbs = function (f) {
	  return common.makeAbs(this, f)
	}


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	exports.alphasort = alphasort
	exports.alphasorti = alphasorti
	exports.setopts = setopts
	exports.ownProp = ownProp
	exports.makeAbs = makeAbs
	exports.finish = finish
	exports.mark = mark
	exports.isIgnored = isIgnored
	exports.childrenIgnored = childrenIgnored

	function ownProp (obj, field) {
	  return Object.prototype.hasOwnProperty.call(obj, field)
	}

	var path = __webpack_require__(70)
	var minimatch = __webpack_require__(83)
	var isAbsolute = __webpack_require__(88)
	var Minimatch = minimatch.Minimatch

	function alphasorti (a, b) {
	  return a.toLowerCase().localeCompare(b.toLowerCase())
	}

	function alphasort (a, b) {
	  return a.localeCompare(b)
	}

	function setupIgnores (self, options) {
	  self.ignore = options.ignore || []

	  if (!Array.isArray(self.ignore))
	    self.ignore = [self.ignore]

	  if (self.ignore.length) {
	    self.ignore = self.ignore.map(ignoreMap)
	  }
	}

	// ignore patterns are always in dot:true mode.
	function ignoreMap (pattern) {
	  var gmatcher = null
	  if (pattern.slice(-3) === '/**') {
	    var gpattern = pattern.replace(/(\/\*\*)+$/, '')
	    gmatcher = new Minimatch(gpattern, { dot: true })
	  }

	  return {
	    matcher: new Minimatch(pattern, { dot: true }),
	    gmatcher: gmatcher
	  }
	}

	function setopts (self, pattern, options) {
	  if (!options)
	    options = {}

	  // base-matching: just use globstar for that.
	  if (options.matchBase && -1 === pattern.indexOf("/")) {
	    if (options.noglobstar) {
	      throw new Error("base matching requires globstar")
	    }
	    pattern = "**/" + pattern
	  }

	  self.silent = !!options.silent
	  self.pattern = pattern
	  self.strict = options.strict !== false
	  self.realpath = !!options.realpath
	  self.realpathCache = options.realpathCache || Object.create(null)
	  self.follow = !!options.follow
	  self.dot = !!options.dot
	  self.mark = !!options.mark
	  self.nodir = !!options.nodir
	  if (self.nodir)
	    self.mark = true
	  self.sync = !!options.sync
	  self.nounique = !!options.nounique
	  self.nonull = !!options.nonull
	  self.nosort = !!options.nosort
	  self.nocase = !!options.nocase
	  self.stat = !!options.stat
	  self.noprocess = !!options.noprocess

	  self.maxLength = options.maxLength || Infinity
	  self.cache = options.cache || Object.create(null)
	  self.statCache = options.statCache || Object.create(null)
	  self.symlinks = options.symlinks || Object.create(null)

	  setupIgnores(self, options)

	  self.changedCwd = false
	  var cwd = process.cwd()
	  if (!ownProp(options, "cwd"))
	    self.cwd = cwd
	  else {
	    self.cwd = path.resolve(options.cwd)
	    self.changedCwd = self.cwd !== cwd
	  }

	  self.root = options.root || path.resolve(self.cwd, "/")
	  self.root = path.resolve(self.root)
	  if (process.platform === "win32")
	    self.root = self.root.replace(/\\/g, "/")

	  self.cwdAbs = makeAbs(self, self.cwd)
	  self.nomount = !!options.nomount

	  // disable comments and negation in Minimatch.
	  // Note that they are not supported in Glob itself anyway.
	  options.nonegate = true
	  options.nocomment = true

	  self.minimatch = new Minimatch(pattern, options)
	  self.options = self.minimatch.options
	}

	function finish (self) {
	  var nou = self.nounique
	  var all = nou ? [] : Object.create(null)

	  for (var i = 0, l = self.matches.length; i < l; i ++) {
	    var matches = self.matches[i]
	    if (!matches || Object.keys(matches).length === 0) {
	      if (self.nonull) {
	        // do like the shell, and spit out the literal glob
	        var literal = self.minimatch.globSet[i]
	        if (nou)
	          all.push(literal)
	        else
	          all[literal] = true
	      }
	    } else {
	      // had matches
	      var m = Object.keys(matches)
	      if (nou)
	        all.push.apply(all, m)
	      else
	        m.forEach(function (m) {
	          all[m] = true
	        })
	    }
	  }

	  if (!nou)
	    all = Object.keys(all)

	  if (!self.nosort)
	    all = all.sort(self.nocase ? alphasorti : alphasort)

	  // at *some* point we statted all of these
	  if (self.mark) {
	    for (var i = 0; i < all.length; i++) {
	      all[i] = self._mark(all[i])
	    }
	    if (self.nodir) {
	      all = all.filter(function (e) {
	        var notDir = !(/\/$/.test(e))
	        var c = self.cache[e] || self.cache[makeAbs(self, e)]
	        if (notDir && c)
	          notDir = c !== 'DIR' && !Array.isArray(c)
	        return notDir
	      })
	    }
	  }

	  if (self.ignore.length)
	    all = all.filter(function(m) {
	      return !isIgnored(self, m)
	    })

	  self.found = all
	}

	function mark (self, p) {
	  var abs = makeAbs(self, p)
	  var c = self.cache[abs]
	  var m = p
	  if (c) {
	    var isDir = c === 'DIR' || Array.isArray(c)
	    var slash = p.slice(-1) === '/'

	    if (isDir && !slash)
	      m += '/'
	    else if (!isDir && slash)
	      m = m.slice(0, -1)

	    if (m !== p) {
	      var mabs = makeAbs(self, m)
	      self.statCache[mabs] = self.statCache[abs]
	      self.cache[mabs] = self.cache[abs]
	    }
	  }

	  return m
	}

	// lotta situps...
	function makeAbs (self, f) {
	  var abs = f
	  if (f.charAt(0) === '/') {
	    abs = path.join(self.root, f)
	  } else if (isAbsolute(f) || f === '') {
	    abs = f
	  } else if (self.changedCwd) {
	    abs = path.resolve(self.cwd, f)
	  } else {
	    abs = path.resolve(f)
	  }

	  if (process.platform === 'win32')
	    abs = abs.replace(/\\/g, '/')

	  return abs
	}


	// Return true, if pattern ends with globstar '**', for the accompanying parent directory.
	// Ex:- If node_modules/** is the pattern, add 'node_modules' to ignore list along with it's contents
	function isIgnored (self, path) {
	  if (!self.ignore.length)
	    return false

	  return self.ignore.some(function(item) {
	    return item.matcher.match(path) || !!(item.gmatcher && item.gmatcher.match(path))
	  })
	}

	function childrenIgnored (self, path) {
	  if (!self.ignore.length)
	    return false

	  return self.ignore.some(function(item) {
	    return !!(item.gmatcher && item.gmatcher.match(path))
	  })
	}


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var wrappy = __webpack_require__(92)
	var reqs = Object.create(null)
	var once = __webpack_require__(93)

	module.exports = wrappy(inflight)

	function inflight (key, cb) {
	  if (reqs[key]) {
	    reqs[key].push(cb)
	    return null
	  } else {
	    reqs[key] = [cb]
	    return makeres(key)
	  }
	}

	function makeres (key) {
	  return once(function RES () {
	    var cbs = reqs[key]
	    var len = cbs.length
	    var args = slice(arguments)
	    for (var i = 0; i < len; i++) {
	      cbs[i].apply(null, args)
	    }
	    if (cbs.length > len) {
	      // added more in the interim.
	      // de-zalgo, just in case, but don't call again.
	      cbs.splice(0, len)
	      process.nextTick(function () {
	        RES.apply(null, args)
	      })
	    } else {
	      delete reqs[key]
	    }
	  })
	}

	function slice (args) {
	  var length = args.length
	  var array = []

	  for (var i = 0; i < length; i++) array[i] = args[i]
	  return array
	}


/***/ },
/* 92 */
/***/ function(module, exports) {

	// Returns a wrapper function that returns a wrapped callback
	// The wrapper function should do some stuff, and return a
	// presumably different callback function.
	// This makes sure that own properties are retained, so that
	// decorations and such are not lost along the way.
	module.exports = wrappy
	function wrappy (fn, cb) {
	  if (fn && cb) return wrappy(fn)(cb)

	  if (typeof fn !== 'function')
	    throw new TypeError('need wrapper function')

	  Object.keys(fn).forEach(function (k) {
	    wrapper[k] = fn[k]
	  })

	  return wrapper

	  function wrapper() {
	    var args = new Array(arguments.length)
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i]
	    }
	    var ret = fn.apply(this, args)
	    var cb = args[args.length-1]
	    if (typeof ret === 'function' && ret !== cb) {
	      Object.keys(cb).forEach(function (k) {
	        ret[k] = cb[k]
	      })
	    }
	    return ret
	  }
	}


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var wrappy = __webpack_require__(94)
	module.exports = wrappy(once)

	once.proto = once(function () {
	  Object.defineProperty(Function.prototype, 'once', {
	    value: function () {
	      return once(this)
	    },
	    configurable: true
	  })
	})

	function once (fn) {
	  var f = function () {
	    if (f.called) return f.value
	    f.called = true
	    return f.value = fn.apply(this, arguments)
	  }
	  f.called = false
	  return f
	}


/***/ },
/* 94 */
/***/ function(module, exports) {

	// Returns a wrapper function that returns a wrapped callback
	// The wrapper function should do some stuff, and return a
	// presumably different callback function.
	// This makes sure that own properties are retained, so that
	// decorations and such are not lost along the way.
	module.exports = wrappy
	function wrappy (fn, cb) {
	  if (fn && cb) return wrappy(fn)(cb)

	  if (typeof fn !== 'function')
	    throw new TypeError('need wrapper function')

	  Object.keys(fn).forEach(function (k) {
	    wrapper[k] = fn[k]
	  })

	  return wrapper

	  function wrapper() {
	    var args = new Array(arguments.length)
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i]
	    }
	    var ret = fn.apply(this, args)
	    var cb = args[args.length-1]
	    if (typeof ret === 'function' && ret !== cb) {
	      Object.keys(cb).forEach(function (k) {
	        ret[k] = cb[k]
	      })
	    }
	    return ret
	  }
	}


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var jsonFile = __webpack_require__(96)

	jsonFile.outputJsonSync = __webpack_require__(98)
	jsonFile.outputJson = __webpack_require__(99)
	// aliases
	jsonFile.outputJSONSync = __webpack_require__(98)
	jsonFile.outputJSON = __webpack_require__(99)

	module.exports = jsonFile


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var jsonFile = __webpack_require__(97)

	module.exports = {
	  // jsonfile exports
	  readJson: jsonFile.readFile,
	  readJSON: jsonFile.readFile,
	  readJsonSync: jsonFile.readFileSync,
	  readJSONSync: jsonFile.readFileSync,
	  writeJson: jsonFile.writeFile,
	  writeJSON: jsonFile.writeFile,
	  writeJsonSync: jsonFile.writeFileSync,
	  writeJSONSync: jsonFile.writeFileSync,
	  spaces: 2 // default in fs-extra
	}


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var fs = __webpack_require__(62)

	function readFile (file, options, callback) {
	  if (callback == null) {
	    callback = options
	    options = {}
	  }

	  fs.readFile(file, options, function (err, data) {
	    if (err) return callback(err)

	    var obj
	    try {
	      obj = JSON.parse(data, options ? options.reviver : null)
	    } catch (err2) {
	      err2.message = file + ': ' + err2.message
	      return callback(err2)
	    }

	    callback(null, obj)
	  })
	}

	function readFileSync (file, options) {
	  options = options || {}
	  if (typeof options === 'string') {
	    options = {encoding: options}
	  }

	  var shouldThrow = 'throws' in options ? options.throws : true
	  var content = fs.readFileSync(file, options)

	  try {
	    return JSON.parse(content, options.reviver)
	  } catch (err) {
	    if (shouldThrow) {
	      err.message = file + ': ' + err.message
	      throw err
	    } else {
	      return null
	    }
	  }
	}

	function writeFile (file, obj, options, callback) {
	  if (callback == null) {
	    callback = options
	    options = {}
	  }

	  var spaces = typeof options === 'object' && options !== null
	    ? 'spaces' in options
	    ? options.spaces : this.spaces
	    : this.spaces

	  var str = ''
	  try {
	    str = JSON.stringify(obj, options ? options.replacer : null, spaces) + '\n'
	  } catch (err) {
	    if (callback) return callback(err, null)
	  }

	  fs.writeFile(file, str, options, callback)
	}

	function writeFileSync (file, obj, options) {
	  options = options || {}

	  var spaces = typeof options === 'object' && options !== null
	    ? 'spaces' in options
	    ? options.spaces : this.spaces
	    : this.spaces

	  var str = JSON.stringify(obj, options.replacer, spaces) + '\n'
	  // not sure if fs.writeFileSync returns anything, but just in case
	  return fs.writeFileSync(file, str, options)
	}

	var jsonfile = {
	  spaces: null,
	  readFile: readFile,
	  readFileSync: readFileSync,
	  writeFile: writeFile,
	  writeFileSync: writeFileSync
	}

	module.exports = jsonfile


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var fs = __webpack_require__(61)
	var path = __webpack_require__(70)
	var jsonFile = __webpack_require__(96)
	var mkdir = __webpack_require__(74)

	function outputJsonSync (file, data, options) {
	  var dir = path.dirname(file)

	  if (!fs.existsSync(dir)) {
	    mkdir.mkdirsSync(dir)
	  }

	  jsonFile.writeJsonSync(file, data, options)
	}

	module.exports = outputJsonSync


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var fs = __webpack_require__(61)
	var path = __webpack_require__(70)
	var jsonFile = __webpack_require__(96)
	var mkdir = __webpack_require__(74)

	function outputJson (file, data, options, callback) {
	  if (typeof options === 'function') {
	    callback = options
	    options = {}
	  }

	  var dir = path.dirname(file)

	  fs.exists(dir, function (itDoes) {
	    if (itDoes) return jsonFile.writeJson(file, data, options, callback)

	    mkdir.mkdirs(dir, function (err) {
	      if (err) return callback(err)
	      jsonFile.writeJson(file, data, options, callback)
	    })
	  })
	}

	module.exports = outputJson


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	// most of this code was written by Andrew Kelley
	// licensed under the BSD license: see
	// https://github.com/andrewrk/node-mv/blob/master/package.json

	// this needs a cleanup

	var fs = __webpack_require__(61)
	var ncp = __webpack_require__(71)
	var path = __webpack_require__(70)
	var rimraf = __webpack_require__(81)
	var mkdirp = __webpack_require__(74).mkdirs

	function mv (source, dest, options, callback) {
	  if (typeof options === 'function') {
	    callback = options
	    options = {}
	  }

	  var shouldMkdirp = ('mkdirp' in options) ? options.mkdirp : true
	  var clobber = ('clobber' in options) ? options.clobber : false

	  var limit = options.limit || 16

	  if (shouldMkdirp) {
	    mkdirs()
	  } else {
	    doRename()
	  }

	  function mkdirs () {
	    mkdirp(path.dirname(dest), function (err) {
	      if (err) return callback(err)
	      doRename()
	    })
	  }

	  function doRename () {
	    if (clobber) {
	      fs.rename(source, dest, function (err) {
	        if (!err) return callback()

	        if (err.code === 'ENOTEMPTY' || err.code === 'EEXIST') {
	          rimraf(dest, function (err) {
	            if (err) return callback(err)
	            options.clobber = false // just clobbered it, no need to do it again
	            mv(source, dest, options, callback)
	          })
	          return
	        }

	        // weird Windows shit
	        if (err.code === 'EPERM') {
	          setTimeout(function () {
	            rimraf(dest, function (err) {
	              if (err) return callback(err)
	              options.clobber = false
	              mv(source, dest, options, callback)
	            })
	          }, 200)
	          return
	        }

	        if (err.code !== 'EXDEV') return callback(err)
	        moveAcrossDevice(source, dest, clobber, limit, callback)
	      })
	    } else {
	      fs.link(source, dest, function (err) {
	        if (err) {
	          if (err.code === 'EXDEV' || err.code === 'EISDIR' || err.code === 'EPERM') {
	            moveAcrossDevice(source, dest, clobber, limit, callback)
	            return
	          }
	          callback(err)
	          return
	        }
	        fs.unlink(source, callback)
	      })
	    }
	  }
	}

	function moveAcrossDevice (source, dest, clobber, limit, callback) {
	  fs.stat(source, function (err, stat) {
	    if (err) {
	      callback(err)
	      return
	    }

	    if (stat.isDirectory()) {
	      moveDirAcrossDevice(source, dest, clobber, limit, callback)
	    } else {
	      moveFileAcrossDevice(source, dest, clobber, limit, callback)
	    }
	  })
	}

	function moveFileAcrossDevice (source, dest, clobber, limit, callback) {
	  var outFlags = clobber ? 'w' : 'wx'
	  var ins = fs.createReadStream(source)
	  var outs = fs.createWriteStream(dest, {flags: outFlags})

	  ins.on('error', function (err) {
	    ins.destroy()
	    outs.destroy()
	    outs.removeListener('close', onClose)

	    // may want to create a directory but `out` line above
	    // creates an empty file for us: See #108
	    // don't care about error here
	    fs.unlink(dest, function () {
	      // note: `err` here is from the input stream errror
	      if (err.code === 'EISDIR' || err.code === 'EPERM') {
	        moveDirAcrossDevice(source, dest, clobber, limit, callback)
	      } else {
	        callback(err)
	      }
	    })
	  })

	  outs.on('error', function (err) {
	    ins.destroy()
	    outs.destroy()
	    outs.removeListener('close', onClose)
	    callback(err)
	  })

	  outs.once('close', onClose)
	  ins.pipe(outs)

	  function onClose () {
	    fs.unlink(source, callback)
	  }
	}

	function moveDirAcrossDevice (source, dest, clobber, limit, callback) {
	  var options = {
	    stopOnErr: true,
	    clobber: false,
	    limit: limit
	  }

	  function startNcp () {
	    ncp(source, dest, options, function (errList) {
	      if (errList) return callback(errList[0])
	      rimraf(source, callback)
	    })
	  }

	  if (clobber) {
	    rimraf(dest, function (err) {
	      if (err) return callback(err)
	      startNcp()
	    })
	  } else {
	    startNcp()
	  }
	}

	module.exports = {
	  move: mv
	}


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  createOutputStream: __webpack_require__(102)
	}


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var path = __webpack_require__(70)
	var fs = __webpack_require__(62)
	var mkdir = __webpack_require__(74)
	var WriteStream = fs.WriteStream

	function createOutputStream (file, options) {
	  var dirExists = false
	  var dir = path.dirname(file)
	  options = options || {}

	  // if fd is set with an actual number, file is created, hence directory is too
	  if (options.fd) {
	    return fs.createWriteStream(file, options)
	  } else {
	    // this hacks the WriteStream constructor from calling open()
	    options.fd = -1
	  }

	  var ws = new WriteStream(file, options)

	  var oldOpen = ws.open
	  ws.open = function () {
	    ws.fd = null // set actual fd
	    if (dirExists) return oldOpen.call(ws)

	    // this only runs once on first write
	    mkdir.mkdirs(dir, function (err) {
	      if (err) {
	        ws.destroy()
	        ws.emit('error', err)
	        return
	      }
	      dirExists = true
	      oldOpen.call(ws)
	    })
	  }

	  ws.open()

	  return ws
	}

	module.exports = createOutputStream


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var fs = __webpack_require__(62)
	var path = __webpack_require__(70)
	var mkdir = __webpack_require__(74)
	var remove = __webpack_require__(80)

	function emptyDir (dir, callback) {
	  callback = callback || function () {}
	  fs.readdir(dir, function (err, items) {
	    if (err) return mkdir.mkdirs(dir, callback)

	    items = items.map(function (item) {
	      return path.join(dir, item)
	    })

	    deleteItem()

	    function deleteItem () {
	      var item = items.pop()
	      if (!item) return callback()
	      remove.remove(item, function (err) {
	        if (err) return callback(err)
	        deleteItem()
	      })
	    }
	  })
	}

	function emptyDirSync (dir) {
	  var items
	  try {
	    items = fs.readdirSync(dir)
	  } catch (err) {
	    return mkdir.mkdirsSync(dir)
	  }

	  items.forEach(function (item) {
	    item = path.join(dir, item)
	    remove.removeSync(item)
	  })
	}

	module.exports = {
	  emptyDirSync: emptyDirSync,
	  emptydirSync: emptyDirSync,
	  emptyDir: emptyDir,
	  emptydir: emptyDir
	}


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var file = __webpack_require__(105)
	var link = __webpack_require__(106)
	var symlink = __webpack_require__(107)

	module.exports = {
	  // file
	  createFile: file.createFile,
	  createFileSync: file.createFileSync,
	  ensureFile: file.createFile,
	  ensureFileSync: file.createFileSync,
	  // link
	  createLink: link.createLink,
	  createLinkSync: link.createLinkSync,
	  ensureLink: link.createLink,
	  ensureLinkSync: link.createLinkSync,
	  // symlink
	  createSymlink: symlink.createSymlink,
	  createSymlinkSync: symlink.createSymlinkSync,
	  ensureSymlink: symlink.createSymlink,
	  ensureSymlinkSync: symlink.createSymlinkSync
	}


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var path = __webpack_require__(70)
	var fs = __webpack_require__(61)
	var mkdir = __webpack_require__(74)

	function createFile (file, callback) {
	  function makeFile () {
	    fs.writeFile(file, '', function (err) {
	      if (err) return callback(err)
	      callback()
	    })
	  }

	  fs.exists(file, function (fileExists) {
	    if (fileExists) return callback()
	    var dir = path.dirname(file)
	    fs.exists(dir, function (dirExists) {
	      if (dirExists) return makeFile()
	      mkdir.mkdirs(dir, function (err) {
	        if (err) return callback(err)
	        makeFile()
	      })
	    })
	  })
	}

	function createFileSync (file) {
	  if (fs.existsSync(file)) return

	  var dir = path.dirname(file)
	  if (!fs.existsSync(dir)) {
	    mkdir.mkdirsSync(dir)
	  }

	  fs.writeFileSync(file, '')
	}

	module.exports = {
	  createFile: createFile,
	  createFileSync: createFileSync,
	  // alias
	  ensureFile: createFile,
	  ensureFileSync: createFileSync
	}


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var path = __webpack_require__(70)
	var fs = __webpack_require__(61)
	var mkdir = __webpack_require__(74)

	function createLink (srcpath, dstpath, callback) {
	  function makeLink (srcpath, dstpath) {
	    fs.link(srcpath, dstpath, function (err) {
	      if (err) return callback(err)
	      callback(null)
	    })
	  }

	  fs.exists(dstpath, function (destinationExists) {
	    if (destinationExists) return callback(null)
	    fs.lstat(srcpath, function (err, stat) {
	      if (err) {
	        err.message = err.message.replace('lstat', 'ensureLink')
	        return callback(err)
	      }

	      var dir = path.dirname(dstpath)
	      fs.exists(dir, function (dirExists) {
	        if (dirExists) return makeLink(srcpath, dstpath)
	        mkdir.mkdirs(dir, function (err) {
	          if (err) return callback(err)
	          makeLink(srcpath, dstpath)
	        })
	      })
	    })
	  })
	}

	function createLinkSync (srcpath, dstpath, callback) {
	  var destinationExists = fs.existsSync(dstpath)
	  if (destinationExists) return undefined

	  try {
	    fs.lstatSync(srcpath)
	  } catch (err) {
	    err.message = err.message.replace('lstat', 'ensureLink')
	    throw err
	  }

	  var dir = path.dirname(dstpath)
	  var dirExists = fs.existsSync(dir)
	  if (dirExists) return fs.linkSync(srcpath, dstpath)
	  mkdir.mkdirsSync(dir)

	  return fs.linkSync(srcpath, dstpath)
	}

	module.exports = {
	  createLink: createLink,
	  createLinkSync: createLinkSync,
	  // alias
	  ensureLink: createLink,
	  ensureLinkSync: createLinkSync
	}


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	var path = __webpack_require__(70)
	var fs = __webpack_require__(61)
	var _mkdirs = __webpack_require__(74)
	var mkdirs = _mkdirs.mkdirs
	var mkdirsSync = _mkdirs.mkdirsSync

	var _symlinkPaths = __webpack_require__(108)
	var symlinkPaths = _symlinkPaths.symlinkPaths
	var symlinkPathsSync = _symlinkPaths.symlinkPathsSync

	var _symlinkType = __webpack_require__(110)
	var symlinkType = _symlinkType.symlinkType
	var symlinkTypeSync = _symlinkType.symlinkTypeSync

	function createSymlink (srcpath, dstpath, type, callback) {
	  callback = (typeof type === 'function') ? type : callback
	  type = (typeof type === 'function') ? false : type

	  fs.exists(dstpath, function (destinationExists) {
	    if (destinationExists) return callback(null)
	    symlinkPaths(srcpath, dstpath, function (err, relative) {
	      if (err) return callback(err)
	      srcpath = relative.toDst
	      symlinkType(relative.toCwd, type, function (err, type) {
	        if (err) return callback(err)
	        var dir = path.dirname(dstpath)
	        fs.exists(dir, function (dirExists) {
	          if (dirExists) return fs.symlink(srcpath, dstpath, type, callback)
	          mkdirs(dir, function (err) {
	            if (err) return callback(err)
	            fs.symlink(srcpath, dstpath, type, callback)
	          })
	        })
	      })
	    })
	  })
	}

	function createSymlinkSync (srcpath, dstpath, type, callback) {
	  callback = (typeof type === 'function') ? type : callback
	  type = (typeof type === 'function') ? false : type

	  var destinationExists = fs.existsSync(dstpath)
	  if (destinationExists) return undefined

	  var relative = symlinkPathsSync(srcpath, dstpath)
	  srcpath = relative.toDst
	  type = symlinkTypeSync(relative.toCwd, type)
	  var dir = path.dirname(dstpath)
	  var exists = fs.existsSync(dir)
	  if (exists) return fs.symlinkSync(srcpath, dstpath, type)
	  mkdirsSync(dir)
	  return fs.symlinkSync(srcpath, dstpath, type)
	}

	module.exports = {
	  createSymlink: createSymlink,
	  createSymlinkSync: createSymlinkSync,
	  // alias
	  ensureSymlink: createSymlink,
	  ensureSymlinkSync: createSymlinkSync
	}


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var path = __webpack_require__(70)
	// path.isAbsolute shim for Node.js 0.10 support
	path.isAbsolute = (path.isAbsolute) ? path.isAbsolute : __webpack_require__(109)
	var fs = __webpack_require__(61)

	/**
	 * Function that returns two types of paths, one relative to symlink, and one
	 * relative to the current working directory. Checks if path is absolute or
	 * relative. If the path is relative, this function checks if the path is
	 * relative to symlink or relative to current working directory. This is an
	 * initiative to find a smarter `srcpath` to supply when building symlinks.
	 * This allows you to determine which path to use out of one of three possible
	 * types of source paths. The first is an absolute path. This is detected by
	 * `path.isAbsolute()`. When an absolute path is provided, it is checked to
	 * see if it exists. If it does it's used, if not an error is returned
	 * (callback)/ thrown (sync). The other two options for `srcpath` are a
	 * relative url. By default Node's `fs.symlink` works by creating a symlink
	 * using `dstpath` and expects the `srcpath` to be relative to the newly
	 * created symlink. If you provide a `srcpath` that does not exist on the file
	 * system it results in a broken symlink. To minimize this, the function
	 * checks to see if the 'relative to symlink' source file exists, and if it
	 * does it will use it. If it does not, it checks if there's a file that
	 * exists that is relative to the current working directory, if does its used.
	 * This preserves the expectations of the original fs.symlink spec and adds
	 * the ability to pass in `relative to current working direcotry` paths.
	 */

	function symlinkPaths (srcpath, dstpath, callback) {
	  if (path.isAbsolute(srcpath)) {
	    return fs.lstat(srcpath, function (err, stat) {
	      if (err) {
	        err.message = err.message.replace('lstat', 'ensureSymlink')
	        return callback(err)
	      }
	      return callback(null, {
	        'toCwd': srcpath,
	        'toDst': srcpath
	      })
	    })
	  } else {
	    var dstdir = path.dirname(dstpath)
	    var relativeToDst = path.join(dstdir, srcpath)
	    return fs.exists(relativeToDst, function (exists) {
	      if (exists) {
	        return callback(null, {
	          'toCwd': relativeToDst,
	          'toDst': srcpath
	        })
	      } else {
	        return fs.lstat(srcpath, function (err, stat) {
	          if (err) {
	            err.message = err.message.replace('lstat', 'ensureSymlink')
	            return callback(err)
	          }
	          return callback(null, {
	            'toCwd': srcpath,
	            'toDst': path.relative(dstdir, srcpath)
	          })
	        })
	      }
	    })
	  }
	}

	function symlinkPathsSync (srcpath, dstpath) {
	  var exists
	  if (path.isAbsolute(srcpath)) {
	    exists = fs.existsSync(srcpath)
	    if (!exists) throw new Error('absolute srcpath does not exist')
	    return {
	      'toCwd': srcpath,
	      'toDst': srcpath
	    }
	  } else {
	    var dstdir = path.dirname(dstpath)
	    var relativeToDst = path.join(dstdir, srcpath)
	    exists = fs.existsSync(relativeToDst)
	    if (exists) {
	      return {
	        'toCwd': relativeToDst,
	        'toDst': srcpath
	      }
	    } else {
	      exists = fs.existsSync(srcpath)
	      if (!exists) throw new Error('relative srcpath does not exist')
	      return {
	        'toCwd': srcpath,
	        'toDst': path.relative(dstdir, srcpath)
	      }
	    }
	  }
	}

	module.exports = {
	  'symlinkPaths': symlinkPaths,
	  'symlinkPathsSync': symlinkPathsSync
	}


/***/ },
/* 109 */
/***/ function(module, exports) {

	'use strict';

	function posix(path) {
		return path.charAt(0) === '/';
	};

	function win32(path) {
		// https://github.com/joyent/node/blob/b3fcc245fb25539909ef1d5eaa01dbf92e168633/lib/path.js#L56
		var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
		var result = splitDeviceRe.exec(path);
		var device = result[1] || '';
		var isUnc = !!device && device.charAt(1) !== ':';

		// UNC paths are always absolute
		return !!result[2] || isUnc;
	};

	module.exports = process.platform === 'win32' ? win32 : posix;
	module.exports.posix = posix;
	module.exports.win32 = win32;


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var fs = __webpack_require__(61)

	function symlinkType (srcpath, type, callback) {
	  callback = (typeof type === 'function') ? type : callback
	  type = (typeof type === 'function') ? false : type
	  if (type) return callback(null, type)
	  fs.lstat(srcpath, function (err, stats) {
	    if (err) return callback(null, 'file')
	    type = (stats && stats.isDirectory()) ? 'dir' : 'file'
	    callback(null, type)
	  })
	}

	function symlinkTypeSync (srcpath, type) {
	  if (type) return type
	  try {
	    var stats = fs.lstatSync(srcpath)
	  } catch (e) {
	    return 'file'
	  }
	  return (stats && stats.isDirectory()) ? 'dir' : 'file'
	}

	module.exports = {
	  symlinkType: symlinkType,
	  symlinkTypeSync: symlinkTypeSync
	}


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var path = __webpack_require__(70)
	var fs = __webpack_require__(61)
	var mkdir = __webpack_require__(74)

	function outputFile (file, data, encoding, callback) {
	  if (typeof encoding === 'function') {
	    callback = encoding
	    encoding = 'utf8'
	  }

	  var dir = path.dirname(file)
	  fs.exists(dir, function (itDoes) {
	    if (itDoes) return fs.writeFile(file, data, encoding, callback)

	    mkdir.mkdirs(dir, function (err) {
	      if (err) return callback(err)

	      fs.writeFile(file, data, encoding, callback)
	    })
	  })
	}

	function outputFileSync (file, data, encoding) {
	  var dir = path.dirname(file)
	  if (fs.existsSync(dir)) {
	    return fs.writeFileSync.apply(fs, arguments)
	  }
	  mkdir.mkdirsSync(dir)
	  fs.writeFileSync.apply(fs, arguments)
	}

	module.exports = {
	  outputFile: outputFile,
	  outputFileSync: outputFileSync
	}


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var klaw = __webpack_require__(113)

	module.exports = {
	  walk: klaw
	}


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var assert = __webpack_require__(67)
	var fs = __webpack_require__(62)
	var path = __webpack_require__(70)
	var Readable = __webpack_require__(49).Readable
	var util = __webpack_require__(45)
	var assign = __webpack_require__(114)

	function Walker (dir, options) {
	  assert.strictEqual(typeof dir, 'string', '`dir` parameter should be of type string. Got type: ' + typeof dir)
	  var defaultStreamOptions = { objectMode: true }
	  var defaultOpts = { queueMethod: 'shift', pathSorter: undefined }
	  options = assign(defaultOpts, options, defaultStreamOptions)

	  Readable.call(this, options)
	  this.root = path.resolve(dir)
	  this.paths = [this.root]
	  this.options = options
	}
	util.inherits(Walker, Readable)

	Walker.prototype._read = function () {
	  if (this.paths.length === 0) return this.push(null)
	  var self = this
	  var pathItem = this.paths[this.options.queueMethod]()

	  fs.lstat(pathItem, function (err, stats) {
	    var item = { path: pathItem, stats: stats }
	    if (err) return self.emit('error', err, item)
	    if (!stats.isDirectory()) return self.push(item)

	    fs.readdir(pathItem, function (err, pathItems) {
	      if (err) {
	        self.push(item)
	        return self.emit('error', err, item)
	      }

	      pathItems = pathItems.map(function (part) { return path.join(pathItem, part) })
	      if (self.options.pathSorter) pathItems.sort(self.options.pathSorter)
	      pathItems.forEach(function (pi) { self.paths.push(pi) })

	      self.push(item)
	    })
	  })
	}

	function walk (root, options) {
	  return new Walker(root, options)
	}

	module.exports = walk


/***/ },
/* 114 */
/***/ function(module, exports) {

	// simple mutable assign (extracted from fs-extra)
	// I really like object-assign package, but I wanted a lean package with zero deps
	function _assign () {
	  var args = [].slice.call(arguments).filter(function (i) { return i })
	  var dest = args.shift()
	  args.forEach(function (src) {
	    Object.keys(src).forEach(function (key) {
	      dest[key] = src[key]
	    })
	  })

	  return dest
	}

	// thank you baby Jesus for Node v4 and Object.assign
	module.exports = Object.assign || _assign


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// MIT license (by Elan Shanker).
	(function(globals) {
	  'use strict';

	  var nextTick = function (fn) {
	    if (typeof setImmediate === 'function') {
	      setImmediate(fn);
	    } else if (typeof process !== 'undefined' && process.nextTick) {
	      process.nextTick(fn);
	    } else {
	      setTimeout(fn, 0);
	    }
	  };

	  var makeIterator = function (tasks) {
	    var makeCallback = function (index) {
	      var fn = function () {
	        if (tasks.length) {
	          tasks[index].apply(null, arguments);
	        }
	        return fn.next();
	      };
	      fn.next = function () {
	        return (index < tasks.length - 1) ? makeCallback(index + 1): null;
	      };
	      return fn;
	    };
	    return makeCallback(0);
	  };
	  
	  var _isArray = Array.isArray || function(maybeArray){
	    return Object.prototype.toString.call(maybeArray) === '[object Array]';
	  };

	  var waterfall = function (tasks, callback) {
	    callback = callback || function () {};
	    if (!_isArray(tasks)) {
	      var err = new Error('First argument to waterfall must be an array of functions');
	      return callback(err);
	    }
	    if (!tasks.length) {
	      return callback();
	    }
	    var wrapIterator = function (iterator) {
	      return function (err) {
	        if (err) {
	          callback.apply(null, arguments);
	          callback = function () {};
	        } else {
	          var args = Array.prototype.slice.call(arguments, 1);
	          var next = iterator.next();
	          if (next) {
	            args.push(wrapIterator(next));
	          } else {
	            args.push(callback);
	          }
	          nextTick(function () {
	            iterator.apply(null, args);
	          });
	        }
	      };
	    };
	    wrapIterator(makeIterator(tasks))();
	  };

	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return waterfall;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // RequireJS
	  } else if (typeof module !== 'undefined' && module.exports) {
	    module.exports = waterfall; // CommonJS
	  } else {
	    globals.asyncWaterfall = waterfall; // <script>
	  }
	})(this);


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _generatorEs = __webpack_require__(1);

	var _generatorEs2 = _interopRequireDefault(_generatorEs);

	var _ProceduriaBuilderEs = __webpack_require__(57);

	var _ProceduriaBuilderEs2 = _interopRequireDefault(_ProceduriaBuilderEs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ws = __webpack_require__(117),
	    server = ws.listen(8081);


	server.on('upgrade', function (req, socket, head) {
	  server.handleUpgrade(req, socket, head);
	});

	server.on('connection', function (client) {
	  client.on('ready', function () {
	    console.log('client is ready');
	    var builder = new _ProceduriaBuilderEs2.default();
	    builder.make();
	  });
	  client.on('message', function () {});
	  client.on('close', function () {});
	});

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	var net = __webpack_require__(41)
	  , http = __webpack_require__(118)

	/**
	 * Version number.
	 *
	 * @api public
	 */

	exports.version = '0.2.1';

	/**
	 * WebSocket protocols impls.
	 *
	 * @api public
	 */

	exports.protocols = __webpack_require__(119);

	/**
	 * Server constructor.
	 *
	 * @api public
	 */

	exports.Server = __webpack_require__(144);

	/**
	 * Socket constructor.
	 *
	 * @api public
	 */

	exports.Socket = __webpack_require__(121);

	/**
	 * Crates an http.Server exclusively used for WS upgrades.
	 *
	 * @param {Number} port
	 * @param {Function} callback
	 * @param {Object} options
	 * @return {Server} websocket.io server
	 * @api public
	 */

	exports.listen = function (port, fn, options) {
	  if ('object' == typeof fn) {
	    options = fn;
	    fn = null;
	  }

	  var server = http.createServer(function (req, res) {
	    res.writeHead(501);
	    res.end('Not Implemented');
	  });

	  server.listen(port, fn);

	  // create ws server
	  var ws = exports.attach(server, options);
	  ws.httpServer = server;

	  return ws;
	};

	/**
	 * Captures upgrade requests for a http.Server.
	 *
	 * @param {http.Server} server
	 * @param {Object} options
	 * @return {Server} websocket.io server
	 * @api public
	 */

	exports.attach = function (server, options) {
	  var ws = new exports.Server(options);

	  server.on('upgrade', function (req, socket, head) {
	    ws.handleUpgrade(req, socket, head);
	  });

	  return ws;
	};


/***/ },
/* 118 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Export websocket protocols.
	 */

	module.exports = {
	    drafts: __webpack_require__(120)
	  , 7: __webpack_require__(127)
	  , 8: __webpack_require__(127)
	  , 13: __webpack_require__(127)
	};


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	
	/*!
	 * socket.io-node
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	/**
	 * Module requirements.
	 */

	var Socket = __webpack_require__(121)
	  , EventEmitter = process.EventEmitter
	  , crypto = __webpack_require__(122)
	  , debug = __webpack_require__(123)('wsio:drafts')

	/**
	 * Export the constructor.
	 */

	module.exports = WebSocket;
	module.exports.Parser = Parser;

	/**
	 * HTTP interface constructor. Interface compatible with all transports that
	 * depend on request-response cycles.
	 *
	 * @api public
	 */

	function WebSocket (req) {
	  // parser
	  var self = this;

	  this.parser = new Parser();
	  this.parser
	    .on('data', function (packet) {
	      debug(self.name + ' received data packet', packet);
	      self.onMessage(packet);
	    })
	    .on('close', function () {
	      self.end();
	    })
	    .on('error', function () {
	      self.end();
	    })

	  Socket.call(this, req);
	};

	/**
	 * Inherits from Socket.
	 */

	WebSocket.prototype.__proto__ = Socket.prototype;

	/**
	 * Websocket identifier
	 *
	 * @api public
	 */

	WebSocket.prototype.name = 'websocket-hixie';

	/**
	 * Websocket draft version
	 *
	 * @api public
	 */

	WebSocket.prototype.protocolVersion = 'hixie-76';

	/**
	 * Called when the socket connects.
	 *
	 * @api private
	 */

	WebSocket.prototype.onOpen = function () {
	  var self = this;

	  this.socket.setNoDelay(true);

	  this.buffer = true;
	  this.buffered = [];

	  if (this.req.headers.upgrade !== 'WebSocket') {
	    debug(this.name + ' connection invalid');
	    this.end();
	    return;
	  }

	  var origin = this.req.headers.origin
	    , location = ((this.req.headers['x-forwarded-proto'] === 'https' || this.socket.encrypted) ? 'wss' : 'ws')
	               + '://' + this.req.headers.host + this.req.url
	    , waitingForNonce = false;

	  if (this.req.headers['sec-websocket-key1']) {
	    // If we don't have the nonce yet, wait for it (HAProxy compatibility).
	    if (! (this.req.head && this.req.head.length >= 8)) {
	      waitingForNonce = true;
	    }

	    var headers = [
	        'HTTP/1.1 101 WebSocket Protocol Handshake'
	      , 'Upgrade: WebSocket'
	      , 'Connection: Upgrade'
	      , 'Sec-WebSocket-Origin: ' + origin
	      , 'Sec-WebSocket-Location: ' + location
	    ];

	    if (this.req.headers['sec-websocket-protocol']){
	      headers.push('Sec-WebSocket-Protocol: '
	          + this.req.headers['sec-websocket-protocol']);
	    }
	  } else {
	    this.protocolVersion = 'hixie-75';
	    var headers = [
	        'HTTP/1.1 101 Web Socket Protocol Handshake'
	      , 'Upgrade: WebSocket'
	      , 'Connection: Upgrade'
	      , 'WebSocket-Origin: ' + origin
	      , 'WebSocket-Location: ' + location
	    ];
	  }

	  this.emit('headers', headers);

	  try {
	    this.socket.write(headers.concat('', '').join('\r\n'));
	    this.socket.setTimeout(0);
	    this.socket.setNoDelay(true);
	    this.socket.setEncoding('utf8');
	  } catch (e) {
	    this.end();
	    return;
	  }

	  if (waitingForNonce) {
	    this.socket.setEncoding('binary');
	  } else if (this.proveReception(headers)) {
	    process.nextTick(function() {
	      if ('opening' == self.readyState) {
	        self.readyState = 'open';
	        self.emit('open');
	        self.flush();
	      }
	    });
	  }

	  var headBuffer = '';

	  this.socket.on('data', function (data) {
	    if (waitingForNonce) {
	      headBuffer += data;

	      if (headBuffer.length < 8) {
	        return;
	      }

	      // Restore the connection to utf8 encoding after receiving the nonce
	      self.socket.setEncoding('utf8');
	      waitingForNonce = false;

	      // Stuff the nonce into the location where it's expected to be
	      self.req.head = headBuffer.substr(0, 8);
	      headBuffer = '';

	      if (self.proveReception(headers)) {
	         process.nextTick(function() {
	          if ('opening' == self.readyState) {
	            self.readyState = 'open';
	            self.emit('open');
	            self.flush();
	          }
	        });
	      }

	      return;
	    }

	    self.parser.add(data);
	  });
	};

	/**
	 * Writes to the socket.
	 *
	 * @api private
	 */

	WebSocket.prototype.write = function (data) {
	  if ('open' == this.readyState && 'open' == this.socket.readyState) {
	    this.drained = false;

	    if (this.buffer) {
	      this.buffered.push(data);
	      return this;
	    }

	    var length = Buffer.byteLength(data)
	      , buffer = new Buffer(2 + length);

	    buffer.write('\x00', 'binary');
	    buffer.write(data, 1, 'utf8');
	    buffer.write('\xff', 1 + length, 'binary');

	    try {
	      if (this.socket.write(buffer)) {
	        this.drained = true;
	      }
	    } catch (e) {
	      this.end();
	    }

	    debug(this.name + ' writing', data);
	  }
	};

	/**
	 * Flushes the internal buffer
	 *
	 * @api private
	 */

	WebSocket.prototype.flush = function () {
	  this.buffer = false;

	  for (var i = 0, l = this.buffered.length; i < l; i++) {
	    this.write(this.buffered.splice(0, 1)[0]);
	  }
	};

	/**
	 * Finishes the handshake.
	 *
	 * @api private
	 */

	WebSocket.prototype.proveReception = function (headers) {
	  var self = this
	    , k1 = this.req.headers['sec-websocket-key1']
	    , k2 = this.req.headers['sec-websocket-key2'];

	  if (k1 && k2){
	    var md5 = crypto.createHash('md5');

	    [k1, k2].forEach(function (k) {
	      var n = parseInt(k.replace(/[^\d]/g, ''))
	        , spaces = k.replace(/[^ ]/g, '').length;

	      if (spaces === 0 || n % spaces !== 0){
	        debug('Invalid ' + self.name + ' key: "' + k + '".');
	        self.end();
	        return false;
	      }

	      n /= spaces;

	      md5.update(String.fromCharCode(
	        n >> 24 & 0xFF,
	        n >> 16 & 0xFF,
	        n >> 8  & 0xFF,
	        n       & 0xFF));
	    });

	    md5.update(this.req.head.toString('binary'));

	    if ('open' != this.socket.readyState) {
	      this.end();
	      return false;
	    }

	    try {
	      this.socket.write(md5.digest('binary'), 'binary');
	    } catch (e) {
	      this.end();
	    }
	  }

	  return true;
	};

	/**
	 * Writes a payload.
	 *
	 * @api private
	 */

	WebSocket.prototype.payload = function (msgs) {
	  for (var i = 0, l = msgs.length; i < l; i++) {
	    this.write(msgs[i]);
	  }

	  return this;
	};

	/**
	 * WebSocket parser
	 *
	 * @api public
	 */

	function Parser () {
	  this.buffer = '';
	  this.i = 0;
	};

	/**
	 * Inherits from EventEmitter.
	 */

	Parser.prototype.__proto__ = EventEmitter.prototype;

	/**
	 * Adds data to the buffer.
	 *
	 * @api public
	 */

	Parser.prototype.add = function (data) {
	  this.buffer += data;
	  this.parse();
	};

	/**
	 * Parses the buffer.
	 *
	 * @api private
	 */

	Parser.prototype.parse = function () {
	  for (var i = this.i, chr, l = this.buffer.length; i < l; i++){
	    chr = this.buffer[i];

	    if (this.buffer.length == 2 && this.buffer[1] == '\u0000') {
	      this.emit('close');
	      this.buffer = '';
	      this.i = 0;
	      return;
	    }

	    if (i === 0) {
	      if (chr != '\u0000') {
	        this.error('Bad framing. Expected null byte as first frame');
	      } else {
	        continue;
	      }
	    }

	    if (chr == '\ufffd') {
	      this.emit('data', this.buffer.substr(1, i - 1));
	      this.buffer = this.buffer.substr(i + 1);
	      this.i = 0;
	      return this.parse();
	    }
	  }
	};

	/**
	 * Handles an error
	 *
	 * @api private
	 */

	Parser.prototype.error = function (reason) {
	  this.buffer = '';
	  this.i = 0;
	  this.emit('error', reason);
	  return this;
	};


/***/ },
/* 121 */
/***/ function(module, exports) {

	
	/**
	 * Module dependencies.
	 */

	var EventEmitter = process.EventEmitter

	/**
	 * Module exports.
	 */

	module.exports = Socket;

	/**
	 * Abtract Socket class.
	 *
	 * @param {http.Request} the node.js http Request
	 * @api private
	 */

	function Socket (req) {
	  this.req = req;
	  this.socket = req.socket;
	  this.readyState = 'opening';

	  var self = this;
	  this.socket
	    .on('error', function (e) {
	      self.emit('error', e);
	      self.destroy();
	    })
	    .on('end', function () {
	      self.close();
	    })
	    .on('close', function () {
	      self.onClose();
	    })
	    .on('timeout', function() {
	      self.destroy();
	    })

	  this.onOpen();
	}

	/**
	 * Inherits from EventEmitter.
	 */

	Socket.prototype.__proto__ = EventEmitter.prototype;

	/**
	 * Request that originated the connection.
	 *
	 * @api public
	 */

	Socket.prototype.req;

	/**
	 * Stream that originated the connection.
	 *
	 * @api public
	 */

	Socket.prototype.socket;

	/**
	 * Called upon socket close.
	 *
	 * @return {Socket} for chaining.
	 * @api private
	 */

	Socket.prototype.onClose = function () {
	  if ('closed' != this.readyState) {
	    this.socket.destroy();
	    this.readyState = 'closed';
	    this.emit('close');
	  }

	  return this;
	};

	/**
	 * Handles a message.
	 *
	 * @param {String} message
	 * @return {Socket} for chaining
	 * @api public
	 */

	Socket.prototype.onMessage = function (msg) {
	  this.emit('message', msg);
	  this.emit('data', msg);
	  return this;
	};

	/**
	 * Writes to the socket.
	 *
	 * @return {Socket} for chaining
	 * @api public
	 */

	Socket.prototype.send = function (data) {
	  this.write(data);
	  return this;
	};

	/**
	 * Closes the connection.
	 *
	 * @api public
	 */

	Socket.prototype.close = Socket.prototype.end = function () {
	  if ('open' == this.readyState) {
	    this.socket.end();
	    var self = this;
	    process.nextTick(function () {
	      // wait for 'end' packet from client
	      self.onClose();
	    });
	  } else {
	    this.onClose();
	  }
	  return this;
	};

	/**
	 * Destroys the connection.
	 *
	 * @api public
	 */

	Socket.prototype.destroy = function () {
	  if ('closed' != this.readyState) {
	    this.socket.destroy();
	    this.onClose();
	  }
	  return this;
	};


/***/ },
/* 122 */
/***/ function(module, exports) {

	module.exports = require("crypto");

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	var tty = __webpack_require__(124);
	var util = __webpack_require__(45);

	/**
	 * This is the Node.js implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = __webpack_require__(125);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;

	/**
	 * Colors.
	 */

	exports.colors = [6, 2, 3, 4, 5, 1];

	/**
	 * The file descriptor to write the `debug()` calls to.
	 * Set the `DEBUG_FD` env variable to override with another value. i.e.:
	 *
	 *   $ DEBUG_FD=3 node script.js 3>debug.log
	 */

	var fd = parseInt(process.env.DEBUG_FD, 10) || 2;
	var stream = 1 === fd ? process.stdout :
	             2 === fd ? process.stderr :
	             createWritableStdioStream(fd);

	/**
	 * Is stdout a TTY? Colored output is enabled when `true`.
	 */

	function useColors() {
	  var debugColors = (process.env.DEBUG_COLORS || '').trim().toLowerCase();
	  if (0 === debugColors.length) {
	    return tty.isatty(fd);
	  } else {
	    return '0' !== debugColors
	        && 'no' !== debugColors
	        && 'false' !== debugColors
	        && 'disabled' !== debugColors;
	  }
	}

	/**
	 * Map %o to `util.inspect()`, since Node doesn't do that out of the box.
	 */

	var inspect = (4 === util.inspect.length ?
	  // node <= 0.8.x
	  function (v, colors) {
	    return util.inspect(v, void 0, void 0, colors);
	  } :
	  // node > 0.8.x
	  function (v, colors) {
	    return util.inspect(v, { colors: colors });
	  }
	);

	exports.formatters.o = function(v) {
	  return inspect(v, this.useColors)
	    .replace(/\s*\n\s*/g, ' ');
	};

	/**
	 * Adds ANSI color escape codes if enabled.
	 *
	 * @api public
	 */

	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;
	  var name = this.namespace;

	  if (useColors) {
	    var c = this.color;

	    args[0] = '  \u001b[3' + c + ';1m' + name + ' '
	      + '\u001b[0m'
	      + args[0] + '\u001b[3' + c + 'm'
	      + ' +' + exports.humanize(this.diff) + '\u001b[0m';
	  } else {
	    args[0] = new Date().toUTCString()
	      + ' ' + name + ' ' + args[0];
	  }
	  return args;
	}

	/**
	 * Invokes `console.error()` with the specified arguments.
	 */

	function log() {
	  return stream.write(util.format.apply(this, arguments) + '\n');
	}

	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */

	function save(namespaces) {
	  if (null == namespaces) {
	    // If you set a process.env field to null or undefined, it gets cast to the
	    // string 'null' or 'undefined'. Just delete instead.
	    delete process.env.DEBUG;
	  } else {
	    process.env.DEBUG = namespaces;
	  }
	}

	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */

	function load() {
	  return process.env.DEBUG;
	}

	/**
	 * Copied from `node/src/node.js`.
	 *
	 * XXX: It's lame that node doesn't expose this API out-of-the-box. It also
	 * relies on the undocumented `tty_wrap.guessHandleType()` which is also lame.
	 */

	function createWritableStdioStream (fd) {
	  var stream;
	  var tty_wrap = process.binding('tty_wrap');

	  // Note stream._type is used for test-module-load-list.js

	  switch (tty_wrap.guessHandleType(fd)) {
	    case 'TTY':
	      stream = new tty.WriteStream(fd);
	      stream._type = 'tty';

	      // Hack to have stream not keep the event loop alive.
	      // See https://github.com/joyent/node/issues/1726
	      if (stream._handle && stream._handle.unref) {
	        stream._handle.unref();
	      }
	      break;

	    case 'FILE':
	      var fs = __webpack_require__(62);
	      stream = new fs.SyncWriteStream(fd, { autoClose: false });
	      stream._type = 'fs';
	      break;

	    case 'PIPE':
	    case 'TCP':
	      var net = __webpack_require__(41);
	      stream = new net.Socket({
	        fd: fd,
	        readable: false,
	        writable: true
	      });

	      // FIXME Should probably have an option in net.Socket to create a
	      // stream from an existing fd which is writable only. But for now
	      // we'll just add this hack and set the `readable` member to false.
	      // Test: ./node test/fixtures/echo.js < /etc/passwd
	      stream.readable = false;
	      stream.read = null;
	      stream._type = 'pipe';

	      // FIXME Hack to have stream not keep the event loop alive.
	      // See https://github.com/joyent/node/issues/1726
	      if (stream._handle && stream._handle.unref) {
	        stream._handle.unref();
	      }
	      break;

	    default:
	      // Probably an error on in uv_guess_handle()
	      throw new Error('Implement me. Unknown stream file type!');
	  }

	  // For supporting legacy API we put the FD here.
	  stream.fd = fd;

	  stream._isStdio = true;

	  return stream;
	}

	/**
	 * Enable namespaces listed in `process.env.DEBUG` initially.
	 */

	exports.enable(load());


/***/ },
/* 124 */
/***/ function(module, exports) {

	module.exports = require("tty");

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(126);

	/**
	 * The currently active debug mode names, and names to skip.
	 */

	exports.names = [];
	exports.skips = [];

	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */

	exports.formatters = {};

	/**
	 * Previously assigned color.
	 */

	var prevColor = 0;

	/**
	 * Previous log timestamp.
	 */

	var prevTime;

	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */

	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}

	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */

	function debug(namespace) {

	  // define the `disabled` version
	  function disabled() {
	  }
	  disabled.enabled = false;

	  // define the `enabled` version
	  function enabled() {

	    var self = enabled;

	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;

	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();

	    var args = Array.prototype.slice.call(arguments);

	    args[0] = exports.coerce(args[0]);

	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }

	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);

	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });

	    if ('function' === typeof exports.formatArgs) {
	      args = exports.formatArgs.apply(self, args);
	    }
	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;

	  var fn = exports.enabled(namespace) ? enabled : disabled;

	  fn.namespace = namespace;

	  return fn;
	}

	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */

	function enable(namespaces) {
	  exports.save(namespaces);

	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;

	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}

	/**
	 * Disable debug output.
	 *
	 * @api public
	 */

	function disable() {
	  exports.enable('');
	}

	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */

	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */

	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


/***/ },
/* 126 */
/***/ function(module, exports) {

	/**
	 * Helpers.
	 */

	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;

	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @return {String|Number}
	 * @api public
	 */

	module.exports = function(val, options){
	  options = options || {};
	  if ('string' == typeof val) return parse(val);
	  return options.long
	    ? long(val)
	    : short(val);
	};

	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */

	function parse(str) {
	  str = '' + str;
	  if (str.length > 10000) return;
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
	  if (!match) return;
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	  }
	}

	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function short(ms) {
	  if (ms >= d) return Math.round(ms / d) + 'd';
	  if (ms >= h) return Math.round(ms / h) + 'h';
	  if (ms >= m) return Math.round(ms / m) + 'm';
	  if (ms >= s) return Math.round(ms / s) + 's';
	  return ms + 'ms';
	}

	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function long(ms) {
	  return plural(ms, d, 'day')
	    || plural(ms, h, 'hour')
	    || plural(ms, m, 'minute')
	    || plural(ms, s, 'second')
	    || ms + ' ms';
	}

	/**
	 * Pluralization helper.
	 */

	function plural(ms, n, name) {
	  if (ms < n) return;
	  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}


/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	
	/*!
	 * websocket.io
	 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
	 * MIT Licensed
	 */

	/**
	 * Module requirements.
	 */

	var Socket = __webpack_require__(121)
	  , WebSocketServer = __webpack_require__(128).Server
	  , debug = __webpack_require__(123)('wsio:hybi');

	/**
	 * Export the constructor.
	 */

	exports = module.exports = WebSocket;

	/**
	 * HTTP interface constructor. Interface compatible with all transports that
	 * depend on request-response cycles.
	 *
	 * @api public
	 */

	function WebSocket (req) {
	  var self = this;
	  this.wss = new WebSocketServer({
	      noServer: true
	    , clientTracking: false
	  });
	  Socket.call(this, req);
	};

	/**
	 * Inherits from Socket.
	 */

	WebSocket.prototype.__proto__ = Socket.prototype;

	/**
	 * Transport name
	 *
	 * @api public
	 */

	WebSocket.prototype.name = 'websocket';

	/**
	 * Websocket draft version
	 *
	 * @api public
	 */

	WebSocket.prototype.protocolVersion = 'hybi';

	/**
	 * Called when the socket connects.
	 *
	 * @api private
	 */

	WebSocket.prototype.onOpen = function () {
	  var self = this;

	  this.wss.handleUpgrade(this.req, this.socket, this.req.head, function(ws) {
	    self.ws = ws;
	    self.protocolVersion = 'hybi-' + ws.protocolVersion;

	    ws.on('message', function(message) {
	      self.onMessage(message);
	    });
	    ws.on('close', function () {
	      self.end();
	    });
	    ws.on('error', function (reason) {
	      debug(self.name + ' parser error: ' + reason);
	      self.end();
	    });

	    process.nextTick(function() {
	      if ('opening' == self.readyState) {
	        self.readyState = 'open';
	        self.emit('open');
	      }
	    });
	  });
	};

	/**
	 * Writes to the socket.
	 *
	 * @api private
	 */

	WebSocket.prototype.write = function (data) {
	  if ('open' == this.readyState && this.ws) {
	    this.ws.send(data);
	    debug(this.name + ' writing', data);
	  }
	};

	/**
	 * Writes a payload.
	 *
	 * @api private
	 */

	WebSocket.prototype.payload = function (msgs) {
	  for (var i = 0, l = msgs.length; i < l; i++) {
	    this.write(msgs[i]);
	  }
	  return this;
	};


/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * ws: a node.js websocket client
	 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
	 * MIT Licensed
	 */

	module.exports = __webpack_require__(129);
	module.exports.Server = __webpack_require__(143);
	module.exports.Sender = __webpack_require__(133);
	module.exports.Receiver = __webpack_require__(137);


/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * ws: a node.js websocket client
	 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
	 * MIT Licensed
	 */

	var util = __webpack_require__(45)
	  , events = __webpack_require__(44)
	  , http = __webpack_require__(118)
	  , https = __webpack_require__(130)
	  , crypto = __webpack_require__(122)
	  , url = __webpack_require__(131)
	  , fs = __webpack_require__(62)
	  , Options = __webpack_require__(132)
	  , Sender = __webpack_require__(133)
	  , Receiver = __webpack_require__(137)
	  , SenderHixie = __webpack_require__(141)
	  , ReceiverHixie = __webpack_require__(142);

	/**
	 * Constants
	 */

	// Default protocol version

	var protocolVersion = 13;

	// Close timeout

	var closeTimeout = 30000; // Allow 5 seconds to terminate the connection cleanly

	/**
	 * Node version 0.4 and 0.6 compatibility
	 */

	var isNodeV4 = /^v0\.4/.test(process.version);

	/**
	 * WebSocket implementation
	 */

	function WebSocket(address, options) {
	  var self = this;

	  this._socket = null;
	  this.bytesReceived = 0;
	  this.readyState = null;
	  this.supports = {};

	  if (Object.prototype.toString.call(address) == '[object Array]') {
	    initAsServerClient.apply(this, address.concat(options));
	  }
	  else initAsClient.apply(this, arguments);
	}

	/**
	 * Inherits from EventEmitter.
	 */

	util.inherits(WebSocket, events.EventEmitter);

	/**
	 * Ready States
	 */

	WebSocket.CONNECTING = 0;
	WebSocket.OPEN = 1;
	WebSocket.CLOSING = 2;
	WebSocket.CLOSED = 3;

	/**
	 * Gracefully closes the connection, after sending a description message to the server
	 *
	 * @param {Object} data to be sent to the server
	 * @api public
	 */

	WebSocket.prototype.close = function(code, data) {
	  if (this.readyState == WebSocket.CLOSING || this.readyState == WebSocket.CLOSED) return;
	  if (this.readyState == WebSocket.CONNECTING) {
	    this.readyState = WebSocket.CLOSED;
	    return;
	  }
	  try {
	    this.readyState = WebSocket.CLOSING;
	    this._closeCode = code;
	    this._closeMessage = data;
	    var mask = !this._isServer;
	    this._sender.close(code, data, mask);
	  }
	  catch (e) {
	    this.emit('error', e);
	  }
	  finally {
	    this.terminate();
	  }
	}

	/**
	 * Pause the client stream
	 *
	 * @api public
	 */

	WebSocket.prototype.pause = function() {
	  if (this.readyState != WebSocket.OPEN) throw new Error('not opened');
	  return this._socket.pause();
	}

	/**
	 * Sends a ping
	 *
	 * @param {Object} data to be sent to the server
	 * @param {Object} Members - mask: boolean, binary: boolean
	 * @param {boolean} dontFailWhenClosed indicates whether or not to throw if the connection isnt open
	 * @api public
	 */

	WebSocket.prototype.ping = function(data, options, dontFailWhenClosed) {
	  if (this.readyState != WebSocket.OPEN) {
	    if (dontFailWhenClosed === true) return;
	    throw new Error('not opened');
	  }
	  options = options || {};
	  if (typeof options.mask == 'undefined') options.mask = !this._isServer;
	  this._sender.ping(data, options);
	}

	/**
	 * Sends a pong
	 *
	 * @param {Object} data to be sent to the server
	 * @param {Object} Members - mask: boolean, binary: boolean
	 * @param {boolean} dontFailWhenClosed indicates whether or not to throw if the connection isnt open
	 * @api public
	 */

	WebSocket.prototype.pong = function(data, options, dontFailWhenClosed) {
	  if (this.readyState != WebSocket.OPEN) {
	    if (dontFailWhenClosed === true) return;
	    throw new Error('not opened');
	  }
	  options = options || {};
	  if (typeof options.mask == 'undefined') options.mask = !this._isServer;
	  this._sender.pong(data, options);
	}

	/**
	 * Resume the client stream
	 *
	 * @api public
	 */

	WebSocket.prototype.resume = function() {
	  if (this.readyState != WebSocket.OPEN) throw new Error('not opened');
	  return this._socket.resume();
	}

	/**
	 * Sends a piece of data
	 *
	 * @param {Object} data to be sent to the server
	 * @param {Object} Members - mask: boolean, binary: boolean
	 * @param {function} Optional callback which is executed after the send completes
	 * @api public
	 */

	WebSocket.prototype.send = function(data, options, cb) {
	  if (typeof options == 'function') {
	    cb = options;
	    options = {};
	  }
	  if (this.readyState != WebSocket.OPEN) {
	    if (typeof cb == 'function') cb(new Error('not opened'));
	    else throw new Error('not opened');
	    return;
	  }
	  if (!data) data = '';
	  if (this._queue) {
	    var self = this;
	    this._queue.push(function() { self.send(data, options, cb); });
	    return;
	  }
	  options = options || {};
	  options.fin = true;
	  if (typeof options.mask == 'undefined') options.mask = !this._isServer;
	  if (data instanceof fs.ReadStream) {
	    startQueue(this);
	    var self = this;
	    sendStream(this, data, options, function(error) {
	      process.nextTick(function() { executeQueueSends(self); });
	      if (typeof cb == 'function') cb(error);
	    });
	  }
	  else this._sender.send(data, options, cb);
	}

	/**
	 * Streams data through calls to a user supplied function
	 *
	 * @param {Object} Members - mask: boolean, binary: boolean
	 * @param {function} 'function (error, send)' which is executed on successive ticks of which send is 'function (data, final)'.
	 * @api public
	 */

	WebSocket.prototype.stream = function(options, cb) {
	  if (typeof options == 'function') {
	    cb = options;
	    options = {};
	  }
	  if (typeof cb != 'function') throw new Error('callback must be provided');
	  if (this.readyState != WebSocket.OPEN) {
	    if (typeof cb == 'function') cb(new Error('not opened'));
	    else throw new Error('not opened');
	    return;
	  }
	  if (this._queue) {
	    var self = this;
	    this._queue.push(function() { self.stream(options, cb); });
	    return;
	  }
	  options = options || {};
	  if (typeof options.mask == 'undefined') options.mask = !this._isServer;
	  startQueue(this);
	  var self = this;
	  var send = function(data, final) {
	    try {
	      if (self.readyState != WebSocket.OPEN) throw new Error('not opened');
	      options.fin = final === true;
	      self._sender.send(data, options);
	      if (!final) process.nextTick(cb.bind(null, null, send));
	      else executeQueueSends(self);
	    }
	    catch (e) {
	      if (typeof cb == 'function') cb(e);
	      else {
	        delete self._queue;
	        self.emit('error', e);
	      }
	    }
	  }
	  process.nextTick(cb.bind(null, null, send));
	}

	/**
	 * Immediately shuts down the connection
	 *
	 * @api public
	 */

	WebSocket.prototype.terminate = function() {
	  if (this.readyState == WebSocket.CLOSED) return;
	  if (this._socket) {
	    try {
	      // End the connection
	      this._socket.end();
	    }
	    catch (e) {
	      // Socket error during end() call, so just destroy it right now
	      cleanupWebsocketResources.call(this, true);
	      return;
	    }

	    // Add a timeout to ensure that the connection is completely
	    // cleaned up within 30 seconds, even if the clean close procedure
	    // fails for whatever reason
	    setTimeout(cleanupWebsocketResources.bind(this, true), closeTimeout);
	  }
	  else if (this.readyState == WebSocket.CONNECTING) {
	    cleanupWebsocketResources.call(this, true);
	  }
	};

	/**
	 * Emulates the W3C Browser based WebSocket interface using function members.
	 *
	 * @see http://dev.w3.org/html5/websockets/#the-websocket-interface
	 * @api public
	 */

	['open', 'error', 'close', 'message'].forEach(function(method) {
	  Object.defineProperty(WebSocket.prototype, 'on' + method, {
	    /**
	     * Returns the current listener
	     *
	     * @returns {Mixed} the set function or undefined
	     * @api public
	     */

	    get: function get() {
	      var listener = this.listeners(method)[0];
	      return listener ? (listener._listener ? listener._listener : listener) : undefined;
	    },

	    /**
	     * Start listening for events
	     *
	     * @param {Function} listener the listener
	     * @returns {Mixed} the set function or undefined
	     * @api public
	     */

	    set: function set(listener) {
	      this.removeAllListeners(method);
	      this.addEventListener(method, listener);
	    }
	  });
	});

	/**
	 * Emulates the W3C Browser based WebSocket interface using addEventListener.
	 *
	 * @see https://developer.mozilla.org/en/DOM/element.addEventListener
	 * @see http://dev.w3.org/html5/websockets/#the-websocket-interface
	 * @api public
	 */
	WebSocket.prototype.addEventListener = function(method, listener) {
	  if (typeof listener === 'function') {
	    // Special case for messages as we need to wrap the data
	    // in a MessageEvent object.
	    if (method === 'message') {
	      function onMessage (data) {
	        listener.call(this, new MessageEvent(data));
	      }

	      // store a reference so we can return the origional function again
	      onMessage._listener = listener;
	      this.on(method, onMessage);
	    } else {
	      this.on(method, listener);
	    }
	  }
	}

	module.exports = WebSocket;

	/**
	 * W3C MessageEvent
	 *
	 * @see http://www.w3.org/TR/html5/comms.html
	 * @api private
	 */

	function MessageEvent(dataArg) {
	  // Currently only the data attribute is implemented. More can be added later if needed.
	  Object.defineProperty(this, 'data', { writable: false, value: dataArg });
	}

	/**
	 * Entirely private apis,
	 * which may or may not be bound to a sepcific WebSocket instance.
	 */

	 function initAsServerClient(req, socket, upgradeHead, options) {
	  options = new Options({
	    protocolVersion: protocolVersion,
	    protocol: null
	  }).merge(options);

	  // expose state properties
	  this.protocol = options.value.protocol;
	  this.protocolVersion = options.value.protocolVersion;
	  this.supports.binary = (this.protocolVersion != 'hixie-76');
	  this.upgradeReq = req;
	  this.readyState = WebSocket.CONNECTING;
	  this._isServer = true;

	  // establish connection
	  if (options.value.protocolVersion == 'hixie-76') establishConnection.call(this, ReceiverHixie, SenderHixie, socket, upgradeHead);
	  else establishConnection.call(this, Receiver, Sender, socket, upgradeHead);
	}

	function initAsClient(address, options) {
	  options = new Options({
	    origin: null,
	    protocolVersion: protocolVersion,
	    protocol: null
	  }).merge(options);
	  if (options.value.protocolVersion != 8 && options.value.protocolVersion != 13) {
	    throw new Error('unsupported protocol version');
	  }

	  // verify url and establish http class
	  var serverUrl = url.parse(address);
	  var isUnixSocket = serverUrl.protocol === 'ws+unix:';
	  if (!serverUrl.host && !isUnixSocket) throw new Error('invalid url');
	  var isSecure = serverUrl.protocol === 'wss:' || serverUrl.protocol === 'https:';
	  var httpObj = isSecure ? https : http;

	  // expose state properties
	  this._isServer = false;
	  this.url = address;
	  this.protocolVersion = options.value.protocolVersion;
	  this.supports.binary = (this.protocolVersion != 'hixie-76');

	  // begin handshake
	  var key = new Buffer(options.value.protocolVersion + '-' + Date.now()).toString('base64');
	  var shasum = crypto.createHash('sha1');
	  shasum.update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11');
	  var expectedServerKey = shasum.digest('base64');

	  // node<=v0.4.x compatibility
	  var agent;
	  if (isNodeV4) {
	    isNodeV4 = true;
	    agent = new httpObj.Agent({
	      host: serverUrl.hostname,
	      port: serverUrl.port || (isSecure ? 443 : 80)
	    });
	  }

	  var requestOptions = {
	    port: serverUrl.port || (isSecure ? 443 : 80),
	    host: serverUrl.hostname,
	    headers: {
	      'Connection': 'Upgrade',
	      'Upgrade': 'websocket',
	      'Sec-WebSocket-Version': options.value.protocolVersion,
	      'Sec-WebSocket-Key': key
	    }
	  };
	  if (options.value.protocol) {
	    requestOptions.headers['Sec-WebSocket-Protocol'] = options.value.protocol;
	  }
	  if (isNodeV4) {
	    requestOptions.path = (serverUrl.pathname || '/') + (serverUrl.search || '');
	    requestOptions.agent = agent;
	  }
	  else requestOptions.path = serverUrl.path || '/';
	  if (isUnixSocket) {
	    requestOptions.socketPath = serverUrl.pathname;
	  }
	  if (options.value.origin) {
	    if (options.value.protocolVersion < 13) requestOptions.headers['Sec-WebSocket-Origin'] = options.value.origin;
	    else requestOptions.headers['Origin'] = options.value.origin;
	  }

	  var self = this;
	  var req = httpObj.request(requestOptions);
	  (isNodeV4 ? agent : req).on('error', function(error) {
	    self.emit('error', error);
	  });
	  (isNodeV4 ? agent : req).once('upgrade', function(res, socket, upgradeHead) {
	    if (self.readyState == WebSocket.CLOSED) {
	      // client closed before server accepted connection
	      self.emit('close');
	      removeAllListeners(self);
	      socket.end();
	      return;
	    }
	    var serverKey = res.headers['sec-websocket-accept'];
	    if (typeof serverKey == 'undefined' || serverKey !== expectedServerKey) {
	      self.emit('error', 'invalid server key');
	      removeAllListeners(self);
	      socket.end();
	      return;
	    }

	    establishConnection.call(self, Receiver, Sender, socket, upgradeHead);

	    // perform cleanup on http resources
	    removeAllListeners(isNodeV4 ? agent : req);
	    req = null;
	    agent = null;
	  });

	  req.end();
	  this.readyState = WebSocket.CONNECTING;
	}

	function establishConnection(ReceiverClass, SenderClass, socket, upgradeHead) {
	  this._socket = socket;
	  socket.setTimeout(0);
	  socket.setNoDelay(true);
	  var self = this;
	  this._receiver = new ReceiverClass();

	  // socket cleanup handlers
	  socket.on('end', cleanupWebsocketResources.bind(this));
	  socket.on('close', cleanupWebsocketResources.bind(this));

	  // ensure that the upgradeHead is added to the receiver
	  function firstHandler(data) {
	    if (self.readyState != WebSocket.OPEN) return;
	    if (upgradeHead && upgradeHead.length > 0) {
	      self.bytesReceived += upgradeHead.length;
	      var head = upgradeHead;
	      upgradeHead = null;
	      self._receiver.add(head);
	    }
	    dataHandler = realHandler;
	    if (data) {
	      self.bytesReceived += data.length;
	      self._receiver.add(data);
	    }
	  }
	  // subsequent packets are pushed straight to the receiver
	  function realHandler(data) {
	    if (data) self.bytesReceived += data.length;
	    self._receiver.add(data);
	  }
	  var dataHandler = firstHandler;
	  socket.on('data', dataHandler);
	  // if data was passed along with the http upgrade,
	  // this will schedule a push of that on to the receiver.
	  // this has to be done on next tick, since the caller
	  // hasn't had a chance to set event handlers on this client
	  // object yet.
	  process.nextTick(firstHandler);

	  // receiver event handlers
	  self._receiver.ontext = function (data, flags) {
	    flags = flags || {};
	    self.emit('message', data, flags);
	  };
	  self._receiver.onbinary = function (data, flags) {
	    flags = flags || {};
	    flags.binary = true;
	    self.emit('message', data, flags);
	  };
	  self._receiver.onping = function(data, flags) {
	    flags = flags || {};
	    self.pong(data, {mask: !self._isServer, binary: flags.binary === true}, true);
	    self.emit('ping', data, flags);
	  };
	  self._receiver.onpong = function(data, flags) {
	    self.emit('pong', data, flags);
	  };
	  self._receiver.onclose = function(code, data, flags) {
	    flags = flags || {};
	    self.close(code, data);
	  };
	  self._receiver.onerror = function(reason, errorCode) {
	    // close the connection when the receiver reports a HyBi error code
	    self.close(typeof errorCode != 'undefined' ? errorCode : 1002, '');
	    self.emit('error', reason, errorCode);
	  };

	  // finalize the client
	  this._sender = new SenderClass(socket);
	  this._sender.on('error', function(error) {
	    self.close(1002, '');
	    self.emit('error', error);
	  });
	  this.readyState = WebSocket.OPEN;
	  this.emit('open');
	}

	function startQueue(instance) {
	  instance._queue = instance._queue || [];
	}

	function executeQueueSends(instance) {
	  var queue = instance._queue;
	  if (typeof queue == 'undefined') return;
	  delete instance._queue;
	  for (var i = 0, l = queue.length; i < l; ++i) {
	    queue[i]();
	  }
	}

	function sendStream(instance, stream, options, cb) {
	  stream.on('data', function(data) {
	    if (instance.readyState != WebSocket.OPEN) {
	      if (typeof cb == 'function') cb(new Error('not opened'));
	      else {
	        delete instance._queue;
	        instance.emit('error', new Error('not opened'));
	      }
	      return;
	    }
	    options.fin = false;
	    instance._sender.send(data, options);
	  });
	  stream.on('end', function() {
	    if (instance.readyState != WebSocket.OPEN) {
	      if (typeof cb == 'function') cb(new Error('not opened'));
	      else {
	        delete instance._queue;
	        instance.emit('error', new Error('not opened'));
	      }
	      return;
	    }
	    options.fin = true;
	    instance._sender.send(null, options);
	    if (typeof cb == 'function') cb(null);
	  });
	}

	function cleanupWebsocketResources(error) {
	  if (this.readyState == WebSocket.CLOSED) return;
	  var emitClose = this.readyState != WebSocket.CONNECTING;
	  this.readyState = WebSocket.CLOSED;
	  if (this._socket) {
	    removeAllListeners(this._socket);
	    // catch all socket error after removing all standard handlers
	    var socket = this._socket;
	    this._socket.on('error', function() {
	      try { socket.destroy(); } catch (e) {}
	    });
	    try {
	      if (!error) this._socket.end();
	      else this._socket.terminate();
	    }
	    catch (e) { /* Ignore termination errors */ }
	    this._socket = null;
	  }
	  if (this._sender) {
	    removeAllListeners(this._sender);
	    this._sender = null;
	  }
	  if (this._receiver) {
	    this._receiver.cleanup();
	    this._receiver = null;
	  }
	  if (emitClose) this.emit('close', this._closeCode || 1000, this._closeMessage || '');
	  removeAllListeners(this);
	  this.on('error', function() {}); // catch all errors after this
	  delete this._queue;
	}

	function removeAllListeners(instance) {
	  if (isNodeV4) {
	    // node v4 doesn't *actually* remove all listeners globally,
	    // so we do that instead
	    instance._events = {};
	  }
	  else instance.removeAllListeners();
	}


/***/ },
/* 130 */
/***/ function(module, exports) {

	module.exports = require("https");

/***/ },
/* 131 */
/***/ function(module, exports) {

	module.exports = require("url");

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
	 * MIT Licensed
	 */

	var fs = __webpack_require__(62);

	function Options(defaults) {
	  var internalValues = {};
	  var values = this.value = {};
	  Object.keys(defaults).forEach(function(key) {
	    internalValues[key] = defaults[key];
	    Object.defineProperty(values, key, {
	      get: function() { return internalValues[key]; },
	      configurable: false,
	      enumerable: true
	    });
	  });
	  this.reset = function() {
	    Object.keys(defaults).forEach(function(key) {
	      internalValues[key] = defaults[key];
	    });
	    return this;
	  };
	  this.merge = function(options, required) {
	    options = options || {};
	    if (Object.prototype.toString.call(required) === '[object Array]') {
	      var missing = [];
	      for (var i = 0, l = required.length; i < l; ++i) {
	        var key = required[i];
	        if (!(key in options)) {
	          missing.push(key);
	        }
	      }
	      if (missing.length > 0) {
	        if (missing.length > 1) {
	          throw new Error('options ' +
	            missing.slice(0, missing.length - 1).join(', ') + ' and ' +
	            missing[missing.length - 1] + ' must be defined');
	        }
	        else throw new Error('option ' + missing[0] + ' must be defined');
	      }
	    }
	    Object.keys(options).forEach(function(key) {
	      if (key in internalValues) {
	        internalValues[key] = options[key];
	      }
	    });
	    return this;
	  };
	  this.copy = function(keys) {
	    var obj = {};
	    Object.keys(defaults).forEach(function(key) {
	      if (keys.indexOf(key) !== -1) {
	        obj[key] = values[key];
	      }
	    });
	    return obj;
	  };
	  this.read = function(filename, cb) {
	    if (typeof cb == 'function') {
	      var self = this;
	      fs.readFile(filename, function(error, data) {
	        if (error) return cb(error);
	        var conf = JSON.parse(data);
	        self.merge(conf);
	        cb();
	      });
	    }
	    else {
	      var conf = JSON.parse(fs.readFileSync(filename));
	      this.merge(conf);
	    }
	    return this;
	  };
	  this.isDefined = function(key) {
	    return typeof values[key] != 'undefined';
	  };
	  this.isDefinedAndNonNull = function(key) {
	    return typeof values[key] != 'undefined' && values[key] !== null;
	  };
	  Object.freeze(values);
	  Object.freeze(this);
	}

	module.exports = Options;


/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * ws: a node.js websocket client
	 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
	 * MIT Licensed
	 */

	var events = __webpack_require__(44)
	  , util = __webpack_require__(45)
	  , EventEmitter = events.EventEmitter
	  , ErrorCodes = __webpack_require__(134)
	  , bufferUtil = __webpack_require__(135).BufferUtil;

	/**
	 * HyBi Sender implementation
	 */

	function Sender(socket) {
	  this._socket = socket;
	  this.firstFragment = true;
	}

	/**
	 * Inherits from EventEmitter.
	 */

	util.inherits(Sender, events.EventEmitter);

	/**
	 * Sends a close instruction to the remote party.
	 *
	 * @api public
	 */

	Sender.prototype.close = function(code, data, mask) {
	  if (typeof code !== 'undefined') {
	    if (typeof code !== 'number' ||
	      !ErrorCodes.isValidErrorCode(code)) throw new Error('first argument must be a valid error code number');
	  }
	  code = code || 1000;
	  var dataBuffer = new Buffer(2 + (data ? Buffer.byteLength(data) : 0));
	  writeUInt16BE.call(dataBuffer, code, 0);
	  if (dataBuffer.length > 2) dataBuffer.write(data, 2);
	  this.frameAndSend(0x8, dataBuffer, true, mask);
	}

	/**
	 * Sends a ping message to the remote party.
	 *
	 * @api public
	 */

	Sender.prototype.ping = function(data, options) {
	  var mask = options && options.mask;
	  this.frameAndSend(0x9, data || '', true, mask);
	}

	/**
	 * Sends a pong message to the remote party.
	 *
	 * @api public
	 */

	Sender.prototype.pong = function(data, options) {
	  var mask = options && options.mask;
	  this.frameAndSend(0xa, data || '', true, mask);
	}

	/**
	 * Sends text or binary data to the remote party.
	 *
	 * @api public
	 */

	Sender.prototype.send = function(data, options, cb) {
	  var finalFragment = options && options.fin === false ? false : true;
	  var mask = options && options.mask;
	  var opcode = options && options.binary ? 2 : 1;
	  if (this.firstFragment === false) opcode = 0;
	  else this.firstFragment = false;
	  if (finalFragment) this.firstFragment = true
	  this.frameAndSend(opcode, data, finalFragment, mask, cb);
	}

	/**
	 * Frames and sends a piece of data according to the HyBi WebSocket protocol.
	 *
	 * @api private
	 */

	Sender.prototype.frameAndSend = function(opcode, data, finalFragment, maskData, cb) {
	  var canModifyData = false;

	  if (!data) {
	    try {
	      this._socket.write(new Buffer([opcode | (finalFragment ? 0x80 : 0), 0 | (maskData ? 0x80 : 0)].concat(maskData ? [0, 0, 0, 0] : [])), 'binary', cb);
	    }
	    catch (e) {
	      if (typeof cb == 'function') cb(e);
	      else this.emit('error', e);
	    }
	    return;
	  }

	  if (!Buffer.isBuffer(data)) {
	    canModifyData = true;
	    data = (data && typeof data.buffer !== 'undefined') ? getArrayBuffer(data.buffer) : new Buffer(data);
	  }

	  var dataLength = data.length
	    , dataOffset = maskData ? 6 : 2
	    , secondByte = dataLength;

	  if (dataLength >= 65536) {
	    dataOffset += 8;
	    secondByte = 127;
	  }
	  else if (dataLength > 125) {
	    dataOffset += 2;
	    secondByte = 126;
	  }

	  var mergeBuffers = dataLength < 32768 || (maskData && !canModifyData);
	  var totalLength = mergeBuffers ? dataLength + dataOffset : dataOffset;
	  var outputBuffer = new Buffer(totalLength);
	  outputBuffer[0] = finalFragment ? opcode | 0x80 : opcode;

	  switch (secondByte) {
	    case 126:
	      writeUInt16BE.call(outputBuffer, dataLength, 2);
	      break;
	    case 127:
	      writeUInt32BE.call(outputBuffer, 0, 2);
	      writeUInt32BE.call(outputBuffer, dataLength, 6);
	  }

	  if (maskData) {
	    outputBuffer[1] = secondByte | 0x80;
	    var mask = this._randomMask || (this._randomMask = getRandomMask());
	    outputBuffer[dataOffset - 4] = mask[0];
	    outputBuffer[dataOffset - 3] = mask[1];
	    outputBuffer[dataOffset - 2] = mask[2];
	    outputBuffer[dataOffset - 1] = mask[3];
	    if (mergeBuffers) {
	      bufferUtil.mask(data, mask, outputBuffer, dataOffset, dataLength);
	      try {
	        this._socket.write(outputBuffer, 'binary', cb);
	      }
	      catch (e) {
	        if (typeof cb == 'function') cb(e);
	        else this.emit('error', e);
	      }
	    }
	    else {
	      bufferUtil.mask(data, mask, data, 0, dataLength);
	      try {
	        this._socket.write(outputBuffer, 'binary');
	        this._socket.write(data, 'binary', cb);
	      }
	      catch (e) {
	        if (typeof cb == 'function') cb(e);
	        else this.emit('error', e);
	      }
	    }
	  }
	  else {
	    outputBuffer[1] = secondByte;
	    if (mergeBuffers) {
	      data.copy(outputBuffer, dataOffset);
	      try {
	        this._socket.write(outputBuffer, 'binary', cb);
	      }
	      catch (e) {
	        if (typeof cb == 'function') cb(e);
	        else this.emit('error', e);
	      }
	    }
	    else {
	      try {
	        this._socket.write(outputBuffer, 'binary');
	        this._socket.write(data, 'binary', cb);
	      }
	      catch (e) {
	        if (typeof cb == 'function') cb(e);
	        else this.emit('error', e);
	      }
	    }
	  }
	}

	module.exports = Sender;

	function writeUInt16BE(value, offset) {
	  this[offset] = (value & 0xff00)>>8;
	  this[offset+1] = value & 0xff;
	}

	function writeUInt32BE(value, offset) {
	  this[offset] = (value & 0xff000000)>>24;
	  this[offset+1] = (value & 0xff0000)>>16;
	  this[offset+2] = (value & 0xff00)>>8;
	  this[offset+3] = value & 0xff;
	}

	function getArrayBuffer(array) {
	  var l = array.byteLength
	    , buffer = new Buffer(l);
	  for (var i = 0; i < l; ++i) {
	    buffer[i] = array[i];
	  }
	  return buffer;
	}

	function getRandomMask() {
	  return new Buffer([
	    ~~(Math.random() * 255),
	    ~~(Math.random() * 255),
	    ~~(Math.random() * 255),
	    ~~(Math.random() * 255)
	  ]);
	}


/***/ },
/* 134 */
/***/ function(module, exports) {

	/*!
	 * ws: a node.js websocket client
	 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
	 * MIT Licensed
	 */

	module.exports = {
	  isValidErrorCode: function(code) {
	    return (code >= 1000 && code <= 1011 && code != 1004 && code != 1005 && code != 1006) ||
	         (code >= 3000 && code <= 4999);
	  },
	  1000: 'normal',
	  1001: 'going away',
	  1002: 'protocol error',
	  1003: 'unsupported data',
	  1004: 'reserved',
	  1005: 'reserved for extensions',
	  1006: 'reserved for extensions',
	  1007: 'inconsistent or invalid data',
	  1008: 'policy violation',
	  1009: 'message too big',
	  1010: 'extension handshake missing',
	  1011: 'an unexpected condition prevented the request from being fulfilled',
	};

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * ws: a node.js websocket client
	 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
	 * MIT Licensed
	 */

	try {
	  module.exports = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../build/Release/bufferutil\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	} catch (e) { try {
	  module.exports = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../build/default/bufferutil\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	} catch (e) { try {
	  module.exports = __webpack_require__(136);
	} catch (e) {
	  console.error('bufferutil.node seems to not have been built. Run npm install.');
	  throw e;
	}}}


/***/ },
/* 136 */
/***/ function(module, exports) {

	/*!
	 * ws: a node.js websocket client
	 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
	 * MIT Licensed
	 */

	module.exports.BufferUtil = {
	  merge: function(mergedBuffer, buffers) {
	    var offset = 0;
	    for (var i = 0, l = buffers.length; i < l; ++i) {
	      var buf = buffers[i];
	      buf.copy(mergedBuffer, offset);
	      offset += buf.length;
	    }
	  },
	  mask: function(source, mask, output, offset, length) {
	    var maskNum = mask.readUInt32LE(0, true);
	    var i = 0;
	    for (; i < length - 3; i += 4) {
	      var num = maskNum ^ source.readUInt32LE(i, true);
	      if (num < 0) num = 4294967296 + num;
	      output.writeUInt32LE(num, offset + i, true);
	    }
	    switch (length % 4) {
	      case 3: output[offset + i + 2] = source[i + 2] ^ mask[2];
	      case 2: output[offset + i + 1] = source[i + 1] ^ mask[1];
	      case 1: output[offset + i] = source[i] ^ mask[0];
	      case 0:;
	    }
	  },
	  unmask: function(data, mask) {
	    var maskNum = mask.readUInt32LE(0, true);
	    var length = data.length;
	    var i = 0;
	    for (; i < length - 3; i += 4) {
	      var num = maskNum ^ data.readUInt32LE(i, true);
	      if (num < 0) num = 4294967296 + num;
	      data.writeUInt32LE(num, i, true);
	    }
	    switch (length % 4) {
	      case 3: data[i + 2] = data[i + 2] ^ mask[2];
	      case 2: data[i + 1] = data[i + 1] ^ mask[1];
	      case 1: data[i] = data[i] ^ mask[0];
	      case 0:;
	    }
	  }
	}


/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * ws: a node.js websocket client
	 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
	 * MIT Licensed
	 */

	var util = __webpack_require__(45)
	  , Validation = __webpack_require__(138).Validation
	  , ErrorCodes = __webpack_require__(134)
	  , BufferPool = __webpack_require__(140)
	  , bufferUtil = __webpack_require__(135).BufferUtil;

	/**
	 * Node version 0.4 and 0.6 compatibility
	 */

	var isNodeV4 = /^v0\.4/.test(process.version);

	/**
	 * HyBi Receiver implementation
	 */

	function Receiver () {
	  // memory pool for fragmented messages
	  var fragmentedPoolPrevUsed = -1;
	  this.fragmentedBufferPool = new BufferPool(1024, function(db, length) {
	    return db.used + length;
	  }, function(db) {
	    return fragmentedPoolPrevUsed = fragmentedPoolPrevUsed >= 0 ?
	      (fragmentedPoolPrevUsed + db.used) / 2 :
	      db.used;
	  });

	  // memory pool for unfragmented messages
	  var unfragmentedPoolPrevUsed = -1;
	  this.unfragmentedBufferPool = new BufferPool(1024, function(db, length) {
	    return db.used + length;
	  }, function(db) {
	    return unfragmentedPoolPrevUsed = unfragmentedPoolPrevUsed >= 0 ?
	      (unfragmentedPoolPrevUsed + db.used) / 2 :
	      db.used;
	  });

	  this.state = {
	    activeFragmentedOperation: null,
	    lastFragment: false,
	    masked: false,
	    opcode: 0,
	    fragmentedOperation: false
	  };
	  this.overflow = [];
	  this.headerBuffer = new Buffer(10);
	  this.expectOffset = 0;
	  this.expectBuffer = null;
	  this.expectHandler = null;
	  this.currentMessage = [];
	  this.expectHeader(2, this.processPacket);
	  this.dead = false;

	  this.onerror = function() {};
	  this.ontext = function() {};
	  this.onbinary = function() {};
	  this.onclose = function() {};
	  this.onping = function() {};
	  this.onpong = function() {};
	};

	module.exports = Receiver;

	/**
	 * Add new data to the parser.
	 *
	 * @api public
	 */

	Receiver.prototype.add = function(data) {
	  var dataLength = data.length;
	  if (dataLength == 0) return;
	  if (this.expectBuffer == null) {
	    this.overflow.push(data);
	    return;
	  }
	  var toRead = Math.min(dataLength, this.expectBuffer.length - this.expectOffset);
	  fastCopy(toRead, data, this.expectBuffer, this.expectOffset);
	  this.expectOffset += toRead;
	  if (toRead < dataLength) {
	    this.overflow.push(data.slice(toRead));
	  }
	  while (this.expectBuffer && this.expectOffset == this.expectBuffer.length) {
	    var bufferForHandler = this.expectBuffer;
	    this.expectBuffer = null;
	    this.expectOffset = 0;
	    this.expectHandler.call(this, bufferForHandler);
	  }
	}

	/**
	 * Releases all resources used by the receiver.
	 *
	 * @api public
	 */

	Receiver.prototype.cleanup = function() {
	  this.dead = true;
	  this.overflow = null;
	  this.headerBuffer = null;
	  this.expectBuffer = null;
	  this.expectHandler = null;
	  this.unfragmentedBufferPool = null;
	  this.fragmentedBufferPool = null;
	  this.state = null;
	  this.currentMessage = null;
	  this.onerror = null;
	  this.ontext = null;
	  this.onbinary = null;
	  this.onclose = null;
	  this.onping = null;
	  this.onpong = null;
	}

	/**
	 * Waits for a certain amount of header bytes to be available, then fires a callback.
	 *
	 * @api private
	 */

	Receiver.prototype.expectHeader = function(length, handler) {
	  if (length == 0) {
	    handler(null);
	    return;
	  }
	  this.expectBuffer = this.headerBuffer.slice(this.expectOffset, this.expectOffset + length);
	  this.expectHandler = handler;
	  var toRead = length;
	  while (toRead > 0 && this.overflow.length > 0) {
	    var fromOverflow = this.overflow.pop();
	    if (toRead < fromOverflow.length) this.overflow.push(fromOverflow.slice(toRead));
	    var read = Math.min(fromOverflow.length, toRead);
	    fastCopy(read, fromOverflow, this.expectBuffer, this.expectOffset);
	    this.expectOffset += read;
	    toRead -= read;
	  }
	}

	/**
	 * Waits for a certain amount of data bytes to be available, then fires a callback.
	 *
	 * @api private
	 */

	Receiver.prototype.expectData = function(length, handler) {
	  if (length == 0) {
	    handler(null);
	    return;
	  }
	  this.expectBuffer = this.allocateFromPool(length, this.state.fragmentedOperation);
	  this.expectHandler = handler;
	  var toRead = length;
	  while (toRead > 0 && this.overflow.length > 0) {
	    var fromOverflow = this.overflow.pop();
	    if (toRead < fromOverflow.length) this.overflow.push(fromOverflow.slice(toRead));
	    var read = Math.min(fromOverflow.length, toRead);
	    fastCopy(read, fromOverflow, this.expectBuffer, this.expectOffset);
	    this.expectOffset += read;
	    toRead -= read;
	  }
	}

	/**
	 * Allocates memory from the buffer pool.
	 *
	 * @api private
	 */

	Receiver.prototype.allocateFromPool = !isNodeV4
	  ? function(length, isFragmented) { return (isFragmented ? this.fragmentedBufferPool : this.unfragmentedBufferPool).get(length); }
	  : function(length) { return new Buffer(length); };

	/**
	 * Start processing a new packet.
	 *
	 * @api private
	 */

	Receiver.prototype.processPacket = function (data) {
	  if ((data[0] & 0x70) != 0) {
	    this.error('reserved fields must be empty', 1002);
	    return;
	  }
	  this.state.lastFragment = (data[0] & 0x80) == 0x80;
	  this.state.masked = (data[1] & 0x80) == 0x80;
	  var opcode = data[0] & 0xf;
	  if (opcode === 0) {
	    // continuation frame
	    this.state.fragmentedOperation = true;
	    this.state.opcode = this.state.activeFragmentedOperation;
	    if (!(this.state.opcode == 1 || this.state.opcode == 2)) {
	      this.error('continuation frame cannot follow current opcode', 1002);
	      return;
	    }
	  }
	  else {
	    if (opcode < 3 && this.state.activeFragmentedOperation != null) {
	      this.error('data frames after the initial data frame must have opcode 0', 1002);
	      return;
	    }
	    this.state.opcode = opcode;
	    if (this.state.lastFragment === false) {
	      this.state.fragmentedOperation = true;
	      this.state.activeFragmentedOperation = opcode;
	    }
	    else this.state.fragmentedOperation = false;
	  }
	  var handler = opcodes[this.state.opcode];
	  if (typeof handler == 'undefined') this.error('no handler for opcode ' + this.state.opcode, 1002);
	  else {
	    handler.start.call(this, data);
	  }
	}

	/**
	 * Endprocessing a packet.
	 *
	 * @api private
	 */

	Receiver.prototype.endPacket = function() {
	  if (!this.state.fragmentedOperation) this.unfragmentedBufferPool.reset(true);
	  else if (this.state.lastFragment) this.fragmentedBufferPool.reset(false);
	  this.expectOffset = 0;
	  this.expectBuffer = null;
	  this.expectHandler = null;
	  if (this.state.lastFragment && this.state.opcode === this.state.activeFragmentedOperation) {
	    // end current fragmented operation
	    this.state.activeFragmentedOperation = null;
	  }
	  this.state.lastFragment = false;
	  this.state.opcode = this.state.activeFragmentedOperation != null ? this.state.activeFragmentedOperation : 0;
	  this.state.masked = false;
	  this.expectHeader(2, this.processPacket);
	}

	/**
	 * Reset the parser state.
	 *
	 * @api private
	 */

	Receiver.prototype.reset = function() {
	  if (this.dead) return;
	  this.state = {
	    activeFragmentedOperation: null,
	    lastFragment: false,
	    masked: false,
	    opcode: 0,
	    fragmentedOperation: false
	  };
	  this.fragmentedBufferPool.reset(true);
	  this.unfragmentedBufferPool.reset(true);
	  this.expectOffset = 0;
	  this.expectBuffer = null;
	  this.expectHandler = null;
	  this.overflow = [];
	  this.currentMessage = [];
	}

	/**
	 * Unmask received data.
	 *
	 * @api private
	 */

	Receiver.prototype.unmask = function (mask, buf, binary) {
	  if (mask != null && buf != null) bufferUtil.unmask(buf, mask);
	  if (binary) return buf;
	  return buf != null ? buf.toString('utf8') : '';
	}

	/**
	 * Concatenates a list of buffers.
	 *
	 * @api private
	 */

	Receiver.prototype.concatBuffers = function(buffers) {
	  var length = 0;
	  for (var i = 0, l = buffers.length; i < l; ++i) length += buffers[i].length;
	  var mergedBuffer = new Buffer(length);
	  bufferUtil.merge(mergedBuffer, buffers);
	  return mergedBuffer;
	}

	/**
	 * Handles an error
	 *
	 * @api private
	 */

	Receiver.prototype.error = function (reason, protocolErrorCode) {
	  this.reset();
	  this.onerror(reason, protocolErrorCode);
	  return this;
	}

	/**
	 * Buffer utilities
	 */

	function readUInt16BE(start) {
	  return (this[start]<<8) +
	         this[start+1];
	}

	function readUInt32BE(start) {
	  return (this[start]<<24) +
	         (this[start+1]<<16) +
	         (this[start+2]<<8) +
	         this[start+3];
	}

	function fastCopy(length, srcBuffer, dstBuffer, dstOffset) {
	  switch (length) {
	    default: srcBuffer.copy(dstBuffer, dstOffset, 0, length); break;
	    case 16: dstBuffer[dstOffset+15] = srcBuffer[15];
	    case 15: dstBuffer[dstOffset+14] = srcBuffer[14];
	    case 14: dstBuffer[dstOffset+13] = srcBuffer[13];
	    case 13: dstBuffer[dstOffset+12] = srcBuffer[12];
	    case 12: dstBuffer[dstOffset+11] = srcBuffer[11];
	    case 11: dstBuffer[dstOffset+10] = srcBuffer[10];
	    case 10: dstBuffer[dstOffset+9] = srcBuffer[9];
	    case 9: dstBuffer[dstOffset+8] = srcBuffer[8];
	    case 8: dstBuffer[dstOffset+7] = srcBuffer[7];
	    case 7: dstBuffer[dstOffset+6] = srcBuffer[6];
	    case 6: dstBuffer[dstOffset+5] = srcBuffer[5];
	    case 5: dstBuffer[dstOffset+4] = srcBuffer[4];
	    case 4: dstBuffer[dstOffset+3] = srcBuffer[3];
	    case 3: dstBuffer[dstOffset+2] = srcBuffer[2];
	    case 2: dstBuffer[dstOffset+1] = srcBuffer[1];
	    case 1: dstBuffer[dstOffset] = srcBuffer[0];
	  }
	}

	/**
	 * Opcode handlers
	 */

	var opcodes = {
	  // text
	  '1': {
	    start: function(data) {
	      var self = this;
	      // decode length
	      var firstLength = data[1] & 0x7f;
	      if (firstLength < 126) {
	        opcodes['1'].getData.call(self, firstLength);
	      }
	      else if (firstLength == 126) {
	        self.expectHeader(2, function(data) {
	          opcodes['1'].getData.call(self, readUInt16BE.call(data, 0));
	        });
	      }
	      else if (firstLength == 127) {
	        self.expectHeader(8, function(data) {
	          if (readUInt32BE.call(data, 0) != 0) {
	            self.error('packets with length spanning more than 32 bit is currently not supported', 1008);
	            return;
	          }
	          opcodes['1'].getData.call(self, readUInt32BE.call(data, 4));
	        });
	      }
	    },
	    getData: function(length) {
	      var self = this;
	      if (self.state.masked) {
	        self.expectHeader(4, function(data) {
	          var mask = data;
	          self.expectData(length, function(data) {
	            opcodes['1'].finish.call(self, mask, data);
	          });
	        });
	      }
	      else {
	        self.expectData(length, function(data) {
	          opcodes['1'].finish.call(self, null, data);
	        });
	      }
	    },
	    finish: function(mask, data) {
	      var packet = this.unmask(mask, data, true);
	      if (packet != null) this.currentMessage.push(packet);
	      if (this.state.lastFragment) {
	        var messageBuffer = this.concatBuffers(this.currentMessage);
	        if (!Validation.isValidUTF8(messageBuffer)) {
	          this.error('invalid utf8 sequence', 1007);
	          return;
	        }
	        this.ontext(messageBuffer.toString('utf8'), {masked: this.state.masked, buffer: messageBuffer});
	        this.currentMessage = [];
	      }
	      this.endPacket();
	    }
	  },
	  // binary
	  '2': {
	    start: function(data) {
	      var self = this;
	      // decode length
	      var firstLength = data[1] & 0x7f;
	      if (firstLength < 126) {
	        opcodes['2'].getData.call(self, firstLength);
	      }
	      else if (firstLength == 126) {
	        self.expectHeader(2, function(data) {
	          opcodes['2'].getData.call(self, readUInt16BE.call(data, 0));
	        });
	      }
	      else if (firstLength == 127) {
	        self.expectHeader(8, function(data) {
	          if (readUInt32BE.call(data, 0) != 0) {
	            self.error('packets with length spanning more than 32 bit is currently not supported', 1008);
	            return;
	          }
	          opcodes['2'].getData.call(self, readUInt32BE.call(data, 4, true));
	        });
	      }
	    },
	    getData: function(length) {
	      var self = this;
	      if (self.state.masked) {
	        self.expectHeader(4, function(data) {
	          var mask = data;
	          self.expectData(length, function(data) {
	            opcodes['2'].finish.call(self, mask, data);
	          });
	        });
	      }
	      else {
	        self.expectData(length, function(data) {
	          opcodes['2'].finish.call(self, null, data);
	        });
	      }
	    },
	    finish: function(mask, data) {
	      var packet = this.unmask(mask, data, true);
	      if (packet != null) this.currentMessage.push(packet);
	      if (this.state.lastFragment) {
	        var messageBuffer = this.concatBuffers(this.currentMessage);
	        this.onbinary(messageBuffer, {masked: this.state.masked, buffer: messageBuffer});
	        this.currentMessage = [];
	      }
	      this.endPacket();
	    }
	  },
	  // close
	  '8': {
	    start: function(data) {
	      var self = this;
	      if (self.state.lastFragment == false) {
	        self.error('fragmented close is not supported', 1002);
	        return;
	      }

	      // decode length
	      var firstLength = data[1] & 0x7f;
	      if (firstLength < 126) {
	        opcodes['8'].getData.call(self, firstLength);
	      }
	      else {
	        self.error('control frames cannot have more than 125 bytes of data', 1002);
	      }
	    },
	    getData: function(length) {
	      var self = this;
	      if (self.state.masked) {
	        self.expectHeader(4, function(data) {
	          var mask = data;
	          self.expectData(length, function(data) {
	            opcodes['8'].finish.call(self, mask, data);
	          });
	        });
	      }
	      else {
	        self.expectData(length, function(data) {
	          opcodes['8'].finish.call(self, null, data);
	        });
	      }
	    },
	    finish: function(mask, data) {
	      var self = this;
	      data = self.unmask(mask, data, true);
	      if (data && data.length == 1) {
	        self.error('close packets with data must be at least two bytes long', 1002);
	        return;
	      }
	      var code = data && data.length > 1 ? readUInt16BE.call(data, 0) : 1000;
	      if (!ErrorCodes.isValidErrorCode(code)) {
	        self.error('invalid error code', 1002);
	        return;
	      }
	      var message = '';
	      if (data && data.length > 2) {
	        var messageBuffer = data.slice(2);
	        if (!Validation.isValidUTF8(messageBuffer)) {
	          self.error('invalid utf8 sequence', 1007);
	          return;
	        }
	        message = messageBuffer.toString('utf8');
	      }
	      this.onclose(code, message, {masked: self.state.masked});
	      this.reset();
	    },
	  },
	  // ping
	  '9': {
	    start: function(data) {
	      var self = this;
	      if (self.state.lastFragment == false) {
	        self.error('fragmented ping is not supported', 1002);
	        return;
	      }

	      // decode length
	      var firstLength = data[1] & 0x7f;
	      if (firstLength < 126) {
	        opcodes['9'].getData.call(self, firstLength);
	      }
	      else {
	        self.error('control frames cannot have more than 125 bytes of data', 1002);
	      }
	    },
	    getData: function(length) {
	      var self = this;
	      if (self.state.masked) {
	        self.expectHeader(4, function(data) {
	          var mask = data;
	          self.expectData(length, function(data) {
	            opcodes['9'].finish.call(self, mask, data);
	          });
	        });
	      }
	      else {
	        self.expectData(length, function(data) {
	          opcodes['9'].finish.call(self, null, data);
	        });
	      }
	    },
	    finish: function(mask, data) {
	      this.onping(this.unmask(mask, data, true), {masked: this.state.masked, binary: true});
	      this.endPacket();
	    }
	  },
	  // pong
	  '10': {
	    start: function(data) {
	      var self = this;
	      if (self.state.lastFragment == false) {
	        self.error('fragmented pong is not supported', 1002);
	        return;
	      }

	      // decode length
	      var firstLength = data[1] & 0x7f;
	      if (firstLength < 126) {
	        opcodes['10'].getData.call(self, firstLength);
	      }
	      else {
	        self.error('control frames cannot have more than 125 bytes of data', 1002);
	      }
	    },
	    getData: function(length) {
	      var self = this;
	      if (this.state.masked) {
	        this.expectHeader(4, function(data) {
	          var mask = data;
	          self.expectData(length, function(data) {
	            opcodes['10'].finish.call(self, mask, data);
	          });
	        });
	      }
	      else {
	        this.expectData(length, function(data) {
	          opcodes['10'].finish.call(self, null, data);
	        });
	      }
	    },
	    finish: function(mask, data) {
	      this.onpong(this.unmask(mask, data, true), {masked: this.state.masked, binary: true});
	      this.endPacket();
	    }
	  }
	}


/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * ws: a node.js websocket client
	 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
	 * MIT Licensed
	 */

	try {
	  module.exports = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../build/Release/validation\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	} catch (e) { try {
	  module.exports = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../build/default/validation\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	} catch (e) { try {
	  module.exports = __webpack_require__(139);
	} catch (e) {
	  console.error('validation.node seems to not have been built. Run npm install.');
	  throw e;
	}}}


/***/ },
/* 139 */
/***/ function(module, exports) {

	/*!
	 * ws: a node.js websocket client
	 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
	 * MIT Licensed
	 */
	 
	module.exports.Validation = {
	  isValidUTF8: function(buffer) {
	    return true;
	  }
	};



/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * ws: a node.js websocket client
	 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
	 * MIT Licensed
	 */

	var util = __webpack_require__(45);

	function BufferPool(initialSize, growStrategy, shrinkStrategy) {
	  if (typeof initialSize === 'function') {
	    shrinkStrategy = growStrategy;
	    growStrategy = initialSize;
	    initialSize = 0;
	  }
	  else if (typeof initialSize === 'undefined') {
	    initialSize = 0;
	  }
	  this._growStrategy = (growStrategy || function(db, size) {
	    return db.used + size;
	  }).bind(null, this);
	  this._shrinkStrategy = (shrinkStrategy || function(db) {
	    return initialSize;
	  }).bind(null, this);
	  this._buffer = initialSize ? new Buffer(initialSize) : null;
	  this._offset = 0;
	  this._used = 0;
	  this._changeFactor = 0;
	  this.__defineGetter__('size', function(){
	    return this._buffer == null ? 0 : this._buffer.length;
	  });
	  this.__defineGetter__('used', function(){
	    return this._used;
	  });
	}

	BufferPool.prototype.get = function(length) {
	  if (this._buffer == null || this._offset + length > this._buffer.length) {
	    var newBuf = new Buffer(this._growStrategy(length));
	    this._buffer = newBuf;
	    this._offset = 0;
	  }
	  this._used += length;
	  var buf = this._buffer.slice(this._offset, this._offset + length);
	  this._offset += length;
	  return buf;
	}

	BufferPool.prototype.reset = function(forceNewBuffer) {
	  var len = this._shrinkStrategy();
	  if (len < this.size) this._changeFactor -= 1;
	  if (forceNewBuffer || this._changeFactor < -2) {
	    this._changeFactor = 0;
	    this._buffer = len ? new Buffer(len) : null;
	  }
	  this._offset = 0;
	  this._used = 0;
	}

	module.exports = BufferPool;


/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * ws: a node.js websocket client
	 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
	 * MIT Licensed
	 */

	var events = __webpack_require__(44)
	  , util = __webpack_require__(45)
	  , EventEmitter = events.EventEmitter;

	/**
	 * Hixie Sender implementation
	 */

	function Sender(socket) {
	  this.socket = socket;
	  this.continuationFrame = false;
	  this.isClosed = false;
	}

	module.exports = Sender;

	/**
	 * Inherits from EventEmitter.
	 */

	util.inherits(Sender, events.EventEmitter);

	/**
	 * Frames and writes data.
	 *
	 * @api public
	 */

	Sender.prototype.send = function(data, options, cb) {
	  if (this.isClosed) return;
	  if (options && options.binary) {
	    this.error('hixie websockets do not support binary');
	    return;
	  }

	  var isString = typeof data == 'string'
	    , length = isString ? Buffer.byteLength(data) : data.length
	    , writeStartMarker = this.continuationFrame == false
	    , writeEndMarker = !options || !(typeof options.fin != 'undefined' && !options.fin)
	    , buffer = new Buffer((writeStartMarker ? 1 : 0) + length + (writeEndMarker ? 1 : 0))
	    , offset = writeStartMarker ? 1 : 0;

	  if (writeStartMarker) buffer.write('\x00', 'binary');

	  if (isString) buffer.write(data, offset, 'utf8');
	  else data.copy(buffer, offset, 0);

	  if (writeEndMarker) {
	    buffer.write('\xff', offset + length, 'binary');
	    this.continuationFrame = false;
	  }
	  else this.continuationFrame = true;

	  try {
	    this.socket.write(buffer, 'binary', cb);
	  } catch (e) {
	    this.error(e.toString());
	  }
	}

	/**
	 * Sends a close instruction to the remote party.
	 *
	 * @api public
	 */

	Sender.prototype.close = function(code, data, mask, cb) {
	  if (this.isClosed) return;
	  this.isClosed = true;
	  try {
	    if (this.continuationFrame) this.socket.write(new Buffer([0xff], 'binary'));
	    this.socket.write(new Buffer([0xff, 0x00]), 'binary', cb);
	  } catch (e) {
	    this.error(e.toString());
	  }
	}

	/**
	 * Sends a ping message to the remote party. Not available for hixie.
	 *
	 * @api public
	 */

	Sender.prototype.ping = function(data, options) {}

	/**
	 * Sends a pong message to the remote party. Not available for hixie.
	 *
	 * @api public
	 */

	Sender.prototype.pong = function(data, options) {}

	/**
	 * Handles an error
	 *
	 * @api private
	 */

	Sender.prototype.error = function (reason) {
	  this.emit('error', reason);
	  return this;
	}


/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * ws: a node.js websocket client
	 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
	 * MIT Licensed
	 */

	var util = __webpack_require__(45);

	/**
	 * State constants
	 */

	var EMPTY = 0
	  , BODY = 1;

	/**
	 * Hixie Receiver implementation
	 */

	function Receiver () {
	  this.state = EMPTY;
	  this.buffers = [];
	  this.messageEnd = -1;
	  this.spanLength = 0;
	  this.dead = false;

	  this.onerror = function() {};
	  this.ontext = function() {};
	  this.onbinary = function() {};
	  this.onclose = function() {};
	  this.onping = function() {};
	  this.onpong = function() {};
	}

	module.exports = Receiver;

	/**
	 * Add new data to the parser.
	 *
	 * @api public
	 */

	Receiver.prototype.add = function(data) {
	  var self = this;
	  function doAdd() {
	    if (self.state === EMPTY) {
	      if (data.length == 2 && data[0] == 0xFF && data[1] == 0x00) {
	        self.reset();
	        self.onclose();
	        return;
	      }
	      if (data[0] !== 0x00) {
	        self.error('payload must start with 0x00 byte', true);
	        return;
	      }
	      data = data.slice(1);
	      self.state = BODY;
	    }
	    self.buffers.push(data);
	    if ((self.messageEnd = bufferIndex(data, 0xFF)) != -1) {
	      self.spanLength += self.messageEnd;
	      return self.parse();
	    }
	    else self.spanLength += data.length;
	  }
	  while(data) data = doAdd();
	}

	/**
	 * Releases all resources used by the receiver.
	 *
	 * @api public
	 */

	Receiver.prototype.cleanup = function() {
	  this.dead = true;
	  this.state = EMPTY;
	  this.buffers = [];
	}

	/**
	 * Process buffered data.
	 *
	 * @api public
	 */

	Receiver.prototype.parse = function() {
	  var output = new Buffer(this.spanLength);
	  var outputIndex = 0;
	  for (var bi = 0, bl = this.buffers.length; bi < bl - 1; ++bi) {
	    var buffer = this.buffers[bi];
	    buffer.copy(output, outputIndex);
	    outputIndex += buffer.length;
	  }
	  var lastBuffer = this.buffers[this.buffers.length - 1];
	  if (this.messageEnd > 0) lastBuffer.copy(output, outputIndex, 0, this.messageEnd);
	  var tail = null;
	  if (this.messageEnd < lastBuffer.length - 1) {
	    tail = lastBuffer.slice(this.messageEnd + 1);
	  }
	  this.reset();
	  this.ontext(output.toString('utf8'));
	  return tail;
	}

	/**
	 * Handles an error
	 *
	 * @api private
	 */

	Receiver.prototype.error = function (reason, terminate) {
	  this.reset();
	  this.onerror(reason, terminate);
	  return this;
	}

	/**
	 * Reset parser state
	 *
	 * @api private
	 */

	Receiver.prototype.reset = function (reason) {
	  if (this.dead) return;
	  this.state = EMPTY;
	  this.buffers = [];
	  this.messageEnd = -1;
	  this.spanLength = 0;
	}

	/**
	 * Internal api
	 */

	function bufferIndex(buffer, byte) {
	  for (var i = 0, l = buffer.length; i < l; ++i) {
	    if (buffer[i] === byte) return i;
	  }
	  return -1;
	}


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * ws: a node.js websocket client
	 * Copyright(c) 2011 Einar Otto Stangvik <einaros@gmail.com>
	 * MIT Licensed
	 */

	var util = __webpack_require__(45)
	  , events = __webpack_require__(44)
	  , http = __webpack_require__(118)
	  , crypto = __webpack_require__(122)
	  , url = __webpack_require__(131)
	  , Options = __webpack_require__(132)
	  , WebSocket = __webpack_require__(129)
	  , tls = __webpack_require__(43)
	  , url = __webpack_require__(131);

	/**
	 * WebSocket Server implementation
	 */

	function WebSocketServer(options, callback) {
	  options = new Options({
	    host: '127.0.0.1',
	    port: null,
	    server: null,
	    verifyClient: null,
	    path: null,
	    noServer: false,
	    disableHixie: false,
	    clientTracking: true
	  }).merge(options);
	  if (!options.value.port && !options.value.server && !options.value.noServer) {
	    throw new TypeError('`port` or a `server` must be provided');
	  }

	  var self = this;

	  if (options.value.port) {
	    this._server = http.createServer(function (req, res) {
	      res.writeHead(200, {'Content-Type': 'text/plain'});
	      res.end('Not implemented');
	    });
	    this._server.listen(options.value.port, options.value.host, callback);
	    this._closeServer = function() { self._server.close(); };
	    this._server.once('listening', function() { self.emit('listening'); });
	  }
	  else if (options.value.server) {
	    this._server = options.value.server;
	    if (options.value.path) {
	      // take note of the path, to avoid collisions when multiple websocket servers are
	      // listening on the same http server
	      if (this._server._webSocketPaths && options.value.server._webSocketPaths[options.value.path]) {
	        throw new Error('two instances of WebSocketServer cannot listen on the same http server path');
	      }
	      if (typeof this._server._webSocketPaths !== 'object') {
	        this._server._webSocketPaths = {};
	      }
	      this._server._webSocketPaths[options.value.path] = 1;
	    }
	  }

	  if (typeof this._server != 'undefined') {
	    this._server.on('error', function(error) {
	      self.emit('error', error)
	    });
	    this._server.on('upgrade', function(req, socket, upgradeHead) {
	      self.handleUpgrade(req, socket, upgradeHead, function(client) {
	        self.emit('connection'+req.url, client);
	        self.emit('connection', client);
	      });
	    });
	  }

	  this.options = options.value;
	  this.path = options.value.path;
	  this.clients = [];
	}

	/**
	 * Inherits from EventEmitter.
	 */

	util.inherits(WebSocketServer, events.EventEmitter);

	/**
	 * Immediately shuts down the connection.
	 *
	 * @api public
	 */

	WebSocketServer.prototype.close = function(code, data) {
	  // terminate all associated clients
	  var error = null;
	  try {
	    for (var i = 0, l = this.clients.length; i < l; ++i) {
	      this.clients[i].terminate();
	    }
	  }
	  catch (e) {
	    error = e;
	  }

	  // remove path descriptor, if any
	  if (this.path && this._server._webSocketPaths) {
	    delete this._server._webSocketPaths[this.path];
	    if (Object.keys(this._server._webSocketPaths).length == 0) {
	      delete this._server._webSocketPaths;
	    }
	  }

	  // close the http server if it was internally created
	  try {
	    if (typeof this._closeServer !== 'undefined') {
	      this._closeServer();
	    }
	  }
	  finally {
	    delete this._server;
	  }
	  if (error) throw error;
	}

	/**
	 * Handle a HTTP Upgrade request.
	 *
	 * @api public
	 */

	WebSocketServer.prototype.handleUpgrade = function(req, socket, upgradeHead, cb) {
	  // check for wrong path
	  if (this.options.path) {
	    var u = url.parse(req.url);
	    if (u && u.pathname !== this.options.path) return;
	  }

	  if (typeof req.headers.upgrade === 'undefined' || req.headers.upgrade.toLowerCase() !== 'websocket') {
	    abortConnection(socket, 400, 'Bad Request');
	    return;
	  }

	  if (req.headers['sec-websocket-key1']) handleHixieUpgrade.apply(this, arguments);
	  else handleHybiUpgrade.apply(this, arguments);
	}

	module.exports = WebSocketServer;

	/**
	 * Entirely private apis,
	 * which may or may not be bound to a sepcific WebSocket instance.
	 */

	function handleHybiUpgrade(req, socket, upgradeHead, cb) {
	  // handle premature socket errors
	  var errorHandler = function() {
	    try { socket.destroy(); } catch (e) {}
	  }
	  socket.on('error', errorHandler);

	  // verify key presence
	  if (!req.headers['sec-websocket-key']) {
	    abortConnection(socket, 400, 'Bad Request');
	    return;
	  }

	  // verify version
	  var version = parseInt(req.headers['sec-websocket-version']);
	  if ([8, 13].indexOf(version) === -1) {
	    abortConnection(socket, 400, 'Bad Request');
	    return;
	  }

	  // verify client
	  var origin = version < 13 ?
	    req.headers['sec-websocket-origin'] :
	    req.headers['origin'];

	  // handler to call when the connection sequence completes
	  var self = this;
	  var completeHybiUpgrade = function() {
	     var protocol = req.headers['sec-websocket-protocol'];

	    // calc key
	    var key = req.headers['sec-websocket-key'];
	    var shasum = crypto.createHash('sha1');
	    shasum.update(key + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11");
	    key = shasum.digest('base64');

	    var headers = [
	        'HTTP/1.1 101 Switching Protocols'
	      , 'Upgrade: websocket'
	      , 'Connection: Upgrade'
	      , 'Sec-WebSocket-Accept: ' + key
	    ];

	    if (typeof protocol != 'undefined') {
	      headers['Sec-WebSocket-Protocol'] = protocol;
	    }

	    socket.setTimeout(0);
	    socket.setNoDelay(true);
	    try {
	      socket.write(headers.concat('', '').join('\r\n'));
	    }
	    catch (e) {
	      // if the upgrade write fails, shut the connection down hard
	      try { socket.destroy(); } catch (e) {}
	      return;
	    }

	    var client = new WebSocket([req, socket, upgradeHead], {
	      protocolVersion: version,
	      protocol: protocol
	    });

	    if (self.options.clientTracking) {
	      self.clients.push(client);
	      client.on('close', function() {
	        var index = self.clients.indexOf(client);
	        if (index != -1) {
	          self.clients.splice(index, 1);
	        }
	      });
	    }

	    // signal upgrade complete
	    socket.removeListener('error', errorHandler);
	    cb(client);
	  }

	  // optionally call external client verification handler
	  if (typeof this.options.verifyClient == 'function') {
	    var info = {
	      origin: origin,
	      secure: typeof req.connection.encrypted !== 'undefined',
	      req: req
	    };
	    if (this.options.verifyClient.length == 2) {
	      this.options.verifyClient(info, function(result) {
	        if (!result) abortConnection(socket, 401, 'Unauthorized')
	        else completeHybiUpgrade();
	      });
	      return;
	    }
	    else if (!this.options.verifyClient(info)) {
	      abortConnection(socket, 401, 'Unauthorized');
	      return;
	    }
	  }

	  completeHybiUpgrade();
	}

	function handleHixieUpgrade(req, socket, upgradeHead, cb) {
	  // handle premature socket errors
	  var errorHandler = function() {
	    try { socket.destroy(); } catch (e) {}
	  }
	  socket.on('error', errorHandler);

	  // bail if options prevent hixie
	  if (this.options.disableHixie) {
	    abortConnection(socket, 401, 'Hixie support disabled');
	    return;
	  }

	  // verify key presence
	  if (!req.headers['sec-websocket-key2']) {
	    abortConnection(socket, 400, 'Bad Request');
	    return;
	  }

	  var origin = req.headers['origin']
	    , self = this;

	  // setup handshake completion to run after client has been verified
	  var onClientVerified = function() {
	    var location = ((req.headers['x-forwarded-proto'] === 'https' || socket.encrypted) ? 'wss' : 'ws') + '://' + req.headers.host + req.url
	      , protocol = req.headers['sec-websocket-protocol'];

	    // handshake completion code to run once nonce has been successfully retrieved
	    var completeHandshake = function(nonce, rest) {
	      // calculate key
	      var k1 = req.headers['sec-websocket-key1']
	        , k2 = req.headers['sec-websocket-key2']
	        , md5 = crypto.createHash('md5');

	      [k1, k2].forEach(function (k) {
	        var n = parseInt(k.replace(/[^\d]/g, ''))
	          , spaces = k.replace(/[^ ]/g, '').length;
	        if (spaces === 0 || n % spaces !== 0){
	          abortConnection(socket, 400, 'Bad Request');
	          return;
	        }
	        n /= spaces;
	        md5.update(String.fromCharCode(
	          n >> 24 & 0xFF,
	          n >> 16 & 0xFF,
	          n >> 8  & 0xFF,
	          n       & 0xFF));
	      });
	      md5.update(nonce.toString('binary'));

	      var headers = [
	          'HTTP/1.1 101 Switching Protocols'
	        , 'Upgrade: WebSocket'
	        , 'Connection: Upgrade'
	        , 'Sec-WebSocket-Location: ' + location
	      ];
	      if (typeof protocol != 'undefined') headers.push('Sec-WebSocket-Protocol: ' + protocol);
	      if (typeof origin != 'undefined') headers.push('Sec-WebSocket-Origin: ' + origin);

	      socket.setTimeout(0);
	      socket.setNoDelay(true);
	      try {
	        // merge header and hash buffer
	        var headerBuffer = new Buffer(headers.concat('', '').join('\r\n'));
	        var hashBuffer = new Buffer(md5.digest('binary'), 'binary');
	        var handshakeBuffer = new Buffer(headerBuffer.length + hashBuffer.length);
	        headerBuffer.copy(handshakeBuffer, 0);
	        hashBuffer.copy(handshakeBuffer, headerBuffer.length);

	        // do a single write, which - upon success - causes a new client websocket to be setup
	        socket.write(handshakeBuffer, 'binary', function(err) {
	          if (err) return; // do not create client if an error happens
	          var client = new WebSocket([req, socket, rest], {
	            protocolVersion: 'hixie-76',
	            protocol: protocol
	          });
	          if (self.options.clientTracking) {
	            self.clients.push(client);
	            client.on('close', function() {
	              var index = self.clients.indexOf(client);
	              if (index != -1) {
	                self.clients.splice(index, 1);
	              }
	            });
	          }

	          // signal upgrade complete
	          socket.removeListener('error', errorHandler);
	          cb(client);
	        });
	      }
	      catch (e) {
	        try { socket.destroy(); } catch (e) {}
	        return;
	      }
	    }

	    // retrieve nonce
	    var nonceLength = 8;
	    if (upgradeHead && upgradeHead.length >= nonceLength) {
	      var nonce = upgradeHead.slice(0, nonceLength);
	      var rest = upgradeHead.length > nonceLength ? upgradeHead.slice(nonceLength) : null;
	      completeHandshake.call(self, nonce, rest);
	    }
	    else {
	      // nonce not present in upgradeHead, so we must wait for enough data
	      // data to arrive before continuing
	      var nonce = new Buffer(nonceLength);
	      upgradeHead.copy(nonce, 0);
	      var received = upgradeHead.length;
	      var rest = null;
	      var handler = function (data) {
	        var toRead = Math.min(data.length, nonceLength - received);
	        if (toRead === 0) return;
	        data.copy(nonce, received, 0, toRead);
	        received += toRead;
	        if (received == nonceLength) {
	          socket.removeListener('data', handler);
	          if (toRead < data.length) rest = data.slice(toRead);
	          completeHandshake.call(self, nonce, rest);
	        }
	      }
	      socket.on('data', handler);
	    }
	  }

	  // verify client
	  if (typeof this.options.verifyClient == 'function') {
	    var info = {
	      origin: origin,
	      secure: typeof req.connection.encrypted !== 'undefined',
	      req: req
	    };
	    if (this.options.verifyClient.length == 2) {
	      var self = this;
	      this.options.verifyClient(info, function(result) {
	        if (!result) abortConnection(socket, 401, 'Unauthorized')
	        else onClientVerified.apply(self);
	      });
	      return;
	    }
	    else if (!this.options.verifyClient(info)) {
	      abortConnection(socket, 401, 'Unauthorized');
	      return;
	    }
	  }

	  // no client verification required
	  onClientVerified();
	}

	function abortConnection(socket, code, name) {
	  try {
	    var response = [
	      'HTTP/1.1 ' + code + ' ' + name,
	      'Content-type: text/html'
	    ];
	    socket.write(response.concat('', '').join('\r\n'));
	  }
	  catch (e) { /* ignore errors - we've aborted this connection */ }
	  finally {
	    // ensure that an early aborted connection is shut down completely
	    try { socket.destroy(); } catch (e) {}
	  }
	}


/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	var protocols = __webpack_require__(119)
	  , EventEmitter = process.EventEmitter
	  , url = __webpack_require__(131);

	/**
	 * Module exports.
	 */

	module.exports = Server;

	/**
	 * Constructor. HTTP Server agnostic.
	 *
	 * @param {Object} options
	 * @api public
	 */

	function Server (options) {
	  this.options = {
	      path: null
	    , clientTracking: true
	  };

	  for (var i in options) {
	    this.options[i] = options[i];
	  }

	  this.clients = [];
	  this.clientsCount = 0;
	  this.clientsNull = [];
	}

	/**
	 * Inherits from EventEmitter.
	 */

	Server.prototype.__proto__ = EventEmitter.prototype;

	/**
	 * Handles a Request after `upgrade` event.
	 *
	 * @param {http.Request} request object
	 * @param {http.Stream} socket
	 * @param {Buffer} data stream head
	 * @return {Server} for chaining.
	 * @api public
	 */

	Server.prototype.handleUpgrade = function (req, socket, head) {
	  var self = this;

	  if (! this.checkRequest(req)) {
	    return this;
	  }

	  // attach the legacy `head` property to request
	  req.head = head;

	  var client = this.createClient(req);

	  client.on('open', function() {
	    if (self.options.clientTracking) {
	      var i = null;
	      if (self.clientsNull.length) {
	        i = self.clientsNull.shift();
	        self.clients[i] = client;
	      }
	      else {
	        i = self.clients.length;
	        self.clients.push(client);
	      }
	      self.clientsCount++;
	      client.on('close', function () {
	        self.clients[i] = null;
	        self.clientsNull.push(i);
	        self.clientsCount--;
	      });
	    }
	    self.emit('connection', client);
	  });

	  return this;
	};

	/**
	 * Checks whether the request path matches.
	 *
	 * @return {Bool}
	 * @api private
	 */

	Server.prototype.checkRequest = function (req) {
	  if (!(req.method == 'GET' &&
	        req.headers['upgrade'] &&
	        req.headers.upgrade.toLowerCase() == 'websocket')) {
	    // not a valid WebSocket upgrade
	    return false;
	  }

	  if (this.options.path) {
	    var u = url.parse(req.url);
	    if (u && u.pathname !== this.options.path) return false;
	  }

	  // no options.path => match all paths
	  return true;
	};

	/**
	 * Initializes a client for the request with appropriate protocol.
	 *
	 * @param {http.Request} request object
	 * @api private
	 */

	Server.prototype.createClient = function (req) {
	  var version = req.headers['sec-websocket-version']
	    , name = protocols[version] ? version : 'drafts'

	  return new protocols[name](req);
	};


/***/ }
/******/ ]);