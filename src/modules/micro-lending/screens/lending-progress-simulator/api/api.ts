import {
  LendingSimulationData,
  PostLendingSimulatorConfig,
} from '@personal-pay/design-system.flow.lending';
import {post} from '../../../../../config';

export const postLendingSimulator = async ({
  amount,
  firstExpirationDate,
  productId,
}: PostLendingSimulatorConfig): Promise<LendingSimulationData> => {
  const response = await post('/credits/api/v1/lending-simulation', {
    data: {
      amount,
      firstExpirationDate,
      productId,
    },
  });

  return response.data as LendingSimulationData;
};
