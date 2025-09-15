const express = require('express')
const router = express.Router();

const User = require('../models/userModel');

// Routes 

// CRUD Operations 

// View/Read

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

// Create 

router.post('/users', async (req, res) => {
    try {

        console.log("save is working")
        const { name, age, weight } = req.body;
        const newUser = new User({ name, age, weight });
        await newUser.save();
        res.status(200).json({
            success: true, user: newUser
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }


})

// update 

router.put('/users/:id', async (req, res) => {


    const { id } = req.params;
    const { name, age, weight } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, { name, age, weight });

        if (!updatedUser) {
            res.json({
                message: "User not found"
            })

        }

        res.status(200).json({
            success: true,
            user: updatedUser
        })


    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})


router.delete('/users/:id', async (req, res) => {

    console.log("in delete section")
    const { id } = req.params;

    try{
        const deleteUser = await User.findByIdAndDelete(id);

        if (!deleteUser) {
            res.json({
                message: "User not found"
            })
        }

        // if user found 

        res.status(200).json({
            success: true,
            user:deleteUser
        })

    }catch (err) {
    res.status(500).json({
        success: false,
        message: err.message
    })
    }
})




module.exports = router;
