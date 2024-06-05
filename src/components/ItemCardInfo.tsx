type Props = {
  name?: string;
  value?: string | number | React.ReactElement;
};

export default function ItemCardInfo({ name, value }: Props) {
  return (
    <div className="mb-4">
      <div className="mb-0 text-gray-500">{name}</div>
      <div className="mb-0 fw-bold text-gray-700">{value}</div>
    </div>
  );
}
