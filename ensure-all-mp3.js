const Vocabulary = require('./vocabulary');

async function ensureAllMP3() {
  const vocabulary = new Vocabulary();
  await vocabulary.load();
  for (const term of vocabulary.data) {
  }
}

module.exports = ensureAllMP3;
