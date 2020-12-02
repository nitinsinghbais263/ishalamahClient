import React, { Component } from 'react'
import { View, Image, Text,AsyncStorage, TouchableOpacity } from 'react-native'
import InvoicesStyle from './style';


export default class Invoices extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={InvoicesStyle.Container}>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Register1')}>
        <Text> Invoices screen </Text>
      </TouchableOpacity>
      </View>
    );
  }
}
