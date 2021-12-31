import {Platform, Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainConatiner: {
    flex: 1,
  },
  flatListStyle: {
    marginTop: 15,
    paddingBottom: 15,
  },
  itemStyle: {
    flex: 1,
    margin: 15,
    padding: 10,
    marginTop: 2,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImageStyle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'gray',
  },
  nameTextStyle: {
    left: 10,
    width: '75%',
    fontSize: 18,
    fontWeight: '700',
  },
  captionTextStyle: {
    left: 5,
    width: '95%',
    fontSize: 12,
    marginVertical: 10,
  },
  mediaPlayer: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: width / 1.15,
    backgroundColor: 'grey',
    justifyContent: 'center',
    height: Platform.select({android: height / 3.5, ios: height / 4.5}),
  },
  postImageStyle: {
    borderRadius: 5,
    width: width / 1.18,
    height: Platform.select({android: height / 3.5, ios: height / 4.5}),
    marginHorizontal: 5,
    alignItems: 'center',
    backgroundColor: 'gray',
    justifyContent: 'center',
  },
  iconStyle: {
    width: 70,
    height: 70,
  },
});

export default styles;
