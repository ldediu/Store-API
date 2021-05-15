CREATE TABLE IF NOT EXISTS orders_detailed (
    id SERIAL PRIMARY KEY, 
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    quantity SMALLINT
);
