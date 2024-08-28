import {FullWidthSolidButton} from '@personal-pay/design-system.ui.button';

import {Box, Text} from 'native-base';
import React from 'react';

export const Home = () => {
  return (
    <Box paddingX={4}>
      <FullWidthSolidButton
        children={'Flow'}
        onPress={() => {
          console.log('click');
        }}
        testID={''}
        variant="primary"
      />
      <Text>Hola</Text>
    </Box>
  );
};
