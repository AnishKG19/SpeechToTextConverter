const express = require('express');
const router = express.Router();
const {restrictToLoggedInUserOnly} = require("../middlewares/user")

const {handleUserSignup , handleUserLogin } = require('../controllers/user');

// const Login = require("../models/Login");

router.post("/signup" , handleUserSignup);


router.post("/login" , handleUserLogin);

// router.post("/login" , async (req , res) => {

//     try{
//         const { name ,  emailId , password} = req.body;

//         const newLogin = new Login({emailId, password});

//         await newLogin.save();

//         res.status(200).json({success:true , 
//             message : "New Login Created"
//         })




//     }catch(error){
//         res.status(500).json({
//             success:false,
//             message : error.message
//         })
//     }

// })

module.exports =router;