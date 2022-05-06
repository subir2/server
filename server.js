const app = require("./app");
const connectDatabase = require("./config/database");
const dotenv=require("dotenv");
const product = require("./routes/productRoute");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");
dotenv.config();

require("dotenv").config({ path: "config/config.env" });

connectDatabase();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });

app.use("/api/v1", product);
// const URI = process.env.MONGO_URL;

// mongoose.connect(URI, {

// useNewUrlParser: true, 

// useUnifiedTopology: true 

// }, err => {
// if(err) throw err;
// console.log('Connected to MongoDB!!!')
// })
 
const port=process.env.port||4000;


const server = app.listen(port,()=>{

    console.log(`server is working on http://localhost:${port}`)


});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });