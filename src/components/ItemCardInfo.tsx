type Props = {
  name?: string;
  value?: string | number;
};

export default function ItemCardInfo({ name, value }: Props) {
  return (
    <div className="mb-4">
      <p className="mb-0 text-gray-500">{name}</p>
      <p className="mb-0 fw-bold text-gray-700">{value}</p>
    </div>
  );
}
