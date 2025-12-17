import QUESTIONS from "../question";
import { useState } from "react";
import quizCompleted from "../assets/quiz-complete.png";
export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;
  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);
  const quizIsFinished = activeQuestionIndex === QUESTIONS.length - 1;

  function handleSelectAnswer(answer) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, answer];
    });
  }

  if (quizIsFinished) {
    return (
      <div id="summary">
        <img src={quizCompleted} alt="Quiz completed" />
        <h2>Quiz completed!</h2>
      </div>
    );
  }
  return (
    <div id="quiz">
      <div id="question">
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
