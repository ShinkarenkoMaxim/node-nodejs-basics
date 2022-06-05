import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

export const remove = async () => {
  // Get __dirname by parsing module url
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  const filePath = path.resolve(__dirname, './files/fileToRemove.txt');

  // Check if file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    // If file not exists
    if (err) {
      throw new Error('FS operation failed: file not exists');
    }

    fs.rm(filePath, (err) => {
      if (err) {
        throw new Error(err);
      }
    });
  });
};

remove();
