import DB from "../database";

export type OrderType = {
  id?: number;
  user_id: number;
  status: number;
};

export class OrderStore {
  async index(): Promise<OrderType[]> {
    try {
      const db_conn = await DB.connect();
      const sql = "SELECT * FROM orders";
      const result = await db_conn.query(sql);
      db_conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async show(id: string): Promise<OrderType> {
    try {
      const db_conn = await DB.connect();
      const sql = "SELECT * FROM orders WHERE id=($1)";
      const result = await db_conn.query(sql, [id]);
      db_conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order with id ${id}. Error: ${err}`);
    }
  }

  async create(o: OrderType): Promise<OrderType> {
    try {
      const db_conn = await DB.connect();
      const sql =
        "INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *";
      const result = await db_conn.query(sql, [o.user_id, o.status]);
      const order = {
        id: result.rows[0].id,
        user_id: result.rows[0].user_id,
        status: Number(result.rows[0].status),
      };
      db_conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not add new order. Error: ${err}`);
    }
  }

  async update(id: string, o: OrderType): Promise<OrderType> {
    try {
      const db_conn = await DB.connect();
      const sql = `UPDATE orders SET user_id=$1, status=$2 WHERE id=${id} RETURNING *;`;
      const result = await db_conn.query(sql, [o.user_id, o.status]);
      db_conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update order with id ${id}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<OrderType> {
    try {
      const db_conn = await DB.connect();
      const sql = `DELETE FROM orders WHERE id=${id} RETURNING *;`;
      const result = await db_conn.query(sql);
      db_conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update order with id ${id}. Error: ${err}`);
    }
  }
}
