import { useEffect, useState } from "react";

import { QuizDataItem, quizData } from "./quizData";
import { Questions, Result } from "./styles";

export default function MainQuiz() {
  const [myAnswer, setMyAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const [questionIndex, setQuestionIndex] = useState(0);

  const nextQuestionHandler = () => {
    if (questionIndex === quizData.length - 1) {
      setIsEnd(true);
    } else {
      setQuestionIndex((value) => value + 1);
    }
    setMyAnswer(null);
    setDisabled(true);
  };

  const checkAnswer = (answer: string) => {
    setMyAnswer(answer);
    setDisabled(false);
  };

  useEffect(() => {
    if (myAnswer === null) return;

    const correctAnswer = quizData[questionIndex].answer;
    if (myAnswer === correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
    // Delay to next question to allow user to see their selected answer
    setTimeout(() => nextQuestionHandler(), 100);
  }, [myAnswer, questionIndex]);

  return (
    <div className="card shadow rounded border-0 p-5">
      {isEnd ? (
        <Result>
          <h2 className="text-primary mb-4">
            Fim de jogo, sua pontuação final é{" "}
            <span className="fw-bolder">{score} pontos</span>!
          </h2>
          <div>
            <p className="text-secondary fw-bold fs-5 mb-2">
              As respostas corretas para as perguntas são:
            </p>
            <ul className="list-group list-group-flush">
              {quizData.map((item: QuizDataItem, index: number) => (
                <li className="list-group-item" key={index}>
                  {item.answer}
                </li>
              ))}
            </ul>
          </div>
        </Result>
      ) : (
        <Questions>
          <h2 className="text-secondary-emphasis mb-4">
            {quizData[questionIndex].question}
          </h2>
          <p className="text-secondary fw-bold fs-5 mb-2">
            {`Questão ${questionIndex + 1} de ${quizData.length}`}
          </p>
          <div>
            {quizData[questionIndex].options.map((option, index) => (
              <button
                key={index}
                disabled={!disabled}
                className={`btn btn-outline-primary ${
                  myAnswer === option ? "selected" : ""
                }`}
                onClick={() => checkAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </Questions>
      )}
    </div>
  );
}
