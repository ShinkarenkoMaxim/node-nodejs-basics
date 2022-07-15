import { fileURLToPath } from 'url';
import path from 'path';
import cp from 'child_process';

// Get __dirname by parsing module url
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Setup our filepaths
const scriptFilePath = path.resolve(__dirname, `./files/script.js`);

export const spawnChildProcess = async (args) => {
  // Fork process and send args. Set IPC-communication
  const child = cp.fork(scriptFilePath, args);

  // Receive message from child for test
  child.on('message', (message) => {
    console.log(message);
  });
};

spawnChildProcess(process.argv.slice(2));
