import { fileURLToPath } from 'url';
import { pipeline } from 'stream';
import fs from 'fs';
import path from 'path';
import { createGunzip } from 'zlib';

export const decompress = async () => {
  // Get __dirname by parsing module url
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  // Setup our filepaths
  const sourceFileName = 'archive';
  const sourceFilePath = path.resolve(
    __dirname,
    `./files/${sourceFileName}.gz`
  );
  const destFileName = 'fileToCompress';
  const destFilePath = path.resolve(__dirname, `./files/${destFileName}.txt`);

  // Create gunzip Transform stream
  const gunzip = createGunzip();

  // Create Readable and Writeable streams
  const source = fs.createReadStream(sourceFilePath);
  const dest = fs.createWriteStream(destFilePath);

  pipeline(source, gunzip, dest, (err) => {
    if (err) {
      console.log('Произошла ошибка:', err);
      process.exitCode = 1;
    }
  });
};

decompress();
