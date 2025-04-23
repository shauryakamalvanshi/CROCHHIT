import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log(process.env.MONGO_URI);
    
    const connection=mongoose.connection;
    console.log("Connected to MongoDB");

    connection.on('connected',()=>{
      console.log("Connected to MongoDB");
    })
    connection.on('error', (err) => {
      console.error("mongodb connection error please make sure mongodb is running"+err);
      });
  } catch (error) {
    console.log("Error connecting to MongoDB" + error); 
  }
  
}