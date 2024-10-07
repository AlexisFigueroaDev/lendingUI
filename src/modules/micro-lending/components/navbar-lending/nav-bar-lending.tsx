import React from 'react';

import {FC} from 'react';
import {Platform} from 'react-native';

import {Divider} from '@personal-pay/design-system.ui.divider';
import {HStack, VStack} from '@personal-pay/design-system.ui.layout';
import {Text} from '@personal-pay/design-system.ui.text';
import {Box} from 'native-base';

import {NavBarLendingProp} from '../types';
import {IconButtonTransparent} from '@personal-pay/design-system.ui.button';

export const NavBarLending: FC<NavBarLendingProp> = ({
  onPressIconLeft,
  onPressIconRigth,
}) => (
  <VStack space={0}>
    <Box
      justifyContent="space-between"
      flexDirection="row"
      paddingX={2}
      // flex={1}
      alignItems="center"
      paddingTop={Platform.OS === 'android' ? 4 : 0}>
      <IconButtonTransparent
        name="ArrowLeft"
        onPress={onPressIconLeft}
        testID=""
        size="xl"
      />

      <HStack>
        <Text variant="bodyBold-lg">Simular crédito</Text>
      </HStack>

      <IconButtonTransparent
        name="Alert"
        onPress={onPressIconRigth}
        testID=""
        size="xl"
      />
    </Box>
    <Divider />
  </VStack>
);
