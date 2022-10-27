const express = require("express");
const app = express();
const studentRoute = require("./routes/student");;
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const userRoute = require("./routes/user");
mongoose.connect("mongodb+srv://saqib:saqibfaisal22@atlascluster.rvlqz1e.mongodb.net/?retryWrites=true&w=majority")
mongoose.connection.on('error',err=>{
    console.log("connection failed")
})
mongoose.connection.on('connected',connected=>{
    console.log("connected to database")
})
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use("/student", studentRoute);
app.use("/user", userRoute);
// app.use((req, res, next) => {
//   res.status(200).json({
//     message: "It works ! ",
//   });
// });

app.use((req, res, next) => {
    res.status(404).json({
        error: "Not Found"
    })
});
module.exports = app;
