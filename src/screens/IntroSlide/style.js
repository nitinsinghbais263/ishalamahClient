import { StyleSheet, Dimensions, Platform } from 'react-native';

import {getAdjustedFontSize} from '../../responsive/responsive';

let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height

module.exports = StyleSheet.create({

  container: { flex: 1, overflow: 'hidden',paddingTop: (Platform.OS) === 'ios' ? 20 : 0, alignItems: 'center', justifyContent: 'center', padding: 10 },

  backgroundImage: { height: 500 ,width: 450, position: 'absolute', left: -150, top: 120,  },

  title: { fontSize: getAdjustedFontSize(26), color: '#23BDE4', fontWeight: 'bold', textAlign: 'center', marginTop: 20, marginBottom: 8 },

  text: { color: '#6C6C6C', fontSize: getAdjustedFontSize(20) },

  image: { width: 150, height: 150, resizeMode: 'contain' }
});
