const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config({ path: "../config.env" });
const app = express();
app.use(bodyParser.json({ limit: "350mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "350mb", extended: true }));
// app.use(express.urlencoded({extended:false}));
app.use(cors());
const port = process.env.PORT || 1922;
const CONNECTION_URL =
  "mongodb+srv://Nodejstutorial:Nodejstutorial123@cluster0.0y601.mongodb.net/test?retryWrites=true&w=majority";

app.get("/", (req, res) => {
  res.send("Server strated at port 1922");
});
app.use(bodyParser.json());
// app.use(expressValidator);
app.use(require("./router/route"));
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(".Mongoose Data connected..");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
