// Import the Post model
import Post from "../models/postModel.js"; // Use ES module import

// Controller for creating a new post
const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Create a new post with the logged-in user's ID
    const newPost = new Post({
      title,
      content,
      user: req.user._id, // Assuming `req.user` contains the authenticated user's info
    });

    // Save the post to the database
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res
      .status(500)
      .json({ message: "Error creating post", error: error.message });
  }
};

// Controller for fetching all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user._id }).populate(
      "user",
      "name"
    );
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res
      .status(500)
      .json({ message: "Error fetching posts", error: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the user is the owner of the post
    if (!post || post.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You do not have access to this post" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res
      .status(500)
      .json({ message: "Error fetching post", error: error.message });
  }
};

// Controller for updating a post
const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user is the owner of the post
    if (post.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "User not authorized to update this post" });
    }

    // Update post fields
    post.title = title || post.title;
    post.content = content || post.content;

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res
      .status(500)
      .json({ message: "Error updating post", error: error.message });
  }
};

// Controller for deleting a post
const deletePost = async (req, res) => {
  console.log("Delete request received for post ID:", req.params.id); // Log the request
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      console.log("Post not found");
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user is the owner of the post
    if (post.user.toString() !== req.user._id.toString()) {
      console.log("User not authorized to delete this post");
      return res
        .status(403)
        .json({ message: "User not authorized to delete this post" });
    }

    await Post.findByIdAndDelete(req.params.id); // Use findByIdAndDelete instead of post.remove
    console.log("Post deleted successfully");
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error); // Log the error
    res
      .status(500)
      .json({ message: "Error deleting post", error: error.message }); // Send error message
  }
};

// Export the controllers using ES module syntax
export { createPost, getAllPosts, getPostById, updatePost, deletePost };
