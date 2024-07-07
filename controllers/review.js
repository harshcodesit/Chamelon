const Review = require("../models/review");
const listing = require("../models/listing");


module.exports.create = async (req,res)=>{
    let {id}= req.params;
    let reviewed = await listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    // console.log(newReview);
    // res.redirect("/listings");
    reviewed.reviews.push(newReview);
    await newReview.save();
    await reviewed.save();
    req.flash("success","Review created successfully");
    res.redirect(`/listings/${id}`)
  };

module.exports.delete = async (req,res)=>{
    let {id,reviewId} = req.params;
    await listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted successfully");
    res.redirect(`/listings/${id}`);
   }