import { Candidate, Internship, Match, ScoringWeights } from '../types/internship';

const defaultWeights: ScoringWeights = {
  skills: 0.4,      // 40%
  location: 0.2,    // 20%
  sector: 0.2,      // 20%
  inclusivity: 0.1, // 10%
  participation: 0.1 // 10%
};

export class MatchingEngine {
  private weights: ScoringWeights;

  constructor(weights: ScoringWeights = defaultWeights) {
    this.weights = weights;
  }

  public findMatches(candidate: Candidate, internships: Internship[]): Match[] {
    const matches = internships.map(internship => ({
      internship,
      ...this.calculateScore(candidate, internship)
    }));

    // Sort by score in descending order
    return matches.sort((a, b) => b.score - a.score);
  }

  private calculateScore(candidate: Candidate, internship: Internship): {
    score: number;
    breakdown: Match['breakdown'];
  } {
    const skillsScore = this.calculateSkillsScore(candidate.skills, internship.requiredSkills);
    const locationScore = this.calculateLocationScore(candidate.location, internship.location);
    const sectorScore = this.calculateSectorScore(candidate.sectorInterest, internship.sector);
    const inclusivityScore = this.calculateInclusivityScore(candidate, internship);
    const participationScore = this.calculateParticipationScore(candidate.pastParticipation);

    const score = 
      (skillsScore * this.weights.skills) +
      (locationScore * this.weights.location) +
      (sectorScore * this.weights.sector) +
      (inclusivityScore * this.weights.inclusivity) +
      (participationScore * this.weights.participation);

    return {
      score: Math.round(score * 100) / 100,
      breakdown: {
        skillsScore: Math.round(skillsScore * 100),
        locationScore: Math.round(locationScore * 100),
        sectorScore: Math.round(sectorScore * 100),
        inclusivityScore: Math.round(inclusivityScore * 100),
        participationScore: Math.round(participationScore * 100)
      }
    };
  }

  private calculateSkillsScore(candidateSkills: string[], requiredSkills: string[]): number {
    if (requiredSkills.length === 0) return 1;
    
    const matchingSkills = candidateSkills.filter(skill => 
      requiredSkills.some(required => 
        skill.toLowerCase().includes(required.toLowerCase()) ||
        required.toLowerCase().includes(skill.toLowerCase())
      )
    );

    return matchingSkills.length / requiredSkills.length;
  }

  private calculateLocationScore(candidateLocation: string, internshipLocation: string): number {
    if (candidateLocation.toLowerCase() === internshipLocation.toLowerCase()) {
      return 1;
    }
    
    // Check if same state (simplified - in real implementation, use proper location mapping)
    const sameState = this.isSameState(candidateLocation, internshipLocation);
    return sameState ? 0.7 : 0.3;
  }

  private calculateSectorScore(candidateSectors: string[], internshipSector: string): number {
    return candidateSectors.some(sector => 
      sector.toLowerCase() === internshipSector.toLowerCase()
    ) ? 1 : 0.5;
  }

  private calculateInclusivityScore(candidate: Candidate, internship: Internship): number {
    let score = 0.5; // Base score
    
    // Rural preference bonus
    if (internship.ruralPreference && candidate.isRural) {
      score += 0.3;
    }
    
    // Category preference bonus
    if (internship.preferredCategory?.includes(candidate.category)) {
      score += 0.2;
    }
    
    return Math.min(score, 1);
  }

  private calculateParticipationScore(pastParticipation: boolean): number {
    // Higher score for first-time participants to encourage inclusivity
    return pastParticipation ? 0.6 : 1;
  }

  private isSameState(location1: string, location2: string): boolean {
    // Simplified state mapping - in real implementation, use proper geographical data
    const stateMap: { [key: string]: string } = {
      'Mumbai': 'Maharashtra',
      'Pune': 'Maharashtra',
      'Bangalore': 'Karnataka',
      'Chennai': 'Tamil Nadu',
      'Delhi': 'Delhi',
      'Hyderabad': 'Telangana',
      'Kolkata': 'West Bengal',
      'Ahmedabad': 'Gujarat',
      'Surat': 'Gujarat',
      'Jaipur': 'Rajasthan'
    };

    return stateMap[location1] === stateMap[location2];
  }

  public updateWeights(newWeights: Partial<ScoringWeights>) {
    this.weights = { ...this.weights, ...newWeights };
  }

  public getWeights(): ScoringWeights {
    return { ...this.weights };
  }
}

export const matchingEngine = new MatchingEngine();