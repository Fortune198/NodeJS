const mongoose = require("mongoose");

//Schema creation
const subscriberSchema = mongoose.Schema({
    //Schema properties
    name: String,
    email: String,
    zipCode: Number
  });
  
  module.exports = mongoose.model("Subscriber", subscriberSchema);