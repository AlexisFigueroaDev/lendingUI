/* eslint-disable no-use-before-define */
import { AccordionProps } from '@personal-pay/design-system.ui.accordion';
import { ScreenAlertVariantKeys } from '@personal-pay/design-system.ui.alert';
import { DataListProps } from '@personal-pay/design-system.ui.card';
import { Step } from '@personal-pay/design-system.ui.progress';
import {
  DoubleLineRowProps,
  SingleRowType,
  ActivityRowProps,
} from '@personal-pay/design-system.ui.row';
import { AxiosResponse, HttpStatusCode } from 'axios';

import { LendingSimulatorParams } from '../lending-simulator/types';

// LOANS RESPONSE ERROR
export interface LoanResponseError {
  status: HttpStatusCode;
  message: string | MessageError;
}

interface MessageError {
  title: string;
  description: string;
}

// Navegation
export type NavigationListHomeLending = {
  MICRO_LENDING_HOME_DETAIL_ROUTE: MicroLendingHomeDetailsParams;
  MICRO_LENDING_HOME_DETAIl_INSTALLMENT_ROUTE: MicroLendingHomeDetailsInstallmentParams;
  MICRO_LENDING_SIMULATOR_ROUTE: LendingSimulatorParams;
};

type MicroLendingHomeDetailsInstallmentParams = {
  idLoan: string;
  installment: number;
};
type MicroLendingHomeDetailsParams = {
  idLoan: string;
};

interface DataActivityRow extends ActivityRowProps {
  id: string;
}

// Home Lending
export type LendingHomeTemplateProps = {
  titleAmountCard: string;
  balanceAmount: number;
  currencyAmount: string;
  descriptionAmountCard?: string;
  balanceAmountUsedCard: number;
  isLoading: boolean;

  dataListCard?: Pick<
    DataListProps,
    'title' | 'amount' | 'date' | 'description'
  >[];
  onPressListCard?: (e: DataListProps) => void;
  titleDataListCard?: string;
  titleLending?: string;
  dataActivityRow?: DataActivityRow[];
  emptyDescription: string;
  titlePrimaryButton: string;
  onPressPrimaryButton: () => void;
};

export interface LoansAlerts {
  title: string;
  description: string;
  criticality: ScreenAlertVariantKeys;
}

export type LendingHomeDetailsTemplateProps = {
  dataAccordion: AccordionProps;
  titleDetailCard: string;
  dataActivityRowDetails?: ActivityRowProps[];
  progressStepsDetails: Step[];
  titleProgressStepsDetails: string;
  isLoading: boolean;
  alert: LoansAlerts;
};

export type LendingHomeInstallmentsTemplateProps = {
  dataAccordionInstallments: Pick<
    AccordionProps,
    'icon' | 'title' | 'dataAccordion'
  >;
  subTitle: Pick<SingleRowType, 'title' | 'rightTitle'>;
  primaryBaseCard: PrimaryBaseCardProps &
    Pick<
      DoubleLineRowProps,
      'title' | 'description' | 'pillTitle' | 'pillVariant'
    >;
  secondaryBaseCard: SecondaryBaseCardProps;
  isLoading: boolean;
};

type PrimaryBaseCardProps = {
  titleMethodPayment: string;
  descriptionMethodPayment: string;
};

type SecondaryBaseCardProps = {
  title: string;
  description: string;
  amount: string;
  labelButton: string;
  onPress: () => void;
};

// Home Lending Hooks
export interface LendingHomeHook {
  dataBalance: BalanceLoanResponse;
  dataListCard: NextInstallmentData[];
  installments: InstallmentData[];
  dataLoans: LoanResponse[];
  HasLoading: boolean;
  hasError: boolean;
}
export interface LendingHomeHookParams {
  getBalance: () => Promise<
    AxiosResponse<BalanceLoanResponse | LoanResponseError>
  >;
  getNextInstallment: () => Promise<
    AxiosResponse<NextInstallmentResponse | LoanResponseError>
  >;
  getLoans: () => Promise<AxiosResponse<LoanResponse | LoanResponseError>>;
}

export interface BalanceLoanResponse {
  arrangedAmount: number;
  availableCredit: number;
  balanceAmount: number;
}

export interface InstallmentData {
  loanId: string;
  number: number;
  vendorName: string;
  dueDate: string;
  amount: number;
}

export interface NextInstallmentData {
  title: string;
  amount: number;
  desc: string;
  icon?: 'Success';
}

