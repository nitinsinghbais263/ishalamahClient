import { StyleSheet, Dimensions } from 'react-native';

module.exports = StyleSheet.create({

  Container : { flex: 1, resizeMode: 'contain', justifyContent: 'center', backgroundColor:'#285DB3' },

  Logo : { width:200, height:200, alignSelf: 'center', resizeMode: 'contain' },

  Text : { color: '#ffffff', alignSelf: 'center', position: 'absolute', bottom:15 }

});
