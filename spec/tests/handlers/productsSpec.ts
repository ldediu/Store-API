import supertest from "supertest";
import app from "../../../src/server";

const request = supertest(app);

describe("Products Handler Testing", () => {

  it("index method should return a list of products", async () => {
    const response = await request.get("/products");
    expect(response.status).toBe(200);
  });

  it("create method should not create a product without a token", async () => {
    const new_product = {
      name: "Iphone",
      price: 1000,
      phones: "Phones",
    };
    const response = await request
      .post("/products")
      .send(new_product)
      .set("Authorization", `Bearer token`);
    expect(response.status).toBe(401);
  });

  it("show method should return a product", async () => {
    const response = await request.get("/products").send("1");
    expect(response.status).toBe(200);
  });
});
