const addNewTerms = require('./add-new-terms');
const ensureAllMP3 = require('./ensure-all-mp3');
const importTSV = require('./import-tsv');
const anki = require('./anki');
const Vocabulary = require('./vocabulary');

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
  await addNewTerms(['duke', 'journey 2', 'chapter 1', 'world builder']);
  await ensureAllMP3();
  //await mergeQuizlet();
  //await anki.exportListenDeck('2 oct 2022', 'anki.listen.txt');
  //await anki.exportSpeakDeck('2 oct 2022', 'anki.speak.txt');
}

main()
  .then(() => {
    console.log('end');
  })
  .catch((err) => {
    console.log(err);
  });

console.log('index.js: eof');
