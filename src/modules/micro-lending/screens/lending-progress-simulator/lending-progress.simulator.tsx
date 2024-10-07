/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable radix */
import React, {FC, useEffect} from 'react';

import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types';

import {
  LendingProgressBarTemplate,
  NavigationListSimulator,
  useSimulationMicroCredit,
} from '@personal-pay/design-system.flow.lending';
import {postLendingSimulator} from './api/api';

export const LendingProgressSimulator: FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<NavigationListSimulator>>();
  const {mutate, status, direction, data} =
    useSimulationMicroCredit(postLendingSimulator);

  const route =
    useRoute<
      RouteProp<NavigationListSimulator, 'MICRO_LENDING_PROGRESS_ROUTE'>
    >();

  const WordingProgressBar = {
    0: 'Buscando la mejor oferta para vos...',
    1: 'Definiendo tasas y fechas de vencimiento...',
    2: '¡Ya casi estamos!',
  };

  useEffect(() => {
    mutate(
      {
        amount: parseInt(route.params.amount),
        firstExpirationDate: route.params.firstExpirationDates[0].date || '',
        productId: parseInt(route.params.productId),
      },
      {
        onSuccess: () => {},
        onError: () => {
          navigation.replace('MICRO_LENDING_ONBOARDING_ROUTE');
        },
      },
    );
  }, [mutate]);

  return (
    <LendingProgressBarTemplate
      status={status}
      wording={WordingProgressBar}
      onSubmit={() =>
        navigation.replace(direction, {
          data,
          firstExpirationDates: route.params.firstExpirationDates,
          amount: route.params.amount,
          productId: route.params.productId,
        })
      }
      duration={5000}
    />
  );
};
