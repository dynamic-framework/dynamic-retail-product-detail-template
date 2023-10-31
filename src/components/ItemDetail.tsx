type Props = {
  text: string;
  value: string | number;
};

export default function ItemDetail({ text, value }: Props) {
  return (
    <div className="d-flex gap-3 align-items-center justify-content-between p-1 small">
      <span className="flex-grow-1">
        {text}
      </span>
      <span className="text-gray-700">
        {value}
      </span>
    </div>
  );
}
