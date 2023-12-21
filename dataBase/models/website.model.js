import mongoose from "mongoose";

const schema = mongoose.Schema({
  mainImg: { type: String, required: true },
  previewImgs: [
    {
      type: String,
      require: true,
    },
  ],
  logo: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  link: {
    type: String,
    require: true,
  },
});
schema.post(['find','fineOne'],(doc)=>{
    for (let i = 0; i < doc.length; i++) {
       doc[i].logo = 'https://cts.onrender.com/'+doc[i].logo
       doc[i].previewImgs = doc[i].previewImgs.map((img)=>'https://cts.onrender.com/'+img)
       doc[i].mainImg = 'https://cts.onrender.com/'+doc[i].mainImg
    }
})
const websiteModal = mongoose.model('website',schema)

export default websiteModal