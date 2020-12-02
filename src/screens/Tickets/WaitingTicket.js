import React, { Component } from 'react'
import { View, Image, FlatList, Text, ScrollView, StyleSheet, BackHandler, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native'
import i18n from '../../../lang/i18n'
import { withNavigation } from 'react-navigation';
import StarRating from 'react-native-star-rating';
import Header from '../../components/Header'
import AsyncStorage from '@react-native-community/async-storage'
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class WaitingTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 3.5,
      notes: []
    };
  }

  componentDidMount() {
    const { uuid } = this.props;
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    // AsyncStorage.getItem('TOKEN').then((value) => {
    //   this.setState({token: value})
    // }, () => this.props.viewTicketDetail(uuid))
  }

  handleBackPress = () =>{
    this.props.navigation.navigate("TicketsList")
    return true;
  }

  componentWillUnmount = () => {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  componentWillReceiveProps(nextProps){

    if(nextProps.userdata) {
      this.setState({
        fullname: nextProps.userdata.full_name,
        uuid: nextProps.userdata && nextProps.userdata.uuid.substr(nextProps.userdata.uuid.length - 5),
        image: nextProps.userdata.profile_image
      })
    }

    // if(nextProps.notes){
    //   this.setState({notes: nextProps.notes})
    // }
  }

  render() {
    var ticket = this.props.navigation.state.params.data;
    return (
      <View style={{flex: 1}}>
        <SafeAreaView style={{backgroundColor:'#2383C3'}}>
        <StatusBar backgroundColor="#2383C3" barStyle="light-content" />
        <View style={{ flexDirection: 'row', width: '100%', height: 60, backgroundColor: '#2383C3' }}>
          <TouchableOpacity style={{position: 'absolute', left: 0, top: 20}} onPress={() => this.props.navigation.navigate("TicketsList")}>
            <Image style={{ width: 25, height: 25, marginLeft: 4, transform: [{ rotate: this.state.language == 'ar' ? '180deg' : '0deg' }] }} source={require('../../assets/images/back.svg')}/>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', position: 'absolute', right: 0, top: 5 }}>
            <View style={{paddingTop:10}}>
              <Text style={{fontSize: 12, color: '#ffffff', marginRight: 10}}>{i18n.t('drawer.account')} # {ticket && ticket.client_uuid.substr(ticket.client_uuid.length - 5)}</Text>
              <Text style={{fontSize: 16, color: '#ffffff', marginRight: 10}}>{ticket && ticket.client_name}</Text>
            </View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('UserProfile')}>
              <View style={{height: 50, width: 50, borderRadius: 50 / 2, borderWidth: 2.5, borderColor: '#ffffff', marginRight: 10, marginBottom: 10, overflow: 'hidden' }}>
                <Image style={{ width: '100%', height: '100%'}} source={this.props.userdata && this.props.userdata.profile_image ? {uri: 'https://core.isalamah.com/public/'+this.props.userdata.profile_image } : require('../../assets/images/user-2.svg')} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        </SafeAreaView>

        <ScrollView>
{/*Agent
          <View style={{width: '100%', height: 130, backgroundColor:'#F8F8F8'}}>
            <View style={{ width: '100%', height: 80, marginTop: 40}}>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: '#707070', textAlign: 'center'}}>How do you rate the service?</Text>
              <StarRating
                disabled={false}
                containerStyle={{width: '60%',paddingTop: 10,alignSelf: 'center'}}
                buttonStyle={{margin: 3, alignSelf: 'center',}}
                maxStars={5}
                rating={this.state.starCount}
                halfStarEnabled={true}
                emptyStarColor='#CECECE'
                fullStarColor='#F2C014'
                selectedStar={(rating) => this.onStarRatingPress(rating)}
              />
            </View>
          </View>
*/}
{/*Details*/}
          <View style={{width: '100%', backgroundColor:'#F8F8F8',flexDirection: 'row'}}>
            <Text style={{fontSize: 18, fontWeight:'400', color: '#707070', margin: 10}}>{i18n.t('ticket.details')}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={{ padding: 10, backgroundColor:'#ffffff'}}>
              <Text style={{fontSize: 14, fontWeight:'bold', color: '#707070'}}>{ticket && ticket.subject}</Text>
              <Text style={{fontSize: 14, color: '#707070', marginTop: 15, marginBottom: 15}}>{ticket && ticket.content}</Text>
            </View>
          </View>
{/*Notes*/}
      <View style={{marginBottom: 50}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 18, fontWeight:'400', color: '#707070', margin: 10, marginBottom:10}}>{i18n.t('ticket.notes')}</Text>
        </View>
        {
          ticket && ticket.notes ? <FlatList
            style={{padding:5}}
            data={ticket.notes}
            ItemSeparatorComponent={() => {
              return (
                <View style={{marginBottom: 20}}/>
              )
            }}
            renderItem={ ({item: rowData}) =>{

              return (
                <View style={styles2.card}>
                  <View style={styles2.cardHeader}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={{  fontSize: 14, fontWeight: 'bold', color:'#6C6C6C',  }}>{rowData.by_name}</Text>
                      <Text style={{fontSize:12, color: '#6C6C6C'}}>{rowData.created_at}</Text>
                    </View>
                    <View>
                      <Text style={{ color:'#888', marginTop: 20, fontSize: 14, alignSelf: 'flex-start'}}>{rowData.content}</Text>
                   </View>
                   <View style={{width: '100%', marginBottom: 10, flexDirection: 'row', flexWrap: 'wrap', padding: 5}}>
                     {
                       rowData.ticket_notes_attachments && rowData.ticket_notes_attachments.map((image) => {

                           return(
                             <View style={{width: 51, height: 51, margin: 5, borderRadius: 7, overflow: 'hidden'}}>
                               <Image source={{uri: 'https://core.isalamah.com/public/'+image.path }}
                                      style={{width:'100%', height: '100%', resizeMode:'cover',}}
                               />
                             </View>
                           )
                       })
                    }
                   </View>
                  </View>
                </View>
              )
            }}/>
          :
            <View style={{ width: '100%', height: 150, marginBottom: 50,alignItems:'center', justifyContent: 'center'}}>
              <Text style= {{fontSize: 18, fontWeight: 'bold', color: '#D4D4D4', textAlign: 'center'}}>{i18n.t('ticket.noNotesFound')}</Text>
            </View>  }

      </View>
          </ScrollView>
          <TouchableOpacity activeOpacity={1} style={{ width: '100%', height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',  backgroundColor: '#23BDE4' }} onPress={() => this.props.navigation.navigate('Notes', {ticket: ticket.uuid})}>
            <View style={{height: 20, width: 20 }}>
              <Image style={{ width: '100%', height: '100%', resizeMode: 'contain'}} source={require('../../assets/images/Add.svg')} />
            </View>
            <Text style={{ color: '#ffffff', fontSize: 18,fontWeight:'bold', alignSelf: 'center', padding: 10 }}>{i18n.t('ticket.addNote')}</Text>
          </TouchableOpacity>
          <SafeAreaView style={{backgroundColor: '#23BDE4'}} />
      </View>
    );
  }
}

function mapStateToProps(state) {

  return {
    // success: state.success ,
    // error: state.error,
    // message: state.message,
    // ticketDetail: state.tickets.ticketDetail,
    // notes: state.notes.notes,
    userdata: state.user.data,
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(WaitingTicket);

const styles2 = StyleSheet.create({
  container:{
    height: '100%',
    marginBottom: 50
  },
  list: {
    padding:5,


  },
  separator: {
    marginRight: 15,

  },
  /******** card **************/
  card:{
    flex:1,
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor:'#ffffff'
  },
  cardHeader: {
    width: '100%',
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
  },


  /******** card components **************/
  title:{
    fontSize:18,
    color: '#285DB3',
    position:'absolute',
    right: 30
  },
  description:{
    fontSize:11,
    color:"#888",
    marginTop:5
  },
  newprice:{
    fontSize:24,
    color: "#808080",
    fontWeight: "600",
  },
  discount:{
    fontSize:14,
    color: "#808080",
    marginTop: 10,
    marginLeft: 5
  },
  timeContainer:{
    marginBottom:5,
    flexDirection:'row'
  },

});
