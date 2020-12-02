import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import i18n from '../../../lang/i18n';
import DashboardStyle from './style';
import AsyncStorage from '@react-native-community/async-storage';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getAdjustedFontSize} from '../../responsive/responsive';

class LatestOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: '',
    };
  }

  state = {
    token: '',
    previousOrderUuid: '',
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.props.loaderStart();
    AsyncStorage.getItem('TOKEN').then(value => {
      this.setState({token: value});
      this.props.getLatestOrders(this, {
        token: this.state.token,
      });
    });
  };

  componentWillMount() {
    AsyncStorage.getItem('language').then(value => {
      this.setState({language: value});
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.props.loaderStop();
    }
    if (nextProps.error) {
      this.props.loaderStop();
    }
  }

  onSubmit(uuid) {
    AsyncStorage.getItem('TOKEN').then(value => {
      this.setState({token: value});
      this.setState({previousOrderUuid: uuid}),
        this.props.reorder(this, {
          token: this.state.token,
          previousOrderUuid: this.state.previousOrderUuid,
        });
    });
  }

  render() {
    var data = [];
    data = this.props.data;

    const language = this.state.language;

    return (
      <View>
        {data ? (
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontSize: getAdjustedFontSize(18),
                  padding: 10,
                  color: '#6C6C6C',
                  fontFamily: 'SegoeUI',
                }}>
                {i18n.t('dashboard.latestOrders')}
              </Text>
            </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={data}
              contentContainerStyle={{paddingHorizontal: 10}}
              keyExtractor={item => {
                return item.id;
              }}
              ItemSeparatorComponent={() => {
                return <View style={{marginRight: 15}} />;
              }}
              renderItem={post => {
                const item = post.item;
                var orderId = item.uuid;
                lastChar = orderId.substr(orderId.length - 5);
                return (
                  <View
                    style={{
                      width: 280,
                      shadowColor: '#00000021',
                      shadowOffset: {width: 2},
                      shadowOpacity: 0.5,
                      shadowRadius: 4,
                      backgroundColor: '#F8F8F8',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('OrderDetail', {
                          rowData: item,
                        })
                      }>
                      <View
                        style={{
                          width: '100%',
                          padding: 10,
                          borderTopLeftRadius: 1,
                          borderTopRightRadius: 1,
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View style={{}}>
                            <Text style={DashboardStyle.OrdersHeaderTitle}>
                              # {lastChar}
                            </Text>
                          </View>

                          <View
                            style={{
                              width: 24,
                              height: 24,
                              alignSelf: 'center',
                            }}>
                            <Image
                              style={{
                                width: '100%',
                                height: '100%',
                                resizeMode: 'contain',
                              }}
                              source={
                                i18n.locale === 'ar'
                                  ? require('../../assets/images/OrderAR.svg')
                                  : require('../../assets/images/Order.svg')
                              }
                            />
                          </View>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={DashboardStyle.OrdersHeaderDate}>
                            {item.created_at}
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={{
                              fontSize: getAdjustedFontSize(14),
                              color: '#808080',
                              marginTop: 15,
                              fontFamily: 'SegoeUI',
                            }}>
                            {i18n.t('dashboard.orderTotal')}:
                          </Text>
                        </View>
                        <View style={{marginBottom: 5, flexDirection: 'row'}}>
                          <Text
                            style={{
                              fontSize: getAdjustedFontSize(24),
                              color: '#808080',
                              fontWeight: '600',
                              fontFamily: 'SegoeUI',
                            }}>
                            {item.total
                              .toFixed(2)
                              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}{' '}
                            SR
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                    <View
                      style={{
                        width: '100%',
                        padding: 10,
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        backgroundColor: '#23BDE4',
                      }}>
                      <TouchableOpacity
                        style={{
                          width: '100%',
                          justifyContent: 'flex-end',
                          flexDirection: 'row',
                          backgroundColor: '#23BDE4',
                        }}
                        onPress={() => this.onSubmit(item.uuid)}>
                        <View
                          style={{width: 22, height: 22, alignSelf: 'center'}}>
                          <Image
                            style={{
                              width: '100%',
                              height: '100%',
                              resizeMode: 'contain',
                            }}
                            source={require('../../assets/images/Reorder.svg')}
                          />
                        </View>

                        <View style={{}}>
                          <Text
                            style={{
                              fontSize: getAdjustedFontSize(18),
                              fontWeight: '600',
                              color: '#ffffff',
                              fontFamily: 'SegoeUI',
                            }}>
                            {' '}
                            {i18n.t('dashboard.reorder')}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        ) : null}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    error: state.cart.latestOrdersError,
    data: state.cart.latestOrders,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LatestOrders);
