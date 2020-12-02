import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  Button,
  Alert,
  TouchableOpacity,
  PermissionsAndroid,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Modal from 'react-native-modal';
import {Dropdown} from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-community/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getAdjustedFontSize} from '../../responsive/responsive';
import i18n from '../../../lang/i18n';

class Step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serach: '',
      language: '',
      countries: [],
      countryId: '',
      states: [],
      stateId: '',
      cities: [],
      date: '',
      address_one: '',
      address_two: '',
      isCountryModalVisible: false,
      setectedCountry: '',
      setectedState: '',
      setectedCity: '',
      location: '',
    };
  }

  state = {
    search: '',
    location: '',
    // address_one: "",
    // address_two: "",
    city: '',
    state: '',
    country: '',
    zipCode: '',

    countries: [],
    countryId: '',
    states: [],
    stateId: '',
    cities: [],

    isCountryModalVisible: false,
    setectedCountry: 'Saudi Arabia',
    country_name: '191',
    countryValue: 'Saudi Arabia',
    isStateModalVisible: false,
    setectedState: '',
    isCityModalVisible: false,
    setectedCity: '',
  };

  componentWillMount() {
    AsyncStorage.getItem('language').then(value => {
      this.setState({language: value});
    });
  }

  componentDidMount() {
    const {step2} = this.props;
    this.getAddress();

    if (step2.startDate || step2.countryId || step2.address1) {
      this.setState({
        location: step2.location,
        address_one: step2.address1,
        address_two: step2.address2,
        city_name: step2.cityId,
        cityValue: step2.cityName,
        selectCity: step2.cityId,
        state_name: step2.stateId,
        stateValue: step2.stateName,
        selectState: step2.stateId,
        country_name: step2.countryId,
        countryValue: step2.countryName,
        setectedCountry: step2.countryName,
        zipCode: step2.zipCode,
        date: step2.startDate,
      });
      this.getCountry();
      this.getStates();
    } else {
      this.getCountry();
      this.getStates();
      this.getData();
    }
  }

  toggleCountryModal = () => {
    this.setState(
      {
        isCountryModalVisible: !this.state.isCountryModalVisible,
        countries: [],
      },
      () => this.getCountry(),
    );
  };

  toggleStateModal = () => {
    this.setState(
      {
        isStateModalVisible: !this.state.isStateModalVisible,
        states: [],
      },
      () => this.getStates(),
    );
  };

  toggleCityModal = () => {
    this.setState(
      {
        isCityModalVisible: !this.state.isCityModalVisible,
        cities: [],
      },
      () => this.getCity(),
    );
  };

  setectedCountry = rowData => {
    if (this.state.setectedCountry !== rowData.value) {
      this.setState({
        setectedCountry: rowData.value,
        country_name: rowData.id,
        setectedState: '',
        setectedCity: '',
      });
      this.getStates(rowData);
      this.toggleCountryModal();
    } else {
      this.toggleCountryModal();
    }
  };

  setectedState = rowData => {
    if (this.state.setectedState !== rowData.value) {
      this.setState({
        setectedState: rowData.value,
        state_name: rowData.id,
        setectedCity: '',
      });
      this.getCity(rowData);
      this.toggleStateModal();
    } else {
      this.toggleStateModal();
    }
  };

  setectedCity = rowData => {
    this.setState({
      setectedCity: rowData.value,
      city_name: rowData.id,
      cityValue: rowData.value,
    });
    this.toggleCityModal();
  };

  getData = () => {
    AsyncStorage.getItem('TOKEN').then(value => {
      this.setState({token: value});
      this.props.getUserDetails(this, {
        token: this.state.token,
      });
    });
  };

  getAddress = () => {
    AsyncStorage.getItem('TOKEN').then(value => {
      this.setState({token: value});
      this.props.getAddress(this, {
        token: this.state.token,
        region: this.props.region,
      });
    });
  };

  getCountry = () => {
    AsyncStorage.getItem('TOKEN').then(value => {
      this.setState({token: value});
      this.props.getCountry(this, {
        token: this.state.token,
        search: '',
      });
    });
  };

  onSearchCountry = search => {
    this.setState({countries: []});
    if (search.length > 2) {
      this.setState({search: search, countries: []}, () => {
        this.props.getCountry(this, {
          token: this.state.token,
          search: search,
        });
      });
    } else {
      this.setState({search: '', countries: []}, () => {
        this.props.getCountry(this, {
          token: this.state.token,
          search: search,
        });
      });
    }
  };

  getStates = rowData => {
    // this.setState({country_name: rowData.id, countryValue: rowData.value, states: [] })
    AsyncStorage.getItem('TOKEN').then(token => {
      this.setState({token: token});
      this.props.getState(this, {
        token: this.state.token,
        countryId: this.state.country_name,
        search: '',
      });
    });
  };

  onSearchState = search => {
    this.setState({states: []});
    if (search.length >= 3) {
      this.setState({search: search}, () => {
        this.props.getState(this, {
          token: this.state.token,
          countryId: this.state.country_name,
          search: search,
        });
      });
    } else {
      this.setState({search: ''}, () => {
        this.props.getState(this, {
          token: this.state.token,
          countryId: this.state.country_name,
          search: search,
        });
      });
    }
  };

  getCity = rowData => {
    AsyncStorage.getItem('TOKEN').then(token => {
      this.setState({token: token});
      this.props.getCity(this, {
        token: this.state.token,
        stateId: this.state.state_name,
        search: '',
      });
    });
  };

  onSearchCity = search => {
    this.setState({cities: []});
    if (search.length > 2) {
      this.setState({search: search}, () => {
        this.props.getCity(this, {
          token: this.state.token,
          stateId: this.state.state_name,
          search: search,
        });
      });
    } else {
      this.setState({search: ''}, () => {
        this.props.getCity(this, {
          token: this.state.token,
          stateId: this.state.state_name,
          search: search,
        });
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.userdata) {
      this.setState({
        data: nextProps.userdata,
        address_one: nextProps.userdata.address_1,
        address_two: nextProps.userdata.address_2,
        setectedCountry: nextProps.userdata.country.name,
        country_name: nextProps.userdata.country.id,
        countryValue: nextProps.userdata.country.name,
        setectedState: nextProps.userdata.state.name,
        state_name: nextProps.userdata.state.id,
        stateValue: nextProps.userdata.state.name,
        setectedCity: nextProps.userdata.city.name,
        city_name: nextProps.userdata.city.id,
        cityValue: nextProps.userdata.city.name,
        zipCode:
          nextProps.userdata.zip_code == null
            ? ''
            : nextProps.userdata.zip_code,
      });
    }

    // if(nextProps.userdata && nextProps.userAddress) {
    //
    //   this.setState({
    //     address_one: nextProps.userAddress.formatted_address,
    //     setectedCountry: nextProps.userAddress.country.name,
    //     country_name: nextProps.userAddress.country.id,
    //     countryValue: nextProps.userAddress.country.name,
    //     setectedState: nextProps.userAddress.state.name,
    //     state_name: nextProps.userAddress.state.id,
    //     stateValue: nextProps.userAddress.state.name,
    //     setectedCity: nextProps.userAddress.city.name,
    //     city_name: nextProps.userAddress.city.id,
    //     cityValue: nextProps.userAddress.city.name,
    //     zipCode: nextProps.userAddress.postal_code == null ? "" : nextProps.userAddress.postal_code,
    //   })
    // }

    if (nextProps.countries) {
      var data = [];
      this.setState({countries: []});
      nextProps.countries.map((item, index) => {
        data.push({
          value: item.name,
          id: item.id,
        });
      });
      this.setState({countries: data});
    }

    if (nextProps.states) {
      var data = [];
      this.setState({states: []});
      nextProps.states.map((item, index) => {
        data.push({
          value: item.name,
          id: item.id,
        });
      });

      this.setState({states: data});
    }

    if (nextProps.cities) {
      var data = [];
      this.setState({cities: []});
      nextProps.cities.map((item, index) => {
        data.push({
          value: item.name,
          id: item.id,
        });
      });
      this.setState({cities: data});
    }
  }

  validation(data) {
    if (this.state.setectedCountry.length == 0) {
      Alert.alert(i18n.t('sorry'), i18n.t('service.selectCountry'));
    } else if (this.state.setectedState.length == 0) {
      Alert.alert(i18n.t('sorry'), i18n.t('service.selectState'));
    } else if (this.state.setectedCity.length == 0) {
      Alert.alert(i18n.t('sorry'), i18n.t('service.selectCity'));
    } else if (this.state.location == '') {
      Alert.alert(i18n.t('sorry'), i18n.t('service.location'));
    } else if (this.state.address_one == '' || !this.state.address_one) {
      Alert.alert(i18n.t('sorry'), i18n.t('service.address_one'));
    } else if (this.state.address_two == '' || !this.state.address_two) {
      Alert.alert(i18n.t('sorry'), i18n.t('service.address_two'));
    } else if (this.state.zipCode == '') {
      Alert.alert(i18n.t('sorry'), i18n.t('service.zipCodeError'));
    } else if (this.state.date.length == 0) {
      Alert.alert(i18n.t('sorry'), i18n.t('service.startDate'));
    } else {
      {
        this.props.onNextPress({
          location: this.state.location,
          address1: this.state.address_one,
          address2: this.state.address_two,
          cityId: this.state.city_name,
          cityName: this.state.cityValue,
          stateId: this.state.state_name,
          stateName: this.state.stateValue,
          countryId: this.state.country_name,
          countryName: this.state.countryValue,
          zipCode: this.state.zipCode,
          startDate: this.state.date,
        });
      }
    }
  }

  render() {
    const {language} = this.state;
    const screenWidth = Math.round(Dimensions.get('window').width);

    return (
      <View style={{flex: 1}}>
        <KeyboardAwareScrollView
          style={{flex: 1}}
          contentContainerStyle={{paddingBottom: 50}}>
          <View style={{alignItems: 'center', paddingTop: 10}}>
            <Text style={{fontSize: getAdjustedFontSize(18), color: '#707070'}}>
              {i18n.t('service.step')} 4
            </Text>
            <Text
              style={{
                fontSize: getAdjustedFontSize(22),
                color: '#285DB3',
                fontWeight: '600',
              }}>
              {i18n.t('service.serviceInformation')}
            </Text>
          </View>

          <Text
            style={{
              fontSize: getAdjustedFontSize(16),
              alignSelf: 'flex-start',
              marginTop: 35,
              marginLeft: 10,
            }}>
            {i18n.t('service.country')}
          </Text>
          <View
            style={{
              width: '100%',
              height: 45,
              backgroundColor: '#F8F8F8',
              borderBottomColor: '#F8F8F8',
              marginTop: 15,
            }}>
            <TouchableOpacity
              onPress={() => this.toggleCountryModal()}
              style={{
                width: '100%',
                height: 45,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#F8F8F8',
              }}>
              <Text
                style={{
                  fontSize: getAdjustedFontSize(16),
                  color: '#000000',
                  paddingLeft: 10,
                  textAlign: language == 'ar' ? 'right' : 'left',
                  width: '100%',
                }}>
                {this.state.setectedCountry}
              </Text>
            </TouchableOpacity>
          </View>

          <Text
            style={{
              fontSize: getAdjustedFontSize(16),
              alignSelf: 'flex-start',
              marginTop: 35,
              marginLeft: 10,
            }}>
            {i18n.t('service.state')}
          </Text>
          <View
            style={{
              width: '100%',
              height: 45,
              backgroundColor: '#F8F8F8',
              borderBottomColor: '#F8F8F8',
              marginTop: 15,
            }}>
            <TouchableOpacity
              onPress={() => this.toggleStateModal()}
              style={{
                width: '100%',
                height: 45,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#F8F8F8',
              }}>
              <Text
                style={{
                  fontSize: getAdjustedFontSize(16),
                  color: '#000000',
                  paddingLeft: 10,
                  textAlign: language == 'ar' ? 'right' : 'left',
                  width: '100%',
                }}>
                {this.state.setectedState}
              </Text>
            </TouchableOpacity>
          </View>

          <Text
            style={{
              fontSize: getAdjustedFontSize(16),
              alignSelf: 'flex-start',
              marginTop: 35,
              marginLeft: 10,
            }}>
            {i18n.t('service.city')}
          </Text>
          <View
            style={{
              width: '100%',
              height: 45,
              backgroundColor: '#F8F8F8',
              borderBottomColor: '#F8F8F8',
              marginTop: 15,
            }}>
            <TouchableOpacity
              onPress={() => this.toggleCityModal()}
              style={{
                width: '100%',
                height: 45,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#F8F8F8',
              }}>
              <Text
                style={{
                  fontSize: getAdjustedFontSize(16),
                  color: '#000000',
                  paddingLeft: 10,
                  textAlign: language == 'ar' ? 'right' : 'left',
                  width: '100%',
                }}>
                {this.state.setectedCity}
              </Text>
            </TouchableOpacity>
          </View>

          <Text
            style={{
              fontSize: getAdjustedFontSize(16),
              alignSelf: 'flex-start',
              marginTop: 35,
              marginLeft: 10,
            }}>
            {i18n.t('service.locationName')}
          </Text>
          <TextInput
            style={[
              styles.text,
              {textAlign: language == 'ar' ? 'right' : 'left'},
            ]}
            placeholder={i18n.t('service.typeHere')}
            keyboardType="email-address"
            value={this.state.location}
            underlineColorAndroid="transparent"
            onChangeText={location => this.setState({location})}
          />

          <Text
            style={{
              fontSize: getAdjustedFontSize(16),
              alignSelf: 'flex-start',
              marginTop: 35,
              marginLeft: 10,
            }}>
            {i18n.t('service.line1')}
          </Text>
          <TextInput
            style={[
              styles.text,
              {textAlign: language == 'ar' ? 'right' : 'left'},
            ]}
            value={this.state.address_one}
            placeholder={i18n.t('service.typeHere')}
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onChangeText={address_one => {
              const _that = this;
              _that.setState({address_one});
            }}
          />

          <Text
            style={{
              fontSize: getAdjustedFontSize(16),
              alignSelf: 'flex-start',
              marginTop: 35,
              marginLeft: 10,
            }}>
            {i18n.t('service.line2')}
          </Text>
          <TextInput
            style={[
              styles.text,
              {textAlign: language == 'ar' ? 'right' : 'left'},
            ]}
            value={this.state.address_two}
            placeholder={i18n.t('service.typeHere')}
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onChangeText={address_two => this.setState({address_two})}
          />

          <Text
            style={{
              fontSize: getAdjustedFontSize(16),
              alignSelf: 'flex-start',
              marginTop: 35,
              marginLeft: 10,
            }}>
            {i18n.t('service.zipCode')}
          </Text>
          <TextInput
            style={[
              styles.text,
              {textAlign: language == 'ar' ? 'right' : 'left'},
            ]}
            value={`${this.state.zipCode}`}
            placeholder={i18n.t('service.typeHere')}
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            onChangeText={zipCode => this.setState({zipCode})}
          />

          <Text
            style={{
              fontSize: getAdjustedFontSize(16),
              alignSelf: 'flex-start',
              marginTop: 35,
              marginLeft: 10,
            }}>
            {i18n.t('service.serviceStart')}
          </Text>
          <View
            style={{
              backgroundColor: '#F8F8F8',
              width: '100%',
              height: 45,
              paddingLeft: 10,
              marginTop: 15,
              fontSize: getAdjustedFontSize(16),
              borderBottomColor: '#F8F8F8',
            }}>
            <DatePicker
              style={{width: '100%', height: '100%', alignSelf: 'center'}}
              date={this.state.date}
              mode="date"
              placeholder="Start date"
              format="YYYY-MM-DD"
              minDate="2020-01-01"
              // maxDate="2016-06-01"
              confirmBtnText="Confirm"
              showIcon={false}
              cancelBtnText="Cancel"
              customStyles={
                {
                  // ... You can check the source to find the other keys.
                }
              }
              onDateChange={date => {
                this.setState({date: date});
              }}
              customStyles={{
                dateInput: {borderWidth: 0, alignItems: 'flex-start'},
                placeholderText: {fontSize: getAdjustedFontSize(16)},
                dateText: {fontSize: getAdjustedFontSize(16)},
              }}
            />
          </View>
        </KeyboardAwareScrollView>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            zIndex: 1,
            width: '100%',
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#23BDE4',
          }}
          onPress={() => this.validation()}>
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

        <View style={{overFlow: 'hidden'}}>
          <Modal
            isVisible={this.state.isCountryModalVisible}
            style={{
              position: 'absolute',
              top: -20,
              bottom: -20,
              right: -20,
              left: -20,
            }}>
            <View
              style={{
                width: '100%',
                height: '100%',
                padding: 20,
                backgroundColor: '#ffffff',
              }}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    width: '85%',
                    height: 100,
                    paddingTop: 20,
                    paddingBottom: 20,
                    flexDirection: 'row',
                  }}>
                  <TextInput
                    value={this.state.phone}
                    onChangeText={search => this.onSearchCountry(search)}
                    style={{
                      width: '100%',
                      height: 50,
                      fontSize: getAdjustedFontSize(16),
                      paddingLeft: 15,
                      textAlign: language == 'ar' ? 'right' : 'left',
                      alignSelf: 'center',
                      marginBottom: 20,
                      marginTop: 15,
                      backgroundColor: '#F8F8F8',
                    }}
                    placeholderTextColor="#C1C1C1"
                    selectionColor={'#ffffff'}
                    placeholder={i18n.t('service.searchCountry')}
                  />
                </View>

                <View style={{width: 30, height: 30}}>
                  <TouchableOpacity
                    style={{width: 30, height: 30}}
                    onPress={this.toggleCountryModal}>
                    <View style={{height: 25, width: 25}}>
                      <Image
                        style={{width: '100%', height: '100%'}}
                        source={require('../../assets/images/close2.svg')}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{backgroundColor: '#C4C4C4', width: '100%', height: 1}}
              />

              <View style={{width: '100%'}}>
                {this.state.countries.length !== 0 ? (
                  <FlatList
                    style={styles2.list}
                    contentContainerStyle={{paddingBottom: 150}}
                    data={this.state.countries}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => {
                      return <View style={styles2.separator} />;
                    }}
                    renderItem={({item: rowData}) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                              country_name: rowData.id,
                              countryValue: rowData.value,
                              states: [],
                            });
                            this.setectedCountry(rowData);
                          }}>
                          <Text style={styles2.clientName} numberOfLines={1}>
                            {rowData.value}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                ) : (
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{alignSelf: 'center'}}>
                      <Text style={styles2.clientName} numberOfLines={1}>
                        {i18n.t('service.noCountryFound')}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </View>
          </Modal>
        </View>

        <View style={{overFlow: 'hidden'}}>
          <Modal
            isVisible={this.state.isStateModalVisible}
            style={{
              position: 'absolute',
              top: -20,
              bottom: -20,
              right: -20,
              left: -20,
            }}>
            <View
              style={{
                width: '100%',
                height: '100%',
                padding: 20,
                backgroundColor: '#ffffff',
              }}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    width: '85%',
                    height: 100,
                    paddingTop: 20,
                    paddingBottom: 20,
                    flexDirection: 'row',
                  }}>
                  <TextInput
                    value={this.state.phone}
                    onChangeText={search => this.onSearchState(search)}
                    style={{
                      width: '100%',
                      height: 50,
                      fontSize: getAdjustedFontSize(16),
                      paddingLeft: 15,
                      alignSelf: 'center',
                      marginBottom: 20,
                      marginTop: 15,
                      backgroundColor: '#F8F8F8',
                      textAlign: language == 'ar' ? 'right' : 'left',
                    }}
                    placeholderTextColor="#C1C1C1"
                    selectionColor={'#ffffff'}
                    placeholder={i18n.t('service.searchState')}
                  />
                </View>

                <View style={{width: 30, height: 30}}>
                  <TouchableOpacity
                    style={{width: 30, height: 30}}
                    onPress={this.toggleStateModal}>
                    <View style={{height: 25, width: 25}}>
                      <Image
                        style={{width: '100%', height: '100%'}}
                        source={require('../../assets/images/close2.svg')}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{backgroundColor: '#C4C4C4', width: '100%', height: 1}}
              />

              <View style={{width: '100%'}}>
                {this.state.states.length !== 0 ? (
                  <FlatList
                    style={styles2.list}
                    contentContainerStyle={{paddingBottom: 150}}
                    data={this.state.states}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => {
                      return <View style={styles2.separator} />;
                    }}
                    renderItem={({item: rowData}) => {
                      return (
                        <TouchableOpacity
                          onPress={() => this.setectedState(rowData)}>
                          <Text style={styles2.clientName} numberOfLines={1}>
                            {rowData.value}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                ) : (
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <View
                      style={{
                        alignSelf: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={styles2.clientName} numberOfLines={1}>
                        {i18n.t('service.noStateFound')}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </View>
          </Modal>
        </View>

        <View style={{overFlow: 'hidden'}}>
          <Modal
            isVisible={this.state.isCityModalVisible}
            style={{
              position: 'absolute',
              top: -20,
              bottom: -20,
              right: -20,
              left: -20,
            }}>
            <View
              style={{
                width: '100%',
                height: '100%',
                padding: 20,
                backgroundColor: '#ffffff',
              }}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    width: '85%',
                    height: 100,
                    paddingTop: 20,
                    paddingBottom: 20,
                    flexDirection: 'row',
                  }}>
                  <TextInput
                    value={this.state.phone}
                    onChangeText={search => this.onSearchCity(search)}
                    style={{
                      width: '100%',
                      height: 50,
                      fontSize: getAdjustedFontSize(16),
                      paddingLeft: 15,
                      alignSelf: 'center',
                      textAlign: language == 'ar' ? 'right' : 'left',
                      marginBottom: 20,
                      marginTop: 15,
                      backgroundColor: '#F8F8F8',
                    }}
                    placeholderTextColor="#C1C1C1"
                    selectionColor={'#ffffff'}
                    placeholder={i18n.t('service.searchCity')}
                  />
                </View>

                <View style={{width: 30, height: 30}}>
                  <TouchableOpacity
                    style={{width: 30, height: 30}}
                    onPress={this.toggleCityModal}>
                    <View style={{height: 25, width: 25}}>
                      <Image
                        style={{width: '100%', height: '100%'}}
                        source={require('../../assets/images/close2.svg')}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{backgroundColor: '#C4C4C4', width: '100%', height: 1}}
              />

              <View style={{width: '100%'}}>
                {this.state.cities.length !== 0 ? (
                  <FlatList
                    style={styles2.list}
                    contentContainerStyle={{paddingBottom: 150}}
                    data={this.state.cities}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => {
                      return <View style={styles2.separator} />;
                    }}
                    renderItem={({item: rowData}) => {
                      return (
                        <TouchableOpacity
                          onPress={() => this.setectedCity(rowData)}>
                          <Text style={styles2.clientName} numberOfLines={1}>
                            {rowData.value}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                  />
                ) : (
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <View
                      style={{
                        alignSelf: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={styles2.clientName} numberOfLines={1}>
                        {i18n.t('service.noCityFound')}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    backgroundColor: '#F8F8F8',
    width: '100%',
    height: 45,
    paddingLeft: 10,
    paddingRight: 12,
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

const styles2 = StyleSheet.create({
  container: {
    height: '100%',
    marginBottom: 50,
  },
  list: {
    padding: 5,
  },
  separator: {
    marginBottom: 30,
  },
  /******** card **************/
  card: {
    width: '100%',
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
    // height: '100%',
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
  },

  /******** card components **************/
  title: {
    fontSize: getAdjustedFontSize(18),
    color: '#285DB3',
    position: 'absolute',
    right: 10,
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
  clientName: {
    fontSize: getAdjustedFontSize(18),
    alignSelf: 'flex-start',
  },
});

function mapStateToProps(state) {
  return {
    success: state.success,
    error: state.error,
    message: state.message,
    data: state.service.service,
    userAddress: state.service.userAddress,
    countries: state.user.countries,
    states: state.user.states,
    cities: state.user.cities,
    userdata: state.user.newData,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Step2);
