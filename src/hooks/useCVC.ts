import { useEffect, useState } from 'react';

export default function useCVC(value: number) {
  const [secondsLeft, setSecondsLeft] = useState(value);
  const [cvc, setCvc] = useState(345);

  useEffect(() => {
    setInterval(() => {
      setSecondsLeft((prevSeconds) => {
        const newSeconds = prevSeconds - 1;
        if (newSeconds <= 0) {
          setCvc(Math.floor(Math.random() * 900) + 100);
          setSecondsLeft(value);
        }
        return newSeconds;
      });
    }, 1000);
  }, [value]);

  return { secondsLeft, cvc };
}
