import {AxiosResponse} from 'axios';
import {
  PostLendingOnboardingProp,
  UpdateOnboardingRes,
} from '../../../../../bit/lending/lending-onboarding/types';
import {get, patch} from '../../../../../config';
import {
  LoanResponseError,
  NextInstallmentResponse,
} from '../../../../../bit/lending';

export const getLendingOnboarding = (): Promise<AxiosResponse<unknown>> =>
  get(
    '/credits/api/v1/lending-information?productKey=MICROCREDITO&withBalance=true',
  );

export const postLendingOnboarding = async ({
  productID,
}: PostLendingOnboardingProp): Promise<AxiosResponse<UpdateOnboardingRes>> => {
  return patch(`/credits/api/v1/update-onboarding/${productID}`, {
    data: {onboarding: true},
  });
};

export const getNextInstallmentLending = (): Promise<
  AxiosResponse<NextInstallmentResponse | LoanResponseError>
> => get('/bnpl/api/v1/loans/next-installments?productKey=MICROCREDITO');
