const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import user-related actions
const {
  browse,
  read,
  add,
  login,
  logout,
  edit,
  destroy,
} = require("../../../controllers/userActions");

// Route to get a list of user
router.get("/", browse);

// Route to connect/disdonnect a member

router.post("/login", login);

router.get("/logout", logout);

// Route to delete a user
router.delete("/delete", destroy);

// Route to edit a user
router.patch("/edit", edit);

// Route to get a specific user by ID
router.get("/:id", read);

// Route to add a new user
router.post("/registration", add);

/* ************************************************************************* */

module.exports = router;
