import { AppError } from "./Utilities/Utilities.js";
import commentRouter from "./src/Comments/Comments.router.js";
import languageRoute from "./src/Language/Language.router.js";
import BlogRoute from "./src/blogs/Blogs.router.js";
import websiteRoute from "./src/portfolio/portfolio.router.js";
import userRouter from "./src/user/user.router.js";

const init = function (app) {
  app.use("/website", websiteRoute);
  app.use("/lang", languageRoute);
  app.use("/blog", BlogRoute);
  app.use("/user", userRouter);
  app.use("/comment", commentRouter);
  app.all("*", (req, res, next) => {
    next(new AppError("path not found"));
  });
};

export default init;
