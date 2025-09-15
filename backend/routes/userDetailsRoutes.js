
const express =require('express');
const router = express.Router();

const User = require('../models/userDetailSchema')

// const app = express();

router.post("/api/users", async (req, res) => {
  try {
    const { name, age, weight } = req.body;
    const user = new User({ name, age, weight });
    await user.save();

    res.json({ message: " User saved successfully", user });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
