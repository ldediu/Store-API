import express from 'express';
import verifyAuthToken from '../middleware/verifyAuthToken'
import {OrderType, OrderStore} from '../models/order';

const orderStore = new OrderStore();

const index = async(_req: express.Request, res: express.Response) => {
    try {
        const orders = await orderStore.index();
        res.status(200);
        res.send(orders);
    } catch (err) {
        res.status(400);
        res.json(err.message);
    }
}

const show = async(req: express.Request, res: express.Response) => {
    if (!req.params.id) {
        res.status(400);
        res.send({
            message: 'Order\'s ID must be provided'
        });
        return;
    }
    try {
        const order = await orderStore.show(req.params.id);
        res.status(200);
        res.send(order);
    } catch (err) {
        res.status(400);
        res.json(err.message);
    }
}

const create = async(req: express.Request, res: express.Response) => {
    if (!req.body.user_id || !req.body.status) {
        res.status(400);
        res.send({
            message: 'User_id and status (1 = active/2 = completed/3 = else) must be provided'
        });
        return;
    }
    try {
        const new_order: OrderType = {
            user_id: req.body.user_id,
            status: req.body.status
        }
        const order = await orderStore.create(new_order);
        res.status(200);
        res.send(order);
    } catch (err) {
        res.status(400);
        res.json(err.message);
    }
}

const update = async(req: express.Request, res: express.Response) => {
    if (!req.params.id || !req.body.user_id || !req.body.status) {
        res.status(400);
        res.send({
            message: 'Order\'s ID and updated order info must be provided'
        });
        return;
    }
    try {
        const updated_order: OrderType = {
            user_id: parseInt(req.body.user_id),
            status: parseInt(req.body.status)
        }
        const order = await orderStore.update(req.params.id, updated_order);
        res.status(200);
        res.send(order);
    } catch (err) {
        res.status(400);
        res.json(err.message);
    }
}

const destroy = async(req: express.Request, res: express.Response) => {
    if (!req.params.id) {
        res.status(400);
        res.send({
            message: 'Order\'s ID must be provided'
        });
        return;
    }
    try {
        const order = await orderStore.delete(req.params.id);
        res.status(200);
        res.send(order);
    } catch (err) {
        res.status(400);
        res.json(err.message);
    }
}

const orderRoutes = (app: express.Application) => {
    app.get('/orders', index);
    app.get('/orders/:id', show);
    app.post('/orders', verifyAuthToken, create);
    app.put('/orders/:id', verifyAuthToken, update);
    app.delete('/orders/:id', verifyAuthToken, destroy);
}

export default orderRoutes;
