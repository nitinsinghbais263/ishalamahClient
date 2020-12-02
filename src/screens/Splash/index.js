import React, { Component } from 'react'
import { View, Image, ImageBackground, Text, SafeAreaView, StatusBar } from 'react-native'
import i18n from '../../../lang/i18n';
import AsyncStorage from '@react-native-community/async-storage';
import SplashStyle from './style';

export default class SplashScreen extends Component {

  componentDidMount() {
    this._loadInitialState()
  }

  _loadInitialState = async () => {
    const { navigation } = this.props
    setTimeout(() => {
  AsyncStorage.getItem('Welcome', (err, result) => {
      if (result == null) {
        console.log("null value recieved", result);
        navigation.navigate('SelectLang')
      } else {
        AsyncStorage.getItem('Intro').then(async value => {
          const intro = await AsyncStorage.getItem('Intro')
          if (intro == null) {
            navigation.navigate('Intro')
            AsyncStorage.setItem('Intro', 'Alfarsi_Intro', (err,result) => {
                    console.log("error",err,"result",result);
                    })
          } else {
            AsyncStorage.getItem('Token').then(async value => {
              const data = await AsyncStorage.getItem('TOKEN')
              if (data) {
                navigation.navigate('Dashboard')
              } else {
                navigation.navigate('Login')
              }
            })
          }
        })
      }
  })
  AsyncStorage.setItem('Welcome', 'Alfarsi', (err,result) => {
          console.log("error",err,"result",result);
          })
          }, 2000)
  }

  // _loadInitialState = async () => {
  //   const { navigation } = this.props
  //   setTimeout(() => {
  // AsyncStorage.getItem('Welcome', (err, result) => {
  //     if (result == null) {
  //       console.log("null value recieved", result);
  //       navigation.navigate('SelectLang')
  //     } else {
  //       AsyncStorage.getItem('Token').then(async value => {
  //         const data = await AsyncStorage.getItem('TOKEN')
  //         if (data) {
  //           navigation.navigate('Dashboard')
  //         } else {
  //           navigation.navigate('Login')
  //         }
  //       })
  //     }
  // })
  // AsyncStorage.setItem('Welcome', 'Alfarsi', (err,result) => {
  //         console.log("error",err,"result",result);
  //         })
  //         }, 2000)
  // }

  render() {
    return (

      <View style={SplashStyle.Container}>
      <StatusBar backgroundColor="#285DB3" barStyle="light-content" />
        <Image style={SplashStyle.Logo} source={require('../../assets/images/Logo.svg')}/>
        <Text style={SplashStyle.Text}>{i18n.t('splash.name')}</Text>
      </View>

    );
  }
}
