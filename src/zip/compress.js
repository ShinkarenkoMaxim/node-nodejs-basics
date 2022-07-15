import { fileURLToPath } from 'url';
import { pipeline } from 'stream';
import fs from 'fs';
import path from 'path';
import { createGzip } from 'zlib';

export const compress = async () => {
  // Get __dirname by parsing module url
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  // Setup our filepaths
  const sourceFileName = 'fileToCompress';
  const sourceFilePath = path.resolve(
    __dirname,
    `./files/${sourceFileName}.txt`
  );
  const destFileName = 'archive';
  const destFilePath = path.resolve(__dirname, `./files/${destFileName}.gz`);

  // Create gzip Transform stream
  const gzip = createGzip();

  // Create Readable and Writeable streams
  const source = fs.createReadStream(sourceFilePath);
  const dest = fs.createWriteStream(destFilePath);

  // Send all streams to pipeline
  pipeline(source, gzip, dest, (err) => {
    if (err) {
      console.log('Произошла ошибка:', err);
      process.exitCode = 1;
    }
  });
};

compress();
