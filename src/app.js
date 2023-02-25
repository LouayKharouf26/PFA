"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var router = require("./router/router");
require("dotenv").config();
var app = express();
app.use(express.json());
app.use(cors({
    origin: ["frontend_ip:port"],
}));
app.use(router);
app.listen(process.env.PORT, function () { });
