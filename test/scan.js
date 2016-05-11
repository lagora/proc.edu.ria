import "babel-polyfill";
import scan from "../src/scan.es6.js";
import assert from "assert";
import jsdom from "mocha-jsdom";

describe("scan.js", () => {
  jsdom();
  it("is a function", (done) => {
    assert(typeof scan === "function");
    done();
  });
});
