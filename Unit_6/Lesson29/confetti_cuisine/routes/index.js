"use strict";

const router = require("express").Router();
const userRoutes = require("./userRoutes");
const subscriberRoutes = require("./subscriberRoutes");
const courseRoutes = require("./courseRoutes");
const errorRoutes = require("./errorRoutes");
const homeRoutes = require("./homeRoutes");
const apiRoutes = require("./apiRoutes");

//define namespaces each route module
router.use("/api", apiRoutes);
router.use("/users", userRoutes);
router.use("/subscribers", subscriberRoutes);
router.use("/courses", courseRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);

//export complete router object
module.exports = router;
