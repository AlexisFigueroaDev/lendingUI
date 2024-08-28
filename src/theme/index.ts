import {extendTheme} from 'native-base';

import * as components from '@personal-pay/design-system.theme.components';
import {fontConfig, fonts} from './foundations/font';
import {
  colors,
  scaleSizes,
} from '@personal-pay/design-system.theme.foundations';

export const customTheme = extendTheme({
  colors,
  components,
  fontConfig,
  fonts,
  sizes: scaleSizes,
});

export type CustomThemeType = typeof customTheme;
