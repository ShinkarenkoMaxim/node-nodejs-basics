import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

/**
 * Creating sha256 hash from reading content in txt files
 */
export const calculateHash = async () => {
  // Get __dirname by parsing module url
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  // Get our text file
  const fileEncoding = 'utf-8'; // Can change if needed
  const fileName = 'fileToCalculateHashFor'; // Can change if needed
  const filePath = path.resolve(__dirname, `./files/${fileName}.txt`);

  // Read file content as utf-8
  fs.readFile(filePath, { encoding: fileEncoding }, (err, data) => {
    // Handle error if can't read file
    if (err) {
      throw new Error("Can't read file: " + err.message);
    }

    // Create hash
    const result = crypto.createHash('sha256').update(data).digest('hex');

    // Print result if dev mode
    if (process.env.NODE_ENV === 'development') {
      console.log(result);
    } else {
      // Returning result as specified in assignment
      return result;
    }
  });
};

calculateHash();
