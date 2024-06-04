import { DIcon, DInputSwitch, useDPortalContext } from '@dynamic-framework/ui-react';
import { useCallback } from 'react';

import ActionsSelectorButton from './ActionsSelectorButton';

type Props = {
  text: string;
  url: string;
  icon: string;
};

export default function ItemActions(
  {
    icon,
    url,
    text,
  }: Props,
) {
  const { openPortal } = useDPortalContext();

  const handlerInfoCard = useCallback(() => {
    openPortal('modalCardInformation', undefined);
  }, [openPortal]);

  return (
    <div className="d-flex flex-column gap-4">
      <div className="d-flex gap-3">
        <label
          htmlFor="freezeCard"
          className="d-inline-flex align-items-center gap-3 flex-grow-1 fs-6"
        >
          <DIcon icon="snow" />
          Freeze card
        </label>
        <DInputSwitch
          id="freezeCard"
          checked={false}
        />
      </div>
      <hr className="m-0" />
      <div className="d-flex justify-content-between flex-wrap gap-4">
        <ActionsSelectorButton
          text={text}
          icon={icon}
          url={url}
        />
        <ActionsSelectorButton
          text="View card info"
          icon="eye"
          action={() => openPortal('modalOTP', { callback: handlerInfoCard })}
        />
        <ActionsSelectorButton
          text="Block"
          icon="ban"
          action={() => {}}
        />
        <ActionsSelectorButton
          text="More actions"
          icon="three-dots-vertical"
          action={() => openPortal('modalMoreActions', undefined)}
        />
      </div>
    </div>
  );
}
