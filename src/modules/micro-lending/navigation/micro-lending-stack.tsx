import React, {FC} from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {OnboardingMicroLending} from '../screens/lending-onboarding/onboarding-micro-lending';
import {LendingProgressSimulator} from '../screens/lending-progress-simulator/lending-progress.simulator';
import {LendingSimulator} from '../screens/lending-simulator';
import {LendingSimulatorResumen} from '../screens/lending-simulator-resumen/lending-simulator-resumen';
import {navigationMicroLending} from '../wording';
import {LendingHome} from '../screens/lending-home';
import {LendingHomeDetails} from '../screens/lending-home/lending-home-details';
import {LendingHomeInstallements} from '../screens/lending-home/lending-home-installments';

const Stack = createStackNavigator();

export const MicroLendingStack: FC = () => (
  <Stack.Navigator
    initialRouteName={navigationMicroLending.MICRO_LENDING_ONBOARDING_ROUTE}
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name={navigationMicroLending.MICRO_LENDING_ONBOARDING_ROUTE}
      component={OnboardingMicroLending}
      options={{headerShown: false, animationTypeForReplace: 'pop'}}
    />
    <Stack.Screen
      name={navigationMicroLending.MICRO_LENDING_SIMULATOR_ROUTE}
      component={LendingSimulator}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name={navigationMicroLending.MICRO_LENDING_PROGRESS_ROUTE}
      component={LendingProgressSimulator}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name={navigationMicroLending.MICRO_LENDING_RESUMEN_SIMULATOR_ROUTE}
      component={LendingSimulatorResumen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name={navigationMicroLending.MICRO_LENDING_HOME_ROUTE}
      component={LendingHome}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name={navigationMicroLending.MICRO_LENDING_HOME_DETAIL_ROUTE}
      component={LendingHomeDetails}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name={navigationMicroLending.MICRO_LENDING_HOME_DETAIl_INSTALLMENT_ROUTE}
      component={LendingHomeInstallements}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);
