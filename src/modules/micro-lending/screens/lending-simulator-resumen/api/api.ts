import {
  PostLendingConfirmResponse,
  PostLendingSimulatorConfirm,
} from '@personal-pay/design-system.flow.lending';

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
