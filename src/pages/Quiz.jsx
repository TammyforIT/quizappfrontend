import { useState } from "react";
import { quizQuestions } from "./quizData";
import QuizResults from "./QuizResults";

export default function Quiz() {
  const [answers, setAnswers] = useState([]);
  const [done, setDone] = useState(false);

  function chooseOption(qIndex, optionIndex) {
    const updated = [...answers];
    updated[qIndex] = optionIndex;
    setAnswers(updated);

    if (updated.length === quizQuestions.length && !updated.includes(undefined)) {
      setDone(true);
    }
  }

  if (done) return <QuizResults answers={answers} />;

  return (
    <div className="page-wrapper">
      <div className="glass-panel">
        <h1 className="page-title">How Do You Know She Loves You?</h1>

        {quizQuestions.map((q, i) => (
          <div key={i} className="quiz-block">
            <p className="quiz-question">{q.question}</p>

            <div className="quiz-options">
              {q.options.map((opt, j) => (
                <button
                  key={j}
                  className="quiz-btn"
                  onClick={() => chooseOption(i, j)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
