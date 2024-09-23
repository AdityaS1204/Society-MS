const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const { url } = require("inspector");
const bodyParser = require('body-parser');


const app = express();
const PORT = process.env.PORT || 3000;


mongoose
  .connect("mongodb://127.0.0.1:27017/userData")
  .then((e) => console.log("DB connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get("/", (req, res) => {
  res.render("home");
});

app.use("/user",userRoute);


app.listen(PORT, () =>
  console.log(`server started at http://localhost:${PORT}`)
);

//13:47 start time.
//02:03 end (remaining: login logic, dashboard-user-db-connection)