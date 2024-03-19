import { DButton } from '@dynamic-framework/ui-react';

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
  return (
    <div className="d-flex flex-column gap-4">
      <DButton
        text={primaryText}
        iconEnd={primaryIcon}
        pill
        className="m-auto"
        onClick={primaryAction}
      />
      <div className="d-flex align-items-center justify-content-between">
        <DButton
          text={secondaryText}
          iconStart={secondaryIcon}
          variant="link"
          theme="secondary"
          pill
          onClick={secondaryAction}
        />
        <DButton
          text={tertiaryText}
          iconStart={tertiaryIcon}
          variant="link"
          theme="secondary"
          pill
          onClick={tertiaryAction}
        />
      </div>
    </div>
  );
}
