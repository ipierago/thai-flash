const addNewTerms = require('./add-new-terms');
const ensureAllMP3 = require('./ensure-all-mp3');
const importTSV = require('./import-tsv');
const anki = require('./anki');
const Vocabulary = require('./vocabulary');
const exportCSV = require('./export-csv');

async function mergeQuizlet() {
  const vocabulary = new Vocabulary();
  await vocabulary.load();
  const terms = await importTSV('./gitignore/tsv.txt', [
    'kruu bank',
    '14 sep 2022',
  ]);
  vocabulary.merge(terms);
  await vocabulary.save();
}

async function main() {
  //await addNewTerms('gitignore/new-terms.txt', ['kruu bank', '14 sep 2022']);
  /*
  await addNewTerms('gitignore/new-terms.txt', [
    'duke',
    'journey 2',
    'chapter 5',
    'word builder',
    'months'
  ]);
  */
  //await mergeQuizlet();
  //await ensureAllMP3();
  //await anki.exportListenDeck('17 oct 2022', 'gitignore/anki.listen.txt');
  //await anki.exportSpeakDeck('17 oct 2022', 'gitignore/anki.speak.txt');
  //await exportCSV('gitignore/csv.txt', 'duke');
}

main()
  .then(() => {
    console.log('end');
  })
  .catch((err) => {
    console.log(err);
  });

console.log('index.js: eof');
