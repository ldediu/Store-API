import DB from "../database";

export type ProductType = {
  id?: number;
  name: string;
  price: number;
  category: string;
};

export class ProductStore {
  async index(): Promise<ProductType[]> {
    try {
      const db_conn = await DB.connect();
      const sql = "SELECT * FROM products";
      const result = await db_conn.query(sql);
      db_conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async show(id: string): Promise<ProductType> {
    try {
      const db_conn = await DB.connect();
      const sql = "SELECT * FROM products WHERE id=($1)";
      const result = await db_conn.query(sql, [id]);
      db_conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product with id ${id}. Error: ${err}`);
    }
  }

  async create(p: ProductType): Promise<ProductType> {
    try {
      const db_conn = await DB.connect();
      const sql =
        "INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *";
      const result = await db_conn.query(sql, [p.name, p.price, p.category]);
      const product = result.rows[0];
      db_conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not add new product ${p.name}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<ProductType> {
    try {
      const db_conn = await DB.connect();
      const sql = "DELETE FROM products WHERE id=($1)";
      const result = await db_conn.query(sql, [id]);
      const product = result.rows[0];
      db_conn.release();
      return product;
    } catch (err) {
      throw new Error(`Could not delete product with id ${id}. Error: ${err}`);
    }
  }
}
