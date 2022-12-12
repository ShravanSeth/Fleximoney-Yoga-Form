const express=require("express");
const app=express();
require('dotenv').config();
const bodyParser = require("body-parser");
const mongoose= require("mongoose");
const morgan= require("morgan");

mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => console.log('Mongodb is connected'))
.catch((e)=> console.log(e));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(morgan('dev'))
app.use("/", require("./routes/index"));
app.use("/fees", require("./routes/fees"));


//404 Request
app.all("*", (req, res) => {
    return res.status(404).json({
      success: false,
      message: "Page not found",
    });
  });


let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}
app.listen(port, function() {
    console.log("It's UP!");
  })