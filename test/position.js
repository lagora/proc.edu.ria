import 'babel-polyfill';
import position from '../src/position.es6.js';
import assert from 'assert';

describe("position.js", () => {
  it("is a function", () => {
    assert(typeof position === 'function');
  });
  it("return an object merging values for each X,Y,Z axis of both object provided as arguments", () => {
    let result = position({ x:0, y:0, z:0}, { x: 0.5, y:0.5, z:0.5});
    assert('object' === typeof result);
    ['x', 'y', 'z'].forEach((axis) => {
      assert(result[axis] === 0.5);
      assert(!isNaN(result[axis]));
    });
  });
});
