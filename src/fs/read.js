import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

export const read = async () => {
  // Get __dirname by parsing module url
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  // Get file path
  const fileEncoding = 'utf-8';
  const fileName = 'fileToRead'; // Can change if needed
  const targetFile = path.resolve(__dirname, `./files/${fileName}.txt`);

  fs.access(targetFile, fs.constants.F_OK, (err) => {
    // If hasnt errors - already exists
    if (err) {
      throw new Error('FS operation failed: files directory not exists');
    }

    fs.readFile(targetFile, { encoding: fileEncoding }, (err, data) => {
      if (err) {
        throw new Error(err);
      }

      console.log(data);
    });
  });
};

read();
