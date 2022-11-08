import { Question as QuestionType } from "../questions";

export const Question = ({ question }: { question: QuestionType }) => {
  return (
    <div key={question.id}>
      <span>{question.id}</span> - <span>{question.text}</span>
    </div>
  );
};
