import "babel-polyfill";
import scan from "../src/scan.es6.js";
import assert from "assert";
import jsdom from "mocha-jsdom";

xdescribe("scan.js", () => {
  jsdom();
  it("is a function", (done) => {
    assert(typeof scan === "function");
    done();
  });
  it("go through X,Y,Z axes until MAX value is reached, yielding on each step an object containing { index, x, y, z}", (done) => {
    let result,
    results = scan(2, 1);
    results.forEach((result) => {
    // while (result = results.next().value) {
      assert(typeof result === "object");
      ["i", "x", "y", "z"].forEach((key) => {
        assert(!isNaN(result[key]));
      })
    // }
    });
    done();
  });
});
