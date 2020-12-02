import React from 'react';
import {View, Text, TouchableOpacity,Image} from 'react-native';
import styles from './styles';
import i18n from '../../../lang/i18n'

//Components  Define
const SuccessPayment = (props) => {
  return (
    <View style={styles.msgContainer}>
      <View style={styles.imgView}>
        {/*
          // <Image
          //   style={styles.imageStyle}
          //   source={require('../../assets/images/msgImage.svg')}
          // />
        */}
      </View>

      <View style={styles.sucessView}>
        <Text numberOfLines={2} style={styles.successText}>
          {'Success'}
        </Text>
      </View>
      <View style={styles.msgView}>
        <Text numberOfLines={2} style={styles.msgText}>
          {i18n.t('sucessPayment')}
        </Text>
      </View>
    </View>
  );
};
//Make Component Available OutSide
export default SuccessPayment;
