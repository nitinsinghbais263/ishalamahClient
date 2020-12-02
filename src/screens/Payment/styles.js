import {StyleSheet, Dimensions} from 'react-native';
// import * as fonts from '../../utils/fontSize';
// import colors from '../../utils/colors';
// import {getAdjustedFontSize} from '../../utils/responsive';
const ScreenWidth = Math.round(Dimensions.get('window').width);

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
