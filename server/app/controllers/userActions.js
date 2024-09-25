/* eslint-disable no-console */
/* eslint-disable camelcase */
const jwt = require("jsonwebtoken");
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const user = await tables.utilisateur.readAll();

    // Respond with the items in JSON format
    res.json(user);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const user = await tables.utilisateur.read(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the item data from the request body
  const user = req.body;
  console.log("Données utilisateur reçues :", user);

  try {
    // Insert the item into the database
    const insertId = await tables.utilisateur.create(user);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await tables.utilisateur.isUserExist(req.body);
    if (user === null) {
      res.status(422);
      return;
    }

    if (user.Mdp === req.body.Mdp) {
      delete user.Mdp;
    }
    const token = await jwt.sign(
      { sub: user.ID_utilisateur, role: user.Role },
      process.env.APP_SECRET,
      {
        expiresIn: "1h",
      }
    );

    delete user.Mdp;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "Lax",
        maxAge: 36000000,
      })
      .json({ user });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const logout = (req, res) => {
  res.clearCookie("access_token").sendStatus(200);
};

const destroy = async (req, res, next) => {
  // Extract the user id from the request body
  const { ID_utilisateur } = req.body;
  try {
    // Delete the news from the database
    const deletedProfil = await tables.utilisateur.delete(ID_utilisateur);
    // Respond with HTTP 200 (OK) and the response data
    res.status(200).json({ deletedProfil });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit = async (req, res, next) => {
  // Extract the item data from the request body
  const news = req.body;
  try {
    // Update the item into the database
    const updatedProfil = await tables.utilisateur.update(news);
    // Respond with HTTP 201 (OK) and the response data
    res.status(200).json({ updatedProfil });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

module.exports = {
  browse,
  read,
  login,
  logout,
  destroy,
  edit,
  add,
};
