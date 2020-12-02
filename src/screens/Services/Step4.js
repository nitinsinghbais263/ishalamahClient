import React, { Component } from 'react';
import { View, Text, TextInput, Image, Button, TouchableOpacity, SafeAreaView, FlatList, ScrollView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getAdjustedFontSize} from '../../responsive/responsive';
import i18n from '../../../lang/i18n'

class Step4 extends Component {
  constructor(props) {
    super(props);
    this.state={
      reportFileds: [],
      key: 0
    }
  }

  state = {
    token: ""
  };

  componentDidMount() {
    AsyncStorage.getItem('language').then( (value) => {
      this.setState({language: value})
    });
    const { step4 } = this.props;
    if(step4.reportFileds){
      this.setState({reportFileds: step4.reportFileds})
    }else{
      this.getData()
    }
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
          label: this.state.language === 'ar' ? item.label_ar : item.label
        })
      })

      this.setState({
        reportFileds: data
      })
    }

    if(nextProps.cost && nextProps.cost.status == 'success') {

      this.setState({cost: nextProps.cost.cost})

      this.props.onNextPress({reportFileds: this.state.reportFileds, cost: nextProps.cost.cost})
    }

    // if(nextProps.costError) {
    //   this.props.onNextPress({reportFileds: this.state.reportFileds})
    // }
    // if(nextProps && nextProps.cost.status === "fail") {
    //   this.props.onNextPress({reportFileds: this.state.reportFileds})
    // }
    // if(nextProps && nextProps.data.status ==="success") {
    //   // this.props.navigation.navigate("Purchase")
    //   this.props.onNextPress()
    //   }


  }

  _handleChangeInput(uuid, count){
debugger
    var item = '0';
    var reportFileds = this.state.reportFileds;

    for(let i in reportFileds){
    if(reportFileds[i].uuid===uuid){

        if(count.length === 0 ){
          reportFileds[i].count = "0"
        } else if(reportFileds[i].count === "0" && item.slice(0) === "0"){
          reportFileds[i].count = count.slice(1)
        } else {
          reportFileds[i].count = count.toString();
        }


        this.setState({reportFileds, key: this.state.key + 1})
      }
    }
    this.setState({itemCount: item})
  }

  _handleOnClick(uuid, type){
debugger
    var reportFileds = this.state.reportFileds;
    var data;
    for(let i in reportFileds){
      debugger
      if(reportFileds[i].uuid===uuid){
debugger
        if(type==='inc'){
          debugger
          data = parseInt(reportFileds[i].count)+1;
          reportFileds[i].count = data.toString();
        }
        if(type==='des'){
          if(reportFileds[i].count!=='0'){
            debugger
            data = parseInt(reportFileds[i].count)-1;
            reportFileds[i].count = data.toString();
          }
        }
      }
      this.setState({reportFileds, key: this.state.key + 1})
    }

  }

  onSubmit = () =>{
    debugger
    // AsyncStorage.getItem('TOKEN').then((value) => {
    //   this.setState({token: value})
    //   this.props.getCostEstimation(this,{
    //       token: this.state.token,
    //       reportFileds: this.state.reportFileds,
    //       serviceCity: this.props.city
    //     })
    // })
    this.props.onNextPress({reportFileds: this.state.reportFileds})
  }

  render() {
    const screenWidth = Math.round(Dimensions.get('window').width);
    var data = []
    data = this.state.reportFileds
    console.log(data)
    return (
      <View style={{flex:1}}>

      <KeyboardAwareFlatList
         extraData={this.state.key}
         data={data}
         showsVerticalScrollIndicator={false}
         ListHeaderComponent = {
           <View style={{alignItems: 'center', paddingTop:10}}>
             <Text style={{fontSize: getAdjustedFontSize(18), color: '#707070'}}>{i18n.t('service.step')} 5</Text>
             <Text style={{fontSize: getAdjustedFontSize(22), color: '#285DB3', fontWeight: '600',  }}>{i18n.t('service.serviceSystems')}</Text>
           </View>
         }
         renderItem={ ({item: rowData}) =>{
           return (
             <View style={{width: '100%', height: 50, paddingRight: 20, paddingLeft: 10, marginBottom: 30, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                 <View>
                   <Text style={{fontSize: getAdjustedFontSize(15), fontFamily: "SegoeUI", color: '#707070'}}>{rowData.label}:</Text>
                 </View>

                 <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>

                   <View style={{width: 25, height: 25, marginRight: 20}}>
                     <TouchableOpacity style={{width: 25, height: 25, marginRight: 20}} onPress={()=> this._handleOnClick(rowData.uuid, 'des')}>
                       <View style={{height: 25, width: 25}}>
                         <Image style={{ width: '100%', height: '100%'}} source={require('../../assets/images/Dec.svg')} />
                       </View>
                     </TouchableOpacity>
                   </View>

                     <TextInput style={{ width: 70, height: 30, fontSize: getAdjustedFontSize(16), paddingTop: 0,paddingBottom: 0, textAlign: 'center',borderBottomColor: '#F8F8F8', backgroundColor: '#F8F8F8' }}
                       keyboardType="decimal-pad"
                       placeholder="0"
                       value={rowData.count}
                       underlineColorAndroid='transparent'
                       onChangeText={(count) => this._handleChangeInput(rowData.uuid, count)}
                     />

                   <View style={{width: 25, height: 25, marginLeft: 10}}>
                     <TouchableOpacity activeOpacity={1} style={{width: 25, height: 25, marginLeft: 10}} onPress={()=>this._handleOnClick(rowData.uuid, 'inc')}>
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

     <TouchableOpacity activeOpacity={0.8} style={{ width: '100%', height: 50, alignItems:'center', justifyContent:'center', backgroundColor: '#23BDE4' }} onPress={() => this.onSubmit()}>
       <Text style={{ color: '#ffffff', fontSize: getAdjustedFontSize(18), alignSelf: 'center', padding: 10 }}>{i18n.t('service.continue')}</Text>
     </TouchableOpacity>
     <SafeAreaView style={{backgroundColor: '#23BDE4'}} />
      </View>

    )
  }
};

function mapStateToProps(state) {

  return {
    success: state.success ,
    error: state.error,
    message: state.message,
    reportFileds: state.service.reportFileds,
    cost: state.service.cost,
    serverError: state.service.serverError
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Step4);
