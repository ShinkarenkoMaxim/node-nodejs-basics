import { fileURLToPath } from 'url';
import path from 'path';
import { cpus } from 'os';
import { Worker } from 'worker_threads';

const cores = cpus().length;

// Get __dirname by parsing module url
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Setup our filepaths
const workerFilePath = path.resolve(__dirname, `./worker.js`);

// Setup variable for payload
let data = 10;

export const performCalculations = async () => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(workerFilePath, {
      workerData: data,
    });

    worker.on('message', resolve);
    worker.on('error', reject);
  });
};

performCalculations();

let promises = [];
for (let i = 0; i < cores; i++) {
  const p = performCalculations()
    .then((data) => ({ status: 'resolved', data }))
    .catch(() => ({ status: 'error', data: null }));
  promises.push(p);
  data++; // Increment data as specified in assignment
}

const result = await Promise.all(promises); // Top level await available only in 16+ node version

console.log(result);

/*
 Result on my machine
[
    { status: 'resolved', data: 55 },
    { status: 'resolved', data: 89 },
    { status: 'resolved', data: 144 },
    { status: 'resolved', data: 233 },
    { status: 'resolved', data: 377 },
    { status: 'resolved', data: 610 },
    { status: 'resolved', data: 987 },
    { status: 'resolved', data: 1597 },
    { status: 'resolved', data: 2584 },
    { status: 'resolved', data: 4181 },
    { status: 'resolved', data: 6765 },
    { status: 'resolved', data: 10946 }
]
*/
