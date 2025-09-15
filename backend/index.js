// backend.js
const express = require("express");
const multer = require('multer');
const path = require('path');
const axios = require("axios");
const cors = require("cors");
// const mongoose = require("mongoose");
const connectDB = require('./db');
const users = require('./routes/users')
const app = express();

const upload = multer({dest: "uploads/"})


// app.set("view engine" , "ejs");
// app.set("views" , path.resolve("./views"));


const usersDetails = require('./routes/userDetailsRoutes');
require("dotenv").config();

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({extended : false}));



const PORT = 5000;
// const dbURI = process.env.MONGODB_URI;
const DEEPGRAM_API_KEY = process.env.API_KEY;
connectDB();

// api/users
app.use( '/api' ,  users);

app.use('/info' ,  usersDetails );



// Check MongoDB URI
// if (!dbURI) {
//   console.error("❌ MongoDB URI not found. Please set MONGODB_URI in your .env file.");
//   process.exit(1); // stop app if DB not configured
// }
// --- Routes ---


app.get("/home", (req, res) => {
  res.json("Hello from home page");
});

app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from Express backend !" });
});

app.post("/api/data", (req, res) => {
  const { name } = req.body;
  res.json({ reply: `Hello, ${name}! Data received.` });
});


app.get("/transcribe", async (req, res) => {
  try {
    if (!DEEPGRAM_API_KEY) {
      return res.status(500).json({ error: "No Deepgram API key found" });
    }

    const response = await axios.post(
      "https://api.deepgram.com/v1/listen?model=nova-3&smart_format=true",
      { url: "https://dpgr.am/spacewalk.wav" }, // audio file URL
      {
        headers: {
          Authorization: `Token ${DEEPGRAM_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Transcription failed by Anish" });
  }
});




app.post("/upload" , upload.single("profileImage") , (req,res)=>{
  console.log(req.body);
  console.log(req.file);

  return res.redirect("/");
} )





// const storage = multer.diskStorage({
//   // `destination` specifies the folder where files will be stored.
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   // `filename` determines the name of the file inside the `uploads/` folder.
//   filename: (req, file, cb) => {
//     // We create a unique filename to avoid overwriting files.
//     // It combines the current timestamp with the original file extension.
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   },
// });

// // 2. Initialize Multer with the storage configuration
// // You can also add other options here, like file filters or size limits.
// const upload = multer({ storage: storage });


// // --- API Route ---


// app.post('/upload', upload.single('myFile'), (req, res) => {
//   // `upload.single('myFile')` is the middleware.
//   // 'myFile' is the field name that the client must use when sending the form data.

//   // If the upload is successful, `req.file` will contain file information.
//   // If there was an error (e.g., no file), Multer handles it, but we can add checks.
//   if (!req.file) {
//     return res.status(400).send({ message: 'Please upload a file.' });
//   }

//   // Send a success response with the file details
//   res.status(200).send({
//     message: 'File uploaded successfully! 🚀',
//     file: req.file, // Contains details like filename, path, size, etc.
//   });
// });












// app.listen(PORT, () => {
//       console.log(`🚀 Backend Server running beautifully by Anish on http://localhost:${PORT} and ${dbURI} and ${DEEPGRAM_API_KEY} `);
// });


// --- DB connection & Server start ---



app.listen(PORT, () => {
      console.log(`🚀 Backend Server running beautifully by Anish on http://localhost:${PORT}`);
    });


// mongoose.connect(dbURI)
//   .then(() => {
//     console.log("✅ Successfully connected to MongoDB!");
//     app.listen(PORT, () => {
//       console.log(`🚀 Backend Server running beautifully by Anish on http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ Failed to connect to MongoDB by anish", err);
//     process.exit(1); // stop app if DB fails
//   });
