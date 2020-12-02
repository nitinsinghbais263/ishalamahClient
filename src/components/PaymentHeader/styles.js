import {StyleSheet, Dimensions,Platform} from 'react-native';
//=== device Dimensions
const screenWidth = Math.round(Dimensions.get('window').width);
//=== other things ===



export default StyleSheet.create({
  headerContainer: {
    height: 60,
    width: screenWidth + 9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingRight: 20,
  },
  safeStyle:{
    height: Platform.OS==='ios'? 100: 55
  },
  menuIcon: {
    height: 30,
    width: 30,
  },
  backIcon: {
    height: 25,
    width: 25,
  },
  modalStyle: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  imageStyles: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  imageStyles2: {
    height: '100%',
    width: '100%',
  },
  headingText: {
    fontSize: 19,
    // fontFamily: 'SegoeUI-Bold',
    color: 'black',
  },
  imageProfile: {
    height: 45,
    width: 45,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF'
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locIcon: {
    height: 18,
    width: 18,
  },
  locView: {
    marginLeft: 5,
    width: '70%',
  },
  locName: {
    fontSize: 16,
    // fontFamily: 'SegoeUI-Bold',
    fontWeight: 'bold',
    color: 'gray',
  },
  locName2: {
    fontSize: 14,
    // fontFamily: 'SegoeUI',
    color: 'gray',
  },
  locContainer: {
    marginLeft: 15,
  },
  locTypeText: {
    fontSize: 16,
    // fontFamily: 'SegoeUI-SemiBold',
    fontWeight: '600',
    color: 'black',
  },
  cloumn2:{
   alignSelf: 'center',
   marginLeft: Platform.OS==='ios'? 15: 0,
  },
});
