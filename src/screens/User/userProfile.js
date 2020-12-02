import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  FlatList,
  View,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
  TouchableOpacity,
  BackHandler,
  Dimensions,
} from 'react-native';
import i18n from '../../../lang/i18n';
import Modal from 'react-native-modal';
import RNPickerSelect from 'react-native-picker-select';
import {Dropdown} from 'react-native-material-dropdown';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-community/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import countryCodes from './CountryCodes';
import {valueString} from '../../helpers/core';
import {getAdjustedFontSize} from '../../responsive/responsive';
import ImageSpinner from 'react-native-image-progress';
import Progress from 'react-native-progress';
import SpinnerButton from 'react-native-spinner-button';

const screenWidth = Math.round(Dimensions.get('window').width);

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      language: '',
      edit: false,
      data: '',
      countries: [],
      countryId: '',
      states: [],
      stateId: '',
      cities: [],
      avatarSource: null,
      profile_pic: null,
      isModalVisible: false,
      fullname: '',
      isCountryModalVisible: false,
      setectedCountry: '',
      // country_name: "191",
      // countryValue: "Saudi Arabia",
      isStateModalVisible: false,
      setectedState: '',
      isCityModalVisible: false,
      setectedCity: '',
    };
  }

  state = {
    token: '',
    language: '',
    edit: false,
    data: '',
    countries: [],
    countryId: '',
    states: [],
    stateId: '',
    cities: [],
    avatarSource: null,
    profile_pic: null,
    isModalVisible: false,
    fullname: '',
    isCountryModalVisible: false,
    setectedCountry: '',
    // country_name: "191",
    // countryValue: "Saudi Arabia",
    isStateModalVisible: false,
    setectedState: '',
    isCityModalVisible: false,
    setectedCity: '',
  };

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

  componentDidMount() {
    this.getData();
    this.getCountry();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillMount() {
    AsyncStorage.getItem('language').then(value => {
      this.setState({language: value});
    });
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
      this.props.getUserDetails(this, {
        token: this.state.token,
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
    if (search.length > 2) {
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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data != this.props.data) {
      if (this.props.data) {
        this.setState({
          setectedCountry: this.props.data.country.name,
          setectedState: this.props.data.state.name,
          setectedCity: this.props.data.city.name,
        });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.setState({
        data: nextProps.data,
        fullname: nextProps.data.full_name,
        serverImg: nextProps.data.profile_image,
      });
    }

    if (nextProps.update_data) {
      this.getData();
      this.setState({
        isModalVisible: false,
        spinnerEnable: false,
      });
    }

    if (nextProps.update_data_error) {
      this.getData();
      this.setState({spinnerEnable: false});
      alert(nextProps.update_data_error);
    }

    if (nextProps.profile_pic) {
      this.getData();
    }

    if (nextProps.countries) {
      var data = this.state.countries;
      nextProps.countries.map((item, index) => {
        data.push({
          value: item.name,
          id: item.id,
        });
      });
      this.setState({countries: data});
    }

    if (nextProps.states) {
      var data = this.state.states;
      nextProps.states.map((item, index) => {
        data.push({
          value: item.name,
          id: item.id,
        });
      });

      this.setState({states: data});
    }

    if (nextProps.cities) {
      var data = this.state.cities;
      nextProps.cities.map((item, index) => {
        data.push({
          value: item.name,
          id: item.id,
        });
      });
      this.setState({cities: data});
    }
  }

  toggleModal = rowData => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  onSubmit() {
    AsyncStorage.getItem('TOKEN').then(value => {
      this.setState({token: value, spinnerEnable: true});
      this.props.updateUserDetails(this, {
        token: this.state.token,
        fullname: this.state.fullname,
        address1: this.state.address1,
        address2: this.state.address2,
        country_name: this.state.country_name,
        state_name: this.state.state_name,
        city_name: this.state.city_name,
        zip_code: this.state.zip_code,
        email: this.state.email,
        phone: this.state.phone,
        image: this.state.profile_pic,
        currentPassword: this.state.password,
      });
    });
    // this.setState({ isModalVisible: false })
  }

  addImage = (image, uuid) => {
    let formData = new FormData();
    let pathParts = image.path.split('/');
    let photo = {
      uri: image.path,
      type: image.mime,
      name: pathParts[pathParts.length - 1],
    };
    formData.append('profileImage', photo);
    formData.append('_method', 'PATCH');
    AsyncStorage.getItem('TOKEN').then(value => {
      this.setState({token: value});
      this.props.uploadProfile(this, {
        token: this.state.token,
        formData: formData,
      });
    });
  };

  imagePicker = uuid => {
    const _that = this;

    ImagePicker.openPicker({
      mediaType: 'photo',
      width: 300,
      height: 400,
      maxFiles: 20,
      waitAnimationEnd: false,
      includeExif: true,
      // cropping: true,
      multiple: false,
    })
      .then(image => {
        this.addImage(image, uuid);
      })
      .catch(err => {
        alert(err);
      });
  };

  render() {
    const {language, spinnerEnable} = this.state;
    let {
      full_name,
      address_1,
      address_2,
      country,
      state,
      city,
      zip_code,
      email,
      phone,
    } = (this.props && this.props.data) || {};

    console.log('data 422', this.props.data);
    return (
      <View style={{flex: 1}}>
        <SafeAreaView style={{backgroundColor: '#2383C3'}}>
          <StatusBar backgroundColor="#2383C3" barStyle="light-content" />
          <View
            style={{
              width: '100%',
              height: 60,
              flexDirection: 'row',
              padding: 10,
              justifyContent: 'space-between',
              backgroundColor: '#2383C3',
            }}>
            <TouchableOpacity
              style={{marginTop: 10}}
              onPress={() => this.props.navigation.navigate('Dashboard')}>
              <Image
                style={{
                  width: 25,
                  height: 25,
                  transform: [
                    {rotate: i18n.locale === 'ar' ? '180deg' : '0deg'},
                  ],
                }}
                source={require('../../assets/images/back.svg')}
              />
            </TouchableOpacity>
            <View style={{justifyContent: 'center'}}>
              <Text style={{fontSize: 18, color: '#ffffff'}}>
                {i18n.t('profile.userProfile')}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => this.setState({edit: !this.state.edit})}>
                <View style={{height: 22, width: 22, marginTop: 10}}>
                  <Image
                    style={{
                      width: '100%',
                      height: '100%',
                      resizeMode: 'contain',
                      transform: [
                        {rotate: i18n.locale === 'ar' ? '270deg' : '0deg'},
                      ],
                    }}
                    source={
                      this.state.edit
                        ? require('../../assets/images/cancel_edit.svg')
                        : require('../../assets/images/Edit.svg')
                    }
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
        <KeyboardAwareScrollView
          style={{width: '100%'}}
          contentContainerStyle={{paddingBottom: 50}}>
          <View
            style={{
              width: '100%',
              height: 150,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                height: 120,
                width: 120,
                justifyContent: 'center',
                borderRadius: 172 / 2,
                borderWidth: 5,
                borderColor: '#ffffff',
                overflow: 'hidden',
              }}>
              {this.state.serverImg ? (
                <ImageSpinner
                  style={{width: '100%', height: '100%', resizeMode: 'cover'}}
                  source={require('../../assets/images/addCart.svg')}
                  source={{
                    uri:
                      'https://core.isalamah.com/public/' +
                      this.props.data.profile_image,
                  }}
                  indicator={Progress}
                  indicatorProps={{
                    // size: 50,
                    thickness: 4,
                    duration: 3000,
                    spinDuration: 2000,
                    color: '#2185D0',
                    // unfilledColor: 'rgba(200, 200, 200, 0.2)'
                  }}
                />
              ) : (
                <Image
                  style={{width: '100%', height: '100%', resizeMode: 'cover'}}
                  source={require('../../assets/images/user-2.svg')}
                />
              )}
            </View>
            {this.state.edit && (
              <View
                style={{
                  height: 30,
                  width: 30,
                  position: 'absolute',
                  bottom: 15,
                  right: 140,
                }}>
                <TouchableOpacity
                  style={{height: 30, width: 30}}
                  onPress={() => {
                    this.state.edit && this.imagePicker();
                  }}>
                  <Image
                    style={{
                      width: '100%',
                      height: '100%',
                      resizeMode: 'contain',
                    }}
                    source={require('../../assets/images/EditProfile.svg')}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 16, marginTop: 25, marginLeft: 10}}>
              {i18n.t('profile.fullName')}
            </Text>
          </View>
          <TextInput
            style={{
              backgroundColor: '#F8F8F8',
              width: '100%',
              height: 45,
              paddingHorizontal: 10,
              marginTop: 15,
              fontSize: 16,
              borderBottomColor: '#F8F8F8',
            }}
            placeholder={i18n.t('profile.typeHere')}
            editable={this.state.edit}
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            value={this.state.fullname}
            onChangeText={fullname => {
              this.setState({fullname: fullname});
            }}
          />

          <Text
            style={{
              fontSize: 16,
              alignSelf: 'flex-start',
              marginTop: 25,
              marginLeft: 10,
            }}>
            {i18n.t('profile.address1')}:
          </Text>
          <TextInput
            style={{
              backgroundColor: '#F8F8F8',
              width: '100%',
              height: 45,
              paddingLeft: 10,
              marginTop: 15,
              fontSize: 16,
              borderBottomColor: '#F8F8F8',
              textAlign: i18n.locale === 'ar' ? 'right' : 'left',
            }}
            placeholder={i18n.t('profile.typeHere')}
            editable={this.state.edit}
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            value={valueString(this.state.address1, address_1)}
            onChangeText={address1 => this.setState({address1: address1})}
          />

          <Text
            style={{
              fontSize: 16,
              alignSelf: 'flex-start',
              marginTop: 25,
              marginLeft: 10,
            }}>
            {i18n.t('profile.address2')}:
          </Text>
          <TextInput
            style={{
              backgroundColor: '#F8F8F8',
              width: '100%',
              height: 45,
              paddingLeft: 10,
              marginTop: 15,
              fontSize: 16,
              borderBottomColor: '#F8F8F8',
              textAlign: i18n.locale === 'ar' ? 'right' : 'left',
            }}
            placeholder={i18n.t('profile.typeHere')}
            editable={this.state.edit}
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            value={valueString(this.state.address2, address_2)}
            onChangeText={address2 => this.setState({address2: address2})}
          />

          <Text
            style={{
              fontSize: 16,
              marginTop: 25,
              alignSelf: 'flex-start',
              marginLeft: 10,
            }}>
            {i18n.t('profile.country')}
          </Text>
          <View
            style={{
              backgroundColor: '#F8F8F8',
              width: '100%',
              height: 45,
              justifyContent: 'center',
              paddingLeft: 10,
              marginTop: 15,
              fontSize: 16,
              borderBottomColor: '#F8F8F8',
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
              <TextInput
                editable={false}
                style={{
                  fontSize: getAdjustedFontSize(16),
                  color: '#000000',
                  textAlign: language == 'ar' ? 'right' : 'left',
                  width: '100%',
                }}
                pointerEvents={'none'}
                value={this.state.setectedCountry}
                placeholderTextColor="#C1C1C1"
                selectionColor={'#ffffff'}
                placeholder={i18n.t('service.countryName')}
              />
            </TouchableOpacity>
          </View>

          <Text
            style={{
              fontSize: 16,
              marginTop: 25,
              alignSelf: 'flex-start',
              marginLeft: 10,
            }}>
            {i18n.t('profile.state')}
          </Text>
          <View
            style={{
              backgroundColor: '#F8F8F8',
              width: '100%',
              height: 45,
              justifyContent: 'center',
              paddingLeft: 10,
              marginTop: 15,
              fontSize: 16,
              borderBottomColor: '#F8F8F8',
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
              <TextInput
                editable={false}
                style={{
                  fontSize: getAdjustedFontSize(16),
                  color: '#000000',
                  textAlign: language == 'ar' ? 'right' : 'left',
                  width: '100%',
                }}
                pointerEvents={'none'}
                value={this.state.setectedState}
                placeholderTextColor="#C1C1C1"
                selectionColor={'#ffffff'}
                placeholder={i18n.t('service.stateName')}
              />
            </TouchableOpacity>
          </View>

          <Text
            style={{
              fontSize: 16,
              marginTop: 25,
              alignSelf: 'flex-start',
              marginLeft: 10,
            }}>
            {i18n.t('profile.city')}
          </Text>
          <View
            style={{
              backgroundColor: '#F8F8F8',
              width: '100%',
              height: 45,
              justifyContent: 'center',
              paddingLeft: 10,
              marginTop: 15,
              fontSize: 16,
              borderBottomColor: '#F8F8F8',
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
              <TextInput
                editable={false}
                pointerEvents={'none'}
                style={{
                  fontSize: getAdjustedFontSize(16),
                  color: '#000000',
                  textAlign: language == 'ar' ? 'right' : 'left',
                  width: '100%',
                }}
                value={this.state.setectedCity}
                placeholderTextColor="#C1C1C1"
                selectionColor={'#ffffff'}
                placeholder={i18n.t('service.cityName')}
              />
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 16, marginTop: 25, marginLeft: 10}}>
              {i18n.t('profile.zipCode')}
            </Text>
          </View>
          <TextInput
            style={{
              backgroundColor: '#F8F8F8',
              width: '100%',
              height: 45,
              paddingHorizontal: 10,
              marginTop: 15,
              fontSize: 16,
              borderBottomColor: '#F8F8F8',
            }}
            placeholder={i18n.t('profile.typeHere')}
            editable={this.state.edit}
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            value={valueString(
              this.state.zip_code,
              `${zip_code ? zip_code : ''}`,
            )}
            onChangeText={zip_code => this.setState({zip_code: zip_code})}
          />

          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 16, marginTop: 25, marginLeft: 10}}>
              {i18n.t('profile.email')}
            </Text>
          </View>
          <TextInput
            style={{
              backgroundColor: '#F8F8F8',
              width: '100%',
              height: 45,
              paddingHorizontal: 10,
              marginTop: 15,
              fontSize: 16,
              borderBottomColor: '#F8F8F8',
            }}
            placeholder={i18n.t('profile.typeHere')}
            editable={this.state.edit}
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            value={valueString(this.state.email, email)}
            onChangeText={email => this.setState({email: email})}
          />

          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 16, marginTop: 25, marginLeft: 10}}>
              {i18n.t('profile.phone')}
            </Text>
          </View>
          <TextInput
            style={{
              backgroundColor: '#F8F8F8',
              width: '100%',
              height: 45,
              paddingHorizontal: 10,
              marginTop: 15,
              fontSize: 16,
              borderBottomColor: '#F8F8F8',
            }}
            placeholder={i18n.t('profile.typeHere')}
            editable={this.state.edit}
            keyboardType="decimal-pad"
            underlineColorAndroid="transparent"
            value={valueString(this.state.phone, `${phone}`)}
            onChangeText={phone => this.setState({phone: phone})}
          />
        </KeyboardAwareScrollView>
        {this.state.edit && (
          <TouchableOpacity
            activeOpacity={1}
            style={{width: '100%', height: 50, backgroundColor: '#23BDE4'}}
            onPress={() => this.toggleModal()}>
            <Text
              style={{
                color: '#ffffff',
                fontSize: 18,
                alignSelf: 'center',
                padding: 10,
              }}>
              {i18n.t('profile.save')}
            </Text>
          </TouchableOpacity>
        )}
        {this.state.edit && (
          <SafeAreaView style={{backgroundColor: '#23BDE4'}} />
        )}

        {/*PopUP Modal*/}
        <Modal isVisible={this.state.isModalVisible}>
          <View
            style={{
              width: '100%',
              padding: 20,
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
              style={{width: '100%', paddingBottom: 10, alignItems: 'center'}}>
              <Text
                style={{
                  color: '#76848B',
                  fontSize: 14,
                  alignSelf: 'center',
                  marginTop: 20,
                }}>
                {i18n.t('profile.enterPassword')}
              </Text>
            </View>

            <View
              style={{backgroundColor: '#C4C4C4', width: '100%', height: 1}}
            />

            <View style={{alignItems: 'center', paddingBottom: 40}}>
              <View
                style={{
                  alignSelf: i18n.locale === 'ar' ? 'flex-end' : 'flex-start',
                }}>
                <Text style={{fontSize: 16, marginTop: 25, marginLeft: 10}}>
                  {i18n.t('profile.password')}
                </Text>
              </View>
              <TextInput
                style={{
                  backgroundColor: '#F8F8F8',
                  width: '100%',
                  height: 45,
                  paddingHorizontal: 10,
                  marginTop: 15,
                  fontSize: 16,
                  borderBottomColor: '#F8F8F8',
                }}
                placeholder={i18n.t('profile.typeHere')}
                secureTextEntry={true}
                underlineColorAndroid="transparent"
                value={this.state.password}
                onChangeText={password => this.setState({password: password})}
              />
            </View>

            <View
              style={{
                width: '100%',
                height: 50,
                flexDirection: 'row',
                marginBottom: 20,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: '#23BDE4',
              }}>
              {!spinnerEnable ? (
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
                  onPress={() => this.onSubmit()}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: '#ffffff',
                      alignSelf: 'center',
                    }}>
                    {i18n.t('profile.submit')}
                  </Text>
                </TouchableOpacity>
              ) : (
                <View
                  style={{
                    width: '100%',
                    height: 50,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 50,
                    backgroundColor: '#23BDE4',
                  }}>
                  <SpinnerButton
                    buttonStyle={{
                      width: 110,
                      height: 35,
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                      backgroundColor: '#23BDE4',
                    }}
                    isLoading={spinnerEnable}
                    indicatorCount={10}
                    size={10}
                    spinnerType="DotIndicator"
                  />
                </View>
              )}
            </View>

            {/* <View
              style={{
                width: '100%',
                height: 50,
                flexDirection: 'row',
                marginBottom: 20,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: '#23BDE4',
              }}>
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
                onPress={() => this.onSubmit()}>
                <Text
                  style={{fontSize: 20, color: '#ffffff', alignSelf: 'center'}}>
                  {i18n.t('profile.submit')}
                </Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </Modal>
        {/*PopUP Modal*/}

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
                          onPress={() => {
                            this.setState({
                              state_name: rowData.id,
                              stateValue: rowData.value,
                              cities: [],
                            });
                            this.setectedState(rowData);
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
    data: state.user.data,
    update_data: state.user.update_data,
    update_data_error: state.user.update_data_error,
    countries: state.user.countries,
    states: state.user.states,
    cities: state.user.cities,
    profile_pic: state.user.profile_pic,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfile);
