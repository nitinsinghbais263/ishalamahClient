import { StyleSheet, Dimensions } from 'react-native';

module.exports = StyleSheet.create({

  Container : { flex: 1, resizeMode: 'contain', justifyContent: 'center', backgroundColor:'#285DB3' },

  InvoiceStatus : {  height: 20, paddingHorizontal: 10, borderRadius: 50, alignItems: 'center', justifyContent: 'center' },

  InvoiceServiceStatus : { width: 120, height: 30, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }

});
