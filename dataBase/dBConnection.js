import mongoose from "mongoose";

const dbConnection = mongoose.connect(process.env.DB_Connection).then(()=>{
    console.log('connection is done');
})



export default dbConnection