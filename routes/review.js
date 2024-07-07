const express = require("express");
const router = express.Router({mergeParams:true}); 
const ExpressError = require("../utils/expressErrors.js");
const listing = require("../models/listing");
const {reviewSchema} = require("../schema.js");
const wrapAsync = require("../utils/wrapasync");
const Review = require("../models/review.js");
const { isLogged , isAuthor} = require("../middleware.js");
const reviewController = require("../controllers/review.js");

const validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if (error){
      let errmsg = error.details.map((el) => el.message).join(",");
     throw new ExpressError(404, errmsg);
    } else{
      next();
    }
  };
  
//create review

router.post("/" ,isLogged ,validateReview , wrapAsync(reviewController.create));
  
  //delete review route
  router.delete("/:reviewId",isLogged, isAuthor,wrapAsync(reviewController.delete))
  

  module.exports = router;