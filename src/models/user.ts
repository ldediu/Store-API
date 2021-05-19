import DB from "../database";

export type UserType = {
  id?: number;
  first_name: string;
  last_name: string;
  password: string;
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
}