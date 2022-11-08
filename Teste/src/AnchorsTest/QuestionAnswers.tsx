import { useAnchorsTest } from "./AnchorsTest";
import { Question } from "./Question";
import { QuestionAnswer } from "./QuestionAnswer";

export const QuestionAnswers = () => {
  const {
    questions,
    currentQuestion,
    prevQuestion,
    nextQuestion,
    nextStep,
    isLastQuestion,
    disableNextQuestion,
    currentQuestionIndex
  } = useAnchorsTest();

  return (
    <fieldset>
      <legend>
        Pergunta {currentQuestionIndex + 1} de {questions.length}
      </legend>
      <Question question={currentQuestion} />
      <br />
      <QuestionAnswer key={currentQuestion.id} question={currentQuestion} />
      <br />
      <div>
        <button disabled={currentQuestionIndex === 0} onClick={prevQuestion}>
          {"<<"} Pergunta Anterior
        </button>{" "}
        {!isLastQuestion && (
          <button disabled={disableNextQuestion} onClick={nextQuestion}>
            Proxima Pergunta {">>"}
          </button>
        )}
        {isLastQuestion && (
          <button onClick={nextStep} disabled={disableNextQuestion}>
            Próxima Etapa ✓
          </button>
        )}
      </div>
    </fieldset>
  );
};
