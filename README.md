# Store Backend

## Technologies Used

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

### Tables

Table: products (id:serial, name:varchar, price:numeric, category:varchar)

Table: users (id:serial, first_name:varchar, last_name:varchar, password:varchar)

Table: orders (id:serial, user_id:integer[foreign key to users], status:smallint)

Table: orders_detailed (id:serial, order_id:integer[foreign key to orders], product_id[foreign key to products], quantity:smallint)
