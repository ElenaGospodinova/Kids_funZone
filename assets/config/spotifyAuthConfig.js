import { authorize } from 'react-native-app-auth';

const spotifyAuthConfig = {
  clientId: 'a829cad6b64344c88a2b7425a94e9f06',
  clientSecret: '25ab471a807e411c82a140cfa83461ba',
  redirectUrl: 'exp://192.168.0.43:19000',
  scopes: ['user-read-private', 'user-read-email', 'playlist-read-private'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  },
};

const handleLogin = async () => {
  try {
    const result = await authorize(spotifyAuthConfig);
    setAccessToken(result.accessToken);
  } catch (error) {
    console.error('Failed to log in', error);
    setError('Failed to log in.');
  }
};
