import { Router } from "express";
import { auth } from "../../middleware/Auth.js";
import * as blog from "./Blogs.controller.js";
import { saveImg } from "../../middleware/uploudToCloud.js";
import { uploadMixfile } from "../../middleware/fileUploud.js";

const BlogRoute = Router();
BlogRoute.route("/")
  .get(blog.getAllBlogs)
  .post(
    auth,
    uploadMixfile([
      { name: "images", maxCount: 3 },
      { name: "mainImg", maxCount: 1 },
    ]),
    saveImg,
    blog.addBlog
  );
BlogRoute.route("/:id")
  .delete(auth, blog.deleteBlog)
  .put(
    auth,
    uploadMixfile([
      { name: "mainImg", maxCount: 1 },
      { name: "images", maxCount: 3 },
    ]),
    saveImg,
    blog.editBlog
  );

export default BlogRoute;
