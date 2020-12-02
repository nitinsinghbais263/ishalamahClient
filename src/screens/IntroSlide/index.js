import React, { Component } from 'react';
import { StyleSheet, View, Text, Platform, Image, ImageBackground } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import i18n from '../../../lang/i18n';
import IntroStyle from './style';
import Login from '../Login/index'


export default class IntroScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show_Main_App: false
    };
  }

  _renderItem = (item) => {
    return (
      <View style={IntroStyle.container}>
        <ImageBackground source={item.item.backgroundImage} style={IntroStyle.backgroundImage}></ImageBackground>
        <Image style={item.item.imageStyle} source={item.item.image} />
        <Text style={item.item.titleStyle}>{item.item.title}</Text>
        <Text style={item.item.textStyle}>{item.item.text}</Text>
      </View>
    );
  }
  on_Done_all_slides = () => {
    this.setState({ show_Main_App: true });
    this.props.navigation.navigate('Login');
  };

  on_Skip_slides = () => {
    this.setState({ show_Main_App: true });
    this.props.navigation.navigate('Login');
  };

  render() {
      return (
        <AppIntroSlider
          renderItem={this._renderItem}
          slides={slides}
          onDone={this.on_Done_all_slides}
          showSkipButton={true}
          onSkip={this.on_Skip_slides}
          dotStyle={{backgroundColor: '#285DB3'}}
          activeDotStyle={{backgroundColor:'#23BDE4'}}
          buttonTextStyle={{color: '#23BDE4'}}
        />
      );
  }
}

const slides = [

  {
    key: '1',
    title: i18n.t('intro1.signup'),
    text: i18n.t('intro1.content'),
    image: require('../../assets/images/Intro2.svg'),
    backgroundImage: require('../../assets/images/LogoBg.svg'),
    titleStyle: IntroStyle.title,
    textStyle: IntroStyle.text,
    imageStyle: IntroStyle.image,
    backgroundColor: '#D500F9',
  },
  {
    key: '2',
    title: i18n.t('intro2.redirect'),
    text: i18n.t('intro2.content'),
    image: require('../../assets/images/Intro3.svg'),
    backgroundImage: require('../../assets/images/LogoBg.svg'),
    titleStyle: IntroStyle.title,
    textStyle: IntroStyle.text,
    imageStyle: IntroStyle.image,
    backgroundColor: '#2979FF',
  },
  {
    key: '3',
    title: i18n.t('intro3.minutes'),
    text: i18n.t('intro3.content'),
    image: require('../../assets/images/Intro4.svg'),
    backgroundImage: require('../../assets/images/LogoBg.svg'),
    titleStyle: IntroStyle.title,
    textStyle: IntroStyle.text,
    imageStyle: IntroStyle.image,
    backgroundColor: '#1DE9B6',
  },
  ];
