import * as crypto from 'crypto';

const md5 = data => crypto.createHash('md5').update(data + '').digest('hex');

export const hashPadding = (seed, size) => {
  const mkSeed = str => md5(str);
  let seedHash = mkSeed(seed);
  while (seedHash.length < +size) {
    let remaining = size - seedHash.length;
    seedHash += mkSeed(seedHash).substr(0, remaining);
  }

  return seedHash;
}
