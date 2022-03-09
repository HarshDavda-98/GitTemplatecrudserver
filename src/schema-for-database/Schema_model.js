const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const uniqueValidator = require('mongoose-unique-validator');
const res = require('express/lib/response');
const Signup = mongoose.Schema({
    id:{
        type:Number,
    },
    EmailAddress:{
        type:String,
        unique: true,
    },
     
     FirstName:{
        type:String,
    },
     LastName:{
        type:String,
    },
    Password:{
        type:String,
    },
    Confirm_Password:{
        type:String,
    },
    tokens:[{
        token:{
            type:String,
        }
    }]
});
const CrudData = new mongoose.Schema({
    Name:{
        type:String,
    },
    Email:{
        type:String,
    },
    Phone:{
        type:Number,
    }
}) 

Signup.methods.generateToken = async function(){
try {
    const token =jwt.sign({_id:this._id.toString()},"mynameisharshdavdasoftwaredeveloper");
    this.tokens=this.tokens.concat({token} )
    return token;
} catch (error) {
    res.send("the error part:"+ error);
    console.log("the error part:"+ error);
}
}
Signup.plugin(uniqueValidator, { message: 'Email already in use!' });
const signUpData = mongoose.model("signUpData",Signup);
const CrudDetails = mongoose.model("CrudDetails",CrudData);
module.exports = {signUpData,CrudDetails};