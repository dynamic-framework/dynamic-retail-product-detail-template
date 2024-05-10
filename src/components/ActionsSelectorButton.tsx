import { DButton, DIcon } from '@dynamic-framework/ui-react';

type Props = {
  text: string;
  path?: string;
  icon: string;
  action?: () => void;
};

export default function ActionsButton({
  icon,
  path,
  text,
  action,
}: Props) {
  return (
    <div className="d-flex flex-column gap-2 col">
      {path && (
        <a
          className="btn btn-primary rounded-pill p-3 mx-auto"
          href={path}
        >
          <DIcon icon={icon} />
        </a>
      )}
      {!path && (
        <DButton
          iconEnd={icon}
          className="p-3 mx-auto"
          onClick={action}
        />
      )}
      <small className="text-wrap text-center">{text}</small>
    </div>
  );
}
