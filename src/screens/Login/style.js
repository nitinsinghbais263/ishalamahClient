import { StyleSheet, Dimensions, Platform } from 'react-native';
import {getAdjustedFontSize} from '../../responsive/responsive';

let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height


module.exports = StyleSheet.create({

  Maincontainer: { flex: 1, backgroundColor:'#285DB3'},

  backgroundImage1: { width: deviceWidth, height: deviceHeight,},

  backgroundImage: { height: deviceHeight-150 ,width: deviceWidth+150, position: 'absolute', left: deviceWidth - ( deviceWidth + 200) , top:  deviceHeight - (deviceHeight - 50),  },

  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingRight: 10, paddingLeft: 10,  paddingTop: deviceHeight -(deviceHeight- 200), backgroundColor: 'transparent', },

  Logo : { width:165, height:165,position: 'absolute', left: 90, top:  deviceHeight - (deviceHeight - 50), resizeMode: 'contain' },

  text : { alignSelf: 'center', fontSize: getAdjustedFontSize(24), position: 'absolute', top: 220,},

  inputContainer: { borderBottomColor: '#2383C3', backgroundColor: '#2383C3', borderRadius:10, borderBottomWidth: 1, width: '100%', height:50, marginBottom:20, flexDirection: 'row', alignItems:'center', alignSelf: 'center', justifyContent: 'center' },

  inputs:{ height:45, marginLeft:16, fontSize: getAdjustedFontSize(18), color: 'white', borderBottomColor: '#FFFFFF', flex:1, },

  buttonContainer: { height:50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom:20, width:'100%', borderRadius:10 },

  forgetPassword: { height:45,  flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', width:'100%', marginTop: -15, borderRadius:10,  },

  forgetText: { fontSize: getAdjustedFontSize(14), color: 'white' },

  loginButton: { backgroundColor: "#00b5ec" },

  loginText: { fontSize: getAdjustedFontSize(18), fontWeight: 'bold', color: 'white'},

  registerContainer: { height:50, flexDirection: 'row', justifyContent: 'center', alignSelf: 'center',  alignItems: 'center',position: 'absolute', bottom: 20,  width:350, borderRadius:10},

  register: {fontSize: getAdjustedFontSize(18), color: 'white'},

  registerText: { fontSize: getAdjustedFontSize(18), color: '#7FD5EB' }
});
