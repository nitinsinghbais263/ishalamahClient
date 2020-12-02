import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  BackHandler,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  StatusBar,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import i18n from '../../../lang/i18n';
import InvoiceStyle from './style';
import Header from '../../components/Header';
import DatePicker from 'react-native-datepicker';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DataLoader from '../../components/DataLoader';
import {Bounce} from 'react-native-animated-spinkit';
import SpinnerButton from 'react-native-spinner-button';

const screenWidth = Math.round(Dimensions.get('window').width);
class ServiceInvoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      text: 'Search',
      status: 'success',
      message: 'transaction successfull',
      invoiceUuid: '',
      loader: false,
      spinnerEnable: false,
    };
  }

  state = {
    token: '',
    serviceUuid: '',
    serviceDetail: {},
    service_uuid: '',
    invoiceUuid: '',
    spinnerEnable: false,
  };

  componentDidMount() {
    this.getData();
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
    AsyncStorage.getItem('TOKEN').then(value => {
      this.setState({token: value});
      this.setState({
        invoiceUuid: this.props.navigation.state.params.rowData.uuid,
      });
      this.props.getInvoiceDetail(this, {
        token: this.state.token,
        invoiceUuid: this.state.invoiceUuid,
      });
    });
  };

  transaction(uuid) {
    AsyncStorage.getItem('TOKEN').then(value => {
      this.setState({token: value});
      this.setState({invoiceUuid: uuid});
      this.props.invoiceTransaction(this, {
        invoiceUuid: this.state.invoiceUuid,
        status: this.state.status,
        message: this.state.message,
        startDate: this.state.date,
      });
    });
  }

  // inCash(uuid) {
  //   this.setState({spinnerEnable: true});
  //   AsyncStorage.getItem('TOKEN').then(value => {
  //     console.log('cashcheck value', value);
  //     this.setState({token: value});
  //     this.setState({invoiceUuid: uuid});
  //     this.props.invoicePayInCash(this, {
  //       invoiceUuid: this.state.invoiceUuid,
  //     });
  //   });
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.serviceDetail) {
      var serviceId = nextProps.serviceDetail.uuid;
      serviceUuid = serviceId.substr(serviceId.length - 5);
      this.setState({
        serviceDetail: nextProps.serviceDetail,
        service_uuid: serviceUuid,
        spinnerEnable: false,
      });
    }

    if (nextProps.details) {
      this.setState({data: nextProps.details, spinnerEnable: false});
    }

    if (nextProps.serverError) {
      this.setState(
        {
          errorText: nextProps.serverError,
          errorMesssge: nextProps.serverError,
          errorModal: true,
          spinnerEnable: false,
        },
        () => {
          setTimeout(() => {
            this.setState({errorModal: false});
          }, 2000);
        },
      );
    }
  }

  render() {
    const {spinnerEnable} = this.state;
    var data = this.props.navigation.state.params.rowData;
    var invoiceId = data.uuid;
    invoiceUuid = invoiceId.substr(invoiceId.length - 5);

    return (
      <View style={{flex: 1}}>
        <Header navigation={this.props.navigation} />
        <View style={{flex: 1, marginBottom: 10}}>
          <View
            style={{
              width: '100%',
              height: 130,
              backgroundColor: 'transparent',
            }}>
            <View
              style={{
                width: '100%',
                height: 100,
                padding: 10,
                backgroundColor: '#F8F8F8',
              }}>
              <View
                style={{
                  width: '100%',
                  height: 50,
                  justifyContent: 'space-between',
                  marginBottom: 30,
                }}>
                <Text style={{fontSize: 12, color: '#707070', marginBottom: 5}}>
                  {data.type} #{data.uuid}
                </Text>
                <Text
                  style={{fontSize: 12, color: '#707070', marginBottom: 10}}>
                  {i18n.t('invoice.created')}: {data.created_at}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={[
                      InvoiceStyle.InvoiceStatus,
                      {
                        backgroundColor:
                          data.status == 'unpaid' ? '#F21414' : '#82BF18',
                      },
                    ]}>
                    <Text style={{fontSize: 14, color: '#ffffff'}}>
                      {data.status}
                    </Text>
                  </View>
                  <View style={{width: '0%'}} />
                </View>
              </View>
            </View>
            {data.status == 'unpaid' ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                }}>
                <View style={{width: screenWidth / 3.5, height: 20}} />
                {/*
                  <View style={{width: screenWidth / 3.5, height: 20}}>
                    {!spinnerEnable ? (
                      <TouchableOpacity
                        style={{
                          width: 110,
                          height: 35,
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'row',
                          position: 'absolute',
                          top: -17,
                          backgroundColor: '#85bb65',
                        }}
                        onPress={() => this.inCash(data.uuid)}>
                        <View
                          style={{
                            width: 110,
                            height: 35,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            backgroundColor: '#85bb65',
                          }}>
                          <View style={{height: 15, width: 15, marginRight: 5}}>
                            <Image
                              style={{
                                width: '100%',
                                height: '100%',
                                resizeMode: 'contain',
                              }}
                              source={require('../../assets/images/Invoices.svg')}
                            />
                          </View>
                          <Text style={{fontSize: 12, color: '#ffffff'}}>
                            {i18n.t('invoice.payCash')}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <View
                        style={{
                          width: 110,
                          height: 35,
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'row',
                          position: 'absolute',
                          top: -17,
                          backgroundColor: '#85bb65',
                        }}>
                        <SpinnerButton
                          buttonStyle={{
                            width: 110,
                            height: 35,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            backgroundColor: '#85bb65',
                          }}
                          isLoading={spinnerEnable}
                          indicatorCount={10}
                          size={10}
                          spinnerType="DotIndicator"
                        />
                      </View>
                    )}
                  </View>
                */}

                <View style={{width: screenWidth / 3.5, height: 20}}>
                  <TouchableOpacity
                    style={{
                      width: 110,
                      height: 35,
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                      position: 'absolute',
                      top: -17,
                      backgroundColor: '#23BDE4',
                    }}
                    // onPress={()=> this.props.navigation.navigate("Payment", {invoiceUuid:  this.props.navigation.state.params.rowData.uuid, token: this.state.token, that: this})}
                    onPress={() =>
                      this.props.navigation.navigate('Payment', {
                        invoiceUuid: this.props.navigation.state.params.rowData
                          .uuid,
                      })
                    }>
                    <View
                      style={{
                        width: 110,
                        height: 35,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        backgroundColor: '#23BDE4',
                      }}>
                      <View style={{height: 15, width: 15, marginRight: 5}}>
                        <Image
                          style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'contain',
                          }}
                          source={require('../../assets/images/Paid.svg')}
                        />
                      </View>
                      <Text style={{fontSize: 12, color: '#ffffff'}}>
                        {i18n.t('invoice.payNow')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.state.data && this.state.data.items}
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
                  <View style={{width: '80%', height: 100, padding: 5}}>
                    <View style={{width: '100%', height: 30, paddingLeft: 10}}>
                      <Text
                        numberOfLines={1}
                        style={{
                          fontSize: 16,
                          color: '#707070',
                          textOverflow: 'ellipsis',
                        }}>
                        Service
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '60%',
                        height: 45,
                        paddingLeft: 10,
                        paddingRight: 20,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                      }}>
                      <Text style={{fontWeight: 'bold', marginRight: 10}}>
                        {rowData.ppu
                          .toFixed(2)
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                      </Text>
                      <Text>X</Text>
                      <Text style={{fontSize: 16}}>{rowData.quantity}</Text>
                    </View>
                  </View>
                </View>
              );
            }}
            keyExtractor={(item, index) => index}
          />
        </View>
        <View
          style={{
            width: '100%',
            height: 50,
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#F1F1F1',
          }}>
          <Text style={{fontSize: 16, color: '#707070'}}>
            {i18n.t('shop.subTotal')}
          </Text>
          <Text style={{fontSize: 16, color: '#707070'}}>
            {data.sub_total &&
              data.sub_total
                .toFixed(2)
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}{' '}
            SR
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
          }}>
          <Text style={{fontSize: 16, color: '#707070'}}>
            {i18n.t('shop.tax')}
          </Text>
          <Text style={{fontSize: 16, color: '#707070'}}>
            {data.tax &&
              data.tax
                .toFixed(2)
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}{' '}
            %
          </Text>
        </View>
        <View style={{width: '100%', height: 1}} />
        {/*
          <View style={{width: '100%', height:50, flexDirection:'row', padding: 10,justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F1F1F1'}}>
            <Text style={{fontSize: 16, color: '#707070'}}>{i18n.t('shop.shippingHandling')}</Text>
            <Text style={{fontSize: 16, color: '#707070'}}>0.00 SR</Text>
          </View>
        */}
        <View
          style={{
            width: '100%',
            height: 50,
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#285DB3',
          }}>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <Text style={{fontSize: 20, color: '#ffffff'}}>
              {i18n.t('shop.total')}
            </Text>
          </View>

          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <Text style={{fontSize: 20, color: '#ffffff', fontWeight: '600'}}>
              {data.total &&
                data.total
                  .toFixed(2)
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}{' '}
              SR
            </Text>
          </View>
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
    serviceDetail: state.service.serviceDetail,
    details: state.invoices.details,
    serverError: state.invoices.serverError,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ServiceInvoice);
