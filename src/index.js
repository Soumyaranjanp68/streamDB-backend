const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const route = require("./routes/route");
const app = express();
const multer = require('multer');

app.use(express.json());
app.use(multer().any());
app.use(cors());

mongoose.set("strictQuery", true);
mongoose.connect("mongodb+srv://Soumyaranjan:utnipsom@soumya-db.3rzvirb.mongodb.net/StreamDB",
    { useNewUrlParser: true }
)
    .then(() => console.log("mongoDB is connected."))
    .catch((err) => console.log(err));

app.use("/", route);
app.use(cookieParser());

let port = 3001;
app.listen(port, function () {
    console.log(`Express app is running on port  ${port}`);
});