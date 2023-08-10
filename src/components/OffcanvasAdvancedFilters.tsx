import {
  MButton,
  MIcon,
  MInput,
  MInputCheck,
  MInputCurrency,
  MOffcanvas,
  OffcanvasProps,
} from '@dynamic-framework/ui-react';
import { useTranslation } from 'react-i18next';

export default function OffcanvasAdvancedFilters({ closeOffcanvas }: OffcanvasProps) {
  const { t } = useTranslation();

  return (
    <MOffcanvas
      name="advancedFilters"
      openFrom="end"
      showCloseButton
      isStatic
      onMClose={() => closeOffcanvas()}
    >
      <div slot="header">
        <div className="d-flex align-items-center gap-2">
          <MIcon icon="filter" size="24px" className="p-2" />
          <h5 className="fw-bold">{t('filter.title')}</h5>
        </div>
      </div>
      <div slot="body">
        <div className="d-flex flex-column gap-4 pt-3">
          <MInput
            mId="date"
            isDisabled
            label={t('filters.dateRange')}
            placeholder="DD/MM/YYYY >> DD/MM/YYYY"
            iconEnd="calendar"
          />
          <hr className="my-0" />
          <p className="fw-bold sp">
            {t('filters.amount')}
          </p>
          <div className="d-flex gap-4">
            <MInputCurrency
              mId="from"
              label={t('filter.amountFrom')}
              class="flex-1"
              onChange={() => {}}
            />
            <MInputCurrency
              mId="to"
              label={t('filter.amountTo')}
              class="flex-1"
              onChange={() => {}}
            />
          </div>
          <hr className="my-0" />
          <div>
            <p className="fw-bold sp mb-3">{t('filters.type')}</p>
            <div className="d-flex gap-3">
              <MInputCheck
                mId="out"
                name="tipo"
                type="radio"
                label={t('filter.typeCredit')}
              />
              <MInputCheck
                mId="in"
                name="tipo"
                type="radio"
                label={t('filter.typeDebit')}
              />
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <MButton
          text={t('filters.cancel')}
          variant="outline"
          theme="secondary"
          className="d-grid"
          onMClick={() => closeOffcanvas()}
          isPill
        />
        <MButton
          text={t('filters.filter')}
          className="d-grid"
          onMClick={() => closeOffcanvas()}
          isPill
        />
      </div>
    </MOffcanvas>
  );
}
