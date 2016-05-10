import 'babel-polyfill';
import scan from '../src/scan.es6.js';
import assert from 'assert';

describe("scan.js", () => {
  it("is a function", () => {
    assert(typeof scan === 'function');
  });
  it("go through X,Y,Z axes until MAX value is reached, yielding on each step an object containing { index, x, y, z}", () => {
    let result,
    results = scan(2, 1);
    results.forEach((result) => {
    // while (result = results.next().value) {
      assert(typeof result === 'object');
      ['i', 'x', 'y', 'z'].forEach((key) => {
        assert(!isNaN(result[key]));
      })
    // }
    });
  });
});
