import {StyleSheet, Platform, Dimensions} from 'react-native';

export default StyleSheet.create({
  MainContainer: {flex: 1},

  SafeAreaView: {backgroundColor: '#2383C3'},

  Header: {
    width: '100%',
    height: 50,
    backgroundColor: '#23BDE4',
    flexDirection: 'row',
    // shadowOpacity: 1,
    // shadowColor: 'gray',
    // shadowRadius: 5,
    // shadowOffset: { width: 0, height: 2 }
  },

  Back: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  BackImage: {
    width: 25,
    height: 25,
    alignSelf: 'center',
    resizeMode: 'contain',
    position: 'absolute',
    left: 5,
  },

  HeaderContent: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '400',
    alignSelf: 'center',
    position: 'absolute',
    right: 10,
  },

  BodyContainer: {
    height: 300,
    paddingVertical: 50,
    paddingHorizontal: 20,
    marginTop: 35,
  },

  BodyContent: {fontSize: 16, marginTop: 35, marginLeft: 10},

  BodyText: {
    color: '#6C6C6C',
    fontSize: 24,
    fontWeight: '400',
    textAlign: 'center',
  },

  Input: {
    backgroundColor: '#F8F8F8',
    width: '100%',
    height: 45,
    paddingLeft: 10,
    marginTop: 15,
    fontSize: 16,
    borderBottomColor: '#F8F8F8',
  },

  CodeInput: {
    height: 50,
    width: 50,
    fontSize: 18,
    borderWidth: 1,
    backgroundColor: '#F8F8F8',
  },

  ResendContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    width: '100%',
  },

  ResendText: {fontSize: 18, color: '#6C6C6C'},

  ResendButton: {fontSize: 18, color: '#7FD5EB'},

  FooterButton: {width: '100%', height: 50, backgroundColor: '#23BDE4'},

  FooterButtonText: {
    color: '#ffffff',
    fontSize: 18,
    alignSelf: 'center',
    padding: 10,
  },

  DropdownImgEN: {
    width: 0,
    height: 0,
    position: 'absolute',
    top: 35,
    right: 15,
    backgroundColor: 'transparent',
    borderTopWidth: 5,
    borderTopColor: '#00000099',
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
  },
  DropdownImgAR: {
    width: 0,
    height: 0,
    position: 'absolute',
    top: 35,
    left: 15,
    backgroundColor: 'transparent',
    borderTopWidth: 5,
    borderTopColor: '#00000099',
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
  },
  countryView: {
    flexDirection: 'row',
    padding: 10,
  },
  pickerView2: {
    backgroundColor: '#f8f8f8',
    marginTop: 10,
    height: 50,
    justifyContent: 'center',
    paddingLeft: Platform.OS === 'ios' ? 10 : 10,
  },
  pickerViewAR2: {
    backgroundColor: '#f8f8f8',
    marginTop: 10,
    height: 50,
    justifyContent: 'center',
    paddingRight: Platform.OS === 'ios' ? 10 : 10,
  },
  itemText: {
    color: '#000',
    fontSize: 16,
  },
  dropdownArrowViewAR: {
    position: 'absolute',
    left:
      Platform.OS === 'ios'
        ? -(Dimensions.get('window').width - 20)
        : -(Dimensions.get('window').width - 10),
    width: 10,
    height: 10,
    // justifyContent: 'center',
    top: Platform.OS !== 'ios' ? 22 : 2,
  },
  dropdownArrowView: {
    position: 'absolute',
    right: 10,
    width: 10,
    height: 10,
    justifyContent: 'center',
    top: Platform.OS !== 'ios' ? 22 : 20,
  },
  dropdownImage: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    // alignSelf: 'center'
  },
  modalView: {
    padding: 15,
    flex: 1,
    backgroundColor: '#ffffff',
    marginTop: 30,
  },
  searchCountryFieldView: {
    marginVertical: 10,
  },
  searchCountryField: {
    height: 46,
    width: '100%',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 23,
  },
  itemView: {
    height: 40,
    paddingLeft: 10,
  },
  itemText: {
    color: '#000',
    fontSize: 16,
  },
});
