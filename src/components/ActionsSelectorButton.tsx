import { DIcon } from '@dynamic-framework/ui-react';
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
            'btn btn-link w-100 p-0 justify-content-start text-gray-700 hover:text-primary',
            { disabled },
          )}
          href={url}
        >
          <DIcon
            color="primary"
            hasCircle
            className="rounded"
            size="1.5rem"
            icon={icon}
          />
          <small className={`lh-1 text-wrap text-start ${disabled ? 'opacity-50' : ''}`}>{text}</small>
        </a>
      )}
      {!url && (
        <button
          type="button"
          className="btn btn-link p-0 w-100 justify-content-start text-gray-700 hover:text-primary"
          onClick={action}
          disabled={disabled}
        >
          <DIcon
            color="primary"
            hasCircle
            className="rounded"
            size="1.5rem"
            icon={icon}
          />
          <small className={`lh-1 text-wrap text-start ${disabled ? 'opacity-50' : ''}`}>{text}</small>
        </button>
      )}
    </div>
  );
}
