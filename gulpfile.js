var gulp = require("gulp");
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


let getTestFilePath = filepath => filepath
.replace("./src/", "./test/")
.replace(".es6", "");
gulp.task("build-tests", () => {
  glob.sync("./src/**/*.es6.js")
  .filter((filepath) => {
    return !fs.existsSync(getTestFilePath(filepath));
  }).forEach((filepath) => {
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

gulp.task("watch", ["watch-src"]);
