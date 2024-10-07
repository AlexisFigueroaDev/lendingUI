import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import {
  InstallmentsLoans,
  LendingHomeinstallmentHook,
  LendingHomeinstallmentHookParams,
  LoanResponseError,
} from './types';

const useLendingLoanInstallmentQuery = (
  getLendingInstallmentByIdLoans: () => Promise<
    AxiosResponse<InstallmentsLoans | LoanResponseError>
  >,
): UseQueryResult<InstallmentsLoans | LoanResponseError> =>
  useQuery({
    queryKey: ['lending-loans-installment-query'],
    queryFn: () => getLendingInstallmentByIdLoans(),
    enabled: true,
    retry: 1,
    cacheTime: 0,
    initialData: undefined,
  });

export const useLendingHomeinstallmentHook = ({
  getLendingInstallmentByIdLoans,
}: LendingHomeinstallmentHookParams): LendingHomeinstallmentHook => {
  const { data, isLoading, isError } = useLendingLoanInstallmentQuery(
    getLendingInstallmentByIdLoans,
  );

  return {
    isLoading,
    data: data as InstallmentsLoans,
    isError,
  };
};
