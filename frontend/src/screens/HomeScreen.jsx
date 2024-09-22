import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  useFetchPostsQuery,
  useCreatePostMutation,
} from "../slices/postApiSlice";
import PostItem from "../components/PostItem";

const HomeScreen = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const {
    data: posts = [],
    error,
    isLoading,
  } = useFetchPostsQuery(userInfo._id); // Pass user ID
  const [createPost] = useCreatePostMutation();

  // State for new post input
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (title && content) {
      await createPost({ title, content });
      setTitle(""); // Clear the title input
      setContent(""); // Clear the content input
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Welcome to the Home Screen</h1>
      {userInfo ? (
        <div>
          <form onSubmit={handleCreatePost} className="mb-4">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mt-2">
              Create Post
            </button>
          </form>
          <h2>Your Posts</h2>
          <ul className="list-group">
            {posts.length > 0 ? (
              posts.map((post) => <PostItem key={post._id} post={post} />)
            ) : (
              <li>No posts available.</li>
            )}
          </ul>
        </div>
      ) : (
        <p>Please log in to create posts.</p>
      )}
    </div>
  );
};

export default HomeScreen;
