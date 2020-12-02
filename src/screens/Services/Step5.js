import React, { Component } from 'react';
import { View, Text, TextInput, Image, Button, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getAdjustedFontSize} from '../../responsive/responsive';
import i18n from '../../../lang/i18n'

class Step5 extends Component {
  constructor(props) {
    super(props);
    this.state={
      language: '',
    };
  }
  // coordinate: {lat: this.state.locationLat, lng: this.state.locationLng}

  state = {
    token: "",
    fullname: "",
    phone: "",
    email: "",
    businessLicense:"",
    addresslable: "",
    address1: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    startDtae: "",
    reportFileds:[]
  };

  onSubmit(){
    const _this = this

    AsyncStorage.getItem('TOKEN').then((value) => {
      _this.setState({token: value})
      _this.props.createService(this,{
        token: _this.state.token,
        fullname: _this.props.step1.fullname,
        phone: _this.props.step1.phone,
        email: _this.props.step1.email,
        businessLicense: _this.props.step1.license,
        addresslable: _this.props.step2.location,
        address1: _this.props.step2.address1,
        city: _this.props.step2.cityId,
        state: _this.props.step2.stateId,
        country: _this.props.step2.countryId,
        zipcode: _this.props.step2.zipCode,
        startDate: _this.props.step2.startDate,
        coordinates: {lat: _this.props.step3.region.latitude, lng: _this.props.step3.region.longitude},
        reportFileds: _this.props.step4.reportFileds,
      })
    })
  }

  componentWillMount(){
		AsyncStorage.getItem('language').then( (value) => {
      this.setState({language: value})
    });
	}

  componentWillReceiveProps(nextProps) {
    const that = this;
    if(nextProps.data && nextProps.data.status ==="success") {

      this.props.navigation.navigate("ServicePurchare",{message: nextProps.data.message})
      // this.props.onNextPress()
       // that.props.navigation.replace('ServicesList');
      }
  }

