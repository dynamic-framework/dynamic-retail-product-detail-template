import {
  DIcon,
  DInputSwitch,
  useDPortalContext,
} from '@dynamic-framework/ui-react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { PRODUCT_BLOCK_PATH, SITE_URL } from '../config/widgetConfig';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getAccountSelected, getAccountsFreezed } from '../store/selectors';
import { setAccountsFreezed } from '../store/slice';

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

  const account = useAppSelector(getAccountSelected)!;
  const accountsFreezed = useAppSelector(getAccountsFreezed);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const updateAccounts = (isFreezed: boolean) => {
    if (account) {
      dispatch(setAccountsFreezed({ [account.id]: isFreezed }));
    }
  };

  return (
    <div className="d-flex flex-column gap-4">
      <div className="d-flex gap-3">
        <label
          htmlFor="freezeCard"
          className="d-inline-flex align-items-center gap-3 flex-grow-1 fs-6"
        >
          <DIcon icon="snow" />
          {t('freezeCard')}
        </label>
        <DInputSwitch
          onChange={(isFreezed) => updateAccounts(isFreezed)}
          id="freezeCard"
          checked={accountsFreezed[account.id]}
        />
      </div>
      <hr className="m-0 border-light" />
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
          url={`${SITE_URL}/${PRODUCT_BLOCK_PATH}`}
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
