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
  OffcanvasProps,
} from '@dynamic-framework/ui-react';
// import es from 'date-fns/locale/es';
import { DateTime } from 'luxon';
import { useState } from 'react';
// import { registerLocale } from 'react-datepicker';
import { useTranslation } from 'react-i18next';

// registerLocale('es', es);
export default function OffcanvasAdvancedFilters({ closeOffcanvas }: OffcanvasProps) {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const onChangeDate = (value: Date | [Date | null, Date | null] | null) => {
    const [newStartDate, newEndDate] = value as Array<Date>;
    setStartDate(DateTime.fromJSDate(newStartDate).toISODate());
    setEndDate(DateTime.fromJSDate(newEndDate).toISODate());
  };

  return (
    <DOffcanvas
      name="advancedFilters"
      openFrom="end"
      isStatic
    >
      <DOffcanvasHeader
        onClose={() => closeOffcanvas()}
        showCloseButton
      >
        <div className="d-flex align-items-center gap-2">
          <DIcon icon="filter" size="24px" className="p-2" />
          <h5 className="fw-bold">{t('filter.title')}</h5>
        </div>
      </DOffcanvasHeader>
      <DOffcanvasBody>
        <div className="d-flex flex-column gap-4 pt-3">
          <DDatePicker
            id="date"
            placeholderText="DD/MM/YYYY >> DD/MM/YYYY"
            inputIcon="calendar"
            onChange={onChangeDate}
            selectsRange
            withMonthSelector
            // locale={es}
            {...startDate && {
              selected: DateTime.fromISO(startDate).toJSDate(),
              startDate: DateTime.fromISO(startDate).toJSDate(),
            }}
            {...endDate && {
              endDate: DateTime.fromISO(endDate).toJSDate(),
            }}
          />
          <hr className="my-0" />
          <p className="fw-bold small">
            {t('filters.amount')}
          </p>
          <div className="d-flex gap-4">
            <DInputCurrency
              id="from"
              label={t('filter.amountFrom')}
              onChange={() => { }}
            />
            <DInputCurrency
              id="to"
              label={t('filter.amountTo')}
              onChange={() => { }}
            />
          </div>
          <hr className="my-0" />
          <div>
            <p className="fw-bold small mb-3">{t('filters.type')}</p>
            <div className="d-flex gap-3">
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
          onClick={() => closeOffcanvas()}
          isPill
        />
        <DButton
          text={t('filters.filter')}
          onClick={() => closeOffcanvas()}
          isPill
        />
      </DOffcanvasFooter>
    </DOffcanvas>
  );
}
