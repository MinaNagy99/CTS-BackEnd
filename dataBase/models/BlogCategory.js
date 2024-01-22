import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

const blogCategoryModel = model("blogCategory", schema);
export default blogCategoryModel;
