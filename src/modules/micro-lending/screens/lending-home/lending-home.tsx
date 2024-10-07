import React, {FC} from 'react';

import {Box, StatusBar} from 'native-base';
import {colors} from '@personal-pay/design-system.theme.foundations';
import {HStack, VStack} from '@personal-pay/design-system.ui.layout';
import {Divider} from '@personal-pay/design-system.ui.divider';
import {Text} from '@personal-pay/design-system.ui.text';
import {IconButtonTransparent} from '@personal-pay/design-system.ui.button';
import {Platform} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {amountToCurrencyWithoutDecimals} from '@personal-pay/design-system.helpers.utils';
import {
  getBalanceLending,
  getLoans,
  getNextInstallmentLending,
} from './api/api';
import {
  NavigationListHomeLending,
  NavigationListSimulator,
  // useLendingHomeHook,
  // LendingHomeTemplate,
  LoanResponse,
} from '@personal-pay/design-system.flow.lending';
import {
  LendingHomeTemplate,
  useLendingHomeHook,
} from '../../../../../bit/lending-home';

export const LendingHome: FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<NavigationListHomeLending>>();

  const route =
    useRoute<
      RouteProp<NavigationListSimulator, 'MICRO_LENDING_SIMULATOR_ROUTE'>
    >();

  const {dataBalance, dataListCard, installments, dataLoans, HasLoading} =
    useLendingHomeHook({
      getBalance: getBalanceLending,
      getNextInstallment: getNextInstallmentLending,
      getLoans: getLoans,
    });

  console.log('dataListCard', dataListCard);

  const WordingHomeLending = {
    titleAmountCard: 'Disponible',
    currency: '$',
    descriptionAmountCard: 'Usado',
    descriptionListCard: 'vencimiento',
    titleDataListCard: 'Próximos vencimientos',
    titleDetailsLending: 'Créditos',
    emptyDescription: 'Acá vas a encontrar tus créditos activos.',
    titlePrimaryButton: 'Simular crédito',
  };

  return (
    <Box flex={1}>
      <Box safeAreaTop bg="white" flexWrap="wrap" flexDir="row">
        <StatusBar
          backgroundColor={colors.primaryDark[0]}
          barStyle="dark-content"
        />

        <VStack space={0}>
          <Box
            justifyContent="space-between"
            flexDirection="row"
            paddingX={2}
            alignItems="center"
            paddingTop={Platform.OS === 'android' ? 4 : 0}>
            <IconButtonTransparent
              name="ArrowLeft"
              onPress={() => {}}
              testID=""
              size="xl"
            />

            <HStack>
              <Text variant="bodyBold-lg">Microcréditos</Text>
            </HStack>

            <Box w={10} />
          </Box>
          <Divider />
        </VStack>
      </Box>
      <LendingHomeTemplate
        titleAmountCard={WordingHomeLending.titleAmountCard}
        balanceAmount={dataBalance?.availableCredit}
        currencyAmount={WordingHomeLending.currency}
        descriptionAmountCard={WordingHomeLending.descriptionAmountCard}
        balanceAmountUsedCard={dataBalance?.arrangedAmount}
        isLoading={HasLoading}
        dataListCard={[
          {
            title: dataListCard[0]?.title,
            description: WordingHomeLending.descriptionListCard,
            date: dataListCard[0]?.desc,
            amount: amountToCurrencyWithoutDecimals(dataListCard[0]?.amount),
          },
        ]}
        onPressListCard={() => {
          installments.length > 1
            ? null
            : navigation.navigate('MICRO_LENDING_HOME_DETAIL_ROUTE', {
                idLoan: installments[0].loanId,
              });
        }}
        titleDataListCard={WordingHomeLending.titleDataListCard}
        titleLending={WordingHomeLending.titleDetailsLending}
        dataActivityRow={
          dataLoans &&
          dataLoans.map((loan: LoanResponse) => {
            return {
              id: loan.id,
              title: loan.title,
              description: loan.description,
              amount: amountToCurrencyWithoutDecimals(loan.amount),
              pillType: loan.status === 'prepaid' ? 'alpha' : 'solid',
              pillTitle: loan.loanStatus.title,
              pillVariant: loan.loanStatus.color,
              pillRightTitle: loan.loanStatus.current,
              footerTitle: 'Próximo pago: ' + loan.nextInstallment.date,
              footerDescription: amountToCurrencyWithoutDecimals(
                loan.nextInstallment.amount,
              ),
              onPress: () => {
                (loan.status === 'rejected' &&
                  loan.loanStatus.current === '') ||
                loan.status === 'prepaid'
                  ? null
                  : navigation.navigate('MICRO_LENDING_HOME_DETAIL_ROUTE', {
                      idLoan: loan.id,
                    });
              },
            };
          })
        }
        emptyDescription={WordingHomeLending.emptyDescription}
        titlePrimaryButton={WordingHomeLending.titlePrimaryButton}
        onPressPrimaryButton={() =>
          navigation.replace('MICRO_LENDING_SIMULATOR_ROUTE', {
            availableAmount: route.params.availableAmount,
            minAmount: route.params.minAmount,
            firstExpirationDates: route.params.firstExpirationDates,
            productId: '5',
          })
        }
      />
    </Box>
  );
};
