import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  I18nManager,
  BackHandler,
} from 'react-native';
import styles from './style';
import i18n from '../../../lang/i18n';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../../components/Header';
import {getAdjustedFontSize} from '../../responsive/responsive';

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Header navigation={this.props.navigation} />
        <StatusBar backgroundColor="#2383c3" barStyle="light-content" />
        <View style={{padding: 10, flexDirection: 'row'}}>
          <Text style={{color: '#6C6C6C', fontSize: getAdjustedFontSize(20)}}>
            {i18n.t('about.version')}
          </Text>
        </View>
        <View
          style={{
            height: 50,
            width: '100%',
            padding: 10,
            marginTop: 10,
            backgroundColor: '#F8F8F8',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text style={{color: '#707070', fontSize: getAdjustedFontSize(15)}}>
            1.0.187
          </Text>
        </View>
      </View>
    );
  }
}