export interface NextInstallmentResponse {
  summary: Summary;
  installments: Installment[];
}

export interface Installment {
  loanId: string;
  number: number;
  vendorName: string;
  dueDate: string;
  amount: number;
}

export interface Summary {
  title: string;
  dueDate: string;
  description: string;
  amount: number;
}

export interface LoanResponse {
  title: string;
  description: string;
  amount: number;
  status: string;
  id: string;
  nextInstallment: NextInstallment;
  numberInstallmentPaid: number;
  installmentsQuantity: number;
  loanStatus: LoanStatusLoanResponse;
}

export interface LoanStatusLoanResponse {
  title: string;
  color: ActivityRowProps['pillVariant'];
  current: string;
}

interface NextInstallment {
  date: string;
  amount: number;
}

// HOME LENDING DETAILS HOOK

export interface LendingHomeDetailsHook {
  isLoading: boolean;
  data: LoansByID;
  isError: boolean;
  isLoadingAlert: boolean;
  dataAlerts: LoansAlerts;
  isErrorAlert: boolean;
}
export interface LendingHomeDetailsHookParams {
  getLoansById: () => Promise<AxiosResponse<LoansByID | LoanResponseError>>;
  getAlerts: () => Promise<AxiosResponse<LoansAlerts | unknown>>;
}

export interface LendingDetailsByIdLoans {
  idLoan: string;
}

export interface LendingInstallmentsByIdLoans extends LendingDetailsByIdLoans {
  installment: number;
}

export interface LoansByID {
  title: string;
  canceledAmount: number;
  pendingAmount: number;
  id: string;
  vendorName: string;
  amount: number;
  date: string;
  payMode: string;
  rates: Rates;
  createdAt: Date;
  updatedAt: Date;
  installments: InstallmentLoanByID[];
  notifications: unknown[];
  status: LoansByIDStatus;
}

export interface InstallmentLoanByID {
  loanId: string;
  number: number;
  title: string;
  amount: number;
  status: InstallmentStatus;
  paymentDate: string;
  paymentDateStr: string;
}

export interface InstallmentStatus {
  type: string;
  name: string;
  colorIcon: string;
  icon: string;
}

export interface Rates {
  CFT: number;
  TEA: number;
  TEM: number;
  TNA: number;
  CFTNA: number;
  CFTTEA: number;
}

export interface LoanByIDResponseStatus {
  id: number;
  type: string;
  name: string;
  style: string;
  createdAt: Date;
  updatedAt: Date;
  subtype: string;
}

export interface LoansByIDStatus {
  id: number;
  type: string;
  name: string;
  style: string;
  createdAt: Date;
  updatedAt: Date;
  subtype: string;
}

// HOME LENDING INSTALLMENTS
export interface LendingHomeinstallmentHook {
  isLoading: boolean;
  data: InstallmentsLoans;
  isError: boolean;
}
export interface LendingHomeinstallmentHookParams {
  getLendingInstallmentByIdLoans: () => Promise<
    AxiosResponse<InstallmentsLoans | LoanResponseError>
  >;
}

export interface LendingInstallmentResponse {
  loanId: string;
  amount: string;
  installmentAmount: string;
  vendorName: string;
  dateOfBuy: string;
  dueDate: string;
  paymentDate: string;
  payMode: string;
  number: number;
  progress: string;
  status: Status;
  delayedDays: number;
  allowsToPay: boolean;
  loanStatus: LoanStatus;
  amountDetail: AmountDetail;
  dataAccordion: DataAccordion[];
}

export interface LoanStatus {
  id: number;
  type: string;
  name: string;
  style: string;
  createdAt: Date;
  updatedAt: Date;
  subtype: string;
}

export interface Status {
  name: string;
  style: string;
  type: string;
}

export interface InstallmentsLoans {
  loanId: string;
  amount: string;
  installmentAmount: string;
  vendorName: string;
  dateOfBuy: string;
  dueDate: string;
  paymentDate: string;
  payMode: string;
  number: number;
  progress: string;
  status: Status;
  delayedDays: number;
  allowsToPay: boolean;
  loanStatus: LoanStatus;
  amountDetail: AmountDetail;
  dataAccordion: DataAccordion[];
}

export interface AmountDetail {
  capital: string;
  interesesPercibido: string;
  totalIVA: string;
}

export interface DataAccordion {
  left: string;
  right: string;
}
