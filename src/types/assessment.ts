export interface Question {
  id: string;
  type: 'likert' | 'multiple-choice' | 'technical' | 'scenario';
  section: 'psychometric' | 'technical' | 'wiscar';
  category: string;
  question: string;
  options?: string[];
  scale?: { min: number; max: number; labels: string[] };
  correct?: number;
  weight: number;
}

export interface AssessmentResponse {
  questionId: string;
  answer: number | string;
  timeSpent: number;
}

export interface SectionScore {
  section: string;
  score: number;
  maxScore: number;
  percentage: number;
  interpretation: string;
}

export interface WISCARScore {
  will: number;
  interest: number;
  skill: number;
  cognitive: number;
  ability: number;
  realWorld: number;
}

export interface AssessmentResult {
  psychometricScore: number;
  technicalScore: number;
  wiscarScores: WISCARScore;
  overallConfidence: number;
  recommendation: 'yes' | 'maybe' | 'no';
  insights: string[];
  nextSteps: string[];
  careerPaths: CareerPath[];
}

export interface CareerPath {
  title: string;
  description: string;
  fitScore: number;
  requiredSkills: string[];
  salary: string;
}

export type AssessmentStep = 
  | 'intro'
  | 'psychometric'
  | 'technical'
  | 'wiscar'
  | 'results';