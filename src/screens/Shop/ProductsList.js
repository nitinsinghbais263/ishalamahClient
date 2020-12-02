import React, {Component} from 'react';
import { ScrollView, Text, TextInput, View, Image,BackHandler, FlatList, StyleSheet, StatusBar, SafeAreaView, RefreshControl, TouchableOpacity } from 'react-native';
import i18n from '../../../lang/i18n'
import Modal from "react-native-modal";
import PropTypes from 'prop-types';
import ProductsCategory from './ProductsCategory'
import AsyncStorage from '@react-native-community/async-storage';
import ProductsAdded from './ProductsAdded';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { imageUrl } from '../../constants/API'
import {getAdjustedFontSize} from '../../responsive/responsive';
import ImageSpinner from 'react-native-image-progress';
import Progress from 'react-native-progress';
import DataLoader from "../../components/DataLoader";
import { Bounce } from 'react-native-animated-spinkit'



class ProductsList extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    token: "",
    total: "",
    productUuid: "",
    product: "",
    itemCount: 1,
    category: "",
    search: "",
    categoryUuid: "",
    isModalVisible: false,
    isLoading: false,
    loader: false
  };

  toggleModal = (rowData) => {
    this.setState({ isModalVisible: !this.state.isModalVisible, product: rowData });
  };

  componentWillMount() {
    this.getCategory()

    if(this.props.search){
      this.setState({search: search})
    }
  }

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
    this.setState({loader: true})
    AsyncStorage.getItem('TOKEN').then((value) => {
      this.setState({token: value})
      this.props.getProductsList(this,{
          token: this.state.token
        })
    })
  }

  onSearch = (search) =>{

    if(search.length>=3){
    this.setState({loader: true})
    this.setState({search: search},()=>{

      this.props.getProductsList(this,{
        token: this.state.token,
        search: search
     })
   })
   } else{
     this.setState({loader: true})
     this.setState({search: ""}, ()=>{

       this.props.getProductsList(this,{
         token: this.state.token,
         search: this.state.search
     })})
   }
  }

  onRefresh = () => {
    this.setState({ isLoading: true})
    setTimeout(() => {
         this.setState({
          isLoading: false,
        }, () =>{
          this.getData();
        });
      }, 1000);
  }

  selectedCategory = (uuid) => {
    this.setState({categoryUuid: uuid},()=>{
  if(uuid){
      this.setState({loader: true})
      this.props.getProductsList(this,{
        token: this.state.token,
        categoryUuid: uuid
     })
   } else {
     this.setState({categoryUuid: ""}, ()=>{
       this.setState({loader: true})
       this.props.getProductsList(this,{
         token: this.state.token,
         categoryUuid: this.state.categoryUuid
     })})

   }
   })
  }

  getCategory = () =>{
    AsyncStorage.getItem('TOKEN').then((value) => {
      this.setState({token: value})
      this.props.getCategoryList(this,{
          token: this.state.token,
        })
    })
  }

  addProduct(uuid){
      AsyncStorage.getItem('TOKEN').then((value) => {
        this.setState({token: value})
        this.setState({ productUuid: uuid}),
        // this.setState({ itemCount: item_in_cart})
        this.props.addToCart(this,{
          productUuid: this.state.productUuid,
          itemCount: this.state.itemCount
          })
      })
      this.setState({ isModalVisible: false })
  }

  componentWillReceiveProps(nextProps) {

    if(nextProps.total) {
      this.setState({
        total: nextProps.total,
      })
    }
    if(nextProps.search){
      this.setState({search: search})
    }
    if(nextProps.category){
      this.setState({
        category: nextProps.category,
      })
    }
    if(nextProps.products){
      this.setState({loader: false})
    }

    if(nextProps.serverError){

      this.setState({loader: false})
    }
  }

  _handleChangeInput(val){
    var item = '0';
    if(val.length>0){
      item = val;
    }
    this.setState({itemCount: item})
  }

  _handleOnClick(type){

  var data;
  var itemCount;
      if(type==='inc'){

        data = parseInt(this.state.itemCount)+1;
        itemCount = data.toString();
      }
      if(type==='des'){

        if(this.state.itemCount!=='0' && this.state.itemCount!==''){

          data = parseInt(this.state.itemCount)-1;
          itemCount = data.toString();
        }
      }
    this.setState({itemCount: itemCount})

}


  render() {
    var data = []
    data = this.props.products
    const product = this.state.product
    const imageUrl = `https://core.isalamah.com/public/`
    return (
      <View style={{flex: 1, backgroundColor:'#F8F8F8'}}>

        { this.state.category !== "" ?
            <ProductsCategory navigation={this.props.navigation} selectedCategory= {this.selectedCategory} category={this.state.category}/>
          : null
        }

        <ProductsAdded navigation={this.props.navigation} total={this.state.total} onSearch={this.onSearch}/>
        {
           this.state.loader ?
              <View style={{width: '100%', height: 400,alignItems: 'center', justifyContent:'center'}}>
                <Bounce
                  style={{alignSelf: 'center',alignItems: 'center', justifyContent:'center'}}
                  size={48}
                  color="#2383C3"
                />
              </View>
            :
          <View style={{flex: 1}}>
          {
            data ? <FlatList
               showsVerticalScrollIndicator={false}
               data={data}
               extraData={data}
               refreshing={this.state.isLoading}
               onRefresh={() => {this.onRefresh()}}
               horizontal={false}
               numColumns={2}

               renderItem={ ({item: rowData}) =>{
                 const imageUrl = `https://core.isalamah.com/public/`
                 return(
                   <View style={{width: '50%', padding:10,flexDirection: 'row',  marginBottom: 10}}>
                     <View style={{flex:1, backgroundColor:'#FFFFFF', borderRadius:10,  shadowColor: '#00000021', shadowOffset: { width: 2 }, shadowOpacity: 0.5, shadowRadius: 4, overflow:'hidden'}}>
                       <TouchableOpacity style={{width: '100%', }} onPress={() => this.props.navigation.navigate('ProductView', {rowData: rowData})}>
                          <View style={{width: '100%', height: 150}}>
                            <ImageSpinner
                            style={{ width: '100%', height: '100%'}}
                            source={require('../../assets/images/addCart.svg')}
                            source={{uri:imageUrl+rowData.cover_image_path}}

                            indicator={Progress}
                             indicatorProps={{
                               thickness: 4,
                               duration: 3000,
                               spinDuration: 2000,
                               color: '#2185D0',
                               // unfilledColor: 'rgba(200, 200, 200, 0.2)'
                             }} />
                          </View>
                          <View style={{width: '100%', padding:5, paddingTop:8,flexDirection: 'row'}}>
                            <Text style={{fontSize: getAdjustedFontSize(15), color: '#707070'}}>{rowData.name}</Text>
                          </View>
                          <View style={{width: '100%',flexDirection:'row',paddingTop:5, justifyContent: 'space-between'}}>

                            <View style={{width:45, height:25, alignItems:'center', justifyContent: 'center',backgroundColor: '#23BDE4', borderTopRightRadius:10, borderTopLeftRadius:10, marginLeft:10, marginRight:10,}}>
                              <TouchableOpacity style={{ flexDirection: 'row'}} onPress={() => this.toggleModal({rowData: rowData})}>
                                <View style={{height: 15, width: 15, alignSelf: 'center'}}>
                                  <Image style={{ width: '100%', height: '100%', resizeMode: 'contain'}} source={require('../../assets/images/add_Cart.svg')} />
                                </View>
                              </TouchableOpacity>
                            </View>

                            <View style={{ paddingLeft:5, paddingRight: 5}}>
                              <Text style={{fontSize: getAdjustedFontSize(16), fontWeight: '600', color: '#707070'}}>{rowData.price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} SR</Text>
                            </View>

                          </View>
                        </TouchableOpacity>
                     </View>
                   </View>
                 )
               }
             }
               keyExtractor={(item, index) => index}/> :
            <View style={{ width: '100%', height: 400,alignItems:'center', justifyContent: 'center'}}>
              <Text style= {{fontSize: getAdjustedFontSize(18), fontWeight: 'bold', color: '#D4D4D4', textAlign: 'center'}}>{i18n.t('shop.noProduct')}</Text>
            </View>
          }

          <View style={{ flex: 1, padding: 10 }}>

            <Modal isVisible={this.state.isModalVisible}>

              <View style={{ width: '100%', height: 350, padding: 20, borderRadius: 25, overFlow: 'hidden', backgroundColor: '#ffffff' }}>

              <View style={{width: 30, height: 30, position: 'absolute', top: -10, right: -10}}>
                <TouchableOpacity style={{width: 30, height: 30}} onPress={this.toggleModal}>
                  <View style={{height: 30, width: 30}}>
                    <Image style={{ width: '100%', height: '100%'}} source={require('../../assets/images/Close.svg')} />
                  </View>
                </TouchableOpacity>
              </View>

                <View style={{ width: '100%', height: 120, padding: 20, flexDirection: 'row'}}>
                    <View style={{width:60, height: 60}}>
                      <Image style={{ width: '100%', height: '100%'}} source={{uri:product.rowData && imageUrl+product.rowData.cover_image_path}} />
                    </View>
                    <View style={{ width: '80%', height: 120, paddingLeft: 10}}>
                      <View style={{ width: '100%',flexDirection: 'row'}}>
                        <Text style={{fontSize: 18, color: '#707070'}}>{product.rowData && product.rowData.name}</Text>
                      </View>
                      <View style={{ width: '100%', height: 20, flexDirection: 'row'}}>
                        <Text style={{fontSize: getAdjustedFontSize(16), fontWeight: 'bold', color: '#707070'}}>{product.rowData && product.rowData.price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} SR</Text>
                      </View>
                    </View>
                </View>

                <View style={{ backgroundColor: '#C4C4C4', width: '100%', height: 1}}></View>
                <View style={{ width: '100%', height: 120}}>
                  <Text style={{ color: '#76848B', fontSize: getAdjustedFontSize(14), alignSelf: 'center', marginTop: 20}}>{i18n.t('shop.selectQuantity')} </Text>
                  <View style={{ width: '100%', height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10}}>

                    <View style={{width: 30, height: 30, marginRight: 20}}>
                      <TouchableOpacity style={{width: 30, height: 30, marginRight: 20}} onPress={()=> this.state.itemCount!=='0' && this._handleOnClick('des')}>
                        <View style={{height: 30, width: 30}}>
                          <Image style={{ width: '100%', height: '100%'}} source={require('../../assets/images/Dec.svg')} />
                        </View>
                      </TouchableOpacity>
                    </View>

                    <TextInput style={{ width: 70, height: 40, paddingTop: 0,paddingBottom: 0, textAlign: 'center', fontSize: getAdjustedFontSize(18), borderBottomColor: '#F8F8F8', backgroundColor: '#F8F8F8' }}
                        placeholder="1"
                        keyboardType="decimal-pad"
                        underlineColorAndroid='transparent'
                        value={this.state.itemCount}
                        onChangeText={(value) => this._handleChangeInput(value)}
                        />

                    <View style={{width: 30, height: 30, marginLeft: 10}}>
                      <TouchableOpacity style={{width: 30, height: 30, marginLeft: 10}} onPress={()=>this._handleOnClick('inc')}>
                        <View style={{height: 30, width: 30}}>
                          <Image style={{ width: '100%', height: '100%'}} source={require('../../assets/images/Inc.svg')} />
                        </View>
                      </TouchableOpacity>
                    </View>

                  </View>
                </View>
                <View style={{ width: '100%', height: 50, flexDirection: 'row', marginBottom: 50,  alignItems: 'center', justifyContent: 'center', borderRadius: 50, backgroundColor: '#23BDE4'}}>
                  <TouchableOpacity style={{width: '100%', height: 50, flexDirection: 'row', alignItems: 'center',justifyContent: 'center', borderRadius: 50, backgroundColor: '#23BDE4'}} onPress={() => this.addProduct(product.rowData.uuid)}>
                    <View style={{height: 20, width: 20, marginRight: 10}}>
                      <Image style={{ width: '100%', height: '100%'}} source={require('../../assets/images/AddCart2.svg')} />
                    </View>
                    <Text style={{fontSize: getAdjustedFontSize(20), color:'#ffffff', alignSelf: 'center'}}>{i18n.t('shop.addToCart')}</Text>
                  </TouchableOpacity>
                </View>
              </View>

            </Modal>

          </View>
          </View>
        }
      </View>
    );
  }
  }

function mapStateToProps(state) {
  return {
    success: state.success ,
    error: state.error,
    message: state.message,
    products: state.products.products,
    total: state.cart.total,
    category: state.products.category,
    serverError: state.products.productServerError
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductsList);
