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

  add = function (in_th, in_ipa = '', in_tags = []) {
    const i = this.find(in_th);
    if (i == -1) {
      this.data.push({ th: in_th, en: [], ipa: in_ipa, tags: in_tags });
    } else {
      let term = this.data[i];
      if (in_ipa != '') term.ipa = in_ipa;
      if (in_tags != null && in_tags.length > 0) {
        if (term.tags === undefined) term.tags = [];
        let rg = term.tags.concat(in_tags);
        term.tags = rg.filter((item, index) => {
          return rg.indexOf(item) == index;
        });
      }
    }
  };
}

module.exports = Vocabulary;
