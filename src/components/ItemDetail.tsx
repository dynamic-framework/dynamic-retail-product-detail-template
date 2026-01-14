type Props = {
  text: string;
  value: string | number;
};

export default function ItemDetail({ text, value }: Props) {
  return (
    <div className="d-flex gap-4 align-items-center justify-content-between p-1">
      <span className="flex-grow-1">
        {text}
      </span>
      <span className="text-gray-700 fw-semibold">
        {value}
      </span>
    </div>
  );
}
