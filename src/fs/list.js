import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

export const list = async () => {
  // Get __dirname by parsing module url
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  const targetDir = path.resolve(__dirname, './files');

  fs.access(targetDir, fs.constants.F_OK, (err) => {
    // If hasnt errors - already exists
    if (err) {
      throw new Error('FS operation failed: files directory not exists');
    }

    fs.readdir(targetDir, (err, files) => {
      if (err) {
        throw new Error(err);
      }

      console.log(files);
    });
  });
};

list();
