if(process.env.NODE_ENV != "production"){
  require('dotenv').config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./models/listing");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const path = require("path");
const wrapAsync = require("./utils/wrapasync");
const ExpressError = require("./utils/expressErrors.js");
const Review = require("./models/review.js");
const {reviewSchema} = require("./schema.js");
const listings = require("./routes/listing.js");
const reviewss = require("./routes/review.js");
const userRoute = require("./routes/user.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localstrat = require("passport-local");
const User = require("./models/user.js");
const wrapasync = require("./utils/wrapasync");
const { register } = require("module");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

main().catch(err => console.log(err));

 async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wonder');};


  const sessionOpt = {
    secret: "secret",
    resave : false,
    saveUninitialized : true,
    cookie : {
      expires: Date.now() + (7*24*60*60*100),
      maxAge: 7*24*60*60*100,
      httpOnly: true
    }
  }

  app.use(session(sessionOpt));
  app.use(flash()); 

//authentication
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new localstrat(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  

  
  //flash
  app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
  });

  // // app.get("/demouser", wrapAsync(async(req,res)=>{
  // //   let fake = new User({
  // //     email: "apap@gmail.com",
  // //     username: "delta"
  // //   });

  //   let registered = await User.register(fake, "none");
  //   res.send(registered)
  // }))

  app.get("/",wrapAsync(async (req,res)=>{
    const allisting = await listing.find({});
    res.render("listing.ejs", {allisting});
   
    }));
  

//routes
app.use("/listings", listings);
app.use("/listings/:id/review" , reviewss);
app.use("/signup" , userRoute);










app.all("*", (req,res,next)=>{
  next(new ExpressError(404,"Page Not Found!"))
});

app.listen(8080, ()=>{
    console.log("port is listening")
});



