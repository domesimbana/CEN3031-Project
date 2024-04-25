import PostMessage from "../models/postMessage.js";

// Controller function to retrieve all posts
export const getPosts = async (req, res) => {
    try {
        // Retrieve all post messages from the database
        const postMessage = await PostMessage.find();

        // Send retrieved post messages as response
        res.status(200).json(postMessage);
    } catch (error) {
        // Handle error if retrieval fails
        res.status(404).json({ message: error.message });
    }
}

// Controller function to create a new post
export const createPost = async (req, res) => {
    // Extract post data from request body
    const post = req.body;
    // Create a new PostMessage instance with the received data
    const newPost = new PostMessage(post);

    try {
        // Save the new post message to the database
        await newPost.save();

        // Send the newly created post message as response
        res.status(201).json(newPost);
    } catch (error) {
        // Handle error if creation fails due to conflict or other issues
        res.status(409).json({ message: error.message });
    }
}
