import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { Candidate } from '../types/internship';
import { skillOptions, sectorOptions, locationOptions, educationOptions } from '../data/mockData';

interface ApplicationFormProps {
  onSubmit: (candidate: Candidate) => void;
  isLoading?: boolean;
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<Partial<Candidate>>({
    skills: [],
    sectorInterest: [],
    category: 'General',
    isRural: false,
    pastParticipation: false,
  });
  
  const [skillInput, setSkillInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSkillAdd = (skill: string) => {
    if (skill && !formData.skills?.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...(prev.skills || []), skill]
      }));
      setSkillInput('');
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills?.filter(skill => skill !== skillToRemove) || []
    }));
  };

  const handleSectorToggle = (sector: string) => {
    setFormData(prev => {
      const current = prev.sectorInterest || [];
      const updated = current.includes(sector)
        ? current.filter(s => s !== sector)
        : [...current, sector];
      return { ...prev, sectorInterest: updated };
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) newErrors.name = 'Name is required';
    if (!formData.email?.trim()) newErrors.email = 'Email is required';
    if (!formData.education?.trim()) newErrors.education = 'Education is required';
    if (!formData.location?.trim()) newErrors.location = 'Location is required';
    if (!formData.skills?.length) newErrors.skills = 'At least one skill is required';
    if (!formData.sectorInterest?.length) newErrors.sectors = 'At least one sector interest is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        id: Date.now().toString(),
        name: formData.name!,
        email: formData.email!,
        skills: formData.skills!,
        experience: formData.experience || '',
        location: formData.location!,
        sectorInterest: formData.sectorInterest!,
        category: formData.category!,
        isRural: formData.isRural!,
        pastParticipation: formData.pastParticipation!,
        education: formData.education!,
        cgpa: formData.cgpa,
        portfolio: formData.portfolio,
      });
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-primary">PM Internship Application</CardTitle>
        <CardDescription>
          Fill out your details to get matched with the best internship opportunities
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email"
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="education">Education *</Label>
                <Select
                  value={formData.education || ''}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, education: value }))}
                >
                  <SelectTrigger className={errors.education ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select education" />
                  </SelectTrigger>
                  <SelectContent>
                    {educationOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.education && <p className="text-sm text-destructive">{errors.education}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cgpa">CGPA/Percentage</Label>
                <Input
                  id="cgpa"
                  type="number"
                  step="0.01"
                  value={formData.cgpa || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, cgpa: parseFloat(e.target.value) }))}
                  placeholder="8.5 or 85%"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Preferred Location *</Label>
                <Select
                  value={formData.location || ''}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, location: value }))}
                >
                  <SelectTrigger className={errors.location ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locationOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.location && <p className="text-sm text-destructive">{errors.location}</p>}
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Skills & Expertise</h3>
            
            <div className="space-y-2">
              <Label>Add Skills *</Label>
              <div className="flex gap-2">
                <Select
                  value={skillInput}
                  onValueChange={(value) => {
                    setSkillInput(value);
                    handleSkillAdd(value);
                  }}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select skills" />
                  </SelectTrigger>
                  <SelectContent>
                    {skillOptions
                      .filter(skill => !formData.skills?.includes(skill))
                      .map(skill => (
                        <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => skillInput && handleSkillAdd(skillInput)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.skills?.map(skill => (
                  <Badge key={skill} variant="secondary" className="pr-1">
                    {skill}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 ml-1"
                      onClick={() => handleSkillRemove(skill)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              {errors.skills && <p className="text-sm text-destructive">{errors.skills}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Experience/Projects</Label>
              <Textarea
                id="experience"
                value={formData.experience || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                placeholder="Describe your relevant experience, projects, or achievements"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="portfolio">Portfolio/LinkedIn URL</Label>
              <Input
                id="portfolio"
                type="url"
                value={formData.portfolio || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, portfolio: e.target.value }))}
                placeholder="https://linkedin.com/in/yourname or portfolio URL"
              />
            </div>
          </div>

          {/* Sector Interests */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Sector Preferences</h3>
            <p className="text-sm text-muted-foreground">Select sectors you're interested in *</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {sectorOptions.map(sector => (
                <div key={sector} className="flex items-center space-x-2">
                  <Checkbox
                    id={sector}
                    checked={formData.sectorInterest?.includes(sector) || false}
                    onCheckedChange={() => handleSectorToggle(sector)}
                  />
                  <Label htmlFor={sector} className="text-sm cursor-pointer">
                    {sector}
                  </Label>
                </div>
              ))}
            </div>
            {errors.sectors && <p className="text-sm text-destructive">{errors.sectors}</p>}
          </div>

          {/* Demographic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Demographic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General">General</SelectItem>
                    <SelectItem value="SC">SC (Scheduled Caste)</SelectItem>
                    <SelectItem value="ST">ST (Scheduled Tribe)</SelectItem>
                    <SelectItem value="OBC">OBC (Other Backward Classes)</SelectItem>
                    <SelectItem value="EWS">EWS (Economically Weaker Section)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rural"
                    checked={formData.isRural}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isRural: !!checked }))}
                  />
                  <Label htmlFor="rural">From Rural/Aspirational District</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pastParticipation"
                    checked={formData.pastParticipation}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, pastParticipation: !!checked }))}
                  />
                  <Label htmlFor="pastParticipation">Previously participated in government internship programs</Label>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
              size="lg"
            >
              {isLoading ? 'Finding Matches...' : 'Find My Perfect Internship Matches'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};