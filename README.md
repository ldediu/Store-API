# Store Backend

## Technologies Used

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

### Tables

Table: products (id:integer, name:varchar, price:decimal, category:varchar)

Table: users (id:integer, first_name:varchar, last_name:varchar, password:varchar)

Table: orders (id:integer, user_id:integer[foreign key to users], status:integer)

Table: orders_detailed (id:integer, order_id:integer[foreign key to orders], product_id[foreign key to products], quantity:integer)
