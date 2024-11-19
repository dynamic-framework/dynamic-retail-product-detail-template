import {
  DModal,
  useDPortalContext,
  DIcon,
} from '@dynamic-framework/ui-react';
import { useTranslation } from 'react-i18next';

import { SITE_URL } from '../../config/widgetConfig';
import { useMoreActions } from '../../hooks/useMoreActions';
import { useAppSelector } from '../../store/hooks';
import { getAccountSelected } from '../../store/selectors';

export default function ModalMoreActions() {
  const { closePortal } = useDPortalContext();
  const { t } = useTranslation();
  const account = useAppSelector(getAccountSelected)!;

  const getMoreActions = useMoreActions();
  const moreActions = getMoreActions(account.id);

  return (
    <DModal
      name="modalMoreActions"
      centered
    >
      <DModal.Header
        onClose={closePortal}
        showCloseButton
      >
        <h5>{t('modal.moreActions.title')}</h5>
      </DModal.Header>
      <DModal.Body>
        <div className="d-flex flex-column gap-4">
          {moreActions.map((action) => (
            <a
              key={action.text}
              className="link link-primary d-inline-flex gap-2 text-decoration-none py-2"
              href={`${SITE_URL}/${action.link}`}
            >
              <DIcon icon={action.icon} />
              <span className="flex-grow-1 text-gray-900">
                {t(action.text)}
              </span>
              <DIcon icon="chevron-right" />
            </a>
          ))}
        </div>
      </DModal.Body>
    </DModal>
  );
}
