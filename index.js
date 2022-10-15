const addNewTerms = require('./add-new-terms');
const ensureAllMP3 = require('./ensure-all-mp3');
const importTSV = require('./import-tsv');
const anki = require('./anki');
const Vocabulary = require('./vocabulary');
const exportCSV = require('./export-csv');

async function mergeQuizlet() {
  const vocabulary = new Vocabulary();
  await vocabulary.load();
  const terms = await importTSV('./data/quizlet/kruu bank 18 sep 2022.tsv', [
    'kruu bank',
    '18 sep 2022',
  ]);
  vocabulary.merge(terms);
  await vocabulary.save();
}

async function main() {
  //await addNewTerms('gitignore/new-terms.txt', ['kruu bank', '12 oct 2022']);
  await addNewTerms('gitignore/new-terms.txt', [
    'duke',
    'journey 2',
    'chapter 5',
    'word builder',
    'months'
  ]);
  await ensureAllMP3();
  //await mergeQuizlet();
  //await anki.exportListenDeck('chapter 3', 'gitignore/anki.listen.txt');
  //await anki.exportSpeakDeck('chapter 3', 'gitignore/anki.speak.txt');
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
