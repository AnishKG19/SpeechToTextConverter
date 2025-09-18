// backend.js
const express = require("express");
const multer = require('multer');
const path = require('path');
const axios = require("axios");
const cors = require("cors");
const fetch = require('node-fetch');
const fs = require('fs/promises');
const cookieParser = require("cookie-parser");
const {restrictToLoggedInUserOnly} = require("./middlewares/user")



const session = require("express-session");


const connectDB = require('./db');
const users = require('./routes/users')
const SignupRoutes = require('./routes/signup');
const app = express();

const upload = multer();


const usersDetails = require('./routes/userDetailsRoutes');
require("dotenv").config();

app.use(
  session({
    secret: "mySecretKey", // should be a long random string in production
    resave: false,         // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hour
      httpOnly: true,
      secure: false,          // set true if using HTTPS
    },
  })
);


app.use(cookieParser());

app.use(express.json());


const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true, 
};

app.use(cors(corsOptions));


const PORT = 5000;

const DEEPGRAM_API_KEY = process.env.API_KEY;
connectDB();


app.use( '/api' ,  users);

app.use('/info' ,  usersDetails );

app.use('/entry'  , SignupRoutes);



app.post('/synthesize', async (req, res) => {
    try {
        // 1. Get the text from the request body
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ error: 'Request body must contain "text" to synthesize.' });
        }

        // 2. Retrieve the API Key from environment variables
       
        if (!DEEPGRAM_API_KEY) {
            console.error('DEEPGRAM_API_KEY is not set.');
            return res.status(500).json({ error: 'Server configuration error: API key is missing.' });
        }
        
        // 3. Prepare the request to Deepgram's API
        
        const url = 'https://api.deepgram.com/v1/speak?model=aura-2-thalia-en';
        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Token ${DEEPGRAM_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        };
        
        // 4. Make the API call
        console.log('Sending request to Deepgram...');
        const deepgramResponse = await fetch(url, options);

        if (!deepgramResponse.ok) {
            const errorDetails = await deepgramResponse.text();
            console.error(`Deepgram API Error: ${deepgramResponse.status}`, errorDetails);
            return res.status(deepgramResponse.status).json({
                error: 'Failed to synthesize speech.',
                details: errorDetails,
            });
        }
        
        console.log('Successfully received audio data from Deepgram.');
        
        // 5. Get the audio data and save it to a file
        const audioBuffer = await deepgramResponse.buffer();

        const audioDir = path.join(__dirname, 'audio file');
        const outputFileName = `speech_${Date.now()}.mp3`;
        const outputPath = path.join(audioDir, outputFileName);

        await fs.mkdir(audioDir, { recursive: true })
        await fs.writeFile(outputPath, audioBuffer);
        
        console.log(`Audio file saved to: ${outputPath}`);

        // 6. Send a success response back to the client
        res.status(200).json({
            message: 'Audio file created successfully.',
            fileName: outputFileName,
        });

    } catch (error) {
        console.error('An unexpected error occurred:', error);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
});





app.post("/upload" , upload.single("profileImage") , (req,res)=>{
  
  const {name1 } = req.body;

  console.log(name1);
  console.log("multer done");
  console.log(req.body);
  console.log(req.file);

  return res.redirect("/");
} )




app.listen(PORT, () => {
      console.log(`🚀 Backend Server running beautifully by Anish on http://localhost:${PORT}`);
    });

