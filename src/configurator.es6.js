import md5 from 'md5';

class Configurator {
  constructor(size, seed) {
    this.cache = [];
    this.size = size || 4;
    this.cubicSize = Math.pow(size, 3);
    var mkSeed = (str) => md5(str);
    this.seedSource = seed ? seed:'proc.edu.ria';
    this.rawSeed = this.cache[this.seedSource] ? this.cache[this.seedSource]:mkSeed(this.seedSource);

    while (this.rawSeed.length < this.cubicSize) {
      let remaining = this.cubicSize - this.rawSeed.length;
      // console.info(`Filling up seed: ${((this.rawSeed.length/this.cubicSize)*100).toString().substr(0, 2)}% => ${remaining}/${this.cubicSize}`)
      this.rawSeed += mkSeed(this.rawSeed).substr(0, remaining);
    }
  }
};

export default Configurator;
