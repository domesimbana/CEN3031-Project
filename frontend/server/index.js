// Import necessary modules and packages
import { config } from 'dotenv';
import express from 'express';
const app = express();
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import session from 'express-session';
import passport from 'passport';
import { Strategy as OAuth2Strategy } from 'passport-google-oauth2';
import PostMessage from './models/postMessage.js';
import { mkdirp } from 'mkdirp';
import { exec } from 'child_process';

// Define Google OAuth credentials
const clientID = '524790173843-7igv57lb328dc9pqi5robpa3kq1pja7o.apps.googleusercontent.com';
const clientSecret = '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';

// Enable CORS with specific configurations
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// Serve static files from 'files' directory
app.use("/files", express.static("files"));

// Parse JSON bodies
app.use(express.json());

// Setup session middleware
app.use(session({
    secret: "Mt22507868",
    resave: false,
    saveUninitialized: true
}));

// Initialize Passport and restore authentication state from session
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport Google OAuth2 Strategy
passport.use(
    new OAuth2Strategy({ 
        clientID: clientID,
        clientSecret: clientSecret,
        callbackURL: '/auth/google/callback',
        scope: ['profile', 'email']
    }, 
    async(accessToken, refreshToken, profile, done) => {
        console.log("profile", profile);
        try {
            let user = await PostMessage.findOne({googleId:profile.id});
            if(!user) {
                user = new PostMessage({
                    googleId: profile.id,
                    displayName: profile.displayName,
                    email: profile.emails[0].value,
                    image: profile.photos[0].value
                });

                await user.save();
            }
            return done(null, user)
        } catch(error) {
            return done(error.response.data, null)
        }
    })
);

// Serialize user into the session
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize user from the session
passport.deserializeUser((user, done) => {
    done(null, user);
});

// Redirect to Google OAuth login
app.get("/auth/google", passport.authenticate("google", {scope:["profile", "email"]}));

// Callback route for Google OAuth
app.get("/auth/google/callback", passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/home',
    failureRedirect: 'http://localhost:3000/login'
}));

// Route for successful login
app.get('/login/success', async(req, res) => {
    console.log("req", req.user);
    
    if(req.user) {
        res.status(200).json({message: "user Login", user:req.user})
    } else {
        res.status(400).json({message: "Not Authorized"})
    }
});

// Route for logout
app.get('/logout', (req,res,next) => {
    req.logout(function(err) {
        if (err){return next(err)};
        res.redirect("http://localhost:3000/login");
    })
});

// MongoDB connection URL and port
const CONNECTION_URL = 'mongodb://0.0.0.0:27017/';
const PORT = process.env.PORT || 4000;

// Connect to MongoDB and start server
mongoose.connect(CONNECTION_URL, {})
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log("MongoDB did not connect correct"));

// Ensure 'files' directory exists
const directory = './files';
try {
    mkdirp.sync(directory);
    console.log('Directory created successfully');
} catch (err) {
    console.error('Error creating directory:', err);
}

// Multer configuration for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, directory);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now();
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
});

// Create multer instance with storage configuration
const upload = multer({ storage: storage });

// Route for uploading posts with files
app.post('/posts', upload.single('file'), async(req, res) => {
    console.log(req.file);
    const title = req.body.title;
    const fileName = req.file.filename;
    try {
        console.log("Creating Post Message");
        await PostMessage.create({
            title: title,
            file: fileName,
        });
        console.log(title, fileName);
        res.send({status: "ok"});
    } catch (error) {
        console.log("No posts made");
        res.json({status: error.response.data});
    } 
});

// Route for fetching files
app.get("/get-files", async(req, res) => {
    try {
        PostMessage.find({}).then((data) => {
            res.send({status: "ok", data: data});
        });
    } catch(error) {
        console.log("We can't get files");
    }
});

// Route for extracting text from PDF
app.post('/extract-text', (req, res) => {
    const { pdfPath } = req.body;
    console.log("Trying to access this PDF: " + pdfPath);
    exec(`python pdfParser.py ${pdfPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        console.log(`stdout: ${stdout}`);
        if(stderr){
            console.error(`stderr: ${stderr}`);
        }
        res.json({ text: stdout });
    });
});
