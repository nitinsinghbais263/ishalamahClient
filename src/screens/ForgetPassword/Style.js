import {StyleSheet, Platform, Dimensions} from 'react-native';
import {getAdjustedFontSize} from '../../responsive/responsive';

const sysWidth = Dimensions.get('window').width;
const sysHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  mainView: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  headerText2: {
    fontSize: getAdjustedFontSize(16),
    color: '#444444',
  },
  boxStyle: {
    width: sysWidth / 2 - 23,
    height: sysWidth / 2 - 23,
    borderRadius: 10,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: -1, height: -1},
    shadowColor: '#EAEAEA',
    shadowRadius: 10,
    elevation: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  imageView: {
    height: 70,
    width: 70,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  textView: {
    marginTop: 10,
  },
  innerText: {
    fontSize: getAdjustedFontSize(20),
    color: '#23BDE4',
  },
  inputView: {
    width: sysWidth,
    marginTop: 30,
  },
  pickerView: {
    backgroundColor: '#f8f8f8',
    marginTop: 10,
    height: 50,
    justifyContent: 'center',
    paddingLeft: Platform.OS === 'ios' ? 10 : 0,
  },
  pickerViewAR: {
    backgroundColor: '#f8f8f8',
    marginTop: 10,
    height: 50,
    justifyContent: 'center',
    paddingRight: Platform.OS === 'ios' ? 10 : 0,
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
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  dropdownImage: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    // alignSelf: 'center'
  },
  dropdownArrowView: {
    position: 'absolute',
    right: 10,
    width: 10,
    height: 10,
    justifyContent: 'center',
    top: Platform.OS !== 'ios' ? 22 : 20,
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
  countryView: {
    flexDirection: 'row',
    padding: 10,
  },
  continueButton: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#23bde4',
  },
  continueButtonBG: {
    height: 50,
    width: '100%',
    backgroundColor: '#23bde4',
  },
  buttonText: {
    color: '#ffffff',
    alignSelf: 'center',
    fontSize: getAdjustedFontSize(20),
  },
  // Registraion3
  codeTitle: {
    fontSize: getAdjustedFontSize(26),
    color: '#000000',
    alignSelf: 'center',
    marginTop: 100,
  },
  codeView: {
    marginTop: 10,
    height: 100,
  },
  codeInput: {
    height: 50,
    width: 50,
    fontSize: 18,
    borderWidth: 1,
    backgroundColor: '#F8F8F8',
  },
  resendView: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  firstText: {
    fontSize: getAdjustedFontSize(16),
    color: '#000000',
  },
  resendText: {
    color: '#23bde4',
    marginLeft: 5,
    fontSize: getAdjustedFontSize(16),
  },
  numberInput: {
    paddingLeft: Platform.OS === 'ios' ? 0 : 10,
  },
  modalView: {
    padding: 15,
    flex: 1,
    backgroundColor: '#ffffff',
    marginTop: 30,
  },
  itemView: {
    height: 40,
    paddingLeft: 10,
  },
  itemText: {
    color: '#000',
    fontSize: 16,
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
  searchCountryFieldView: {
    marginVertical: 10,
  },
});
