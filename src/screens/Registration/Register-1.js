import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  BackHandler,
  TextInput,
  ScrollView,
} from 'react-native';
import styles from './style';
import i18n from '../../../lang/i18n';
import CountryCodes from '../ForgetPassword/CountryCodes.json';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';

class Register1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: '',
      countryCodes: CountryCodes,
      //selectedCountry: CountryCodes[189].dial_code,
      selectedCountry: CountryCodes[189],
      dialCode: CountryCodes[189].dial_code,
      language: '',
      place: {},
      modalOpen: false,
      countryCodes: CountryCodes,
      countryCodesSearch: CountryCodes,
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

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

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };

  closeToggleModal = () => {
    this.setState({modalOpen: false});
  };

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  };

  componentWillMount() {
    AsyncStorage.getItem('language').then(value => {
      this.setState({language: value});
    });
  }

  gotoRegister2 = () => {
    this.props.navigation.navigate('Register2', {
      //selectedCountry: this.state.selectedCountry,
      selectedCountry: this.state.selectedCountry.dial_code,
    });
    console.log(this.state.selectedCountry);
    console.log(this.state.selectedCountry.dial_code);
    console.log(this.state.dial_code);
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
    const pickerStyle = {
      inputIOS: {
        backgroundColor: '#F8F8F8',
        width: '100%',
        height: 45,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 15,
        fontSize: 16,
        borderBottomColor: '#F8F8F8',
      },
      inputAndroid: {
        backgroundColor: '#F8F8F8',
        width: '100%',
        height: 45,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 15,
        fontSize: 16,
        borderBottomColor: '#F8F8F8',
      },
    };

    return (
      <View style={styles.MainContainer}>
        <StatusBar backgroundColor="#2383C3" barStyle="light-content" />
        <SafeAreaView style={styles.SafeAreaView} />

        <View style={styles.Header}>
          <TouchableOpacity
            style={styles.Back}
            onPress={() => this.props.navigation.navigate('Login')}>
            <Image
              style={{
                ...styles.BackImage,
                transform: [{rotate: i18n.locale === 'ar' ? '180deg' : '0deg'}],
              }}
              source={require('../../assets/images/back.svg')}
            />
          </TouchableOpacity>
          <Text style={styles.HeaderContent}>1 / 4</Text>
        </View>
        <View style={{flex: 1}}>
          <View>
            <View style={styles.countryView}>
              <Text>{i18n.t('enterCode')}</Text>
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
                language == 'ar' ? styles.pickerViewAR2 : styles.pickerView2
              }>
              <Text style={styles.itemText}>
                {selectedCountry.dial_code + ' (' + selectedCountry.name + ')'}
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
          </View>

          {/* <View style={{padding: i18n.locale === 'ar' ? 10 : 0}}>
            <Text style={styles.BodyContent}>{i18n.t('register.country')}</Text>
          </View>
          <RNPickerSelect
            onValueChange={value => this.setState({selectedCountry: value})}
            style={pickerStyle}
            Icon={() => {
              return (
                <View>
                  <Image
                    source={require('../../assets/images/Dropdown.svg')}
                    style={
                      language == 'ar'
                        ? styles.DropdownImgAR
                        : styles.DropdownImgEN
                    }
                  />
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
          /> */}
        </View>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.FooterButton}
          onPress={() => this.gotoRegister2()}>
          <Text style={styles.FooterButtonText}>
            {i18n.t('register.continue')}
          </Text>
        </TouchableOpacity>

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

        <SafeAreaView style={{backgroundColor: '#23BDE4'}} />
      </View>
    );
  }
}

export default Register1;
