import React, {Component} from 'react';
import {View, SafeAreaView, StatusBar, ActivityIndicator, Dimensions} from 'react-native';
import SpinnerButton from 'react-native-spinner-button';
import {Overlay} from 'react-native-elements';
import Modal from 'react-native-modal';
const screenHeight = Dimensions.get('window').height;

export default class DataLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView>
        <Modal
          animationType="fade"
          transparent={true}
          isVisible={this.props.isVisible}
          onRequestClose={() => {}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'transparent',
            }}>
            <ActivityIndicator size="large" color="#23bde4" />
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}
