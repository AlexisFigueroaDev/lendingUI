import {useState} from 'react';

import {LendingSimulatorResumenProps, ToogleProps} from './types';

export const useLendingSimulatorResumen = ({
  navigation,
  firstExpirationDates,
  tooglesPlans,
  mutateFn,
  amount,
  productId,
}: LendingSimulatorResumenProps) => {
  const [index, setIndex] = useState(0);

  const [selectedExpirationDate, setSelectedExpirationDate] = useState(
    firstExpirationDates[0].date,
  );

  const [toogle, setToogle] = useState<ToogleProps[]>(
    firstExpirationDates.length > 1
      ? firstExpirationDates.map((plan, idx) => ({
          title: `${plan.value} días` || '',
          isDisabled: idx === 0 ? !plan.isDisabled : false,
          date: plan.date || '',
          onPress: () => handlePress(idx),
        }))
      : tooglesPlans.map((plan, idx) => ({
          title: plan.title,
          isDisabled: idx === 0 ? !plan.isDisabled : false,
          date: '',
          onPress: () => handlePress(idx),
        })) || [],
  );

  const handlePress = (idx: number) => {
    setToogle(prevToogle => {
      const updatedToogle = prevToogle.map((option, i) => ({
        ...option,
        isDisabled: i === idx ? !option.isDisabled : false,
      }));

      if (firstExpirationDates.length === 1) {
        setIndex(idx);
      } else {
        const selectedDate = updatedToogle.find(e => e.isDisabled)?.date || '';
        setSelectedExpirationDate(selectedDate);
        mutateFn(
          {
            amount: parseInt(amount, 10),
            firstExpirationDate: selectedDate,
            productId: parseInt(productId, 10),
          },
          {
            onError: () => {
              navigation.replace('MICRO_LENDING_ONBOARDING_ROUTE');
            },
          },
        );
      }

      return updatedToogle;
    });
  };

  return {
    index,
    selectedExpirationDate,
    toogle,
  };
};
