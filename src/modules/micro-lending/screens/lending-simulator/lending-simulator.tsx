import React, {FC, useState} from 'react';

import {colors} from '@personal-pay/design-system.theme.foundations';
import {Container} from '@personal-pay/design-system.ui.layout';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StatusBar} from 'native-base';
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types';
import {
  LendingSimulatorTemplate,
  NavigationListSimulator,
} from '@personal-pay/design-system.flow.lending';
import {BackdropLening, NavBarLending} from '../../components';
import {wordingSimulatorBackdrop} from '../../wording/constants';

// import {BackdropLening, NavBarLending} from '@modules/micro-lending/components';
// import {wordingSimulatorBackdrop} from '@modules/micro-lending/wording/constants';

export const LendingSimulator: FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<NavigationListSimulator>>();

  const route =
    useRoute<
      RouteProp<NavigationListSimulator, 'MICRO_LENDING_SIMULATOR_ROUTE'>
    >();

  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('0');
  const [minAmount] = useState(route.params.minAmount);
  const [amountAvailable] = useState(route.params.availableAmount);

  function setLegend(): string {
    if (amount > amountAvailable) {
      return 'Superaste el total disponible';
    }
    return `Monto mínimo $${minAmount}`;
  }

  return (
    <Container
      bottomIosScrollViewBackgroundColor="white"
      topIosScrollViewBackgroundColor="white">
      <StatusBar
        backgroundColor={colors.primaryDark[0]}
        barStyle="dark-content"
      />

      <NavBarLending
        onPressIconLeft={() => navigation.goBack()}
        onPressIconRigth={() => setOpen(e => !e)}
      />

      <LendingSimulatorTemplate
        amountAvailable={amountAvailable}
        minAmountAvailable={minAmount}
        legend={setLegend()}
        currency="$ "
        setAmount={(e: React.SetStateAction<string>) => setAmount(e)}
        amount={amount}
        onPress={() =>
          navigation.navigate('MICRO_LENDING_PROGRESS_ROUTE', {
            firstExpirationDates: route.params.firstExpirationDates,
            amount,
            productId: route.params.productId,
          })
        }
        titleBalance="Tenés disponible "
        titleInput="Ingresá el monto que necesites"
        titlePrimaryButton="Continuar"
      />
      <BackdropLening
        open={open}
        setOpen={() => setOpen(e => !e)}
        itemText={wordingSimulatorBackdrop}
        titleBackdrop="¿Cómo simulo un crédito?"
        titlePrimaryButton="Entendido"
      />
    </Container>
  );
};
