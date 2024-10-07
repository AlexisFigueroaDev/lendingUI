import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import {
  LendingHomeDetailsHook,
  LendingHomeDetailsHookParams,
  LoanResponseError,
  LoansAlerts,
  LoansByID,
} from './types';

const useLendingLoanByIdQuery = (
  getLoansById: () => Promise<AxiosResponse<LoansByID | LoanResponseError>>,
): UseQueryResult<LoansByID | LoanResponseError> =>
  useQuery({
    queryKey: ['lending-loans-by-id-query'],
    queryFn: () => getLoansById(),
    enabled: true,
    retry: 1,
    cacheTime: 0,
    initialData: undefined,
  });

const useLoansAlertQuery = (
  getAlerts: () => Promise<AxiosResponse<LoansAlerts | unknown>>,
): UseQueryResult<LoansAlerts | unknown> =>
  useQuery({
    queryKey: ['lending-loans-alert-query'],
    queryFn: () => getAlerts(),
    enabled: true,
    retry: 1,
    cacheTime: 0,
    initialData: undefined,
  });

export const useLendingHomeDetailsHook = ({
  getLoansById,
  getAlerts,
}: LendingHomeDetailsHookParams): LendingHomeDetailsHook => {
  const { data, isLoading, isError } = useLendingLoanByIdQuery(getLoansById);

  const {
    isLoading: isLoadingAlert,
    data: dataAlerts,
    isError: isErrorAlert,
  } = useLoansAlertQuery(getAlerts);

  return {
    isLoading,
    data: data as LoansByID,
    isError,
    isLoadingAlert,
    dataAlerts: dataAlerts as LoansAlerts,
    isErrorAlert,
  };
};
