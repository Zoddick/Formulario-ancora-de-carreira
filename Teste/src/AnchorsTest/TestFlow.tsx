import { useAnchorsTest, STEPS } from "./AnchorsTest";
import { QuestionAnswers } from "./QuestionAnswers";
import { ExtraAnswers } from "./ExtraAnswers";
import { TestResult } from "./TestResult";

export const TestFlow = () => {
  const { testCurrentStep } = useAnchorsTest();

  if (testCurrentStep === STEPS.ANSWER_QUESTIONS) return <QuestionAnswers />;
  else if (testCurrentStep === STEPS.EXTRA_ANSWER) return <ExtraAnswers />;
  else if (testCurrentStep === STEPS.RESULTS) return <TestResult />;
  return <>Step not found.</>;
};
