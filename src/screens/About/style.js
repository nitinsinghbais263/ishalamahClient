import { StyleSheet, Dimensions, Platform} from 'react-native';
import {getAdjustedFontSize} from '../../responsive/responsive';

const sysWidth = Dimensions.get('window').width;
const sysHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
  	flex: 1,
  	backgroundColor: '#ffffff'
  },
  header:{
  	position: 'relative',
  	backgroundColor:'#23BDE4',
  	top: 0,
  	width: '100%',
  	height: 60,
  	justifyContent: 'center'
  },
  versionView:{
  	marginTop: 30,
  	paddingLeft: 10
  },
  versionText:{
  	color: '#6C6C6C',
  	fontSize: getAdjustedFontSize(20)
  },
  versionFiledView:{
  	height: 50,
  	width: '100%',
  	marginTop: 20,
  	backgroundColor: '#F8F8F8',
  	justifyContent: 'center',
  },
  versionFieldText:{
  	color: '#707070',
  	fontSize: getAdjustedFontSize(15)
  }
})
