import {
  PostLendingConfirmResponse,
  PostLendingSimulatorConfirm,
} from '../../../../../bit/lending/lending-simulator/lending-simulator-resumen/types';
import {post} from '../../../../../config';

export const postLendingConfirm = async ({
  installmentPlanId,
}: PostLendingSimulatorConfirm): Promise<PostLendingConfirmResponse> => {
  console.log('installmentPlanId', typeof installmentPlanId);
  const response = await post('/credits/api/v1/lending/confirm', {
    data: {installmentPlanId},
  });

  return response.data as PostLendingConfirmResponse;
};
