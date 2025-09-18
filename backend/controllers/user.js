
const User = require('../models/Signup')
const { v4: uuidv4 } = require('uuid')


const { SetUser } = require("../service/auth")


const handleUserSignup = async (req, res) => {
    try {
        const { name, emailId, password } = req.body;

        const newLogin = new User({ emailId, password, name });

        await newLogin.save();

        return res.status(200).json({
            success: true,
            message: "New Signup Created"
        })
    } catch (error) {
       return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}



const handleUserLogin = async (req, res) => {
    try {
        const { emailId, password } = req.body;

        // const newLogin = new User({emailId, password , name});

        // await newLogin.save();
        const loggedInUser = await User.findOne({ emailId, password });

        // console.log(loggedInUser)
        // console.log("anish");
        if (!loggedInUser) {
            return res.status(400).json({
                success: false,
                message: "No User Found",
                error: "Invalid Username or Password"
            })
        }

        // const sessionId = uuidv4();

        // SetUser(sessionId, loggedInUser);

        //   res.cookie("uid" , sessionId);

        // res.cookie("uid", sessionId, {
        //     httpOnly: true, // Prevents client-side JS from accessing the cookie
        //     // secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
        //     sameSite: "none", // Necessary for cross-site cookies
        // });


        // console.log(sessionId);

        req.session.isAuthenticated = true;
        
        
        console.log("anish");
        console.log(req);
        console.log("anish");

        return res.status(200).json({
            success: true,
            message: "New Login Created and User found"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}




module.exports = { handleUserSignup, handleUserLogin }