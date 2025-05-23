const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;

  if (value === undefined) {
    throw Error(`Missing String environment variable for ${key}`);
  }

  return value;
};

export const MONGO_URL=getEnv("MONGO_URL")
export const SECRET=getEnv("SECRET")
export const PORT=getEnv("PORT")
export const CLIENT_URL=getEnv("CLIENT_URL")
export const NODE_ENV=getEnv("NODE_ENV")