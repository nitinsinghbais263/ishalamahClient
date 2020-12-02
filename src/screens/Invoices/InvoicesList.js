import React, {Component} from 'react';
import { Text, View, Image, StyleSheet, BackHandler, TextInput, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, RefreshControl } from 'react-native';
import { FlatList } from 'react-native';
import i18n from '../../../lang/i18n'
import InvoiceStyle from './style';
import Header from '../../components/Header';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getAdjustedFontSize} from '../../responsive/responsive';
import DataLoader from "../../components/DataLoader";
import Payment from './Payment';
import { Bounce } from 'react-native-animated-spinkit'

class InvoicesList extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
      search: "",
      text: 'Search',
      status: 'success',
      message: 'transaction successfull',
      refreshing:false,
      data: [],
      loader: false
     };
  }

  state = {
    search: "",
    token: "",
    invoiceUuid: "",
    data: [],
    loader: false
  };

  componentDidMount() {
    this.getData()
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () =>{
    this.props.navigation.navigate("Dashboard")
    return true;
  }

  componentWillUnmount = () => {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  getData = () =>{
    this.setState({loader: true})
    AsyncStorage.getItem('TOKEN').then((value) => {
      this.setState({token: value})
      this.props.getInvoicesList(this,{
          token: this.state.token,
        })
    })
    this.setState({ refreshing: false })
  }

  onRefresh() {
       this.setState({ refreshing: true }, function() { this.getData() });
    }

  transaction(uuid){
      AsyncStorage.getItem('TOKEN').then((value) => {
        this.setState({token: value})
        this.setState({ invoiceUuid: uuid})
        this.props.invoiceTransaction(this,{
          invoiceUuid: this.state.invoiceUuid,
          status: this.state.status,
          message: this.state.message
          })
      })
       this.getData()
  }

  handleInvoice = (type, data)=> {
    if(type === "maintenance"){
      this.props.navigation.navigate('ServiceInvoice', {rowData: data})
    }
    if(type === "order"){
      this.props.navigation.navigate('OrderInvoice', {rowData: data})
    }
    if(type === "ticket"){
      this.props.navigation.navigate('TicketInvoice', {rowData: data})
    }
  }

  componentWillReceiveProps(nextProps) {

    if(nextProps.userdata) {

      this.setState({
        fullname: nextProps.userdata.full_name,
        uuid: nextProps.userdata && nextProps.userdata.uuid.substr(nextProps.userdata.uuid.length - 5),
        image: nextProps.userdata.profile_image
      })
    }

    if(nextProps.invoices){
      this.setState({data: nextProps.invoices, loader: false })
    }

    if(nextProps.invoices.status){
      this.getData()
    }

    if(nextProps.serverError){
      
      this.setState({loader: false})
    }
  }

  componentWillMount(){
    AsyncStorage.getItem('language').then( (value) => {
      this.setState({language: value})
    });
  }

  onSearch = (search) =>{

  if(search.length>=3){
  this.setState({search: search},()=>{

    this.props.getInvoicesList(this,{
      token: this.state.token,
      search: search
   })})
 } else{

   this.setState({search: ""}, ()=>{

     this.props.getInvoicesList(this,{
       token: this.state.token,
       search: this.state.search
   })
 })
 }
}

  render() {


    var data = this.props.invoices

    return (
      <View style= {{flex:1}}>

        <SafeAreaView style={{backgroundColor:'#2383C3'}}>
        <StatusBar backgroundColor="#2383C3" barStyle="light-content" />
        <View style={{ flexDirection: 'row', width: '100%', height: 60, backgroundColor: '#2383C3' }}>
          <TouchableOpacity style={{position: 'absolute', left: 0, top: 20}} onPress={() => this.props.navigation.navigate("Dashboard")}>
            <Image style={{ width: 25, height: 25, marginLeft: 4, transform: [{ rotate: this.state.language == 'ar' ? '180deg' : '0deg' }] }} source={require('../../assets/images/back.svg')}/>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', position: 'absolute', right: 0, top: 5 }}>
            <View style={{paddingTop:10}}>
              <Text style={{fontSize: 12, color: '#ffffff', marginRight: 10}}>{i18n.t('drawer.account')} # {this.state.uuid}</Text>
              <Text style={{fontSize: 16, color: '#ffffff', marginRight: 10}}>{this.state.fullname}</Text>
            </View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('UserProfile')}>
              <View style={{height: 50, width: 50, borderRadius: 50 / 2, borderWidth: 2.5, borderColor: '#ffffff', marginRight: 10, marginBottom: 10, overflow: 'hidden' }}>
                <Image style={{ width: '100%', height: '100%'}} source={this.props.userdata && this.props.userdata.profile_image ? {uri: 'https://core.isalamah.com/public/'+this.props.userdata.profile_image } : require('../../assets/images/user-2.svg')} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        </SafeAreaView>

      <View style= {{width: '100%', height: 40, paddingTop: 10, paddingHorizontal:10}}>
        <View style= {{width: '100%', height: 40,flexDirection: 'row', backgroundColor: '#F8F8F8', borderRadius: 50, marginBottom: 10}}>
          <TextInput style={{ backgroundColor: '#F8F8F8', width: '80%', height: 40, paddingLeft: 10, fontSize: 16, borderRadius: 50, borderBottomColor: '#F8F8F8',textAlign: i18n.locale==='ar'? 'right' : 'left'}}
              placeholder={i18n.t('invoice.search')}
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(search) => this.onSearch(search)}/>
          <View style={{height: 20, width: 20,  position: 'absolute', right: 20,top: 10}}>
            <Image style={{ width: '100%', height: '100%', resizeMode: 'contain',transform: [{rotate: i18n.locale==='ar'? '90deg' : '0deg'}]}} source={require('../../assets/images/Search.svg')} />
          </View>
        </View>
      </View>

      {
       this.state.loader ?
          <View style={{width: '100%', height: 400,alignItems:'center', justifyContent: 'center'}}>
            <Bounce
              style={{alignSelf: 'center',alignItems: 'center', justifyContent:'center'}}
              size={48}
              color="#2383C3"
            />
          </View>
        :
        <View style={{paddingTop: 10}}>
          {
            data ?
            <FlatList

             contentContainerStyle={{ paddingBottom: 150}}
             showsVerticalScrollIndicator={false}
             data={this.state.data}
             renderItem={({item: rowData}) =>{
               var invoiceId = rowData.uuid
               invoiceUuid = invoiceId.substr(invoiceId.length - 5);

               var typeId = rowData.type_uuid
               typeUuid = typeId.substr(typeId.length - 5);

               var tax = rowData && rowData.total*5/100
               var total = rowData && rowData.total+tax
           return(
             <TouchableOpacity style={{width: '100%', height: 130, marginTop: 10, backgroundColor:'transparent'}} onPress={() => this.handleInvoice(rowData.type, rowData)}>
             <View style={{width: '100%', height: 130, backgroundColor:'transparent'}}>
               <View style={{width: '100%', height: 100, padding: 10, backgroundColor:'#F8F8F8'}}>
                 <View style={{width: '100%' ,height: 20, flexDirection:'row', justifyContent:'space-between', marginBottom: 30}}>
                    <View style={{}}>
                      <View style={{flexDirection: 'row'}}>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: getAdjustedFontSize(12), color: '#707070'}}>{i18n.t('invoice.invoice')}</Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: getAdjustedFontSize(12), color: '#707070'}}> # </Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: getAdjustedFontSize(12), color: '#707070'}}>{invoiceUuid}</Text>
                      </View>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={{fontSize: getAdjustedFontSize(12), color: '#707070'}}>{rowData.type}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={{fontSize: getAdjustedFontSize(12), color: '#707070'}}> # </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={{fontSize: getAdjustedFontSize(12), color: '#707070'}}>{typeUuid}</Text>
                        </View>
                      </View>
                        <Text style={{fontSize: getAdjustedFontSize(12), color: '#707070'}}>{i18n.t('invoice.created')}: {rowData.created_at}</Text>
                    </View>

                    <View style ={[InvoiceStyle.InvoiceStatus, {backgroundColor: rowData.status == "unpaid" ? '#F21414' : "#82BF18"}]}>
                      <Text style={{fontSize: getAdjustedFontSize(14), color: '#ffffff', textTransform: 'capitalize'}}>{rowData.status}</Text>
                    </View>

                 </View>
                 <View style={{width: '100%' ,height: 80, flexDirection:'row',}}>
                  <Text style={{fontSize: getAdjustedFontSize(20), fontWeight: '600', color: '#707070'}}>{rowData.type == "order" ? total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : rowData.total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} SR</Text>

                 </View>
               </View>
               { rowData.status == "unpaid" ?
                   <View style={{width: '100%', height: 20,}}>
                   <TouchableOpacity style={{ width: 110, height: 35, alignItems: 'center', justifyContent: 'center', flexDirection: 'row',position: 'absolute', top: -15,right: 17, backgroundColor: '#23BDE4'}} onPress={() => this.handleInvoice(rowData.type, rowData)}>
                   <View style={{ width: 110, height: 35, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', backgroundColor: '#23BDE4'}}>
                     <View style={{height: 15, width: 15, marginRight:5 }}>
                       <Image style={{ width: '100%', height: '100%',resizeMode: 'contain' }} source={require('../../assets/images/Paid.svg')} />
                     </View>
                     <Text style={{fontSize: getAdjustedFontSize(14), color: '#ffffff'}}>{i18n.t('invoice.payNow')}</Text>
                   </View>
                   </TouchableOpacity>
                 </View>
               : null
             }
             </View>
             </TouchableOpacity>
           )
         }
             }
            keyExtractor={(item, index) => index}
         />
         :
         <View style={{ width: '100%', height: 400,alignItems:'center', justifyContent: 'center'}}>
           <Text style= {{fontSize: getAdjustedFontSize(18), fontWeight: 'bold', color: '#D4D4D4', textAlign: 'center'}}>{i18n.t('invoice.noInvoice')}</Text>
         </View>

         }
        </View>
      }
      {/*
        <View style={{position: 'absolute', top: 100}}>
          <Payment />
        </View>
      */}
      </View>
    );
  }
}

function mapStateToProps(state) {

  return {
    success: state.success ,
    error: state.error,
    message: state.message,
    invoices: state.invoices.invoices,
    userdata: state.user.data,
    serverError: state.invoices.invoiceServerError
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(InvoicesList);
