import mongoose from "mongoose";
import  dotenv  from "dotenv";
dotenv.config()
const dbConnection = mongoose.connect(process.env.DB_Connection).then(()=>{
    console.log('connection is done');
})



export default dbConnection