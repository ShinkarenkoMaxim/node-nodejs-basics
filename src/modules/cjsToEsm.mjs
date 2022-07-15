import path from 'path';
import { release, version } from 'os';
import { fileURLToPath } from 'url';
import { createServer as createHTTPServer } from 'http';
import './files/c.js';

// Imitate require. This necessary to download JSON files into a variable.
// Loading with imports still as experimental feature
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const random = Math.random();

let unknownObject;

if (random > 0.5) {
  unknownObject = require('./files/a.json');
} else {
  unknownObject = require('./files/b.json');
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

const __filename = fileURLToPath(import.meta.url);
console.log(`Path to current file is ${__filename}`);

const __dirname = path.dirname(__filename);
console.log(`Path to current directory is ${__dirname}`);

const createMyServer = createHTTPServer((_, res) => {
  res.end('Request accepted');
});

export default { unknownObject, createMyServer };
