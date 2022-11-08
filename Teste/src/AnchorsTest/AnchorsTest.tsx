import React, { createContext, useCallback, useContext, useState } from "react";
import {
  answers,
  Question,
  QuestionAnswer,
  questions,
  questionsById
} from "../questions";

type TestAnswers = {
  [key: number]: number;
};

type QuestionWithAnswer = Question & { answer: number };

type TestResult = {
  [column: string]: {
    questions: QuestionWithAnswer[];
    result: number;
  };
};

type AnchorsTestProviderValue = {
  questionsById: { [key: number]: Question };
  questions: Question[];
  answers: QuestionAnswer[];
  testAnswer: TestAnswers;
  setAnswer: (question: Question, weight: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  finishTest: (extraPointQuestions: number[]) => void;
  disableNextQuestion: boolean;
  isLastQuestion: boolean;
  currentQuestion: Question;
  currentQuestionIndex: number;
  testCurrentStep: number;
  testResult: TestResult;
};

const context = createContext<AnchorsTestProviderValue>(
  {} as AnchorsTestProviderValue
);

type AnchorsTestProps = { children: React.ReactChild };

export const STEPS = {
  ANSWER_QUESTIONS: 0,
  EXTRA_ANSWER: 1,
  RESULTS: 2
};

const EXTRA_POINTS = 4;

export const AnchorsTest = ({ children }: AnchorsTestProps) => {
  const [testCurrentStep, setTestCurrentStep] = useState(
    STEPS.ANSWER_QUESTIONS
  );
  const [testResult, setTestResult] = useState<TestResult>({});
  const [testAnswer, setTestAnswer] = useState<TestAnswers>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const lastIndex = questions.length - 1;

  const nextQuestion = useCallback(() => {
    setCurrentQuestionIndex((current) => {
      const nextValue = current + 1;
      return nextValue < lastIndex ? nextValue : lastIndex;
    });
  }, [lastIndex]);

  const prevQuestion = useCallback(() => {
    setCurrentQuestionIndex((current) => {
      const nextValue = current - 1;
      return nextValue > 0 ? nextValue : 0;
    });
  }, []);

  const setAnswer = useCallback((question: Question, weight: number) => {
    setTestAnswer((prevValue) => ({ ...prevValue, [question.id]: weight }));
  }, []);

  const nextStep = useCallback(() => {
    if (testCurrentStep === STEPS.ANSWER_QUESTIONS) {
      setTestCurrentStep(STEPS.EXTRA_ANSWER);
    } else {
      setTestCurrentStep(STEPS.RESULTS);
    }
    console.log(testAnswer);
  }, [testAnswer, testCurrentStep]);

  const prevStep = useCallback(() => {
    if (testCurrentStep === STEPS.RESULTS) {
      setTestCurrentStep(STEPS.EXTRA_ANSWER);
    } else {
      setTestCurrentStep(STEPS.ANSWER_QUESTIONS);
    }
  }, [testCurrentStep]);

  const finishTest = useCallback(
    (extraPointQuestions: number[]) => {
      const finalAnswer = {
        ...testAnswer
      };

      extraPointQuestions.forEach((questionId) => {
        finalAnswer[questionId] += EXTRA_POINTS;
      });

      const result = questions.reduce((columns, question) => {
        const answer = finalAnswer[question.id];
        const currentColumn = columns[question.column] || {};
        const currentResult = currentColumn.result || 0;
        const currentQuestions = currentColumn.questions || [];
        return {
          ...columns,
          [question.column]: {
            questions: [...currentQuestions, { ...question, answer }],
            result: currentResult + answer
          }
        };
      }, {} as TestResult);

      Object.keys(result).forEach((columnId) => {
        result[columnId].result /= 5;
      });

      setTestResult(result);
      setTestCurrentStep(STEPS.RESULTS);
    },
    [testAnswer]
  );

  const currentQuestion = questions[currentQuestionIndex];
  const disableNextQuestion = !testAnswer[currentQuestion.id];
  const isLastQuestion = currentQuestionIndex === lastIndex;

  const value = {
    questions,
    answers,
    testAnswer,
    setAnswer,
    nextStep,
    prevStep,
    nextQuestion,
    prevQuestion,
    disableNextQuestion,
    isLastQuestion,
    currentQuestion,
    currentQuestionIndex,
    testCurrentStep,
    questionsById,
    finishTest,
    testResult
  } as AnchorsTestProviderValue;

  return <context.Provider value={value}>{children}</context.Provider>;
};

export const useAnchorsTest = () => {
  return useContext(context);
};
