import * as express from "express";
import * as cors from "cors";
import helmet from "helmet";
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
