import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

// Yes! It's a Callback Hell! But I dont know how else to create asynchronous I/O operations
export const copy = async () => {
  // Get __dirname by parsing module url
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  const sourceDir = path.resolve(__dirname, './files');
  const destDir = path.resolve(__dirname, './files_copy');

  // Check if file exists
  fs.access(sourceDir, fs.constants.F_OK, (err) => {
    // If source dir not exists
    if (err) {
      throw new Error('FS operation failed: files directory not exists');
    }

    fs.access(destDir, fs.constants.F_OK, (err) => {
      // If hasnt errors - already exists
      if (!err) {
        throw new Error(
          'FS operation failed: files_copy directory already exists'
        );
      }

      fs.mkdir(destDir, (err) => {
        // If cant create directory
        if (err) {
          throw new Error(err);
        }

        fs.readdir(sourceDir, (err, files) => {
          // If cant parse files
          if (err) {
            throw new Error(err);
          }

          for (let file of files) {
            const sourceFilePath = path.resolve(sourceDir, file);
            const destFilePath = path.resolve(destDir, file);

            fs.copyFileSync(sourceFilePath, destFilePath);
          }
        });
      });
    });
  });
};

copy();
