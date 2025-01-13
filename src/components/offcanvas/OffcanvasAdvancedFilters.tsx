import {
  DButton,
  DDatePicker,
  DInputCurrency,
  DOffcanvas,
  useDPortalContext,
} from '@dynamic-framework/ui-react';
import {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '../../store/hooks';
import { setQueryFilterActivities } from '../../store/slice';

export default function FiltersOffcanvas() {
  const { closePortal } = useDPortalContext();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(startDate);

  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(minAmount);

  const filterHandler = useCallback(() => {
    dispatch(setQueryFilterActivities(' '));
    closePortal();
  }, [closePortal, dispatch]);

  const clearFilterHandler = useCallback(() => {
    dispatch(setQueryFilterActivities(''));
    closePortal();
  }, [closePortal, dispatch]);

  useEffect(() => {
    if (endDate < startDate) {
      setEndDate(startDate);
    }
  }, [endDate, startDate]);

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
          <div className="d-flex flex-column flex-sm-row gap-4">
            <DDatePicker
              inputLabel={t('filters.startDate')}
              startDate={startDate}
              onChange={(e) => setStartDate(e!)}
              date={startDate.toISOString()}
            />
            <DDatePicker
              minDate={startDate}
              inputLabel={t('filters.endDate')}
              endDate={endDate}
              onChange={(e) => setEndDate(e!)}
              date={endDate.toISOString()}
            />
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
