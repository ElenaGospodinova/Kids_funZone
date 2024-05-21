import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';

const SpotifyPlayer = ({ authToken }) => {
  const [webViewRef, setWebViewRef] = useState(null);

  useEffect(() => {
    if (webViewRef) {
      webViewRef.postMessage(JSON.stringify({ authToken }));
    }
  }, [webViewRef, authToken]);

  const onMessage = (event) => {
    const message = JSON.parse(event.nativeEvent.data);
    console.log('Received message from WebView:', message);
    // Handle messages from the WebView
  };

  return (
    <WebView
      ref={(ref) => setWebViewRef(ref)}
      source={{ uri: 'https://your-app.com/spotify-player' }}
      onMessage={onMessage}
    />
  );
};

export default SpotifyPlayer;
