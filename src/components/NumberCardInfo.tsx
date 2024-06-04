import { DButton } from '@dynamic-framework/ui-react';

type Props = {
  cardNumber: string;
};

export default function NumberCardInfo({ cardNumber }: Props) {
  return (
    <div className="d-flex w-100 align-items-center">
      <span className="flex-1">{cardNumber}</span>
      <DButton
        onClick={() => navigator.clipboard.writeText(cardNumber)}
        className="ml-auto"
        text="Copy"
        theme="secondary"
        iconStart="copy"
        variant="link"
      />
    </div>
  );
}
