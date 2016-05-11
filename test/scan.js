import "babel-polyfill";
import scan from "../src/scan.es6.js";
import assert from "assert";

describe("scan.js", () => {
  it("is a function", (done) => {
    assert(typeof scan === "function");
    done();
  });
});
