import React, {Component} from 'react';
import { Text, View, Image, StyleSheet, BackHandler, TextInput, TouchableOpacity, SafeAreaView, StatusBar, FlatList, ScrollView } from 'react-native';
import i18n from '../../../lang/i18n'
import InvoiceStyle from './style';
import Header from '../../components/Header';
import DatePicker from 'react-native-datepicker'
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class TicketInvoice extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
      date:"",
      text: 'Search',
      status: 'success',
      message: 'transaction successfull',
      invoiceUuid: ""
    };
  }

  state = {
    token: "",
    serviceUuid: "",
    serviceDetail: {},
    service_uuid: "",
    invoiceUuid: ""
  };



componentDidMount() {

  // this.getData()
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
  AsyncStorage.getItem('TOKEN').then((value) => {
    this.setState({token: value})
    this.setState({serviceUuid: this.props.navigation.state.params.rowData.type_uuid})
    this.props.serviceDetails(this,{
        token: this.state.token,
        orderUuid: this.state.serviceUuid
      })
  })
}


transaction(uuid){

    AsyncStorage.getItem('TOKEN').then((value) => {
      this.setState({token: value})
      this.setState({ invoiceUuid: uuid})
      this.props.invoiceTransaction(this,{
        invoiceUuid: this.state.invoiceUuid,
        status: this.state.status,
        message: this.state.message,
        startDate: this.state.date
        })
    })
}


componentWillReceiveProps(nextProps) {

  if(nextProps.serviceDetail) {
    var serviceId = nextProps.serviceDetail.uuid
    serviceUuid = serviceId.substr(serviceId.length - 5);
    this.setState({serviceDetail: nextProps.serviceDetail,  service_uuid: serviceUuid})
  }

}

  render() {
    var data = this.props.navigation.state.params.rowData
    var invoiceId = data.uuid
    invoiceUuid = invoiceId.substr(invoiceId.length - 5);

    return (
      <View style={{flex: 1}}>
        <Header navigation={this.props.navigation} />
        <View style={{flex: 1, marginBottom: 10}}>
          <View style ={{width: '100%', height: 130, backgroundColor:'transparent'}}>
            <View style={{width: '100%', height: 100,padding: 10, backgroundColor:'#F8F8F8'}}>
              <View style={{width: '100%',height: 50, justifyContent:'space-between', marginBottom: 30}}>
                 <Text style={{fontSize: 12, color: '#707070', marginBottom: 5}}>Order #{data.uuid}</Text>
                 <Text style={{fontSize: 12, color: '#707070', marginBottom: 10}}>{i18n.t('invoice.created')}: {data.created_at}</Text>
                 <View style ={[InvoiceStyle.InvoiceStatus, {backgroundColor: data.status == "unpaid" ? '#F21414' : "#82BF18"}]}>
                   <Text style={{fontSize: 12, color: '#ffffff'}}>{data.status}</Text>
                 </View>
              </View>
            </View>
            { data.status == "unpaid" ?
                <View style={{width: '100%', height: 20,}}>
                <TouchableOpacity style={{width: 110, height: 35, alignItems: 'center', justifyContent: 'center', flexDirection: 'row',position: 'absolute', top: -15,right: 17, backgroundColor: '#23BDE4'}} onPress={() => this.transaction(data.uuid)}>
                <View style={{ width: 110, height: 35, alignItems: 'center', justifyContent: 'center', flexDirection: 'row',  backgroundColor: '#23BDE4'}}>
                  <View style={{height: 15, width: 15, marginRight:5 }}>
                    <Image style={{ width: '100%', height: '100%',resizeMode: 'contain' }} source={require('../../assets/images/Paid.svg')} />
                  </View>
                  <Text style={{fontSize: 12, color: '#ffffff'}}>{i18n.t('invoice.payNow')}</Text>
                </View>
                </TouchableOpacity>
              </View>
            : null
          }

          </View>
        <FlatList
           showsVerticalScrollIndicator={false}
           data={data.items}
           renderItem={({item: rowData}) =>{
           const imageUrl = `https://core.isalamah.com/public/`

           return(
             <View style={{width: '100%', height: 100, flexDirection:'row', padding: 10,marginBottom: 10, backgroundColor:'transparent'}}>
               <View style={{width: 100 ,height: 100, }}>
                 <Image style={{ width: '100%', height: '100%'}} source={{uri:imageUrl+rowData.product.product_image}} />
               </View>
               <View style={{width: '80%' ,height: 100, padding: 5}}>
                <View style={{width: '100%' ,height: 30, paddingLeft:10 }}>
                  <Text numberOfLines={1}  style={{fontSize: 16, color: '#707070',textOverflow: 'ellipsis'}}>{rowData.product.product_name}</Text>
                </View>
                <View style={{width: '60%',height: 45, paddingLeft:10, paddingRight: 20, alignItems:'center',justifyContent:'space-between', flexDirection:'row'}}>
                  <Text style={{fontWeight: 'bold', marginRight: 10 }}>{rowData.product.ppu.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                  <Text>X</Text>
                  <Text style={{ fontSize: 16 }}>{rowData.item_count}</Text>
                </View>
               </View>
             </View>
           )
         }
            }
            keyExtractor={(item, index) => index}
         />
        </View>
        <View style={{width: '100%', height:50, flexDirection:'row', padding: 10,justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F1F1F1'}}>
          <Text style={{fontSize: 16, color: '#707070'}}>{i18n.t('shop.subTotal')}</Text>
          <Text style={{fontSize: 16, color: '#707070'}}>{data.total && data.total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} SR</Text>
        </View>
          <View style={{width: '100%', height:1}}>
          </View>
        <View style={{width: '100%', height:50, flexDirection:'row', padding: 10,justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F1F1F1'}}>
          <Text style={{fontSize: 16, color: '#707070'}}>{i18n.t('shop.tax')}</Text>
          <Text style={{fontSize: 16, color: '#707070'}}>0.00 SR</Text>
        </View>
          <View style={{width: '100%', height:1}}>
          </View>
        <View style={{width: '100%', height:50, flexDirection:'row', padding: 10,justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F1F1F1'}}>
          <Text style={{fontSize: 16, color: '#707070'}}>{i18n.t('shop.shippingHandling')}</Text>
          <Text style={{fontSize: 16, color: '#707070'}}>0.00 SR</Text>
        </View>
        <View style={{width: '100%', height:50, flexDirection: 'row', padding: 10, justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#285DB3'}}>

          <View style={{ alignItems: 'center', flexDirection: 'row'}}>
            <Text style={{fontSize: 20, color: '#ffffff'}}>{i18n.t('shop.total')}</Text>
          </View>

          <View style={{ alignItems: 'center', flexDirection: 'row'}}>
            <Text style={{fontSize: 20, color: '#ffffff', fontWeight:'600'}}>{data.total && data.total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} SR</Text>
          </View>

        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    success: state.success ,
    error: state.error,
    message: state.message,
    serviceDetail: state.service.serviceDetail,
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(TicketInvoice);
