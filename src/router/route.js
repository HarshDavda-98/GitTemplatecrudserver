const express = require("express");
const poster = express.Router();
const {
  GetSignup,
  PostSignup,
  PostLogin,
  Signout,
  GetCrudDetails,
  PostCrudDetails,
  GetUserDetailById,
  PutUserDetailById,
  deleteUserDetailById,
} = require("../schema-for-database/validation");

poster.post("/signup", PostSignup);
poster.post("/signup/login", PostLogin);

poster.get("/signup", GetSignup);
poster.delete("/signup/:id", Signout);

poster.get('/signup/CrudDetails',GetCrudDetails);
poster.post('/signup/CrudDetails',PostCrudDetails);

poster.get('/signup/CrudDetails/:_id',GetUserDetailById);
poster.delete('/signup/CrudDetails/:_id',deleteUserDetailById);
poster.put('/signup/CrudDetails/:_id',PutUserDetailById);
module.exports = poster;
