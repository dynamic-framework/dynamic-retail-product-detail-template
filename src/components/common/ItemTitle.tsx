type Props = {
  text: string;
  value?: any;
};

export default function ItemTitle({ text, value }: Props) {
  return (
    <div className="d-flex flex-column align-items-center h6">
      <span className="fw-bold">
        {text}
      </span>
      {value && (
        <span className="text-gray-700">
          {value}
        </span>
      )}
    </div>
  );
}
