import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  FlatList,
  Dimensions,
  BackHandler,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import i18n from '../../../lang/i18n';
import {withNavigation} from 'react-navigation';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-community/async-storage';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {WebView} from 'react-native-webview';

class ReportView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: '',
    };
  }

  state = {
    token: '',
    uuid: '',
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
      this.setState({uuid: this.props.navigation.state.params.uuid});
      // this.props.getReportView(this,{
      //     token: this.state.token,
      //     uuid: this.state.uuid
      //   })
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.reportView) {
      this.setState({
        report: nextProps.reportView,
      });
    }
  }

  render() {
    var data = [];
    data = this.props.data;
    var uri = `https://core.isalamah.com/api/v1/report-view/${this.state.uuid}`;
    return (
      <View style={{flex: 1}}>
        <Header navigation={this.props.navigation} />

        <WebView
          style={{height: '100%', marginBottom: 40}}
          source={{
            uri: `https://core.isalamah.com/api/v1/report-view/${
              this.state.uuid
            }`,
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    success: state.success,
    error: state.error,
    message: state.message,
    data: state.tickets.data,
    reportView: state.tickets.reportView,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReportView);
