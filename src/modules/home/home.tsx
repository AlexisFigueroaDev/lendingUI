import {FullWidthSolidButton} from '@personal-pay/design-system.ui.button';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {Box} from 'native-base';
import React from 'react';

export const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <Box paddingX={4}>
      <FullWidthSolidButton
        children={'Incio flow'}
        onPress={() => {
          navigation.navigate('MICROLENDINGSTACK');
        }}
        testID={''}
        variant="primary"
      />
    </Box>
  );
};
