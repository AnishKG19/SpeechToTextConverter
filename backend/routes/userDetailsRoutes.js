
const express =require('express');
const router = express.Router();

const User = require('../models/userDetailSchema')

const multer = require('multer');


const storage = multer.diskStorage({
    destination : (req,file, cb) =>{
        cb(null , 'uploadsani/')
    } , 
    
    filename : (req,file, cb )=>{
        const suffix = Date.now();
        cb(null , suffix+'-'+file.originalname);

    }
})

const upload = multer({storage})

// const app = express();

router.post("/api/users", upload.single('photo') ,   async (req, res) => {
  try {

    const photopath= req.file ? req.file.path : null ; 
    
    const {
      name, age, weight ,
       
      
    } = req.body;

    const user = new User({ name, age, weight , photo : photopath });
    await user.save();


    console.log("heeee");
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
