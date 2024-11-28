/* eslint-disable react/jsx-props-no-spreading */
import {
  DButton,
  DDatePicker,
  DIcon,
  DInputCheck,
  DInputCurrency,
  DOffcanvas,
  DOffcanvasBody,
  DOffcanvasFooter,
  DOffcanvasHeader,
  useDPortalContext,
} from '@dynamic-framework/ui-react';
import { DateTime } from 'luxon';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function OffcanvasAdvancedFilters() {
  const { t } = useTranslation();
  const { closePortal } = useDPortalContext();
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [fromAmount, setFromAmount] = useState<number | undefined>(0);
  const [toAmount, setToAmount] = useState<number | undefined>(0);

  const onChangeDate = useCallback((value: Date | [Date | null, Date | null] | null) => {
    const [newStartDate, newEndDate] = value as Array<Date>;
    setStartDate(DateTime.fromJSDate(newStartDate).toISODate());
    setEndDate(DateTime.fromJSDate(newEndDate).toISODate());
  }, []);

  return (
    <DOffcanvas
      name="advancedFilters"
      openFrom="end"
      staticBackdrop
    >
      <DOffcanvasHeader
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
      </DOffcanvasHeader>
      <DOffcanvasBody>
        <div className="d-flex flex-column gap-6 pt-4">
          <DDatePicker<never, true>
            onChange={onChangeDate}
            placeholder={t('filters.dateRange')}
            selectsRange
            {...startDate && {
              selected: DateTime.fromISO(startDate).toJSDate(),
              startDate: DateTime.fromISO(startDate).toJSDate(),
            }}
            {...endDate && {
              endDate: DateTime.fromISO(endDate).toJSDate(),
            }}
          />
          <hr className="my-0" />
          <p className="fw-bold small mb-0">
            {t('filters.amount')}
          </p>
          <div className="d-flex gap-6">
            <DInputCurrency
              id="from"
              value={fromAmount}
              label={t('filter.amountFrom')}
              onChange={(newAmount) => setFromAmount(newAmount)}
            />
            <DInputCurrency
              id="to"
              value={toAmount}
              label={t('filter.amountTo')}
              onChange={(newAmount) => setToAmount(newAmount)}
            />
          </div>
          <hr className="my-0" />
          <div>
            <p className="fw-bold small mb-4">{t('filters.type')}</p>
            <div className="d-flex gap-4">
              <DInputCheck
                id="out"
                name="tipo"
                type="radio"
                label={t('filter.typeCredit')}
              />
              <DInputCheck
                id="in"
                name="tipo"
                type="radio"
                label={t('filter.typeDebit')}
              />
            </div>
          </div>
        </div>
      </DOffcanvasBody>
      <DOffcanvasFooter>
        <DButton
          text={t('filters.cancel')}
          variant="outline"
          theme="secondary"
          onClick={closePortal}
        />
        <DButton
          text={t('filters.filter')}
          onClick={closePortal}
        />
      </DOffcanvasFooter>
    </DOffcanvas>
  );
}
