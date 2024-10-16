"use strict";

const mongoose = require("mongoose"),
  { Schema } = require("mongoose");

var courseSchema = new Schema(
  {
    title: {//require title and discription
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    },
    maxStudents: {//0 students by default
      type: Number,
      default: 0,
      min: [0, "Course cannot have a negative number of students"]
    },
    cost: {
      type: Number,
      default: 0,//0 cost by default
      min: [0, "Course cannot have a negative cost"]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Course", courseSchema);
