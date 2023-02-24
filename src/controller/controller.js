"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports.getDefault = function (req, res) {
    console.log("hello for get request");
    res.send("hello for test request");
};
module.exports.addUser = function (req, res) {
    var body = req.body;
};
