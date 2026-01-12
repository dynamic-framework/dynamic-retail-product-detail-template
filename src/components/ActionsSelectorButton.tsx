import { DButtonIcon, DIcon } from '@dynamic-framework/ui-react';
import classNames from 'classnames';

type Props = {
  text: string;
  url?: string;
  icon: string;
  action?: () => void;
  disabled?: boolean;
};

export default function ActionsButton({
  icon,
  url,
  text,
  action,
  disabled = false,
}: Props) {
  return (
    <div className="d-flex flex-column gap-2 col align-items-center">
      {url && (
        <a
          className={classNames(
            'btn btn-primary p-3 mx-auto',
            { disabled },
          )}
          href={url}
        >
          <DIcon icon={icon} />
        </a>
      )}
      {!url && (
        <DButtonIcon
          icon={icon}
          onClick={action}
          disabled={disabled}
        />
      )}
      <small className="text-wrap text-center">{text}</small>
    </div>
  );
}
