import { apiSlice } from "./apiSlice";

const POSTS_URL = "/api/posts"; // Define the posts URL

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchPosts: builder.query({
      // Accept userId as a parameter to filter posts
      query: (userId) => `${POSTS_URL}?userId=${userId}`,
      providesTags: ["Post"], // Tag for cache invalidation
    }),
    createPost: builder.mutation({
      query: (data) => ({
        url: POSTS_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Post"], // Invalidate Post cache after creating a post
    }),
    updatePost: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${POSTS_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Post"], // Invalidate Post cache after updating a post
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `${POSTS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"], // Invalidate Post cache after deleting a post
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useFetchPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApiSlice;
