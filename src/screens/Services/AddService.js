import React, { Component } from 'react';
import { View, Text, TextInput, Image, Button, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, BackHandler } from 'react-native';
import i18n from '../../../lang/i18n'
import AsyncStorage from '@react-native-community/async-storage';
import {getAdjustedFontSize} from '../../responsive/responsive';


export default class AddService extends Component {
  constructor(props) {
    super(props);
    this.state={
      isModalVisible: false,
    }
  }

  toggleModal = () => {

    this.setState({ isModalVisible: !this.state.isModalVisible});
  };

  componentWillMount(){
    AsyncStorage.getItem('language').then( (value) => {
      this.setState({language: value})
    });
  }

  phoneValidation(data){
  		var countries = CountryCodes;
  		var currentNumber = {}
  		countries.forEach((item)=>{
  			if(item.dial_code === this.state.selectedCountry)
  			{
  				currentNumber = item.code
  			}
  		})
  		var allMobileNum = mobile;
  		this.setState({country: data})
  		if(this.state.phone.length !== allMobileNum[currentNumber].length){
        this.popUp()
  		}else{
  		{this.props.onNextPress({
        fullname: this.state.fullname,
        phone: this.state.selectedCountry+this.state.phone,
        email: this.state.email,
        license: this.state.license })
      }
  		}
  }

  popUp = () => {
  this.toggleModal()
  setTimeout(() => {
    this.setState({
    isModalVisible: false
    })
  }, 2000);
}

  render() {
    const that = this
    return (
      <View style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{alignItems: 'center', paddingTop:10}}>
          <Text style={{fontSize: getAdjustedFontSize(18), color: '#707070'}}>{i18n.t('service.step')} 1</Text>
          <Text style={{fontSize: getAdjustedFontSize(22), color: '#285DB3', fontWeight: '600',  }}>{i18n.t('service.contractForm')}</Text>
        </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={{ fontSize: 18, fontWeight:'600', color:'#888', marginTop: 20, padding: 10 }}>{i18n.t('service.maintenanceService')}</Text>
      </View>
    {/*  <View style={{ width: '100%', height: 70,padding: 10 , marginTop: 10, }}>
          <Text style={{ color:'#888' }}>{i18n.t('service.serviceCost')}:</Text>

            <View style={{flexDirection: 'row', paddingTop: 5}}>
              <Text style={{ fontSize: 28, fontWeight:'600', color:'#285DB3',  }}>5,300.00</Text>
              <Text style={{ color:'#888', marginTop: 5 }}>SR</Text>
            </View>
         </View>
      */}

        <View style={{flex:1, padding:10}}>

          <Text style={{ color:'#888', textAlign: 'justify' }}>Information You Provide to Us
              We collect information you provide directly to us through your access or use of the Services, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: your name, email address, phone number, postal address, profile picture, payment method, financial and credit card information, and other information you choose to provide.

              Please note that we do not knowingly collect, keep or maintain personal information from children under the age of 18 through the Services, as we require that all users represent to us that they are at least 18 years old.

              Information We Collect Through Your Use of Our Services
              When you use our Services, we collect personal information (i.e. information that could be used to contact you directly such as full name, postal address, phone number, credit/debit card information, or email address) (“Personal Information”) and demographic information (i.e. information that you submit, or that we collect, that is not personal information; this may include, but is not limited to, post code, hometown, gender, username, device information, including the type of mobile device you use, a unique device identifier (for example, your device’s IMEI number, the MAC address of the device’s wireless network interface, or the mobile phone number used by the device), mobile network information, your mobile operating system, the type of mobile browser you use, time zone setting, device location, IP address, SMS data, transaction information, age/birth date, browsing history information, searching history information, and registration history information) (“Demographic Information” and, together with Personal Information, “Personal Data”).

              We also use GPS technology to determine your current location. Some of our location-enabled Services require your personal data for the feature to work. If you wish to use the particular feature, you will be asked to consent to your data being used for this purpose.
          </Text>
        </View>
      </ScrollView>
      <TouchableOpacity activeOpacity={1} style={{ width: '100%', height: 50, padding: 10, justifyContent:'center',  backgroundColor: '#285DB3',flexDirection: 'row',justifyContent: 'space-between' }} onPress={() => {that.props.onNextPress()}}>
        <View>
          <Text style={{ color:'#ffffff', fontSize: 18, fontWeight:'bold', }}>{i18n.t('service.accept')}</Text>
        </View>
        <View>
          <Image style={{width: 25, height: 25, alignSelf: 'center', resizeMode: 'contain', transform: [{ rotate: this.state.language == 'ar' ? '180deg' : '0deg' }]}} source={require('../../assets/images/Next.svg')} />
        </View>
      </TouchableOpacity>
      <SafeAreaView style={{backgroundColor: "#285DB3"}}/>
      </View>
    )
  }
};
