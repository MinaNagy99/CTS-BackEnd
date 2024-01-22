import { truncate } from "fs";
import mongoose, { Types } from "mongoose";

const schema = mongoose.Schema(
  {
    mainImg: {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
    title: { type: String, required: true },

    body: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    caption: {
      type: Object,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },
    createdBy: { type: Types.ObjectId, ref: "user" },
    tags: [{ type: String }],
    description: {
      type: String,
    },
    comments: [{ type: Types.ObjectId, ref: "comment" }],
    categories: [{ type: Types.ObjectId, ref: "blogCategory" }],
  },
  {
    timestamps: true,
  }
);

schema.pre(["find", "save"], async function (next) {
  this.populate({
    path: "createdBy",
    model: "user",
    select: "name email avatar",
  });
  this.populate("comments");
  next();
});

const blogModel = mongoose.model("blog", schema);

export default blogModel;
