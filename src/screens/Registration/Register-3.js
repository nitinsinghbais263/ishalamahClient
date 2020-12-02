import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  Button,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  BackHandler,
  Dimensions,
} from 'react-native';
import CodeInput from 'react-native-confirmation-code-input';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Register from './style';
import Modal from 'react-native-modal';
import i18n from '../../../lang/i18n';
import {getAdjustedFontSize} from '../../responsive/responsive';
import LoaderButton from '../../components/LoaderButton';

const screenWidth = Math.round(Dimensions.get('window').width);

class Register3 extends Component {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params.data;
    this.state = {
      submit: false,
      loading: false,
      otp: '',
      phone: '',
    };
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

  _onSubmit = () => {
    if (this.state.otp.length == 6) {
      this.setState({loading: true});
      this.props.codeVerification(this, {
        phone: this.params.phone,
        otp: this.state.otp,
      });
    } else {
      alert(i18n.t('invalidVerificationCode'));
    }
  };

  resendOTP = () => {
    this.props.resendOtp({
      otp_to: this.params.phone,
      otp_type: 'phone',
    });
  };

  _onFulfill(code) {
    // TODO: call API to check code here
    // If code does not match, clear input with: this.refs.codeInputRef1.clear()
    if (code == '123456') {
      // Alert.alert(
      //   'Confirmation Code',
      //   'Successful!',
      //   [{text: 'OK'}],
      //   { cancelable: false }
      // );
      this.setState(
        {
          successMesssge: 'Code matched',
          successModal: true,
        },
        () => {
          setTimeout(() => {
            this.setState({successModal: false});
          }, 2000);
        },
      );
    } else {
      // Alert.alert(
      //   'Confirmation Code',
      //   'Code not match!',
      //   [{text: 'OK'}],
      //   { cancelable: false }
      //
      // );
      this.setState(
        {
          errorMesssge: 'Code not match!',
          errorModal: true,
        },
        () => {
          setTimeout(() => {
            this.setState({errorModal: false});
          }, 2000);
        },
      );
      this.refs.codeInputRef1.clear();
    }
  }

  _onFinishCheckingCode2(code) {
    this.setState({otp: code, submit: true});
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.verifyCode != this.props.verifyCode &&
      this.props.verifyCode
    ) {
      this.setState({submit: false, loading: false});
    }
    if (
      prevProps.otpCodeError != this.props.otpCodeError &&
      this.props.otpCodeError
    ) {
      this.setState({submit: false, loading: false});
      Alert.alert(this.props.otpCodeError.error_message);
    }
    if (
      prevProps.resendOtpCodeError != this.props.resendOtpCodeError &&
      this.props.resendOtpCodeError
    ) {
      this.setState({submit: false});
      Alert.alert(this.props.resendOtpCodeError.message);
    }
    if (
      prevProps.resendCode != this.props.resendCode &&
      this.props.resendCode
    ) {
      this.setState({submit: false});
      Alert.alert(this.props.resendCode.message);
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.verifyCode) {
  //     this.setState({submit: false, loading: false});
  //   }
  //   if (nextProps.otpCodeError) {
  //     this.setState({submit: false, loading: false});
  //     Alert.alert(nextProps.otpCodeError.error_message);
  //   }

  //   if (nextProps.resendOtpCodeError) {
  //     this.setState({submit: false});
  //     Alert.alert(nextProps.resendOtpCodeError.message);
  //   }
  //   if (nextProps.resendCode) {
  //     this.setState({submit: false});
  //     Alert.alert(nextProps.resendCode.message);
  //   }
  // }

  render() {
    let {loading} = this.state;
    return (
      <View style={Register.MainContainer}>
        <StatusBar backgroundColor="#2383C3" barStyle="light-content" />
        <SafeAreaView style={Register.SafeAreaView} />
        <View style={Register.Header}>
          <TouchableOpacity
            style={Register.Back}
            onPress={() => this.props.navigation.navigate('Register2')}>
            <Image
              style={{
                ...Register.BackImage,
                transform: [{rotate: i18n.locale === 'ar' ? '180deg' : '0deg'}],
              }}
              source={require('../../assets/images/back.svg')}
            />
          </TouchableOpacity>
          <Text style={Register.HeaderContent}>3 / 4</Text>
        </View>
        <View style={{flex: 1}}>
          <View style={Register.BodyContainer}>
            <Text style={Register.BodyText}>
              {i18n.t('register.verificationCode')}
            </Text>
            <CodeInput
              ref="codeInputRef1"
              codeLength={6}
              keyboardType="numeric"
              secureTextEntry
              activeColor="gray"
              inactiveColor="#F8F8F8"
              // compareWithCode='123456'
              autoFocus={false}
              ignoreCase={true}
              inputPosition="center"
              size={50}
              onFulfill={code => this._onFinishCheckingCode2(code)}
              // onChangeText={(otp) => { }}
              codeInputStyle={{...Register.CodeInput, }}
              containerStyle={{flexDirection: i18n.locale==='ar'?  'row-reverse' : 'row'}}
            />
            <View style={Register.ResendContainer}>
              <Text style={Register.ResendText}>
                {i18n.t('register.didcode')}
              </Text>
              <Text> </Text>
              <TouchableOpacity
                onPress={this.resendOTP}
                style={Register.ResendButton}>
                <Text style={Register.ResendButton}>
                  {i18n.t('register.resend')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <LoaderButton
          style={Register.FooterButton}
          onPress={() => this._onSubmit()}
          text={i18n.t('register.continue')}
          isLoading={loading}
        />

        {/* <TouchableOpacity
          activeOpacity={1}
          style={Register.FooterButton}
          onPress={this._onSubmit()}>
          <Text style={Register.FooterButtonText}>
            {i18n.t('register.continue')}
          </Text>
        </TouchableOpacity> */}

        <SafeAreaView style={{backgroundColor: '#23BDE4'}} />
        <View>
          <Modal
            animationInTiming={1000}
            animationOutTiming={1000}
            animationIn="fadeIn"
            animationOut="fadeOut"
            onBackdropPress={() => {
              this.setState({successModal: false});
            }}
            isVisible={this.state.successModal}>
            <View
              style={{
                width: screenWidth - 20,
                alignSelf: 'center',
                padding: 10,
                paddingVertical: 20,
                borderRadius: 25,
                overFlow: 'hidden',
                backgroundColor: '#23BDE4',
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
                  style={{width: '100%', height: '100%', resizeMode: 'contain'}}
                  source={
                    i18n.locale === 'ar'
                      ? require('../../assets/images/successAR.svg')
                      : require('../../assets/images/ThankYou.svg')
                  }
                />
              </View>
              <View style={{marginTop: 70}}>
                <Text
                  style={{
                    color: '#ffffff',
                    fontSize: getAdjustedFontSize(32),
                    alignSelf: 'center',
                  }}>
                  {i18n.t('success')}
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
                {this.state.successMesssge && (
                  <Text
                    style={{
                      color: '#ffffff',
                      fontSize: getAdjustedFontSize(14),
                      fontWeight: '600',
                      alignSelf: 'center',
                      textAlign: 'center',
                    }}>
                    {this.state.successMesssge}
                  </Text>
                )}
              </View>
            </View>
          </Modal>

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
                  style={{width: '100%', height: '100%', resizeMode: 'contain'}}
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
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    success: state.success,
    error: state.error,
    message: state.message,
    data: state.data,
    verifyCode: state.registration.verifyCode,
    otpCodeError: state.registration.otpCodeError,
    resendOtpCodeError: state.registration.resendOtpCodeError,
    resendCode: state.registration.resendCode,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register3);
