import {
  LendingSimulationData,
  PostLendingSimulatorConfig,
} from '../../../../../bit/lending/lending-simulator';
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
