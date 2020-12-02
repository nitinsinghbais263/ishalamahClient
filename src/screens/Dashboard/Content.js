import React, {Component} from 'react';
import {View, Image, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import i18n from '../../../lang/i18n';
import {withNavigation} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DashboardStyle from './style';
import {getAdjustedFontSize} from '../../responsive/responsive';

class Content extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    token: '',
    data: '',
    total: '',
    initial: true,
  };

  componentWillMount() {
    this.setState({initial: false});
    this.getData();
    this.getCartCount();
  }

  getData = () => {
    AsyncStorage.getItem('TOKEN').then(value => {
      this.setState({token: value});
      this.props.getnextServiceDate(this, {
        token: this.state.token,
      });
    });
  };

  getCartCount = () => {
    AsyncStorage.getItem('TOKEN').then(value => {
      this.setState({token: value});
      this.props.getItemTotal(this, {
        token: this.state.token,
      });
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.cart) {
      this.setState({data: nextProps.cart[0].total});
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('language').then(value => {
      this.setState({language: value});
    });
  }

  renderServiceDate() {
    return (
      <View style={DashboardStyle.ContentNextServiceContainer}>
        <Text style={DashboardStyle.ContentNextServiceTitle}>
          Next Service Visit
        </Text>
        <Text style={DashboardStyle.ContentNextServiceBody}>date</Text>
      </View>
    );
  }

  render() {
    const date = this.props.data;
    if (this.state.initail) {
      AsyncStorage.getItem('CART_TOTAL').then(val => {
        this.setState({
          data: val,
        });
      });
    }
    return (
      <View style={DashboardStyle.ContentSubContainer}>
        {date && this.renderServiceDate()}
        <View style={DashboardStyle.ContentDashboardContainer}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: getAdjustedFontSize(18),
                padding: 5,
                marginTop: 5,
                color: '#6C6C6C',
                fontFamily: 'SegoeUI',
              }}>
              {i18n.t('dashboard.dashboard')}
            </Text>
          </View>
          <View style={DashboardStyle.ContentBoxContainer1}>
            <View style={DashboardStyle.ContentServiceContainer}>
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() => this.props.navigation.navigate('ServicesList')}>
                <View style={DashboardStyle.ContentServiceSubContainer}>
                  <Image
                    style={{...DashboardStyle.ContentServiceLogo}}
                    source={
                      i18n.locale === 'ar'
                        ? require('../../assets/images/ServicesAR.svg')
                        : require('../../assets/images/Services.svg')
                    }
                  />
                  <Image
                    style={[
                      DashboardStyle.ContentServiceNextArrow,
                      {
                        transform: [
                          {
                            rotate:
                              this.state.language == 'ar' ? '180deg' : '0deg',
                          },
                        ],
                      },
                    ]}
                    source={require('../../assets/images/Arrow.svg')}
                  />
                  <Text style={DashboardStyle.ContentServiceTitle}>
                    {i18n.t('dashboard.services')}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={DashboardStyle.ContentShopContainer}>
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() => this.props.navigation.navigate('Shop')}>
                <View style={DashboardStyle.ContentShopSubContainer}>
                  <Image
                    style={DashboardStyle.ContentShopLogo}
                    source={require('../../assets/images/Shop.svg')}
                  />
                  <Image
                    style={[
                      DashboardStyle.ContentShopNextArrow,
                      {
                        transform: [
                          {
                            rotate:
                              this.state.language == 'ar' ? '180deg' : '0deg',
                          },
                        ],
                      },
                    ]}
                    source={require('../../assets/images/Arrow.svg')}
                  />
                  <Text style={DashboardStyle.ContentShopTitle}>
                    {i18n.t('dashboard.shop')}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      position: 'absolute',
                      left: 15,
                      bottom: 10,
                    }}>
                    <Text style={DashboardStyle.ContentShopCartTitle}>
                      {i18n.t('dashboard.cart')}:
                    </Text>
                    <Text style={DashboardStyle.ContentShopCartLableEN}>
                      {' '}
                      {(this.state.data &&
                        this.state.data
                          .toFixed(2)
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')) ||
                        '0.00'}{' '}
                    </Text>
                    <Text style={DashboardStyle.ContentShopCartLableEN}>
                      {' '}
                      SR{' '}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={DashboardStyle.ContentBoxContainer2}>
            <View style={DashboardStyle.ContentTicketContainer}>
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() => this.props.navigation.navigate('TicketsList')}>
                <View style={DashboardStyle.ContentTicketSubContainer}>
                  <Image
                    style={DashboardStyle.ContentTicketLogo}
                    source={require('../../assets/images/Tickets.svg')}
                  />
                  <Image
                    style={[
                      DashboardStyle.ContentTicketNextArrow,
                      {
                        transform: [
                          {
                            rotate:
                              this.state.language == 'ar' ? '180deg' : '0deg',
                          },
                        ],
                      },
                    ]}
                    source={require('../../assets/images/Arrow.svg')}
                  />
                  <Text style={DashboardStyle.ContentTicketTitle}>
                    {i18n.t('dashboard.tickets')}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={DashboardStyle.ContentCashContainer}>
              {/*
                <TouchableOpacity
                  style={{flex: 1}}
                  onPress={() => this.props.navigation.navigate('CashBook')}>
                  <View style={DashboardStyle.ContentCashSubContainer}>
                    <Image
                      style={{...DashboardStyle.ContentCashLogo}}
                      source={
                        i18n.locale === 'ar'
                          ? require('../../assets/images/cashAR.svg')
                          : require('../../assets/images/cash.svg')
                      }
                    />
                    <Image
                      style={[
                        DashboardStyle.ContentCashNextArrow,
                        {
                          transform: [
                            {
                              rotate:
                                this.state.language == 'ar' ? '180deg' : '0deg',
                            },
                          ],
                        },
                      ]}
                      source={require('../../assets/images/Arrow.svg')}
                    />
                    <Text style={DashboardStyle.ContentCashTitle}>
                      {i18n.t('dashboard.cash')}
                    </Text>
                  </View>
                </TouchableOpacity>
              */}
            </View>
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
    data: state.data,
    cart: state.cart.data,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Content);
