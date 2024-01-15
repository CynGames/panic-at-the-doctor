import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { DB_URL } from "./connection-factory";
import * as schema from "./schema";

const queryClient = postgres(DB_URL);

export const db = drizzle(queryClient, { schema });

type Drizzle = typeof db;

export class DbService {}
// bio  e-ignore lint/suspicious/noEmptyInterface: <explanation>
export interface DbService extends Drizzle {}
