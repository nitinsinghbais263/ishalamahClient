import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  FlatList,
  ScrollView,
  BackHandler,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import i18n from '../../../lang/i18n';
import {withNavigation} from 'react-navigation';
import Header from '../../components/Header';
import TicketsCategory from './TicketsCategory';
import AsyncStorage from '@react-native-community/async-storage';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getAdjustedFontSize} from '../../responsive/responsive';
import Modal from 'react-native-modal';
import DataLoader from '../../components/DataLoader';
import {Bounce} from 'react-native-animated-spinkit';

import {NavigationEvents} from 'react-navigation';

class TicketsList extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    token: '',
    search: '',
    status: '',
    category: '',
    categoryStatus: '',
    isLoading: false,
    isModalVisible: false,
    loader: false,
  };

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  componentDidMount() {
    //this.getData();
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
      this.props.getTicketsList(this, {
        token: this.state.token,
        status: this.state.categoryStatus,
      });
    });
  };

  onSearch = search => {
    if (search.length >= 3) {
      this.setState({search: search}, () => {
        this.props.getTicketsList(this, {
          token: this.state.token,
          search: search,
        });
      });
    } else {
      this.setState({search: ''}, () => {
        this.props.getTicketsList(this, {
          token: this.state.token,
          search: this.state.search,
        });
      });
    }
  };

  onRefresh = () => {
    this.setState({isLoading: true});
    setTimeout(() => {
      this.setState(
        {
          isLoading: false,
        },
        () => {
          this.getData();
        },
      );
    }, 1000);
  };

  selectedCategory = status => {
    this.setState({categoryStatus: status}, () => {
      if (status) {
        this.props.getTicketsList(this, {
          token: this.state.token,
          status: status,
        });
      } else {
        this.setState({categoryStatus: ''}, () => {
          this.props.getTicketsList(this, {
            token: this.state.token,
            status: this.state.categoryStatus,
          });
        });
      }
    });
  };

  // getCategory = () =>{
  //   AsyncStorage.getItem('TOKEN').then((value) => {
  //     this.setState({token: value})
  //     this.props.getCategoryList(this,{
  //         token: this.state.token,
  //       })
  //   })
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.search) {
      this.setState({ search: search });
    }
    if (nextProps.category) {
      this.setState({
        category: nextProps.category,
      });
    }

    if (nextProps.tickets) {
      this.setState({loader: false});
    }
    if (nextProps.serverError) {
      this.setState({loader: false});
    }
  }

  render() {
    var data = [];
    data = this.props.tickets;
    const screenWidth = Math.round(Dimensions.get('window').width);
    const screenHeight = Math.round(Dimensions.get('window').height);
    // const tickets = this.state.tickets

    return (
      <View style={{flex: 1}}>
        <Header navigation={this.props.navigation} />
        {/*Filter*/}
        <TicketsCategory
          navigation={this.props.navigation}
          selectedCategory={this.selectedCategory}
          category={this.state.category}
        />

        <NavigationEvents
          onDidFocus={payload => {
            this.getData();
          }}
        />

        {/*Filter*/}

        {/*Add Ticket*/}
        <TouchableOpacity
          style={{
            height: 60,
            width: 60,
            position: 'absolute',
            bottom: 10,
            right: 10,
            zIndex: 99999,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 60 / 2,
            backgroundColor: '#285DB3',
            marginRight: 10,
            marginBottom: 10,
            overflow: 'hidden',
          }}
          onPress={() => this.props.navigation.navigate('NewTicket')}>
          <View
            style={{
              height: 60,
              width: 60,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#285DB3',
            }}>
            <View style={{width: 25, height: 25}}>
              <Image
                style={{width: '100%', height: '100%', resizeMode: 'contain'}}
                source={require('../../assets/images/Add.svg')}
              />
            </View>
          </View>
        </TouchableOpacity>
        {/*Add Ticket*/}
        <View style={{marginBottom: 5}}>
          <View style={{padding: 10}}>
            <View
              style={{
                width: '100%',
                height: 40,
                flexDirection: 'row',
                backgroundColor: '#F8F8F8',
                borderRadius: 50,
              }}>
              <TextInput
                style={{
                  backgroundColor: '#F8F8F8',
                  width: '80%',
                  height: 40,
                  paddingLeft: 10,
                  fontSize: getAdjustedFontSize(16),
                  borderRadius: 50,
                  borderBottomColor: '#F8F8F8',
                  textAlign: i18n.locale === 'ar' ? 'right' : 'left',
                }}
                placeholder={i18n.t('ticket.search')}
                keyboardType="email-address"
                underlineColorAndroid="transparent"
                onChangeText={search => this.onSearch(search)}
              />
              <View
                style={{
                  height: 20,
                  width: 20,
                  position: 'absolute',
                  right: 20,
                  top: 10,
                }}>
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'contain',
                    transform: [
                      {rotate: i18n.locale === 'ar' ? '90deg' : '0deg'},
                    ],
                  }}
                  source={require('../../assets/images/Search.svg')}
                />
              </View>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: getAdjustedFontSize(18),
                color: '#6C6C6C',
                padding: 10,
                paddingTop: 10,
                paddingBottom: 10,
              }}>
              {this.state.categoryStatus
                ? this.state.categoryStatus + i18n.t('ticket.tickets')
                : i18n.t('ticket.allTickets')}
            </Text>
          </View>
          {this.state.loader ? (
            <View
              style={{
                width: '100%',
                height: 400,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Bounce
                style={{
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                size={48}
                color="#2383C3"
              />
            </View>
          ) : (
            <View style={{}}>
              {data ? (
                <FlatList
                  data={data}
                  extraData={data}
                  contentContainerStyle={{paddingBottom: 50}}
                  refreshing={this.state.isLoading}
                  onRefresh={() => {
                    this.onRefresh();
                  }}
                  showsVerticalScrollIndicator={false}
                  ListFooterComponent={
                    <View style={{height: screenHeight / 2.5}} />
                  }
                  ItemSeparatorComponent={() => {
                    return <View style={styles2.separator} />;
                  }}
                  renderItem={({item: rowData}) => {
                    var invoiceId = rowData.uuid;
                    lastChar = invoiceId.substr(invoiceId.length - 5);
                    return (
                      <TouchableOpacity
                        style={{width: '100%'}}
                        onPress={() =>
                          this.props.navigation.navigate('TicketDetails', {
                            rowData: rowData,
                          })
                        }>
                        <View style={styles2.card}>
                          <View style={styles2.cardHeader}>
                            <View style={{flexDirection: 'row'}}>
                              <Image
                                style={{
                                  width: 25,
                                  height: 25,
                                  resizeMode: 'contain',
                                  alignSelf: 'flex-end',
                                  position: 'absolute',
                                  right: 0,
                                }}
                                source={
                                  i18n.locale === 'ar'
                                    ? require('../../assets/images/OrderAR.svg')
                                    : require('../../assets/images/Order.svg')
                                }
                              />
                              <Text
                                style={{
                                  color: '#9DD10D',
                                  fontSize: getAdjustedFontSize(18),
                                  alignSelf: 'flex-start',
                                }}>
                                {rowData.status}
                              </Text>
                              <Text style={styles2.title}># {lastChar}</Text>
                            </View>
                            <View>
                              <Text
                                style={{
                                  color: '#888',
                                  marginTop: 10,
                                  fontSize: getAdjustedFontSize(22),
                                  alignSelf: 'flex-start',
                                }}
                                numberOfLines={1}>
                                {rowData.subject}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: '100%',
                                paddingTop: 10,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              }}>
                              <Text
                                style={{
                                  fontSize: getAdjustedFontSize(16),
                                  color: '#888',
                                }}>
                                {i18n.t('ticket.createdOn')}:
                              </Text>
                              <Text
                                style={{
                                  fontSize: getAdjustedFontSize(16),
                                  color: '#888',
                                }}>
                                {rowData.created_at}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
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
                    {i18n.t('ticket.noActiveTickets')}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
        {/*Modal*/}
        <View style={{}}>
          <Modal
            animationIn="fadeIn"
            animationOut="fadeOut"
            isVisible={this.state.isModalVisible}
            onBackdropPress={() => this.toggleModal()}
            backdropOpacity={0.1}>
            <View
              style={{position: 'absolute', top: screenHeight / 6, right: -10}}>
              <View style={{}}>
                <View
                  style={{
                    width: screenWidth / 2 + 30,
                    height: 150,
                    borderRadius: 10,
                    padding: 10,
                    backgroundColor: '#FFFFFF',
                  }}>
                  <Text>hjdgkjdfhjkdfkng</Text>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        {/*Modal*/}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    success: state.success,
    error: state.error,
    message: state.message,
    tickets: state.tickets.tickets,
    category: state.products.category,
    serverError: state.tickets.ticketServerError,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TicketsList);

const styles2 = StyleSheet.create({
  container: {
    height: '100%',
    marginBottom: 50,
  },
  list: {},
  separator: {
    marginBottom: 10,
  },
  /******** card **************/
  card: {
    width: '100%',

    padding: 10,
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,

    backgroundColor: '#F8F8F8',
  },
  cardHeader: {
    width: '100%',

    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
  },

  /******** card components **************/
  title: {
    fontSize: getAdjustedFontSize(18),
    color: '#285DB3',
    position: 'absolute',
    right: 30,
    textTransform: 'uppercase',
  },
  description: {
    fontSize: getAdjustedFontSize(11),
    color: '#888',
    marginTop: 5,
  },
  newprice: {
    fontSize: getAdjustedFontSize(24),
    color: '#808080',
    fontWeight: '600',
  },
  discount: {
    fontSize: getAdjustedFontSize(14),
    color: '#808080',
    marginTop: 10,
    marginLeft: 5,
  },
  timeContainer: {
    marginBottom: 5,
    flexDirection: 'row',
  },
});
