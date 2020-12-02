import React, {Component} from 'react';
import {View, SafeAreaView, TouchableOpacity, Text} from 'react-native';
import SpinnerButton from 'react-native-spinner-button';

export default class LoaderButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView>
        <View
          style={[
            {
              width: '100%',
              height: 50,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#23BDE4',
            },
            this.props.style,
          ]}>
          {this.props.isLoading ? (
            <View
              style={{
                width: '100%',
                height: 50,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: '#23BDE4',
              }}>
              <SpinnerButton
                buttonStyle={[
                  {
                    width: 110,
                    height: 35,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    backgroundColor: '#23BDE4',
                  },
                  this.props.buttonStyle,
                ]}
                isLoading={true}
                indicatorCount={10}
                size={10}
                spinnerType="DotIndicator"
              />
            </View>
          ) : (
            <TouchableOpacity
              style={{
                width: '100%',
                height: 50,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                backgroundColor: '#23BDE4',
              }}
              onPress={() => this.props.onPress()}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#ffffff',
                  alignSelf: 'center',
                }}>
                {this.props.text}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    );
  }
}
