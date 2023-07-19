import { MSkeleton } from '@modyo-dynamic/modyo-design-system-react';

export default function TransactionsListScheduledLoader() {
  return (
    <div className="py-3">
      <div className="d-none d-md-block">
        <MSkeleton viewBox="0 0 400 150" backgroundColor="#e9e9ff" foregroundColor="#f8f8fb">
          <rect x="0" y="0" rx="4" ry="4" width="400" height="36" />
          <rect x="0" y="45" rx="4" ry="4" width="400" height="36" />
          <rect x="0" y="91" rx="4" ry="4" width="400" height="36" />
        </MSkeleton>
      </div>

      <div className="d-block d-md-none">
        <MSkeleton viewBox="0 0 200 120" backgroundColor="#e9e9ff" foregroundColor="#f8f8fb">
          <rect x="0" y="0" rx="4" ry="4" width="200" height="30" />
          <rect x="0" y="40" rx="4" ry="4" width="200" height="30" />
          <rect x="0" y="80" rx="4" ry="4" width="200" height="30" />
        </MSkeleton>
      </div>
    </div>
  );
}
