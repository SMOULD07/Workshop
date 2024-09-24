const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const suggestionRouter = require("./suggestion/router");

router.use("/suggestion", suggestionRouter);

/* ************************************************************************* */

module.exports = router;
