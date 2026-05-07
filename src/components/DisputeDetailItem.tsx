import { DBadge } from '@dynamic-framework/ui-react';
import { Trans } from 'react-i18next';

type Props = {
  i18nKey: string,
  value?: string,
};

export default function DisputeDetailItem(
  {
    i18nKey,
    value,
  }: Props,
) {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <Trans
        i18nKey={i18nKey}
        values={{ value }}
        components={{
          bld: <strong />,
          cmp: <DBadge
            soft
            color="success"
          />,
        }}
      />
    </div>
  );
}
