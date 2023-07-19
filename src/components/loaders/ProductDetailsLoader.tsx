import { MSkeleton } from '@modyo-dynamic/modyo-design-system-react';

export default function ProductDetailsLoader() {
  return (
    <>
      <div className="d-none d-lg-block">
        <div className="d-block">
          <MSkeleton viewBox="0 0 400 400" backgroundColor="#e9e9ff" foregroundColor="#f8f8fb">
            <rect x="0" y="0" rx="16" ry="16" width="400" height="400" />
          </MSkeleton>
        </div>
      </div>

      <div className="d-none d-md-block d-lg-none">
        <div className="w-100">
          <MSkeleton viewBox="0 0 400 200" backgroundColor="#e9e9ff" foregroundColor="#f8f8fb">
            <rect x="0" y="0" rx="16" ry="16" width="400" height="200" />
          </MSkeleton>
        </div>
      </div>

      <div className="d-block d-md-none">
        <div className="w-100">
          <MSkeleton viewBox="0 0 400 250" backgroundColor="#e9e9ff" foregroundColor="#f8f8fb">
            <rect x="0" y="0" rx="16" ry="16" width="400" height="250" />
          </MSkeleton>
        </div>
      </div>
    </>
  );
}
