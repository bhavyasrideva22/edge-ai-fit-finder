import { AssessmentResponse, Question, AssessmentResult, WISCARScore, SectionScore, CareerPath } from '@/types/assessment';

export function calculateSectionScore(
  responses: AssessmentResponse[],
  questions: Question[],
  section: string
): SectionScore {
  const sectionQuestions = questions.filter(q => q.section === section);
  const sectionResponses = responses.filter(r => 
    sectionQuestions.find(q => q.id === r.questionId)
  );

  let totalScore = 0;
  let maxScore = 0;

  sectionResponses.forEach(response => {
    const question = sectionQuestions.find(q => q.id === response.questionId);
    if (!question) return;

    if (question.type === 'likert') {
      totalScore += (Number(response.answer) * question.weight);
      maxScore += (5 * question.weight);
    } else if (question.type === 'multiple-choice' || question.type === 'technical' || question.type === 'scenario') {
      if (question.correct !== undefined) {
        totalScore += (Number(response.answer) === question.correct ? 1 : 0) * question.weight;
        maxScore += question.weight;
      } else {
        // For non-scored multiple choice (like skill level)
        totalScore += ((Number(response.answer) + 1) / 4) * question.weight;
        maxScore += question.weight;
      }
    }
  });

  const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

  return {
    section,
    score: totalScore,
    maxScore,
    percentage,
    interpretation: getInterpretation(percentage, section)
  };
}

export function calculateWISCARScores(
  responses: AssessmentResponse[],
  questions: Question[]
): WISCARScore {
  const wiscarCategories = ['will', 'interest', 'skill', 'cognitive', 'ability', 'realWorld'];
  const scores: WISCARScore = {
    will: 0,
    interest: 0,
    skill: 0,
    cognitive: 0,
    ability: 0,
    realWorld: 0
  };

  wiscarCategories.forEach(category => {
    const categoryQuestions = questions.filter(q => 
      q.section === 'wiscar' && q.category === category
    );
    const categoryResponses = responses.filter(r => 
      categoryQuestions.find(q => q.id === r.questionId)
    );

    let totalScore = 0;
    let maxScore = 0;

    categoryResponses.forEach(response => {
      const question = categoryQuestions.find(q => q.id === response.questionId);
      if (!question) return;

      if (question.type === 'likert') {
        totalScore += Number(response.answer) * question.weight;
        maxScore += 5 * question.weight;
      } else if (question.type === 'multiple-choice' || question.type === 'scenario') {
        if (question.correct !== undefined) {
          totalScore += (Number(response.answer) === question.correct ? 1 : 0) * question.weight;
          maxScore += question.weight;
        } else {
          totalScore += ((Number(response.answer) + 1) / 4) * question.weight;
          maxScore += question.weight;
        }
      }
    });

    const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;
    scores[category as keyof WISCARScore] = Math.round(percentage);
  });

  return scores;
}

export function calculateOverallResult(
  responses: AssessmentResponse[],
  questions: Question[]
): AssessmentResult {
  const psychometricScore = calculateSectionScore(responses, questions, 'psychometric');
  const technicalScore = calculateSectionScore(responses, questions, 'technical');
  const wiscarScores = calculateWISCARScores(responses, questions);

  // Calculate overall confidence score
  const overallConfidence = Math.round(
    (psychometricScore.percentage * 0.3) +
    (technicalScore.percentage * 0.4) +
    (Object.values(wiscarScores).reduce((a, b) => a + b, 0) / 6 * 0.3)
  );

  // Determine recommendation
  let recommendation: 'yes' | 'maybe' | 'no';
  if (overallConfidence >= 75 && technicalScore.percentage >= 70) {
    recommendation = 'yes';
  } else if (overallConfidence >= 55) {
    recommendation = 'maybe';
  } else {
    recommendation = 'no';
  }

  return {
    psychometricScore: Math.round(psychometricScore.percentage),
    technicalScore: Math.round(technicalScore.percentage),
    wiscarScores,
    overallConfidence,
    recommendation,
    insights: generateInsights(psychometricScore, technicalScore, wiscarScores, recommendation),
    nextSteps: generateNextSteps(recommendation, technicalScore.percentage, psychometricScore.percentage),
    careerPaths: generateCareerPaths(overallConfidence, technicalScore.percentage)
  };
}

