import React, {Component} from 'react';
import {
  View,
  Image,
  ImageBackground,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  BackHandler,
  Dimensions,
} from 'react-native';
import DashboardStyle from './style';
import Drawer from '../../components/Drawer';
import Content from './Content';
import LatestOrders from './LatestOrders';
import ExpiringServices from './ExpiringServices';
import OngoingTickets from './OngoingTickets';
0;
import {getAdjustedFontSize} from '../../responsive/responsive';
import Modal from 'react-native-modal';
import i18n from '../../../lang/i18n';
import DataLoader from '../../components/DataLoader';
import Spinner from 'react-native-spinkit';

export default class DashboardScreen extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    loader: false,
    isVisible: true,
  };

  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  };

  handleBackPress = () => {
    BackHandler.exitApp();
    return true;
  };

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  };

  loaderStart = () => {
    this.setState({loader: true});
  };

  loaderStop = () => {
    this.setState({loader: false});
  };

  render() {
    return (
      <View style={DashboardStyle.Container}>
        <Drawer navigation={this.props.navigation} />
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <ExpiringServices navigation={this.props.navigation} />
          <OngoingTickets
            navigation={this.props.navigation}
            loaderStart={this.loaderStart}
            loaderStop={this.loaderStop}
          />
          <LatestOrders
            navigation={this.props.navigation}
            loaderStart={this.loaderStart}
            loaderStop={this.loaderStop}
          />
          <Content navigation={this.props.navigation} />
        </ScrollView>
      </View>
    );
  }
}

const deviceWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
  popUp: {
    alignSelf: 'center',
    width: deviceWidth - 20,
    height: deviceWidth / 1.5,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelView: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: -10,
    alignSelf: 'flex-end',
    height: 20,
    width: 20,
  },
  messageView: {
    width: deviceWidth / 1.2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  logoutMessage: {
    fontSize: getAdjustedFontSize(24),
    marginTop: 10,
    color: '#707070',
    textAlign: 'center',
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  yesButton: {
    height: 50,
    width: 150,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#23BDE4',
  },
  noButton: {
    height: 50,
    width: 150,
    marginLeft: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DF2B2B',
  },
  textStyle: {
    fontSize: getAdjustedFontSize(20),
    color: '#ffffff',
  },
});
