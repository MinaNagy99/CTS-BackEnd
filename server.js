import dBConnection from "./dataBase/dBConnection.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import customErrorHandler from "./middleware/customErrorHandler.js";

import init from "./mainRoutes.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.static("uploads"));
app.use(cors());

dBConnection;
app.use(morgan("combined"));
init(app);

app.use(customErrorHandler);
app.listen(process.env.PORT || 3000, (req, res) => {
  console.log("server listening on port " + process.env.PORT);
});
