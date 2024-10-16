"use strict";

const router = require("express").Router();
const coursesController = require("../controllers/coursesController");

router.get(
  "/courses",
  coursesController.index,
  coursesController.filterUserCourses,
  coursesController.respondJSON //route for courses data endpoint
);
//route to join course by ID
router.get("/courses/:id/join", coursesController.join, coursesController.respondJSON);
//handles all API errors
router.use(coursesController.errorJSON);

module.exports = router;
