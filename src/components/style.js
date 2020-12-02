import {StyleSheet, Dimensions, Platform} from 'react-native';
import {getAdjustedFontSize} from '../responsive/responsive';

let deviceHeight = Dimensions.get('window').height
const deviceWidth = Math.round(Dimensions.get('window').width);

export default styles = StyleSheet.create({
  Maincontainer: {

    paddingLeft: 25,
  },
  headerContainer: {
    width: '100%',
    // height: deviceHeight-(deviceHeight- 250),
    justifyContent: 'center',
    paddingTop: 25

  },
  imageView: {
    height: 150,
    width: 150,
    borderRadius: 150 / 2,
    borderWidth: 5,
    borderColor: '#ffffff',
    overflow: 'hidden'
  },
  bodyContainer: {
    width: '100%',
    paddingTop: 35,
  },
  footerContainer: {
  width: '100%',
  height: deviceHeight-(deviceHeight- 70),
  flexDirection: 'row',
  position: 'absolute',
  bottom: -25,
  left: 25,
},
name: {
    fontSize: getAdjustedFontSize(26),
    color: '#ffffff'
  },
  popUp:{
   alignSelf: 'center',
   width: deviceWidth-20,
   height: deviceWidth/1.5,
   borderRadius: 20,
   backgroundColor: '#ffffff',
   justifyContent: 'center',
   alignItems: 'center',
  },
   cancelView:{
     position: 'absolute',
     alignItems: 'center',
     justifyContent: 'center',
     top: -10,
     alignSelf: 'flex-end',
     height: 20,
     width: 20,
   },
   messageView:{
     width: deviceWidth/1.2,
     alignSelf: 'center',
     justifyContent: 'center',
     alignItems: 'center',
     marginBottom: 60,
   },
   logoutMessage:{
     fontSize: getAdjustedFontSize(24),
     marginTop: 10,
     color: '#707070',
     textAlign: 'center'
   },
   buttonView:{
     flexDirection: 'row',
     alignItems: 'center',
   },
   yesButton:{
     height: 50,
     width: 130,
     borderRadius: 30,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#23BDE4'
   },
   noButton:{
     height: 50,
     width: 130,
     marginLeft: 20,
     borderRadius: 30,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#DF2B2B'
   },
   textStyle:{
     fontSize: getAdjustedFontSize(20),
     color: '#ffffff'
   },
});
