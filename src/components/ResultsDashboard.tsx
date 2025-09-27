import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, 
  Clock, 
  IndianRupee, 
  Users, 
  Award, 
  Building2,
  ArrowLeft,
  ExternalLink,
  Star
} from 'lucide-react';
import { Match, Candidate } from '../types/internship';

interface ResultsDashboardProps {
  matches: Match[];
  candidate: Candidate;
  onBack: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ 
  matches, 
  candidate, 
  onBack 
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return 'default';
    if (score >= 60) return 'secondary';
    return 'destructive';
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Application
          </Button>
          <h1 className="text-3xl font-bold text-primary">Your Internship Matches</h1>
          <p className="text-muted-foreground mt-1">
            Hi {candidate.name}, we found {matches.length} internships that match your profile
          </p>
        </div>
      </div>

      {/* Candidate Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Your Profile Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Skills</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {candidate.skills.slice(0, 3).map(skill => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {candidate.skills.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{candidate.skills.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium">{candidate.location}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Category</p>
              <p className="font-medium">{candidate.category}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Background</p>
              <div className="space-y-1">
                {candidate.isRural && (
                  <Badge variant="secondary" className="text-xs">Rural/Aspirational</Badge>
                )}
                {candidate.pastParticipation && (
                  <Badge variant="secondary" className="text-xs">Past Participant</Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Matches */}
      <div className="space-y-4">
        {matches.map((match, index) => (
          <Card key={match.internship.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-xl text-primary">
                      {match.internship.title}
                    </CardTitle>
                    <Badge 
                      className={`text-lg px-3 py-1 ${getScoreColor(match.score * 100)}`}
                      variant={getScoreBadgeVariant(match.score * 100)}
                    >
                      {Math.round(match.score * 100)}% Match
                    </Badge>
                    {index < 3 && (
                      <Badge variant="outline" className="bg-warning/10 text-warning-foreground">
                        <Star className="w-3 h-3 mr-1" />
                        Top {index + 1}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground mt-2">
                    <div className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      {match.internship.company}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {match.internship.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {match.internship.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <IndianRupee className="h-4 w-4" />
                      ₹{match.internship.stipend.toLocaleString()}/month
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <p className="text-foreground">{match.internship.description}</p>
              </div>

              {/* Scoring Breakdown */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Match Breakdown</h4>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Skills Match</span>
                      <span className="font-medium">{match.breakdown.skillsScore}%</span>
                    </div>
                    <Progress value={match.breakdown.skillsScore} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Location</span>
                      <span className="font-medium">{match.breakdown.locationScore}%</span>
                    </div>
                    <Progress value={match.breakdown.locationScore} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Sector</span>
                      <span className="font-medium">{match.breakdown.sectorScore}%</span>
                    </div>
                    <Progress value={match.breakdown.sectorScore} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Inclusivity</span>
                      <span className="font-medium">{match.breakdown.inclusivityScore}%</span>
                    </div>
                    <Progress value={match.breakdown.inclusivityScore} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Participation</span>
                      <span className="font-medium">{match.breakdown.participationScore}%</span>
                    </div>
                    <Progress value={match.breakdown.participationScore} className="h-2" />
                  </div>
                </div>
              </div>

              {/* Required Skills */}
              <div>
                <h4 className="font-semibold text-foreground mb-2">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {match.internship.requiredSkills.map(skill => {
                    const hasSkill = candidate.skills.some(cs => 
                      cs.toLowerCase().includes(skill.toLowerCase()) ||
                      skill.toLowerCase().includes(cs.toLowerCase())
                    );
                    return (
                      <Badge 
                        key={skill} 
                        variant={hasSkill ? "default" : "outline"}
                        className={hasSkill ? "bg-success text-success-foreground" : ""}
                      >
                        {skill}
                        {hasSkill && <span className="ml-1">✓</span>}
                      </Badge>
                    );
                  })}
                </div>
              </div>

              {/* Internship Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">Sector</p>
                  <p className="font-medium">{match.internship.sector}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Eligibility</p>
                  <p className="text-sm">{match.internship.eligibility}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Capacity</p>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span className="font-medium">
                        {match.internship.filledPositions}/{match.internship.capacity}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <Progress 
                      value={(match.internship.filledPositions / match.internship.capacity) * 100} 
                      className="h-2 mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <Button className="w-full" size="lg">
                  Apply for this Internship
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {matches.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Award className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No matches found</h3>
            <p className="text-muted-foreground">
              Try adjusting your preferences or adding more skills to find suitable internships.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};