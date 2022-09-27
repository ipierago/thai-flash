const addNewTerms = require('./add-new-terms');
const ensureAllMP3 = require('./ensure-all-mp3');

async function main() {
  //await addNewTerms(['kruu bank', '25 sep 2022']);
  await ensureAllMP3();
}

main()
  .then(() => {
    console.log('end');
  })
  .catch((err) => {
    console.log(err);
  });

console.log('index.js: eof');
