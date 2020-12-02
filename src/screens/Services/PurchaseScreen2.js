import React, { Component } from 'react';
import { View, Text, TextInput, Image, Button, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, BackHandler } from 'react-native';
import i18n from '../../../lang/i18n'
import { withNavigation } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ServicePurchare extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getData()
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () =>{
    // this.props.navigation.goBack()
    return true;
  }

  componentWillUnmount = () => {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  getData = () =>{
  AsyncStorage.getItem('TOKEN').then((value) => {
    this.setState({token: value})
    this.props.getUserDetails(this,{
        token: this.state.token,
      })
  })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.userdata) {
      this.setState({
        fullname: nextProps.userdata.full_name,
        uuid: nextProps.userdata && nextProps.userdata.uuid.substr(nextProps.userdata.uuid.length - 5),
        image: nextProps.userdata.profile_image
      })
    }
  }

  componentWillMount(){
    AsyncStorage.getItem('language').then( (value) => {
      this.setState({language: value})
    });
  }

  handlePress = () => {
    if(this.props.service && this.props.service.message === "Service Created Successfully")
    {
      this.props.navigation.navigate('InvoicesList')
    } else {
      this.props.navigation.navigate('ServicesList')
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>

        <SafeAreaView style={{backgroundColor:'#2383C3'}}>
        <StatusBar backgroundColor="#2383C3" barStyle="light-content" />
        <View style={{ flexDirection: 'row', width: '100%', height: 60, backgroundColor: '#2383C3' }}>
          <View style={{ flexDirection: 'row', position: 'absolute', right: 0, top: 5 }}>
            <View style={{paddingTop:10}}>
              <Text style={{fontSize: 12, color: '#ffffff', marginRight: 10}}>{i18n.t('drawer.account')} # {this.state && this.state.uuid}</Text>
              <Text style={{fontSize: 16, color: '#ffffff', marginRight: 10}}>{this.state && this.state.fullname}</Text>
            </View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('UserProfile')}>
              <View style={{height: 50, width: 50, borderRadius: 50 / 2, borderWidth: 2.5, borderColor: '#ffffff', marginRight: 10, marginBottom: 10, overflow: 'hidden' }}>
                <Image style={{ width: '100%', height: '100%'}} source={this.props.data && this.props.data.profile_image ? {uri: 'https://core.isalamah.com/public/'+this.props.data.profile_image } : require('../../assets/images/user-2.svg')} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        </SafeAreaView>

        <View style={{flex: 1,alignItems: 'center', justifyContent: 'center'}}>
          <Image style={{width:145, height:145, resizeMode: 'contain'}} source={require('../../assets/images/ThankYou.svg')}/>
        </View>
        <View style={{flex: 1, padding: 10}}>
          <Text style={{ textAlign: 'center', color:'#888', fontSize: 36, fontWeight:'bold'}}>{i18n.t('shop.thankyou')}</Text>
          {this.props.service && this.props.service.message === "Service Created Successfully" ?
            <Text style={{ textAlign: 'center', color:'#888', fontSize: 20, marginTop: 20 }}>
              {i18n.t('shop.thankMessage2')}
            </Text>
          :
            <Text style={{ textAlign: 'center', color:'#888', fontSize: 20, marginTop: 20 }}>
              {i18n.t('shop.thankMessage1')}
            </Text>
          }
          {
            this.props.service && this.props.service.message === "Service Created Successfully" ?
            <TouchableOpacity style={{ width: '50%', height: 50, alignSelf: 'center', marginTop: 25 }} onPress={() => this.props.navigation.navigate('ServicesList')}>
              <Text style={{ color: '#999999', fontSize: 14, alignSelf: 'center', padding: 10 }}>Skip for Now</Text>
            </TouchableOpacity>
            : null
          }
        </View>
        <TouchableOpacity activeOpacity={1} style={{ width: '100%', height: 50,  alignItems:'center', justifyContent: 'center',backgroundColor: '#23BDE4' }} onPress={() => this.handlePress()}>
          <Text style={{ color: '#ffffff', fontSize: 18, alignSelf: 'center', padding: 10 }}>{i18n.t('shop.continue')}</Text>
        </TouchableOpacity>
        <SafeAreaView style={{backgroundColor: '#23BDE4'}} />
      </View>
    )
  }
};

function mapStateToProps(state) {
  return {
    success: state.success,
    error: state.error,
    message: state.message,
    userdata: state.user.data,
    service: state.service.service,
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(ServicePurchare);
