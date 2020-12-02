import React, { Component } from 'react';
import Header from '../../components/Header';
import { View, Text, TextInput, Image, Button, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, BackHandler } from 'react-native';
import i18n from '../../../lang/i18n'


export default class TextArea extends Component {
  constructor(props) {
    super(props);
    this.state= {
      content: "",
    };
  }

  render() {
    const that = this
    return (
      <View style={{flex: 1}}>
      <Header navigation={this.props.navigation} />
        <Text style={{fontSize: 14, alignSelf: 'flex-start', marginTop: 20, padding: 10}}>Content:</Text>
        <TextInput style={{width: '100%', height: 150, padding: 10, textAlignVertical: "top", backgroundColor: '#F8F8F8', fontSize: 14, borderBottomColor: '#F8F8F8'}}
            placeholder='Type here'

            keyboardType="email-address"
            multiline = {true}
            numberOfLines = {4}
            underlineColorAndroid='transparent'
            onChangeText={(content) => this.setState({content: content})}/>

        <TouchableOpacity activeOpacity={0.8} style={{ width: '100%', height: 50, position: 'absolute', bottom: 0, backgroundColor: '#23BDE4' }} onPress={() => this.props.navigation.navigate('Notes', {content: this.state.content})}>
          <Text style={{ color: '#ffffff', fontSize: 18, alignSelf: 'center', padding: 10 }}>Save</Text>
        </TouchableOpacity>
      </View>
    )
  }
};
