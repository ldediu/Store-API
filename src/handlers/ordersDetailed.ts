import express from 'express';
import {OrderDetType, OrderDetStore} from '../models/orderDetailed';

//add awt

const orderDetStore = new OrderDetStore();

const show_products_in_order = async(req: express.Request, res: express.Response) => {
    if (!req.params.id) {
        res.status(400);
        res.send({
            message: 'Order\'s ID must be provided'
        });
        return;
    }
    try {
        const order = await orderDetStore.show_products(req.params.id);
        res.status(200);
        res.send(order);
    } catch (err) {
        res.status(400);
        res.json(err.message);
    }
}

const add_products_to_order = async(req: express.Request, res: express.Response) => {
    if (!req.body.order_id || !req.body.product_id || !req.body.quantity) {
        res.status(400);
        res.send({
            message: 'Order_id, Product_id, quantity must be provided'
        });
        return;
    }
    try {
        const products_to_add: OrderDetType = {
            order_id: req.body.order_id,
            product_id: req.body.product_id,
            quantity: req.body.quantity
        }
        const order = await orderDetStore.add_products(products_to_add);
        res.status(200);
        res.send(order);
    } catch (err) {
        res.status(400);
        res.json(err.message);
    }
}

const update_products_in_order = async(req: express.Request, res: express.Response) => {
    if (!req.params.order_id || !req.body.product_id || !req.body.quantity) {
        res.status(400);
        res.send({
            message: 'Order\'s ID and updated order info must be provided'
        });
        return;
    }
    try {
        const updated_order: OrderDetType = {
            order_id: parseInt(req.params.order_id),
            product_id: parseInt(req.body.product_id),
            quantity: parseInt(req.body.quantity)
        }
        const result_order = await orderDetStore.update_products(req.params.order_id, updated_order);
        res.status(200);
        res.send(result_order);
    } catch (err) {
        res.status(400);
        res.json(err.message);
    }
}

const delete_all_products_from_order = async(req: express.Request, res: express.Response) => {
    if (!req.params.order_id) {
        res.status(400);
        res.send({
            message: 'Order\'s ID must be provided'
        });
        return;
    }
    try {
        const order = await orderDetStore.delete_products(req.params.order_id);
        res.status(200);
        res.send(order);
    } catch (err) {
        res.status(400);
        res.json(err.message);
    }
}

const orderDetailedRoutes = (app: express.Application) => {
    app.get('/orders/:id/products', show_products_in_order);
    app.post('/orders/:id/products', verifyAuthToken, add_products_to_order);
    app.put('/orders/:id/products', verifyAuthToken, update_products_in_order);
    app.delete('/orders/:id/products', verifyAuthToken, delete_all_products_from_order);
}

export default orderDetailedRoutes;