import React from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import i18n from '../../../lang/i18n'


//Components Define
const Header = (props) => {
  const plat = Platform.OS === 'ios' ? 15 : 0;
  return (
    <SafeAreaView style={[styles.safeStyle, {backgroundColor: '#FFFFFF'}]}>
      <StatusBar backgroundColor={'#FFFFFF'} barStyle={'dark-content'} />
      {/* //===header === */}
      <View style={styles.headerContainer}>
        {/* //=== left === */}
        <TouchableOpacity
          onPress={() => props.navigation.pop()}
          style={styles.backIcon}>

            <Image
              style={{
                ...styles.imageStyles,
                transform: [{rotate: i18n.locale === 'ar' ? '180deg' : '0deg'}],
              }}
              source={require('../../assets/images/cancel.svg')}
            />

        </TouchableOpacity>

        {/* //=== center === */}
        <View
          style={{
            ...styles.cloumn2,
            marginLeft: i18n.locale === 'ar' ? plat : 0,
            marginRight: i18n.locale === 'ar' ? plat : 0,
          }}>
          <Text style={styles.headingText}>{props.headerText}</Text>
        </View>
        <View />
      </View>
    </SafeAreaView>
  );
};

//Make Component Available OutSide
export default Header;
