const express=require("express");
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors=require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");

const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: '*'
}));

app.use(express.session({
    secret : 'somesecret',

    cookie : {
        secure : true, // it works without the secure flag (cookie is set)
        proxy : true,  // tried using this as well, no difference
        maxAge: 5184000000 // 2 months
    }
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

// app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });

app.use(errorMiddleware);


module.exports=app;