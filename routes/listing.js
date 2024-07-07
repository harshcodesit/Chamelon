const express = require("express");
const router = express.Router(); 
const wrapAsync = require("../utils/wrapasync");
const ExpressError = require("../utils/expressErrors.js");
const listing = require("../models/listing");
const passport = require("passport");
const localstrat = require("passport-local");
const { isLogged } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js")
const upload = multer({storage });

  
 //create route
router.get("/new", isLogged , listingController.create);

//index route &&  //new route
router.route("/")
.get(wrapAsync(listingController.index))
.post( upload.single('listing[image]'),wrapAsync(listingController.new))
// .post(upload.single('listing[image]'),(req,res)=>{
//   res.send(req.file)
// });


//show route &&   //update route &&  //delete route
router.route("/:id")
.get( wrapAsync(listingController.show))
.put( isLogged , upload.single('listing[image]'),wrapAsync(listingController.update))
.delete(  isLogged ,wrapAsync(listingController.delete));

//edit route
  router.get("/:id/edit", isLogged , wrapAsync(listingController.edit));
  
 
  

  module.exports = router;