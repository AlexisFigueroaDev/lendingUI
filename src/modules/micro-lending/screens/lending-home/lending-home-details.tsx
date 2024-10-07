import {Text} from '@personal-pay/design-system.ui.text';
import {Divider} from '@personal-pay/design-system.ui.divider';
import {colors} from '@personal-pay/design-system.theme.foundations';
import {IconButtonTransparent} from '@personal-pay/design-system.ui.button';
import {HStack, VStack} from '@personal-pay/design-system.ui.layout';
import {Box, StatusBar} from 'native-base';
import React, {FC} from 'react';
import {Platform} from 'react-native';
import {
  LendingHomeDetailsTemplate,
  LoanResponseError,
  LoansByID,
  NavigationListHomeLending,
  useLendingHomeDetailsHook,
} from '@personal-pay/design-system.flow.lending';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StepState} from '@personal-pay/design-system.ui.progress';
import {amountToCurrencyWithoutDecimals} from '@personal-pay/design-system.helpers.utils';
import {
  ActivityRowColorIcons,
  ActivityRowProps,
} from '@personal-pay/design-system.ui.row';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {getLendingDetailsByIdLoans, getLoansAlert} from './api/api';

export const LendingHomeDetails: FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<NavigationListHomeLending>>();

  const route =
    useRoute<
      RouteProp<NavigationListHomeLending, 'MICRO_LENDING_HOME_DETAIL_ROUTE'>
    >();

  const getLoansById = () =>
    getLendingDetailsByIdLoans({idLoan: route.params.idLoan});

  const isLoansByID = (
    data: LoansByID | LoanResponseError | undefined,
  ): data is LoansByID => {
    return (data as LoansByID)?.installments !== undefined;
  };

  const {data, isLoading, dataAlerts} = useLendingHomeDetailsHook({
    getLoansById,
    getAlerts: () => getLoansAlert({loanId: route.params.idLoan}),
  });

  let dataLoansById: LoansByID | undefined;
  let singlePay: boolean = false;

  const statusQuota = (): string => {
    if (data && isLoansByID(data)) {
      const quotasSuccess = data.installments.filter(
        step => step.status.type === 'paid',
      );
      if (quotasSuccess) {
        return `Cuota ${
          quotasSuccess.length === 0 ? 1 : quotasSuccess.length
        } de ${data.installments.length}`;
      }
    }
    return '...';
  };

  if (isLoansByID(data)) {
    singlePay = data?.installments.length === 1;
    dataLoansById = data;
  }

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
      <LendingHomeDetailsTemplate
        alert={dataAlerts}
        isLoading={isLoading}
        dataAccordion={{
          title: dataLoansById?.title || 'Crédito personal',
          amount: dataLoansById?.amount,
          icon: 'Dollar',
        }}
        progressStepsDetails={
          dataLoansById?.installments
            ? dataLoansById?.installments.map(installment => {
                return {
                  stepId: installment.number,
                  state: installment.status.colorIcon as StepState,
                };
              })
            : [{stepId: 1, state: 'active'}]
        }
        titleProgressStepsDetails={singlePay ? 'Pago único' : statusQuota()}
        titleDetailCard="Plan de pagos"
        dataActivityRowDetails={
          dataLoansById?.installments &&
          dataLoansById.installments.map(installment => {
            return {
              title: installment.title,
              description: installment.paymentDateStr,
              amount: amountToCurrencyWithoutDecimals(installment.amount),
              icon: installment.status.icon as ActivityRowProps['icon'],
              colorIcon: installment.status.colorIcon as ActivityRowColorIcons,
              onPress: () => {
                navigation.navigate(
                  'MICRO_LENDING_HOME_DETAIl_INSTALLMENT_ROUTE',
                  {
                    idLoan: installment.loanId,
                    installment: installment.number,
                  },
                );
              },
            };
          })
        }
      />
    </Box>
  );
};
