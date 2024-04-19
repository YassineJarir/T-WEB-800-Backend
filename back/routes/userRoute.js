var express = require('express');
var router = express.Router();
var user_controller = require("../src/controllers/userController");

// routes

//Get all users
router.get("/", user_controller.getAll);

// Get a single user by ID
router.get("/profile/:id", user_controller.getById);

// Update a user by ID
router.put("/profile/:id", user_controller.update);

// Delete a user by ID
router.delete("/profile/:id", user_controller.delete);

module.exports = router;