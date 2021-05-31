# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints

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

## Data Shapes and Schema

### Products

- id
- name
- price
- category

`products (id: INTEGER PRIMARY KEY, name: VARCHAR, price: NUMERIC, category: VARCHAR)`

user_id: int [foreign key to users table], status: varchar[complete or active])`

### Users

- id
- first_name
- last_name
- password

`users (id: INTEGER PRIMARY KEY, first_name: VARCHAR, last_name: VARCHAR, password: VARCHAR)`

### Orders

- id
- user_id
- status

`orders (id: INTEGER PRIMARY KEY, user_id: INTEGER [foreign key to users], status: SMALLINT [1: active, 2: completed, 3: other])`

### Orders Detailed

- id
- order_id
- product_id
- quantity

`orders_detailed (id: INTEGER PRIMARY KEY, order_id: INTEGER [foreign key to orders], product_id: INTEGER [foreign key to products], quantity: SMALLINT)`

