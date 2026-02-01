export interface Skill {
  name: string;
  proficiency: number; // 1-5 scale
}

export interface Candidate {
  id: number;
  name: string;
  email: string;
  phone: string;
  yearsExperience: number;
  educationLevel: 'High School' | 'Associate' | 'Bachelor' | 'Master' | 'PhD';
  certifications: string[];
  skills: Skill[];
  summary: string;
}

export interface Evaluation {
  candidateId: number;
  crisisManagementScore: number;
  sustainabilityScore: number;
  teamMotivationScore: number;
}

export interface CandidateWithEvaluation extends Candidate {
  evaluation: Evaluation;
  totalScore: number;
  rank: number;
}

// Score weights for ranking calculation
export const SCORE_WEIGHTS = {
  crisisManagement: 0.35,
  sustainability: 0.35,
  teamMotivation: 0.30
} as const;

// Calculate weighted total score
export function calculateTotalScore(evaluation: Evaluation): number {
  return (
    evaluation.crisisManagementScore * SCORE_WEIGHTS.crisisManagement +
    evaluation.sustainabilityScore * SCORE_WEIGHTS.sustainability +
    evaluation.teamMotivationScore * SCORE_WEIGHTS.teamMotivation
  );
}
