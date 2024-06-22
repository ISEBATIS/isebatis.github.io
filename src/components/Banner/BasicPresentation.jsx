import { useState, useEffect } from "react";


export const BasicPresentation = ({possibleTexts, styleClass}) => {  
  const jobPositions = possibleTexts;
  const [indexCurrentJob, setIndexCurrentJob] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(jobPositions[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [delta, setDelta] = useState(200);
  const [pause, setPause] = useState(false);

  const tick = () => {
    const fullText = jobPositions[indexCurrentJob];
    let updatedText;

    if (isDeleting) {
      updatedText = fullText.substring(0, currentPosition.length - 1);
      if (updatedText === "") {
        setIsDeleting(false);
        setIndexCurrentJob((indexCurrentJob + 1) % jobPositions.length);
        // setPause(true);
        setDelta(100);
      }
    } else {
      updatedText = fullText.substring(0, currentPosition.length + 1);
      if (updatedText === fullText) {
        setIsDeleting(true);
        setPause(true);
        setDelta(50);
      }
    }

    setCurrentPosition(updatedText);
  };

  useEffect(() => {
    if (pause) {
      const pauseTimer = setTimeout(() => setPause(false), "4000");
      return () => clearTimeout(pauseTimer);
    }

    const ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
  }, [currentPosition, isDeleting, indexCurrentJob, delta, pause]);

  return (
    <span className={styleClass}>{currentPosition}</span>
  );
};
