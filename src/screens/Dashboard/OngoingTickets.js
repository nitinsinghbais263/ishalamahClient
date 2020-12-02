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
import {withNavigation} from 'react-navigation';
import DashboardStyle from './style';
import AsyncStorage from '@react-native-community/async-storage';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getAdjustedFontSize} from '../../responsive/responsive';

class OngoingTickets extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    token: '',
    search: '',
    status: 'in progress',
  };

  componentWillMount() {
    AsyncStorage.getItem('language').then(value => {
      this.setState({language: value});
    });
    this.getData();
  }

  getData = () => {
    this.props.loaderStart();
    AsyncStorage.getItem('TOKEN').then(value => {
      this.setState({token: value});
      this.props.getOngoingTicketsList(this, {
        token: this.state.token,
      });
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.onGoingTickets) {
      this.props.loaderStop();
    }
    if (nextProps.serverError) {
      this.props.loaderStop();
    }
  }

  renderOngoingTickets() {
    var data = [];
    data = this.props.onGoingTickets;
    return (
      <View style={DashboardStyle.TicketsContainer}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontSize: getAdjustedFontSize(18),
              padding: 10,
              color: '#6C6C6C',
              fontFamily: 'SegoeUI',
            }}>
            {i18n.t('dashboard.ongoingTickets')}
          </Text>
        </View>
        <FlatList
          horizontal
          contentContainerStyle={{paddingHorizontal: 10}}
          showsHorizontalScrollIndicator={false}
          data={data}
          ItemSeparatorComponent={() => {
            return <View style={{marginRight: 15}} />;
          }}
          renderItem={({item: rowData}) => {
            var invoiceId = rowData.uuid;
            lastChar = invoiceId.substr(invoiceId.length - 5);
            return (
              <View>
                {rowData.status === 'in progress' ? (
                  <View style={DashboardStyle.TicketsCard}>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('TicketDetails', {
                          rowData: rowData,
                        })
                      }>
                      <View style={DashboardStyle.TicketsCardHeader}>
                        <View style={{flexDirection: 'row'}}>
                          <Image
                            style={{...DashboardStyle.TicketsLogo}}
                            source={
                              i18n.locale === 'ar'
                                ? require('../../assets/images/OrderAR.svg')
                                : require('../../assets/images/Order.svg')
                            }
                          />
                          <View>
                            <Text style={DashboardStyle.TicketsHeaderTitle}>
                              # {lastChar}
                            </Text>
                          </View>
                        </View>

                        <View style={DashboardStyle.TicketsAgentContainer}>
                          <View style={{flexDirection: 'row'}}>
                            <Text style={DashboardStyle.TicketsAgentTitle}>
                              {i18n.t('dashboard.agentName')}:
                            </Text>
                          </View>
                          <View style={{flexDirection: 'row'}}>
                            <Text style={DashboardStyle.TicketsAgentContent}>
                              {rowData.technician_name}
                            </Text>
                          </View>
                        </View>

                        <View style={DashboardStyle.TicketsLocationContainer}>
                          <View style={{flexDirection: 'row'}}>
                            <Text style={DashboardStyle.TicketsLocationTitle}>
                              {i18n.t('dashboard.serviceLocation')}:
                            </Text>
                          </View>

                          <View style={{flexDirection: 'row'}}>
                            <Text style={DashboardStyle.TicketsLocationContent}>
                              {(rowData.related_service &&
                                rowData.related_service.address_1) ||
                                '----'}
                            </Text>
                          </View>
                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={DashboardStyle.TicketsLocationContent2}>
                              {(rowData.related_service &&
                                rowData.related_service.city.name) ||
                                '----'}
                            </Text>
                          </View>
                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={DashboardStyle.TicketsLocationContent2}>
                              {(rowData.related_service &&
                                rowData.related_service.state.name) ||
                                '----'}
                              ,{' '}
                              {(rowData.related_service &&
                                rowData.related_service.country.name) ||
                                '----'}
                            </Text>
                          </View>
                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={DashboardStyle.TicketsLocationContent2}>
                              {(rowData.related_service &&
                                rowData.related_service.zip_code) ||
                                '----'}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            );
          }}
        />
      </View>
    );
  }

  render() {
    const ongoingTickets = this.props.onGoingTickets;
    return <View>{ongoingTickets ? this.renderOngoingTickets() : null}</View>;
  }
}

const styles2 = StyleSheet.create({
  container: {
    height: '100%',
    marginBottom: 50,
  },
  list: {},
  separator: {
    marginRight: 15,
  },
  /******** card **************/
  card: {
    width: 280,

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
    height: '100%',
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
  },

  /******** card components **************/
  title: {
    fontSize: getAdjustedFontSize(24),
    fontWeight: '600',
    color: '#285DB3',
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

function mapStateToProps(state) {
  return {
    success: state.success,
    error: state.error,
    message: state.message,
    onGoingTickets: state.tickets.onGoingTickets,
    serverError: state.tickets.serverError,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OngoingTickets);
