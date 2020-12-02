import React, { Component } from 'react';
import { StyleSheet, View, Text, Platform, Image, TouchableOpacity, Dimensions, ImageBackground, I18nManager } from 'react-native';
import i18n from '../../../lang/i18n';
import RNRestart from 'react-native-restart';
import IntroStyle from './style';
import AsyncStorage from '@react-native-community/async-storage';
import {getAdjustedFontSize} from '../../responsive/responsive';

let deviceWidth = Dimensions.get('window').width
let deviceHeight = Dimensions.get('window').height


export default class SelectLang extends Component {
  constructor(props) {
    super(props);
    this.state ={
      language: ''
    }
  }

//   componentWillMount(){
//   AsyncStorage.getItem('language').then( (value) => {
//     this.setState({language: value})
//   });
// }

  selectEN = () => {

    this.setState({
      checkedEN: true,
      checkedAR: false
    })
    AsyncStorage.setItem('language', 'en');

    i18n.locale = 'en'

    if (I18nManager.isRTL) {
      RNRestart.Restart();
    } else {
      RNRestart.Restart();
    }
    I18nManager.forceRTL(false);
  }

  selectAR = () => {

    this.setState({
      checkedEN: false,
      checkedAR: true
    })
    AsyncStorage.setItem('language', 'ar');

    i18n.locale = 'ar'
    if (!I18nManager.isRTL) {
      RNRestart.Restart();
    }
    I18nManager.forceRTL(true);
  }

  componentWillMount(){
		AsyncStorage.getItem('language').then( (value) => {
      this.setState({language: value})
    });
	}

  render() {
      const language = this.state.language;
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', padding: 10,paddingBottom:50, overflow: 'hidden'}}>
          <ImageBackground source={require('../../assets/images/LogoBg.svg')} style={{ height: 500 ,width: 450, position: 'absolute', left: -150, top: 120,  }}></ImageBackground>

          <View style={{width: 80, height: 220, marginTop: 100, marginBottom: 50}}>
            <Image style={{ width: '100%', height: '100%'}} source={require('../../assets/images/Lang2.png')} />
          </View>

          <TouchableOpacity onPress={() => this.selectEN()}>
            <View style={{ width: '100%', flexDirection:'row'}}>
              <View style={{ width: '80%'}}>
                <Text style={{fontSize: getAdjustedFontSize(22), fontFamily: 'SegoeUI', color: '#23BDE4', textAlign: 'left'}}>Continue in</Text>
                <Text style={{fontSize: getAdjustedFontSize(34), fontFamily: 'SegoeUI', color: '#285DB3', fontWeight: '600', marginBottom: 15, textAlign: 'left'}}>English</Text>
                <Text style={{fontSize: getAdjustedFontSize(18), fontFamily: 'SegoeUI',color: '#707070', textAlign: 'left' }}>You can always change the language preferences from the account settings.</Text>
              </View>
              <View style={{ width: '20%'}}>
                <View style={{ position: 'absolute',bottom: 50, left: 30 }}>
                  <Image style={{ width: 40, height: 40, transform: [{ rotate: this.state.language == 'ar' ? '180deg' : '0deg' }] }} source={require('../../assets/images/Language.svg')}/>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.selectAR()} style={{marginTop: 50}}>
            <View style={{ width: '100%', flexDirection:'row'}}>
              <View style={{ width: '80%', alignItems: 'flex-start'}}>
                <Text style={{fontSize: getAdjustedFontSize(22), fontFamily: 'SegoeUI', color: '#23BDE4'}}>المتابعة باللغة</Text>
                <Text style={{fontSize: getAdjustedFontSize(36), fontFamily: 'SegoeUI', color: '#285DB3', fontWeight: '600', marginBottom: 15}}>العربية</Text>
                <Text style={{fontSize: getAdjustedFontSize(19), fontFamily: 'SegoeUI', color: '#707070',textAlign: 'left'}}>يمكنك تغيير اللغة في أي وقت من خلال خصائص الحساب من الإعدادات</Text>
              </View>
              <View style={{ width: '20%',}}>
                <View style={{ position: 'absolute',bottom: 50, left: 30 }}>
                  <Image style={{ width: 40, height: 40, transform: [{ rotate: this.state.language == 'ar' ? '180deg' : '0deg' }] }} source={require('../../assets/images/Language.svg')}/>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
  }
}
