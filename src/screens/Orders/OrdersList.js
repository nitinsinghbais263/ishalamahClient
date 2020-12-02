import React, {Component} from 'react';
import { ScrollView, Text, TextInput,BackHandler, View, Image, FlatList, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';
import i18n from '../../../lang/i18n'
import Header from '../../components/Header';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { imageUrl } from '../../constants/API'

class OrderList extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    token: "",
    productUuid: "",
    uuid:"",
    itemCount: "",
    total: "",
    subTotal: "250",
    data: [],
    items: []
  };


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


checkout(total){
    AsyncStorage.getItem('TOKEN').then((value) => {
      this.setState({token: value})
      this.setState({ total: total})
      this.props.checkoutCart(this,{
        subTotal: this.state.total,
        total: this.state.total
        })
    })
}

  render() {
    return (
      <View style={{flex: 1}}>
        <Header navigation={this.props.navigation} />
        <View style={{flex: 1, marginBottom: 10}}>
        <FlatList
           showsVerticalScrollIndicator={false}
           data={this.state.items}
           renderItem={({item: rowData}) =>{
           const imageUrl = `https://core.isalamah.com/public/`

           return(
             <View style={{width: '100%', height: 100, flexDirection:'row', padding: 10,marginBottom: 10, backgroundColor:'transparent'}}>
               <View style={{width: 100 ,height: 100, }}>
                 <Image style={{ width: '100%', height: '100%'}} source={{uri:imageUrl+rowData.product.product_image}} />
               </View>
               <View style={{width: '80%' ,height: 100, padding: 5}}>
                <View style={{width: '100%' ,height: 30, }}>
                  <Text numberOfLines={1}  style={{fontSize: 16, color: '#707070',textOverflow: 'ellipsis'}}>{rowData.product.product_name}</Text>
                </View>
                <View style={{width: '100%' ,height: 45,alignItems:'center',justifyContent:'space-between', flexDirection:'row'}}>
                  <Text style={{fontWeight: 'bold', marginRight: 10 }}>{rowData.product.ppu}</Text>
                  <Text>X</Text>
                  <View style={{ width: 80, height:'100%', alignItems: 'center', padding: 5, justifyContent: 'center', backgroundColor: '#F8F8F8'}}>
                  <TextInput style={{ width: '100%', height: 45, fontSize: 16, }}
                      placeholder={rowData.item_count}
                      placeholderTextColor={'black'}
                      keyboardType="email-address"
                      underlineColorAndroid='transparent'
                      value= {rowData.item_count}
                      onChangeText={(count) => this.addProduct(count, rowData.product_uuid)}/>
                  </View>
                  <TouchableOpacity onPress={() => this.removeProduct(rowData.uuid)}>
                    <View style={{height: 25, width: 25, marginRight: 25 }}>
                      <Image style={{ width: '100%', height: '100%'}} source={require('../../assets/images/delete.svg')} />
                    </View>
                  </TouchableOpacity>
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
          <Text style={{fontSize: 16, color: '#707070'}}>0.00 SR</Text>
          <Text style={{fontSize: 16, color: '#707070'}}>{i18n.t('shop.tax')}</Text>
        </View>
          <View style={{width: '100%', height:1}}>
          </View>
        <View style={{width: '100%', height:50, flexDirection:'row', padding: 10,justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F1F1F1'}}>
          <Text style={{fontSize: 16, color: '#707070'}}>0.00 SR</Text>
          <Text style={{fontSize: 16, color: '#707070'}}>{i18n.t('shop.shippingHandling')}</Text>
        </View>
        <View style={{width: '100%', height:50, flexDirection: 'row', padding: 10, justifyContent: 'space-between', backgroundColor: '#285DB3'}}>
          <View style={{ alignItems: 'center', flexDirection: 'row'}}>
            <Text style={{fontSize: 20, color: '#ffffff', fontWeight:'600'}}>{data.total && data.total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} SR</Text>
          </View>
          <TouchableOpacity onPress={() => this.checkout(data.total)}>
          <View style={{ alignItems: 'center', flexDirection: 'row'}}>
            <Text style={{fontSize: 20, color: '#ffffff'}}>REORDER</Text>
            <View style={{height: 15, width: 15, marginLeft:5 }}>
              <Image style={{ width: '100%', height: '100%',resizeMode: 'contain' }} source={require('../../assets/images/Renew.svg')} />
            </View>
          </View>
          </TouchableOpacity>
        </View>
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

export default connect(mapStateToProps,mapDispatchToProps)(OrderList);
