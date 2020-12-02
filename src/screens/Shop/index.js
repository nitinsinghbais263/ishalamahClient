import React, { Component } from 'react'
import { View, Image,ImageBackground, Text, StyleSheet, ScrollView, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native'
import Header from '../../components/Header';
import ProductsCategory from './ProductsCategory';
import ProductsAdded from './ProductsAdded';
import ProductsList from './ProductsList';

export default class Shop extends Component {
  constructor(props) {
    super(props);
}
  render() {
    return (
      <View style={{flex: 1, resizeMode: 'contain', justifyContent: 'center'}}>

        <Header navigation={this.props.navigation} />

          <ProductsList navigation={this.props.navigation}/>

      </View>
    );
  }
}
