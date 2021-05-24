import express from 'express';
import verifyAuthToken from '../middleware/verifyAuthToken';
import {ProductType, ProductStore} from '../models/product';

const productStore = new ProductStore();

const index = async(_req: express.Request, res: express.Response) => {
    try {
        const products = await productStore.index();
        res.status(200);
        res.send(products);
    } catch (err) {
        res.status(400);
        res.json(err.message);
    }
}

const show = async(req: express.Request, res: express.Response) => {
    if (!req.params.id) {
        res.status(400);
        res.send({
            message: 'Product\'s ID must be provided'
        });
    }
    try {
        const product = await productStore.show(req.params.id);
        res.status(200);
        res.send(product);
    } catch (err) {
        res.status(400);
        res.json(err.message);
    }
}

const create = async(req: express.Request, res: express.Response) => {
    if (!req.body.name || !req.body.price || !req.body.category) {
        res.status(400);
        res.send({
            message: 'Name, price and category of the product must be provided'
        });
    }
    try {
        const new_product: ProductType = {
            name: req.body.name,
            price: parseInt(req.body.price),
            category: req.body.category
        }
        const user = await productStore.create(new_product);
        res.status(200);
        res.send(user);
    } catch (err) {
        res.status(400);
        res.json(err.message);
    }
}

const destroy = async(req: express.Request, res: express.Response) => {
    if (!req.params.id) {
        res.status(400);
        res.send({
            message: 'Product\'s ID must be provided'
        });
    }
    try {
        const product = await productStore.delete(req.params.id);
        res.status(200);
        res.send(product);
    } catch (err) {
        res.status(400);
        res.json(err.message);
    }
}

const indexByCategory = async(req: express.Request, res: express.Response) => {
    if (!req.params.category) {
        res.status(400);
        res.send({
            message: 'Product\'s category must be provided'
        });
    }
    try {
        const products = await productStore.indexByCategory(req.params.category);
        res.status(200);
        res.send(products);
    } catch (err) {
        res.status(400);
        res.json(err.message);
    }
}

const productRoutes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyAuthToken, create);
    app.delete('/products/:id', verifyAuthToken, destroy);
    app.get('/products/category/:category', indexByCategory);
}

export default productRoutes;