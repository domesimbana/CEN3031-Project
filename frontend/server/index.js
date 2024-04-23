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
import fs from 'fs';
import {mkdirp} from 'mkdirp';

//app.use('/posts', postRoutes);

const clientID = '524790173843-7igv57lb328dc9pqi5robpa3kq1pja7o.apps.googleusercontent.com';
const clientSecret = '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';

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use('/posts', express.static("files"));

// setup session
app.use(session({
    secret: "Mt22507868",
    resave: false,
    saveUninitialized: true
}))

// setup passport
app.use(passport.initialize());
app.use(passport.session());

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
    }
    )
)

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
});

//initial google auth login
app.get("/auth/google", passport.authenticate("google", {scope:["profile", "email"]}))

app.get("/auth/google/callback", passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/home',
    failureRedirect: 'http://localhost:3000/login'
}))

app.get('/login/success', async(req, res) => {
    console.log("req", req.user);
    
    if(req.user) {
        res.status(200).json({message: "user Login", user:req.user})
    } else {
        res.status(400).json({message: "Not Authorized"})
    }
}) 

app.get('/logout', (req,res,next) => {
    req.logout(function(err) {
        if (err){return next(err)};
        res.redirect("http://localhost:3000/login");
    })
})

// apis
// app.get('/', async (req, res) => {
//     res.status(200).json("server start");
// }) ;

// Connect to the database mongodb+srv://group113:TXz9ve2xGMZRnYap@cenproject.bap9cnf.mongodb.net/
const CONNECTION_URL = 'mongodb://0.0.0.0:27017'
const PORT = process.env.PORT || 4000;

mongoose.connect(CONNECTION_URL, {})
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log("MongoDB did not connect correct"));


//https://www.mongodb.com/cloud/atlas

// multer: handling multipart/form-data, which is primarily used for uploading files.

//The files were not being uploaded due to the directory /files not working properly 
const directory = './files';
// Ensure the directory exists, create it if it doesn't
try {
    mkdirp.sync(directory);
    console.log('Directory created successfully');
  } catch (err) {
    console.error('Error creating directory:', err);
  }
  
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, directory);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now();
      cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
  });
  
const postMessage = mongoose.model("PostMessage");
const upload = multer({ storage: storage })


app.post('/posts', upload.single('file'), async(req, res) => {
    console.log(req.file);
    const title = req.body.title;
    const fileName = req.file.filename;
    try {
        console.log("Creating Post Message");
        await PostMessage.create({
            title: title,
            file: fileName,
            
        })
        console.log(title,fileName);
        res.send({status: "ok"});
    } catch (error) {
        console.log("No posts made");
        res.json({status: error.response.data});
    } 
});

app.get("/get-files", async(req, res) => {
    try {
        PostMessage.find({}).then((data) => {
            res.send({status: "ok", data: data});
        });
    } catch(error) {
        console.log("We can't get files");
    }
});

