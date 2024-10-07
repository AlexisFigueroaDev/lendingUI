import {UseQueryResult, useQuery} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';

import {
  BalanceLoanResponse,
  InstallmentData,
  LendingHomeHook,
  LendingHomeHookParams,
  LoanResponse,
  LoanResponseError,
  NextInstallmentData,
  NextInstallmentResponse,
} from './types';

const useLendingBalanceQuery = (
  getBalance: () => Promise<
    AxiosResponse<BalanceLoanResponse | LoanResponseError>
  >,
): UseQueryResult<BalanceLoanResponse | LoanResponseError> =>
  useQuery({
    queryKey: ['lending-balance-query'],
    queryFn: () => getBalance(),
    enabled: true,
    retry: 1,
    cacheTime: 0,
    initialData: undefined,
  });

export const useLendingNextInstallmentQuery = (
  getNextInstallment: () => Promise<
    AxiosResponse<NextInstallmentResponse | LoanResponseError>
  >,
): UseQueryResult<NextInstallmentResponse | LoanResponseError> =>
  useQuery({
    queryKey: ['lending-next-installment-query'],
    queryFn: () => getNextInstallment(),
    enabled: true,
    retry: 1,
    staleTime: 1 * 60 * 1000,
    initialData: undefined,
  });
const useLoansQuery = (
  getLoans: () => Promise<AxiosResponse<LoanResponse | LoanResponseError>>,
): UseQueryResult<LoanResponse[] | LoanResponseError> =>
  useQuery({
    queryKey: ['lending-loans-query'],
    queryFn: () => getLoans(),
    enabled: true,
    retry: 1,
    cacheTime: 0,
    initialData: undefined,
  });

export const useLendingHomeHook = ({
  getBalance,
  getNextInstallment,
  getLoans,
}: LendingHomeHookParams): LendingHomeHook => {
  const {
    isLoading: isLoadingBalance,
    data: dataBalance,
    isError: isErrorBalance,
  } = useLendingBalanceQuery(getBalance);

  const {
    isLoading: isLoadingInstallment,
    data: dataNextInstallment,
    isError: isErrorInstallment,
  } = useLendingNextInstallmentQuery(getNextInstallment);

  const {
    isLoading: isLoadingLoans,
    data: dataLoans,
    isError: isErrorLoans,
  } = useLoansQuery(getLoans);

  const {summary, installments} =
    dataNextInstallment && 'summary' in dataNextInstallment
      ? dataNextInstallment
      : {
          summary: {},
          installments: [],
        };

  const nextInstallmentsFormat: NextInstallmentData[] = installments.map(
    (installment: InstallmentData) => {
      const installmentReturn: NextInstallmentData = {
        amount:
          installments.length > 1 ? summary.amount ?? 0 : installment.amount,
        desc: summary.dueDate ?? '',
        title:
          installments.length > 1
            ? summary.title ?? ''
            : installment.vendorName,
      };
      return installmentReturn;
    },
  );

  const dataListCard =
    installments.length > 1
      ? [nextInstallmentsFormat[0]]
      : nextInstallmentsFormat;

  const hasError = isErrorBalance || isErrorInstallment || isErrorLoans;
  const HasLoading = isLoadingBalance || isLoadingInstallment || isLoadingLoans;

  return {
    dataBalance: dataBalance as BalanceLoanResponse,
    dataListCard,
    installments,
    dataLoans: (dataLoans && !('error' in dataLoans)
      ? dataLoans
      : []) as LoanResponse[],
    HasLoading,
    hasError,
  };
};
