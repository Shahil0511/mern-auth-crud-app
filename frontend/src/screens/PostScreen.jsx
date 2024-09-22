import React from 'react';
import { useFetchPostsQuery } from '../slices/postApiSlice'; // Import the hook for fetching posts

const PostScreen = () => {
  const { data: posts, error, isLoading } = useFetchPostsQuery(); // Fetch posts

  if (isLoading) return <div>Loading...</div>; // Loading state
  if (error) return <div>Error: {error.message}</div>; // Error handling

  return (
    <div className="container mt-4">
      <h2>Posts</h2>
      <ul className="list-group">
        {posts.map((post) => (
          <li key={post._id} className="list-group-item">
            <h5>{post.title}</h5>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostScreen;
