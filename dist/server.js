"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var users_1 = __importDefault(require("./handlers/users"));
var products_1 = __importDefault(require("./handlers/products"));
var orders_1 = __importDefault(require("./handlers/orders"));
var app = express_1["default"]();
var address = "0.0.0.0:3000";
app.use(body_parser_1["default"].json());
users_1["default"](app);
products_1["default"](app);
orders_1["default"](app);
app.get("/", function (req, res) {
    res.send("Hello World!");
});
app.listen(3000, function () {
    console.log("starting app on: " + address);
});
exports["default"] = app;
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0X25hbWUiOiJKb2huMSIsImxhc3RfbmFtZSI6IkRvZTEiLCJwYXNzd29yZCI6IjEyMzEifSwiaWF0IjoxNjIxNjM5MzE3LCJleHAiOjE2MjIyNDQxMTd9.4fj8WqlJuzlgdGQdyAT0V87-r2NEhnhrhBlfq5EW6Tg
