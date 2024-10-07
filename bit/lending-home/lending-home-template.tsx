import React, {FC, useRef} from 'react';
import {LayoutChangeEvent} from 'react-native';

import {
  BaseCard,
  ListCard,
  AmountCard,
} from '@personal-pay/design-system.ui.card';
import {Divider} from '@personal-pay/design-system.ui.divider';
import {EmptyState} from '@personal-pay/design-system.ui.empty-state';
import {ButtonGroupContainer} from '@personal-pay/design-system.ui.footers';
import {BaseSubSectionApp} from '@personal-pay/design-system.ui.headers';
import {Container} from '@personal-pay/design-system.ui.layout';
import {ActivityRow} from '@personal-pay/design-system.ui.row';
import {Text} from '@personal-pay/design-system.ui.text';
import {Box} from 'native-base';

import {LendingHomeTemplateProps} from './types';

export const LendingHomeTemplate: FC<LendingHomeTemplateProps> = ({
  titleAmountCard,
  balanceAmount,
  currencyAmount,
  descriptionAmountCard,
  balanceAmountUsedCard,
  isLoading,
  dataListCard = [],
  onPressListCard = () => {},
  titleDataListCard = '',
  titleLending = '',
  dataActivityRow = [],
  emptyDescription,
  titlePrimaryButton,
  onPressPrimaryButton,
}) => {
  const footerHeightRef = useRef(0);
  const handleFooterOnLayout = (event: LayoutChangeEvent): void => {
    const {height} = event.nativeEvent.layout;
    footerHeightRef.current = height;
  };

  const completeDataListCard = dataListCard.map((item, index) => ({
    id: index,
    title: item.title || '',
    description: item.description || '',
    date: item.date || '',
    amount: item.amount || '',
    status: undefined,
    icon: undefined,
    transactionType: '',
    imgUri: '',
  }));

  return (
    <>
      <Container
        topIosScrollViewBackgroundColor="white"
        bottomIosScrollViewBackgroundColor="white">
        <BaseSubSectionApp topBackgroundColor="neutral">
          <Box paddingX={4} paddingTop={6}>
            <AmountCard
              title={titleAmountCard}
              isLoading={isLoading}
              balance={{
                value: balanceAmount,
                currency: currencyAmount,
              }}
              singleRows={[
                {
                  title: descriptionAmountCard,
                  amount: balanceAmountUsedCard,
                  isLoading,
                },
              ]}
              rightButtonJustify={null}
            />
          </Box>
        </BaseSubSectionApp>
        {isLoading ? null : dataActivityRow.length > 0 ? (
          <Box marginX={4} flex={1}>
            <Box paddingTop={6}>
              {dataListCard.find(item => item.title) ? (
                <BaseCard>
                  <ListCard
                    data={completeDataListCard}
                    title={titleDataListCard}
                    emptyStateText=""
                    isLoading={false}
                    onListItemPress={onPressListCard}
                  />
                </BaseCard>
              ) : null}
            </Box>
            <Box paddingTop={6}>
              <Box marginBottom={3}>
                <Text variant="bodyBold-md">{titleLending}</Text>
              </Box>
              <Box marginX={-3}>
                {dataActivityRow.map((item, index) => (
                  <React.Fragment key={index}>
                    <ActivityRow
                      title={item.title}
                      description={item.description}
                      amount={item.amount}
                      pillTitle={item.pillTitle}
                      pillType={item.pillType}
                      pillVariant={item.pillVariant}
                      pillRightTitle={item.pillRightTitle}
                      footerTitle={item.footerTitle}
                      footerDescription={item.footerDescription}
                      onPress={() => item.onPress && item.onPress()}
                    />
                    {index !== dataActivityRow.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </Box>
            </Box>
          </Box>
        ) : (
          <Box flex={1} marginTop={6}>
            <EmptyState
              description={emptyDescription}
              illustration="MoneyHand"
            />
          </Box>
        )}
      </Container>
      <Box
        onLayout={handleFooterOnLayout}
        bg="primaryDark.0"
        paddingBottom={12}>
        <ButtonGroupContainer
          primaryButton={{
            children: titlePrimaryButton,
            variant: 'primary',
            isLoading: false,
            isDisabled: false,
            onPress: onPressPrimaryButton,
            testID: 'lending-resumen-primary-buttons',
          }}
          paddingTop="5"
          borderPosition="top"
        />
      </Box>
    </>
  );
};
