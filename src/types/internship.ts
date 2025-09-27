export interface Candidate {
  id: string;
  name: string;
  email: string;
  skills: string[];
  experience: string;
  location: string;
  sectorInterest: string[];
  category: 'General' | 'SC' | 'ST' | 'OBC' | 'EWS';
  isRural: boolean;
  pastParticipation: boolean;
  education: string;
  cgpa?: number;
  portfolio?: string;
}

export interface Internship {
  id: string;
  title: string;
  company: string;
  sector: string;
  location: string;
  duration: string;
  stipend: number;
  requiredSkills: string[];
  description: string;
  eligibility: string;
  capacity: number;
  filledPositions: number;
  preferredCategory?: string[];
  ruralPreference: boolean;
}

export interface Match {
  internship: Internship;
  score: number;
  breakdown: {
    skillsScore: number;
    locationScore: number;
    sectorScore: number;
    inclusivityScore: number;
    participationScore: number;
  };
}

export interface ScoringWeights {
  skills: number;
  location: number;
  sector: number;
  inclusivity: number;
  participation: number;
}