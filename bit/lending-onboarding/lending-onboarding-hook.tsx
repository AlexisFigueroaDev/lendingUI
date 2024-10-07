import {useEffect, useState} from 'react';

import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';

import type {
  DataMicroLending,
  LendingOnboardingHookProp,
  PostLendingOnboardingProp,
  UpdateOnboardingRes,
  Wording,
} from './types';
import {useLendingNextInstallmentQuery} from '../lending-home';

export const useLendingOnboardingQuery = (
  getLendingOnboarding: () => Promise<AxiosResponse<unknown>>,
): UseQueryResult<DataMicroLending> =>
  useQuery({
    queryKey: ['lending-onboarding-query'],
    queryFn: () => getLendingOnboarding(),
    enabled: true,
    retry: 1,
    cacheTime: 0,
    initialData: undefined,
  });

const useUpdateOnboarding = (
  postLendingOnboarding: ({
    productID,
  }: PostLendingOnboardingProp) => Promise<
    AxiosResponse<UpdateOnboardingRes, any>
  >,
): UseMutationResult<
  AxiosResponse<UpdateOnboardingRes>,
  unknown,
  PostLendingOnboardingProp,
  unknown
> => useMutation(postLendingOnboarding);

export const useLendingOnboardingHook = ({
  navigation,
  getLendingOnboarding,
  postLendingOnboarding,
  getNextInstallmentLending,
}: LendingOnboardingHookProp): {
  isLoading: boolean;
  isError: boolean;
  wording: Wording;
  onSubmit: () => void;
  isLoadingUpdate: boolean;
  data: DataMicroLending | undefined;
} => {
  const {
    data,
    isError,
    isLoading: isLoadingData,
  } = useLendingOnboardingQuery(getLendingOnboarding);

  const {data: dataLending} = useLendingNextInstallmentQuery(
    getNextInstallmentLending,
  );

  const {mutate, isLoading: isLoadingUpdate} = useUpdateOnboarding(
    postLendingOnboarding,
  );

  const [productID, setProductID] = useState<string>('0');
  const [wording, setWording] = useState<Wording>({
    description: '',
    itemsRows: [
      {
        text: '',
      },
      {
        text: '',
      },
      {
        text: '',
      },
    ],
    illustration: 'Rocket',
    buttonPrimary: '',
    title: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(isLoadingData);

  const onSubmit = () => {
    if (productID === '0') {
      navigation.goBack();
    } else {
      mutate(
        {productID},
        {
          onSuccess: () => {
            navigation.navigate('MICRO_LENDING_HOME_ROUTE', {
              availableAmount: data?.data.availableAmount || '0',
              minAmount: data?.data.minAmount || '0',
              firstExpirationDates: data?.data.firstExpirationDates || [{}],
              productId: data?.data.idProducts || '0',
            });
          },
          onError: error => {
            console.log('Error en la mutación', error);
          },
        },
      );
    }
  };

  useEffect(() => {
    if (!data && isError) {
      setIsLoading(false);
      navigation.goBack();
    }

    if (data) {
      const {summary, installments} =
        dataLending && 'summary' in dataLending
          ? dataLending
          : {
              summary: {amount: 0},
              installments: [],
            };

      if (data.data.onboarding) {
        if (installments.length >= 0 && summary.amount >= 0) {
          navigation.replace('MICRO_LENDING_HOME_ROUTE', {
            availableAmount: data?.data.availableAmount || '0',
            minAmount: data?.data.minAmount || '0',
            firstExpirationDates: data?.data.firstExpirationDates || [{}],
            productId: data?.data.idProducts || '0',
          });
        }
      }

      setIsLoading(false);
      const {
        title,
        description,
        illustration,
        buttonPrimary,
        itemsRows,
        idProducts,
      } = data.data;

      setProductID(idProducts || '0');
      setWording({
        title,
        description,
        illustration,
        buttonPrimary,
        itemsRows,
      });
    }
  }, [data, navigation, isError, isLoading, isLoadingUpdate, dataLending]);

  return {
    data,
    wording,
    isLoading,
    isError,
    onSubmit,
    isLoadingUpdate,
  };
};
