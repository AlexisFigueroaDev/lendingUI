import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {FC} from 'react';

import {Home} from '../modules/home';

const Stack = createNativeStackNavigator();

export const NavigatorRoot: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        key={'HOME'}
        name={'HOME'}
        component={Home}
        options={{
          headerShown: true,
          headerTitle: 'HOME',
        }}
      />
    </Stack.Navigator>
  );
};
