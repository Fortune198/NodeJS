

const mongoose = require("mongoose");

//Schema creation
const courseSchema = new mongoose.Schema({
    //schema properties
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    items: [],
    zipCode: {
        type: Number,
        min: [10000, "Zip code must be 5 digits"],
        max: 99999//zipCode must be five digits
    }
});
module.exports = mongoose.model("Course", courseSchema);