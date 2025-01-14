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
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(startDate);

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
        <div className="d-flex flex-column gap-6 pt-4">
          <div className="d-flex gap-4">
            <DDatePicker
              className="w-100"
              inputLabel={t('filters.startDate')}
              onChange={(e) => setStartDate(e!)}
              date={startDate.toISOString()}
            />

            <DDatePicker
              inputLabel={t('filters.endDate')}
              onChange={(e) => setEndDate(e!)}
              date={endDate.toISOString()}
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
