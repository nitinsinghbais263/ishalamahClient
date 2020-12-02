import React, { Component } from 'react';
import { View, Text, TextInput, Image, Button, ScrollView, Platform, Linking, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, BackHandler } from 'react-native';
import i18n from '../../../lang/i18n'
import { withNavigation } from 'react-navigation';
import Header from '../../components/Header'
import AsyncStorage from '@react-native-community/async-storage';
import {getAdjustedFontSize} from '../../responsive/responsive';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class ServiceAccountDetails extends Component {

  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params.rowData;
    this.state={
      language: ''
    }
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillMount(){
		AsyncStorage.getItem('language').then( (value) => {
      this.setState({language: value})
    });
	}

  handleBackPress = () =>{
    this.props.navigation.goBack()
    return true;
  }

  componentWillUnmount = () => {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  openGps = (coordinates) => {
    var lat= JSON.parse(coordinates).lat
    var lng= JSON.parse(coordinates).lng

    var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:'
    var url = scheme + `${lat},${lng}`
    // var url = scheme + '23.259933,77.412613'

    this.openExternalApp(url)
}

  openExternalApp = (url) => {
Linking.canOpenURL(url).then(supported => {
  if (supported) {
    Linking.openURL(url);
  } else {
    Alert.alert(
      'ERROR',
      'Unable to open: ' + url,
      [
        {text: 'OK'},
      ]
    );
  }
});
}

  onEmail = () => {
    debugger
    AsyncStorage.getItem('TOKEN').then(value => {
      this.setState({token: value});
      this.props.sendEmail(this, {
        token: this.state.token,
        service_uuid: this.props.navigation.state.params.rowData.uuid
      });
    });
  }



  render() {
    const language = this.state.language;
    var data = []
    data = this.props.navigation.state.params.rowData

    return (
      <View style={{flex: 1}}>
      <Header navigation={this.props.navigation} />
      <View style={{flex:1}}>
          <Text style={{ fontSize: getAdjustedFontSize(14), color:'#707070', alignSelf: 'flex-start', marginTop: 20, marginLeft: 10}}>{i18n.t('service.serviceID')} #:</Text>
          <View style={{ width:'100%', height:40, padding: 10, marginTop: 10, justifyContent:'center', backgroundColor: '#F8F8F8'}}>
            <Text style={[styles.locationContent1, {textAlign: 'left' }]}>{data.uuid}</Text>
          </View>

          <Text style={{ fontSize: getAdjustedFontSize(14), color:'#707070', alignSelf: 'flex-start', marginTop: 20, marginLeft: 10}}>{i18n.t('service.serviceStatus')}:</Text>
          <View style={{ width:'100%', height:40, padding: 10, marginTop: 10, justifyContent:'center', backgroundColor: '#F8F8F8'}}>
            <Text style={[styles.locationContent1, {textAlign: 'left' }]}>{data.service_status}</Text>
          </View>

          <Text style={{ fontSize: getAdjustedFontSize(14), color:'#707070', alignSelf: 'flex-start', marginTop: 20, marginLeft: 10}}>{i18n.t('service.serviceLocation')}:</Text>
          <View style={{ width:'100%', height:120, padding: 10, marginTop: 10, backgroundColor: '#F8F8F8'}}>
            <TouchableOpacity onPress={() => this.openGps(data.coordinates)} style={{height: 50, width: 50, position: 'absolute', top:0, right: 0}}>
                <View style={{ height: 30, width: 30, position: 'absolute', top:10,right:10}}>
                  <Image style={{ width: '100%', height: '100%', resizeMode: 'contain'}} source={require('../../assets/images/ServiceLocation.svg')} />
                </View>
            </TouchableOpacity>
            <Text style={[styles.locationContent1, {textAlign:  'left' }]}>{data.address_1}</Text>
            <Text style={[styles.locationContent2, {textAlign:  'left' }]}>{data.city.name}</Text>
            <Text style={[styles.locationContent2, {textAlign:  'left' }]}>{data.state.name}, {data.country.name}</Text>
            <Text style={[styles.locationContent2, {textAlign:  'left' }]}>{data.zip_code}</Text>
          </View>
          <Text style={{ fontSize: getAdjustedFontSize(14), color:'#707070', alignSelf: 'flex-start', marginTop: 20, marginLeft: 10}}>{i18n.t('service.serviceStartDate')}:</Text>
          <View style={{ width:'100%', height:40, padding: 10, marginTop: 10, justifyContent:'center', backgroundColor: '#F8F8F8'}}>
            <Text style={[styles.date, {textAlign:  'left' }]}>{data.start_date || "Not set"}</Text>
          </View>
          <Text style={{ fontSize: getAdjustedFontSize(14), color:'#707070', alignSelf: 'flex-start', marginTop: 20, marginLeft: 10}}>{i18n.t('service.serviceEndDate')}:</Text>
          <View style={{ width:'100%', height:40, padding: 10, marginTop: 10, justifyContent:'center', backgroundColor: '#F8F8F8'}}>
            <Text style={[styles.date, {textAlign:  'left' }]}>{data.expiration_date || "Not set"}</Text>
          </View>
        </View>

        <TouchableOpacity activeOpacity={1} style={{width: '100%', height: 50, backgroundColor: '#23BDE4'}} onPress={() => this.onEmail()}>
          <Text style={{ color: '#ffffff', fontSize: 18, alignSelf: 'center', padding: 10 }}>
          {i18n.t('service.contractForm')}</Text>
        </TouchableOpacity>
        <SafeAreaView style={{backgroundColor: '#23BDE4'}} />
      </View>
    )
  }
};

const styles = StyleSheet.create({
  order: { width: 25, height: 25, resizeMode: 'contain', alignSelf: 'flex-end', position:'absolute', right: -10},
  detailsView: {width: '100%', height: '40%', alignSelf: 'flex-start', marginTop: 20},
  locationContent2: {fontSize: getAdjustedFontSize(16), color:'#707070',marginTop: 5},
  locationContent1: { fontSize: getAdjustedFontSize(16), color:'#707070' },
  date: { fontSize: getAdjustedFontSize(16), color:'#707070'}
});


function mapStateToProps(state) {
  return {
    success: state.success,
    error: state.error,
    message: state.message,
    email: state.service.email
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ServiceAccountDetails);
