// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');

// Import other required libraries
const fs = require('fs');
const util = require('util');

const dotenv = require('dotenv');
dotenv.config();

const client = new textToSpeech.TextToSpeechClient();

// The text to synthesize
const text = 'สวัสดี';

// Construct the request
const request = {
  input: { text: text },
  // Select the language and SSML voice gender (optional)
  voice: {
    languageCode: 'th-TH',
    name: 'th-TH-Standard-A',
    ssmlGender: 'FEMALE',
  },
  // select the type of audio encoding
  audioConfig: { audioEncoding: 'MP3' },
};

async function main() {
  let rawdata = fs.readFileSync('vocabulary.json');
  let vocabulary = JSON.parse(rawdata);

  const access = util.promisify(fs.access);

  for (const term of vocabulary) {
    console.log(term);
    await access('mp3\\' + term.th + '.mp3');
  }

  const [response] = await client.synthesizeSpeech(request);
  const writeFile = util.promisify(fs.writeFile);
  await writeFile('mp3\\' + text + '.mp3', response.audioContent, 'binary');
  console.log('Audio content written');

  let data = JSON.stringify(vocabulary);
  fs.writeFileSync('vocabulary.json', data);
}

module.exports = { main: main };

console.log('main_v1: eof');
