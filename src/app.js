"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var helmet_1 = require("helmet");
require("dotenv").config();
var router = require("./router/router");
var app = express();
app.use((0, helmet_1.default)());
app.use(express.json());
app.use(cors({
    origin: ["frontend_ip:port"],
}));
app.use(router);
app.listen(process.env.PORT, function () { });
