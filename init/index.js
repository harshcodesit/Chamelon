const mongoose = require("mongoose");

const initdata = require("./data.js");
const listing =  require("../models/listing.js");
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wonder');};





const initdb = async()=>{
    await listing.deleteMany({});
    initdata.data = initdata.data.map((obj)=>({...obj, owner: "6590f850f99ad5fa06132c40"}))
    await listing.insertMany(initdata.data);
    console.log("data was initialized")
}

initdb();