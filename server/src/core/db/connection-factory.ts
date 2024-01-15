import "dotenv/config";

export const DB_NAME = process.env.POSTGRES_DB!;
export const DB_USER = process.env.POSTGRES_USER!;
export const DB_PASS = process.env.POSTGRES_PASSWORD!;
export const DB_HOST = process.env.POSTGRES_HOST ?? "localhost";
export const DB_PORT = process.env.POSTGRES_PORT!;

export const DB_URL = `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
