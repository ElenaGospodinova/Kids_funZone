import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import VideoCard from '../assets/components/VideoCard';
import Screen from '../assets/components/Screen';

export default function ParentsScreen() {
  const navigation = useNavigation();

  const navigateTo = (screenName) => {
    navigation.navigate(screenName);
  };

  useEffect(() => {
    const fetchData = async () => {
      const url =
        'https://youtube-search-and-download.p.rapidapi.com/playlist?id=PL2UMfhpwklNNI9ALzCFI-cObgnO4nQ2fu&next=4qmFsgJhEiRWTFBMV3dBeXBBY0ZSZ0tBSUlGcUJyOW95LVpZWm5peGFfRmoaFENBRjZCbEJVT2tOSFZRJTNEJTNEmgIiUExXd0F5cEFjRlJnS0FJSUZxQnI5b3ktWllabml4YV9Gag%253D%253D';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '847b72ca63mshef857b9ae558dc0p1f3e08jsn3e246b4af59a',
          'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
        // If you want to do something with the result, add your logic here
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.next} onPress={() => navigateTo('Kids Zone')}>
          <AntDesign name="rightcircleo" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.back} onPress={() => navigateTo('Home')}>
          <AntDesign name="leftcircleo" size={24} color="black" />
        </TouchableOpacity>

        <VideoCard title="Handmade Turkish rugs" subTitle="£54.00 each" image={require('../assets/img/cinema.webp')} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 17,
    marginTop: 120,
  },
  next: {
    position: 'absolute',
    top: -53,
    right: 20,
    zIndex: 12,
  },
  back: {
    position: 'absolute',
    top: -53,
    left: 20,
    zIndex: 12,
  },
});
