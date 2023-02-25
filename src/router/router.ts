import * as express from "express";

const router = express.Router();
const controller = require("../controller/controller");
router.get("/", controller.getDefault);
router.post("/createUser", controller.createUser);

module.exports = router;
