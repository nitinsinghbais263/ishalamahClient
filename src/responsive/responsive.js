import { Dimensions } from 'react-native';

const { width } = Dimensions.get("window");

export const getAdjustedFontSize = (size) => {
    return parseInt(size) * width * (1.8 - 0.002 * width) / 400;
  }
