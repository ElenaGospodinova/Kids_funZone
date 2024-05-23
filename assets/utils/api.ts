// ../assets/utils/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'; // Make sure to import from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  tagTypes: ['Videos'],
  endpoints: builder => ({
    // Your endpoint definitions...
    getWatchedVideos: builder.query({
      query: (userId) => `/watched-videos/${userId}`,
      providesTags: ['Videos'],
    }),
    addWatchedVideo: builder.mutation({
      query: ({ userId, videoId }) => ({
        url: `/watched-videos`,
        method: 'POST',
        body: { userId, videoId }
      }),
      invalidatesTags: ['Videos'],
    }),
    // Other endpoints...
  }),
});
// Export hooks for usage in functional components
export const { 
  useGetWatchedVideosQuery, 
  useAddWatchedVideoMutation 
} = api;
