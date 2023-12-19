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
});
schema.post(['find','fineOne'],(doc)=>{
    for (let i = 0; i < doc.length; i++) {
       doc[i].logo = 'http://localhost:3003/'+doc[i].logo
       doc[i].previewImgs = doc[i].previewImgs.map((img)=>'http://localhost:3003/'+img)
       doc[i].mainImg = 'http://localhost:3003/'+doc[i].mainImg
    }
})
const websiteModal = mongoose.model('website',schema)

export default websiteModal