import { MButton } from '@dynamic-framework/ui-react';

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
    <div className="d-flex flex-column gap-3">
      <MButton
        text={primaryText}
        iconEnd={primaryIcon}
        isPill
        className="m-auto"
        onMClick={primaryAction}
      />
      <div className="d-flex align-items-center justify-content-between">
        <MButton
          text={secondaryText}
          iconStart={secondaryIcon}
          variant="link"
          theme="secondary"
          isPill
          onMClick={secondaryAction}
        />
        <MButton
          text={tertiaryText}
          iconStart={tertiaryIcon}
          variant="link"
          theme="secondary"
          isPill
          onMClick={tertiaryAction}
        />
      </div>
    </div>
  );
}
