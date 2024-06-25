import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRoute } from '@react-navigation/native';

export default function VideoScreen() {
  const route = useRoute();
  const { videoId } = route.params || {};

  if (!videoId) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No video selected</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
        style={styles.video}
        allowsFullscreenVideo
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    flex: 1,
  },
  errorText: {
    color: 'white',
    fontSize: 18,
  },
});
