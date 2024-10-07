import React, {FC} from 'react';

import {useNavigation} from '@react-navigation/native';
import {Flex, StatusBar} from 'native-base';

import {
  NavigationList,
  // useLendingOnboardingHook,
} from '@personal-pay/design-system.flow.lending';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Loader} from '@personal-pay/design-system.ui.loader';
import {WelcomeTemplate} from '@personal-pay/design-system.flow.welcome';
import {colors} from '@personal-pay/design-system.theme.foundations';
import {
  getLendingOnboarding,
  postLendingOnboarding,
  getNextInstallmentLending,
} from './api/api';
import {useLendingOnboardingHook} from '../../../../../bit/lending-onboarding';

export const OnboardingMicroLending: FC = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<NavigationList, 'MICRO_LENDING_SIMULATOR_ROUTE'>
    >();
  const {isLoading, wording, onSubmit, isLoadingUpdate} =
    useLendingOnboardingHook({
      navigation,
      getLendingOnboarding,
      postLendingOnboarding,
      getNextInstallmentLending,
    });

  return (
    <>
      {isLoading ? (
        <Flex flex={1} justifyContent="center" alignSelf="center">
          <Loader description="" />
        </Flex>
      ) : (
        <>
          <StatusBar
            backgroundColor={colors.primaryDark[0]}
            barStyle="dark-content"
          />
          <WelcomeTemplate
            steps={[
              {
                id: 1,
                title: wording.title,
                description: wording.description,
                textRows: wording.itemsRows,
                illustration: wording.illustration,
              },
            ]}
            primaryButton={{
              children: wording.buttonPrimary,
              onPress: () => onSubmit(),
              isLoading: isLoadingUpdate,
              variant: 'primary',
              testID: 'onboarding-lending-buttons',
            }}
            closeButton={() => navigation.goBack()}
          />
        </>
      )}
    </>
  );
};
