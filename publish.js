// NOTE: Please run scripts/deploy.js first, and then run this script.

const fs = require('fs');
const path = require('path');

const solDirectory = './contracts';
const jsDirectory = './scripts/javascript';
const tsDirectory = './scripts/typescript';

const solFiles = fs.readdirSync(solDirectory);
const jsFiles = fs.readdirSync(jsDirectory);
const tsFiles = fs.readdirSync(tsDirectory);

const files = {
  sol: solFiles,
  js: jsFiles,
  ts: tsFiles,
}

fs.writeFileSync(path.join(__dirname, "app/src/files.json"), JSON.stringify(files))
