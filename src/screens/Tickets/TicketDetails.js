import React, {Component} from 'react';
import {
  View,
  Image,
  ImageBackground,
  FlatList,
  Linking,
  BackHandler,
  Alert,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import i18n from '../../../lang/i18n';
import {withNavigation} from 'react-navigation';
import StarRating from 'react-native-star-rating';
import Modal from 'react-native-modal';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-community/async-storage';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getAdjustedFontSize} from '../../responsive/responsive';
import {NavigationEvents} from 'react-navigation';

class TicketDetails extends Component {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params.rowData;
    this.state = {
      starCount: 0,
      ticketUuid: '',
      tUuid: '',
      uuid: '',
      data: '',
      clientId: '',
      serviceId: '',
      haveReport: 0,
      notes: [],
    };
  }

  state = {
    token: '',
    uuid: '',
    isModalVisible: false,
    isLoading: false,
    notes: [],
  };

  toggleModal = rowData => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      product: rowData,
    });
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }
  componentWillMount() {}

  handleBackPress = () => {
    this.props.navigation.navigate('TicketsList');
    return true;
  };

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  };

  getData = () => {
    const _that = this;
    AsyncStorage.getItem('TOKEN').then(value => {
      this.setState({token: value});
      if (_that.props.navigation.state.params.data) {
        _that.setState({tUuid: _that.props.navigation.state.params.data.uuid});
      } else {
        _that.setState({
          tUuid: _that.props.navigation.state.params.rowData.uuid,
        });
      }
      _that.props.getTicketDetail(_that, {
        token: _that.state.token,
        ticketUuid: _that.state.tUuid,
      });
    });
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
    }, 2000);
  };

  getReportView = () => {
    const _that = this;
    AsyncStorage.getItem('TOKEN').then(value => {
      this.setState({token: value});

      if (_that.props.navigation.state.params.data) {
        _that.setState({uuid: _that.props.navigation.state.params.data.uuid});
      } else {
        _that.setState({
          uuid: _that.props.navigation.state.params.rowData.uuid,
        });
      }
      _that.props.getReportView(this, {
        token: _that.state.token,
        uuid: _that.state.uuid,
      });
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.ticketDetail) {
      this.setState({
        data: nextProps.ticketDetail,
        clientId: nextProps.ticketDetail.client_uuid,
        serviceId: nextProps.ticketDetail.mc_uuid,
        haveReport: nextProps.ticketDetail.have_report,
        starCount: nextProps.ticketDetail.rate,
        techUuid: nextProps.ticketDetail.technician_uuid,
        completedOn: nextProps.ticketDetail.completed_on,
        notes: nextProps.ticketDetail.notes,
      });
    }
    if (nextProps.reportView) {
      this.setState({
        report: nextProps.reportView,
      });
    }
    if (nextProps.deleteNote) {
      this.getData();
    }
    if (nextProps.notes) {
      this.setState({
        notes: nextProps.notes.notes,
      });
    }
    if (nextProps.userdata) {
      this.setState({
        fullname: nextProps.userdata.full_name,
        userUuid:
          nextProps.userdata &&
          nextProps.userdata.uuid.substr(nextProps.userdata.uuid.length - 5),
        image: nextProps.userdata.profile_image,
      });
    }
  }

  onStarRatingPress(rating) {
    const _that = this;
    AsyncStorage.getItem('TOKEN').then(value => {
      this.setState({token: value});

      if (_that.props.navigation.state.params.data) {
        _that.setState({tUuid: _that.props.navigation.state.params.data.uuid});
      } else {
        _that.setState({
          tUuid: _that.props.navigation.state.params.rowData.uuid,
        });
      }
      _that.setState({starCount: rating});
      _that.props.ratingTicket(_that, {
        token: _that.state.token,
        ticketUuid: _that.state.tUuid,
        rate: _that.state.starCount,
        ratingNotes: 'this is test rating',
      });
    });

    this.toggleModal();

    setTimeout(() => {
      this.setState({
        isModalVisible: false,
      });
    }, 1000);
  }

  handleClick = () => {
    console.log(this.state.report);

    // this.props.downloadReport(this,{
    //     token: this.state.token,
    //     ticketUuid: this.state.tUuid,
    //   })

    Linking.canOpenURL(this.state.report).then(supported => {
      if (supported) {
        Linking.openURL(this.state.report);
      } else {
        alert("Don't know how to open URI: ");
      }
    });
  };

  onDelete = uuid => {
    AsyncStorage.getItem('TOKEN').then(value => {
      this.setState({token: value, uuid: uuid});
      this.props.deleteNotes(this, {
        token: this.state.token,
        uuid: uuid,
      });
    });
  };

  render() {
    var data = [];
    data = this.state && this.state.data;

    var clientId = this.state.clientId;
    client_Id = clientId && clientId.substr(clientId.length - 5);

    var serviceId = this.state.serviceId;
    service_Id = serviceId && serviceId.substr(serviceId.length - 10);

    var notes = [];
    notes = this.state.data.notes;

    return (
      <View style={{flex: 1}}>
        <Header navigation={this.props.navigation} />

        <NavigationEvents
          onDidFocus={payload => {
            this.getData();
            this.getReportView();
          }}
        />

        {/*
          <SafeAreaView style={{backgroundColor:'#2383C3'}}>
          <StatusBar backgroundColor="#2383C3" barStyle="light-content" />
          <View style={{ flexDirection: 'row', width: '100%', height: 60, backgroundColor: '#2383C3' }}>
            <TouchableOpacity style={{position: 'absolute', left: 0, top: 20}} onPress={() => this.props.navigation.navigate("TicketsList")}>
              <Image style={{ width: 25, height: 25, marginLeft: 4, transform: [{ rotate: this.state.language == 'ar' ? '180deg' : '0deg' }] }} source={require('../../assets/images/back.svg')}/>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', position: 'absolute', right: 0, top: 5 }}>
              <View style={{paddingTop:10}}>
                <Text style={{fontSize: 12, color: '#ffffff', marginRight: 10}}>{i18n.t('drawer.account')} # {this.state.userUuid}</Text>
                <Text style={{fontSize: 16, color: '#ffffff', marginRight: 10}}>{this.state.fullname}</Text>
              </View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('UserProfile')}>
                <View style={{height: 50, width: 50, borderRadius: 50 / 2, borderWidth: 2.5, borderColor: '#ffffff', marginRight: 10, marginBottom: 10, overflow: 'hidden' }}>
                  <Image style={{ width: '100%', height: '100%'}} source={this.props.userdata && this.props.userdata.profile_image ? {uri: 'https://core.isalamah.com/public/'+this.props.userdata.profile_image } : require('../../assets/images/user-2.svg')} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          </SafeAreaView>
        */}

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.isLoading}
              onRefresh={() => {
                this.onRefresh();
              }}
            />
          }>
          {/*Agent*/}
          {this.state.techUuid == null ? null : (
            <View style={{width: '100%'}}>
              <ImageBackground
                source={require('../../assets/images/TicketBg.svg')}
                style={{
                  height: 250,
                  width: '100%',
                  position: 'absolute',
                  resizeMode: 'contain',
                }}
              />
              <View style={{marginTop: 50}}>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 5,
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: '#ffffff', textAlign: 'center'}}>
                    {i18n.t('ticket.agentBadge')}
                  </Text>
                  <Text style={{color: '#ffffff', textAlign: 'center'}}>
                    {' '}
                    # {client_Id}
                  </Text>
                </View>
                <Text
                  style={{fontSize: 18, color: '#ffffff', textAlign: 'center'}}>
                  {data.technician_name}
                </Text>

                <View
                  style={{
                    width: '50%',
                    flexDirection: 'row',
                    padding: 5,
                    alignSelf: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#ffffff',
                      textAlign: 'center',
                    }}>
                    Monday
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#ffffff',
                      textAlign: 'center',
                    }}>
                    11/12/2019
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#ffffff',
                      textAlign: 'center',
                    }}>
                    12:05 PM
                  </Text>
                </View>
              </View>
              <View
                style={{
                  height: 120,
                  width: 120,
                  borderRadius: 120 / 2,
                  borderWidth: 2.5,
                  borderColor: '#ffffff',
                  alignSelf: 'center',
                  position: 'absolute',
                  top: 150,
                  overflow: 'hidden',
                }}>
                <Image
                  style={{width: '100%', height: '100%', resizeMode: 'cover'}}
                  source={
                    data && data.technician_image
                      ? {
                          uri:
                            'https://core.isalamah.com/public/' +
                            data.technician_image,
                        }
                      : require('../../assets/images/user-2.svg')
                  }
                />
              </View>
              <View
                style={{
                  width: '100%',
                  height: 60,
                  flexDirection: 'row',
                  alignSelf: 'center',
                  marginTop: 170,
                }}>
                <TouchableOpacity
                  style={{
                    height: 60,
                    width: 60,
                    position: 'absolute',
                    left: 110,
                  }}
                  onPress={() => Alert.alert(i18n.t('sorry'), i18n.t('map'))}>
                  <View>
                    <Image
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'contain',
                      }}
                      source={require('../../assets/images/AgentMap.svg')}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: 60,
                    width: 60,
                    position: 'absolute',
                    right: 110,
                  }}
                  onPress={() => Alert.alert(i18n.t('sorry'), i18n.t('call'))}>
                  <View>
                    <Image
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'contain',
                      }}
                      source={
                        i18n.locale === 'ar'
                          ? require('../../assets/images/AgentCallAR.svg')
                          : require('../../assets/images/AgentCall.svg')
                      }
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
          <View style={{width: '100%', height: 80, marginTop: 30}}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#707070',
                textAlign: 'center',
              }}>
              {i18n.t('ticket.how')}
            </Text>
            <StarRating
              disabled={false}
              containerStyle={{
                width: '60%',
                paddingTop: 10,
                alignSelf: 'center',
              }}
              buttonStyle={{margin: 3, alignSelf: 'center'}}
              maxStars={5}
              rating={this.state.starCount}
              halfStarEnabled={false}
              emptyStarColor="#CECECE"
              fullStarColor="#F2C014"
              selectedStar={rating => this.onStarRatingPress(rating)}
            />
          </View>
          {/*Details*/}
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '400',
                color: '#707070',
                margin: 10,
              }}>
              {i18n.t('ticket.details')}
            </Text>
          </View>
          <View
            style={{padding: 10, backgroundColor: '#F8F8F8', marginBottom: 10}}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{fontSize: 14, fontWeight: 'bold', color: '#707070'}}>
                {data.subject}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#707070',
                  marginTop: 5,
                  marginBottom: 15,
                }}>
                {data.content}
              </Text>
            </View>
          </View>
          {/*Related Service*/}

          {this.state.serviceId ? (
            <View>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '400',
                    color: '#707070',
                    margin: 10,
                  }}>
                  {i18n.t('ticket.relatedService')} #
                </Text>
              </View>

              <View
                style={{
                  padding: 10,
                  backgroundColor: '#F8F8F8',
                  marginBottom: 10,
                  flexDirection: 'row',
                }}>
                <Text style={{fontSize: 16, color: '#707070'}}>
                  {service_Id}
                </Text>
              </View>
            </View>
          ) : null}

          <View>
            {this.state.haveReport === 1 ? (
              <View
                style={{
                  width: '100%',
                  height: 80,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 10,
                }}>
                <TouchableOpacity
                  style={{
                    width: '48%',
                    height: 50,
                    backgroundColor: '#23BDE4',
                    flexDirection: 'row',
                    borderRadius: 50,
                    alignItems: 'center',
                    padding: 10,
                  }}
                  onPress={() =>
                    this.props.navigation.navigate('ReportView', {
                      uuid: data.uuid,
                    })
                  }>
                  <View
                    style={{
                      width: '100%',
                      height: 50,
                      backgroundColor: '#23BDE4',
                      flexDirection: 'row',
                      borderRadius: 50,
                      alignItems: 'center',
                      padding: 10,
                    }}>
                    <View style={{width: 25, height: 25}}>
                      <Image
                        style={{
                          width: '100%',
                          height: '100%',
                          resizeMode: 'contain',
                        }}
                        source={require('../../assets/images/ViewReport.svg')}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#ffffff',
                        marginLeft: 10,
                      }}>
                      {i18n.t('ticket.viewReport')}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: '48%',
                    height: 50,
                    backgroundColor: '#285DB3',
                    flexDirection: 'row',
                    borderRadius: 50,
                    alignItems: 'center',
                    padding: 10,
                  }}
                  onPress={() => this.handleClick()}>
                  <View
                    style={{
                      width: '100%',
                      height: 50,
                      backgroundColor: '#285DB3',
                      flexDirection: 'row',
                      borderRadius: 50,
                      alignItems: 'center',
                      padding: 10,
                    }}>
                    <View style={{width: 25, height: 25}}>
                      <Image
                        style={{
                          width: '100%',
                          height: '100%',
                          resizeMode: 'contain',
                        }}
                        source={require('../../assets/images/Download.svg')}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#ffffff',
                        marginLeft: 10,
                      }}>
                      {i18n.t('ticket.download')}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
          {/*Notes*/}
          <View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '400',
                  color: '#707070',
                  margin: 10,
                  marginBottom: 10,
                }}>
                {i18n.t('ticket.notes')}
              </Text>
            </View>
            {this.state.notes && this.state.notes.length > 0 ? (
              <FlatList
                contentContainerStyle={{paddingBottom: 50}}
                data={data.notes}
                ItemSeparatorComponent={() => {
                  return <View style={{marginBottom: 20}} />;
                }}
                renderItem={({item: rowData}) => {
                  return (
                    <View style={styles2.card}>
                      <View style={styles2.cardHeader}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: 'bold',
                              color: '#6C6C6C',
                            }}>
                            {rowData.by_name}
                          </Text>
                          <Text style={{fontSize: 12, color: '#6C6C6C'}}>
                            {rowData.created_at}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={{
                              color: '#888',
                              marginTop: 10,
                              fontSize: 14,
                              alignSelf: 'flex-start',
                            }}>
                            {rowData.content}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: '100%',
                            marginBottom: 10,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                          }}>
                          {rowData.ticket_notes_attachments &&
                            rowData.ticket_notes_attachments.map(image => {
                              return (
                                <View
                                  style={{
                                    width: 51,
                                    height: 51,
                                    marginRight: 5,
                                    marginTop: 10,
                                    borderRadius: 7,
                                    overflow: 'hidden',
                                  }}>
                                  <Image
                                    source={{
                                      uri:
                                        'https://core.isalamah.com/public/' +
                                        image.path,
                                    }}
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      resizeMode: 'cover',
                                    }}
                                  />
                                </View>
                              );
                            })}
                        </View>
                      </View>
                      <View
                        style={{
                          position: 'absolute',
                          bottom: -30,
                          padding: 5,
                          alignSelf: 'flex-end',
                        }}>
                        <TouchableOpacity
                          style={{width: 45, height: 45}}
                          onPress={() => this.onDelete(rowData.uuid)}>
                          <View style={{width: 45, height: 45}}>
                            <Image
                              style={{
                                width: '100%',
                                height: '100%',
                                resizeMode: 'contain',
                              }}
                              source={require('../../assets/images/deleteNote.svg')}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }}
              />
            ) : (
              <View
                style={{
                  width: '100%',
                  height: 150,
                  marginBottom: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#D4D4D4',
                    textAlign: 'center',
                  }}>
                  {i18n.t('ticket.noNotesFound')}
                </Text>
              </View>
            )}
          </View>
          {/*Notes*/}
        </ScrollView>

        <TouchableOpacity
          activeOpacity={1}
          style={{
            width: '100%',
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#23BDE4',
          }}
          onPress={() =>
            this.props.navigation.navigate('Notes', {ticket: data.uuid})
          }>
          <View style={{height: 20, width: 20}}>
            <Image
              style={{width: '100%', height: '100%', resizeMode: 'contain'}}
              source={require('../../assets/images/Add.svg')}
            />
          </View>
          <Text
            style={{
              color: '#ffffff',
              fontSize: 18,
              fontWeight: 'bold',
              alignSelf: 'center',
              padding: 10,
            }}>
            {i18n.t('ticket.addNote')}
          </Text>
        </TouchableOpacity>
        <SafeAreaView style={{backgroundColor: '#23BDE4'}} />

        <View>
          <Modal
            animationInTiming={1000}
            animationOutTiming={1000}
            animationIn="fadeIn"
            animationOut="fadeOut"
            isVisible={this.state.isModalVisible}>
            <View
              style={{
                width: '100%',
                height: 180,
                padding: 5,
                borderRadius: 25,
                overFlow: 'hidden',
                backgroundColor: '#23BDE4',
              }}>
              <View
                style={{
                  width: 120,
                  height: 120,
                  position: 'absolute',
                  top: -60,
                  alignSelf: 'center',
                }}>
                <View style={{height: 120, width: 120}}>
                  <Image
                    style={{width: '100%', height: '100%'}}
                    source={require('../../assets/images/ThankYou.svg')}
                  />
                </View>
              </View>

              <View style={{width: '100%', height: 120}}>
                <Text
                  style={{
                    color: '#ffffff',
                    fontSize: getAdjustedFontSize(32),
                    alignSelf: 'center',
                    marginTop: 70,
                  }}>
                  {i18n.t('shop.done')}
                </Text>
                <Text
                  style={{
                    color: '#ffffff',
                    fontSize: getAdjustedFontSize(14),
                    fontWeight: '600',
                    alignSelf: 'center',
                    marginTop: 20,
                  }}>
                  Service rating successfully done
                </Text>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

