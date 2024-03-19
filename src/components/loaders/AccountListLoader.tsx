import { DSkeleton } from '@dynamic-framework/ui-react';

export default function AccountListLoader() {
  return (
    <div className="py-4">
      <div className="d-none d-lg-block mt-4">
        <DSkeleton viewBox="0 0 600 180" backgroundColor="#e9e9ff" foregroundColor="#f8f8fb">
          <rect x="0" y="10" rx="4" ry="4" width="410" height="40" />
          <rect x="530" y="20" rx="4" ry="4" width="70" height="20" />
          <rect x="0" y="65" rx="4" ry="4" width="600" height="40" />
          <rect x="0" y="120" rx="4" ry="4" width="600" height="40" />
        </DSkeleton>
      </div>

      <div className="d-none d-md-block d-lg-none">
        <DSkeleton viewBox="0 0 400 150" backgroundColor="#e9e9ff" foregroundColor="#f8f8fb">
          <rect x="0" y="10" rx="4" ry="4" width="210" height="20" />
          <rect x="270" y="12" rx="4" ry="4" width="60" height="15" />
          <rect x="340" y="12" rx="4" ry="4" width="60" height="15" />
          <rect x="0" y="45" rx="4" ry="4" width="400" height="36" />
          <rect x="0" y="91" rx="4" ry="4" width="400" height="36" />
        </DSkeleton>
      </div>

      <div className="d-block d-md-none">
        <DSkeleton viewBox="0 0 200 120" backgroundColor="#e9e9ff" foregroundColor="#f8f8fb">
          <rect x="0" y="0" rx="4" ry="4" width="200" height="30" />
          <rect x="0" y="40" rx="4" ry="4" width="200" height="30" />
          <rect x="0" y="80" rx="4" ry="4" width="200" height="30" />
        </DSkeleton>
      </div>
    </div>
  );
}
