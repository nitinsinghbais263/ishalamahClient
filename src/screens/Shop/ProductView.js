import React, {Component} from 'react';
import {ScrollView, Text, TextInput, View, Image, FlatList, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity,TouchableWithoutFeedback, BackHandler, Keyboard } from 'react-native';
import i18n from '../../../lang/i18n'
import Modal from "react-native-modal";
import Swiper from 'react-native-swiper';
import Header from '../../components/Header';
import PropTypes from 'prop-types';
import ProductsCategory from './ProductsCategory'
import ProductsAdded from './ProductsAdded';
import AsyncStorage from '@react-native-community/async-storage';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getAdjustedFontSize} from '../../responsive/responsive';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

class ProductView extends Component {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params.rowData;
  }

  state = {
    token: "",
    total: "",
    productUuid: "",
    itemCount: 1,
    category: "",
    isModalVisible: false
  };

  toggleModal = (rowData) => {
    this.setState({ isModalVisible: !this.state.isModalVisible, product: rowData });
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

  componentWillMount() {
    this.getCategory()
  }

  getCategory = () =>{
    AsyncStorage.getItem('TOKEN').then((value) => {
      this.setState({token: value})
      this.props.getCategoryList(this,{
          token: this.state.token,
        })
    })
  }

  onSearch = (search) =>{

    if(search.length>=3){
    this.setState({search: search},()=>{
      this.props.navigation.goBack();
      this.props.getProductsList(this,{
        token: this.state.token,
        search: search
     })
   })
   } else{

     this.setState({search: ""}, ()=>{

       this.props.getProductsList(this,{
         token: this.state.token,
         search: this.state.search
     })})
   }
  }

  addProduct(uuid){
      AsyncStorage.getItem('TOKEN').then((value) => {
        this.setState({token: value})
        this.setState({ productUuid: uuid}),
        this.props.addToCart(this,{
          productUuid: this.state.productUuid,
          itemCount: this.state.itemCount
          })
      })
      this.toggleModal()

      setTimeout(() => {
        this.setState({
        isModalVisible: false
        })
      }, 2000);
  }

  componentWillReceiveProps(nextProps) {

    if(nextProps.total) {
      this.setState({
        total: nextProps.total,
      })
    }

    if(nextProps.category){
      this.setState({
        category: nextProps.category,
      })
    }

  }

  prevButton(){
      if (this.state.currentStepIndex > 0) {
        this.flatListRef.scrollToIndex({index: this.state.currentStepIndex - 1, animated: true});
        this.setState(function(prevState, props) {
          return {
            currentStepIndex: prevState.currentStepIndex - 1
          };
        });
      }
    }

  nextButton(){
      if (this.state.currentStepIndex < this.state.profileData.length - 1) {
        this.flatListRef.scrollToIndex({index: this.state.currentStepIndex + 1, animated: true});
        this.setState(function(prevState, props) {
          return {
            currentStepIndex: prevState.currentStepIndex + 1
          };
        });
      }
    }

  render() {
    var data = []
    data = this.props.navigation.state.params.rowData

    return (
      <DismissKeyboard>
        <View style={{flex: 1}}>
          <Header navigation={this.props.navigation} />
          {/*
            { this.state.category !== "" ?
                <ProductsCategory navigation={this.props.navigation} category={this.state.category}/>
              : null
            }*/}
          <ProductsAdded navigation={this.props.navigation} total={this.state.total} onSearch={this.onSearch} />
          <KeyboardAwareScrollView>
          <View style={{flex:1,}}>
            <View style={{width: "100%", height: 280}}>
              <Swiper containerStyle={styles.wrapper}>
              {
                data.images.map((item, index) =>{
                  const imageUrl = `https://core.isalamah.com/public/`
                  return (
                      <View style={styles.slide1}>
                        <Image
                          source={{uri:imageUrl+item.path}}
                          style={{width: "100%", height: "100%", resizeMode: 'cover'}}
                        />
                      </View>
                   )
                })
              }
                </Swiper>
            </View>
            <View style={{width: "100%",marginTop: 10, paddingLeft: 10, paddingRight: 10,flexDirection: 'row' }}>
              <Text style={{fontSize: getAdjustedFontSize(24), color: '#707070'}}>{data.name}</Text>
            </View>
            <View style={{width:'100%', paddingLeft: 10, paddingRight: 10,flexDirection: 'row'}}>
              <Text style={{ color:'#888', marginTop: 5, textAlign: 'justify' }}>{data.description}</Text>
            </View>
            <View style={{width: "100%", flexDirection: 'row', marginTop: 10, paddingLeft: 10, paddingRight: 10}}>
              <Text style={{fontSize: getAdjustedFontSize(24), color: '#285DB3', fontWeight: 'bold'}}>{data.price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} SR</Text>
            </View>
            <View style={{width: "100%", paddingBottom: 50,flexDirection: 'row', marginTop: 10, backgroundColor: '#F8F8F8'}}>
              <TextInput style={{ backgroundColor: '#F8F8F8', width: 150, height: 40, paddingLeft: 10,paddingTop: 0,paddingBottom: 0, fontSize: getAdjustedFontSize(20), borderBottomColor: '#F8F8F8', textAlign: i18n.locale==='ar'? 'right': "left" }}
                  placeholder='1'
                  keyboardType="decimal-pad"
                  underlineColorAndroid='transparent'
                  value={this.state.itemCount}
                  onChangeText={(itemCount) => this.setState({itemCount: itemCount})}/>
              <TouchableOpacity style={{width: 150, height: 40, flexDirection: 'row', position: 'absolute', right: 10 ,alignItems: 'center', backgroundColor: '#23BDE4', borderRadius: 50, overFlow: 'hidden'}} onPress={() => this.addProduct(data.uuid)}>
              <View style={{width: 150, height: 40, flexDirection: 'row', position: 'absolute', right: 10 ,alignItems: 'center', backgroundColor: '#23BDE4', borderRadius: 50, overFlow: 'hidden'}}>
                <View style={{height: 20, width: 20, marginLeft: 15 }}>
                  <Image style={{ width: '100%', height: '100%', resizeMode:'contain'}} source={require('../../assets/images/Cart.svg')} />
                </View>
                <Text style={{fontSize: getAdjustedFontSize(16), color: '#ffffff', alignSelf: 'center', marginLeft: 10}}>{i18n.t('shop.addToCart')}</Text>
              </View>
              </TouchableOpacity>
            </View>

          </View>
        </KeyboardAwareScrollView>

          <View>
            <Modal
                animationInTiming={1000}
                animationOutTiming={1000}
                animationIn="fadeIn"
                animationOut="fadeOut"
                isVisible={this.state.isModalVisible}>
              <View style={{ width: '100%', height: 180, padding: 5, borderRadius: 25, overFlow: 'hidden', backgroundColor: '#23BDE4' }}>

              <View style={{width: 120, height: 120, position: 'absolute', top: -60, alignSelf: 'center'}}>
                  <View style={{height: 120, width: 120}}>
                    <Image style={{ width: '100%', height: '100%'}} source={require('../../assets/images/ThankYou.svg')} />
                  </View>
              </View>

              <View style={{ width: '100%', height: 120}}>
                <Text style={{ color: '#ffffff', fontSize: getAdjustedFontSize(32), alignSelf: 'center', marginTop: 70}}>{i18n.t('shop.done')}</Text>
                <Text style={{ color: '#ffffff', fontSize: getAdjustedFontSize(14), fontWeight: '600', alignSelf: 'center', marginTop: 20}}>{i18n.t('shop.successfully')}</Text>
              </View>

              </View>
            </Modal>
          </View>

        </View>
      </DismissKeyboard>
    );
  }
}

function mapStateToProps(state) {
  return {
    success: state.success ,
    error: state.error,
    message: state.message,
    data: state.products.data,
    total: state.cart.total,
    category: state.products.category
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}


const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    marginTop: 10
  },
  slide1: {
    width: '100%',
    // height: 350,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },

})

export default connect(mapStateToProps,mapDispatchToProps)(ProductView);
