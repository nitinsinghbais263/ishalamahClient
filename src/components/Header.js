import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import i18n from '../../lang/i18n';
import {ActionCreators} from '../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    token: '',
    fullname: '',
    uuid: '',
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    AsyncStorage.getItem('TOKEN').then(value => {
      this.setState({token: value});
      this.props.getUserDetails(this, {
        token: this.state.token,
      });
    });
  };

  componentWillReceiveProps(nextProps) {
    var uuidId = nextProps.data.uuid;
    if (uuidId) {
      lastChar = uuidId.substr(uuidId.length - 5);
      if (nextProps.data) {
        this.setState({
          fullname: nextProps.data.full_name,
          uuid: lastChar,
          image: nextProps.data.profile_image,
        });
      }
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('language').then(value => {
      this.setState({language: value});
    });
  }

  render() {
    return (
      <SafeAreaView style={{backgroundColor: '#2383C3'}}>
        <StatusBar backgroundColor="#2383C3" barStyle="light-content" />
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            height: 60,
            backgroundColor: '#2383C3',
          }}>
          <TouchableOpacity
            style={{position: 'absolute', left: 0, top: 20}}
            onPress={() => this.props.navigation.goBack()}>
            <Image
              style={{
                width: 25,
                height: 25,
                marginLeft: 4,
                transform: [
                  {rotate: this.state.language == 'ar' ? '180deg' : '0deg'},
                ],
              }}
              source={require('../assets/images/back.svg')}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              right: 0,
              top: 5,
            }}>
            <View style={{paddingTop: 10}}>
              <Text style={{fontSize: 12, color: '#ffffff', marginRight: 10}}>
                {i18n.t('drawer.account')} # {this.state.uuid}
              </Text>
              <Text style={{fontSize: 16, color: '#ffffff', marginRight: 10}}>
                {this.state.fullname}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('UserProfile')}>
              <View
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 50 / 2,
                  borderWidth: 2.5,
                  borderColor: '#ffffff',
                  marginRight: 10,
                  marginBottom: 10,
                  overflow: 'hidden',
                }}>
                <Image
                  style={{width: '100%', height: '100%'}}
                  source={
                    this.props.data && this.props.data.profile_image
                      ? {
                          uri:
                            'https://core.isalamah.com/public/' +
                            this.props.data.profile_image,
                        }
                      : require('../assets/images/user-2.svg')
                  }
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    success: state.success,
    error: state.error,
    message: state.message,
    data: state.user.data,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
