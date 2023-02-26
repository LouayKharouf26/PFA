const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const router = require("./router/router");
const app = express();

app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: ["frontend_ip:port"],
  })
);
app.use(router);

app.listen(process.env.PORT, () => {});
