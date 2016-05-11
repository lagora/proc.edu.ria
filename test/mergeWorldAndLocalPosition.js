import "babel-polyfill";
import mergePositions from "../src/mergeWorldAndLocalPosition.es6.js";
import assert from "assert";
import jsdom from "mocha-jsdom";

describe("mergeWorldAndLocalPosition.js", () => {
  jsdom();
  it("is a function", () => {
    assert(typeof mergePositions === "function");
  });
});
