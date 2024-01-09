import "dotenv/config";
import dBConnection from "./dataBase/dBConnection.js";
import express from "express";
import morgan from "morgan";
import websiteRoute from "./src/portfolio/portfolio.router.js";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./src/user/user.router.js";
import languageRoute from "./src/Language/Language.router.js";
import BlogRoute from "./src/blogs/Blogs.router.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.static("uploads"));
app.use(cors());

dBConnection;
app.use(morgan("combined"));
app.use("/website", websiteRoute);
app.use("/user", userRouter);
app.use("/lang", languageRoute);
app.use("/blog", BlogRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send({ err: err.message, statusCode });
});
app.listen(process.env.PORT || 3000, (req, res) => {
  console.log("server listening on port " + process.env.PORT);
});
