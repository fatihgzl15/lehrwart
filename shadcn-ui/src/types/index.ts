export interface User {
  id?: string;
  name: string;
  email: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  difficulty: string;
}

export interface FlashCard {
  id: string;
  term: string;
  definition: string;
  category: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  maxParticipants: number;
  participants: User[];
  waitlist: User[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Download {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  category: string;
  uploadDate: string;
}

export interface RuleUpdate {
  id: string;
  title: string;
  description: string;
  date: string;
  details: string;
}

export interface FeedbackSubmission {
  name: string;
  email: string;
  message: string;
  category: string;
}