const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt=require("jsonwebtoken");
const express=require("express");
const cors=require("cors")
const app=express()

// crypt.js
//Register

router.post("/register", async (req, res) => {

  console.log(req.body.username , req.body.email,req.body.password)
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC), // encrupting
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } 
  catch (e) {
    res.status(500).json(e);
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    console.log(" nbiu")

    const user = await User.findOne({ username: req.body.username });

    !user && res.status(500).json("Wrong credentials");

    const hashPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );  // decrypting

   const  Originalpassword = hashPassword.toString(CryptoJS.enc.Utf8); // making it usbale

     Originalpassword !== req.body.password && res.status(401).json("Wrong credentials");


     const accessToken= jwt.sign({

        id:user.id,
        isAdmin:user.isAdmin,

     }, process.env.JWT_SEC,

     {expiresIn:"3d"}
     )
const {password,...others}=user._doc;  // separating pasword fiend from user because sending password with othger
                                     // field is not good and everyting we nee is in user._doc object

console.log(accessToken)                                     
    res.status(200).json({...others,accessToken});


  } catch(e) {
    res.status(500).json(e);
  }
});

module.exports = router;
