import { DButton, DIcon } from '@dynamic-framework/ui-react';
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
    <div className="d-flex flex-column gap-2 col">
      {url && (
        <a
          className={classNames(
            'btn btn-primary rounded-pill p-3 mx-auto',
            { disabled },
          )}
          href={url}
        >
          <DIcon icon={icon} />
        </a>
      )}
      {!url && (
        <DButton
          iconEnd={icon}
          className="p-3 mx-auto"
          onClick={action}
          disabled={disabled}
        />
      )}
      <small className="text-wrap text-center">{text}</small>
    </div>
  );
}
