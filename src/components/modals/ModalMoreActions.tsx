/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  DModal,
  useDPortalContext,
  DIcon,
} from '@dynamic-framework/ui-react';
import { useTranslation } from 'react-i18next';

const MORE_ACTIONS = [
  {
    text: 'modal.moreActions.bankStatements',
    link: '#',
    icon: 'file-text',
  },
  {
    text: 'modal.moreActions.cashAdvance',
    link: '#',
    icon: 'cash-coin',
  },
  {
    text: 'modal.moreActions.managePayments',
    link: '#',
    icon: 'receipt',
  },
  {
    text: 'modal.moreActions.changeDate',
    link: '#',
    icon: 'calendar-date',
  },
];

export default function ModalMoreActions() {
  const { closePortal } = useDPortalContext();
  const { t } = useTranslation();

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
          {MORE_ACTIONS.map((action) => (
            <a
              key={action.text}
              className="link link-primary d-inline-flex gap-2 text-decoration-none py-2"
              href={action.link}
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
