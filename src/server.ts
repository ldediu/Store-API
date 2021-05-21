import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import userRoutes from "./handlers/users"

const app: express.Application = express();
const address = "0.0.0.0:3000";

app.use(bodyParser.json());

userRoutes(app);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log(`starting app on: ${address}`);
});
