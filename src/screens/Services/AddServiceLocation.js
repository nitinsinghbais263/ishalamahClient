import React, { Component } from 'react'
import { AppRegistry, StyleSheet, View, Text, Image, SafeAreaView, ScrollView, StatusBar,Dimensions, TouchableOpacity, BackHandler } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import i18n from '../../../lang/i18n'
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AddService from "./AddService";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import * as Progress from 'react-native-progress';
import { NavigationActions } from 'react-navigation';
import { getAdjustedFontSize } from '../../responsive/responsive';


class ServiceLocation extends Component {
  constructor () {
    super()
    this.state = {
      currentPage: 0,
      isActiveStep: 0,
      isProgressStep: 0.2,
      step1: {},
      step2: {},
      step3: {},
      step4: {}
    }
  }

  state = {
    token: "",
    fullname: "",
    uuid: "",
    isActiveStep: 1,
    isProgressStep: 0.2,

  };


  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () =>{
    this.onBackPress()
    // this.props.navigation.goBack()
    return true;
  }

  componentWillUnmount = () => {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillReceiveProps (nextProps, nextState) {
    if (nextState.currentPage != this.state.currentPage) {
      if (this.viewPager) {
        this.viewPager.setPage(nextState.currentPage)
      }
    }
  }

  componentWillMount(){
    AsyncStorage.getItem('language').then( (value) => {
      this.setState({language: value})
    });
  }



  render () {
    const screenWidth = Math.round(Dimensions.get('window').width);
    return (
      <View style={styles.container}>
        <SafeAreaView style={{backgroundColor:'#2383C3'}}>
        <StatusBar backgroundColor="#2383C3" barStyle="light-content" />
        <View style={{ flexDirection: 'row', width: '100%', height: 60, backgroundColor: '#2383C3' }}>
          <TouchableOpacity style={{position: 'absolute', left: 0, top: 20}} onPress={() => {this.onBackPress()}}>
            <Image style={{ width: 25, height: 25, marginLeft: 4, transform: [{ rotate: this.state.language == 'ar' ? '180deg' : '0deg' }] }} source={require('../../assets/images/back.svg')}/>
          </TouchableOpacity>
          {/*
          <View style={{ flexDirection: 'row', position: 'absolute', right: 0, top: 5 }}>
            <View style={{paddingTop:10}}>
              <Text style={{fontSize: 12, color: '#ffffff', marginRight: 10}}>Account # {this.state.uuid}</Text>
              <Text style={{fontSize: 16, color: '#ffffff', marginRight: 10,  }}>{this.state.fullname}</Text>
            </View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('UserProfile')}>
              <View style={{height: 50, width: 50, borderRadius: 50 / 2, borderWidth: 2.5, borderColor: '#ffffff', marginRight: 10, marginBottom: 10, overflow: 'hidden' }}>
                <Image style={{ width: '100%', height: '100%'}} source={this.props.data ? {uri: 'https://adbe74a0.ngrok.io/'+this.props.data.profile_image } : require('../../assets/images/user-2.svg')} />
              </View>
            </TouchableOpacity>
          </View>
          */}
        </View>
        </SafeAreaView>
        <View style={styles.progressBarView}>
            <Progress.Bar
              progress={this.state.isProgressStep}
              borderRadius={0}
              color={"#23BDE4"}
              width={screenWidth}
              unfilledColor={"#FFFFFF"}
              borderWidth={0}
              height={8}
            />
        </View>
        {this.state.isActiveStep===5?
            <Step5 onNextPress={this.onNextPress} step1={this.state.step1} step2={this.state.step2} step3={this.state.step3} step4={this.state.step4} navigation={this.props.navigation} />
          :this.state.isActiveStep===4?
            <Step4 onNextPress={this.onNextPress} city={this.state.step2.cityId} step4={this.state.step4} />
          :this.state.isActiveStep===3?
            <Step2 onNextPress={this.onNextPress} step2={this.state.step2} region={this.state.region} />
          :this.state.isActiveStep===2?
            <Step3 onNextPress={this.onNextPress} region={this.state.region} />
          :this.state.isActiveStep===1?
            <Step1 onNextPress={this.onNextPress} step1={this.state.step1} region={this.state.region} />
          :
            <AddService onNextPress={this.onNextPress} navigation={this.props.navigation}/>
        }
      </View>
    )
  }

  onNextPress = position => {

    const that = this
    if(position !== null && this.state.isActiveStep === 0){
      that.setState({
        isProgressStep: that.state.isProgressStep+0.16,
        isActiveStep: that.state.isActiveStep+1
      })
    }
    if (position !== null && this.state.isActiveStep === 1){

      that.setState({
        step1: position,
        isProgressStep: that.state.isProgressStep+0.16,
        isActiveStep: that.state.isActiveStep+1,
        region: position.region
      })
    }
    if (position !== null && this.state.isActiveStep === 2){

      that.setState({
        step3: position,
        isProgressStep: that.state.isProgressStep+0.16,
        isActiveStep: that.state.isActiveStep+1,
        region: position.region
      })
    }
    if (position !== null && this.state.isActiveStep === 3){

      that.setState({
        step2: position,
        isProgressStep: that.state.isProgressStep+0.16,
        isActiveStep: that.state.isActiveStep+1
      })
    }
    if (position !== null && this.state.isActiveStep === 4){

      that.setState({
        step4: position,
        isProgressStep: that.state.isProgressStep+0.16,
        isActiveStep: that.state.isActiveStep+1
      })
    }

    if(this.state.isActiveStep!=5){
    this.setState({
      currentPage: this.state.currentPage+1,
      isProgressStep: that.state.isProgressStep+0.16,

    })
    // this.viewPager.setPage(this.state.currentPage+1)
    } else {
      this.props.navigation.replace('ServicePurchare');
      // this.props.navigation.navigate('Purchase')
    }
  }

  onBackPress = position => {

    if(this.state.isActiveStep!=0){

    this.setState({
      currentPage: this.state.currentPage-1,
      isProgressStep: this.state.isProgressStep-0.16,
      isActiveStep: this.state.isActiveStep-1
    })
    } else {
      this.props.navigation.goBack()
    }
  }

}

function mapStateToProps(state) {
  return {
    success: state.success,
    error: state.error,
    message: state.message,
    data: state.user.data,
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(ServiceLocation);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  stepIndicator: {
    marginVertical: 25
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  stepLabel: {
    fontSize: getAdjustedFontSize(12),
    textAlign: 'center',
    fontWeight: '500',
    color: '#999999'
  },
  stepLabelSelected: {
    fontSize: getAdjustedFontSize(12),
    textAlign: 'center',
    fontWeight: '500',
    color: '#4aae4f'
  }
})
