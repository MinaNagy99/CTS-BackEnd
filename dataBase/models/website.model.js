import mongoose from "mongoose";

const schema = mongoose.Schema({
  mainImg: { type: String, required: true },
  previewImgs: [
    {
      type: String,
    },
  ],
  logo: {
    type: String,
  },
  title: {
    type: String,
    require: true,
  },
  link: {
    type: String,
  },
});

const websiteModal = mongoose.model('website',schema)

export default websiteModal