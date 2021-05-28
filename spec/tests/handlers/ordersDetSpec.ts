import supertest from "supertest";
import app from "../../../src/server";

const request = supertest(app);

let token = '';
let us_id = 1;
let prod_id = 1;
let ord_id = 1;

describe("Orders_detailed Handler Testing", () => {

  beforeAll(async () => {
    //create test user
    const new_user = {
      first_name: "John",
      last_name: "Doe",
      password: "123"
    }
    const response_user = await request.post('/users').send(new_user);
    token = response_user.body.token;
    us_id = parseInt(response_user.body.id);

    //create test product
    const new_product = {
      name: "Samsung",
      price: 500,
      category: "Phones"
    }
    const response_product = await request.post('/products').send(new_product).set("Authorization", `Bearer ${token}`);
    prod_id = parseInt(response_product.body.id);

    //create test order
    const new_order = {
      user_id: us_id,
      status: 1
    }
    const response_order = await request.post('/orders').send(new_order).set("Authorization", `Bearer ${token}`);
    ord_id = parseInt(response_order.body.id);
  })

  it("add_products_to_order method should add products to an order", async () => {
    const new_order_det = {
      order_id: ord_id,
      product_id: prod_id,
      quantity: 2
    };
    const response = await request
      .post(`/orders/${ord_id}/products`)
      .send(new_order_det)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("show_products_in_order method should return a list of products in orders", async () => {
    const response = await request.get(`/orders/${ord_id}/products`);
    expect(response.body.quantity).toEqual(2);
  });

  it("update_products_in_order method should update an order", async () => {
    const updated_order_det = {
      order_id: ord_id,
      product_id: prod_id,
      quantity: 5
    };
    const response = await request
      .put(`/orders/${ord_id}/products`)
      .send(updated_order_det)
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.quantity).toEqual(5);
  });

  it("methods should not work with a wrong token or without it", async () => {
    const response = await request.delete(`/orders/${ord_id}/products`).set("Authorization", `Bearer missing_token`);
    expect(response.status).toBe(401);
  });

  it("delete_all_products_from_order method should delete all products in order", async () => {
    const response = await request.delete(`/orders/${ord_id}/products`).set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

});
