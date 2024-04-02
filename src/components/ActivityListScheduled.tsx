import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

export default function ActivityListScheduled() {
  const { t } = useTranslation();

  return (
    <div className={classnames(
      'd-flex flex-column justify-content-center align-items-center',
      'w-100 my-6 gap-6 text-gray-500',
    )}
    >
      <p className="text-gray-500 fw-bold mb-0">{t('noData.noUpcomingPayments')}</p>
      <img
        className="no-transactions"
        src="https://cloud.modyocdn.com/uploads/c49dfe12-4532-42a3-9dd7-2a07ce0bd82b/original/newCalendar.png"
        alt="Empty scheduled transactions"
      />
    </div>
  );
}
