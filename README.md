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

#### Products

- id: serial
- name: varchar
- price: numeric
- category: varchar

#### Users

- id: serial
- first_name: varchar
- last_name: varchar
- password: varchar

#### Orders

- id: serial
- user_id: integer [foreign key to users]
- status: smallint

#### Orders Detailed

- id: serial
- order_id: integer [foreign key to orders]
- product_id: integer [foreign key to products]
- quantity: smallint

## Routes

### Products

Show products
- `[GET] "/products"`

Show a product
- `[GET] "/products/:id"`

Create a product
- `[POST] "/products"` - Token required

Delete a product
- `[DELETE] "/products/:id"` - Token required

Show products by a category
- `[GET] "/products/category/:category"` - Token required

### Users

Show users
- `[GET] "/users"` - Token required

Show a user
- `[GET] "/users/:id"` - Token required

Create a user 
- `[POST] "/users"` - Token created

### Orders

Show orders
- `[GET] "/orders"`

Show an order
- `[GET] "/orders/:id"`

Create an order
- `[POST] "/orders"` - Token required

Update an order
- `[PUT] "/orders/:id"` - Token required

Delete an order
- `[DELETE] "/orders/:id"` - Token required

Show only current orders by user
- `[GET] "/orders/users/:id"` - Token required

### Orders Detailed

Show all products in an order
- `[GET] "/orders/:id/products"`

Add products to an order
- `[POST] "/orders/:id/products"` - Token required

Edit products in an order
- `[PUT] "/orders/:id/products"` - Token required

Delete all produtct from an order
- `[DELETE] "/orders/:id/products"` - Token required
