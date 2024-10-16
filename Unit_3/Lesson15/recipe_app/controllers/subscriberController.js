const Subscriber = require('../models/subscriber');

exports.getAllSubscribers = (req, res) => {
    Subscriber.find({})
        .exec()
        .then((subscribers) => {
            res.render("subscribers", {
                subscribers: subscribers
            });
        })
        .catch((error) => {
            console.log(error.message);
            return [];
        })
        .then(() => {
            console.log("Promise Complete")
        });
};

exports.getSubscriptionPage = (req, res) => {
    res.render("contact");
};

exports.saveSubscriber = (req, res) => {
    let newSubscriber = new Subscriber({
        name: req.body.name,
        email: req.body.email,
        zipCode: req.body.zipCode
    });
    newSubscriber.save()
        .then((result) => {
            res.render("thanks");
        })
        .catch((error) => {
            res.send(error);
        });
};






// const Subscriber = require("./models/subscriber");


// exports.getAllSubscribers = (req, res, next) => {
//     Subscriber.find({}, (error, subscribers) => {
//         if (error) next(error);
//         req.data = subscribers;
//         next();
//     });
// };

//Callback
// exports.getAllSubscribers = (req, res, next) => {
//     Subscriber.find({})
//         .then(subscribers => {
//             req.data = subscribers;
//             next();
//         })
//         .catch(error => next(error));
// };