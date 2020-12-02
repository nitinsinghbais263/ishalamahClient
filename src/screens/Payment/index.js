import React, {Component} from 'react';
import {View, BackHandler, SafeAreaView} from 'react-native';
import styles from './styles';
import i18n from '../../../lang/i18n';
import PaymentHeader from '../../components/PaymentHeader';
// import colors from '../../utils/colors';
//=== redux ==
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../actions';
// === payment ===
import Modal from 'react-native-modal';
import SuccessPayment from '../../components/SuccessPayment';
import {WebView} from 'react-native-webview';
// import NavigationService from '../../navigationService';

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultLanguage: i18n,
      messages: [],
      isModalVisible: false,
      delivaryId: false,
    };
  }

  //===webview===
  webview = null;

  //=== handle back ===
  handleBackButton = () => {
    this.props.navigation.goBack(null);
    return true;
  };

  //=== Mount  components ===
  componentDidMount = () => {
    const that = this;
    if (that.props.navigation.state.params) {
      const {invoiceUuid} = that.props.navigation.state.params;
      if (invoiceUuid)
        that.setState({
          invoiceUuid: invoiceUuid,
        });
    }
    //=== back press ===
    BackHandler.addEventListener(
      'hardwareBackPress',
      that.handleBackButton.bind(that),
    );
  };

  //=== Unmount  component ===
  componentWillUnmount = () => {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButton.bind(this),
    );
  };

  //==== webview navigation ===
  handleWebViewNavigationStateChange = newNavState => {
    const {url} = newNavState;
    if (!url) return;
    if (url.includes('payment/success')) {
      // NavigationService.navigate('OrderList');
      this.props.navigation.navigate('Dashboard');
    }
    if (url.includes('payment/fail')) {
      // NavigationService.navigate('OrderList');
      this.props.navigation.navigate('Dashboard');
    }
  };

  render() {
    const {isModalVisible, invoiceUuid} = this.state;
    console.log('invoiceUuid', invoiceUuid);
    return (
      <View style={{flex: 1, backgroundColor: '#ffffff'}}>
        <PaymentHeader
          navigation={this.props.navigation}
          headerText={i18n.t('payment1')}
        />
        <View style={styles.mainContainer}>
          {invoiceUuid && (
            <WebView
              style={styles.mainContainer}
              ref={ref => (this.webview = ref)}
              source={{uri: `https://pay.isalamah.com/?uuid=${invoiceUuid}`}}
              onNavigationStateChange={this.handleWebViewNavigationStateChange}
            />
          )}
        </View>
        {/* === modal === */}
        <Modal
          isVisible={isModalVisible}
          backdropColor={'black'}
          backdropOpacity={0.7}
          onBackdropPress={() => this.setState({isModalVisible: false})}>
          <SuccessPayment />
        </Modal>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    chatData: state.chatReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Payment);
