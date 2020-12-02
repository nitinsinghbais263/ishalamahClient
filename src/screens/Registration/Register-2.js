import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Button,
  Alert,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  BackHandler,
  Dimensions,
  Keyboard,
} from 'react-native';
import Register from './style';
import i18n from '../../../lang/i18n';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
import mobile from './mobile.json';
import CountryCodes from './CountryCodes.json';
import {getAdjustedFontSize} from '../../responsive/responsive';
import LoaderButton from '../../components/LoaderButton';

const screenWidth = Math.round(Dimensions.get('window').width);

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

class Register2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: '',
      errorModal: false,
      phone: '',
    };
  }

  state = {
    countryCode: '',
    phone: '',
    type: 'client',
  };

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

  componentWillMount() {
    AsyncStorage.getItem('language').then(value => {
      this.setState({language: value});
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.registrationData) {
      this.setState({loading: false});
      this.props.navigation.navigate('Register3', {
        data: {
          phone:
            this.props.navigation.state.params.selectedCountry +
            this.state.phone,
          type: 'client',
        },
      });
    }

    if (nextProps.serverError) {
      this.setState(
        {
          errorMesssge: nextProps.serverError,
          errorModal: true,
          loading: true,
        },
        () => {
          setTimeout(() => {
            this.setState({errorModal: false});
          }, 2000);
        },
      );
    }
  }

  validation() {
    const reg = /^[1-9][0-9]+$/;

    if (reg.test(this.state.phone) === false) {
      Alert.alert(i18n.t('sorry'), i18n.t('service.invalidNumber'));
      return false;
    } else {
      this.phoneValidation();
      return true;
    }
  }

  phoneValidation(data) {
    var countries = CountryCodes;
    var currentNumber = {};
    countries.forEach(item => {
      if (
        item.dial_code === this.props.navigation.state.params.selectedCountry
      ) {
        currentNumber = item.code;
      }
    });
    var allMobileNum = mobile;
    this.setState({country: data});

    if (this.state.phone.length !== allMobileNum[currentNumber].length) {
      Alert.alert(i18n.t('sorry'), i18n.t('service.invalidNumber'));
    } else {
      this.onSubmit();
    }
  }

  onSubmit() {
    this.setState({loading: true});
    this.props.registration(this, {
      phone:
        this.props.navigation.state.params.selectedCountry + this.state.phone,
      type: 'client',
    });
  }

  render() {
    const {phone, type, loading} = this.state;
    return (
      <DismissKeyboard>
        <View style={Register.MainContainer}>
          <StatusBar backgroundColor="#2383C3" barStyle="light-content" />
          <SafeAreaView style={Register.SafeAreaView} />
          <View style={Register.Header}>
            <TouchableOpacity
              style={Register.Back}
              onPress={() => this.props.navigation.navigate('Register1')}>
              <Image
                style={{
                  ...Register.BackImage,
                  transform: [
                    {rotate: i18n.locale === 'ar' ? '180deg' : '0deg'},
                  ],
                }}
                source={require('../../assets/images/back.svg')}
              />
            </TouchableOpacity>
            <Text style={Register.HeaderContent}>2 / 4</Text>
          </View>
          <View style={{flex: 1}}>
            <View style={{padding: i18n.locale === 'ar' ? 10 : 0}}>
              <Text style={Register.BodyContent}>
                {i18n.t('register.phone')}
              </Text>
            </View>
            <TextInput
              style={[
                Register.Input,
                {paddingHorizontal: i18n.locale === 'ar' ? 10 : 0},
              ]}
              placeholder={i18n.t('register.placeholder_phone')}
              keyboardType="numeric"
              underlineColorAndroid="transparent"
              onChangeText={phone => this.setState({phone})}
            />
          </View>

          <LoaderButton
            style={Register.FooterButton}
            onPress={() => this.validation()}
            text={i18n.t('register.continue')}
            isLoading={loading}
          />

          {/* <TouchableOpacity
            activeOpacity={1}
            style={Register.FooterButton}
            onPress={() => this.validation()}>
            <Text style={Register.FooterButtonText}>
              {i18n.t('register.continue')}
            </Text>
          </TouchableOpacity> */}

          <View>
            <Modal
              animationInTiming={1000}
              animationOutTiming={1000}
              animationIn="fadeIn"
              animationOut="fadeOut"
              backdropOpacity={0.5}
              onBackdropPress={() => {
                this.setState({errorModal: false});
              }}
              isVisible={this.state.errorModal}>
              <View
                style={{
                  width: screenWidth - 20,
                  alignSelf: 'center',
                  padding: 10,
                  paddingVertical: 20,
                  borderRadius: 25,
                  overFlow: 'hidden',
                  backgroundColor: '#F15E5E',
                }}>
                <View
                  style={{
                    width: 120,
                    height: 120,
                    position: 'absolute',
                    top: -60,
                    alignSelf: 'center',
                  }}>
                  <Image
                    style={{
                      width: '100%',
                      height: '100%',
                      resizeMode: 'contain',
                    }}
                    source={require('../../assets/images/error.svg')}
                  />
                </View>
                <View style={{marginTop: 70}}>
                  <Text
                    style={{
                      color: '#ffffff',
                      fontSize: getAdjustedFontSize(32),
                      alignSelf: 'center',
                    }}>
                    {i18n.t('error')}
                  </Text>
                </View>

                <View
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                    width: screenWidth - 100,
                  }}>
                  {this.state.errorMesssge && (
                    <Text
                      style={{
                        color: '#ffffff',
                        fontSize: getAdjustedFontSize(14),
                        fontWeight: '600',
                        alignSelf: 'center',
                        textAlign: 'center',
                      }}>
                      {this.state.errorMesssge}
                    </Text>
                  )}
                </View>
              </View>
            </Modal>
          </View>
          <SafeAreaView style={{backgroundColor: '#23BDE4'}} />
        </View>
      </DismissKeyboard>
    );
  }
}

function mapStateToProps(state) {
  return {
    success: state.success,
    error: state.error,
    message: state.message,
    data: state.data,
    serverError: state.registration.serverError,
    registrationData: state.registration.data,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register2);
