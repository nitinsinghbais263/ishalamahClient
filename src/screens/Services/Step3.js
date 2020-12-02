import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
  Button,
  Alert,
  StatusBar,
  SafeAreaView,
  Image,
  BackHandler,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import styles from './Style.js';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {getAdjustedFontSize} from '../../responsive/responsive';
import i18n from '../../../lang/i18n';
import Geolocation from '@react-native-community/geolocation';

export default class Step3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinate: [],
      departCoordinate: [],
      coordinateCurrent: [],
      region: {
        // lat: this.props.currentRegion && this.props.currentRegion.latitude,
        // lng: this.props.currentRegion && this.props.currentRegion.longitude,
        // latitude: this.props.currentRegion && this.props.currentRegion.latitude,
        // longitude: this.props.currentRegion && this.props.currentRegion.longitude,
        // latitudeDelta: 0.015,
        // longitudeDelta: 0.0121
      },
    };
  }

  getInitialState() {
    const {coordinateCurrent} = this.state;
    this.setState({
      region: {
        lat: 23.259933,
        lng: 77.412613,
        latitude: 23.259933,
        longitude: 77.412613,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      },
    });
  }

  onRegionChange = region => {
    this.setState({region});
  };

  onMarkerChange = coordinate => {
    this.setState({
      region: {
        lat: coordinate.latitude,
        lng: coordinate.longitude,
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      },
    });
  };

  componentDidMount() {
    if (this.props.region && this.props.region.latitude) {
      this.setState({region: this.props.region});
    } else {
      this.getCoordinatesIos();
      if (Platform.OS === 'android') {
        this.getCoordinates();
      }
    }
  }

  getCoordinates() {
    const _that = this;
    this.setState({loading: true});
    Geolocation.getCurrentPosition(
      position => {
        const coordinate = _that.state.coordinate;
        const coordinateCurrent = _that.state.coordinateCurrent;
        const departCoordinate = _that.state.departCoordinate;

        if (position.coords.latitude) {
          coordinate['lat'] = position.coords.latitude;
          coordinate['long'] = position.coords.longitude;
          coordinateCurrent['latitude'] = position.coords.latitude;
          coordinateCurrent['longitude'] = position.coords.longitude;
          departCoordinate['lat'] = position.coords.latitude;
          departCoordinate['long'] = position.coords.longitude;
        }
        this.setState({
          region: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          },
          coordinateCurrent: coordinateCurrent,
          departCoordinate: departCoordinate,
          coordinate: coordinate,
        });
      },
      error => {
        if (error.code === 2) {
          alert(i18n.t('turnOnGps'));
        }
      },
      // {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );

    this.watchID = Geolocation.watchPosition(position => {
      const newRegion = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      };

      this.onRegionChange(newRegion);
    });
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
          _that.watchID = Geolocation.getCurrentPosition(
            position => {
              const coordinate = _that.state.coordinate;
              const coordinateCurrent = _that.state.coordinateCurrent;
              const departCoordinate = _that.state.departCoordinate;

              if (position.coords.latitude) {
                coordinate['lat'] = position.coords.latitude;
                coordinate['long'] = position.coords.longitude;
                coordinateCurrent['latitude'] = position.coords.latitude;
                coordinateCurrent['longitude'] = position.coords.longitude;
                departCoordinate['lat'] = position.coords.latitude;
                departCoordinate['long'] = position.coords.longitude;
              }
              _that.setState({
                coordinateCurrent: coordinateCurrent,
                departCoordinate: departCoordinate,
              });
              // AsyncStorage.getItem("TOKEN").then((value) => {
              //   _that.setState({token: value})
              //   _that.props.getLocations(value, coordinate)
              // })
              // .then(res => {
              // });
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
    if (Platform.OS === 'android') {
      requestLocationPermission();
    } else {
    }
  }

  getCoordinatesIos() {
    Geolocation.getCurrentPosition(
      position => {
        this.setState({
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
        });
      },
      error => {
        if (error.code === 2) {
          alert(i18n.t('turnOnGps'));
        }
      },
      // {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }

  render() {
    const screenWidth = Math.round(Dimensions.get('window').width);
    return (
      <View style={{flex: 1}}>
        <View style={{alignItems: 'center', paddingTop: 10}}>
          <Text style={{fontSize: getAdjustedFontSize(18), color: '#707070'}}>
            {i18n.t('service.step')} 3
          </Text>
          <Text
            style={{
              fontSize: getAdjustedFontSize(22),
              color: '#285DB3',
              fontWeight: '600',
            }}>
            {i18n.t('service.serviceLocation')}
          </Text>
        </View>
        <View style={{flex: 1}}>
          {this.state.region.latitude ? (
            <MapView
              showsMyLocationButton={true}
              style={{width: '100%', height: '100%'}}
              region={this.state.region}
              onRegionChangeComplete={this.onRegionChange}
            />
          ) : (
            this.getCoordinatesIos()
          )}
          <View
            style={{
              left: '50%',
              marginLeft: -24,
              marginTop: -48,
              position: 'absolute',
              top: '50%',
            }}>
            <Image
              source={require('../../assets/images/mapMarker.svg')}
              style={{}}
            />
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            width: '100%',
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#23BDE4',
          }}
          onPress={() => {
            this.props.onNextPress({region: this.state.region});
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
      </View>
    );
  }
}
