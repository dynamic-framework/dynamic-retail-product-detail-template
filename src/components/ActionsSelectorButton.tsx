import { DIcon, DLayout } from '@dynamic-framework/ui-react';
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
    <DLayout.Pane
      colsLg={6}
      colsXs={3}
      className="d-flex gap-2 justify-content-center align-items-center"
    >
      {url && (
        <a
          className={classNames(
            'btn btn-link w-md-100 p-0 justify-content-start text-gray-700 hover:text-primary',
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
          <small className={`lh-1 text-wrap text-start d-none d-md-inline ${disabled ? 'opacity-50' : ''}`}>{text}</small>
        </a>
      )}
      {!url && (
        <button
          type="button"
          className="btn btn-link p-0 w-md-100 justify-content-start text-gray-700 hover:text-primary"
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
          <small className={`lh-1 text-wrap d-none d-md-inline text-start ${disabled ? 'opacity-50' : ''}`}>{text}</small>
        </button>
      )}
    </DLayout.Pane>
  );
}
