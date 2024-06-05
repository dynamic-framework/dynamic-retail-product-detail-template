import { useState, useEffect, useCallback } from 'react';

export default function useCountdown(value: number) {
  const [secondsLeft, setSecondsLeft] = useState(value);
  const [isActive, setIsActive] = useState(true);

  const resetCountdown = useCallback((newSeconds = value) => {
    setIsActive(false);
    setSecondsLeft(newSeconds);
  }, [value]);

  const restartCountdown = useCallback(() => {
    resetCountdown(value);
    setIsActive(true);
  }, [resetCountdown, value]);

  useEffect(() => {
    if (!isActive) {
      return () => {};
    }

    const interval = setInterval(() => {
      setSecondsLeft((prevSeconds) => {
        const newSeconds = prevSeconds - 1;
        if (newSeconds <= 0) {
          clearInterval(interval);
          setIsActive(false);
          return 0;
        }
        return newSeconds;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  return { secondsLeft, restartCountdown };
}
