import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../slices/postApiSlice"; // Adjust path based on your structure
import PostItem from "./PostItem";

const PostList = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts()); // Fetch posts when the component mounts
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching posts: {error}</div>;

  return (
    <div>
      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        posts.map((post) => <PostItem key={post._id} post={post} />)
      )}
    </div>
  );
};

export default PostList;
