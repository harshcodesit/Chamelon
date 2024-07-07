const User = require("../models/user");
const passport = require("passport");
const {savedUrl}= require("../middleware.js");


module.exports.signup = async (req,res)=>{
    try{
       let {username,email,password}= req.body;
    const user = new User({email,username});
    const registered = await User.register(user,password);
    
    req.login(registered, (err)=>{
       if(err){
           return next(err);
       }
       req.flash("success", `Welcome ${username} to Camelon`);
       res.redirect("/listings");
    });
   
    }catch(e){
       req.flash("error", e.message);
       
       res.redirect("/signup");
    }
   };

module.exports.login = async (req,res)=>{
    let {username}= req.body;
    req.flash("success", `Great Having You Back! ${username}`);
    let redirectlink = res.locals.redirectUrl || "/listings"
res.redirect(redirectlink);
};

module.exports.logout = async (req,res,next)=>{
    req.logout((err)=>{
        if(err){
         return   next(err); 
        }
        req.flash("success", "Logged out successfully");
        res.redirect("/listings");
    })
};