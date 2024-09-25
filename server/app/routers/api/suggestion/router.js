const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import suggestion-related actions
const { browse, read, add } = require("../../../controllers/suggestionActions");

// Route to get a list of suggestion
router.get("/", browse);

// Route to get a specific suggestion by ID
router.get("/:id", read);

// Route to add a new suggestion
router.post("/", add);

/* ************************************************************************* */

module.exports = router;
