const mongoose = require("mongoose");
const Subscriber = require("./models/subscriber");
let testCourse, testSubscriber;
let targetSubscriber;
const Course = require("./models/course")

//connection
mongoose.connect(
    "mongodb://0.0.0.0:27017/recipe_db",
    { useNewUrlParser: true }
);

//using promises as we did in main.js
mongoose.Promise = global.Promise;



Subscriber.create({
    name: "Jon",
    email: "jon@jonwexler.com",
    zipCode: "12345"
})
    .then(subscriber => console.log(subscriber))
    .catch(error => console.log(error.message));
let subscriber;
Subscriber.findOne({
    name: "Jon"
}).then(result => {
    subscriber = result;
    console.log(subscriber.getInfo());
});



//-----------------------Courses-----------------------------//

const Course = require("./models/course");
//const Subscriber = require("./models/subscriber");


//create course
Course.create({
    title: "Tomato Land",
    description: "Locally farmed tomatoes only",
    zipCode: 12345,
    items: ["cherry", "heirloom"]
}).then(course => testCourse = course);

//find subscriber
Subscriber.findOne({}).then(
    subscriber => testSubscriber = subscriber
);

//add course's id to subscriber
testSubscriber.courses.push(testCourse._id);

//save subscriber
testSubscriber.save();

//populate subscriber's course array with the courses they're enrolled in
Subscriber.populate(testSubscriber, "courses").then(subscriber =>
    console.log(subscriber)
);
//------------user------------//

const mongoose = require("mongoose");
const User = require("./models/user")
const Subscriber = require("./models/subscriber");
let testUser;

mongoose.connect(
    "mongodb://0.0.0.0:27017/recipe_db",
    { useNewUrlParser: true }
);

//creating user

User.create({
    name: {
        first: "Jon",
        last: "Wexler"
    },
    email: "jon@jonwexler.com",
    password: "pass123"
})
    .then(user => testUser = user)
    .catch(error => console.log(error.message));



//connecting user to theirsubscription
//user will be a subscriber as well



Subscriber.findOne({
    email: testUser.email
})
.then(subscriber => targetSubscriber = subscriber);

User.create({
    name: {
        first: "Jon",
        last: "Wexler "
    },
    email: "jon@jonwexler.com",
    password: "pass123"
})
    .then(user => {
        testUser = user;
        return Subscriber.findOne({
            email: user.email
        });
    })
    .then(subscriber => {
        testUser.subscribedAccount = subscriber;
        testUser.save().then(user => console.log("user updated"));
    })
    .catch(error => console.log(error.message));


