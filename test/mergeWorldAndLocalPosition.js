import "babel-polyfill";
import mergePositions from "../src/mergeWorldAndLocalPosition.es6.js";
import assert from "assert";

describe("mergeWorldAndLocalPosition.js", () => {
  it("is a function", () => {
    assert(typeof mergePositions === 'function');
  });
  it("merge and return the world position and local position givent as arguments", () => {
    let result = mergePositions({ x:1, y:2, z:3 }, { x: 4, y:5, z:6 });
    assert('object' === typeof result);
    assert(result.x === 5);
    assert(!isNaN(result.x));
    assert(result.y === 7);
    assert(!isNaN(result.y));
    assert(result.z === 9);
    assert(!isNaN(result.z));
  });
});
