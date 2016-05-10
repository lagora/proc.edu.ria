import md5 from 'md5';

class Configurator {
  constructor(size, seed) {
    this.cache = [];
    this.size = size || 4;
    this.cubicSize = Math.pow(size, 3);
    var mkSeed = (str) => md5(str);
    this.seed = seed ? seed:'proc.edu.ria';
    this.seedHash = this.cache[this.seed] ? this.cache[this.seed]:mkSeed(this.seed);

    while (this.seedHash.length < this.cubicSize) {
      let remaining = this.cubicSize - this.seedHash.length;
      // console.info(`Filling up seed: ${((this.seedHash.length/this.cubicSize)*100).toString().substr(0, 2)}% => ${remaining}/${this.cubicSize}`)
      this.seedHash += mkSeed(this.seedHash).substr(0, remaining);
    }
  }
};

export default Configurator;
