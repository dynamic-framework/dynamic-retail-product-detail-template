type Props = {
  duration?: number;
  size?: number;
};

export default function CountdownCircleTimer(props: Props) {
  const { duration = 10, size = 20 } = props;

  return (
    <div className="timer" style={{ '--duration': duration, '--size': size } as React.CSSProperties}>
      <div className="mask" />
    </div>
  );
}
