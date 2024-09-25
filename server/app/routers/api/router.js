const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const suggestionRouter = require("./suggestion/router");

router.use("/suggestion", suggestionRouter);

const userRouter = require("./user/router");

router.use("/user", userRouter);

/* ************************************************************************* */

module.exports = router;
