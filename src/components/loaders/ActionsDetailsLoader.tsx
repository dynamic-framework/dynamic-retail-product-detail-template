import { MSkeleton } from '@modyo-dynamic/modyo-design-system-react';

export default function ActionsDetailsLoader() {
  return (
    <>
      <div className="d-none d-md-block mt-3 mt-md-0">
        <div className="w-100">
          <MSkeleton viewBox="0 0 400 30" backgroundColor="#e9e9ff" foregroundColor="#f8f8fb">
            <rect x="0" y="0" rx="4" ry="4" width="400" height="30" />
          </MSkeleton>
        </div>
      </div>

      <div className="d-block d-md-none mt-3">
        <div className="w-100">
          <MSkeleton viewBox="0 0 400 70" backgroundColor="#e9e9ff" foregroundColor="#f8f8fb">
            <rect x="0" y="0" rx="4" ry="4" width="400" height="70" />
          </MSkeleton>
        </div>
      </div>
    </>
  );
}
