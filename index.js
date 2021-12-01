const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const blog = require("./models/blogSchema");
const user = require("./models/user");

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const url =
  "mongodb+srv://username:password@cluster0.nczkm.mongodb.net/blogDatabase?retryWrites=true&w=majority";
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.get("/", (req, res) => {
  blog.find({}, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      var msg = "Welcome, User";
      res.render("homepage", { message: msg, MainData: data });
    }
  });
});
app.get("/loginpage", (req, res) => {
  var msg = "Welcome to Login Page";
  res.render("loginpage", { data: msg });
});
app.post("/loginFormHandle", (req, res) => {
  user.find(
    { userEmail: req.body.email, userPassword: req.body.password },
    (error, data) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
        if (data.length == 1) {
          var msg = "Welcome, " + req.body.email;
          res.render("userdashboard", { heading: msg });
        } else {
          var msg = "Wrong Password";
          res.render("loginpage", { data: msg });
        }
      }
    }
  );
  //if (req.body.email === "vishala@gmail.com" && req.body.password === "12345") {
  //   var msg = "Welcome, " + req.body.email;
  //   res.render("userdashboard", { heading: msg });
  //  } else if (
  //  req.body.email === "mcanauyanika@gmail.com" &&
  //  req.body.password === "12345"
  // ) {
  // } else {
  //  var msg = "Password Wrong";

  //   res.render("loginpage", { data: msg });
  //  }
});

app.get("/registration", (req, res) => {
  var msg = "Welcome To RegistrationPage";

  res.render("registration", { heading: msg });
});

app.post("/requestFormHandle", (req, res) => {
  const User = new user({
    userEmail: req.body.email,
    userFirstname: req.body.firstname,
    userLastname: req.body.lastname,

    userPassword: req.body.password,
  });
  User.save()
    .then((result) => {
      console.log("Data inserted Successfully");
      var msg = "You have Registered your self successfully ";

      res.render("loginpage", { data: msg });
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(req.body);
});

app.get("/blogging", (req, res) => {
  var msg = "Welcome To My Blogging Area";

  res.render("blog", { heading: msg });
});

app.post("/requestBlogHandle", (req, res) => {
  // const blogtitle = req.body.blog;
  // const blogContent = req.body.textarea;
  const Blog = new blog({
    blogTitle: req.body.blog,

    blogContent: req.body.textarea,
  });
  Blog.save()
    .then((result) => {
      console.log("Data inserted Successfully");
      var msg = "Your Blog are Successfully Submitted";

      res.render("userdashboard", { heading: msg });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/toOpenUserDashboard", (req, res) => {
  res.render("userdashboard");
});
app.listen(3000, () => console.log("server started"));
