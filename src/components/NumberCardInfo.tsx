import { DButton } from '@dynamic-framework/ui-react';
import { useTranslation } from 'react-i18next';

type Props = {
  cardNumber: string;
};

export default function NumberCardInfo({ cardNumber }: Props) {
  const { t } = useTranslation();
  return (
    <div className="d-flex w-100 align-items-center">
      <span className="flex-1">{cardNumber}</span>
      <DButton
        onClick={() => navigator.clipboard.writeText(cardNumber)}
        className="ml-auto"
        text={t('card.copy')}
        theme="secondary"
        iconStart="copy"
        variant="link"
      />
    </div>
  );
}
