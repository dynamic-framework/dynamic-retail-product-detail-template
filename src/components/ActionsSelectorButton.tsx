import {
  DIcon,
  DLayout,
  DButton,
  DButtonIcon,
} from '@dynamic-framework/ui-react';

type Props = {
  text: string;
  url?: string;
  icon: string;
  action?: () => void;
  disabled?: boolean;
  type?: 'primary' | 'danger' | 'success' | 'warning' | 'info' | 'light' | 'dark';
};

export default function ActionsSelectorButton({
  icon,
  url,
  text,
  type = 'primary',
  action,
  disabled = false,
}: Props) {
  return (
    <DLayout.Pane
      colsLg={6}
      colsXs={3}
    >
      <div className="d-none d-lg-block">
        <DButton
          variant="link"
          href={url}
          className="w-md-100 justify-content-start"
          color={type}
          onClick={action}
          disabled={disabled}
        >
          <DIcon
            color={type}
            hasCircle
            size="1rem"
            icon={icon}
          />
          <span className={`lh-1 text-wrap d-none d-md-inline text-start ${disabled ? 'opacity-50' : ''}`}>{text}</span>
        </DButton>
      </div>
      <div className="d-block d-lg-none">
        <DButtonIcon
          href={url}
          className={`w-100 bg-${type}-50 text-${type}-700 border-0 `}
          color={type}
          onClick={action}
          disabled={disabled}
          icon={icon}
        />
      </div>
    </DLayout.Pane>
  );
}
