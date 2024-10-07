import {AxiosResponse} from 'axios';
import {get} from '../../../../../config';
import {
  BalanceLoanResponse,
  InstallmentsLoans,
  LendingDetailsByIdLoans,
  LendingInstallmentsByIdLoans,
  LoanResponse,
  LoanResponseError,
  LoansAlerts,
  LoansByID,
  NextInstallmentResponse,
} from '@personal-pay/design-system.flow.lending';

export const getBalanceLending = (): Promise<
  AxiosResponse<BalanceLoanResponse | LoanResponseError>
> => get('/bnpl/api/v1/loans/balance?productKey=MICROCREDITO');

export const getNextInstallmentLending = (): Promise<
  AxiosResponse<NextInstallmentResponse | LoanResponseError>
> => get('/bnpl/api/v1/loans/next-installments?productKey=MICROCREDITO');

export const getLoans = (): Promise<
  AxiosResponse<LoanResponse | LoanResponseError>
> => get('/bnpl/api/v1/loans?productKey=MICROCREDITO');

export const getLoansAlert = ({
  loanId,
}: {
  loanId: string;
}): Promise<AxiosResponse<LoansAlerts | {}>> =>
  get(`/bnpl/api/v1/client/alerts?productKey=MICROCREDITO&loanId=${loanId}`);

export const getLendingDetailsByIdLoans = ({
  idLoan,
}: LendingDetailsByIdLoans): Promise<
  AxiosResponse<LoansByID | LoanResponseError>
> => get(`/bnpl/api/v1/loans/${idLoan}`);

export const getLendinginstallmentByIdLoans = ({
  idLoan,
  installment,
}: LendingInstallmentsByIdLoans): Promise<
  AxiosResponse<InstallmentsLoans | LoanResponseError>
> => get(`/bnpl/api/v1/loans/${idLoan}/${installment}`);
