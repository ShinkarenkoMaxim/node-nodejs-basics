export const parseEnv = () => {
  let result = ''; // Initialize final result
  const prefix = 'RSS'; // Init for redefine prefix
  const re = new RegExp(`^${prefix}`);

  // Get all env keys
  const environmentKeys = Object.keys(process.env);

  // Filter keys by Reg Exp
  const filteredByPrefix = environmentKeys.filter((key) => re.test(key));

  // Collect env keys in result string
  for (let i = 0; i < filteredByPrefix.length; i++) {
    const key = filteredByPrefix[i];

    result += `${key}=${process.env[key]}`;

    // Add separator between keys if needed
    if (i !== filteredByPrefix.length - 1) {
      result += '; ';
    }
  }

  // Print result
  console.log(result);
};

parseEnv();
