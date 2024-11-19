export type Answer = 'positive' | 'negative' | 'no-impact' | 'unknown';
export type CarbonAnswer = 'yes' | 'no' | 'in-progress';

export interface Question {
  id: string;
  text: string;
  category: 'key-metric-un' | 'key-metric' | 'un-goals' | 'standard';
}

export interface Domain {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

export interface CarbonAssessment {
  hasCarbonPlan: CarbonAnswer;
  evergreenLevel?: 1 | 2 | 3 | 4;
  hasLifecycleAnalysis: CarbonAnswer;
  hasCarbonImpact: CarbonAnswer;
}

export interface AssessmentData {
  organisationName: string;
  completionDate: string;
  completedBy: string;
  jobRole: string;
  carbonAssessment?: CarbonAssessment;
}

export interface Evidence {
  file: File;
  description: string;
}

export interface ImpactCounts {
  positive: number;
  negative: number;
  noImpact: number;
  unknown: number;
}

export type CarbonStandard = 'Gold' | 'Silver' | 'Bronze' | 'Net Zero Improvement Needed';