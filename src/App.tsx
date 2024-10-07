import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {NativeBaseProvider} from 'native-base';

import {NavigationContainer} from '@react-navigation/native';
import {NavigatorRoot} from './navigation';
import {customTheme} from './theme';

const queryClient = new QueryClient();

if (__DEV__) {
  require('./config/reactotronConfig');
}

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
