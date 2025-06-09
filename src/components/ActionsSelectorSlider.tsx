import {
  DIcon,
  DInputSwitch,
  useDPortalContext,
} from '@dynamic-framework/ui-react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { PRODUCT_BLOCK_PATH, SITE_URL } from '../config/widgetConfig';
import useFreezeCardCallback from '../services/hooks/useFreezeCardCallback';
import { useAppSelector } from '../store/hooks';
import { getAccountSelected, getAccountsFreezed } from '../store/selectors';

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
  const { t } = useTranslation();
  const account = useAppSelector(getAccountSelected)!;
  const accountsFreezed = useAppSelector(getAccountsFreezed);
  const { openPortal } = useDPortalContext();
  const { loading, freezeCard } = useFreezeCardCallback();

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
          {t('freezeCard')}
        </label>
        <DInputSwitch
          onChange={(isFreezed) => freezeCard(account.id, isFreezed)}
          id="freezeCard"
          checked={accountsFreezed[account.id]}
          disabled={loading}
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
          text={t('collapse.actions.viewCardInfo')}
          icon="eye"
          action={() => openPortal('modalOTP', { callback: handlerInfoCard })}
          disabled={accountsFreezed[account.id]}
        />
        <ActionsSelectorButton
          text={t('collapse.actions.block')}
          icon="ban"
          url={`${SITE_URL}/${PRODUCT_BLOCK_PATH}?card_id=${account.id}`}
          disabled={accountsFreezed[account.id]}
        />
        <ActionsSelectorButton
          text={t('collapse.actions.moreActions')}
          icon="three-dots-vertical"
          action={() => openPortal('modalMoreActions', undefined)}
        />
      </div>
    </div>
  );
}
