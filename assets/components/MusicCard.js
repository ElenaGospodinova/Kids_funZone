import React from 'react';
import {SafeAreaView, ScrollView, View, Image, TouchableOpacity, Text} from 'react-native';

const MusiicCard = ({albumCover}) => {
  const styles = {
    safeAreaView: {
      flex: 1,
      borderStyle:'none',
      
    },
    base: {
      flexGrow: 1,
      padding: 24,
    },
    card: {
      borderRadius: 22,
      backgroundColor: '#ffffff',
      overflow: 'hidden',
    },
    cardTop: {
      backgroundColor: '#f1f6f8',
      overflow: 'hidden',
    },
    cardImg: {
      width: '100%',
      aspectRatio: 16 / 9,
    },
    cardOption: {
      position: 'absolute',
      top: 10,
      right: 20,
      left: 10,
      alignItems: 'flex-end',
      width: null,
      height: null,
    },
    btn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 28,
      minWidth: 100,
      maxWidth: '100%',
      paddingHorizontal: 15,
      backgroundColor: '#169f94',
      borderRadius: 4,
      overflow: 'hidden',
    },
    btnText: {
      color: '#ffffff',
      fontSize: 16,
    },
    cardBody: {
      paddingTop: 20,
    },
    cardTitle: {
      fontSize: 20,
      marginBottom: 15,
      paddingHorizontal: 15,
      color: '#1c1c1c',
      opacity: 1,
    },
  };
    
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView contentContainerStyle={styles.base}>
        <TouchableOpacity style={styles.card} activeOpacity={0.8}>
          <View style={styles.cardTop}>
            <Image style={styles.cardImg} source={{uri: albumCover}} />
            <View style={styles.cardOption} pointerEvents="box-none">
              <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
                <Text style={styles.btnText} numberOfLines={1}>
                  Follow
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle} numberOfLines={2}>
              Card Title Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur culpa, debitis deserunt enim eos excepturi
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MusiicCard;