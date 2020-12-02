import { StyleSheet } from 'react-native';
import {getAdjustedFontSize} from '../../responsive/responsive';

export default StyleSheet.create({
  container: {
    width: 380,
    height: '100%',
    flexDirection: 'row',
    backgroundColor:'red'
  },
  mapView:{
    marginTop:20,
  	height: "90%",
    width: "100%"
  },
  searchPannel:{
  	position: 'absolute',
  	alignSelf: 'flex-end',
  	// backgroundColor: 'green',
  	width: '100%',
  	bottom: '3%'
  },
  searchButton:{
  	width: '100%',
  	backgroundColor: '#309599',
  	alignSelf: 'center',
  	height: 50,
  	borderRadius: 30,
  	justifyContent: 'space-between',
  	flexDirection: 'row'
  },
  searchButtonBackground:{
    width: '90%',
    backgroundColor: '#309599',
    alignSelf: 'center',
    height: 50,
    borderRadius: 30
  },
  findTitleView:{
    // backgroundColor: 'red',
    alignSelf: 'center',
    marginLeft: 20
  },
  findTitle:{
  	fontSize: getAdjustedFontSize(18),
  	color: '#fff',
    fontFamily: 'segoe-ui'
  	// top: '20%',
  },
  searchIconView:{
    // alignSelf: 'flex-end',
    // position: 'relative',
    // bottom: '20%',
    justifyContent: 'center',
    marginRight: 20,
    alignSelf: 'center',
    width: 28,
    height: 28,
    // backgroundColor: 'yellow'
  },
  searchIcon:{
  	position: 'relative',
  	resizeMode: 'contain',
    alignSelf: 'center',
    width: 22,
    height: 22
  },
  searchIconAR:{
    position: 'relative',
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 22,
    height: 22,
    transform: [{ rotate: '270deg' }]
  },
  markerView:{
    width: 100,
    height: 100,
    flex: 1,
  },
  selectedLocationView:{
    backgroundColor: '#ff525a',
    flex: 1,
    // width: "100%",
    // height: '50%',
    borderRadius: 30,
    // marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  selectedLocCircle:{
    width: 40,
    height: 40,
    borderRadius: 20,
    // justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    marginLeft: 5
  },
  // circleView:{
  //   borderRadius: 50,
  //   backgroundColor: 'black',
  //   height: 100,
  //   width: 100,
  //   // left: '10%'
  // },
  textView:{
    // width: '50%',
    textAlign: 'center',
    width: 80,
    justifyContent: 'center'
  },
  textStyle:{
    alignSelf: 'center',
    // left: '10%',
    textAlign: 'center',
    color: '#ffffff'
  },
  imageView:{
    // width: '25%',
    width: 45,
    justifyContent: 'center',
  },
  imageViewAR:{
    width: 45,
    justifyContent: 'center',
    transform: [{ rotate: '180deg' }]
  },
  imageRight:{
    alignSelf: 'center',
    resizeMode:"cover",
    height: 22,
    width: 22
  },
  searchPannelView:{
    bottom: 60,
    // height: 210,
    width: '100%',
    backgroundColor: '#72d0d4',
    borderRadius: 20,
    position: 'absolute',
    alignSelf: 'center',
    paddingBottom: 10,
    flex: 1
  },
  nameInput:{
    borderRadius: 30,
    backgroundColor: '#ffffff',
    width: '90%',
    alignSelf: 'center',
    height: 45,
    marginTop: 15,
    paddingLeft: 15,
    justifyContent: 'center',
    fontFamily: 'segoe-ui',
    color: '#AEAEAE',
    fontSize: getAdjustedFontSize(16)
  },
  nameInputAR:{
    borderRadius: 30,
    backgroundColor: '#ffffff',
    width: '90%',
    alignSelf: 'center',
    height: 45,
    marginTop: 15,
    paddingLeft: 15,
    justifyContent: 'center',
    textAlign: 'right'
  },
  spetialityButton:{
    flexDirection: 'row',
    borderRadius: 30,
    width: '100%',
    backgroundColor: '#309599',
    alignSelf: 'center',
    height: 45,
    paddingLeft: 15
  },

  spetialityButtonBig:{
    flexDirection: 'row',
    borderRadius: 30,
    width: '100%',
    marginTop: 8,
    alignSelf: 'center',
    // height: 100,
    paddingLeft: 5
  },
  resetButton:{
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#ff525a',
    borderRadius: 30,
    width: '100%',
    alignSelf: 'center',
    height: 45
  },
  spetialityButtonBackground:{
    position: 'relative',
    borderRadius: 30,
    width: '90%',
    backgroundColor: '#309599',
    alignSelf: 'center',
    height: 45,
    marginTop: 15
  },
  spetialityButtonBackgroundBig:{
    position: 'relative',
    borderRadius: 30,
    width: '90%',
    backgroundColor: '#309599',
    alignSelf: 'center',
    height: 200,
    marginTop: 15,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  spetialityTextView:{
    width: '80%',
    justifyContent: 'center',
  },
  spetialityTextViewBig:{
    // width: '80%',
    justifyContent: 'center'
  },
  spetialityText:{
    color: '#ffffff',
    fontSize: getAdjustedFontSize(16),
    fontFamily: 'segoe-ui'
  },
  spetialityTextAR:{
    color: '#ffffff',
    fontSize: getAdjustedFontSize(16),
    alignSelf: 'flex-start',
    fontFamily: 'segoe-ui'
  },
  spetialityTextBig:{
    color: '#ffffff',
    fontSize: getAdjustedFontSize(16),
    fontFamily: 'segoe-ui'
  },
  spetialityRightButton:{
    width: '20%',
    justifyContent: 'center'
  },
  spetialityArrowImage:{
    alignSelf: 'center',
    marginRight: '1%',
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },
  spetialityArrowImageAR:{
    alignSelf: 'center',
    width: 20,
    height: 20,
    resizeMode: 'contain',
    transform: [{ rotate: '180deg' }]
  },
  resetButtonBackground:{
    backgroundColor: '#ff525a',
    borderRadius: 30,
    width: '90%',
    alignSelf: 'center',
    height: 45,
    marginTop: 15,
    marginBottom: 8
  },
  resetTextView:{
    width: '85%',
    justifyContent: 'center'
  },
  resetText:{
    color: '#ffffff',
    fontSize: getAdjustedFontSize(16),
    fontFamily: 'segoe-ui'
  },
  resetTextAR:{
    color: '#ffffff',
    fontSize: getAdjustedFontSize(16),
    fontFamily: 'segoe-ui',
    alignSelf: 'flex-start'
  },
  resetImageView:{
    width: '15%',
    justifyContent: 'center',
    paddingLeft: 5,
    paddingTop: 3,
  },
  resetImage:{
    alignSelf: 'center',
    width: 15,
    height: 15,
    resizeMode: 'contain'
  },
    circleView:{
    height: 23,
    width: 23,
    justifyContent: 'center'
  },
  circle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    // borderWidth: 1,
    // borderColor: '#ACACAC',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
  circleColor:{
    height: 12,
    width: 12,
    borderRadius: 6,
    // borderWidth: 1,
    // borderColor: '#ff525a',
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkedCircle:{
    width: 20,
    height: 20,
    position: 'absolute',
    alignSelf: 'center',
    // backgroundColor: 'blue',
    left: 2
  },
  checkedImage: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    marginTop: 2
    // borderRadius: 7,
  },
})
