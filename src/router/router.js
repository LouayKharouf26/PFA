"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var controller = require("../controller/controller");
router.get("/", controller.getDefault);
module.exports = router;