const styles2 = StyleSheet.create({
  container: {
    height: '100%',
  },
  list: {
    padding: 5,
  },
  separator: {
    marginRight: 15,
  },
  /******** card **************/
  card: {
    flex: 1,
    padding: 10,
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: '#F8F8F8',
  },
  cardHeader: {
    width: '100%',
    // paddingVertical: 5,
    // paddingHorizontal: 5,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
  },

  /******** card components **************/
  title: {
    fontSize: 18,
    color: '#285DB3',
    position: 'absolute',
    right: 30,
  },
  description: {
    fontSize: 11,
    color: '#888',
    marginTop: 5,
  },
  newprice: {
    fontSize: 24,
    color: '#808080',
    fontWeight: '600',
  },
  discount: {
    fontSize: 14,
    color: '#808080',
    marginTop: 10,
    marginLeft: 5,
  },
  timeContainer: {
    marginBottom: 5,
    flexDirection: 'row',
  },
});

function mapStateToProps(state) {
  return {
    success: state.success,
    error: state.error,
    message: state.message,
    ticketDetail: state.tickets.ticketDetail,
    notes: state.notes.notes,
    deleteNote: state.notes.deleteNote,
    reportView: state.tickets.reportView,
    downloadReport: state.tickets.downloadReport,
    userdata: state.user.data,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TicketDetails);
