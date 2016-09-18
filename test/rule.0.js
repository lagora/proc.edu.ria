import 'babel-polyfill';
import assert from 'assert';
import * as rule0 from '../src/rules/rule.0';
const mock = require('./mock/rule.0.json');
const hexKeys = Object.keys(mock.data);

describe('RULE 0 using "hex" from hash', () => {
  for (var i = 0; i < hexKeys.length; i++) {
    const hex = hexKeys[i];
    const p = mock.data[hex].position;
    const pp = rule0.setPosition(hex);
    const s = mock.data[hex].size;
    const ss = rule0.setSize(hex);
    const msgP = `setPosition(${hex}) must return x: ${p.x}, y: ${p.y}, z: ${p.z}`;
    const msgS = `setSize(${hex})     must return x: ${s.x}, y: ${s.y}, z: ${s.z}`;
    it(msgP, () => {
      assert(p.x === pp.x);
      assert(p.y === pp.y);
      assert(p.z === pp.z);
    });
    it(msgS, () => {
      assert(s.x === ss.x);
      assert(s.y === ss.y);
      assert(s.z === ss.z);
    });
  }
});
