import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  BackHandler,
  Image,
  Platform,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {withNavigation} from 'react-navigation';
import RNPickerSelect from 'react-native-picker-select';
import ImagePicker from 'react-native-image-crop-picker';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-community/async-storage';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import i18n from '../../../lang/i18n';
import LoaderButton from '../../components/LoaderButton';

const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class Notes extends Component {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    this.state = {
      imgSource: [],
      imgData: [],
      avatarSource: null,
      uuid: '',
      content: '',
      attachements: [],
      loading: false,
    };
    this.uploadImage = this.uploadImage.bind(this);
  }

  state = {
    token: '',
    uuid: '',
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.notesError != this.props.notesError) {
      if (this.props.notesError) {
        this.setState({loading: false});
        alert(this.props.notesError);
      }
    }
  }

  onSubmit(){
   let formData = new FormData();

   var image = this.state.imgData;

   image.forEach((item) =>{
     let pathParts = item.path.split('/');
      let photo = {
       uri: item.path,
       type: item.mime,
       name: pathParts[pathParts.length - 1],

     };

     formData.append('ticketUuid', this.props.navigation.state.params.ticket);
     formData.append('content', this.state.content);
     formData.append('attachments[]', photo);
   })

   AsyncStorage.getItem('TOKEN').then((value) => {
     this.setState({token: value})
     this.setState({uuid: this.props.navigation.state.params.ticket})
     this.props.createNotes(this,{
       token: this.state.token,
       // uuid: this.state.uuid,
       formData: formData
       // content: this.state.content,
     })
   })
 }

  onDelete(path) {
    let imageSource = this.state.imgSource;
    imageSource = imageSource.filter(item => {
      return item !== path;
    });
    this.setState({imgSource: imageSource});
  }

  imagePicker() {
    const _that = this;
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      mediaType: 'photo',
      multiple: true,
      maxFiles: 20,
    }).then(image => {
      image.map((item, index) => {
        _that.state.imgSource.push(item.path), _that.state.imgData.push(item);
      });

      _that.setState({
        imgSource: _that.state.imgSource,
        imgData: _that.state.imgData,
      });

      _that.uploadImage(image);
    });
  }

  uploadImage(image) {
    // let formData = new FormData();
    //
    // image.forEach((item) =>{
    //
    //   let pathParts = item.path.split('/');
    //    let photo = {
    //     uri: item.path,
    //     type: item.mime,
    //     name: pathParts[pathParts.length - 1],
    //
    //   };
    //
    //   formData.append('attachments[]', photo);
    // })
    this.setState({attachements: formData});
    // const { token } = this.state;
    // this.props.uploadImage(token, uuid, formData)
  }

  render() {
    var {loading} = this.state;
    return (
      <View style={{flex: 1}}>
        <Header navigation={this.props.navigation} />
        <ScrollView>
          <Text
            style={{
              fontSize: 14,
              alignSelf: 'flex-start',
              marginTop: 20,
              padding: 10,
            }}>
            {i18n.t('notes.attatchments')}
          </Text>
          <View style={{width: '100%', padding: 10}}>
            <View
              style={{
                width: '100%',
                marginBottom: 10,
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {this.state.imgSource &&
                this.state.imgSource.map(image => {
                  return (
                    <View
                      style={{
                        width: 72,
                        height: 72,
                        margin: 5,
                        borderRadius: 7,
                        overflow: 'hidden',
                      }}>
                      <Image
                        source={{uri: image}}
                        style={{
                          width: '100%',
                          height: '100%',
                          resizeMode: 'cover',
                        }}
                      />
                      <TouchableOpacity
                        onPress={() => this.onDelete(image)}
                        style={{
                          height: 20,
                          width: 20,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 20 / 2,
                          borderWidth: 1,
                          borderColor: '#FFFFFF',
                          backgroundColor: '#FFFFFF',
                          position: 'absolute',
                          bottom: 5,
                          right: 5,
                          overflow: 'hidden',
                        }}>
                        <View style={{height: 20, width: 20}}>
                          <Image
                            source={require('../../assets/images/cross.svg')}
                            style={{
                              width: '100%',
                              height: '100%',
                              resizeMode: 'contain',
                            }}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              <TouchableOpacity
                style={{width: 72, height: 72, marginTop: 2}}
                onPress={() => this.imagePicker()}>
                <View style={{width: 72, height: 72, marginTop: 2}}>
                  <Image
                    source={require('../../assets/images/addImage.svg')}
                    style={{
                      resizeMode: 'contain',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <Text
            style={{
              fontSize: 14,
              alignSelf: 'flex-start',
              marginTop: 20,
              padding: 10,
            }}>
            {i18n.t('notes.content')}
          </Text>
          <TextInput
            style={{
              backgroundColor: '#F8F8F8',
              width: '100%',
              height: 150,
              textAlignVertical: 'top',
              paddingLeft: 10,
              marginTop: 10,
              fontSize: 14,
              borderBottomColor: '#F8F8F8',
              textAlign: i18n.locale === 'ar' ? 'right' : 'left',
            }}
            placeholder={i18n.t('notes.typeHere')}
            multiline={true}
            numberOfLines={4}
            underlineColorAndroid="transparent"
            onChangeText={content => this.setState({content: content})}
          />
        </ScrollView>

        <LoaderButton
          style={{width: '100%', height: 50, backgroundColor: '#23BDE4'}}
          onPress={() => this.onSubmit()}
          text={i18n.t('notes.save')}
          isLoading={loading}
        />
        <SafeAreaView style={{backgroundColor: '#23BDE4'}} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    success: state.success,
    error: state.error,
    message: state.message,
    notes: state.notes.notes,
    notesError: state.notes.notesError,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notes);

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
});
