import { useState } from "react";
import "./style.css";

interface Question {
  question: string;
  choices: string[];
  correctAnswer: string;
  totalWrongAnswer: string;
  explanation?: string;
}

interface Quiz {
  questions: Question[];
}

interface SurveyProps {
  title: string;
  text: string;
  quiz: Quiz;
}

export default function Survey({ title, text, quiz }: SurveyProps) {
  const [activeQuestion, setActiveQuestion] = useState<number>(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );
  const [selectedChoices, setSelectedChoices] = useState<{ answer: string }[]>(
    []
  );
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [showResult, setShowResult] = useState<boolean>(false); // Adicionando a definição de estado que faltava

  const { questions } = quiz;
  const { question, choices, correctAnswer } = questions[activeQuestion];

  const onClickNext = () => {
    const selectedAnswer = selectedChoices[activeQuestion]?.answer;
    const isCorrect = selectedAnswer === correctAnswer;

    setResult((prev) => ({
      score: isCorrect ? prev.score + 5 : prev.score,
      correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
      wrongAnswers: isCorrect ? prev.wrongAnswers : prev.wrongAnswers + 1,
    }));

    setSelectedAnswerIndex(null);

    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const onAnswerSelected = (answer: string, index: number) => {
    setSelectedAnswerIndex(index);
    const newSelectedChoices = [...selectedChoices];
    newSelectedChoices[activeQuestion] = { answer };
    setSelectedChoices(newSelectedChoices);
  };

  const refreshQuiz = () => {
    setShowResult(false);
    setActiveQuestion(0);
    setSelectedAnswerIndex(null);
    setSelectedChoices([]);
    setResult({
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
    });
  };

  const addLeadingZero = (number: number) =>
    number > 9 ? number : `0${number}`;

  return (
    <div className="quiz-container">
      <h2>{title}</h2>
      <p>{text}</p>
      <div className="quiz-body">
        {!showResult ? (
          <div>
            <div>
              <span className="active-question-no">
                {addLeadingZero(activeQuestion + 1)}
              </span>
              <span className="total-question">
                /{addLeadingZero(questions.length)}
              </span>
            </div>
            <h2>{question}</h2>
            <ul>
              {choices.map((answer, index) => (
                <li
                  onClick={() => onAnswerSelected(answer, index)}
                  key={index}
                  className={
                    selectedAnswerIndex === index
                      ? "selected-answer"
                      : undefined
                  }
                >
                  {answer}
                </li>
              ))}
            </ul>
            <div className="flex-right">
              <button
                onClick={onClickNext}
                disabled={selectedAnswerIndex === null}
              >
                {activeQuestion === questions.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        ) : (
          <div className="result">
            <h3>Resultado</h3>
            <p>Pontuação Final: {result.score}</p>
            {questions.map((question, index) => (
              <div key={index}>
                <span className="result-question">{question.question}</span>
                <p className="result-explanation">
                  {selectedChoices[index]?.answer}
                </p>
                <p className="result-explanation">{question.explanation}</p>
              </div>
            ))}
            <div className="flex-right">
              <button onClick={refreshQuiz}>Refazer</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
