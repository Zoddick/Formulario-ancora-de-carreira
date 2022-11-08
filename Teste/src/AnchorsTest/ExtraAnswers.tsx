import { useCallback, useMemo, useState } from "react";
import { Question } from "../questions";
import { useAnchorsTest } from "./AnchorsTest";

const MAX_ALLOWED_SELECTION = 3;

export const ExtraAnswers = () => {
  const { prevStep, testAnswer, questionsById, finishTest } = useAnchorsTest();
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);

  const highPontuationQuestions = useMemo(() => {
    return Object.keys(testAnswer)
      .map((questionId: string) => {
        const id = parseInt(questionId, 10);
        return {
          id: id,
          answer: testAnswer[id],
          question: questionsById[id]
        };
      })
      .filter((result) => result.answer >= 5);
  }, [testAnswer, questionsById]);

  const toggleQuestion = useCallback((question: Question) => {
    setSelectedQuestions((prevValue) =>
      prevValue.includes(question.id)
        ? prevValue.filter((id) => id !== question.id)
        : [...prevValue, question.id]
    );
  }, []);

  const isCheckBoxDisabled = selectedQuestions.length === MAX_ALLOWED_SELECTION;

  function renderQuestion(result: {
    id: number;
    answer: number;
    question: Question;
  }) {
    const isChecked = selectedQuestions.includes(result.question.id);
    return (
      <fieldset key={`question-${result.id}`}>
        <label>
          <input
            type="checkbox"
            checked={isChecked}
            onClick={() => toggleQuestion(result.question)}
            disabled={isChecked ? false : isCheckBoxDisabled}
          />{" "}
          {result.question.text}
        </label>
      </fieldset>
    );
  }

  return (
    <fieldset>
      <legend>Descobrindo o resultado</legend>
      <p>
        Agora reveja suas respostas em que você deu pontos mais altos
        (normalmente 5 ou 6). Dessas respostas, selecione as três que sejam as
        mais verdadeiras para você.
      </p>
      {highPontuationQuestions.map(renderQuestion)}
      <br />
      <button onClick={prevStep}>Voltar</button>{" "}
      <button onClick={() => finishTest(selectedQuestions)}>
        Finalizar Teste ✓
      </button>
    </fieldset>
  );
};
