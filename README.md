# Store Backend

Backend API implementation for a commercial store

## Getting started

`cd` into your new folder and run:
- `npm install`

Add `.env` variables:

- `DB_HOST` - database hostname
- `DB_USER` - database username
- `DB_PASSWORD` - database password
- `DB_NAME_PROD` - database name for production
- `DB_NAME_TEST` - database name for testing
- `ENV` - environment (test/dev)
- `TOKEN_SECRET` - secret for JWT
- `BCRYPT_PASSWORD` - hashing pepper for bcrypt
- `BCRYPT_SALT_ROUNDS` - hashing salt rounds for bcrypt

To test:
- `npm run test`

To start in `dev` mode:
- `npm run watch`

To start in `prod` mode:
- `npm run start`

To build:
- `npm run build`

To run eslint:
- `npm run lint`

To run prettier:
- `npm run prettier`

## Technologies Used

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing
- bcrypt from npm for password hashing

## Database Schema

### Products

Table: `products (id:serial, name:varchar, price:numeric, category:varchar)`

### Users

Table: `users (id:serial, first_name:varchar, last_name:varchar, password:varchar)`

### Orders

Table: `orders (id:serial, user_id:integer[foreign key to users], status:smallint)`

### Orders Detailed

Table: `orders_detailed (id:serial, order_id:integer[foreign key to orders], product_id[foreign key to products], quantity:smallint)`

## Routes

### Products

Show products
- `get ("/products")`

Show a product
- `get ("/products/:id")`

Create a product
- `post ("/products")` - Token required

Delete a product
- `delete ("/products/:id")` - Token required

Show products by a category
- `get ("/products/category/:category")` - Token required

### Users

Show users
- `get ("/users")` - Token required

Show a user
- `get ("/users/:id")` - Token required

Create a user 
- `post ("/users")` - Token created

### Orders

Show orders
- `get ("/orders")`

Show an order
- `get ("/orders/:id")`

Create an order
- `post ("/orders")` - Token required

Update an order
- `put ("/orders/:id")` - Token required

Delete an order
- `delete ("/orders/:id")` - Token required

Show only current orders by user
- `get ("/orders/users/:id")` - Token required

### Orders Detailed

Show all products in an order
- `get ("/orders/:id/products")`

Add products to an order
- `post ("/orders/:id/products")` - Token required

Edit products in an order
- `put ("/orders/:id/products")` - Token required

Delete all produtct from an order
- `delete ("/orders/:id/products")` - Token required
