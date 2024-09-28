const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const { url } = require("inspector");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require("./middlewares/authentication");

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
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.get("/", (req, res) => {
  console.log(req.user);
  res.render("home",{
    // user: req.user,
    });
});


app.use("/user",userRoute);






app.listen(PORT, () =>
  console.log(`server started at http://localhost:${PORT}`)
);

