const fs = require('fs');
const util = require('util');

async function readTermsFromFile() {
  const readFile = util.promisify(fs.readFile);
  const data = await readFile('new-terms.txt');
  var array = data.toString().split('\n');
  let i = 0;
  let newTerms = [];
  while (i < array.length) {
    const th = array[i].replace(/(\r\n|\n|\r)/gm, '');
    const ipa = array[i + 1].replace(/(\r\n|\n|\r)/gm, '');
    i = i + 2;
    const term = { th: th, en: [], ipa: ipa };
    newTerms.push(term);
  }
  return newTerms;
}

async function main() {
  const Vocabulary = require('./vocabulary');
  const vocabulary = new Vocabulary();
  await vocabulary.load();

  const newTerms = await readTermsFromFile();

  for (const term of newTerms) {
    vocabulary.add(term.th, term.ipa);
  }

  await vocabulary.save();
  console.log('index.main end');
}

main()
  .then(() => {
    console.log('end');
  })
  .catch((err) => {
    console.log(err);
  });

console.log('index.js: eof');
