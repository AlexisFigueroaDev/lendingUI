import React, {FC} from 'react';
import {
  InstallmentsLoans,
  LendingHomeInstallmentsTemplate,
  LoanResponseError,
  NavigationListHomeLending,
  useLendingHomeinstallmentHook,
} from '@personal-pay/design-system.flow.lending';
import {Box, StatusBar} from 'native-base';
import {HStack, VStack} from '@personal-pay/design-system.ui.layout';
import {Platform} from 'react-native';
import {IconButtonTransparent} from '@personal-pay/design-system.ui.button';
import {Text} from '@personal-pay/design-system.ui.text';
import {Divider} from '@personal-pay/design-system.ui.divider';
import {colors} from '@personal-pay/design-system.theme.foundations';
import {RouteProp, useRoute} from '@react-navigation/native';
import {DoubleLineRowProps} from '@personal-pay/design-system.ui.row';
import {getLendinginstallmentByIdLoans} from './api/api';

export const LendingHomeInstallements: FC = () => {
  let dataInstallments: InstallmentsLoans | undefined;
  const route =
    useRoute<
      RouteProp<
        NavigationListHomeLending,
        'MICRO_LENDING_HOME_DETAIl_INSTALLMENT_ROUTE'
      >
    >();
  const getInstallmentLoansById = () =>
    getLendinginstallmentByIdLoans({
      idLoan: route.params.idLoan,
      installment: route.params.installment,
    });

  const isInstallmentsLoans = (
    data: InstallmentsLoans | LoanResponseError | undefined,
  ): data is InstallmentsLoans => {
    return (data as InstallmentsLoans)?.loanId !== undefined;
  };

  const {data, isLoading} = useLendingHomeinstallmentHook({
    getLendingInstallmentByIdLoans: getInstallmentLoansById,
  });
  if (isInstallmentsLoans(data)) {
    dataInstallments = data;
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
      <LendingHomeInstallmentsTemplate
        isLoading={isLoading}
        dataAccordionInstallments={{
          title: dataInstallments?.progress || '',
          icon: 'MoneyCircle',
          dataAccordion: dataInstallments?.dataAccordion,
        }}
        subTitle={{
          title: 'Total a pagar',
          rightTitle: dataInstallments?.installmentAmount,
        }}
        primaryBaseCard={{
          title: 'Próximo vencimiento',
          description: dataInstallments?.paymentDate,
          pillTitle: dataInstallments?.loanStatus.name,
          pillVariant: dataInstallments?.loanStatus
            .style as DoubleLineRowProps['pillVariant'],
          titleMethodPayment: 'Modalidad de pago',
          descriptionMethodPayment: dataInstallments?.payMode || '',
        }}
        secondaryBaseCard={{
          title: dataInstallments?.vendorName || 'Crédito personal',
          description: dataInstallments?.dateOfBuy || '',
          amount: dataInstallments?.amount || '',
          labelButton: 'Ver detalle del crédito',
          onPress: () => {},
        }}
      />
    </Box>
  );
};
