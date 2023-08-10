import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

export default function ActivityListScheduled() {
  const { t } = useTranslation();

  return (
    <div className={classnames(
      'd-flex flex-column justify-content-center align-items-center',
      'w-100 my-4 gap-4 text-light-emphasis',
    )}
    >
      <p className="text-gray fw-bold">{t('noData.noUpcomingPayments')}</p>
      <img
        className="no-transactions"
        src="https://cloud.modyocdn.com/uploads/c49dfe12-4532-42a3-9dd7-2a07ce0bd82b/original/newCalendar.png"
        alt="Empty scheduled transactions"
      />
    </div>
  );
}
