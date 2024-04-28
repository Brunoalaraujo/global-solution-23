import React, { useState } from "react";
import "./style.css";

interface Question {
  question: string;
  answer: string;
}

interface FaqProps {
  questions: Question[];
}

const Faq: React.FC<FaqProps> = ({ questions }) => {
  const [current, setCurrent] = useState<number | null>(null);

  return (
    <div className="Faq">
      {questions?.map((item, i) => (
        <div
          key={i}
          className={`Faq__question ${
            current === i ? "Faq__question--open" : ""
          }`}
          onClick={() => {
            setCurrent(current === i ? null : i);
          }}
        >
          <h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="10"
              viewBox="0 0 13 10"
              fill="none"
            >
              <path
                d="M9.60589 5.67024L6.22586 9.04826L7.17358 10L12.1716 5L7.17358 0L6.22586 0.951743L9.60589 4.32976H0.499988V5.67024H9.60589Z"
                fill="#111111"
              />
            </svg>

            <span>{item.question}</span>
          </h3>
          <div className="Faq__answer">
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Faq;
