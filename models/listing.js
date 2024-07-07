const mongoose  = require("mongoose");
const schema = mongoose.Schema;
const Review = require("./review.js");

const listingschema = new schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    image: {
       url: String,
       fileName: String
    
    },
    price : {
        type : Number
    },
    location : {
        type : String
    },
    country : {
        type : String
    },
    reviews : [
        {
            type: schema.Types.ObjectId,
            ref : "Review"
        }
    ],
    owner:{
        type: schema.Types.ObjectId,
        ref : "User"
    }
});

listingschema.post("findOneAndDelete", async (listing)=>{
    if(listing){
    await Review.deleteMany({_id : {$in  : listing.reviews}})
}
});

const listing = mongoose.model("Listing", listingschema);
module.exports = listing;