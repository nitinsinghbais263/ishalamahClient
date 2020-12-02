import React, {Component} from 'react';
import {ScrollView, Text, View, Image, ImageBackground, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity,Dimensions } from 'react-native';
import i18n from '../../lang/i18n';
import {NavigationActions} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
import PropTypes from 'prop-types';
import { DrawerActions } from 'react-navigation';
import Modal from 'react-native-modal';
import styles from './style';
import settingStyle from './settingStyle';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getAdjustedFontSize} from '../responsive/responsive';


class Drawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleModal: null,
    };
  }

  state = {
    token: "",
    fullname: "",
    uuid: "",
    image: '',
    cart: '',
    invoice: ''
  };

  componentWillMount() {
    // get language
    AsyncStorage.getItem('language').then( (value) => {
      this.setState({language: value})
    });

    this.getData()
    this.getDrawerData()
  }

  getData = () =>{
    AsyncStorage.getItem('TOKEN').then((value) => {
      this.setState({token: value})
      this.props.getUserDetails(this,{
          token: this.state.token,
        })
    })
  }

  getDrawerData =() =>{
  AsyncStorage.getItem('TOKEN').then((value) => {
    this.setState({token: value})
    this.props.getDrawerData(this,{
        token: this.state.token
    })
  })
}

  componentDidUpdate(nextProps){
    // this.getDrawerData();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data) {
      var uuidId = nextProps.data.uuid
      lastChar = uuidId.substr(uuidId.length - 5);
      this.setState({
        fullname: nextProps.data.full_name,
        uuid: lastChar,
        image: nextProps.data.profile_image,

      })
    }

    if(nextProps.drawer) {
      this.setState({
        cart: nextProps.drawer.cart_item_count,
        invoice: nextProps.drawer.unpaid_invoice_count,
      })
    }
  }

  onPress = () => {
    this.setState({ visibleModal: null })
    this.props.navigation.navigate('Splash');
  }

  editUser = () => {
    this.setState({ visibleModal: null })
    this.props.navigation.navigate('UserProfile');
  }

  handleLogout =  () => {
    this.setState({modalVisible: true});
  }

  logout= ()=>{
     AsyncStorage.removeItem('USER_UUID');
     AsyncStorage.removeItem('TOKEN', (err) => {
       this.setState({ visibleModal: null })
       this.props.navigation.replace('Login')
     });
   }

  _renderModalContent = (props) => {
    const data = this.props.data
    const that = this
    return (

      <View style={{...styles.Maincontainer, backgroundColor: '#2383C3',width: '75%', paddingTop: 30 }}>
        <TouchableOpacity style={{ width: '100%', flexDirection: 'row',}} onPress={this.editUser}>
          <View style={styles.headerContainer}>
            <View style={styles.imageView}>
              <Image style={{ width: '100%', height: '100%', resizeMode: 'cover'}} source={this.props.data && this.props.data.profile_image ? {uri: 'https://core.isalamah.com/public/'+this.props.data.profile_image } : require('../assets/images/user-2.svg')} />
            </View>
            <View  style={{paddingTop:15}}>
              <Text style={{fontSize: getAdjustedFontSize(16), color: '#ffffff' ,textAlign: 'left'}}>{i18n.t('drawer.account')} # {this.state.uuid}</Text>
              <Text style={[styles.name, {textAlign:"left"}]}>{this.state.fullname}</Text>
            </View>

          </View>
        </TouchableOpacity>
        <View style={styles.bodyContainer}>

          <View style={{ width: '100%', flexDirection: 'row',  marginBottom: 20}}>
          <TouchableOpacity style={{ width: '100%', flexDirection: 'row',}} onPress={() => {
           this.setState({ visibleModal: null })
           this.props.navigation.navigate('Dashboard]')
         }
         }>
            <View style={{ height: 25, width: 25, marginRight: 20  }}>
              <Image style={{ width: '100%', height: '100%', resizeMode: 'contain'}} source={require('../assets/images/Dashboard.svg')} />
            </View>
            <Text style={{ fontSize: getAdjustedFontSize(20), color: '#ffffff', textAlign: 'center'}}>{i18n.t('drawer.dashboard')}</Text>
          </TouchableOpacity>
          </View>

          <View style={{ width: '100%', flexDirection: 'row', marginBottom: 20, backgroundColor: 'transparent'}}>
            <TouchableOpacity style={{ width: '100%', flexDirection: 'row',}} onPress={() => {
             this.setState({ visibleModal: null })
             this.props.navigation.navigate('Cart')
           }
           }>
              <View style={{ height: 25, width: 25, marginRight: 20 }}>
                <Image style={{ width: '100%', height: '100%', resizeMode: 'contain'}} source={require('../assets/images/Cart.svg')} />
              </View>
              <Text style={{ fontSize: getAdjustedFontSize(20), color: '#ffffff', textAlign: 'center'}}>{i18n.t('drawer.cart')}</Text>
            </TouchableOpacity>
            <Badge numberOfLines={1} value={this.state.cart+" item(s)"} status="warning" containerStyle={{ backgroundColor: 'transparent',position: 'absolute', top: 4, right: 5 }} badgeStyle={{Minwidth: 70, height: 25, borderRadius: 50, overFlow: 'hidden', alignItems: 'center', borderColor:'transparent',}}  />
          </View>

          <View style={{ width: '100%', flexDirection: 'row', marginBottom: 20, backgroundColor: 'transparent'}}>
            <TouchableOpacity style={{ width: '100%', flexDirection: 'row',}}
             onPress={() => {
              this.setState({ visibleModal: null })
              this.props.navigation.navigate('InvoicesList')
            }
            }>

              <View style={{ height: 25, width: 25, marginRight: 20  }}>
                <Image style={{ width: '100%', height: '100%', resizeMode: 'contain'}} source={require('../assets/images/Invoices.svg')} />
              </View>
              <Text style={{ fontSize: getAdjustedFontSize(20), color: '#ffffff', textAlign: 'center'}}>{i18n.t('drawer.invoices')}</Text>
            </TouchableOpacity>
            <Badge numberOfLines={1} value={this.state.invoice+" Unpaid"} status="error" containerStyle={{backgroundColor: 'transparent', position: 'absolute', top: 4, right: 5 }} badgeStyle={{Minwidth: 70, height: 25, borderRadius: 50, overFlow: 'hidden', alignItems: 'center', borderColor:'transparent',}} />
          </View>

          <View style={{ width: '100%', flexDirection: 'row', marginBottom: 20}}>
            <TouchableOpacity
              style={{ width: '100%', flexDirection: 'row',}}
              onPress={() => {
               this.setState({ visibleModal: null })
               this.props.navigation.navigate('Settings')
               }
             }
           >
              <View style={{ height: 25, width: 25, marginRight: 20  }}>
                <Image style={{ width: '100%', height: '100%', resizeMode: 'contain'}} source={require('../assets/images/Settings.svg')} />
              </View>
              <Text style={{ fontSize: getAdjustedFontSize(20), color: '#ffffff', textAlign: 'center'}}>{i18n.t('drawer.settings')}</Text>
            </TouchableOpacity>
          </View>

          <View style={{ width: '100%', flexDirection: 'row', marginBottom: 20}}>
            <TouchableOpacity
                style={{ width: '100%', flexDirection: 'row',}}
                onPress={() => {
                 this.setState({ visibleModal: null })
                 this.props.navigation.navigate('About')
                 }
               }
            >
              <View style={{ height: 25, width: 25, marginRight: 20  }}>
                <Image style={{ width: '100%', height: '100%', resizeMode: 'contain'}} source={require('../assets/images/About.svg')} />
              </View>
              <Text style={{ fontSize: getAdjustedFontSize(20), color: '#ffffff', textAlign: 'center'}}>{i18n.t('drawer.aboutApp')}</Text>
            </TouchableOpacity>
          </View>

        </View>

        <View style={styles.footerContainer}>
          <View style={{ height: 25, width: 25, marginRight: 20  }}>
            <Image style={{ width: '100%', height: '100%', resizeMode: 'contain'}} source={require('../assets/images/Logout.svg')} />
          </View>
          <TouchableOpacity onPress={()=>{
              this.setState({visibleModal: false},()=>{setTimeout(() => {
              this.setState({modalVisible: true })
            }, 1000)});
          }} activeOpacity={0.8}>
            <Text style={{ fontSize: getAdjustedFontSize(20), color: '#ffffff', textAlign: 'center'}}>{i18n.t('drawer.logout')}</Text>
          </TouchableOpacity>
        </View>
      </View>

)};

  render() {

    return (

      <SafeAreaView style={{backgroundColor:'#2383C3'}}>
      <StatusBar backgroundColor="#2383C3" barStyle="light-content" />
      <View style={{ flexDirection: 'row', width: '100%', height: 60, backgroundColor: '#2383C3' }}>
        <TouchableOpacity style={{position: 'absolute', left: 0, top: 20}} onPress={() => {
          this.setState({visibleModal: 1});
          this.getDrawerData();
        }}>
          <Image style={{ width: 25, height: 25, marginLeft: 10 }} source={require('../assets/images/Drawer.svg')}/>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', position: 'absolute', right: 0, top: 5 }}>
          <View style={{paddingTop:10}}>
            <Text style={{fontSize: 12, color: '#ffffff', marginRight: 10}}>{i18n.t('drawer.account')} # {this.state.uuid}</Text>
            <Text style={{fontSize: 16, color: '#ffffff', marginRight: 10,  }}>{this.state.fullname}</Text>
          </View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('UserProfile')}>
            <View style={{height: 50, width: 50, borderRadius: 50 / 2, borderWidth: 2.5, borderColor: '#ffffff', marginRight: 10, marginBottom: 10, overflow: 'hidden' }}>
              <Image style={{ width: '100%', height: '100%', resizeMode: 'cover'}} source={this.props.data && this.props.data.profile_image ? {uri: 'https://core.isalamah.com/public/'+this.props.data.profile_image } : require('../assets/images/user-2.svg')}  />
            </View>
          </TouchableOpacity>
        </View>
        <Modal
          animationIn={"fadeIn"}
          animationOut={'fadeOut'}
          onBackdropPress={()=>{this.setState({modalVisible: false})}}
          isVisible={this.state.modalVisible}
        >
          <View style={styles.popUp}>
            <View style={styles.messageView}>
              <Text style={styles.logoutMessage}>
              {i18n.t('logoutMessage')}
              </Text>
            </View>
            <View style={styles.buttonView}>
              <TouchableOpacity
                style={styles.yesButton}
                activeOpacity={0.8}
                onPress={()=>{this.setState({modalVisible:false});this.logout()}}
              >
                <Text style={styles.textStyle}>
                {i18n.t('yes')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.noButton}
                activeOpacity={0.8}
                onPress={()=>{this.setState({modalVisible: false})}}
              >
              <Text style={styles.textStyle}>
              {i18n.t('no')}
              </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

        <Modal
          style={style.modalContainer}
          isVisible={this.state.visibleModal === 1}
          animationIn={ this.state.language == 'ar' ? 'slideInRight': 'slideInLeft' }
          animationOut={this.state.language == 'ar' ? 'slideOutRight': 'slideOutLeft'}
        >

          {this._renderModalContent()}

          <TouchableOpacity
            style={style.sidecontainer  }
            activeOpacity={1}
            onPressOut={() => this.setState({ visibleModal: null })}
          />
        </Modal>

</SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    success: state.success,
    error: state.error,
    message: state.message,
    data: state.user.data,
    drawer: state.user.drawer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Drawer);

const style = StyleSheet.create({
  sidecontainer: {
    width:'25%',
    height: '100%',
  },
  modalContainer: {
   flexDirection: 'row',
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 0,
  },
});
