import DB from "../database";

export type OrderDetType = {
  id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
};

export class OrderDetStore {

    async show_products_in_order(order_id: string): Promise<OrderDetType> {
        try {
          const db_conn = await DB.connect();
          const sql = "SELECT * FROM orders_detailed WHERE order_id=($1)";
          const result = await db_conn.query(sql, [order_id]);
          db_conn.release();
          return result.rows[0];
        } catch (err) {
          throw new Error(`Could not find order with id ${order_id}. Error: ${err}`);
        }
      }

    async add_products_to_order(o_d: OrderDetType): Promise<OrderDetType> {
        try {
          const db_conn = await DB.connect();
          const sql =
            "INSERT INTO orders_detailed (order_id, product_id, status) VALUES($1, $2, $3) RETURNING *";
          const result = await db_conn.query(sql, [o_d.order_id, o_d.product_id, o_d.quantity]);
          const order = {
            id: result.rows[0].id,
            order_id: result.rows[0].order_id,
            product_id: result.rows[0].product_id,
            quantity: Number(result.rows[0].quantity)
          };
          db_conn.release();
          return order;
        } catch (err) {
          throw new Error(`Could not add products to order with id ${o_d.order_id}. Error: ${err}`);
        }
    }

    async update_products_in_order(order_id: string, o_d: OrderDetType): Promise<OrderDetType> {
        try {
          const db_conn = await DB.connect();
          const sql = `UPDATE orders_detailed SET product_id=$1, quantity=$2 WHERE order_id=${order_id} RETURNING *;`;
          const result = await db_conn.query(sql, [o_d.product_id, o_d.quantity]);
          db_conn.release();
          return result.rows[0];
        } catch (err) {
          throw new Error(`Could not update order with id ${order_id}. Error: ${err}`);
        }
    }

    async delete_all_products_from_order(order_id: string): Promise<OrderDetType> {
        try {
          const db_conn = await DB.connect();
          const sql = `DELETE FROM orders_detailed WHERE order_id=${order_id} RETURNING *;`;
          const result = await db_conn.query(sql);
          db_conn.release();
          return result.rows[0];
        } catch (err) {
          throw new Error(`Could not delete order with id ${order_id}. Error: ${err}`);
        }
    }
}
