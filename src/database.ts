import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME_PROD, DB_NAME_TEST, ENV } =
  process.env;

const DB_NAME = ENV == "test" ? DB_NAME_TEST : DB_NAME_PROD;

const db_pool = new Pool({
  host: DB_HOST,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD || "",
});

export default db_pool;
