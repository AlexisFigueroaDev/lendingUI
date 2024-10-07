import React, {FC, useEffect, useState} from 'react';

import {colors} from '@personal-pay/design-system.theme.foundations';

import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Box, StatusBar} from 'native-base';

import {post} from '../../../../config/axios-config';
import {
  LendingResumenTemplate,
  LendingSimulationData,
  NavigationListSimulator,
  useLendingSimulatorResumen,
  useSimulationMicroCredit,
  useLendingAcceditation,
} from '@personal-pay/design-system.flow.lending';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BackdropLening, NavBarLending} from '../../components';
import {wordingSimulatorBackdrop} from '../../wording/constants';

import {useBackHandler} from '@react-native-community/hooks';
import {postLendingSimulator} from '../lending-progress-simulator/api/api';
import {postLendingConfirm} from './api/api';

export const LendingSimulatorResumen: FC = () => {
  const route =
    useRoute<
      RouteProp<
        NavigationListSimulator,
        'MICRO_LENDING_RESUMEN_SIMULATOR_ROUTE'
      >
    >();
  const navigation =
    useNavigation<NativeStackNavigationProp<NavigationListSimulator>>();

  const {
    data: datarefetch,
    mutate,
    isLoading,
  } = useSimulationMicroCredit(postLendingSimulator);

  const {index, toogle} = useLendingSimulatorResumen({
    navigation,
    firstExpirationDates: route.params.firstExpirationDates,
    tooglesPlans: route.params.data?.tooglesPlans,
    mutateFn: mutate,
    post,
    amount: route.params.amount,
    productId: route.params.productId,
  });

  const {
    isLoading: loadingAcceditation,
    mutate: mutateFnAccreditation,
    feedback,
    data: dataAccreditation,
  } = useLendingAcceditation(postLendingConfirm);

  console.log('feedback', feedback);
  console.log('dataAccreditation', dataAccreditation);

  const [data, setData] = useState<LendingSimulationData | undefined>(
    route.params.data,
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (datarefetch) {
      setData(datarefetch);
    }
  }, [datarefetch]);

  function handleGoBack(): boolean {
    navigation.replace('MICRO_LENDING_ONBOARDING_ROUTE');
    return true;
  }

  useBackHandler(handleGoBack);

  return (
    <>
      <Box safeAreaTop bg={'white'} flexWrap={'wrap'} flexDir={'row'}>
        <StatusBar
          backgroundColor={colors.primaryDark[0]}
          barStyle="dark-content"
        />

        <NavBarLending
          onPressIconLeft={() =>
            navigation.replace('MICRO_LENDING_ONBOARDING_ROUTE')
          }
          onPressIconRigth={() => setOpen(e => !e)}
        />
      </Box>
      <LendingResumenTemplate
        titleInstallments={data?.wording.titleHeader || ''}
        lendingToogle={toogle || []}
        accreditationDetail={{
          title: data?.wording.titleAcceditation || '',
          amount: data?.creditsDetails.amount || '',
          rates: data?.installment[index].rates || '',
        }}
        detailsPayment={{
          title: 'Detalle del pago',
          itemsCreditDetails:
            data?.installment[index].detailsPayment.itemsPaymentDetails || [],
          showDivider: false,
        }}
        detailsCredits={{
          title: 'Detalle del crédito',
          itemsCreditDetails:
            data?.installment[index].detailsCredits.itemsCreditDetails || [],
          showDivider: true,
          showComponent:
            !!data?.installment[index].detailsCredits.showComponente,
        }}
        primaryButton={{
          children: data?.wording.primaryButton || '',
          isLoading: loadingAcceditation,
          onPress: () =>
            mutateFnAccreditation({
              installmentPlanId: data?.installment[index].id || '0',
            }),
        }}
        secondaryButton={{
          children: data?.wording.secondaryButton || '',
          isLoading: false,
          onPress: () => navigation.replace('MICRO_LENDING_ONBOARDING_ROUTE'),
        }}
        detailsCheckbox={{
          title: data?.wording.titleCheckbox || '',
          primaryOnPress: () => console.log('click '),
          secondaryOnPress: () => console.log('second click '),
        }}
        isLoading={isLoading}
      />
      <BackdropLening
        open={open}
        setOpen={() => setOpen(e => !e)}
        itemText={wordingSimulatorBackdrop}
        titleBackdrop="¿Cómo simulo un crédito?"
        titlePrimaryButton="Entendido"
      />
    </>
  );
};
