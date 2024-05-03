export const getEnvVariable = (key: string) => {
  if (typeof process.env[key] === undefined) {
    throw new Error(`Environment variable ${key} is not set.`);
  }

  return process.env[key] as string;
};
