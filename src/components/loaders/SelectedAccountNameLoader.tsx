import { DSkeleton } from '@dynamic-framework/ui-react';

export default function SelectedAccountNameLoader() {
  return (
    <>
      <div className="selected-account-name-loader d-none d-md-block col-12 col-md-8">
        <DSkeleton viewBox="0 0 200 20" backgroundColor="#e9e9ff" foregroundColor="#f8f8fb">
          <rect x="0" y="0" rx="4" ry="4" width="150" height="20" />
        </DSkeleton>
      </div>

      <div className="selected-account-name-loader d-block d-md-none w-100">
        <DSkeleton viewBox="0 0 375 30" backgroundColor="#e9e9ff" foregroundColor="#f8f8fb">
          <rect x="0" y="0" rx="4" ry="4" width="200" height="30" />
        </DSkeleton>
      </div>
    </>
  );
}
