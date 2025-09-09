import { useState, useEffect } from "react";
import { IntroSection } from "@/components/assessment/IntroSection";
import { QuestionCard } from "@/components/assessment/QuestionCard";
import { ResultsSection } from "@/components/assessment/ResultsSection";
import { assessmentQuestions } from "@/data/questions";
import { calculateOverallResult } from "@/utils/scoring";
import { AssessmentStep, AssessmentResponse, AssessmentResult } from "@/types/assessment";

const Assessment = () => {
  const [currentStep, setCurrentStep] = useState<AssessmentStep>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<AssessmentResponse[]>([]);
  const [results, setResults] = useState<AssessmentResult | null>(null);
  const [startTime, setStartTime] = useState<number>(0);

  const handleStart = () => {
    setCurrentStep('psychometric');
    setStartTime(Date.now());
  };

  const handleAnswer = (answer: number | string) => {
    const currentQuestion = assessmentQuestions[currentQuestionIndex];
    const response: AssessmentResponse = {
      questionId: currentQuestion.id,
      answer,
      timeSpent: Date.now() - startTime
    };

    const newResponses = [...responses, response];
    setResponses(newResponses);

    // Move to next question
    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setStartTime(Date.now());
      
      // Update step based on question section
      const nextQuestion = assessmentQuestions[currentQuestionIndex + 1];
      if (nextQuestion.section !== currentQuestion.section) {
        setCurrentStep(nextQuestion.section as AssessmentStep);
      }
    } else {
      // Assessment complete - calculate results
      const finalResults = calculateOverallResult(newResponses, assessmentQuestions);
      setResults(finalResults);
      setCurrentStep('results');
    }
  };

  const handleRestart = () => {
    setCurrentStep('intro');
    setCurrentQuestionIndex(0);
    setResponses([]);
    setResults(null);
    setStartTime(0);
  };

  if (currentStep === 'intro') {
    return <IntroSection onStart={handleStart} />;
  }

  if (currentStep === 'results' && results) {
    return <ResultsSection results={results} onRestart={handleRestart} />;
  }

  // Render current question
  const currentQuestion = assessmentQuestions[currentQuestionIndex];
  
  return (
    <QuestionCard
      question={currentQuestion}
      onAnswer={handleAnswer}
      questionNumber={currentQuestionIndex + 1}
      totalQuestions={assessmentQuestions.length}
    />
  );
};

export default Assessment;