function getInterpretation(percentage: number, section: string): string {
  if (percentage >= 80) return 'Excellent fit';
  if (percentage >= 65) return 'Good fit';
  if (percentage >= 50) return 'Moderate fit';
  if (percentage >= 35) return 'Some potential';
  return 'Needs development';
}

function generateInsights(
  psychometric: SectionScore,
  technical: SectionScore,
  wiscar: WISCARScore,
  recommendation: string
): string[] {
  const insights: string[] = [];

  if (psychometric.percentage >= 75) {
    insights.push('You show strong psychological alignment with Edge AI work, including curiosity and persistence.');
  } else if (psychometric.percentage >= 50) {
    insights.push('You have moderate psychological fit. Building confidence through structured learning would help.');
  } else {
    insights.push('Consider exploring foundational AI concepts to build interest and confidence.');
  }

  if (technical.percentage >= 70) {
    insights.push('Your technical foundation is solid for Edge AI development.');
  } else if (technical.percentage >= 50) {
    insights.push('You have basic technical understanding but need focused skill development.');
  } else {
    insights.push('Significant technical preparation needed. Start with programming and AI fundamentals.');
  }

  if (wiscar.will >= 70 && wiscar.interest >= 70) {
    insights.push('Your motivation and interest levels are excellent - key predictors of success.');
  }

  if (wiscar.cognitive >= 75) {
    insights.push('You demonstrate strong analytical thinking suitable for complex Edge AI challenges.');
  }

  return insights;
}

function generateNextSteps(
  recommendation: string,
  technicalScore: number,
  psychometricScore: number
): string[] {
  const steps: string[] = [];

  if (recommendation === 'yes') {
    steps.push('Start with TinyML specialization or Edge AI certification');
    steps.push('Build a portfolio project deploying a model on Raspberry Pi or Arduino');
    steps.push('Join Edge AI communities and attend relevant meetups');
    steps.push('Apply for Edge AI Engineer or Embedded AI Developer roles');
  } else if (recommendation === 'maybe') {
    if (technicalScore < 60) {
      steps.push('Complete foundational courses in Python programming and machine learning');
      steps.push('Practice with TensorFlow Lite and model optimization techniques');
    }
    if (psychometricScore < 60) {
      steps.push('Explore Edge AI through online courses and tutorials to build interest');
      steps.push('Connect with professionals in the field through LinkedIn and forums');
    }
    steps.push('Reassess readiness after 3-6 months of focused learning');
  } else {
    steps.push('Consider related fields: Data Science, Cloud AI Engineering, or Software Development');
    steps.push('Build stronger programming fundamentals before specializing');
    steps.push('Explore AI through online courses to understand if interest develops');
  }

  return steps;
}

function generateCareerPaths(
  overallConfidence: number,
  technicalScore: number
): CareerPath[] {
  const paths: CareerPath[] = [
    {
      title: 'Edge AI Engineer',
      description: 'Deploy and optimize AI models on edge devices and IoT systems',
      fitScore: Math.max(0, overallConfidence - 5),
      requiredSkills: ['Python/C++', 'TensorFlow Lite', 'Model Optimization', 'Embedded Systems'],
      salary: '$95,000 - $140,000'
    },
    {
      title: 'Embedded AI Developer',
      description: 'Integrate AI algorithms with hardware components and microcontrollers',
      fitScore: Math.max(0, (technicalScore * 0.7) + (overallConfidence * 0.3)),
      requiredSkills: ['C/C++', 'Embedded Programming', 'Neural Networks', 'Hardware Interfacing'],
      salary: '$85,000 - $125,000'
    },
    {
      title: 'IoT Solutions Architect',
      description: 'Design AI-driven edge IoT solutions for enterprise clients',
      fitScore: Math.max(0, overallConfidence - 10),
      requiredSkills: ['System Architecture', 'IoT Protocols', 'AI/ML', 'Cloud Integration'],
      salary: '$110,000 - $160,000'
    },
    {
      title: 'AI Deployment Specialist',
      description: 'Manage AI model deployment pipelines and device management at scale',
      fitScore: Math.max(0, (overallConfidence * 0.8) + 10),
      requiredSkills: ['MLOps', 'DevOps', 'Model Deployment', 'Monitoring Systems'],
      salary: '$90,000 - $130,000'
    }
  ];

  return paths.sort((a, b) => b.fitScore - a.fitScore);
}