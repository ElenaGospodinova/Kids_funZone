import React from 'react';
import { View, Text, FlatList } from 'react-native';
// Import the hook from your API configuration file
import { useGetWatchedVideosQuery } from '../assets/utils/api'; // Update the path accordingly

export default function  UserScreen ({ userId }) {
  const { data: watchedVideos, isLoading, isError } = useGetWatchedVideosQuery(userId);

  if (isLoading) return <Text>Loading...</Text>;
  if (isError || !watchedVideos) return <Text>Error fetching watched videos.</Text>;

  return (
    <FlatList
      data={watchedVideos}
      keyExtractor={(item) => item.videoId.toString()}
      renderItem={({ item }) => <Text>{item.title}</Text>} // Assuming the watched videos include a title
    />
  );
};


