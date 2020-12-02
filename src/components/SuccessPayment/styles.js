import {StyleSheet, Dimensions} from 'react-native';
const ScreenWidth = Math.round(Dimensions.get('window').width);

export default StyleSheet.create({
  msgContainer: {
    width: '100%',
    height: 330,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 10,
    paddingVertical: 30
  },
  imgView: {
    height: 120,
    width: 120,
    borderRadius: 60,
    overflow: 'hidden',
    backgroundColor: "black"
  },
  imageStyle:{
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    resizeMode: 'contain',
  },
  sucessView:{
    paddingBottom: 10,
    paddingTop: 35,
    alignSelf: 'center',
  },
  msgView: {
    width: ScreenWidth / 1.5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    // fontFamily: 'SegoeUI-Bold',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  msgText: {
    // fontFamily: 'SegoeUI',
    fontSize: 13,
    color: 'gray',
    lineHeight: 15,
    textAlign: 'center',
  },
});
