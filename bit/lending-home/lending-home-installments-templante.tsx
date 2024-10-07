import React, { FC } from 'react';

import { Accordion } from '@personal-pay/design-system.ui.accordion';
import { TextButton } from '@personal-pay/design-system.ui.button';
import { BaseCard } from '@personal-pay/design-system.ui.card';
import { Divider } from '@personal-pay/design-system.ui.divider';
import { BaseSubSectionApp } from '@personal-pay/design-system.ui.headers';
import { Icon } from '@personal-pay/design-system.ui.icon';
import {
  Container,
  ContentWrapper,
  HStack,
  VStack,
} from '@personal-pay/design-system.ui.layout';
import { DoubleLineRow, SingleRow } from '@personal-pay/design-system.ui.row';
import { Text } from '@personal-pay/design-system.ui.text';
import { Box } from 'native-base';

import { BaseCardSkeleton } from './components';
import { LendingHomeInstallmentsTemplateProps } from './types';

export const LendingHomeInstallmentsTemplate: FC<
  LendingHomeInstallmentsTemplateProps
> = ({
  dataAccordionInstallments,
  subTitle,
  primaryBaseCard,
  secondaryBaseCard,
  isLoading,
}) => (
  <Container
    topIosScrollViewBackgroundColor="white"
    bottomIosScrollViewBackgroundColor="white"
  >
    <ContentWrapper variant="body" borderless>
      <VStack space={6}>
        <BaseSubSectionApp topBackgroundColor="neutral">
          <ContentWrapper variant="body">
            <Box paddingTop={6}>
              <Accordion
                title={dataAccordionInstallments.title}
                icon={dataAccordionInstallments.icon}
                dataAccordion={dataAccordionInstallments.dataAccordion}
                isIconRight
                isLoading={isLoading}
              />

              <SingleRow
                title={subTitle.title}
                rightTitle={subTitle.rightTitle}
                variantTitle="bodyBold"
                textSize="md"
                isRightTitleBold
                isLoading={isLoading}
              />
              {isLoading ? (
                <Box marginRight={7} paddingTop={6}>
                  <BaseCard backgroundColor="white">
                    <BaseCardSkeleton isDoubleLineRow />
                  </BaseCard>
                </Box>
              ) : (
                <BaseCard backgroundColor="white">
                  <Box paddingX={4}>
                    <DoubleLineRow
                      title={primaryBaseCard.title}
                      description={primaryBaseCard.description}
                      leftIcon="Calendar"
                      pillTitle={primaryBaseCard.pillTitle}
                      pillVariant={primaryBaseCard.pillVariant}
                    />
                  </Box>
                  <Divider />
                  <Box paddingX={4}>
                    <DoubleLineRow
                      title={primaryBaseCard.titleMethodPayment}
                      description={primaryBaseCard.descriptionMethodPayment}
                      leftIcon="CellphoneMoney"
                    />
                  </Box>
                </BaseCard>
              )}
            </Box>
          </ContentWrapper>
        </BaseSubSectionApp>

        <ContentWrapper variant="body">
          {isLoading ? (
            <Box marginRight={7}>
              <BaseCard backgroundColor="white">
                <BaseCardSkeleton isDoubleLineRow={false} />
              </BaseCard>
            </Box>
          ) : (
            <Box width="100%">
              <BaseCard backgroundColor="white">
                <VStack>
                  <Box paddingX={4} paddingTop={4}>
                    <HStack space={1.5}>
                      <Icon name="Dollar" color="primary" />
                      <Text variant="bodyBold-md">
                        {secondaryBaseCard.title}
                      </Text>
                    </HStack>
                    <Text variant="body-sm" color="textLight">
                      {secondaryBaseCard.description}
                    </Text>
                  </Box>
                </VStack>

                <Box paddingX={4} paddingY={3}>
                  <Text variant="bodyBold-sm">{secondaryBaseCard.amount}</Text>
                </Box>

                <Box paddingX={4} paddingBottom={4}>
                  <TextButton
                    text={secondaryBaseCard.labelButton}
                    onPress={() => secondaryBaseCard.onPress()}
                    testID=""
                  />
                </Box>
              </BaseCard>
            </Box>
          )}
        </ContentWrapper>
      </VStack>
    </ContentWrapper>
  </Container>
);
