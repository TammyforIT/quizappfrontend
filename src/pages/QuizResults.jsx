import { quizQuestions } from "./quizData";
import { useNavigate } from "react-router-dom";

export default function QuizResults({ answers }) {
  const navigate = useNavigate();

  let score = 0;

  answers.forEach((ans, i) => {
    score += quizQuestions[i].points[ans];
  });

  let result = "";

  if (score <= 10) {
    result = "She doesn’t like you.";
  } else if (score <= 16) {
    result = "She’s warming up.";
  } else {
    result = "She likes you.";
  }

  return (
    <div className="page-wrapper">
      <div className="glass-panel">
        <h1 className="page-title">Your Result</h1>
        <p className="quiz-result">{result}</p>

        <button 
          className="back-btn" 
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
