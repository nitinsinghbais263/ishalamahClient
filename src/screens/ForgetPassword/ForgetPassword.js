import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import styles from './Style';
import CountryCodes from './CountryCodes.json';
import {getAdjustedFontSize} from '../../responsive/responsive';
import AsyncStorage from '@react-native-community/async-storage';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import i18n from '../../../lang/i18n';
import Modal from 'react-native-modal';
import DataLoader from '../../components/DataLoader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

class ForgetPassword extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      countryCodes: CountryCodes,
      countryCodesSearch: CountryCodes,
      selectedCountry: CountryCodes[189],
      dialCode: CountryCodes[189].dial_code,
      language: '',
      place: {},
      modalOpen: false,
      user: '',
      phone: '',
      email: '',
      isActive: false,
      loading: false,
    };
  }

  componentWillMount() {
    AsyncStorage.getItem('language').then(value => {
      this.setState({language: value});
    });
  }

  closeToggleModal = () => {
    this.setState({modalOpen: false});
  };

  searchCountries = search => {
    var {countryCodes, countryCodesSearch} = this.state;
    var searchData = search.trim().toLowerCase();
    countryCodesSearch = countryCodes.filter(l => {
      return l.name.toLowerCase().match(searchData);
    });
    this.setState({
      countryCodesSearch: countryCodesSearch,
      searchCountry: search,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.serverError != this.props.serverError) {
      if (this.props.serverError) {
        console.log(this.props.serverError);

        if (this.props.serverError.message) {
          Alert.alert(
            'Ah!',
            this.props.serverError.message,
            [
              {
                text: 'OK',
                
                //onPress: () => this.gotoForgot2(),
                  onPress: () => this.setState({ loading: false })
              },
            ],
            {cancelable: false},
          );
        }
      }
    }
    if (prevProps.serverResponse != this.props.serverResponse) {
      if (this.props.serverResponse) {
        Alert.alert(
          'Success',
          this.props.serverResponse.message,
          [
            {
              text: 'OK',
              onPress: () => this.gotoForgot2(),
            },
          ],
          {cancelable: false},
        );
      }
    }
  }
  gotoForgot2 = () => {
    this.setState({loading: false}, () =>
      this.props.navigation.navigate('ForgetPassword2', {
        user: !this.state.isActive
          ? this.state.email
          : this.state.dialCode + this.state.phone,
        type: !this.state.isActive ? 'email' : 'phone',
      }),
    );
  };

  //   componentWillReceiveProps(nextProps) {
  //     if (nextProps.serverError) {
  //       console.log(nextProps.serverError);
  //       alert(nextProps.serverError.message);
  //
  //     }
  //   }

  onSubmit = () => {
    if (!this.state.isActive) {
      if (this.state.email) {
        this.setState({loading: true});
        this.props.forgetPassword(this, {
          user: this.state.email,
        });
      } else {
        alert(i18n.t('service.emailRequire'));
      }
    } else {
      if (this.state.phone) {
        this.setState({loading: true});
        this.props.forgetPassword(this, {
          user: this.state.dialCode + this.state.phone,
        });
      } else {
        alert(i18n.t('service.phoneRequire'));
      }
    }
  };

  render() {
    const {
      selectedCountry,
      countryCodes,
      language,
      modalOpen,
      countryCodesSearch,
      loading,
    } = this.state;
    return (
      <View style={styles.container}>
        <SafeAreaView style={{backgroundColor: '#2383C3'}}>
          <StatusBar backgroundColor="#2383C3" barStyle="light-content" />
          {loading ? <DataLoader isVisible={true} /> : null}
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              height: 60,
              backgroundColor: '#23BDE4',
            }}>
            <TouchableOpacity
              style={{position: 'absolute', left: 0, top: 20}}
              onPress={() => this.props.navigation.navigate('Login')}>
              <Image
                style={{
                  width: 25,
                  height: 25,
                  marginLeft: 4,
                  transform: [
                    {rotate: this.state.language == 'ar' ? '180deg' : '0deg'},
                  ],
                }}
                source={require('../../assets/images/back.svg')}
              />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                position: 'absolute',
                right: 0,
                top: 20,
              }}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 16, color: '#ffffff', marginRight: 10}}>
                  {i18n.t('forgotPassword')}
                </Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
        <KeyboardAwareScrollView
          style={{flex: 1}}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <View style={{flex: 1}}>
            <View style={styles.mainView}>
              <View style={styles.mainContainer}>
                <View style={{padding: 10}}>
                  <View style={styles.headerView}>
                    <Text style={styles.headerText2}>
                      {i18n.t('resetPassword')}
                    </Text>
                  </View>
                  <View style={styles.rowContainer}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        this.setState({isActive: false});
                      }}
                      style={{
                        ...styles.boxStyle,
                        backgroundColor: this.state.isActive
                          ? '#FFFFFF'
                          : '#EEEEEE',
                      }}>
                      <View style={styles.imageView}>
                        <Image
                          style={styles.imageStyle}
                          source={require('../../assets/images/email1.svg')}
                        />
                      </View>
                      <View style={styles.textView}>
                        <Text style={styles.innerText}>
                          {i18n.t('viaEmail')}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        this.setState({isActive: true});
                      }}
                      style={{
                        ...styles.boxStyle,
                        backgroundColor: !this.state.isActive
                          ? '#FFFFFF'
                          : '#EEEEEE',
                      }}>
                      <View style={styles.imageView}>
                        <Image
                          style={styles.imageStyle}
                          source={
                            i18n.locale === 'ar'
                              ? require('../../assets/images/callphoneAR.svg')
                              : require('../../assets/images/callphone.svg')
                          }
                        />
                      </View>
                      <View style={styles.textView}>
                        <Text style={styles.innerText}>
                          {i18n.t('viaPhone')}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.inputView}>
                  {this.state.isActive ? (
                    <View>
                      <View style={styles.countryView}>
                        <Text style={styles.title}>{i18n.t('enterCode')}</Text>
                      </View>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() =>
                          this.setState({
                            modalOpen: true,
                            searchCountry: '',
                            countryCodesSearch: CountryCodes,
                          })
                        }
                        style={
                          language == 'ar'
                            ? styles.pickerViewAR2
                            : styles.pickerView2
                        }>
                        <Text style={styles.itemText}>
                          {selectedCountry.dial_code +
                            ' (' +
                            selectedCountry.name +
                            ')'}
                        </Text>
                        <View
                          style={
                            language == 'ar'
                              ? styles.dropdownArrowViewAR
                              : styles.dropdownArrowView
                          }>
                          <Image
                            source={require('../../assets/images/dropdownArrow.svg')}
                            style={styles.dropdownImage}
                          />
                        </View>
                      </TouchableOpacity>
                      <View>
                        <View style={{...styles.countryView, marginTop: 15}}>
                          <Text style={styles.title}>
                            {i18n.t('enterPhone')}
                          </Text>
                        </View>
                        <View style={styles.pickerView}>
                          <TextInput
                            value={this.state.phone}
                            onChangeText={phone => {
                              this.setState({
                                phone: phone,
                              });
                            }}
                            style={[
                              styles.numberInput,
                              {textAlign: language == 'ar' ? 'right' : 'left'},
                            ]}
                            returnKeyType={'done'}
                            keyboardType="numeric"
                            placeholder={i18n.t('enterPhone')}
                          />
                        </View>
                      </View>
                    </View>
                  ) : (
                    <View>
                      <View style={styles.countryView}>
                        <Text style={styles.title}>
                          {i18n.t('enterAddress')}
                        </Text>
                      </View>
                      <View style={styles.pickerView}>
                        <TextInput
                          value={this.state.email}
                          onChangeText={email => {
                            this.setState({
                              email: email,
                            });
                          }}
                          style={[
                            styles.numberInput,
                            {textAlign: language == 'ar' ? 'right' : 'left'},
                          ]}
                          returnKeyType={'done'}
                          keyboardType="email-address"
                          placeholder={i18n.t('typeHere')}
                        />
                      </View>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.buttonView}>
          <View style={styles.continueButtonBG}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.continueButton}
              //onPress={()=> Actions.registration2({selectedCountry : this.state.dialCode})}
              onPress={() => this.onSubmit()}>
              <Text style={styles.buttonText}>{i18n.t('continue')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <SafeAreaView style={{backgroundColor: '#23BDE4'}} />
        <Modal
          coverScreen={false}
          isVisible={modalOpen}
          onBackdropPress={this.closeToggleModal}
          onBackButtonPress={this.closeToggleModal}
          backdropColor="#000000"
          style={{padding: 0}}
          // backdropOpacity={0.9}
          // transparent={true}
        >
          <View style={styles.modalView}>
            <View style={styles.searchCountryFieldView}>
              <TextInput
                value={this.state.searchCountry}
                onChangeText={searchCountry => {
                  this.searchCountries(searchCountry);
                }}
                style={{
                  ...styles.searchCountryField,
                  textAlign: i18n.locale === 'ar' ? 'right' : 'left',
                }}
                placeholder={i18n.t('searchCountry')}
              />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {countryCodesSearch.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.8}
                    style={styles.itemView}
                    onPress={() => {
                      this.setState({
                        dialCode: item.dial_code,
                        selectedCountry: item,
                      });
                      this.closeToggleModal();
                    }}>
                    <Text style={styles.itemText}>
                      {item.dial_code + ' (' + item.name + ')'}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </Modal>
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
    serverError: state.registration.serverError,
    serverResponse: state.registration.data,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgetPassword);
