import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import userRoutes from "./handlers/users";
import productRoutes from "./handlers/products";
import orderRoutes from "./handlers/orders";
import orderDetailed from "./handlers/ordersDetailed"

const app: express.Application = express();
const address = "0.0.0.0:3000";

app.use(bodyParser.json());

userRoutes(app);
productRoutes(app);
orderRoutes(app);
orderDetailed(app);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log(`starting app on: ${address}`);
});

export default app;

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0X25hbWUiOiJKb2huMSIsImxhc3RfbmFtZSI6IkRvZTEiLCJwYXNzd29yZCI6IjEyMzEifSwiaWF0IjoxNjIxNjM5MzE3LCJleHAiOjE2MjIyNDQxMTd9.4fj8WqlJuzlgdGQdyAT0V87-r2NEhnhrhBlfq5EW6Tg