import * as express from "express";
import * as cors from "cors";
import * as dotenv from "dotenv";

const router = require("./router/router");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ["frontend_ip:port"],
  })
);
app.use(router);

app.listen(process.env.PORT, () => {});
