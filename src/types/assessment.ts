export type Answer = 'yes' | 'no' | 'unknown' | 'n/a';

export interface Question {
  id: string;
  text: string;
  weighting?: string;
}

export interface Domain {
  id: string;
  name: string;
  description: string;
  questions: Question[];
}

export interface Evidence {
  file: File;
  description: string;
}

export interface AssessmentState {
  answers: Record<string, Answer>;
  evidence: Record<string, Evidence>;
}