import React, { Component } from 'react';
import { View, Text,TextInput, Image, Button, StatusBar, SafeAreaView, TouchableOpacity, BackHandler ,Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Register from './style';
import Modal from 'react-native-modal';
import i18n from '../../../lang/i18n';
import {getAdjustedFontSize} from '../../responsive/responsive';
const screenWidth = Math.round(Dimensions.get('window').width);

var user_uuid = ""
class Register4 extends Component {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params.data;
  }

  state = {
    user_uuid: "",
    password: "",
    phone: "",
  };



  componentWillReceiveProps(nextProps) {

    if(nextProps.serverError) {
      this.setState({
        errorMesssge: nextProps.serverError,
        errorModal: true,
       },()=>{setTimeout(() => {
       this.setState({errorModal: false })
       }, 2000)})
    }
  }

  componentDidMount() {
    this._loadInitialState()
      BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () =>{
    this.props.navigation.goBack()
    return true;
  }

  componentWillUnmount = () => {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  _loadInitialState = () => {

    AsyncStorage.getItem('USER_UUID').then((value) => {
      user_uuid = value
    })
  }

  onSubmit(){

    this.props.createPassword(this,{
        password: this.state.password,
        user_uuid: user_uuid,
        phone: this.params.phone
      })
  }

  render() {
    return (
      <View style={Register.MainContainer}>
        <StatusBar backgroundColor="#2383C3" barStyle="light-content" />
        <SafeAreaView style={Register.SafeAreaView}></SafeAreaView>
        <View style={Register.Header}>
        <TouchableOpacity style={Register.Back} onPress={() => this.props.navigation.navigate('Register3')}>
          <Image style={{...Register.BackImage,transform:[{rotate: i18n.locale==='ar'? '180deg' : '0deg'}]}} source={require('../../assets/images/back.svg')} />
        </TouchableOpacity>
        <Text style={Register.HeaderContent}>4 / 4</Text>
        </View>
        <View style={{flex:1}}>
        <View style={{padding: i18n.locale==='ar'? 10:0}}>
          <Text style={Register.BodyContent}>{i18n.t('register.password')}</Text>
        </View>
        <TextInput style={{...Register.Input,paddingHorizontal: i18n.locale==='ar'? 10: 0}}
            placeholder={i18n.t('register.typeHere')}
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            onChangeText={(password) => this.setState({password})}/>
        </View>
        <TouchableOpacity activeOpacity={1} style={Register.FooterButton} onPress={() => this.onSubmit()}>
          <Text style={Register.FooterButtonText}>{i18n.t('register.start')}</Text>
        </TouchableOpacity>
        <SafeAreaView style={{backgroundColor: '#23BDE4'}} />
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
    )
  }
};

function mapStateToProps(state) {
  return {
    success: state.success ,
    error: state.error,
    message: state.message,
    data: state.data,
    serverError: state.registration.serverError
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(Register4);
