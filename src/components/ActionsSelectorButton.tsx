import { DButton, DIcon } from '@dynamic-framework/ui-react';

type Props = {
  text: string;
  url?: string;
  icon: string;
  action?: () => void;
};

export default function ActionsButton({
  icon,
  url,
  text,
  action,
}: Props) {
  return (
    <div className="d-flex flex-column gap-2 col">
      {url && (
        <a
          className="btn btn-primary rounded-pill p-3 mx-auto"
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
        />
      )}
      <small className="text-wrap text-center">{text}</small>
    </div>
  );
}
