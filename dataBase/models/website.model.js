import mongoose, { model } from "mongoose";

const schema = mongoose.Schema({
  mainImg: {
    public_id: { type: String, required: true },
    url: { type: String, required: true },
  },
  previewImgs: [
    {
      public_id: { type: String },
      url: { type: String },
    },
  ],
  logo: {
    public_id: { type: String },
    url: { type: String },
  },
  title: {
    type: String,
    require: true,
  },
  titleInArabic: { type: String, required: true },
  link: {
    type: String,
  },
});

const websiteModal = model("website", schema);

export default websiteModal;
