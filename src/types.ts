export interface Profile {
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  linkedin: string; // full URL
  linkedinLabel: string; // display text
  location: string;
  resumeUrl: string; // path to downloadable PDF in /public
}

export interface SkillGroup {
  label: string;
  skills: string[];
}

export interface Experience {
  company: string;
  title: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
}

export interface Education {
  institution: string;
  credential: string;
  location: string;
  period: string;
  details: string[];
}

export interface Resume {
  profile: Profile;
  summary: string;
  about: string[];
  skills: SkillGroup[];
  experience: Experience[];
  education: Education[];
}
