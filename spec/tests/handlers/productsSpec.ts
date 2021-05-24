import supertest from "supertest";
import app from "../../../src/server";
import jwt from "jsonwebtoken";

const request = supertest(app);

const token = jwt.sign({user: 'test'}, process.env.TOKEN_SECRET as string, {expiresIn: '7d'});

describe("Products Handler Testing", () => {

  let id = '1';

  it("index method should return a list of products", async () => {
    const response = await request.get("/products");
    expect(response.status).toBe(200);
  });

  it("create method should create a product", async () => {
    const new_product = {
      name: "Iphone",
      price: 1000,
      category: "Phones",
    };
    const response = await request
      .post("/products")
      .send(new_product)
      .set("Authorization", `Bearer ${token}`);
    id = response.body.id;
    expect(response.status).toBe(200);
  });

  it("show method should return a product", async () => {
    const response = await request.get("/products").send(id + '');
    expect(response.status).toBe(200);
  });

  it("destroy method should delete a product", async () => {
    const response = await request.delete(`/products/${id}`).set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
