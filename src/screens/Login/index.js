import React, { Component } from 'react'
import { View,Dimensions, Image, Text, Button, BackHandler, TextInput, SafeAreaView, StatusBar, TouchableOpacity, ImageBackground, ScrollView, Platform, Alert } from 'react-native'
import i18n from '../../../lang/i18n';
import LoginStyle from './style';
import AsyncStorage from '@react-native-community/async-storage';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import SpinnerButton from 'react-native-spinner-button';
import {getAdjustedFontSize} from '../../responsive/responsive';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'


const screenWidth = Math.round(Dimensions.get('window').width);

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state={
      language: '',
      phone: "+966",
      spinnerEnable: false
    }
  }

  state = {
    phone: "+966",
    password: "",
    timezone: "Asia/Kolkata",
    error: false,
    errorText: '',
    spinnerEnable: false
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () =>{
    BackHandler.exitApp();
    return true;
  }

  componentWillUnmount = () => {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillReceiveProps(nextProps) {

    if(nextProps.serverError) {
      this.setState({ errorText: nextProps.serverError,errorMesssge: nextProps.serverError,errorModal: true, spinnerEnable: false},()=>{setTimeout(() => {
      this.setState({errorModal: false})
    }, 2000)});
    }
  }

  componentWillMount(){
		AsyncStorage.getItem('language').then( (value) => {
      this.setState({language: value})
    });
	}

  error = () => {

    alert(this.state.errorText)
    this.setState({ error: false });
  }

  onSubmit(){

    this.setState({spinnerEnable: true})
    AsyncStorage.getItem('OneSignalId').then( (value) => {

      this.setState({oneSignalId: value})
      this.props.login(this,{
        phone: this.state.phone,
        password: this.state.password,
        timezone: this.state.timezone,
        oneSignalId: value
      })
    });

 }

  render() {
    const language = this.state.language;
    const { phone, password, timezone, error, spinnerEnable } = this.state;

    return (

      <View style={LoginStyle.Maincontainer}>
      <StatusBar backgroundColor="#285DB3" barStyle="light-content" />

        {error ? this.error() : null}
        <View style={{width: '100%', height: '100%'}}>
          <KeyboardAwareScrollView bounces={false}
            showsVerticalScrollIndicator={false}
          >
            <ImageBackground source={require('../../assets/images/Login2.svg')} style={LoginStyle.backgroundImage1}>

                <View style={LoginStyle.container}>
                  <View style={LoginStyle.inputContainer}>
                    <TextInput
                        style={LoginStyle.inputs}
                        placeholder={i18n.t('login.email')}
                        placeholderTextColor= 'white'
                        underlineColorAndroid='transparent'
                        value={this.state.phone}
                        onChangeText={phone => this.setState({ phone })}
                    />
                    <Text style={{ color: "red", marginLeft: 16 }}>
                    {this.state.errorMessagesphone}
                  </Text>
                  </View>
                  <View style={LoginStyle.inputContainer}>
                    <TextInput
                        style={LoginStyle.inputs}
                        placeholder={i18n.t('login.password')}
                        placeholderTextColor= 'white'
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        onChangeText={password => this.setState({ password })}
                    />
                  <Text style={{ color: "red", marginLeft: 16 }}>
                    {this.state.errorMessagesphone}
                  </Text>
                </View>

                <View style={LoginStyle.forgetPassword}>
                <TouchableOpacity style={LoginStyle.forgetPassword} onPress={() => this.props.navigation.navigate('ForgetPassword')}>
                    <Text style={LoginStyle.forgetText}>{i18n.t('login.forget')}</Text>
                </TouchableOpacity>
                </View>

                <View style={{width: '100%', height: 50, backgroundColor: "#00b5ec", borderRadius:10 }}>
                {
                  !spinnerEnable ?
                  <TouchableOpacity style={[LoginStyle.buttonContainer, LoginStyle.loginButton]} onPress={() => this.onSubmit()}>
                      <Text style={LoginStyle.loginText}>{i18n.t('login.login')} </Text>
                  </TouchableOpacity>

                :
                    <View style={{width: '100%', height: 50}}>
                      <SpinnerButton
                        buttonStyle={{width: '100%', height: 50, backgroundColor: "#00b5ec", borderRadius:10}}
                        isLoading={spinnerEnable}
                        indicatorCount={10}
                        size={8}
                        spinnerType='DotIndicator'
                      />
                  </View>
                }
                </View>

              </View>
              <View style={LoginStyle.registerContainer}>
              <Text style={LoginStyle.register}>{i18n.t('login.account')}</Text>
              <Text> </Text>
              <TouchableOpacity style={LoginStyle.registerText} onPress={() => this.props.navigation.navigate('Register1')}>
                  <Text style={LoginStyle.registerText}>{i18n.t('login.register')}</Text>
              </TouchableOpacity>
              </View>

            </ImageBackground>
          </KeyboardAwareScrollView>
      </View>
      <View>
        <Modal
          animationInTiming={1000}
          animationOutTiming={1000}
          animationIn="fadeIn"
          animationOut="fadeOut"
          backdropOpacity={0.5}
          onBackdropPress={()=>{this.setState({errorModal: false})}}
          isVisible={this.state.errorModal}>
            <View
              style={{
                width: screenWidth-20,
                alignSelf: 'center',
                padding: 10,
                paddingVertical: 20,
                borderRadius: 25,
                overFlow: 'hidden',
                backgroundColor: '#F15E5E'
              }}>

              <View style={{
                  width: 120,
                  height: 120,
                  position: 'absolute',
                  top: -60,
                  alignSelf: 'center'
                }}>
                  <Image
                  style={{ width: '100%', height: '100%',resizeMode: 'contain'}}
                  source={require('../../assets/images/error.svg')}
                  />
              </View>
                <View style={{marginTop: 70}}>
                  <Text style={{ color: '#ffffff', fontSize: getAdjustedFontSize(32), alignSelf: 'center',}}>
                    {i18n.t('error')}
                  </Text>
                </View>

                <View style={{alignSelf: 'center',justifyContent: 'center',alignItems: 'center',marginTop: 20,width: screenWidth-100}}>
                {this.state.errorMesssge &&
                  <Text style={{ color: '#ffffff', fontSize: getAdjustedFontSize(14), fontWeight: '600', alignSelf: 'center',textAlign: 'center' }}>
                    {this.state.errorMesssge}
                  </Text>
                }
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
    data: state.data,
    serverError: state.logIn.serverError
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(LoginScreen);
