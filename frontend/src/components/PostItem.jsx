import React, { useState } from "react";
import {
  useDeletePostMutation,
  useUpdatePostMutation,
} from "../slices/postApiSlice";

const PostItem = ({ post, refreshPosts }) => {
  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(post.title);
  const [newContent, setNewContent] = useState(post.content);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      await deletePost(post._id).unwrap();
      refreshPosts(); // Call to refresh posts after deletion
    } catch (error) {
      console.error("Failed to delete post:", error);
      setError("Failed to delete post. Please try again.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updatePost({ id: post._id, title: newTitle, content: newContent }).unwrap();
      setIsEditing(false);
      refreshPosts(); // Call to refresh posts after update
    } catch (error) {
      console.error("Failed to update post:", error);
      setError("Failed to update post. Please try again.");
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}
        {!isEditing ? (
          <>
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.content}</p>
            <small>{new Date(post.createdAt).toLocaleString()}</small>
            <div className="d-flex justify-content-end">
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-warning btn-sm me-2"
              >
                Edit
              </button>
              <button onClick={handleDelete} className="btn btn-danger btn-sm">
                Delete
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="form-control mb-2"
              required
            />
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="form-control mb-2"
              required
            />
            <button type="submit" className="btn btn-success btn-sm me-2">
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="btn btn-secondary btn-sm"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PostItem;
