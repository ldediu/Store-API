"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var verifyAuthToken = function (req, res, next) {
    try {
        var auth_header = req.headers.authorization;
        var token = auth_header.split(' ')[1];
        var decoded = jsonwebtoken_1["default"].verify(token, process.env.TOKEN_SECRET);
        if (!decoded) {
            res.status(401);
            res.send({ message: 'Token is missing' });
        }
        else {
            next();
        }
    }
    catch (err) {
        res.status(401);
        res.send({ message: err.message });
    }
};
exports["default"] = verifyAuthToken;
