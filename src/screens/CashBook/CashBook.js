import React, { Component } from 'react'
import { View, Image, Text, TextInput, FlatList, StyleSheet, ScrollView, SafeAreaView, StatusBar, TouchableOpacity, BackHandler } from 'react-native'
import i18n from '../../../lang/i18n'
import { withNavigation } from 'react-navigation';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-community/async-storage';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getAdjustedFontSize} from '../../responsive/responsive';
import DataLoader from "../../components/DataLoader";
import { Bounce } from 'react-native-animated-spinkit'

class CashBook extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    token: "",
    search: "",
    data: [],
    loader: false
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
    this.setState({loader: true})
    AsyncStorage.getItem('TOKEN').then((value) => {
      this.setState({token: value})
      this.props.getCashBook(this,{
          token: this.state.token,
        })
    })
  }

  onSearch = (search) =>{
    if(search.length > 3){
    this.setState({search: search},()=>{
      this.props.getCashBook(this,{
        token: this.state.token,
        search: search
     })})
   } else{
     this.setState({search: ""}, ()=>{
       this.props.getCashBook(this,{
         token: this.state.token,
         search: this.state.search
     })})
   }
  }

  componentWillReceiveProps(nextProps) {

    if(nextProps.data) {
      this.setState({
        data:  nextProps.data.cash_book.data,
        loader: false
      })
    }

    if(nextProps.serverError){
      
      this.setState({loader: false})
    }
  }

  render() {
    return (

      <View style={{flex: 1}}>
        <Header navigation={this.props.navigation} />
        <ScrollView style={{ marginBottom: 5}}>
        <View style= {{width: '100%', height: 40, padding: 10, marginBottom: 10}}>
          <View style= {{width: '100%', height: 40,flexDirection: 'row', backgroundColor: '#F8F8F8', borderRadius: 50}}>
            <TextInput style={{ backgroundColor: '#F8F8F8', width: '80%', height: 40, paddingLeft: 10, fontSize: getAdjustedFontSize(16), borderRadius: 50, borderBottomColor: '#F8F8F8',textAlign: i18n.locale==='ar'? 'right' : 'left' }}
                placeholder={i18n.t('ticket.search')}
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={(search) => this.onSearch(search)}/>
            <View style={{height: 20, width: 20,  position: 'absolute', right: 20,top: 10}}>
              <Image style={{ width: '100%', height: '100%', resizeMode: 'contain',transform: [{rotate: i18n.locale==='ar'? '90deg' : '0deg'}]}} source={require('../../assets/images/Search.svg')} />
            </View>
          </View>
        </View>
        {
         this.state.loader ?
            <View style={{ width: '100%', height: 400,alignItems:'center', justifyContent: 'center'}}>
              <Bounce
                style={{alignSelf: 'center',alignItems: 'center', justifyContent:'center'}}
                size={48}
                color="#2383C3"
              />
            </View>
          :
          <View>
            {

            this.state.data.length != "0" ?
            <FlatList
            style={styles2.list}
            data={this.state.data}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => {
              return (
                <View style={styles2.separator}/>
              )
            }}
            renderItem={ ({item: rowData}) =>{
              var invoiceId = rowData.uuid
              lastChar = invoiceId.substr(invoiceId.length - 5);
              return (
                <View style={styles2.card}>
                  <View style={styles2.cardHeader}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={{ color:'#9DD10D', fontSize: getAdjustedFontSize(18), alignSelf: 'flex-start'}}>{rowData.technician.technician_detail.full_name}</Text>
                      <Text style={{ color: '#285DB3', fontSize: getAdjustedFontSize(18) }}># {lastChar}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{ color:'#888', marginTop: 10, fontSize: getAdjustedFontSize(22), alignSelf: 'flex-start'}} numberOfLines={1}>
                        {rowData.amount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} SR
                      </Text>
                   </View>
                    <View style={{width: '100%', justifyContent:'space-between', marginTop: 10, flexDirection: 'row'}}>
                      <Text style={{fontSize: getAdjustedFontSize(16), color:"#888"}}>{i18n.t('ticket.createdOn')}:</Text>
                      <Text style={{fontSize: getAdjustedFontSize(16), color:"#888"}}>{rowData.created_at}</Text>
                    </View>
                    <View style={{width: '100%', justifyContent:'space-between',marginTop: 5, flexDirection: 'row'}}>
                      <Text style={{fontSize: getAdjustedFontSize(16), color:"#888"}}>{i18n.t('ticket.paidOn')}:</Text>
                      <Text style={{fontSize: getAdjustedFontSize(16), color:"#888"}}>{rowData.created_at}</Text>
                    </View>
                  </View>
                </View>
              )
            }}/> :
            <View style={{ width: '100%', height: 400,alignItems:'center', justifyContent: 'center'}}>
              <Text style= {{fontSize: getAdjustedFontSize(18), fontWeight: 'bold', color: '#D4D4D4', textAlign: 'center'}}>{i18n.t('dashboard.noCash')}</Text>
            </View>  }
          </View>
        }
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {

  return {
    success: state.success ,
    error: state.error,
    message: state.message,
    data: state.cash.cashbook,
    serverError: state.cash.cashbookServerError
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(CashBook);


const styles2 = StyleSheet.create({
  container:{
    height: '100%',
    marginBottom: 50
  },
  list: {
    marginTop: 10
  },
  separator: {
    marginBottom: 10,
  },
  /******** card **************/
  card:{
    width:'100%',

    padding: 10,
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,

    backgroundColor:'#F8F8F8'
  },
  cardHeader: {
    width: '100%',

    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
  },

  /******** card components **************/
  title:{
    fontSize: getAdjustedFontSize(18),
    color: '#285DB3',
    position:'absolute',
    right: getAdjustedFontSize(10)
  },
  description:{
    fontSize: getAdjustedFontSize(11),
    color:"#888",
    marginTop:5
  },
  newprice:{
    fontSize: getAdjustedFontSize(24),
    color: "#808080",
    fontWeight: "600",
  },
  discount:{
    fontSize: getAdjustedFontSize(14),
    color: "#808080",
    marginTop: 10,
    marginLeft: 5
  },
  timeContainer:{
    marginBottom:5,
    flexDirection:'row'
  },

});
