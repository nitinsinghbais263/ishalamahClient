import * as RNLocalize from "react-native-localize";
import i18n from 'i18n-js';

import en from './en.json';
import ar from './ar.json';

const sysLang = RNLocalize.getLocales()


i18n.locale = sysLang[0].languageCode;;
i18n.fallbacks = true;
i18n.translations = { en, ar };



export default i18n;
