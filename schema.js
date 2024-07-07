const Joi = require("joi");

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating : Joi.number().required(),
        comment : Joi.string().required(),
    }).required()
});










// //index route
// app.get("/listings",wrapAsync(async (req,res)=>{
//   const allisting = await listing.find({});
//   res.render("listing.ejs", {allisting});
//   }));

//   //create route
// app.get("/listings/new", (req,res)=>{
//   res.render("new.ejs");
//   });
  

// //show route
// app.get("/listings/:id", wrapAsync(async (req,res)=>{
//   let {id}= req.params;
//   const onesdata = await listing.findById(id).populate("reviews");
//   res.render("show.ejs", {onesdata});
// }
// ));

// //new route
// app.post("/listings", wrapAsync(async (req,res)=>{
//   let newlisting = new listing(req.body.listing)
//   await newlisting.save();
//   res.redirect("/listings")
// }));

// //edit route
// app.get("/listings/:id/edit", wrapAsync(async (req,res)=>{
//   let {id}= req.params;
//   const onesdata = await listing.findById(id);
//   res.render("edit.ejs", {onesdata});
// }));

// //update route
// app.put("/listings/:id", wrapAsync(async(req,res)=>{
//   let {id}= req.params;
//   await listing.findByIdAndUpdate(id, {...req.body.listing});
//   res.redirect("/listings")
// }));

// //delete route
// app.delete("/listings/:id", wrapAsync(async (req,res)=>{
//   let {id}= req.params;
//   let hello = await listing.findByIdAndDelete(id);b=
//   res.redirect("/listings");
// }));

//review route
// app.post("/listings/:id/review" ,validateReview , wrapAsync(async (req,res)=>{
//   let {id}= req.params;
//   let reviewed = await listing.findById(id);
//   let newReview = new Review(req.body.review);
//   // res.redirect("/listings");
//   reviewed.reviews.push(newReview);
//   await newReview.save();
//   await reviewed.save();
//   res.redirect(`/listings/${id}`)
// }));

// //delete review route
// app.delete("/listings/:id/reviews/:reviewId",wrapAsync(async (req,res)=>{
//  let {id,reviewId} = req.params;
//  await listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
//  await Review.findByIdAndDelete(reviewId);
//  res.redirect(`/listings/${id}`);
// }))