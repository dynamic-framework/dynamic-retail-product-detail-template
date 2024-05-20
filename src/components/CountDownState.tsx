import { DButton } from '@dynamic-framework/ui-react';

import useCountdown from '../hooks/useCountDown';

interface CountDownStateProps {
  value: number;
  text: string;
}

export default function CountDownState({
  value,
  text = '',
}: CountDownStateProps) {
  const { secondsLeft, restartCountdown } = useCountdown(value);

  if (secondsLeft === 0) {
    return (
      <DButton
        text="Resend code"
        variant="link"
        className="p-0"
        onClick={() => restartCountdown()}
      />
    );
  }
  return (`${text} ${secondsLeft} seg`);
}
