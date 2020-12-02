import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
} from 'react-native';
import styles from './Style';
import CodeInput from 'react-native-confirmation-code-input';
import AsyncStorage from '@react-native-community/async-storage';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import i18n from '../../../lang/i18n';
import {getAdjustedFontSize} from '../../responsive/responsive';
import Modal from 'react-native-modal';

const screenWidth = Math.round(Dimensions.get('window').width);

class ForgetPassword2 extends Component {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params.data;
    this.state = {
      code: '',
      language: '',
    };
  }

  state = {
    phone: '',
    otp: '',
  };

  onSubmit() {
    var {code} = this.state;

    if (code && code.length == 6) {
      const user = this.props.navigation.state.params.user;

      this.setState({loading: true});
      this.props.verifyOtp({
        otp: code,
        user: user,
      });
    } else {
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
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.verifyOtpData != this.props.verifyOtpData) {
      if (this.props.verifyOtpData) {
        const user = this.props.navigation.state.params.user;
        var {code} = this.state;
        this.setState({submit: false});
        this.props.navigation.navigate('ForgetPassword3', {
          user: user,
          otp: code,
        });
      }
    }

    if (prevProps.verifyOtpError != this.props.verifyOtpError) {
      if (this.props.verifyOtpError) {
        this.setState({submit: false});
        if (this.props.verifyOtpError.errors) {
          Alert.alert(this.props.verifyOtpError.errors[0]);
        } else if (this.props.verifyOtpError.message) {
          Alert.alert(this.props.verifyOtpError.message);
        } else {
          Alert.alert(i18n.t('somethingWentWrong'));
        }
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.resendOtpCodeError) {
      this.setState({submit: false});
      Alert.alert(nextProps.resendOtpCodeError.message);
    }
    if (nextProps.resendCode) {
      this.setState({submit: false});
      Alert.alert(nextProps.resendCode.message);
    }
  }

  _onFulfill = code => {
    // TODO: call API to check code here
    // If code does not match, clear input with: this.refs.codeInputRef1.clear()

    if (code && code.length == 6) {
      this.setState({code: code});

      // const getInfo = this.props.navigation.state.params.user;
      // this.props.navigation.navigate('ForgetPassword3', {
      //   getInfo: getInfo,
      //   otp: code,
      // });
      // Actions.forgetpassword3({getInfo: getInfo})
    } else {
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
    }

    // if (code == '123456') {
    //   // Alert.alert(
    //   // 	'Confirmation Code',
    //   // 	'Successful!',
    //   // 	[{text: 'OK'}],
    //   // 	{ cancelable: false }
    //   // );
    //   this.setState(
    //     {
    //       successMesssge: 'Verification Successfully',
    //       successModal: true,
    //     },
    //     () => {
    //       setTimeout(() => {
    //         this.setState({successModal: false});
    //       }, 2000);
    //     },
    //   );
    // } else {
    //   // Alert.alert(
    //   // 	'Confirmation Code',
    //   // 	'Code not match!',
    //   // 	[{text: 'OK'}],
    //   // 	{ cancelable: false }
    //   // );
    //   this.setState(
    //     {
    //       errorMesssge: 'Verification  Failed!',
    //       errorModal: true,
    //     },
    //     () => {
    //       setTimeout(() => {
    //         this.setState({errorModal: false});
    //       }, 2000);
    //     },
    //   );

    //   //this.refs.codeInputRef1.clear();
    // }
  };

  _onFinishCheckingCode1(isValid) {
    console.log(isValid);
    if (!isValid) {
      // Alert.alert(
      // 	'Confirmation Code',
      // 	'Code not match!',
      // 	[{text: 'OK'}],
      // 	{ cancelable: false }
      // );
      this.setState(
        {
          errorMesssge: 'Verification  Failed!',
          errorModal: true,
        },
        () => {
          setTimeout(() => {
            this.setState({errorModal: false});
          }, 2000);
        },
      );
    } else {
      // Alert.alert(
      // 	'Confirmation Code',
      // 	'Successful!',
      // 	[{text: 'OK'}],
      // 	{ cancelable: false }
      // );
      this.setState(
        {
          successMesssge: 'Verification Successfully',
          successModal: true,
        },
        () => {
          setTimeout(() => {
            this.setState({successModal: false});
          }, 2000);
        },
      );
    }
  }

  _onFinishCheckingCode2(isValid, code) {
    if (!isValid) {
      // Alert.alert(
      // 	'Confirmation Code',
      // 	'Code not match!',
      // 	[{text: 'OK'}],
      // 	{ cancelable: false }
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
    } else {
      // this.setState({ otp:code });
      // Alert.alert(
      // 	'Confirmation Code',
      // 	'Successful!',
      // 	[{text: 'OK'}],
      // 	{ cancelable: false }
      // );
      this.setState(
        {
          successMesssge: 'Code matched',
          successModal: true,
          otp: code,
        },
        () => {
          setTimeout(() => {
            this.setState({successModal: false});
          }, 2000);
        },
      );
    }
  }

  onChangeCode(code) {
    this.setState({
      code: code,
    });
  }

  resendOTP = () => {
    this.props.resendOtp({
      otp_to: this.props.navigation.state.params.user,
      otp_type: this.props.navigation.state.params.type,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={{backgroundColor: '#2383C3'}}>
          <StatusBar backgroundColor="#2383C3" barStyle="light-content" />
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              height: 60,
              backgroundColor: '#23BDE4',
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
                source={require('../../assets/images/back.svg')}
              />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                position: 'absolute',
                right: 0,
                top: 20,
              }}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 16, color: '#ffffff', marginRight: 10}}>
                  {i18n.t('forgotPassword')}
                </Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
        <View style={styles.mainView}>
          <View>
            <View>
              <Text style={styles.codeTitle}>{i18n.t('verificationCode')}</Text>
            </View>
            <View style={styles.codeView}>
              <CodeInput
                //ref="codeInputRef2"
                codeLength={6}
                keyboardType="numeric"
                secureTextEntry
                activeColor="gray"
                inactiveColor="#F8F8F8"
                autoFocus={false}
                ignoreCase={true}
                inputPosition="center"
                size={50}
                onFulfill={code => this._onFulfill(code)}
                containerStyle={{marginTop: 15}}
                codeInputStyle={styles.codeInput}
              />
            </View>
            <View style={styles.resendView}>
              <Text style={styles.firstText}>{i18n.t('didcode')}</Text>
              <TouchableOpacity onPress={this.resendOTP} activeOpacity={0.7}>
                <Text style={styles.resendText}>{i18n.t('resend')}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.buttonView}>
            <View style={styles.continueButtonBG}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => this.onSubmit()}
                //onPress={() => {Actions.forgetpassword3()}}
                style={styles.continueButton}>
                <Text style={styles.buttonText}>{i18n.t('continue')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <SafeAreaView style={{backgroundColor: '#23BDE4'}} />
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
                      : require('../../assets/images/successImage.svg')
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
          {/* error modal  */}

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
                  source={require('../../assets/images/cancel.svg')}
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
    resendOtpCodeError: state.registration.resendOtpCodeError,
    resendCode: state.registration.resendCode,
    verifyOtpError: state.registration.verifyOtpError,
    verifyOtpData: state.registration.verifyOtpData,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgetPassword2);
