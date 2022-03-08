const { signUpData } = require("./Schema_model");
const bcrypt = require("bcrypt");
const e = require("express");
const jwt = require("jsonwebtoken");

const GetSignup = async (req, res) => {
  try {
    const signup = await signUpData.find();
    res.status(202);
    res.send(signup);
  } catch (error) {
    res.send(error);
    res.status(501);
  }
};

const PostSignup = async (req, res) => {
  const {EmailAddress,Password,Confirm_Password,id,LastName,FirstName} = req.body;
  const Sign = new signUpData({LastName: LastName,EmailAddress: EmailAddress,Password: Password,Confirm_Password: Confirm_Password,id: id,FirstName: FirstName,});
  
  const token = await Sign.generateToken().catch((err)=>{console.log(err)});
  // console.log(token); 
    await signUpData.findOne({ EmailAddress}).then((EmailAddress) => {
   if(EmailAddress ===""||Password===""||Confirm_Password===""||FirstName===""||LastName===""){
        res.status(401).json({
          msg:"Enter all input fields "
        })
   }else if (EmailAddress) {
      res.status(401).json({
        msg: "Email_already_registered",
      })
    }else if(Password !==Confirm_Password){
      res.status(401).json({
        msg:"Please check the Confirm_Password"
      })
    } 
    else if (!EmailAddress) {
      Sign.save();
      res.status(201).json({
        msg: "Data_Entered_Successfully",
      });
    }
  });
  // console.log(token);
};
const GetLogin = (req, res) => {
  res.send("Get the logins");
};
const PostLogin = async (req, res) => {
  const { EmailAddress, Password } = req.body;
  const LogIn = await signUpData.findOne({ EmailAddress: EmailAddress });
  if (!LogIn) {
    res.status(401).send({ msg: "Account Does Not Exists" });
  } else if (LogIn.Confirm_Password !== Password) {
    res.status(401).json({ msg: "Enter valid Password" });
  } else {
    res.status(201).json({ msg: "Successs" });
  }
};
const Signout = async (req, res) => {
  if (signUpData) {
    let signout = await signUpData.findOneAndDelete(req.params.id);
    res.status(201).json({ msg: "success", signout });
  }
};
module.exports = { GetSignup, PostSignup, PostLogin, GetLogin, Signout };
