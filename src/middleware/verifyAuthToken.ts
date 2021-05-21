import express from 'express';
import jwt from 'jsonwebtoken';

const verifyAuthToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const auth_header = req.headers.authorization as string;
        const token = auth_header.split(' ')[1];
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
        if (!decoded) {
            res.status(401);
            res.send({message: 'Token is missing'})
        } else {
            next();
        }
    } catch (err) {
        res.status(401);
        res.send({message: err.message});
    }
}

export default verifyAuthToken;