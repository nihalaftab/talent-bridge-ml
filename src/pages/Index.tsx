import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Target, 
  Award, 
  TrendingUp, 
  Building2, 
  MapPin,
  IndianRupee,
  Clock,
  ArrowRight
} from 'lucide-react';
import { ApplicationForm } from '../components/ApplicationForm';
import { ResultsDashboard } from '../components/ResultsDashboard';
import { matchingEngine } from '../services/matchingEngine';
import { mockInternships } from '../data/mockData';
import { Candidate, Match } from '../types/internship';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'landing' | 'application' | 'results'>('landing');
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleApplicationSubmit = async (candidateData: Candidate) => {
    setIsLoading(true);
    setCandidate(candidateData);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Calculate matches using the matching engine
      const calculatedMatches = matchingEngine.findMatches(candidateData, mockInternships);
      setMatches(calculatedMatches);
      
      toast({
        title: "Matches Found!",
        description: `Found ${calculatedMatches.length} internship opportunities for you.`,
      });
      
      setCurrentStep('results');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to find matches. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetApplication = () => {
    setCurrentStep('landing');
    setCandidate(null);
    setMatches([]);
  };

  if (currentStep === 'results' && candidate) {
    return (
      <div className="min-h-screen bg-background p-4">
        <ResultsDashboard 
          matches={matches}
          candidate={candidate}
          onBack={() => setCurrentStep('application')}
        />
      </div>
    );
  }

  if (currentStep === 'application') {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="w-full max-w-4xl mx-auto py-8">
          <ApplicationForm 
            onSubmit={handleApplicationSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-primary-foreground text-primary p-2 rounded-lg">
                <Building2 className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">PM Internship Scheme</h1>
                <p className="text-primary-foreground/80">Smart AI-Powered Allocation Engine</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-accent text-accent-foreground">
              Government of India
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Find Your Perfect Internship Match
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Our AI-powered matching engine analyzes your skills, location preferences, and background 
            to connect you with the most suitable internship opportunities in leading Indian companies.
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6"
            onClick={() => setCurrentStep('application')}
          >
            Start Your Application
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
            How Our Smart Matching Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Target className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle className="text-xl">Skills Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  40% weight on matching your technical and soft skills with internship requirements
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <MapPin className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle className="text-xl">Location Preference</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  20% weight on your preferred work location and proximity to opportunities
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <TrendingUp className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle className="text-xl">Sector Interest</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  20% weight on matching your sector preferences with available positions
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle className="text-xl">Inclusivity Focus</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  20% weight on affirmative action and ensuring diverse representation
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
            Current Opportunities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="text-center bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {mockInternships.length}
                </div>
                <p className="text-muted-foreground">Active Internships</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-success/5 border-success/20">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-success mb-2">
                  {mockInternships.reduce((sum, intern) => sum + intern.capacity, 0)}
                </div>
                <p className="text-muted-foreground">Total Positions</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-warning/5 border-warning/20">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-warning mb-2">
                  {new Set(mockInternships.map(i => i.company)).size}
                </div>
                <p className="text-muted-foreground">Partner Companies</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-info/5 border-info/20">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-info mb-2">
                  {new Set(mockInternships.map(i => i.sector)).size}
                </div>
                <p className="text-muted-foreground">Industry Sectors</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sample Internships Preview */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
            Featured Opportunities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockInternships.slice(0, 3).map((internship) => (
              <Card key={internship.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg text-primary">{internship.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    {internship.company}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {internship.location}
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {internship.duration}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 text-success font-medium">
                      <IndianRupee className="h-4 w-4" />
                      ₹{internship.stipend.toLocaleString()}/month
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {internship.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1">
                      {internship.requiredSkills.slice(0, 3).map(skill => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setCurrentStep('application')}
            >
              View All Opportunities
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="bg-primary-foreground text-primary p-2 rounded-lg">
              <Award className="h-6 w-6" />
            </div>
            <span className="text-lg font-semibold">Smart India Hackathon 2024</span>
          </div>
          <p className="text-primary-foreground/80">
            Ministry of Corporate Affairs - AI-Based Smart Allocation Engine for PM Internship Scheme
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;