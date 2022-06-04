// WARN! Not effecient solution, but is possible to do
// Use instead Array.map() or for
export const parseArgs = () => {
  // Get custom args
  const args = process.argv.slice(2);

  // Collect all values to string
  let result = '';
  let i = 0;
  while (i < args.length) {
    // Select two args
    result += `${args[i]} is ${args[i + 1]}`;

    // Iterate bypass second arg
    i += 2;

    // Add separator if not the end of array
    if (i < args.length) result += ', ';
  }

  // Print result
  console.log(result);
};

parseArgs();
