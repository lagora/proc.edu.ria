import md5 from "md5";

function hashPadding (seed, size) {
  let mkSeed = (str) => md5(str);
  let seedHash = mkSeed(seed);
  while (seedHash.length < size) {
    let remaining = size - seedHash.length;
    seedHash += mkSeed(seedHash).substr(0, remaining);
  }
  return seedHash;
}

export default hashPadding;
