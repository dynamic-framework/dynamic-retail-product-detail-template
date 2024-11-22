import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';

import { FORMAT_DATE } from '../config/widgetConfig';
import useCVC from '../hooks/useCVC';

import ItemCardInfo from './ItemCardInfo';
import CircularLoaderWithTimer from './loaders/CircularLoaderWitTimer';

const DURATION = 20;

type Props = {
  expiryDate?: string;
};

export default function ItemCardInfoCVC({ expiryDate }: Props) {
  const { cvc, secondsLeft } = useCVC(DURATION);
  const { t } = useTranslation();

  return (
    <>
      <ItemCardInfo
        name={t('cardInfo.validUntil')}
        value={expiryDate ? DateTime.fromISO(expiryDate).toFormat(FORMAT_DATE) : '-'}
      />
      <ItemCardInfo
        name={t('cardInfo.cvc')}
        value={cvc}
      />
      <div className="d-flex gap-2">
        <CircularLoaderWithTimer
          size={20}
          duration={DURATION}
        />
        <p className="text-gray-500">
          {t('cardInfo.cvcWillChange', { value: secondsLeft })}
        </p>
      </div>
    </>
  );
}
