/* eslint-disable react/no-array-index-key */
import React, { FC } from 'react';

import { ScreenAlert } from '@personal-pay/design-system.ui.alert';
import { DetailCard } from '@personal-pay/design-system.ui.card';
import { Divider } from '@personal-pay/design-system.ui.divider';
import { BaseSubSectionApp } from '@personal-pay/design-system.ui.headers';
import { Container, VStack } from '@personal-pay/design-system.ui.layout';
import {
  ActivityRow,
  ActivityRowSkeleton,
} from '@personal-pay/design-system.ui.row';
import { Text } from '@personal-pay/design-system.ui.text';
import { Box } from 'native-base';

import { LendingHomeDetailsTemplateProps } from './types';

export const LendingHomeDetailsTemplate: FC<
  LendingHomeDetailsTemplateProps
> = ({
  dataAccordion,
  titleDetailCard,
  dataActivityRowDetails = [],
  progressStepsDetails,
  titleProgressStepsDetails,
  isLoading = true,
  alert,
}) => (
  <Container
    topIosScrollViewBackgroundColor="white"
    bottomIosScrollViewBackgroundColor="white"
  >
    <VStack space={2}>
      <BaseSubSectionApp topBackgroundColor="neutral">
        <Box marginTop={6}>
          <DetailCard
            itemsAccordion={{
              title: dataAccordion.title,
              amount: dataAccordion.amount,
              withOutDecimalsAmountInt: true,
              icon: dataAccordion.icon,
              isShowDivider: true,
              isLoading,
            }}
            progressStepBar={{
              steps: progressStepsDetails,
              title: titleProgressStepsDetails,
            }}
          />
        </Box>
      </BaseSubSectionApp>
      {alert?.title ? (
        <Box marginTop={4} marginX={4} marginBottom={-2}>
          <ScreenAlert
            title={alert.title}
            description={alert.description}
            criticality={alert.criticality}
            showCross={false}
            testID=""
          />
        </Box>
      ) : null}

      <Box paddingLeft={4} marginTop={6}>
        <Text variant="bodyBold-md">{titleDetailCard}</Text>
      </Box>
      <Box paddingX={1}>
        {isLoading ? (
          <ActivityRowSkeleton />
        ) : (
          dataActivityRowDetails.map((items, index) => (
            <React.Fragment key={index}>
              <ActivityRow
                title={items.title}
                description={items.description}
                amount={items.amount}
                icon={items.icon}
                colorIcon={items.colorIcon}
                onPress={items.onPress}
              />
              {index !== dataActivityRowDetails.length - 1 && (
                <Box paddingY={1}>
                  <Divider />
                </Box>
              )}
            </React.Fragment>
          ))
        )}
      </Box>
    </VStack>
  </Container>
);
