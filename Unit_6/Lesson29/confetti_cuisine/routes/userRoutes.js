"use strict";

const router = require("express").Router();
const usersController = require("../controllers/usersController");

//define user routes 
router.get("/", usersController.index, usersController.indexView);
router.get("/new", usersController.new);
router.post(
    "/create",
    usersController.validate,
    usersController.create,
    usersController.redirectView
);
router.get("/login", usersController.login);
router.post("/login", usersController.authenticate);
router.get("/logout", usersController.logout, usersController.redirectView);
router.get("/:id/edit", usersController.edit);
router.put("/:id/update", usersController.update, usersController.redirectView);
router.get("/:id", usersController.show, usersController.showView);
router.delete("/:id/delete", usersController.delete, usersController.redirectView);

//export router object from module
module.exports = router;
