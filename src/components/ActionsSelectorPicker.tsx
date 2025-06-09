import { useTranslation } from 'react-i18next';

import ActionsSelectorButton from './ActionsSelectorButton';

type Props = {
  primaryText: string;
  primaryIcon: string;
  primaryAction: () => void;
  secondaryText: string;
  secondaryIcon: string;
  secondaryAction: () => void;
  tertiaryText: string;
  tertiaryIcon: string;
  tertiaryAction: () => void;
};
export default function ItemActions({
  primaryText,
  primaryIcon,
  primaryAction,
  secondaryText,
  secondaryIcon,
  secondaryAction,
  tertiaryText,
  tertiaryIcon,
  tertiaryAction,
}: Props) {
  const { t } = useTranslation();
  return (
    <div className="d-flex flex-column gap-4">
      <hr className="m-0 border-light" />
      <div className="d-flex justify-content-between flex-wrap gap-4">
        <ActionsSelectorButton
          text={primaryText}
          icon={primaryIcon}
          action={primaryAction}
        />
        <ActionsSelectorButton
          text={secondaryText}
          icon={secondaryIcon}
          action={secondaryAction}
        />
        <ActionsSelectorButton
          text={tertiaryText}
          icon={tertiaryIcon}
          action={tertiaryAction}
        />
        <ActionsSelectorButton
          text={t('collapse.actions.moreActions')}
          icon="three-dots-vertical"
          action={() => { }}
        />
      </div>
    </div>
  );
}
