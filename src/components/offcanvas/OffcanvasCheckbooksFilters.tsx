/* eslint-disable react/jsx-props-no-spreading */
import {
  DButton,
  DDatePicker,
  DIcon,
  DOffcanvas,
  useDPortalContext,
} from '@dynamic-framework/ui-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function OffcanvasCheckbooksFilters() {
  const { t } = useTranslation();
  const { closePortal } = useDPortalContext();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(startDate);

  return (
    <DOffcanvas
      name="checkbooksFilters"
      openFrom="end"
      staticBackdrop
    >
      <DOffcanvas.Header
        onClose={closePortal}
        showCloseButton
      >
        <div className="d-flex align-items-center gap-2">
          <DIcon
            icon="filter"
            size="24px"
            className="p-2"
          />
          <h5 className="fw-bold">{t('filter.title')}</h5>
        </div>
      </DOffcanvas.Header>
      <DOffcanvas.Body>
        <div className="row g-4">
          <div className="col-12 col-lg-6">
            <DDatePicker
              inputLabel={t('filters.startDate')}
              onChange={(date: Date | null) => setStartDate(date!)}
              selected={startDate}
            />
          </div>
          <div className="col-12 col-lg-6">
            <DDatePicker
              inputLabel={t('filters.endDate')}
              onChange={(date: Date | null) => setEndDate(date)}
              selected={endDate}
            />
          </div>
        </div>
      </DOffcanvas.Body>
      <DOffcanvas.Footer
        actionPlacement="fill"
        className="flex-column-reverse flex-sm-row"
      >
        <DButton
          text={t('filters.cancel')}
          variant="outline"
          onClick={closePortal}
        />
        <DButton
          text={t('filters.filter')}
          onClick={closePortal}
        />
      </DOffcanvas.Footer>
    </DOffcanvas>
  );
}
