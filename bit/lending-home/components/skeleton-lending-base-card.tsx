import React, { ReactElement } from 'react';

import { Divider } from '@personal-pay/design-system.ui.divider';
import { VStack } from '@personal-pay/design-system.ui.layout';
import { DoubleLineRowSkeleton } from '@personal-pay/design-system.ui.row';
import { Box, Skeleton } from 'native-base';

export const BaseCardSkeleton = ({
  isDoubleLineRow,
}: {
  isDoubleLineRow: boolean;
}): ReactElement => {
  const renderDoubleLineRowSkeleton = (): ReactElement => (
    <Box>
      <DoubleLineRowSkeleton paddingX="4" />
      <Divider />
      <DoubleLineRowSkeleton paddingX="4" />
    </Box>
  );

  return (
    <Box>
      {isDoubleLineRow ? (
        renderDoubleLineRowSkeleton()
      ) : (
        <Box paddingBottom={4}>
          <DoubleLineRowSkeleton paddingX="4" />
          <VStack space={3}>
            <Box paddingX={4}>
              <Skeleton height={3} w="40%" />
            </Box>
            <Box paddingX={4}>
              <Skeleton height={3} w="40%" />
            </Box>
          </VStack>
        </Box>
      )}
    </Box>
  );
};
