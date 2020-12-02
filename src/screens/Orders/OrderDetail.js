import React, {Component} from 'react';
import { ScrollView, Text, TextInput,BackHandler, View, Image, FlatList, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';
import i18n from '../../../lang/i18n'
import Header from '../../components/Header';
import InvoiceStyle from './style';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { imageUrl } from '../../constants/API'
import {getAdjustedFontSize} from '../../responsive/responsive';

class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params.rowData;
    this.state =
    { text: 'Search',
      status: 'success',
      message: 'transaction successfull' };
    }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () =>{
    this.props.navigation.goBack()
    return true;
  }

  componentWillUnmount = () => {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  state = {
    token: "",
    previousOrderUuid: "",
    invoiceUuid: "",
    productUuid: "",
    uuid:"",
    itemCount: "",
    total: "",
    subTotal: "250",
    data: [],
    items: []
  };

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
  }

  onSubmit(uuid){

    AsyncStorage.getItem('TOKEN').then((value) => {
      this.setState({token: value})
      this.setState({ previousOrderUuid: uuid}),
      this.props.reorder(this,{
        token: this.state.token,
        previousOrderUuid: this.state.previousOrderUuid,
      })
    })
  }


  render() {
    var data = []
    data = this.props.navigation.state.params.rowData;

    return (
      <View style={{flex: 1}}>
        <Header navigation={this.props.navigation} />
        <View style={{flex: 1, marginBottom: 10}}>
          <View style ={{width: '100%',}}>
            <View style={{width: '100%', height: 100, padding: 10, backgroundColor:'#F8F8F8'}}>
              <View style={{width: '100%', justifyContent:'space-between'}}>
                 <View style={{flexDirection:'row'}}>
                  <Text style={{fontSize: getAdjustedFontSize(12), color: '#707070', marginBottom: 5}}>{i18n.t('invoice.order')} # {data.uuid}</Text>
                 </View>
                 <View style={{flexDirection:'row'}}>
                  <Text style={{fontSize: getAdjustedFontSize(12), color: '#707070', marginBottom: 15}}>{i18n.t('invoice.created')}: {data.created_at}</Text>
                </View>
                 <View style ={[InvoiceStyle.InvoiceStatus, {backgroundColor: data.status == "pending" ? '#D8D8D8' : "#F2C014"}]}>
                   <Text  style={{fontSize: getAdjustedFontSize(12), color: '#707070', textTransform: 'capitalize' }}>{data.status}</Text>
                 </View>
              </View>
            </View>
            { data.invoice_status == "unpaid" ?
                <View style={{}}>
                  <TouchableOpacity onPress={() => this.transaction(data.invoice_uuid)}>
                  <View style={{ width: 110, height:35, alignItems: 'center', justifyContent: 'center', flexDirection: 'row',position: 'absolute', top: -15,right: 17, backgroundColor: '#23BDE4'}}>
                    <View style={{height: 15, width: 15, marginRight:5 }}>
                      <Image style={{ width: '100%', height: '100%',resizeMode: 'contain' }} source={require('../../assets/images/Paid.svg')} />
                    </View>
                    <Text style={{fontSize: getAdjustedFontSize(12), color: '#ffffff'}}>{i18n.t('invoice.payNow')}</Text>
                  </View>
                  </TouchableOpacity>
              </View>
            : null
          }
            { data.invoice_status == "paid" ?
            <View style={{width: '100%',}}>
              <View style={{ width: 110, height: 35, alignItems: 'center', justifyContent: 'center', flexDirection: 'row',position: 'absolute', top: -15,right: 17, backgroundColor: '#82BF18'}}>
                <Text style={{fontSize: getAdjustedFontSize(12), color: '#ffffff'}}>Paid</Text>
              </View>
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
               <View style={{width: 80 ,height: 80, }}>
                 <Image style={{ width: '100%', height: '100%'}} source={{uri:imageUrl+rowData.product.product_image}} />
               </View>
               <View style={{width: '80%' ,height: 100, padding: 5}}>
                <View style={{width: '100%' ,height: 30, paddingLeft:10, flexDirection:'row' }}>
                  <Text numberOfLines={1}  style={{fontSize: getAdjustedFontSize(16), color: '#707070',textOverflow: 'ellipsis'}}>{rowData.product.product_name}</Text>
                </View>
                <View style={{width: '60%',height: 45, paddingLeft:10, paddingRight: 20, alignItems:'center',justifyContent:'space-between', flexDirection:'row'}}>
                  <Text style={{fontWeight: 'bold', marginRight: 10 }}>{rowData.product.ppu.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} SR</Text>
                  <Text>X</Text>
                  <Text style={{ fontSize: getAdjustedFontSize(16) }}>{rowData.item_count}</Text>
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
          <Text style={{fontSize: getAdjustedFontSize(16), color: '#707070'}}>0.00 SR</Text>
          <Text style={{fontSize: getAdjustedFontSize(16), color: '#707070'}}>{i18n.t('shop.tax')}</Text>
        </View>
          <View style={{width: '100%', height:1}}>
          </View>
        <View style={{width: '100%', height:50, flexDirection:'row', padding: 10,justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F1F1F1'}}>
          <Text style={{fontSize: getAdjustedFontSize(16), color: '#707070'}}>0.00 SR</Text>
          <Text style={{fontSize: getAdjustedFontSize(16), color: '#707070'}}>{i18n.t('shop.shippingHandling')}</Text>
        </View>
        <View style={{width: '100%', height:50, flexDirection: 'row', padding: 10, justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#285DB3'}}>
          <View style={{ alignItems: 'center', flexDirection: 'row'}}>
            <Text style={{fontSize: getAdjustedFontSize(20), color: '#ffffff', fontWeight:'600'}}>{data.total && data.total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} SR</Text>
          </View>
          <TouchableOpacity activeOpacity={1} onPress={() => this.onSubmit(data.uuid)}>
            <View style={{ alignItems: 'center', flexDirection: 'row'}}>
              <View style={{height: 20, width: 20, marginLeft:5 }}>
                <Image style={{ width: '100%', height: '100%',resizeMode: 'contain' }} source={require('../../assets/images/Reorder.svg')} />
              </View>
              <Text style={{fontSize: getAdjustedFontSize(20), color: '#ffffff'}}> {i18n.t('invoice.reorder')}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <SafeAreaView style={{backgroundColor: '#285DB3'}} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    success: state.success,
    error: state.error,
    message: state.message,
    data: state.data
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(OrderDetail);
