import React, { Component } from 'react'
import { View, Image, Text, TextInput, FlatList, StyleSheet, SafeAreaView, ScrollView, StatusBar, RefreshControl, TouchableOpacity, BackHandler } from 'react-native'
import i18n from '../../../lang/i18n'
import { withNavigation } from 'react-navigation';
import Header from '../../components/Header'
import ServicesCategory from './ServicesCategory'
import AsyncStorage from '@react-native-community/async-storage';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getAdjustedFontSize} from '../../responsive/responsive';
import DataLoader from "../../components/DataLoader";
import { Bounce } from 'react-native-animated-spinkit'

class ServicesList extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    token: "",
    search: "",
    category: "",
    categoryStatus: "",
    isLoading: false,
    loader: false
  };

  componentDidMount() {

    this.getData()
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () =>{
    this.props.navigation.goBack()
    return true;
  }

  componentWillUnmount = () => {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  getData = () =>{
    this.setState({isLoading: true,loader: true})
    AsyncStorage.getItem('TOKEN').then((value) => {
      this.setState({token: value})
      this.props.getServicesList(this,{
          token: this.state.token,
        })
    }).finally(() => { ; this.setState({isLoading: false})} )
  }

  onSearch = (search) =>{

    if(search.length > 3){
      this.setState({search: search},()=>{
        this.props.getServicesList(this,{
          token: this.state.token,
          search: search
       })})
      } else{
       this.setState({search: ""}, ()=>{
         this.props.getServicesList(this,{
           token: this.state.token,
           search: this.state.search
       })
      })
    }
  }

  selectedCategory = (status) => {
this.setState({categoryStatus: status},()=>{
if(status){
  this.props.getServicesList(this,{
    token: this.state.token,
    status: status
 })
} else {
 this.setState({categoryStatus: ""}, ()=>{

   this.props.getServicesList(this,{
     token: this.state.token,
     status: this.state.categoryStatus
 })})

}
})
}

  componentWillReceiveProps(nextProps) {

  if(nextProps.search){
    this.setState({search: search})
  }
  if(nextProps.category){
    this.setState({
      category: nextProps.category,
    })
  }
  if(nextProps.services){

    this.setState({loader: false})
  }
  if(nextProps.serverError){

    this.setState({loader: false})
  }
}

  render() {
    var data = []
    data = this.props.services

    return (
      <View style={{flex: 1}}>
      <Header navigation={this.props.navigation} />
        <ServicesCategory navigation={this.props.navigation} selectedCategory= {this.selectedCategory} category={this.state.category}/>

        <ScrollView
          style={{ marginBottom: 5}}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
             refreshing={this.state.isLoading}
             onRefresh={() => {this.getData()}}
            />
           }
        >
            <View style= {{width: '100%', height: 40, padding: 10, marginBottom: 5}}>
              <View style= {{width: '100%', height: 40,flexDirection: 'row', backgroundColor: '#F8F8F8', borderRadius: 50}}>
                <TextInput style={{ backgroundColor: '#F8F8F8', width: '80%', height: 40, paddingLeft: 10, fontSize: getAdjustedFontSize(16), borderRadius: 50, borderBottomColor: '#F8F8F8',textAlign: i18n.locale==='ar'? 'right' : 'left' }}
                    placeholder={i18n.t('service.search')}
                    keyboardType="email-address"
                    underlineColorAndroid='transparent'
                    onChangeText={(search) => this.onSearch(search)}/>
                <View style={{height: 20, width: 20,  position: 'absolute', right: 20,top: 10}}>
                  <Image style={{ width: '100%', height: '100%', resizeMode: 'contain',transform: [{rotate: i18n.locale==='ar'? '90deg' : '0deg'}]}} source={require('../../assets/images/Search.svg')} />
                </View>
              </View>
            </View>

            <TouchableOpacity style={{ width: '100%'}} onPress={() => this.props.navigation.navigate('AddServiceLocation')}>
              <View style={{ width: '100%', height: 70, flexDirection: 'row', marginTop: 40, marginBottom: 30, backgroundColor: '#F8F8F8' }}>
                <Image style={{ width: 20, height: 20, position: 'absolute', top:25, left:10}} source={require('../../assets/images/NewTickets.svg')}/>
                <View style={{ padding: 5, paddingLeft: 45, justifyContent: 'center'}}>
                  <Text style={{ fontSize: getAdjustedFontSize(20), fontWeight:'bold', color:'#285DB3',textAlign: "left" }}>{i18n.t('service.addService')}</Text>
                  <Text style={{ color:'#888' }}>{i18n.t('service.click')}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: getAdjustedFontSize(18), color: '#6C6C6C',padding:10, paddingTop: 10, paddingBottom: 10}}>{this.state.categoryStatus ? this.state.categoryStatus + i18n.t('service.services') : i18n.t('service.allServices') }</Text>
            </View>
            <View>
              {
               this.state.loader ?
                  <View style={{alignSelf: 'center',alignItems: 'center', justifyContent:'center'}}>
                    <Bounce
                      style={{width: '100%', height: 400,alignItems:'center', justifyContent: 'center'}}
                      size={48}
                      color="#2383C3"
                    />
                  </View>
                :
                <View>
                  {
                      data ?
                      <FlatList
                        contentContainerStyle={{ paddingBottom: 50}}
                        data={data}
                        extraData={data}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => {
                          return (
                            <View style={{marginBottom: 10}}/>
                          )
                        }}
                        renderItem={ ({item: rowData}) =>{
                          var invoiceId = rowData.uuid
                          lastChar = invoiceId.substr(invoiceId.length - 5);
                          return (
                            <TouchableOpacity style={{ width:'100%',}} onPress={() => this.props.navigation.navigate('ServiceAccountDetails', {rowData: rowData})}>
                              <View style={{width:'100%',backgroundColor:'#F8F8F8',shadowColor: '#00000021',shadowOffset: {width: 2},shadowOpacity: 0.5,shadowRadius: 4}}>
                              <View style={{width: '100%', paddingLeft:10, paddingRight: 10,paddingTop: 5, paddingBottom: 10}}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                                  <View>
                                    <Text style={[styles2.title, {textAlign: this.state.language == "ar" ? 'right' : 'left'}]}># {lastChar}</Text>
                                  </View>
                                  <View style={{ width: 24, height: 24, alignSelf:'center'}}>
                                    <Image style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={i18n.locale==='ar'? require('../../assets/images/OrderAR.svg'): require('../../assets/images/Order.svg')}/>
                                  </View>
                                </View>
                                <View style={{ width: '100%', paddingTop: 10}}>
                                  <View style={{flexDirection: 'row'}}>
                                    <Text style={{ fontSize: getAdjustedFontSize(16), color:'#707070', fontWeight:'600'}}>{i18n.t('service.serviceStatus')}:</Text>
                                  </View>
                                <View style={{ width:'100%', justifyContent:'center', backgroundColor: '#F8F8F8'}}>
                                  <Text style={[styles2.locationContent1, {textAlign: 'left' }]}>{rowData.service_status}</Text>
                                </View>
                                </View>
                                <View style={{width: '100%', paddingTop:10}}>
                                  <View style={{flexDirection: 'row'}}>
                                    <Text style={{fontSize: getAdjustedFontSize(16), color:"#888", fontWeight:'600'}}>{i18n.t('service.serviceLocation')}:</Text>
                                  </View>
                                  <Text style={[styles2.locationContent1,{textAlign: this.state.language == "ar" ? 'right' : 'left'}]}>{rowData.address_1}</Text>
                                  <Text style={[styles2.locationContent2, {textAlign: this.state.language == "ar" ? 'right' : 'left'}]}>{rowData.city.name}</Text>
                                  <Text style={[styles2.locationContent2, {textAlign: this.state.language == "ar" ? 'right' : 'left'}]}>{rowData.state.name}, {rowData.country.name}</Text>
                                  <Text style={[styles2.locationContent2, {textAlign: this.state.language == "ar" ? 'right' : 'left'}]}>{rowData.zip_code}</Text>
                                </View>
                                <View style={{width: '100%', paddingTop:10}}>
                                  <View style={{flexDirection: 'row'}}>
                                    <Text style={{fontSize: getAdjustedFontSize(16), color:"#888", fontWeight:'600'}}>{i18n.t('service.serviceStart')}:</Text>
                                  </View>
                                  <Text style={[styles2.date, {textAlign: this.state.language == "ar" ? 'right' : 'left'}]}>{rowData.start_date || "Not set"}</Text>
                                </View>
                                <View style={{width: '100%', paddingTop:10}}>
                                  <View style={{flexDirection: 'row'}}>
                                    <Text style={{fontSize: getAdjustedFontSize(16), color:"#888", fontWeight:'600' }}>{i18n.t('service.serviceEnd')}:</Text>
                                  </View>
                                  <Text style={[styles2.date, {textAlign: this.state.language == "ar" ? 'right' : 'left'}]}>{rowData.expiration_date || "Not set"}</Text>
                                </View>
                              </View>
                              </View>
                            </TouchableOpacity>
                          )
                        }}
                      />
                      :
                      <View style={{ width: '100%', height: 400,alignItems:'center', justifyContent: 'center'}}>
                        <Text style= {{fontSize: getAdjustedFontSize(18), fontWeight: 'bold', color: '#D4D4D4', textAlign: 'center'}}>{i18n.t('service.noActiveServices')}</Text>
                      </View>
                  }
                </View>
               }
            </View>
        </ScrollView>
      </View>
    );
  }
}

const styles2 = StyleSheet.create({
  card:{
    width:'100%',

    shadowColor: '#00000021',
    shadowOffset: {width: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,

    backgroundColor:'#F8F8F8'
  },
  cardHeader: {
    width: '100%',

    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 15,
    paddingLeft: 15
  },
  title:{
    fontSize: getAdjustedFontSize(24),
    fontWeight: "600",
    color: '#285DB3',
    textTransform: 'uppercase'
  },
  order: { width: 24, height: 24, alignSelf: 'flex-end', position:'absolute', right: 0},
  detailsView: {width: '100%', alignSelf: 'flex-start'},
  locationContent1: {fontSize: getAdjustedFontSize(16), color:"#888", fontWeight:'400' },
  locationContent2: {fontSize: getAdjustedFontSize(16), color:"#888", fontWeight:'400' },
  date: {fontSize: getAdjustedFontSize(16), color:"#888", fontWeight:'400'}
});

function mapStateToProps(state) {

  return {
    success: state.success ,
    error: state.error,
    message: state.message,
    services: state.service.services,
    serverError: state.service.serviceServerError

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(ServicesList);
