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
import Modal from 'react-native-modal';
import {withNavigation} from 'react-navigation';
import DashboardStyle from './style';
import AsyncStorage from '@react-native-community/async-storage';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getAdjustedFontSize} from '../../responsive/responsive';

class ExpiringServices extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    token: '',
    isModalVisible: false,
  };

  toggleModal = rowData => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    AsyncStorage.getItem('TOKEN').then(value => {
      this.setState({token: value});
      this.props.getExpiringService(this, {
        token: this.state.token,
      });
    });
  };

  renewService(uuid) {
    this.setState({isModalVisible: true});
  }

  renew = () => {
    this.toggleModal();
    this.props.navigation.navigate('RenewService', {
      uuid: this.props.expServices[0].uuid,
    });
  };

  renderExpService() {
    var data = [];
    data = this.props.expServices;

    return (
      <View style={DashboardStyle.ServicesContainer}>
        <Text style={DashboardStyle.ServicesTitle}>
          {i18n.t('dashboard.expiringServices')}
        </Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          ItemSeparatorComponent={() => {
            return <View style={{marginRight: 15}} />;
          }}
          renderItem={({item: rowData}) => {
            var invoiceId = rowData.uuid;
            lastChar = invoiceId.substr(invoiceId.length - 5);
            return (
              <View style={DashboardStyle.ServicesCard}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('ServiceAccountDetails', {
                      rowData: rowData,
                    })
                  }>
                  <View style={DashboardStyle.ServicesCardHeader}>
                    <View>
                      <Image
                        style={DashboardStyle.ServicesRenewLogo}
                        source={require('../../assets/images/Renew.svg')}
                      />
                      <Text style={DashboardStyle.ServicesHeaderTitle}>
                        # {lastChar}
                      </Text>
                    </View>
                    <View style={DashboardStyle.ServicesDateContainer}>
                      <Text style={DashboardStyle.ServicesDateTitle}>
                        {i18n.t('dashboard.expiresOn')}:
                      </Text>
                      <Text style={DashboardStyle.ServicesDateContent}>
                        {rowData.expiration_date}
                      </Text>
                    </View>
                    <View style={DashboardStyle.ServicesLocationContainer}>
                      <Text style={DashboardStyle.ServicesLocationTitle}>
                        {i18n.t('dashboard.serviceLocation')}:
                      </Text>
                      <Text style={DashboardStyle.ServicesLocationContent}>
                        {rowData.address_1}
                      </Text>
                      <Text style={DashboardStyle.ServicesLocationContent2}>
                        {rowData.city.name}
                      </Text>
                      <Text style={DashboardStyle.ServicesLocationContent2}>
                        {rowData.state.name}, {rowData.country.name}
                      </Text>
                      <Text style={DashboardStyle.ServicesLocationContent2}>
                        {rowData.zip_code}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>

                <View style={DashboardStyle.ServicesCardFooter}>
                  <TouchableOpacity
                    style={{}}
                    onPress={() => this.renewService()}>
                    <Image
                      style={DashboardStyle.ServicesFooterImage}
                      source={require('../../assets/images/Reorder.svg')}
                    />
                    <Text style={DashboardStyle.ServicesFooterContent}>
                      {i18n.t('dashboard.renew')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  }

  render() {
    const exp_services = this.props.expServices;

    return (
      <View>
        {exp_services ? this.renderExpService() : null}
        <View style={{flex: 1, padding: 10}}>
          <Modal isVisible={this.state.isModalVisible}>
            <View
              style={{
                width: '100%',
                height: 280,
                padding: 30,
                borderRadius: 25,
                overFlow: 'hidden',
                backgroundColor: '#ffffff',
              }}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  position: 'absolute',
                  top: -10,
                  right: -10,
                }}>
                <TouchableOpacity
                  style={{width: 30, height: 30}}
                  onPress={this.toggleModal}>
                  <View style={{height: 30, width: 30}}>
                    <Image
                      style={{width: '100%', height: '100%'}}
                      source={require('../../assets/images/Close.svg')}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  width: '100%',
                  height: 150,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    fontSize: getAdjustedFontSize(20),
                    fontFamily: 'SegoeUI',
                    color: '#707070',
                    textAlign: 'center',
                  }}>
                  Are you sure you want to renew this service for one year?
                </Text>
              </View>

              <TouchableOpacity
                style={{
                  width: '100%',
                  height: 50,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                  backgroundColor: '#23BDE4',
                }}
                onPress={() => this.renew()}>
                <Text
                  style={{
                    fontSize: getAdjustedFontSize(20),
                    fontFamily: 'SegoeUI',
                    color: '#ffffff',
                    alignSelf: 'center',
                  }}>
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    success: state.success,
    expServicesError: state.service.expServicesError,
    message: state.message,
    expServices: state.service.expServices,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExpiringServices);
