import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

export const read = async () => {
  // Get __dirname by parsing module url
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  // Get our text file
  const fileName = 'fileToRead'; // Can change if needed
  const filePath = path.resolve(__dirname, `./files/${fileName}.txt`);

  // Create Readable stream
  const stream = fs.createReadStream(filePath);

  // Checking errors in advance
  stream.on('error', (err) => {
    console.log(`Reading error: ${err.message}`);
  });

  // Save data by chunks to variable
  let body = '';
  stream.on('data', (chunk) => {
    body += chunk;
  });

  // If stream ending - write to stdout as specified in assignment
  stream.on('end', () => {
    process.stdout.write(body + '\n'); // Add new line tag for normally displays raw data
  });
};

// Graceful shutdown
process.on('SIGINT', () => {
  process.exit();
});

read();
