import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import * as readline from 'readline';

export const write = async () => {
  // Get __dirname by parsing module url
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  // Get our text file
  const fileName = 'fileToWrite'; // Can change if needed
  const filePath = path.resolve(__dirname, `./files/${fileName}.txt`);

  // Create Writeable stream
  const stream = fs.createWriteStream(filePath);

  // Checking errors in advance
  stream.on('error', (err) => {
    console.log(`Writing error: ${err.message}`);
  });

  // Use readline for getting data
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Ваш текст: ',
  });

  rl.prompt();

  // Handle exit program and notify
  rl.on('close', () => {
    stream.end();
    console.log(`\nВсе изменения сохранены в файле: ${filePath}\n`);
  });

  // Write entered text to stream
  rl.on('line', (input) => {
    // Shortcut for close program
    if (input === 'exit') {
      stream.end();
      rl.close();

      return;
    }

    const line = input + '\n';
    stream.write(line);
    rl.prompt();
  });
};

// Graceful shutdown
process.on('SIGINT', () => {
  process.exit();
});

write();
