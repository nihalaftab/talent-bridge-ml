import { Internship } from '../types/internship';

export const mockInternships: Internship[] = [
  {
    id: '1',
    title: 'Software Development Intern',
    company: 'Infosys Limited',
    sector: 'Information Technology',
    location: 'Bangalore',
    duration: '3 months',
    stipend: 25000,
    requiredSkills: ['React', 'JavaScript', 'Python', 'SQL'],
    description: 'Work on cutting-edge web applications and learn industry best practices.',
    eligibility: 'Engineering students in Computer Science or related fields',
    capacity: 50,
    filledPositions: 12,
    preferredCategory: ['SC', 'ST'],
    ruralPreference: true
  },
  {
    id: '2',
    title: 'Data Analytics Intern',
    company: 'Tata Consultancy Services',
    sector: 'Information Technology',
    location: 'Mumbai',
    duration: '4 months',
    stipend: 30000,
    requiredSkills: ['Python', 'Machine Learning', 'SQL', 'Power BI'],
    description: 'Analyze business data and create insights for client projects.',
    eligibility: 'Students from Computer Science, Statistics, or Mathematics',
    capacity: 30,
    filledPositions: 8,
    preferredCategory: ['General', 'OBC'],
    ruralPreference: false
  },
  {
    id: '3',
    title: 'Digital Marketing Intern',
    company: 'Wipro Limited',
    sector: 'Marketing & Communications',
    location: 'Delhi',
    duration: '2 months',
    stipend: 18000,
    requiredSkills: ['Digital Marketing', 'Social Media', 'Content Creation', 'SEO'],
    description: 'Create and execute digital marketing campaigns across various platforms.',
    eligibility: 'Students from Marketing, Communications, or Business',
    capacity: 25,
    filledPositions: 5,
    preferredCategory: ['EWS', 'SC'],
    ruralPreference: true
  },
  {
    id: '4',
    title: 'Financial Analysis Intern',
    company: 'ICICI Bank',
    sector: 'Banking & Finance',
    location: 'Chennai',
    duration: '3 months',
    stipend: 22000,
    requiredSkills: ['Financial Modeling', 'Excel', 'Data Analysis', 'Statistics'],
    description: 'Support financial planning and analysis activities for business units.',
    eligibility: 'Students from Finance, Economics, or Commerce',
    capacity: 20,
    filledPositions: 3,
    preferredCategory: ['ST', 'OBC'],
    ruralPreference: false
  },
  {
    id: '5',
    title: 'Manufacturing Process Intern',
    company: 'Mahindra & Mahindra',
    sector: 'Manufacturing',
    location: 'Pune',
    duration: '6 months',
    stipend: 28000,
    requiredSkills: ['Process Optimization', 'Quality Control', 'Lean Manufacturing', 'Six Sigma'],
    description: 'Work on production line optimization and quality improvement projects.',
    eligibility: 'Mechanical, Industrial, or Production Engineering students',
    capacity: 15,
    filledPositions: 2,
    preferredCategory: ['General', 'EWS'],
    ruralPreference: true
  },
  {
    id: '6',
    title: 'Healthcare Technology Intern',
    company: 'Apollo Hospitals',
    sector: 'Healthcare',
    location: 'Hyderabad',
    duration: '4 months',
    stipend: 26000,
    requiredSkills: ['Healthcare IT', 'Database Management', 'Medical Software', 'Data Privacy'],
    description: 'Develop and maintain healthcare information systems.',
    eligibility: 'Students from IT, Biomedical Engineering, or Health Informatics',
    capacity: 18,
    filledPositions: 4,
    preferredCategory: ['SC', 'General'],
    ruralPreference: false
  },
  {
    id: '7',
    title: 'Green Energy Research Intern',
    company: 'Tata Power',
    sector: 'Energy & Environment',
    location: 'Kolkata',
    duration: '5 months',
    stipend: 24000,
    requiredSkills: ['Renewable Energy', 'Research Methodology', 'Data Collection', 'Report Writing'],
    description: 'Research sustainable energy solutions and environmental impact assessment.',
    eligibility: 'Students from Environmental Science, Electrical Engineering, or Energy Studies',
    capacity: 12,
    filledPositions: 1,
    preferredCategory: ['ST', 'EWS'],
    ruralPreference: true
  },
  {
    id: '8',
    title: 'Supply Chain Analytics Intern',
    company: 'Flipkart',
    sector: 'E-commerce & Retail',
    location: 'Bangalore',
    duration: '3 months',
    stipend: 32000,
    requiredSkills: ['Supply Chain Management', 'Data Analytics', 'Operations Research', 'Excel'],
    description: 'Optimize supply chain operations through data-driven insights.',
    eligibility: 'Students from Operations Management, Industrial Engineering, or Business Analytics',
    capacity: 22,
    filledPositions: 6,
    preferredCategory: ['OBC', 'General'],
    ruralPreference: false
  }
];

export const skillOptions = [
  'React', 'JavaScript', 'Python', 'Java', 'C++', 'SQL', 'Machine Learning', 
  'Data Analysis', 'Power BI', 'Excel', 'Digital Marketing', 'SEO', 'Content Creation',
  'Social Media', 'Financial Modeling', 'Statistics', 'Process Optimization', 
  'Quality Control', 'Lean Manufacturing', 'Six Sigma', 'Healthcare IT', 
  'Database Management', 'Medical Software', 'Data Privacy', 'Renewable Energy',
  'Research Methodology', 'Data Collection', 'Report Writing', 'Supply Chain Management',
  'Operations Research', 'Business Analytics'
];

export const sectorOptions = [
  'Information Technology',
  'Banking & Finance',
  'Healthcare',
  'Manufacturing',
  'Energy & Environment',
  'Marketing & Communications',
  'E-commerce & Retail',
  'Telecommunications',
  'Automotive',
  'Pharmaceuticals'
];

export const locationOptions = [
  'Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Pune', 'Hyderabad', 
  'Kolkata', 'Ahmedabad', 'Surat', 'Jaipur', 'Lucknow', 'Kanpur',
  'Nagpur', 'Patna', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam',
  'Vadodara', 'Firozabad'
];

export const educationOptions = [
  'B.Tech/B.E. Computer Science',
  'B.Tech/B.E. Electronics',
  'B.Tech/B.E. Mechanical',
  'B.Tech/B.E. Civil',
  'B.Tech/B.E. Electrical',
  'BCA',
  'MCA',
  'B.Sc. Computer Science',
  'B.Sc. Mathematics',
  'B.Sc. Statistics',
  'BBA',
  'MBA',
  'B.Com',
  'M.Com',
  'BA Economics',
  'MA Economics',
  'Other'
];