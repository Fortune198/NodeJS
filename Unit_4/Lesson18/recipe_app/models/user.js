const mongoose = require("mongoose");

//feature of mongoose hence in square brackets
const { Schema } = mongoose;

const userSchema = new Schema({

    name: {
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
    zipCode: {//should 5 digits long
        type: Number,
        min: [1000, "Zip code too short"],
        max: 99999
    },
    password: {
        type: String,
        required: true
    },
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    subscribedAccount: {
        type: Schema.Types.ObjectId,
        ref: "Subscriber"
    }
},
    {//keep track of when doc was created and/or updated
        timestamps: true
    }
);

//returns full name (first and last)
userSchema.virtual("fullName").get(function () {
    return `${this.name.first} ${this.name.last}`;
});
module.exports = mongoose.model("User", userSchema);
