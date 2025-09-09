import { Question } from '@/types/assessment';

export const assessmentQuestions: Question[] = [
  // Psychometric Questions
  {
    id: 'psych_1',
    type: 'likert',
    section: 'psychometric',
    category: 'interest',
    question: 'I enjoy learning about new AI technologies and their practical applications.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    weight: 1.2
  },
  {
    id: 'psych_2',
    type: 'likert',
    section: 'psychometric',
    category: 'persistence',
    question: 'I persist through complex technical problems even when facing repeated failures.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    weight: 1.5
  },
  {
    id: 'psych_3',
    type: 'likert',
    section: 'psychometric',
    category: 'systems_thinking',
    question: 'I think systematically about how different components interact in complex systems.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    weight: 1.3
  },
  {
    id: 'psych_4',
    type: 'likert',
    section: 'psychometric',
    category: 'collaboration',
    question: 'I enjoy collaborating with multidisciplinary teams on technical projects.',
    scale: { min: 1, max: 5, labels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'] },
    weight: 1.0
  },
  {
    id: 'psych_5',
    type: 'multiple-choice',
    section: 'psychometric',
    category: 'problem_solving',
    question: 'When faced with a complex technical problem, you prefer to:',
    options: [
      'Break it down into smaller, manageable components',
      'Research similar problems and their solutions',
      'Experiment with different approaches quickly',
      'Discuss with colleagues and brainstorm solutions'
    ],
    weight: 1.1
  },

  // Technical Questions
  {
    id: 'tech_1',
    type: 'multiple-choice',
    section: 'technical',
    category: 'ai_fundamentals',
    question: 'Which technique is most important for deploying AI models on resource-constrained edge devices?',
    options: [
      'Model quantization and pruning',
      'Increasing model complexity',
      'Using larger datasets',
      'Adding more layers'
    ],
    correct: 0,
    weight: 2.0
  },
  {
    id: 'tech_2',
    type: 'multiple-choice',
    section: 'technical',
    category: 'edge_computing',
    question: 'What is the primary advantage of edge computing over cloud computing for AI applications?',
    options: [
      'Higher computational power',
      'Reduced latency and improved privacy',
      'Lower development costs',
      'Simpler deployment process'
    ],
    correct: 1,
    weight: 1.8
  },
  {
    id: 'tech_3',
    type: 'multiple-choice',
    section: 'technical',
    category: 'programming',
    question: 'Which programming languages are most commonly used for edge AI development?',
    options: [
      'Python and JavaScript',
      'C++ and Python',
      'Java and Ruby',
      'Swift and Kotlin'
    ],
    correct: 1,
    weight: 1.5
  },
  {
    id: 'tech_4',
    type: 'technical',
    section: 'technical',
    category: 'optimization',
    question: 'A neural network model requires 2GB of memory but your edge device only has 512MB available. What would be your first optimization approach?',
    options: [
      'Use model quantization to reduce precision',
      'Remove all convolutional layers',
      'Increase the batch size',
      'Add more training data'
    ],
    correct: 0,
    weight: 2.2
  },

  // WISCAR Questions
  {
    id: 'wiscar_will_1',
    type: 'likert',
    section: 'wiscar',
    category: 'will',
    question: 'I am willing to spend 10+ hours per week learning edge AI concepts and technologies.',
    scale: { min: 1, max: 5, labels: ['Not at all', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    weight: 1.5
  },
  {
    id: 'wiscar_interest_1',
    type: 'likert',
    section: 'wiscar',
    category: 'interest',
    question: 'I find the intersection of AI and hardware fascinating and want to explore it deeply.',
    scale: { min: 1, max: 5, labels: ['Not at all', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    weight: 1.4
  },
  {
    id: 'wiscar_skill_1',
    type: 'multiple-choice',
    section: 'wiscar',
    category: 'skill',
    question: 'How would you rate your current programming experience?',
    options: [
      'Beginner (0-1 years)',
      'Intermediate (2-3 years)',
      'Advanced (4-6 years)',
      'Expert (7+ years)'
    ],
    weight: 1.8
  },
  {
    id: 'wiscar_cognitive_1',
    type: 'scenario',
    section: 'wiscar',
    category: 'cognitive',
    question: 'You\'re tasked with optimizing an AI model that\'s running slowly on an IoT device. The model accuracy is good but inference time is too slow. How do you approach this?',
    options: [
      'Analyze computational bottlenecks and apply targeted optimizations',
      'Reduce model accuracy to improve speed',
      'Upgrade the hardware immediately',
      'Redesign the entire system architecture'
    ],
    correct: 0,
    weight: 2.0
  },
  {
    id: 'wiscar_ability_1',
    type: 'likert',
    section: 'wiscar',
    category: 'ability',
    question: 'I actively seek feedback and use it to improve my technical skills.',
    scale: { min: 1, max: 5, labels: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'] },
    weight: 1.3
  },
  {
    id: 'wiscar_real_world_1',
    type: 'multiple-choice',
    section: 'wiscar',
    category: 'realWorld',
    question: 'Which aspect of edge AI work appeals to you most?',
    options: [
      'Solving real-world problems with immediate impact',
      'Working with cutting-edge technology',
      'The technical challenges and problem-solving',
      'Building products that users interact with daily'
    ],
    weight: 1.2
  }
];