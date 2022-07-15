import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

export const rename = async () => {
  // Get __dirname by parsing module url
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  const oldFilePath = path.resolve(__dirname, './files/wrongFilename.txt');
  const newFilePath = path.resolve(__dirname, './files/properFilename.md');

  // Check if file exists
  fs.access(oldFilePath, fs.constants.F_OK, (err) => {
    // If file not exists
    if (err) {
      throw new Error('FS operation failed: file not exists');
    }

    fs.access(newFilePath, fs.constants.F_OK, (err) => {
      // If hasnt errors - file already exists
      if (!err) {
        throw new Error('FS operation failed: file already exists');
      }

      // Rename file
      fs.rename(oldFilePath, newFilePath, (err) => {
        if (err) {
          throw new Error(err);
        }
      });
    });
  });
};

rename();
