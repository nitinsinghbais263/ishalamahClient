import React, { Component } from 'react';
import { View, Text, TextInput, Image,Platform,BackHandler, Button,StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import i18n from '../../../lang/i18n'
import { withNavigation } from 'react-navigation';
import RNPickerSelect from 'react-native-picker-select';
import ImagePicker from 'react-native-image-crop-picker';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-community/async-storage'
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};


class NewTicket extends Component {
  constructor(props) {
    super(props);
    this.state= {
      language: '',
      imgSource:[],
      imgData:[],
      avatarSource: null,
      subject: "",
      content: "",
      attachements:[],
      uuids: [{address_label: "N/A", uuid: null}],
      sUuid: "",
      placeholder: {}
    };
  }

  componentDidMount() {
    this.getUuid()
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillMount(){
    AsyncStorage.getItem('language').then( (value) => {
      this.setState({language: value})
    });
  }

  handleBackPress = () =>{
    this.props.navigation.goBack()
    return true;
  }

  componentWillUnmount = () => {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  getUuid = () =>{

    AsyncStorage.getItem('TOKEN').then((value) => {
      this.setState({token: value})
      this.props.getSUuid(this,{
          token: this.state.token,
        })
    })
  }

  onSubmit(){

    const { imgData, sUuid, subject, content, attachements } = this.state;

    let formData = new FormData();
    var image = imgData;

    if(image.path){
      let pathParts = image.path.split('/');
      let photo = {
        uri: image.path,
        type: image.mime,
        name: pathParts[pathParts.length - 1],
       };
       formData.append(`attachments[0]`, photo);
    }else{
      image.forEach((item, index) =>{
        let pathParts = item.path.split('/');
        let photo = {
          uri: item.path,
          type: item.mime,
          name: pathParts[pathParts.length - 1],
        };
        formData.append(`attachments[${index}]`, photo);
      })
    }

    sUuid && formData.append('mcUuid', sUuid);
    formData.append('subject', subject);
    formData.append('content', content);

    AsyncStorage.getItem('TOKEN').then((value) => {
      this.setState({token: value})
      this.props.createTicket(this,{
        formData: formData,
        token: this.state.token
      })
    })
  }

  componentWillReceiveProps(nextProps) {

    if(nextProps.serviceUuid) {
      var { uuids } = this.state;
      nextProps.serviceUuid.forEach((item)=>{
        uuids.push(item)
      })
      this.setState({uuids: uuids})
    }
  }

  onDelete(path){
    let imageSource = this.state.imgSource;

    imageSource = imageSource.filter((item)=>{
      return item !== path
    })
    this.setState({imgSource: imageSource})
  }

  imagePicker(){
    const _that = this;
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      maxFiles: 20,
      multiple: true
    }).then(image => {
      image.map((item, index)=>{
          _that.state.imgSource.push(item.path),
          _that.state.imgData.push(item)
      })

      _that.setState({
        imgSource: _that.state.imgSource,
        imgData: _that.state.imgData
      })
    });
   }

  render() {
    const language = this.state.language;

    return (
      <View style={{flex: 1,}}>
        <Header navigation={this.props.navigation} />
        <ScrollView style={{marginBottom: 50}} bounces={false} showsVerticalScrollIndicator={false}>
          <Text style={{fontSize: 14, alignSelf: 'flex-start', marginTop: 20, marginLeft: 10 }}>{i18n.t('ticket.relatedService')}:</Text>
          <View style={{ backgroundColor: '#F8F8F8', width: '100%', height: 45, justifyContent:'center', paddingLeft: 10, marginTop: 15, fontSize: 16, borderBottomColor: '#F8F8F8' }}>
            <RNPickerSelect
              style={{ alignSelf:'center'}}
              onValueChange={(value) => this.setState({sUuid: value})}
              placeholder={this.state.placeholder}

              value={this.state.sUuid}
              items={this.state.uuids.map((item, index)=>{
                return({label: item.address_label, value: item.uuid})
              })}
            />
          </View>

          <Text style={{fontSize: 14, alignSelf: 'flex-start', marginTop: 20, marginLeft: 10, }}>{i18n.t('ticket.subject')}:</Text>
          <TextInput style={[styles.text, {textAlign: language == "ar" ? 'right' : 'left'}]}
              placeholder={i18n.t('ticket.typeHere')}
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(subject) => this.setState({subject: subject})}/>

          <Text style={{fontSize: 14, alignSelf: 'flex-start', marginTop: 20, marginLeft: 10 }}>{i18n.t('ticket.description')}:</Text>
          <TextInput style={[styles.textArea, {textAlign: language == "ar" ? 'right' : 'left'}]}
              placeholder={i18n.t('ticket.typeHere')}
              keyboardType="email-address"
              multiline = {true}
              numberOfLines = {4}
              underlineColorAndroid='transparent'
              onChangeText={(content) => this.setState({content: content})}/>

          <Text style={{fontSize: 14, alignSelf: 'flex-start', marginTop: 20, marginLeft: 10 }}>{i18n.t('ticket.attatchments')}:</Text>

            <View style={{width: '100%', paddingLeft: 10, marginTop: 10}}>
              <View style={{width: '100%', marginBottom: 10, flexDirection: 'row', flexWrap: 'wrap', padding: 5}}>
                {
                  this.state.imgSource && this.state.imgSource.map((image) => {

                      return(
                        <View style={{width: 72, height: 72, margin: 5, borderRadius: 7, overflow: 'hidden'}}>
                          <Image
                            source={{uri: image}}
                            style={{width:'100%', height: '100%', resizeMode:'cover',}}
                          />
                          <TouchableOpacity onPress={() => this.onDelete(image)} style={{height: 20, width: 20, alignItems: 'center', justifyContent: 'center', borderRadius: 20 / 2, borderWidth: 1, borderColor: '#FFFFFF',backgroundColor: '#FFFFFF', position: "absolute", bottom: 5, right: 5,  overflow: 'hidden' }}>
                            <View style={{height: 20, width: 20 }}>
                              <Image
                                source={require('../../assets/images/cross.svg')}
                                style={{width:'100%', height: '100%', resizeMode:'contain',}}
                              />
                            </View>
                          </TouchableOpacity>
                        </View>
                      )
                  })
               }
               <TouchableOpacity style={{ width: 72, height: 72, marginLeft: 2, marginTop: 2}} onPress={() => this.imagePicker()}>
                 <View style={{ width: 72, height: 72, marginLeft: 2, marginTop: 2  }}>
                   <Image source={require('../../assets/images/addImage.svg')} style={{ resizeMode: 'contain', width: '100%', height: '100%' }} />
                 </View>
               </TouchableOpacity>
              </View>
            </View>
        </ScrollView>
        <TouchableOpacity activeOpacity={1} style={{ width: '100%', height: 50, backgroundColor: '#23BDE4' }} onPress={() => this.onSubmit()}>
          <Text style={{ color: '#ffffff', fontSize: 18, alignSelf: 'center', padding: 10 }}>{i18n.t('ticket.create')}</Text>
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
    serviceUuid: state.service.serviceUuid,
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(NewTicket);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150,
  },
  text: {backgroundColor: '#F8F8F8', width: '100%', height: 40, paddingLeft: 10, marginTop: 10, fontSize: 14, borderBottomColor: '#F8F8F8'},
  textArea: {backgroundColor: '#F8F8F8', width: '100%', height: 120, textAlignVertical: "top", paddingLeft: 10, marginTop: 10, fontSize: 14, borderBottomColor: '#F8F8F8'}
});
