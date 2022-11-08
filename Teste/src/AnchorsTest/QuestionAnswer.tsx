import { useCallback } from "react";
import {
  Question as QuestionType,
  QuestionAnswer as QuestionAnswerType
} from "../questions";
import { useAnchorsTest } from "./AnchorsTest";

export const QuestionAnswer = ({ question }: { question: QuestionType }) => {
  const { answers, testAnswer, setAnswer } = useAnchorsTest();

  const handleChange = useCallback(
    (weight: number) => {
      setAnswer(question, weight);
    },
    [setAnswer, question]
  );

  function renderAnswer(answer: QuestionAnswerType, index: number) {
    return (
      <fieldset key={`answer-${index}`}>
        <label>
          <input
            onChange={() => handleChange(answer.weight)}
            value={answer.weight}
            name="answer"
            type="radio"
            checked={answer.weight === testAnswer[question.id]}
          />{" "}
          {answer.weight} - {answer.text}
        </label>
      </fieldset>
    );
  }

  return <>{answers.map(renderAnswer)}</>;
};
