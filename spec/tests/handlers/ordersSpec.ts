import supertest from "supertest";
import app from "../../../src/server";

const request = supertest(app);

let token = '';
let us_id = 1;
let ord_id = 1;

describe("Orders Handler Testing", () => {

  beforeAll(async () => {
    const new_user = {
      first_name: "John",
      last_name: "Doe",
      password: "123"
    }
    const response = await request.post('/users').send(new_user);
    token = response.body.token;
    us_id = response.body.id;
  })

  it("index method should return a list of orders", async () => {
    const response = await request.get("/orders");
    expect(response.status).toBe(200);
  });

  it("create method should create an order", async () => {
    const new_order = {
      user_id: us_id,
      status: 1
    };
    const response = await request
      .post("/orders")
      .send(new_order)
      .set("Authorization", `Bearer ${token}`);
    ord_id = response.body.id;
    expect(response.status).toBe(200);
  });

  it("show method should return an order", async () => {
    const response = await request.get("/orders").send(ord_id + '');
    expect(response.status).toBe(200);
  });

  it("update method should update an order", async () => {
    const new_order = {
      user_id: us_id,
      status: 2
    };
    const response = await request
      .put(`/orders/${ord_id}`)
      .send(new_order)
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.status).toBe(2);
  });

  it("destroy method should delete an order", async () => {
    const response = await request.delete(`/orders/${ord_id}`).set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

});