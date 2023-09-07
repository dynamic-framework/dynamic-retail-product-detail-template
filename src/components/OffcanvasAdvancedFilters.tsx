import {
  DButton,
  DIcon,
  DInput,
  DInputCheck,
  DInputCurrency,
  DOffcanvas,
  OffcanvasProps,
} from '@dynamic-framework/ui-react';
import { useTranslation } from 'react-i18next';

export default function OffcanvasAdvancedFilters({ closeOffcanvas }: OffcanvasProps) {
  const { t } = useTranslation();

  return (
    <DOffcanvas
      name="advancedFilters"
      openFrom="end"
      showCloseButton
      isStatic
      onEventClose={() => closeOffcanvas()}
    >
      <div slot="header">
        <div className="d-flex align-items-center gap-2">
          <DIcon icon="filter" size="24px" className="p-2" />
          <h5 className="fw-bold">{t('filter.title')}</h5>
        </div>
      </div>
      <div slot="body">
        <div className="d-flex flex-column gap-4 pt-3">
          <DInput
            innerId="date"
            isDisabled
            label={t('filters.dateRange')}
            placeholder="DD/MM/YYYY >> DD/MM/YYYY"
            iconEnd="calendar"
          />
          <hr className="my-0" />
          <p className="fw-bold small">
            {t('filters.amount')}
          </p>
          <div className="d-flex gap-4">
            <DInputCurrency
              innerId="from"
              label={t('filter.amountFrom')}
              class="flex-1"
              onEventChange={() => {}}
            />
            <DInputCurrency
              innerId="to"
              label={t('filter.amountTo')}
              class="flex-1"
              onEventChange={() => {}}
            />
          </div>
          <hr className="my-0" />
          <div>
            <p className="fw-bold small mb-3">{t('filters.type')}</p>
            <div className="d-flex gap-3">
              <DInputCheck
                innerId="out"
                name="tipo"
                type="radio"
                label={t('filter.typeCredit')}
              />
              <DInputCheck
                innerId="in"
                name="tipo"
                type="radio"
                label={t('filter.typeDebit')}
              />
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <DButton
          text={t('filters.cancel')}
          variant="outline"
          theme="secondary"
          className="d-grid"
          onEventClick={() => closeOffcanvas()}
          isPill
        />
        <DButton
          text={t('filters.filter')}
          className="d-grid"
          onEventClick={() => closeOffcanvas()}
          isPill
        />
      </div>
    </DOffcanvas>
  );
}
