import mongoose from "mongoose";

const schema = mongoose.Schema({
  mainImg: {
    public_id: { type: String, required: true },
    url: { type: String, required: true },
  },
  images: [
    {
      public_id: { type: String },
      url: { type: String },
    },
  ],

  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
});

const blogModel = mongoose.model("blog", schema);

export default blogModel;
