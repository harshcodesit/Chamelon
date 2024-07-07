const express = require("express");
const router = express.Router({mergeParams:true}); 
const ExpressError = require("../utils/expressErrors.js");
const wrapAsync = require("../utils/wrapasync");
const User = require("../models/user.js");
const passport = require("passport");
const {savedUrl}= require("../middleware.js");
const userController = require("../controllers/user.js");
// const user = require("../models/user.js");

// signup
router.route("/")
.get((req,res)=>{
    res.render("user/signup.ejs")
})
.post( wrapAsync(userController.signup) );

router.route("/login")
.get((req,res)=>{
    res.render("user/login.ejs");
})
.post(savedUrl, passport.authenticate("local",{failureRedirect: "/signup/login",failureFlash: true}),
 wrapAsync(userController.login));



router.get("/logout", wrapAsync(userController.logout));

module.exports = router;

