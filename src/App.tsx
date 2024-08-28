import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {extendTheme, NativeBaseProvider} from 'native-base';
import {fontConfig, fonts} from './../fonts';

import {NavigationContainer} from '@react-navigation/native';
import {NavigatorRoot} from './navigation';
import {customTheme} from './theme';

// export const customTheme = extendTheme({
//   colors,
//   components,
//   fontConfig,
//   fonts,
//   sizes: scaleSizes,
// });

// export type CustomThemeType = typeof customTheme;

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider theme={customTheme}>
        <NavigationContainer>
          <NavigatorRoot />
        </NavigationContainer>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
};
