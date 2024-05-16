import { DIcon } from '@dynamic-framework/ui-react';

type Props = {
  text: string;
  value?: string | number;
};

export default function ItemTitle({ text, value }: Props) {
  return (
    <div className="d-flex flex-column align-items-lg-center mb-3 my-lg-4">
      <small className="d-inline-flex gap-2 align-items-center">
        <DIcon
          icon="circle-fill"
          theme="success"
          size="8px"
        />
        <span>Active</span>
      </small>
      <small className="text-gray-700">
        {text}
      </small>
      {value && (
        <span className="fs-4">
          {value}
        </span>
      )}
    </div>
  );
}
