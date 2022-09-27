const fs = require('fs');
const util = require('util');

class Vocabulary {
  constructor() {}

  load = async function () {
    const readFile = util.promisify(fs.readFile);
    const rawdata = await readFile('vocabulary-data.json');
    this.data = JSON.parse(rawdata);
    console.log('vocabulary loaded');
  };

  save = async function () {
    const json = JSON.stringify(this.data);
    const writeFile = util.promisify(fs.writeFile);
    await writeFile('vocabulary-data.json', json);
    console.log('vocabulary saved');
  };

  find = function (th) {
    for (let i = 0; i < this.data.length; ++i) {
      if (this.data[i].th === th) {
        return i;
      }
    }
    return -1;
  };

  add = function (th, ipa = '') {
    const i = this.find(th);
    if (i == -1) {
      this.data.push({ th: th, en: [], ipa: ipa });
    } else {
      if (ipa != '') this.data[i].ipa = ipa;
    }
  };
}

module.exports = Vocabulary;
