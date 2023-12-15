import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';

const GamesScreen = () => {
  const [accessories, setAccessories] = useState([]);
  const [selectedAccessoryUrl, setSelectedAccessoryUrl] = useState(null);
  
  useEffect(() => {
    const fetchAccessories = async () => {
      const url = 'https://cheapshark-game-deals.p.rapidapi.com/games?title=batman&exact=0&limit=60';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '847b72ca63mshef857b9ae558dc0p1f3e08jsn3e246b4af59a',
          'X-RapidAPI-Host': 'gamerpower.p.rapidapi.com',
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json(); // Assuming the API returns JSON data
        
        console.log('API Response:', result);

        setAccessories(result); // Update the state with the fetched accessories
      } catch (error) {
        console.error('API Request Error:',error);
      }
    };

    fetchAccessories(); // Call the fetchAccessories function when the component mounts
  }, []); // Empty dependency array ensures that this effect runs once

  const viewAccessory = (url) => {
    setSelectedAccessoryUrl(url);
  };

  const closeWebView = () => {
    setSelectedAccessoryUrl(null);
  };

  const renderAccessoryItem = ({ item }) => (
    <TouchableOpacity style={styles.accessoryItem} onPress={() => viewAccessory(item.url)}>
      <Text style={styles.accessoryName}>{item.name}</Text>
      <Text>{`Platform: ${item.platforms}`}</Text>
      <Text>{`Type: ${item.type}`}</Text>
      <Text>{`Price: ${item.salePrice}`}</Text>
      <Text>{`Release Date: ${item.releaseDate}`}</Text>
      <Text>{`Metacritic Score: ${item.metacriticScore || 'N/A'}`}</Text>
      <Text>{`Deal Rating: ${item.dealRating || 'N/A'}`}</Text>
      {/* Add more details or styling as needed */}
    </TouchableOpacity>
  );
  
  

  return (
      
    <View style={styles.container}>
      <Text style={styles.header}>GamesScreen</Text>
      {selectedAccessoryUrl ? (
        <View style={styles.webViewContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeWebView}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <WebView source={{ uri: selectedAccessoryUrl }} />
        </View>
      ) : (
        <FlatList
          data={accessories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderAccessoryItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  accessoryItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff', // Background color for each item
    borderRadius: 8, // Add some border radius for a rounded look
    marginVertical: 8, // Adjust vertical margin between items
  },
  accessoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333', 
  },
  webViewContainer: {
    flex: 1,
  },
  closeButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },
  closeButtonText: {
    color: 'white',
  },
});

export default GamesScreen;
