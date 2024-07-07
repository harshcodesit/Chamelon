const listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


module.exports.index = async (req,res)=>{
    const allisting = await listing.find({});
    res.render("listing.ejs", {allisting});
    };

module.exports.create = (req,res)=>{
    res.render("new.ejs");
    };
    
module.exports.show = async (req,res)=>{
    let {id}= req.params;
    const onesdata = await listing.findById(id).populate({path : "reviews",populate: { path:"author"}}).populate("owner");
    
    if(!onesdata){
      req.flash("error","No such listing found");
      res.redirect("/listings")
    }
    res.render("show.ejs", {onesdata});
  };
  
  module.exports.new = async (req,res)=>{
    let response = await geocodingClient.forwardGeocode({
      query: req.body.listing.location,
      limit: 1
    })
      .send();

      console.log(response.body.features[0].geometry);
      res.send("done");

    let url = req.file.path;
    let fileName = req.file.fileName;
    let newlisting = new listing(req.body.listing);
    newlisting.owner = req.user._id;
    newlisting.image = {url,fileName};
    await newlisting.save();
    req.flash("success","Listing added successfully");
    res.redirect("/listings")
  };

  module.exports.edit = async (req,res)=>{
    let {id}= req.params;
    const onesdata = await listing.findById(id);
    let original = onesdata.image.url;
    original = original.replace("/upload","/upload/w_250");
    res.render("edit.ejs", {onesdata,original});
  };

  module.exports.update = async(req,res)=>{
    let {id}= req.params;
    
   let Listing = await listing.findByIdAndUpdate(id, {...req.body.listing});

   if(typeof req.file !== "undefined"){
   let url = req.file.path;
    let fileName = req.file.fileName;
    Listing.image = {url  ,fileName};
    await Listing.save();
  }
    req.flash("success","updated successfully");
    res.redirect(`/listings/${id}`)
  };

  module.exports.delete = async (req,res)=>{
    let {id}= req.params;
    let hello = await listing.findByIdAndDelete(id);
    req.flash("success","Listing deleted successfully");
    res.redirect("/listings");
  };
