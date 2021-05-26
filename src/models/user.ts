import DB from "../database";
import bcrypt from "bcrypt";
import { parse } from "dotenv";

export type UserType = {
  id?: number,
  first_name: string,
  last_name: string,
  password: string
};

export class UserStore {
  async index(): Promise<UserType[]> {
    try {
      const db_conn = await DB.connect();
      const sql = "SELECT * FROM users";
      const result = await db_conn.query(sql);
      db_conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: string): Promise<UserType> {
    try {
      const db_conn = await DB.connect();
      const sql = "SELECT * FROM users WHERE id=($1)";
      const result = await db_conn.query(sql, [id]);
      db_conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user with id ${id}. Error: ${err}`);
    }
  }

  async create(u: UserType): Promise<UserType> {
    try {
      const db_conn = await DB.connect();
      const pepper = process.env.BCRYPT_PASSWORD as string;
      const salt_rounds = parseInt(process.env.BCRYPT_SALT_ROUNDS as string);
      const hashed_password = bcrypt.hashSync(u.password + pepper, salt_rounds);
      const sql =
        "INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING id";
      const result = await db_conn.query(sql, [
        u.first_name,
        u.last_name,
        hashed_password,
      ]);
      db_conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not add new user ${u.first_name} ${u.last_name}. Error: ${err}`
      );
    }
  }
}
