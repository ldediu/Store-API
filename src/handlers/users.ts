import express from "express";
import jwt from "jsonwebtoken";
import verifyAuthToken from "../middleware/verifyAuthToken";
import { UserType, UserStore } from "../models/user";

const userStore = new UserStore();

const index = async (_req: express.Request, res: express.Response) => {
  try {
    const users = await userStore.index();
    res.status(200);
    res.send(users);
  } catch (err) {
    res.status(400);
    res.json(err.message);
  }
};

const show = async (req: express.Request, res: express.Response) => {
  if (!req.params.id) {
    res.status(400);
    res.send({
      message: "User's ID must be provided",
    });
    return;
  }
  try {
    const user = await userStore.show(req.params.id);
    res.status(200);
    res.send(user);
  } catch (err) {
    res.status(400);
    res.json(err.message);
  }
};

const create = async (req: express.Request, res: express.Response) => {
  if (!req.body.first_name || !req.body.last_name || !req.body.password) {
    res.status(400);
    res.send({
      message: "First, last and password must be provided",
    });
    return;
  }
  try {
    const new_user: UserType = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
    };
    const user = await userStore.create(new_user);
    const token = jwt.sign(
      { user: new_user },
      process.env.TOKEN_SECRET as string,
      { expiresIn: "7d" }
    );
    res.status(200);
    res.send({
      ...user,
      password: "*****",
      token: token,
    });
  } catch (err) {
    res.status(400);
    res.json(err.message);
  }
};

const userRoutes = (app: express.Application): void => {
  app.get("/users", verifyAuthToken, index);
  app.get("/users/:id", verifyAuthToken, show);
  app.post("/users", create);
};

export default userRoutes;
