import {IllustrationKey} from '@personal-pay/design-system.ui.illustrations';
import {DynamicTextProps} from '@personal-pay/design-system.ui.text';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AxiosResponse} from 'axios';

import {LoanResponseError, NextInstallmentResponse} from '../lending-home';
import {
  ExpirationDates,
  LendingSimulatorParams,
} from '../lending-simulator/types';

type DynamicTextSingleRow = Pick<DynamicTextProps, 'onPress' | 'text'>;

export type LendingOnboardingProps = {
  illustration: IllustrationKey;
  title: string;
  description: string;
  textRows: (string | DynamicTextSingleRow)[];
  labelButton: string;
  isLoading: boolean;
  onSubmitLoading?: boolean;
  pressGoback: () => void;
  pressFooterButton: () => void;
};
export type LendingOnboardingHookProp = {
  navigation: NativeStackNavigationProp<NavigationList>;
  getNextInstallmentLending: () => Promise<
    AxiosResponse<NextInstallmentResponse | LoanResponseError>
  >;
  getLendingOnboarding: () => Promise<AxiosResponse<unknown>>;
  postLendingOnboarding: ({
    productID,
  }: PostLendingOnboardingProp) => Promise<AxiosResponse<UpdateOnboardingRes>>;
};

export type PostLendingOnboardingProp = {
  productID: string;
};
export type NavigationList = {
  MICRO_LENDING_SIMULATOR_ROUTE: LendingSimulatorParams;
  MICRO_LENDING_HOME_ROUTE: LendingSimulatorParams;
};

export type DataMicroLending = {
  data: Data;
};

interface Data {
  product: string;
  title: string;
  description: string;
  itemsRows: ItemsRow[];
  buttonPrimary: string;
  illustration: IllustrationKey;
  navigation: string;
  idProducts?: string;
  onboarding?: boolean;
  availableAmount?: string;
  minAmount?: string;
  firstExpirationDates?: ExpirationDates[];
}

interface ItemsRow {
  text: string;
}

export type Wording = {
  title: string;
  description: string;
  illustration: IllustrationKey;
  buttonPrimary: string;
  itemsRows: ItemsRow[];
};

export type UpdateOnboardingRes = {
  statusCode: number;
};
