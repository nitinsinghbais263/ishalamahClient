import React, {Component} from 'react';
import {Text, View, StatusBar, TouchableOpacity, BackHandler, I18nManager} from 'react-native';
import styles from './style';
import i18n from '../../../lang/i18n';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../../components/Header';
import RNRestart from 'react-native-restart';
import { Dropdown } from 'react-native-material-dropdown';
import {getAdjustedFontSize} from '../../responsive/responsive';

export default class Settings extends Component {
	constructor(props){
		super(props);
		this.state={
      language: '',
			languageData: [
        {
          value: 'English'
        },
        {
          value: i18n.t('setting.arabic')
        }
      ]
		}
	}


	componentDidMount() {
		BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
	}

	handleBackPress = () =>{
		this.props.navigation.goBack()
		return true;
	}

	componentWillUnmount = () => {
		BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
	}

  handleChange = (value) => {
    if (value === "English") {
      this.selectEN()
    } else {
      this.selectAR()
    }
  }

  selectEN = () => {
   
    this.setState({
      checkedEN: true,
      checkedAR: false
    })
    AsyncStorage.setItem('language', 'en');
    i18n.locale = 'en'
    if (I18nManager.isRTL) {
      setTimeout(()=>{
          RNRestart.Restart();
      }, 1000);

    }
    I18nManager.forceRTL(false);
  }

  selectAR = () => {
     
    this.setState({
      checkedEN: false,
      checkedAR: true
    })
    AsyncStorage.setItem('language', 'ar');
    i18n.locale = 'ar'
    if (!I18nManager.isRTL) {
      setTimeout(()=>{
          RNRestart.Restart();
      }, 1000);
    }
    I18nManager.forceRTL(true);
  }

	componentWillMount(){
		AsyncStorage.getItem('language').then( (value) => {
      this.setState({language: value})
    });
	}

	render(){
		return(
			<View style={{flex:1}}>
        <Header navigation={this.props.navigation} />
      	<StatusBar backgroundColor="#2383c3" barStyle="light-content" />

				<View style={{padding: 10,flexDirection: 'row'}}>
					<Text style={{color: '#6C6C6C',fontSize: getAdjustedFontSize(20)}}>{i18n.t('setting.language')}</Text>
				</View>
				<View style={{height: 50, width: '100%', paddingHorizontal:10, marginTop: 10, backgroundColor: '#F8F8F8', justifyContent: 'center',flexDirection: 'row'}}>
					<Dropdown
            label=''
            data={this.state.languageData}
            value={ i18n.locale === 'en' ? this.state.languageData[0].value : this.state.languageData[1].value}
            labelHeight={ 0 }
            dropdownOffset={{top: 0, left: 0}}
            fontSize={15}
            labelFontSize={15}
            textColor={'#707070'}
            itemColor={'#707070'}
            rippleInsets={{top: -5, bottom: 0, right: 0, left: 0}}
            containerStyle={{height: 40, width: '100%', backgroundColor: '#F8F8F8', marginTop:10, justifyContent:'center'}}
            inputContainerStyle={{borderBottomWidth: 0 }}
            onChangeText={(value)=> this.handleChange(value)}
          />
				</View>
			</View>
		)
	}
}
