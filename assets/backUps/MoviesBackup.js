import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, View, Text, Image, Platform, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';

import Screen from '../assets/components/Screen';
import colors from '../assets/config/colors';
import VideoCard from '../assets/components/VideoCard';

export default function MoviesScreen() {


    // const code = 'fd0847dbb559752d932dd3c1ac34ff98d27b11fe2fea5a864f44740cd7919ad0'
    // const client_id = '6e230360bd873eec39931d1e0d4f713b167490e98cebae24ee3bb85b37fe8807'
    // const client_secret= 'e97ff4fb939717471ba2ae0256efd752f3f3e975f6694c8cc0fe4e40470845bc'

    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        const query = 'tron kids';
        const encodedQuery = encodeURIComponent(query);
        const url = `https://api.trakt.tv/search/movie?query=${encodedQuery}`;

        const options = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'trakt-api-version': 2,
                'trakt-api-key': '6e230360bd873eec39931d1e0d4f713b167490e98cebae24ee3bb85b37fe8807',
            },
        };

        try {
            const movieResponse = await fetch(url, options);

            if (movieResponse.ok) {
                const result = await movieResponse.json();

                const movieData = result.map(item => ({
                    id: item.movie.ids.trakt,
                    title: item.movie.title,
                    image: item.movie.poster,
                }));

                setMovies(movieData);
            } else {
                console.error('Failed to fetch data:', movieResponse.status, movieResponse.statusText);
                alert('Failed to fetch movies. Please try again later.');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('An error occurred while fetching movies. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const renderMovies = ({ item }) => (
        <View style={styles.movieList}>
            <Text>{item.title}</Text>
            <Image
                source={{ uri: item.image }}
                resizeMode='contain'
                style={styles.moviesImg}
            />
        </View>
    );

    return (
        <Screen>
            <View style={styles.container}>
                <View style={styles.fixedHeader}>
                    <TouchableOpacity style={styles.next} title='Video' onPress={() => navigation.navigate('Kids Zone')}>
                        <Entypo name="video" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.music} onPress={() => navigation.navigate('Music Zone')}>
                        <Entypo name="music" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.back} title='Home' onPress={() => navigation.navigate('Home')}>
                        <AntDesign name="home" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.moviesContainer}>
                    <Text>Movies Screen</Text>
                    <VideoCard />
                </View>
                {loading ? (
                    <ActivityIndicator style={styles.loadingIndicator} size="large" color={colors.primary} />
                ) : (
                    <FlatList
                        style={styles.movieList}
                        data={movies}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderMovies}
                    />
                )}
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 17,
        marginBottom: 20,
    },
    back: {
        marginLeft: 10,
    },
    next: {
        marginRight: 1,
        position: 'absolute',
        top: Platform.OS === 'android' ? -1 : 3,
        right: 20,
        zIndex: 12,
        color: colors.white,
    },
    moviesContainer: {
        top: 124,
    },
    music: {
        position: 'absolute',
        top: 3,
        right: 60,
    },
    fixedHeader: {
        position: 'absolute',
        top: 40,
        left: 0,
        right: 0,
        zIndex: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: colors.lightBlue,
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    movieList: {
        marginTop: 20,
    },
    moviesImg: {
        width: 100,
        height: 100,
    },
});