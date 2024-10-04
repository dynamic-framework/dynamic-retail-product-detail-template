import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';

import useCVC from '../hooks/useCVC';

import ItemCardInfo from './ItemCardInfo';
import CircularLoaderWidthTimer from './loaders/CircularLoaderWithTimer';

const DURATION = 20;

type Props = {
  expiryDate?: string;
};

export default function ItemCardInfoCVC({ expiryDate }: Props) {
  const cvc = useCVC(DURATION);
  const { t } = useTranslation();

  return (
    <>
      <ItemCardInfo
        name={t('cardInfo.validUntil')}
        value={expiryDate ? DateTime.fromISO(expiryDate).toFormat('MM/yy') : '-'}
      />
      <ItemCardInfo name={t('cardInfo.cvc')} value={cvc.cvc} />
      <div className="d-flex gap-2">
        <CircularLoaderWidthTimer size={20} duration={DURATION} />
        <p className="text-gray-500">
         {t('cardInfo.cvcWillChange')}
         {' '}
         {${cvc.secondsLeft}}
         {' '} 
         {t('cardInfo.seconds')}
        </p>
      </div>
    </>
  );
}
