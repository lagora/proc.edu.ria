import "babel-polyfill";
import assert from "assert";
import defaultArgsChecking from "../src/defaultArgsChecking.es6.js";

describe("defaultArgsChecking", () => {
  it("must throw a 'no args' Error if not arguments given", () =>{
    try {
      defaultArgsChecking();
    } catch (err) {
      assert(err.message === "no args");
    }
  });
});
