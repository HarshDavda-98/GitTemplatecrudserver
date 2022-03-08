const express = require("express");
const poster = express.Router();
const {
  GetSignup,
  GetLogin,
  PostSignup,
  PostLogin,
  Signout,
} = require("../schema-for-database/validation");

poster.post("/signup/login", PostLogin);
poster.get("/signup/login", GetLogin);

poster.get("/signup", GetSignup);
poster.post("/signup", PostSignup);
poster.delete("/signup/:id", Signout);

module.exports = poster;
