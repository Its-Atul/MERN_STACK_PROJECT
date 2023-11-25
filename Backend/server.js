const express = require("express");
const app = express();
require("dotenv").config();

// import all the routes
const userRoutes = require("./routes/User");
const courseRoutes = require("./routes/Course");
const profileRoutes = require("./routes/Profile");
const reachRoutes = require("./routes/Reach");
const paymentRoute = require("./routes/Payments");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const db = require("./config/database");
// PORT number
const PORT = process.env.PORT || 6000;

// connectin with database
db.connectdb();
// middleware
app.use(express.json());
app.use(cookieParser());
// to entertain THE req of front end
app.use(
    cors({
        // origin:"http://localhost:3000",
        origin:"*",
        credentials:true,
    })
);
// file upload middleware
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
);
// connection with cloudinary
cloudinaryConnect();

// mount all the routes

// base url for user route
app.use("/api/v1/auth", userRoutes);
// profile
app.use("/api/v1/profile", profileRoutes);
// payment
app.use("/api/v1/payment", paymentRoute);
// course
app.use("/api/v1/course", courseRoutes);
// contact Route
app.use("/api/v1", reachRoutes);
// default routes
app.get("/", (req, res)=>{
    return res.json({
        success:true,
        message:" your server is running",
    });
});

// activate the server
app.listen(PORT, ()=>{
    console.log(`app is running at ${PORT}`);
});
