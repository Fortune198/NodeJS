"use strict";

const mongoose = require("mongoose"),
  { Schema } = require("mongoose"),
  Subscriber = require("./subscriber");

let userSchema = new Schema(
  {
    name: {//add first and last name attributes
      first: {
        type: String,
        trim: true
      },
      last: {
        type: String,
        trim: true
      }
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true
    },
    zipCode: {
      type: Number,
      min: [1000, "Zip code too short"],
      max: 99999
    },
    password: {//require password
      type: String,
      required: true
    },
    subscribedAccount: { type: Schema.Types.ObjectId, ref: "Subscriber" },
    courses: [
      { type: Schema.Types.ObjectId, 
      ref: "Course" }]//associate users with multiple courses
  },
  {//add timestamps property
    timestamps: true
  }
);
//add fullName virtual attribute 
userSchema.virtual("fullName").get(function() {
  return `${this.name.first} ${this.name.last}`;
});

userSchema.pre("save", function(next) {
  let user = this;
  //check for a linked subscribedAcc
  if (user.subscribedAccount === undefined) {
    Subscriber.findOne({
      email: user.email
    })//search subscriber models for documents with user's email
      .then(subscriber => {
        user.subscribedAccount = subscriber;
        next();//call next middleware
      })
      .catch(error => {
        console.log(`Error in connecting subscriber: ${error.message}`);
        next(error);
      });
  } else {
    next();
  }
});

module.exports = mongoose.model("User", userSchema);
