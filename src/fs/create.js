import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export const create = async () => {
  // Get __dirname by parsing module url
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  // Get our text file path
  const fileName = 'fresh'; // Can change if needed
  const filePath = path.resolve(__dirname, `./files/${fileName}.txt`);

  // Check if file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    // If hasnt errors - already exists
    if (!err) {
      throw new Error('FS operation failed: file already exists');
    }

    const data = 'I am fresh and young';

    // If not exists - create new
    fs.writeFile(
      filePath,
      data,
      (err) => {
        if (err) {
          throw new Error("Can't write file: " + err.message);
        }
      },
      { encoding: 'utf-8' }
    );
  });
};

create();
