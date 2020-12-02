import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import styles from './Style';
import AsyncStorage from '@react-native-community/async-storage';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import i18n from '../../../lang/i18n';
import {getAdjustedFontSize} from '../../responsive/responsive';
import Modal from 'react-native-modal';
import DataLoader from '../../components/DataLoader';

const screenWidth = Math.round(Dimensions.get('window').width);

class ForgetPassword3 extends Component {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params.data;
    this.state = {
      password: '',
      language: '',
      loading: false,
    };
  }

  state = {
    user_uuid: '',
    phone: '',
  };

  componentDidMount() {
    this._loadInitialState();
  }

  _loadInitialState = () => {
    AsyncStorage.getItem('USER_UUID').then(value => {
      user_uuid = value;
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.serverError != this.props.serverError) {
      console.log(this.props.serverError);
      if (this.props.serverError) {
        if (this.props.serverError.errors[0]) {
          Alert.alert(
            'Ah!',
            this.props.serverError.errors[0],
            [{text: 'OK', onPress: () => this.setState({loading: false})}],
            {cancelable: false},
          );
        }
      }
    }
    if (prevProps.serverResponse != this.props.serverResponse) {
      if (this.props.serverResponse) {
        try {
          Alert.alert(
            'Success',
            this.props.serverResponse.message,
            [
              {
                text: 'OK',
                onPress: () => this.gotoLogin(),
              },
            ],
            {cancelable: false},
          );
        } catch (err) {
          this.gotoLogin();
        }
      }
    }
  }

  gotoLogin = () => {
    this.setState({loading: false}, () =>
      this.props.navigation.navigate('Login'),
    );
  };

  //   componentWillReceiveProps(nextProps) {
  //     if (nextProps.serverError) {
  //       console.log(nextProps.serverError);
  //       alert(nextProps.serverError.errors[0]);
  //
  //     }
  //   }

  onSubmit() {
    if (this.state.password === this.state.conformPassword) {
      const user = this.props.navigation.state.params.getInfo;
      const otp = this.props.navigation.state.params.otp;

      this.setState({loading: true});
      this.props.resetPassword(this, {
        user: user,
        otp: otp,
        password: this.state.password,
      });
    } else {
      this.setState(
        {
          errorMesssge: 'Password Not Matched',
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

  componentWillMount() {
    AsyncStorage.getItem('language').then(value => {
      this.setState({language: value});
    });
  }

  render() {
    const {language, loading} = this.state;

    return (
      <View style={styles.container}>
        <SafeAreaView style={{backgroundColor: '#2383C3'}}>
          <StatusBar backgroundColor="#2383C3" barStyle="light-content" />
          {loading ? <DataLoader isVisible={true} /> : null}
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
            <View style={{...styles.headerView, padding: 10}}>
              <Text style={styles.headerText2}>{i18n.t('setPassword')}</Text>
            </View>

            <View style={styles.countryView}>
              <Text style={styles.title}>{i18n.t('enterPassword')}</Text>
            </View>

            <View style={styles.pickerView}>
              <TextInput
                value={this.state.password}
                onChangeText={password => {
                  this.setState({
                    password: password,
                  });
                }}
                style={[
                  styles.numberInput,
                  {textAlign: language == 'ar' ? 'right' : 'left'},
                ]}
                secureTextEntry={true}
                placeholder={i18n.t('typeHere')}
              />
            </View>

            <View style={{...styles.countryView, marginTop: 15}}>
              <Text style={styles.title}>{i18n.t('confirmPassword')}</Text>
            </View>

            <View style={styles.pickerView}>
              <TextInput
                value={this.state.conformPassword}
                onChangeText={text => {
                  this.setState({
                    conformPassword: text,
                  });
                }}
                style={[
                  styles.numberInput,
                  {textAlign: language == 'ar' ? 'right' : 'left'},
                ]}
                secureTextEntry={true}
                placeholder={i18n.t('typeHere')}
              />
            </View>
          </View>
          <View style={styles.buttonView}>
            <View style={styles.continueButtonBG}>
              <TouchableOpacity
                activeOpacity={1}
                style={styles.continueButton}
                onPress={() => this.onSubmit()}
                // onPress={()=>{Actions.login()}}
              >
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
                  source={require('../../assets/images/cross.svg')}
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
    serverError: state.registration.serverError,
    serverResponse: state.registration.data,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgetPassword3);
