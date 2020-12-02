/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component, Fragment, useState, useEffect} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  TextInput,
  Image,
  StatusBar,
  DeviceEventEmitter,
  NativeModules,
  Linking,
  NativeEventEmitter,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Platform,
  Keyboard
} from 'react-native';


import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RNRestart from 'react-native-restart';
import Header from '../../components/Header';
import i18n from '../../../lang/i18n'
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);



class Payment extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
      checkoutId:"",
      fullname: 'Search',
      uuid: 'success',
      image: 'transaction successfull'
    };
  }

  componentWillMount(){
    AsyncStorage.getItem('language').then( (value) => {
      this.setState({language: value})
    });
  }

  componentDidMount() {
    const that = this
    var deeplinikingURL = null

    Linking.addEventListener('url', e => {
      console.log('url', e);
      AsyncStorage.getItem('DEEPLINKING').then((value) => {
        deeplinikingURL = value
        console.log("DEEPLINKING GET:", value )
      })
      const {url} = e;

      if (url && url!== deeplinikingURL) {
        console.log("deeplinikingURL:", deeplinikingURL )
        console.log("URL:", url )

        let regex = /[?&]([^=#]+)=([^&#]*)/g,
          params = {},
          match;
        while ((match = regex.exec(url))) {
          params[match[1]] = match[2];
          console.log("match",match[1], match[2]);
        }

        const {id, resourcePath} = params;

        deeplinikingURL= url;
        AsyncStorage.setItem('DEEPLINKING', deeplinikingURL)
        console.log("DEEPLINKING SET:", deeplinikingURL )
        this.fetchPaymentStatus(resourcePath);
        console.log("resourcePath:",resourcePath)
        // RNRestart.Restart();

      } else {
        this.fetchCheckoutId();
      }
    });

    Linking.getInitialURL().then(url => {
      if (url && url!== deeplinikingURL) {
        let regex = /[?&]([^=#]+)=([^&#]*)/g,
          params = {},
          match;
        while ((match = regex.exec(url))) {
          params[match[1]] = match[2];
          console.log("match",match[1], match[2]);
        }
        const {id, resourcePath} = params;
        deeplinikingURL= url;
        this.fetchPaymentStatus(resourcePath);
      } else {
        this.fetchCheckoutId();
      }
    });

    //const subscription = eventEmitter.addListener('transactionStatus',(e)=> {that.onSessionConnect(e)});
  }

  onSessionConnect = event => {

        console.log("Session connected",event);
        Linking.openURL(event.redirectUrl);
        subscription.remove();
      };

  fetchPaymentStatus = async resPath => {
        try {
          const response = await axios({
            method: 'post',
            url: 'http://saib.gate2play.com/hussam/payment.php',
            headers: {},
            data: {
              method: 'check_payment',
              resourcePath: resPath,
            },
          });
          //const checkoutId = response.data.checkoutId;
          console.log("response:",response);
          /// setCheckoutId(checkoutId);
        } catch (err) {
          console.log(err);
          return err;
        }
      };

  fetchCheckoutId = async () => {

        try {
          const response = await axios({
            method: 'post',
            url: 'https://staging.farsi.core.dgera.com/api/v1/initiate-transaction',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: this.props.navigation.state.params.token
            },
            data: {
              invoiceUuid: this.props.navigation.state.params.invoiceUuid
            },
          });
          var checkoutId = response.data.checkoutId;
          // const checkoutId = 'FD5E51F093982DAAD740C09BC17E8527.uat01-vm-tx03';
          //  console.log(checkoutId);
          // setCheckoutId(checkoutId);

          this.setState({checkoutId : checkoutId})
        } catch (err) {
          console.log(err);
          return err;
        }
      };

  onPay = () => {
    const that = this
        console.log('onPay');
        const {form} = that.state

    if(!form) {
      Alert.alert(i18n.t('sorry'), i18n.t('cardDetails'))
    } else {
        var number = form.values.number.replace(/\s/g, "")
        var expiryMonth = form.values.expiry.substring(0, 2)
        var expiryYear = form.values.expiry.substring(3, 5)
        const paymentParams = {
          checkoutID: that.state.checkoutId,
          paymentBrand: form.values && form.values.type && form.values.type.toUpperCase(),
          cardNumber: number,
          holderName: form.values.name,
          expiryMonth: expiryMonth,
          expiryYear: "20"+expiryYear,
          cvv: form.values.cvc,
        };
        console.log("card details",paymentParams);
        if(form.status.number == "incomplete"){

          Alert.alert(i18n.t('sorry'), i18n.t('cnRequired'))
        }else if (form.status.number == "invalid"){
          Alert.alert(i18n.t('sorry'), i18n.t('cnInvalid'))
        }else if (form.status.expiry == "incomplete"){
          Alert.alert(i18n.t('sorry'), i18n.t('exRequired'))
        }else if (form.status.expiry == "invalid"){
          Alert.alert(i18n.t('sorry'), i18n.t('exInvalid'))
        }else if (form.status.cvc == "incomplete"){
          Alert.alert(i18n.t('sorry'), i18n.t('cvvRequired'))
        }else if (form.status.cvc == "invalid"){
          Alert.alert(i18n.t('sorry'), i18n.t('cvvInvalid'))
        }else if (form.status.name == "incomplete"){
          Alert.alert(i18n.t('sorry'), i18n.t('chRequired'))
        }else if (form.status.name == "invalid"){
          Alert.alert(i18n.t('sorry'), i18n.t('chInvalid'))
        }else{
          console.log("Card Details",paymentParams)
         // NativeModules.Hyperpay.transactionPayment(paymentParams);
        }

      }

    };

  componentWillReceiveProps(nextProps) {

        if(nextProps.userdata) {

          this.setState({
            fullname: nextProps.userdata.full_name,
            uuid: nextProps.userdata && nextProps.userdata.uuid.substr(nextProps.userdata.uuid.length - 5),
            image: nextProps.userdata.profile_image
          })
        }
      }

  _onChange = (form) => {
    
    this.setState({form: form})
    return{
      valid: true,
      values: {
        name: "Sam",
      	number: "4242 4242",
      	expiry: "06/19",
      	cvc: "300",
      	type: "visa",
      },
      status: {
        name: "incomplete",
        number: "incomplete",
        expiry: "incomplete",
        cvc: "incomplete",
      },
    }
  };

  render () {
    return (
      <DismissKeyboard>
        <Fragment>
         <View style={{flex:1}}>

           <Header navigation={this.props.navigation} />
           <KeyboardAwareScrollView
             bounces={false}
             scrollEnabled
             contentContainerStyle={{flexGrow: 1}}
            >
            <View style={{paddingHorizontal: 10,paddingVertical:10, marginTop: 10}}>
              <Text style={{fontSize: 24, fontWeight:'900', fontFamily:'SegoeUI'}}>{i18n.t('paymentInfo')}</Text>
            </View>
            <View style={{paddingHorizontal: 10,marginBottom:20}}>
              <Text style={{fontSize: 12, fontFamily:'SegoeUI', color:'#707070'}}>{i18n.t('fill')}</Text>
            </View>
            <CreditCardInput
              onChange={(val)=>this._onChange(val)}
              requiresName={true}
              requiresCVC={true}
              allowScroll={true}
            />
</KeyboardAwareScrollView>
           <TouchableOpacity
             activeOpacity={1}
             onPress={this.onPay}
             style={{ width: '100%', height: 50, alignSelf: 'center', alignItems:'center', justifyContent:'center', position: 'absolute', bottom: 0,backgroundColor: '#2383C3' }}
           >
             <View style={{ alignItems: 'center', justifyContent: 'center'}}>
               <Text style={{fontSize:16, fontWeight:'bold', color:'#FFFFFF'}}>PAY NOW</Text>
             </View>
           </TouchableOpacity>
         </View>
         <SafeAreaView style={{backgroundColor: '#2383C3'}}/>
        </Fragment>
      </DismissKeyboard>
     );
  }
}

function mapStateToProps(state) {

  return {
    success: state.success ,
    error: state.error,
    message: state.message,
    userdata: state.user.data,
    serverError: state.invoices.serverError
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Payment);
