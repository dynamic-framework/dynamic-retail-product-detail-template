import { DSkeleton } from '@dynamic-framework/ui-react';

export default function AccountSelectorLoader() {
  return (
    <>
      <div className="d-none d-md-block">
        <div className="w-100">
          <DSkeleton
            viewBox="0 0 400 84"
            backgroundColor="#e9e9ff"
            foregroundColor="#f8f8fb"
          >
            <rect
              x="0"
              y="0"
              rx="16"
              ry="16"
              width="400"
              height="84"
            />
          </DSkeleton>
        </div>
      </div>

      <div className="d-block d-md-none">
        <div className="w-100">
          <DSkeleton
            viewBox="0 0 400 70"
            backgroundColor="#e9e9ff"
            foregroundColor="#f8f8fb"
          >
            <rect
              x="0"
              y="0"
              rx="16"
              ry="16"
              width="400"
              height="70"
            />
          </DSkeleton>
        </div>
      </div>
    </>
  );
}
