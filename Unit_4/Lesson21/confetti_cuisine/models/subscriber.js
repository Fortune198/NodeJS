"use strict";

const mongoose = require("mongoose"),//require mongoose
  { Schema } = mongoose;

var subscriberSchema = new Schema(
  {//we add schema properties
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true
    },
    zipCode: {
      type: Number,
      min: [10000, "Zip code too short"],
      max: 99999
    },
    courses: [
      {//associate multiple courses
        type: Schema.Types.ObjectId,
        ref: "Course"
      }
    ]
  },
  {
    timestamps: true
  }
);
//add a getInfo instance method
subscriberSchema.methods.getInfo = function() {
  return `Name: ${this.name} Email: ${this.email} Zip Code: ${this.zipCode}`;
};
//export subscriber model
module.exports = mongoose.model("Subscriber", subscriberSchema);
