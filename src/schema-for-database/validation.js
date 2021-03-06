const { signUpData, CrudDetails } = require("./Schema_model");
const bcrypt = require("bcrypt");
const e = require("express");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");

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
  const { EmailAddress, Password, Confirm_Password, id, LastName, FirstName } =
    req.body;
  const Sign = new signUpData({
    LastName: LastName,
    EmailAddress: EmailAddress,
    Password: Password,
    Confirm_Password: Confirm_Password,
    id: id,
    FirstName: FirstName,
  });

  const token = await Sign.generateToken().catch((err) => {
    console.log(err);
  });
  // console.log(token);
  await signUpData.findOne({ EmailAddress }).then((EmailAddress) => {
    if (
      EmailAddress === "" ||
      Password === "" ||
      Confirm_Password === "" ||
      FirstName === "" ||
      LastName === ""
    ) {
      res.status(401).json({
        msg: "Enter all input fields ",
      });
    } else if (EmailAddress) {
      res.status(401).json({
        msg: "Email_already_registered",
      });
    } else if (Password !== Confirm_Password) {
      res.status(401).json({
        msg: "Please check the Confirm_Password",
      });
    } else if (!EmailAddress) {
      Sign.save();
      res.status(201).json({
        msg: "Data_Entered_Successfully",
      });
    }
  });
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

const GetCrudDetails = async (req, res) => {
  try {
    const Crud = await CrudDetails.find();
    res.status(202);
    res.send(Crud);
  } catch (error) {
    res.status(401).json({ Msg: "Data not found" });
  }
};
const PostCrudDetails = async (req, res) => {
  const { Email, Name, Phone } = req.body;
  const postCrud = await new CrudDetails({ Email, Name, Phone });
  if (Email === "" || Name === "" || Phone === "") {
    res.status(401).json({ Msg: "Please Enter all data" });
  } else if (Phone === null) {
    res.status(401).json({ Msg: "Phone Number is not valid" });
  } else if (postCrud) {
    postCrud.save();
    res.status(201).json({ Msg: "Data Entered Successfully...." });
  } else {
    res.status(401).json({ Msg: "Technical  issue so Please try later..." });
  }
};

const GetUserDetailById = async(req,res)=>{
  if(CrudDetails) {
    const Dataa =  await CrudDetails.find({_id:req.params._id});
    return res.status(200).json(Dataa);
  } else{
    return res.status(500).json(Dataa);
  }
}
const PutUserDetailById=async(req,res)=>{
  if (CrudDetails) {
    const updated = await CrudDetails.findOneAndUpdate(
      { _id: req.params._id },
      {
        $set: {
          _id: req.body._id,
          id:req.body.id,
          Email: req.body.Email,
          Phone:req.body.Phone,
          Name: req.body.Name,
        },
      },
      { new: true }
      );
      res.status(200).send({msg:updated });
    } else {
      console.log("not able to edit")
      res.status(503).send("Not albe to edit");
    }
}

const deleteUserDetailById=async(req,res)=>{
  if(CrudDetails){
    const deletedata = await CrudDetails.findByIdAndDelete({_id:req.params._id})
    res.status(201);
    res.send({Msg:" Data_Deleted "})
  }else{
    res.status(500);
    res.send({Msg:"Not able to  Delete.."})
  }
}

module.exports = {
  GetSignup,
  PostSignup,
  PostLogin,
  Signout,
  GetCrudDetails,
  PostCrudDetails,
  GetUserDetailById,
  PutUserDetailById,
  deleteUserDetailById,
};
