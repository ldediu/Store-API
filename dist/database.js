"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1["default"].config();
var _a = process.env, DB_HOST = _a.DB_HOST, DB_USER = _a.DB_USER, DB_PASSWORD = _a.DB_PASSWORD, DB_NAME_PROD = _a.DB_NAME_PROD, DB_NAME_TEST = _a.DB_NAME_TEST, ENV = _a.ENV;
var DB_NAME = (ENV == 'test') ? DB_NAME_TEST : DB_NAME_PROD;
var db_pool = new pg_1.Pool({
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD || ''
});
exports["default"] = db_pool;
