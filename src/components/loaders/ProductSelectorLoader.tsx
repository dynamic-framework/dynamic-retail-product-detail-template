import { MSkeleton } from '@modyo-dynamic/modyo-design-system-react';

export default function ProductSelectorLoader() {
  return (
    <>
      <div className="d-none d-md-block">
        <div className="w-100">
          <MSkeleton viewBox="0 0 400 84" backgroundColor="#e9e9ff" foregroundColor="#f8f8fb">
            <rect x="0" y="0" rx="16" ry="16" width="400" height="84" />
          </MSkeleton>
        </div>
      </div>

      <div className="d-block d-md-none">
        <div className="w-100">
          <MSkeleton viewBox="0 0 400 70" backgroundColor="#e9e9ff" foregroundColor="#f8f8fb">
            <rect x="0" y="0" rx="16" ry="16" width="400" height="70" />
          </MSkeleton>
        </div>
      </div>
    </>
  );
}
