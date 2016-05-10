var gulp = require("gulp");
var nodemon = require("nodemon");
var browserSync = require("browser-sync");
var sourcemaps = require("gulp-sourcemaps");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var browserify = require("browserify");
var babelify = require("babelify");
var watchify = require("watchify");
var watch = require("gulp-watch");
var fs = require("fs-extra");
var path = require("path");
var glob = require("glob");
var batch = require("gulp-batch");

gulp.task("rules", () => {
  let code = "";
  let names = [];
  glob.sync("./src/rules/*").sort().forEach((filepath, index) => {
    let name = `rule_${index}`;
    names.push(name);
    code += `import ${name} from "${filepath.replace("src/", "")}";\n`;
  });
  code += `\nexport { ${names.join(", ")} };`;
  fs.writeFileSync("./src/rules.es6.js", code, {enc: "uf8"});
  return;
});

gulp.task("dist", () => {
  fs.removeSync("./dist/");
  fs.removeSync("./build/");
  fs.copySync("./package.json", "./dist/package.json");
  fs.copySync("./index.html", "./dist/index.html");
  fs.copySync("./node_modules/three/three.js", "./dist/three.js");
  fs.copySync("./node_modules/three-orbit-controls/index.js", "./dist/three-orbit-controls.js");
  return;
});

gulp.task("build", () => {
  browserify({entries: "src/proc.edu.ria.es6.js", extensions: [".es6.js"], debug: true})
    .transform(babelify, { presets: ["es2015"] })
    .bundle()
    .pipe(source("proc.edu.ria.js"))
    .pipe(gulp.dest("dist"));
});

let getTestFilePath = filepath => filepath.replace("./src/", "./test/").replace(".es6", "");
gulp.task("build-tests", () => {
  glob.sync("./src/**/*.es6.js")
  .filter((filepath) => {
    return !fs.existsSync(getTestFilePath(filepath));
  }).forEach((filepath, index) => {
    let filename = path.basename(filepath);
    let functionName = filename.split(".")[0];
    let testCode = `import "babel-polyfill";
import ${functionName} from ".${filepath}";
import assert from "assert";
import jsdom from "mocha-jsdom";

describe("${functionName}", () => {
  jsdom();
  it("is a function", (done) => {
    assert(typeof ${functionName} === "function");
    done();
  });
});`;
    fs.writeFileSync(getTestFilePath(filepath), testCode, {encoding: "utf8"});
  });
  return;
});

gulp.task("watch-rules", () => {
    watch(["./rules/**/*.json"], batch((events, done) => {
        gulp.start("rules", done);
    }));
});

gulp.task("watch-src", () => {
  watch(["./src/**/*.js", "!./src/**/rules.es6.js"], batch((events, done) => {
        gulp.start("build", done);
    }));
});

gulp.task("nodemon", function (cb) {
	var started = false;

	return nodemon({
    script: "./app.js"
  , ext: "js json"
  , tasks: function (changedFiles) {
    console.log("changedFiles", changedFiles);
      var tasks = [];
      changedFiles.forEach(function (file) {
        if (path.extname(file) === ".js" && !~tasks.indexOf("lint")) tasks.push("lint")
        if (path.extname(file) === ".css" && !~tasks.indexOf("cssmin")) tasks.push("cssmin")
      })
      return tasks;
    }
  });
});

gulp.task("rules_build_dist", ["rules", "dist", "build"]);
gulp.task("build_dist", ["dist", "build"]);
gulp.task("dev", ["nodemon"]);
gulp.task("default", ["nodemon"]);
