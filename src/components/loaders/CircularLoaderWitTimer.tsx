type Props = {
  duration?: number;
  size?: number;
};

export default function CircularLoaderWithTimer(
  {
    duration = 10,
    size = 20,
  }: Props,
) {
  return (
    <div
      className="timer"
      style={{ '--duration': duration, '--size': size } as React.CSSProperties}
    >
      <div className="mask" />
    </div>
  );
}
