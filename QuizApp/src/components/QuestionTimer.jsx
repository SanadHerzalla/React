import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeOut }) {
  const [progress, setProgress] = useState(timeout);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => prevProgress - 100);
      if (progress <= 0) {
        onTimeOut();
      }
    }, 100);
    return () => clearInterval(timer);
  }, [timeout]);

  return <progress id="question-timer" value={progress} max="100"></progress>;
}
