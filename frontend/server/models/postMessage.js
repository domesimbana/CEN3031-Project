import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    googleId: String,
    displayName: String,
    email: String,
    image: String,
    title: String,
    questions: [String],
    answers: [String],
    content: String,
    file: String,
    language: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
}, {collection: "postSchema"});

const PostMessage = new mongoose.model('PostMessage', postSchema);

export default PostMessage;