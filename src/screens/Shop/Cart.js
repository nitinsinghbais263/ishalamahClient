import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  BackHandler,
  View,
  Image,
  FlatList,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import i18n from '../../../lang/i18n';
import Header from '../../components/Header';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {imageUrl} from '../../constants/API';
import {getAdjustedFontSize} from '../../responsive/responsive';
import DataLoader from '../../components/DataLoader';
import {Overlay} from 'react-native-elements';
import SpinnerButton from 'react-native-spinner-button';

const sysWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class CartList extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    token: '',
    productUuid: '',
    uuid: '',
    itemCount: '',
    total: '',
    subTotal: '250',
    data: [],
    items: [],
    loader: false,
    tax: '',
    shipping: '',
  };

  componentDidMount() {
    this.getData();
    // this.getTax()
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  };

  getData = () => {
    this.setState({loader: true});
    AsyncStorage.getItem('TOKEN').then(value => {
      this.setState({token: value});
      this.props.getCart(this, {
        token: this.state.token,
      });
    });
  };

  // getTax = () =>{
  //   this.setState({loader: true})
  //   AsyncStorage.getItem('TOKEN').then((value) => {
  //     this.setState({token: value})
  //     this.props.getTax(this,{
  //         token: this.state.token,
  //       })
  //   })
  // }

  addProduct(count, productUuid) {
    AsyncStorage.getItem('TOKEN').then(value => {
      this.setState({token: value});
      this.setState({productUuid: productUuid, itemCount: count});
      this.props.addToCart(this, {
        productUuid: this.state.productUuid,
        itemCount: this.state.itemCount,
      });
    });
    this.getData();
    // this.getTax()
  }

  removeProduct(uuid) {
    AsyncStorage.getItem('TOKEN').then(value => {
      this.setState({token: value});
      this.setState({uuid: uuid}),
        this.props.removeFromCart(this, {
          uuid: this.state.uuid,
        });
    });
  }

  checkout(total) {
    AsyncStorage.getItem('TOKEN').then(value => {
      this.setState({token: value});
      this.setState({total: total});
      this.props.checkoutCart(this, {
        subTotal: this.state.total,
        total: this.state.total,
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items) {
      this.setState({data: nextProps.items[0], loader: false});
    }

    if (nextProps.items) {
      this.setState({items: nextProps.items[0].items});
    }

    if (nextProps.removedItems && nextProps.removedItems.ok) {
      this.getData();
      // this.getTax()
    }
  }

  render() {
    var data = this.state.data;

    console.log('137 data', data);

    return (
      <View style={{flex: 1}}>
        <Header navigation={this.props.navigation} />

        <View style={{flex: 1}}>
          {/*
          // {this.state.loader &&
          //   <View style={{}}>
          //     <StatusBar barStyle="dark-content" backgroundColor='#F7F7F7'/>
          //     <Overlay
          //       isVisible={true}
          //       windowBackgroundColor="rgba(0, 0, 0, .5)"
          //       fullScreen={true}
          //       borderRadius={0}
          //       overlayBackgroundColor="transparent"
          //     >
          //       <View style={{width: '100%',lignSelf: 'center',marginTop: (screenHeight/2) - 30}}>
          //         <View style={{justifyContent: 'center',flexDirection: 'row',alignSelf: 'center'}}>
          //           <SpinnerButton
          //             buttonStyle={{width: 150, height: 60,backgroundColor: 'transparent', alignSelf: 'center',justifyContent: 'center',borderRadius: 5}}
          //             isLoading={this.props.loader}
          //             indicatorCount={10}
          //             size={50}
          //             spinnerType='SkypeIndicator'
          //           />
          //         </View>
          //       </View>
          //     </Overlay>
          //   </View>
          // }
          */}
          {this.state.items.length != '0' ? (
            <View style={{flex: 1}}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={this.state.items}
                renderItem={({item: rowData}) => {
                  const imageUrl = `https://core.isalamah.com/public/`;

                  return (
                    <View
                      style={{
                        width: '100%',
                        height: 100,
                        flexDirection: 'row',
                        padding: 10,
                        marginBottom: 10,
                        backgroundColor: 'transparent',
                      }}>
                      <View style={{width: 80, height: 80}}>
                        <Image
                          style={{width: '100%', height: '100%'}}
                          source={{
                            uri: imageUrl + rowData.product.product_image,
                          }}
                        />
                      </View>
                      <View style={{width: '80%', height: 100, padding: 5}}>
                        <View
                          style={{
                            width: '100%',
                            height: 30,
                            flexDirection: 'row',
                          }}>
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 16,
                              color: '#707070',
                              textOverflow: 'ellipsis',
                            }}>
                            {rowData.product.product_name}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: '100%',
                            height: 45,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                          }}>
                          <View>
                            <Text style={{fontWeight: 'bold', marginRight: 10}}>
                              {rowData.product.ppu
                                .toFixed(2)
                                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}{' '}
                              SR
                            </Text>
                          </View>
                          <Text>X</Text>
                          <View
                            style={{
                              width: 80,
                              height: '100%',
                              alignItems: 'center',
                              padding: 5,
                              justifyContent: 'center',
                              backgroundColor: '#F8F8F8',
                            }}>
                            <TextInput
                              style={{
                                width: '100%',
                                height: 45,
                                fontSize: 16,
                                textAlign:
                                  i18n.locale === 'ar' ? 'right' : 'left',
                              }}
                              placeholder={rowData.item_count + ''}
                              placeholderTextColor={'black'}
                              keyboardType="decimal-pad"
                              underlineColorAndroid="transparent"
                              value={rowData.item_count}
                              onChangeText={count =>
                                this.addProduct(count, rowData.product_uuid)
                              }
                            />
                          </View>
                          <TouchableOpacity
                            onPress={() => this.removeProduct(rowData.uuid)}>
                            <View
                              style={{height: 25, width: 25, marginRight: 25}}>
                              <Image
                                style={{width: '100%', height: '100%'}}
                                source={require('../../assets/images/delete.svg')}
                              />
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  );
                }}
                keyExtractor={(item, index) => index}
              />

              <View
                style={{
                  width: '100%',
                  height: 50,
                  flexDirection: 'row',
                  padding: 10,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: '#F1F1F1',
                  flexDirection: i18n.locale === 'ar' ? 'row-reverse' : 'row',
                }}>
                <Text style={{fontSize: 16, color: '#707070'}}>
                  {i18n.t('shop.tax')}
                </Text>
                <Text style={{fontSize: 16, color: '#707070'}}>
                  {(data.tax &&
                    data.tax
                      .toFixed(2)
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')) ||
                    '0.00'}{' '}
                  %
                </Text>
              </View>
              <View style={{width: '100%', height: 1}} />
              <View
                style={{
                  width: '100%',
                  height: 50,
                  flexDirection: 'row',
                  padding: 10,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: '#F1F1F1',
                  flexDirection: i18n.locale === 'ar' ? 'row-reverse' : 'row',
                }}>
                <Text style={{fontSize: 16, color: '#707070'}}>
                  {i18n.t('shop.shippingHandling')}
                </Text>
                <Text style={{fontSize: 16, color: '#707070'}}>
                  {(data.delivery_charge &&
                    data.delivery_charge
                      .toFixed(2)
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')) ||
                    '0.00'}{' '}
                  SR
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 50,
                  flexDirection: 'row',
                  padding: 10,
                  justifyContent: 'space-between',
                  backgroundColor: '#285DB3',
                  flexDirection: i18n.locale === 'ar' ? 'row-reverse' : 'row',
                }}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => this.checkout(data.total)}>
                  <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <Text style={{fontSize: 20, color: '#ffffff'}}>
                      {i18n.t('shop.checkout')}
                    </Text>
                    <View style={{height: 15, width: 15, marginLeft: 5}}>
                      <Image
                        style={{
                          width: '100%',
                          height: '100%',
                          resizeMode: 'contain',
                          transform: [
                            {rotate: i18n.locale === 'ar' ? '180deg' : '0deg'},
                          ],
                        }}
                        source={require('../../assets/images/Next.svg')}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                  <Text
                    style={{fontSize: 20, color: '#ffffff', fontWeight: '600'}}>
                    {(data.total &&
                      data.total
                        .toFixed(2)
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')) ||
                      '0.00'}{' '}
                    SR
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <View
              style={{
                width: '100%',
                height: 400,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: getAdjustedFontSize(18),
                  fontWeight: 'bold',
                  color: '#D4D4D4',
                  textAlign: 'center',
                }}>
                {i18n.t('shop.noProductAdded')}
              </Text>
            </View>
          )}
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
    items: state.cart.items,
    tax: state.cart.tax,
    removedItems: state.cart.removedItems,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CartList);
