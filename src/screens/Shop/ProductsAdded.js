import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import i18n from '../../../lang/i18n';
import AsyncStorage from '@react-native-community/async-storage';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class ProductsAdded extends Component {
  constructor(props) {
    super(props);
    this.state = {text: 'Search', data: [], total: ''};
  }

  state = {
    token: '',
    data: [],
    total: '',
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    AsyncStorage.getItem('TOKEN').then(value => {
      this.setState({token: value});
      this.props.getItemTotal(this, {
        token: this.state.token,
      });
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.total) {
      this.setState({
        item: nextProps.total.total_items,
        total: nextProps.total.total
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
      });
    } else if (nextProps.data) {
      this.setState({
        item: nextProps.data[0].total_items,
        total: nextProps.data[0].total
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
      });
    }
  }

  render() {
    return (
      <View style={{}}>
        <View
          style={{width: '100%', height: 40, padding: 10, marginBottom: 10}}>
          <View
            style={{
              width: '100%',
              height: 40,
              flexDirection: 'row',
              backgroundColor: '#FFFFFF',
              borderRadius: 50,
            }}>
            <TextInput
              style={{
                backgroundColor: '#FFFFFF',
                width: '80%',
                height: 40,
                paddingLeft: 10,
                fontSize: 16,
                borderRadius: 50,
                borderBottomColor: '#F8F8F8',
                textAlign: i18n.locale === 'ar' ? 'right' : 'left',
              }}
              placeholder={i18n.t('shop.search')}
              keyboardType="email-address"
              underlineColorAndroid="transparent"
              onChangeText={search => this.props.onSearch(search)}
            />
            <View
              style={{
                height: 20,
                width: 20,
                position: 'absolute',
                right: 20,
                top: 10,
              }}>
              <Image
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'contain',
                  transform: [
                    {rotate: i18n.locale === 'ar' ? '90deg' : '0deg'},
                  ],
                }}
                source={require('../../assets/images/Search.svg')}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            height: 30,
            alignItems: 'flex-end',
            paddingTop: 10,
            paddingHorizontal: 10,
            marginBottom: 10,
          }}>
          <TouchableOpacity
            style={{
              height: 30,
              borderRadius: 50,
              padding: 5,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              backgroundColor: '#E7F5F9',
            }}
            onPress={() => this.props.navigation.navigate('Cart')}>
            <View
              style={{
                height: 30,
                borderRadius: 50,
                padding: 5,
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                backgroundColor: '#E7F5F9',
              }}>
              <View
                style={{
                  height: 20,
                  width: 20,
                  marginLeft: 10,
                  marginRight: 10,
                }}>
                <Image
                  style={{width: '100%', height: '100%'}}
                  source={require('../../assets/images/Cart2.svg')}
                />
              </View>
              <Text style={{fontSize: 12, color: '#707070'}}>
                {this.state.item && this.state.item} item(s)
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: '#707070',
                  marginLeft: 10,
                  marginRight: 10,
                }}>
                {this.state.total && this.state.total} SR
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    success: state.success,
    error: state.error,
    message: state.message,
    data: state.cart.data,
    removedItems: state.cart.removedItems,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductsAdded);