  render() {
    const { language } = this.state;
    const screenWidth = Math.round(Dimensions.get('window').width);
    const { step1, step2, step3, step4 } = this.props;
    return (
      <View style={{flex:1}}>

      <ScrollView style={{flex:1}}>
      <View style={{alignItems: 'center', paddingTop:10}}>
        <Text style={{fontSize: getAdjustedFontSize(18), color: '#707070'}}>{i18n.t('service.step')} 6</Text>
        <Text style={{fontSize: getAdjustedFontSize(22), color: '#285DB3', fontWeight: '600',  }}>{i18n.t('service.review')}</Text>
      </View>

        <Text style={{ fontSize: getAdjustedFontSize(16), alignSelf: 'flex-start', marginTop: 20, marginLeft: 10 }}>{i18n.t('service.fullname')}</Text>
        <TextInput
          style={[styles.text, {textAlign: this.state.language == "ar" ? 'right' : 'left'}]}
          value={step1 && step1.fullname}
          editable={false}
          underlineColorAndroid='transparent'
        />

        <Text style={{ fontSize: getAdjustedFontSize(16), alignSelf: 'flex-start', marginTop: 25, marginLeft: 10 }}>{i18n.t('service.phone')}</Text>
        <TextInput
          style={[styles.text, {textAlign: this.state.language == "ar" ? 'right' : 'left'}]}
          value={step1 && step1.phone}
          editable={false}
          underlineColorAndroid='transparent'
        />

        <Text style={{ fontSize: getAdjustedFontSize(16), alignSelf: 'flex-start', marginTop: 25, marginLeft: 10 }}>{i18n.t('service.email')}</Text>
        <TextInput
          style={[styles.text, {textAlign: this.state.language == "ar" ? 'right' : 'left'}]}
          value={step1 && step1.email}
          editable={false}
          underlineColorAndroid='transparent'
        />

        <Text style={{ fontSize: getAdjustedFontSize(16), alignSelf: 'flex-start', marginTop: 25, marginLeft: 10 }}>{i18n.t('service.businessLicense')}</Text>
        <TextInput
          style={[styles.text, {textAlign: this.state.language == "ar" ? 'right' : 'left'}]}
          value={step1 && step1.license}
          editable={false}
          underlineColorAndroid='transparent'
        />

        <Text style={{ fontSize: getAdjustedFontSize(16), alignSelf: 'flex-start', marginTop: 25, marginLeft: 10 }}>{i18n.t('service.addressLable')}</Text>
        <TextInput
          style={[styles.text, {textAlign: this.state.language == "ar" ? 'right' : 'left'}]}
          value={step2 && step2.location}
          editable={false}
          underlineColorAndroid='transparent'
        />

        <Text style={{ fontSize: getAdjustedFontSize(16), alignSelf: 'flex-start', marginTop: 25, marginLeft: 10 }}>{i18n.t('service.address')}</Text>
        <TextInput
          style={[styles.text, {textAlign: this.state.language == "ar" ? 'right' : 'left'}]}
          value={step2 && step2.address1}
          editable={false}
          underlineColorAndroid='transparent'
        />


        <Text style={{ fontSize: getAdjustedFontSize(16), alignSelf: 'flex-start', marginTop: 25, marginLeft: 10 }}>{i18n.t('service.city')}</Text>
        <TextInput
          style={[styles.text, {textAlign: this.state.language == "ar" ? 'right' : 'left'}]}
          value={step2 && step2.cityName}
          editable={false}
          underlineColorAndroid='transparent'
        />


        <Text style={{ fontSize: getAdjustedFontSize(16), alignSelf: 'flex-start', marginTop: 25, marginLeft: 10 }}>{i18n.t('service.state')}</Text>
        <TextInput
          style={[styles.text, {textAlign: this.state.language == "ar" ? 'right' : 'left'}]}
          value={step2 && step2.stateName}
          editable={false}
          underlineColorAndroid='transparent'
        />


        <Text style={{ fontSize: getAdjustedFontSize(16), alignSelf: 'flex-start', marginTop: 25, marginLeft: 10 }}>{i18n.t('service.country')}</Text>
        <TextInput
          style={[styles.text, {textAlign: this.state.language == "ar" ? 'right' : 'left'}]}
          value={step2 && step2.countryName}
          editable={false}
          underlineColorAndroid='transparent'
        />

        <Text style={{ fontSize: getAdjustedFontSize(16), alignSelf: 'flex-start', marginTop: 25, marginLeft: 10 }}>{i18n.t('service.zipCode')}</Text>
        <TextInput
          style={[styles.text, {textAlign: this.state.language == "ar" ? 'right' : 'left'}]}
          value={step2 && `${step2.zipCode}`}
          editable={false}
          underlineColorAndroid='transparent'
        />

        <Text style={{ fontSize: getAdjustedFontSize(16), alignSelf: 'flex-start', marginTop: 25, marginLeft: 10 }}>{i18n.t('service.serviceStart')}</Text>
        <TextInput
          style={[styles.text, {textAlign: this.state.language == "ar" ? 'right' : 'left'}]}
          value={step2 && step2.startDate}
          editable={false}
          underlineColorAndroid='transparent'
        />

        <Text style={{ fontSize: getAdjustedFontSize(16), alignSelf: 'flex-start', marginTop: 25, marginLeft: 10 }}>{i18n.t('service.selectedItems')}</Text>
        <View style={{ backgroundColor: '#F8F8F8', width: '100%', marginTop: 15,borderBottomColor: '#F8F8F8' }}>
          {
          step4.reportFileds && step4.reportFileds.map((data) => {
            return (
              <View>
              {
                data.count != 0 &&
                <View>
                <View style={{padding:10, alignItems: 'center'}}>
                <Text style={{ fontSize: getAdjustedFontSize(14), alignSelf: 'flex-start', }}>Item: {data.label}</Text>
                <Text style={{ fontSize: getAdjustedFontSize(12), alignSelf: 'flex-start'}}>Counts: {data.count}</Text>
                </View>
                <View style={{width: '100%', height: 1, backgroundColor: '#FFFFFF'}}></View>
                </View>
              }
              </View>
            )
          })
        }
        </View>
        <View style={{height: 50}}></View>

        </ScrollView>
          {
            step4.cost ?
            <TouchableOpacity activeOpacity={1} style={{ width: '100%', height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: '#285DB3' }} onPress={() => this.onSubmit()}>
              <View style={{ width: '100%', height: 50, alignItems: 'center',paddingHorizontal: 20, justifyContent: 'space-between', flexDirection:'row'}}>
                <Text style={{ color: '#ffffff', fontSize: getAdjustedFontSize(18)}}>{step4&& step4.cost.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} SR</Text>
                <Text style={{ color: '#ffffff', fontSize: getAdjustedFontSize(18)}}>{i18n.t('service.purchase')}</Text>
              </View>
            </TouchableOpacity>
            :

            <TouchableOpacity activeOpacity={1} style={{ width: '100%', height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: '#285DB3' }} onPress={() => this.onSubmit()}>
              <View style={{ width: '100%', height: 50, alignItems: 'center', justifyContent: 'center', flexDirection:'row'}}>
                <Text style={{ color: '#ffffff', fontSize: getAdjustedFontSize(18)}}>{i18n.t('service.submitReport')}</Text>
              </View>
            </TouchableOpacity>

          }
          <SafeAreaView style={{backgroundColor: '#285DB3'}} />
      </View>

    )
  }
};



function mapStateToProps(state) {

  return {
    success: state.success,
    error: state.error,
    message: state.message,
    data: state.service.service,
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Step5);

const styles = StyleSheet.create({
  text: { color: '#707070', backgroundColor: '#F8F8F8', width: '100%', height: 45, paddingLeft: 10, marginTop: 10, fontSize: getAdjustedFontSize(16), borderBottomColor: '#F8F8F8' },
});
