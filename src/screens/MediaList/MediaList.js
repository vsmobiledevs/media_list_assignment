import React, {useRef, useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import Video from 'react-native-video';
import {Loading} from '../../components/Loading';
import styles from './styles';

const {height} = Dimensions.get('window');
const ITEM_HEIGHT = height / 4;

const MediaList = () => {
  const videoRef = useRef(null);
  const [mediaData, setMediaData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hitting the api to get data.
  // Putting selected key in each item to keep track of the seleted item
  // Saving updated data in the satate.
  useEffect(() => {
    var config = {
      method: 'get',
      url: 'https://loke-server-staging.herokuapp.com/api/skate_videos.json?page=5&primary_trick_id=89&api_key=MwL8Qr8gMmzfLlialrrFFQtt',
      headers: {},
      data: '',
    };
    axios(config)
      .then(function (response) {
        const dataArr = response?.data.map(item => {
          return {
            ...item,
            selected: false,
          };
        });
        setMediaData(dataArr);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
      });
  }, []);

  // Change the value of selected to know about selected items.
  const handleItemSelection = ({id}) => {
    const dataArr = mediaData?.map(item => {
      if (item?.id === id) {
        return {
          ...item,
          selected: true,
        };
      } else {
        return {
          ...item,
          selected: false,
        };
      }
    });
    setMediaData(dataArr);
  };

  // Un select all the items to get earlier state
  const handleOnEnd = () => {
    const dataArr = mediaData?.map(item => {
      return {
        ...item,
        selected: false,
      };
    });
    setMediaData(dataArr);
  };

  // render each item in the list
  const renderItem = ({item, index}) => {
    return (
      <View key={index} style={styles.itemStyle}>
        <View style={styles.itemRow}>
          <Image
            style={styles.userImageStyle}
            source={{uri: item?.creator?.new_picture_url}}
          />
          <Text style={styles.nameTextStyle}>
            {item?.creator?.first_name} {item?.creator?.last_name}
          </Text>
        </View>
        <Text style={styles.captionTextStyle}>
          {item?.caption.replace(/\n/g, '')}
        </Text>
        {item?.selected ? (
          item?.media_type === 'video' ? (
            <Video
              source={{uri: item?.video_url}}
              onLoadStart={() => {
                console.log('Loading...');
              }}
              onLoad={() => {
                console.log('Loaded...');
              }}
              onError={() => {
                console.log('Error while loading video.');
              }}
              volume={10}
              ref={videoRef}
              repeat={false}
              controls={true}
              autoplay={false}
              resizeMode={'cover'}
              playInBackground={false}
              playWhenInactive={false}
              style={styles.mediaPlayer}
              onEnd={() => handleOnEnd()}
            />
          ) : null
        ) : item?.media_type !== 'video' ? null : (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handleItemSelection(item)}>
            <ImageBackground
              style={styles.postImageStyle}
              source={{uri: item?.thumbnail}}>
              <Image
                style={styles.iconStyle}
                source={require('../../assets/play.png')}
              />
            </ImageBackground>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const getItemLayout = useCallback((data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  }));

  return (
    <SafeAreaView style={styles.mainConatiner}>
      <Loading visible={loading} />
      <FlatList
        data={mediaData}
        extraData={mediaData}
        renderItem={renderItem}
        maxToRenderPerBatch={5}
        removeClippedSubviews
        initialNumToRender={8}
        keyExtractor={item => item.id}
        getItemLayout={getItemLayout}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListStyle}
      />
    </SafeAreaView>
  );
};

export default MediaList;
