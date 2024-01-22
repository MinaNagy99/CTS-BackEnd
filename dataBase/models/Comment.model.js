import { Schema, Types, model } from "mongoose";

const commentSchema = new Schema({
  text: [{ type: String, required: true }],
  createdBy: { type: Types.ObjectId, ref: "user" },

  parent: { type: Types.ObjectId, ref: "comment", default: null },
});

commentSchema.pre(["find", "save"], async function (next) {
  this.populate("createdBy", "name avatar email");
});
const commentModel = model("comment", commentSchema);

export default commentModel;
