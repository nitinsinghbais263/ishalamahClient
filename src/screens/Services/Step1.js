import React, {Component} from 'react';
import {
  Animated,
  View,
  Text,
  TextInput,
  PermissionsAndroid,
  Platform,
  Image,
  Modal,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Keyboard,
  UIManager,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import i18n from '../../../lang/i18n';
import mobile from './mobile.json';
import RNPickerSelect from 'react-native-picker-select';
import CountryCodes from './CountryCodes.json';
import AsyncStorage from '@react-native-community/async-storage';
import {getAdjustedFontSize} from '../../responsive/responsive';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';

const {State: TextInputState} = TextInput;

class Step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryCodes: CountryCodes,
      selectedCountry: CountryCodes[189].dial_code,
      language: '',
      place: {},
      phone: '',
      license: '',
    };
  }

  state = {
    fullname: '',
    phone: '',
    email: '',
    license: '',
  };

  // toggleModal = () => {
  //
  //   this.setState({ isModalVisible: !this.state.isModalVisible});
  // };

  componentDidMount() {
    const {step1} = this.props;
    if (step1.phone || step1.license) {
      this.setState({
        email: step1.email,
        phone: step1.oldPhone,
        selectedCountry: step1.selectedCountry,
        fullname: step1.fullname,
        license: step1.license,
      });
    } else {
      this.getData();
    }
  }

  getData = () => {
    AsyncStorage.getItem('TOKEN').then(value => {
      this.setState({token: value});
      this.props.getUserDetails(this, {
        token: this.state.token,
      });
    });
  };

  getCoordinates = () => {
    const _that = this;
    this.setState({loading: true});

    async function requestLocationPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        const check = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (check == true) {
          _that.setState({check: check});
        }
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.watchID = Geolocation.watchPosition(position => {
            const newRegion = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            };
          });

          _that.watchID = Geolocation.getCurrentPosition(
            position => {
              _that.setState(
                {
                  region: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                  },
                },
                () => _that.phoneValidation(),
              );
            },
            error => {
              if (error.code === 2) {
                alert(i18n.t('turnOnGps'));
              }
            },
            // {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
          );
        } else {
          Alert.alert(i18n.t('service.permissionDenied'));
        }
      } catch (err) {
        Alert.alert('err', err);
      }
    }
    if (this.props.region && this.props.region.latitude) {
      this.setState({region: this.props.region}, () => this.phoneValidation());
    } else if (Platform.OS === 'android') {
      requestLocationPermission();
    }
  };

  getCoordinatesIos = () => {
    if (this.props.region && this.props.region.latitude) {
      this.setState({region: this.props.region}, () => this.phoneValidation());
    } else {
      Geolocation.getCurrentPosition(
        position => {
          this.setState(
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              region: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              },
              error: null,
            },
            () => this.phoneValidation(),
          );
        },
        error => {
          if (error.code === 2) {
            alert(i18n.t('turnOnGps'));
          }
        },
        // {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    }
  };

  phoneValidation = data => {
    var countries = CountryCodes;
    var currentNumber = {};
    countries.forEach(item => {
      if (item.dial_code === this.state.selectedCountry) {
        currentNumber = item.code;
      }
    });
    var allMobileNum = mobile;
    this.setState({country: data});
    if (
      this.state.fullname == '' ||
      this.state.fullname == null ||
      !this.state.fullname
    ) {
      Alert.alert(i18n.t('sorry'), i18n.t('service.fullnameRequire'));
    } else if (this.state.phone == '' || !this.state.phone) {
      Alert.alert(i18n.t('sorry'), i18n.t('service.phoneRequire'));
    } else if (
      this.state.email == '' ||
      this.state.email == null ||
      !this.state.email
    ) {
      Alert.alert(i18n.t('sorry'), i18n.t('service.emailRequire'));
    } else if (this.state.phone.length !== allMobileNum[currentNumber].length) {
      Alert.alert(i18n.t('sorry'), i18n.t('service.invalidNumber'));
    } else if (this.state.license == '' || !this.state.license) {
      Alert.alert(i18n.t('sorry'), i18n.t('service.licenseRequired'));
    } else {
      {
        this.props.onNextPress({
          fullname: this.state.fullname,
          phone: this.state.selectedCountry + this.state.phone,
          oldPhone: this.state.phone,
          email: this.state.email,
          selectedCountry: this.state.selectedCountry,
          license: this.state.license,
          region: this.props.region ? this.props.region : this.state.region,
        });
      }
    }
  };

  componentWillMount() {
    AsyncStorage.getItem('language').then(value => {
      this.setState({language: value});
    });
  }

  onSubmit = () => {
    if (this.state.region && this.state.region.latitude) {
      this.phoneValidation();
    } else {
      if (Platform.OS === 'android') {
        this.getCoordinates();
      } else {
        this.getCoordinatesIos();
      }
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.userdata) {
      this.setState({
        data: nextProps.userdata,
        fullname: nextProps.userdata.full_name,
        selectedCountry: '+' + nextProps.userdata.phone_detail.country_code,
        phone: nextProps.userdata.phone_detail.phone_number.toString(),
        email: nextProps.userdata.email,
        license: nextProps.userdata.license,
      });
    }
  }

  render() {
    const screenWidth = Math.round(Dimensions.get('window').width);
    const {selectedCountry, countryCodes, language, shift} = this.state;
    const pickerStyle = {
      inputIOS: {
        backgroundColor: '#F8F8F8',
        width: '100%',
        height: 45,
        fontSize: getAdjustedFontSize(16),
        borderBottomColor: '#F8F8F8',
        paddingHorizontal: 10,
      },
      inputAndroid: {
        backgroundColor: 'transparent',
        width: '100%',
        fontSize: getAdjustedFontSize(16),
      },
    };

    return (
      <View style={{flex: 1}}>
        <KeyboardAwareScrollView style={{flex: 1}}>
          <View style={{alignItems: 'center', paddingTop: 10}}>
            <Text style={{fontSize: getAdjustedFontSize(18), color: '#707070'}}>
              {i18n.t('service.step')} 2
            </Text>
            <Text
              style={{
                fontSize: getAdjustedFontSize(22),
                color: '#285DB3',
                fontWeight: '600',
              }}>
              {i18n.t('service.contactInformation')}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: getAdjustedFontSize(16),
                marginTop: 35,
                marginLeft: 10,
              }}>
              {i18n.t('service.fullname')}
            </Text>
          </View>
          <TextInput
            style={[styles.text]}
            value={this.state.fullname}
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onChangeText={fullname => this.setState({fullname})}
          />
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: getAdjustedFontSize(16),
                marginTop: 35,
                marginLeft: 10,
              }}>
              {i18n.t('service.country')}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                backgroundColor: '#F8F8F8',
                width: '100%',
                height: 45,
                marginTop: 15,
              }}>
              <RNPickerSelect
                onValueChange={value => this.setState({selectedCountry: value})}
                style={pickerStyle}
                Icon={() => {
                  return (
                    <View style={{}}>
                      {/*
                        <Image
                          source={require('../../assets/images/Dropdown.svg')}
                          style={{

                            backgroundColor: 'transparent',
                            borderTopWidth: 5,
                            borderTopColor: '#00000099',
                            borderRightWidth: 5,
                            borderRightColor: 'transparent',
                            borderLeftWidth: 5,
                            borderLeftColor: 'transparent',
                            width: 0,
                            height: 0,



                          }}
                        />
                      */}
                    </View>
                  );
                }}
                placeholder={this.state.place}
                value={this.state.selectedCountry}
                items={countryCodes.map((item, index) => {
                  return {
                    label: item.dial_code + ' (' + item.name + ')',
                    value: item.dial_code,
                  };
                })}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: getAdjustedFontSize(16),
                marginTop: 35,
                marginLeft: 10,
              }}>
              {i18n.t('service.phone')}
            </Text>
          </View>
          <TextInput
            style={[styles.text]}
            value={this.state.phone}
            placeholder={i18n.t('service.typeHere')}
            keyboardType="decimal-pad"
            underlineColorAndroid="transparent"
            onChangeText={phone => this.setState({phone})}
          />
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: getAdjustedFontSize(16),
                marginTop: 35,
                marginLeft: 10,
              }}>
              {i18n.t('service.email')}
            </Text>
          </View>
          <TextInput
            style={[styles.text]}
            value={this.state.email}
            placeholder={i18n.t('service.typeHere')}
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onChangeText={email => this.setState({email})}
          />
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: getAdjustedFontSize(16),
                marginTop: 35,
                marginLeft: 10,
              }}>
              {i18n.t('service.businessLicense')}
            </Text>
          </View>
          <TextInput
            style={[styles.text]}
            placeholder={i18n.t('service.typeHere')}
            keyboardType="email-address"
            value={this.state.license}
            underlineColorAndroid="transparent"
            onChangeText={license => this.setState({license})}
          />
        </KeyboardAwareScrollView>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            width: '100%',
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#23BDE4',
          }}
          onPress={() => {
            this.onSubmit();
          }}>
          <Text
            style={{
              color: '#ffffff',
              fontSize: getAdjustedFontSize(18),
              alignSelf: 'center',
              padding: 10,
            }}>
            {i18n.t('service.continue')}
          </Text>
        </TouchableOpacity>

        <SafeAreaView style={{backgroundColor: '#23BDE4'}} />

        {/*
        <View style={{ flex: 1, padding: 10, overFlow: 'hidden' }}>
          <Modal
              animationInTiming={1000}
              animationOutTiming={1000}
              animationIn="fadeIn"
              animationOut="fadeOut"
              isVisible={this.state.isModalVisibl}>
            <View style={{ width: '100%', height: 180, padding: 5, borderRadius: 25, overFlow: 'hidden', backgroundColor: '#23BDE4' }}>

            <View style={{width: 120, height: 120, position: 'absolute', top: -60, alignSelf: 'center'}}>
                <View style={{height: 120, width: 120}}>
                  <Image style={{ width: '100%', height: '100%'}} source={require('../../assets/images/ThankYou.svg')} />
                </View>
            </View>

            <View style={{ width: '100%', height: 120}}>
              <Text style={{ color: '#ffffff', fontSize: getAdjustedFontSize(32), alignSelf: 'center', marginTop: 70}}>{i18n.t('shop.done')}</Text>
              <Text style={{ color: '#ffffff', fontSize: getAdjustedFontSize(14), fontWeight: '600', alignSelf: 'center', marginTop: 20}}>{i18n.t('shop.successfully')}</Text>
            </View>

            </View>
          </Modal>
        </View>
        */}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    userdata: state.user.data,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Step1);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'flex-end',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  input: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },

  text: {
    backgroundColor: '#F8F8F8',
    width: '100%',
    height: 45,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 15,
    fontSize: getAdjustedFontSize(16),
    borderBottomColor: '#F8F8F8',
  },
  textArea: {
    backgroundColor: '#F8F8F8',
    width: '100%',
    height: 150,
    paddingLeft: 10,
    marginTop: 10,
    fontSize: getAdjustedFontSize(14),
    borderBottomColor: '#F8F8F8',
  },
});
