import React, {FC} from 'react';

import {HStack, VStack} from '@personal-pay/design-system.ui.layout';
import {Text} from '@personal-pay/design-system.ui.text';

import {BackdropLeningProp} from '../types';
import {Backdrop} from '@personal-pay/design-system.ui.backdrop';

export const BackdropLening: FC<BackdropLeningProp> = ({
  open,
  setOpen,
  itemText = [],
  titleBackdrop,
  titlePrimaryButton,
}) => (
  <Backdrop
    isOpen={open}
    withScroll
    onClose={() => setOpen(e => !e)}
    testID=""
    title={titleBackdrop}
    wrappedHeight={false}
    buttonGroup={{
      primaryButton: {
        children: titlePrimaryButton,
        onPress: () => setOpen(e => !e),
        testID: 'backdrop-details-fee-button',
      },
    }}>
    <VStack space={1}>
      {itemText.map(item => (
        <HStack key={`key-${item.text}`}>
          <Text variant="body-md" color="textLight">
            {item.bullets}
          </Text>
          <Text variant="body-md" color="textLight">
            {item.text}
          </Text>
        </HStack>
      ))}
    </VStack>
  </Backdrop>
);
