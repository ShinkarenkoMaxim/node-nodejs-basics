import { Transform } from 'stream';

// This example I tried to make without readline
export const transform = async () => {
  console.log('Вводите текст и я его переверну');

  const reverse = new Transform({
    transform(chunk, encoding, callback) {
      const text = chunk.toString(); // Chunk need to convert from buffer to string
      const reversedText = text.split('').reverse().join('') + '\n';

      // Call transform callback with no errors
      callback(null, reversedText);
    },
  });

  process.stdin.pipe(reverse).pipe(process.stdout);
};

// Graceful shutdown
process.on('SIGINT', () => {
  process.exit();
});

transform();
