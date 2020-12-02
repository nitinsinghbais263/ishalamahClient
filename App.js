import React, {Component} from 'react';
// import { AsyncStorage } from '@react-native-community/async-storage';
import {
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  PermissionsAndroid,
  I18nManager,
} from 'react-native';
import {Provider} from 'react-redux';
import {compose, createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducer from './src/reducers';
import i18n from './lang/i18n';
import MainNavigator from './src/navigation/routes';
import AsyncStorage from '@react-native-community/async-storage';
import OneSignal from 'react-native-onesignal';
// import Geolocation from '@react-native-community/geolocation';
import * as RNLocalize from 'react-native-localize';

const loggerMiddleware = createLogger({
  predicate: (getState, action) => __DEV__,
});

function configureStore(initialState) {
  const enhancer = compose(applyMiddleware(thunkMiddleware, loggerMiddleware));
  return createStore(reducer, initialState, enhancer);
}
export const store = configureStore({});

export default class App extends Component {
  constructor() {
    super();

    OneSignal.init('5efa8d8f-44c3-4da2-a975-29efaad78354');
    OneSignal.clearOneSignalNotifications();
    OneSignal.configure();
    OneSignal.enableVibrate(true);
    OneSignal.enableSound(true);
    OneSignal.inFocusDisplaying(2);

    this.onIds = this.onIds.bind(this);
  }

  state = {
    currentLongitude: 'unknown',
    currentLatitude: 'unknown',
  };

  //   componentDidMount = () => {
  //
  //
  // var that =this;
  // //Checking for the permission just after component loaded
  // // if(Platform.OS === 'android'){
  // //
  // //   async function requestLocationPermission() {
  // //     try {
  // //       const granted = await PermissionsAndroid.request(
  // //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
  // //           'title': 'Location Access Required',
  // //           'message': 'This App needs to Access your location'
  // //         }
  // //       )
  // //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  // //         //To Check, If Permission is granted
  // //         that.callLocation(that);
  // //       } else {
  // //         alert("Permission Denied");
  // //       }
  // //     } catch (err) {
  // //       // alert("err",err);
  // //       console.warn(err)
  // //     }
  // //   }
  // //   requestLocationPermission();
  // // }
  // }

  //   callLocation(that){
  // //alert("callLocation Called");
  //   Geolocation.getCurrentPosition(
  //     //Will give you the current location
  //      (position) => {
  //         const currentLongitude = JSON.stringify(position.coords.longitude);
  //         //getting the Longitude from the location json
  //         const currentLatitude = JSON.stringify(position.coords.latitude);
  //         //getting the Latitude from the location json
  //         that.setState({ currentLongitude:currentLongitude });
  //
  //         //Setting state Longitude to re re-render the Longitude Text
  //         that.setState({ currentLatitude:currentLatitude });
  //         //Setting state Latitude to re re-render the Longitude Text
  //      },
  //      // (error) => alert(error.message),
  //      { enableHighAccuracy: true, timeout: 20000, }
  //   );
  //   that.watchID = Geolocation.watchPosition((position) => {
  //     //Will give you the location on location change
  //       console.log(position);
  //       const currentLongitude = JSON.stringify(position.coords.longitude);
  //       //getting the Longitude from the location json
  //       const currentLatitude = JSON.stringify(position.coords.latitude);
  //       //getting the Latitude from the location json
  //      that.setState({ currentLongitude:currentLongitude });
  //      //Setting state Longitude to re re-render the Longitude Text
  //      that.setState({ currentLatitude:currentLatitude });
  //      //Setting state Latitude to re re-render the Longitude Text
  //   });
  // }

  //   componentWillUnmount = () => {
  //   OneSignal.removeEventListener('ids', this.onIds);
  //   Geolocation.clearWatch(this.watchID);
  // }

  componentWillMount() {
    // let sysLang = RNLocalize.getLocales()
    // AsyncStorage.getItem('language')
    // .then((value)=>{
    // if(!value){
    //   // AsyncStorage.setItem('language', sysLang[0].languageCode);
    //   AsyncStorage.setItem('language', 'ar');
    //   i18n.locale = sysLang[0].languageCode;
    //   if(sysLang[0].languageCode === 'ar'){
    //     I18nManager.forceRTL(true);
    //   }else{
    //     I18nManager.forceRTL(false); }
    //   }
    //
    // })

    AsyncStorage.getItem('language').then(value => {
      if (value) {
        i18n.locale = value;
      }
      if (value === 'ar') {
        I18nManager.forceRTL(true);
      } else {
        I18nManager.forceRTL(false);
      }
    });

    OneSignal.addEventListener('ids', this.onIds);
  }

  onIds(device) {
    AsyncStorage.setItem('OneSignalId', device.userId);
  }

  componentDidUnmount() {
    OneSignal.removeEventListener('ids', this.onIds);
    // Geolocation.clearWatch(this.watchID);
    // OneSignal.removeEventListener('opened', this.onOpened);
  }

  render() {
    console.disableYellowBox = true;
    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}
