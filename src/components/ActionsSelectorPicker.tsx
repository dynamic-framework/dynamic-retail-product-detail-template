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
  return (
    <div className="d-flex flex-column gap-4">
      <hr className="m-0" />
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
          text="More actions"
          icon="three-dots-vertical"
          action={() => {}}
        />
      </div>
    </div>
  );
}
