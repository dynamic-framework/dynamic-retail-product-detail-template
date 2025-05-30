import {
  DButton,
  DDatePicker,
  DInputCurrency,
  DOffcanvas,
  useDPortalContext,
} from '@dynamic-framework/ui-react';
import {
  useCallback,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '../../store/hooks';
import { setQueryFilter } from '../../store/slice';

export default function FiltersOffcanvas() {
  const { closePortal } = useDPortalContext();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(startDate);

  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(minAmount);

  const filterHandler = useCallback(() => {
    dispatch(setQueryFilter(' '));
    closePortal();
  }, [closePortal, dispatch]);

  const clearFilterHandler = useCallback(() => {
    dispatch(setQueryFilter(''));
    closePortal();
  }, [closePortal, dispatch]);

  return (
    <DOffcanvas
      className="filters-offcanvas"
      name="filtersOffcanvas"
      staticBackdrop
    >
      <DOffcanvas.Header
        showCloseButton
        onClose={closePortal}
      >
        <h4>{t('filter.title')}</h4>
      </DOffcanvas.Header>
      <DOffcanvas.Body className="d-flex flex-column gap-6 py-6">
        <div className="d-flex flex-column gap-4">
          <h5 className="fw-normal">
            {t('filters.dateRange')}
          </h5>
          <div className="row g-4">
            <div className="col-12 col-lg-6">
              <DDatePicker
                inputLabel={t('filters.startDate')}
                startDate={startDate}
                onChange={(date: Date | null) => setStartDate(date!)}
                selected={startDate}
              />
            </div>
            <div className="col-12 col-lg-6">
              <DDatePicker
                minDate={startDate}
                inputLabel={t('filters.endDate')}
                endDate={endDate}
                onChange={(date: Date | null) => setEndDate(date)}
                selected={endDate}
              />
            </div>
          </div>
        </div>

        <hr className="m-0" />

        <div className="d-flex flex-column gap-4">
          <h5 className="fw-normal">
            {t('filters.amount')}
          </h5>
          <DInputCurrency
            label={t('filters.minAmount')}
            onChange={(e) => setMinAmount(e!)}
            value={minAmount}
          />
          <DInputCurrency
            label={t('filters.maxAmount')}
            min={minAmount}
            onChange={(e) => setMaxAmount(e!)}
            value={maxAmount}
            invalid={maxAmount < minAmount}
          />
        </div>
      </DOffcanvas.Body>
      <DOffcanvas.Footer
        actionPlacement="fill"
        className="flex-column-reverse flex-sm-row"
      >
        <DButton
          text={t('button.cleanFilters')}
          variant="outline"
          onClick={clearFilterHandler}
        />
        <DButton
          text={t('button.apply')}
          onClick={filterHandler}
        />
      </DOffcanvas.Footer>
    </DOffcanvas>
  );
}
