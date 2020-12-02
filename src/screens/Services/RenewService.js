import React, { Component } from 'react'
import { View, Image, Text, TextInput, FlatList, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, BackHandler } from 'react-native'
import i18n from '../../../lang/i18n'
import { withNavigation } from 'react-navigation';
import Header from '../../components/Header'
import AsyncStorage from '@react-native-community/async-storage';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class RenewService extends Component {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params.uuid;
    this.state={
      reportFileds: [],
      key: 0
    }
  }

  state = {
    token: "",
    uuid: "",
    reportFileds:[]
  };


componentDidMount() {
  this.getData()
  BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
}

handleBackPress = () =>{
  this.props.navigation.goBack()
  return true;
}

componentWillUnmount = () => {
  BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
}


getData = () =>{
  
  AsyncStorage.getItem('TOKEN').then((value) => {
    this.setState({token: value})
    this.props.getReportFields(this,{
        token: this.state.token,
      })
  })
}

componentWillReceiveProps(nextProps) {
  if(nextProps.reportFileds) {
    var data = []

    nextProps.reportFileds.forEach((item)=>{
      data.push({
        uuid: item.uuid,
        count: '0',
        label: item.label
      })
    })

    this.setState({
      reportFileds: data
    })
  }
}

_handleChangeInput(uuid, val){
  var reportFileds = this.state.reportFileds;
  for(let i in reportFileds){
    if(reportFileds[i].uuid===uuid){
      reportFileds[i].count = val;
    }
    this.setState({reportFileds, key: this.state.key + 1})
  }

}

_handleOnClick(uuid, type){
  var reportFileds = this.state.reportFileds;
  var data;
  for(let i in reportFileds){
    if(reportFileds[i].uuid===uuid){

      if(type==='inc'){
        data = parseInt(reportFileds[i].count)+1;
        reportFileds[i].count = data.toString();
      }
      if(type==='des'){
        if(reportFileds[i].count!=='0'){
          data = parseInt(reportFileds[i].count)-1;
          reportFileds[i].count = data.toString();
        }
      }
    }
    this.setState({reportFileds, key: this.state.key + 1})
  }

}


onSubmit(){

  AsyncStorage.getItem('TOKEN').then((value) => {
    this.setState({token: value})
    this.setState({uuid: this.props.navigation.state.params.uuid})
    this.props.renewService(this,{
      token: this.state.token,
      uuid: this.state.uuid,
      reportFileds: this.state.reportFileds,
    })
  })
}


  render() {

    var data = []
    data = this.state.reportFileds
    console.log(data)

    return (
      <View style={{flex: 1,}}>
      <Header navigation={this.props.navigation} />

        <Text style={{fontSize: 22, color: '#285DB3', fontFamily: "SegoeUI", padding:5, paddingTop: 15, paddingBottom: 10}}>Renew Service</Text>

         <FlatList
            extraData={this.state.key}
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={ ({item: rowData}) =>{
              return (
                <View style={{width: '100%', height: 50, paddingRight: 20, paddingLeft: 10, marginBottom: 30, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                    <View>
                      <Text style={{fontSize: 15, fontFamily: "SegoeUI", color: '#707070'}}>{rowData.label}:</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>

                      <View style={{width: 25, height: 25, marginRight: 20}}>
                        <TouchableOpacity style={{width: 25, height: 25, marginRight: 20}} onPress={()=>this._handleOnClick(rowData.uuid, 'des')}>
                          <View style={{height: 25, width: 25}}>
                            <Image style={{ width: '100%', height: '100%'}} source={require('../../assets/images/Dec.svg')} />
                          </View>
                        </TouchableOpacity>
                      </View>

                      <TextInput style={{ width: 70, height: 30, textAlign: 'center', paddingTop: 0,paddingBottom: 0, fontSize: 18, borderBottomColor: '#F8F8F8', backgroundColor: '#F8F8F8' }}
                        keyboardType="email-address"
                        value={rowData.count}
                        underlineColorAndroid='transparent'
                        onChangeText={(count) => this._handleChangeInput(rowData.uuid, count)}
                      />

                      <View style={{width: 25, height: 25, marginLeft: 10}}>
                        <TouchableOpacity style={{width: 25, height: 25, marginLeft: 10}} onPress={()=>this._handleOnClick(rowData.uuid, 'inc')}>
                          <View style={{height: 25, width: 25}}>
                            <Image style={{ width: '100%', height: '100%'}} source={require('../../assets/images/Inc.svg')} />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                </View>
              )
            }}
        />

        <View style={{ width: '100%', height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#23BDE4'}}>
          <TouchableOpacity style={{width: '100%', height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#23BDE4'}} onPress={() => this.onSubmit()}>
            <View style={{height: 20, width: 20, marginRight: 10}}>
              <Image style={{ width: '100%', height: '100%'}} source={require('../../assets/images/Reorder.svg')} />
            </View>
            <Text style={{fontSize:20, fontFamily: "SegoeUI", color:'#ffffff', alignSelf: 'center'}}>Renew</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {

  return {
    success: state.success ,
    error: state.error,
    message: state.message,
    reportFileds: state.service.reportFileds,
    renewService: state.service.renewService
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(RenewService);
