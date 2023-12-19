import Express from "express";
import "dotenv/config";
import dBConnection from "./dataBase/dBConnection.js";
import morgan from "morgan";
import websiteRoute from "./src/portfolio/portfolio.router.js";
import cors from "cors";
import  dotenv  from "dotenv";
dotenv.config()
const app = Express();
app.use(cors());
app.use(Express.json());
app.use(Express.static("uploads"));
dBConnection;
app.use(morgan("combined"));
app.use("/website", websiteRoute);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ err: err, statusCode });
});
app.listen(process.env.PORT||3000, (req, res) => {
  console.log("server listening on port " + process.env.PORT);
});
