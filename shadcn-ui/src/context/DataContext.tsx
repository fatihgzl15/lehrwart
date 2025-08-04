import { createContext, useContext, useState, ReactNode } from 'react';
import { Event, FAQ, FlashCard, Question, Download, RuleUpdate, User, FeedbackSubmission } from '@/types';

// Sample data
const initialQuestions: Question[] = [
  {
    id: '1',
    text: 'Welche der folgenden Aktionen resultiert in einem direkten Freistoß?',
    options: ['Abseits', 'Gefährliches Spiel', 'Behinderung ohne Kontakt', 'Treten eines Gegners'],
    correctAnswer: 3,
    explanation: 'Treten eines Gegners ist ein Foulspiel, das mit einem direkten Freistoß geahndet wird.',
    category: 'Regelwerk',
    difficulty: 'Einfach'
  },
  {
    id: '2',
    text: 'Ein Spieler tritt den Ball zu seinem Torhüter zurück. Der Torhüter nimmt den Ball mit den Händen auf. Die korrekte Entscheidung ist:',
    options: [
      'Weiterspielen', 
      'Indirekter Freistoß dort, wo der Torhüter den Ball aufgenommen hat', 
      'Direkter Freistoß', 
      'Eckstoß'
    ],
    correctAnswer: 1,
    explanation: 'Bei einem absichtlichen Rückpass mit dem Fuß zum eigenen Torhüter darf dieser den Ball nicht mit den Händen aufnehmen.',
    category: 'Regelwerk',
    difficulty: 'Mittel'
  },
  {
    id: '3',
    text: 'Wer führt den Münzwurf vor dem Spielbeginn durch?',
    options: [
      'Schiedsrichter', 
      'Schiedsrichterassistent', 
      'Vierter Offizieller', 
      'Die Mannschaftskapitäne'
    ],
    correctAnswer: 0,
    explanation: 'Der Schiedsrichter führt den Münzwurf durch, bei dem die Mannschaft, die gewinnt, entscheidet, auf welches Tor sie in der ersten Halbzeit spielt.',
    category: 'Spielvorbereitung',
    difficulty: 'Einfach'
  }
];

const initialFlashcards: FlashCard[] = [
  {
    id: '1',
    term: 'Abseits',
    definition: 'Ein Spieler befindet sich in einer Abseitsposition, wenn er der gegnerischen Torlinie näher ist als der Ball und der vorletzte Gegenspieler.',
    category: 'Regelwerk'
  },
  {
    id: '2',
    term: 'Vorteil',
    definition: 'Der Schiedsrichter kann das Spiel weiterlaufen lassen, wenn die Mannschaft, gegen die sich ein Vergehen richtet, dadurch einen Vorteil erlangt.',
    category: 'Schiedsrichterentscheidungen'
  },
  {
    id: '3',
    term: 'Strafstoß',
    definition: 'Ein Strafstoß wird verhängt, wenn ein Spieler innerhalb seines eigenen Strafraums ein Vergehen begeht, das mit einem direkten Freistoß zu ahnden ist.',
    category: 'Regelwerk'
  }
];

const initialEvents: Event[] = [
  {
    id: '1',
    title: 'Lehrabend: Regeländerungen 2025',
    description: 'Vorstellung der neuen Regeländerungen für die kommende Saison mit praktischen Beispielen.',
    date: '2025-08-15',
    time: '19:00',
    location: 'Sportheim SV Beispiel',
    maxParticipants: 30,
    participants: [],
    waitlist: []
  },
  {
    id: '2',
    title: 'Praxistraining: Stellungsspiel',
    description: 'Praktisches Training zum Thema Stellungsspiel auf dem Platz mit Videoanalyse.',
    date: '2025-08-22',
    time: '18:00',
    location: 'Sportplatz FC Muster',
    maxParticipants: 20,
    participants: [],
    waitlist: []
  }
];

const initialFAQs: FAQ[] = [
  {
    id: '1',
    question: 'Wann muss ich für einen Spieleinsatz absagen?',
    answer: 'Absagen sollten mindestens 7 Tage vor dem Spieltermin erfolgen, damit ein Ersatz gefunden werden kann.',
    category: 'Organisation'
  },
  {
    id: '2',
    question: 'Wie viele Pflichtsitzungen muss ich pro Saison besuchen?',
    answer: 'Jeder aktive Schiedsrichter muss mindestens 4 Pflichtsitzungen pro Saison besuchen, um seinen Status zu behalten.',
    category: 'Organisation'
  },
  {
    id: '3',
    question: 'Was passiert bei einem Spielabbruch?',
    answer: 'Bei einem Spielabbruch muss ein ausführlicher Sonderbericht erstellt und innerhalb von 24 Stunden an den zuständigen Spielausschuss gesendet werden.',
    category: 'Regelwerk'
  }
];

const initialDownloads: Download[] = [
  {
    id: '1',
    title: 'Aktuelles Regelwerk 2025',
    description: 'Die vollständige aktuelle Version des Regelwerks als PDF.',
    fileUrl: '/downloads/regelwerk_2025.pdf',
    category: 'Regelwerk',
    uploadDate: '2025-07-01'
  },
  {
    id: '2',
    title: 'Präsentation: Handspiel',
    description: 'Schulungsmaterial zum Thema Handspielauslegung mit Beispielen.',
    fileUrl: '/downloads/handspiel_praesentation.pdf',
    category: 'Schulungsmaterial',
    uploadDate: '2025-06-15'
  },
  {
    id: '3',
    title: 'Spielberichtsbogen',
    description: 'Ausfüllbarer Spielberichtsbogen für Notfälle ohne Online-Zugang.',
    fileUrl: '/downloads/spielberichtsbogen.pdf',
    category: 'Formulare',
    uploadDate: '2025-05-20'
  }
];

const initialRuleUpdates: RuleUpdate[] = [
  {
    id: '1',
    title: 'Änderung der Handspielregel',
    description: 'Klarstellung zur Interpretation der Handspielregel',
    date: '2025-07-01',
    details: 'Ab der Saison 2025/26 gilt: Ein Handspiel liegt vor, wenn ein Spieler den Ball absichtlich mit der Hand oder dem Arm berührt oder seine Körperfläche damit unnatürlich vergrößert. Die Position der Hand in Relation zum Körper wird nun genauer definiert.'
  },
  {
    id: '2',
    title: 'Neue Regelung bei Auswechslungen',
    description: 'Änderungen beim Auswechselvorgang',
    date: '2025-06-15',
    details: 'Ausgewechselte Spieler müssen künftig das Spielfeld an der nächstgelegenen Begrenzungslinie verlassen, um Spielverzögerungen zu vermeiden.'
  }
];

interface DataContextType {
  questions: Question[];
  flashcards: FlashCard[];
  events: Event[];
  faqs: FAQ[];
  downloads: Download[];
  ruleUpdates: RuleUpdate[];
  addParticipant: (eventId: string, user: User) => void;
  submitFeedback: (feedback: FeedbackSubmission) => void;
  checkAnswer: (questionId: string, answerIndex: number) => boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [questions] = useState<Question[]>(initialQuestions);
  const [flashcards] = useState<FlashCard[]>(initialFlashcards);
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [faqs] = useState<FAQ[]>(initialFAQs);
  const [downloads] = useState<Download[]>(initialDownloads);
  const [ruleUpdates] = useState<RuleUpdate[]>(initialRuleUpdates);

  // Add participant to an event or waitlist if full
  const addParticipant = (eventId: string, user: User) => {
    setEvents(prevEvents => 
      prevEvents.map(event => {
        if (event.id === eventId) {
          // Check if event is full
          if (event.participants.length < event.maxParticipants) {
            return {
              ...event,
              participants: [...event.participants, user]
            };
          } else {
            return {
              ...event,
              waitlist: [...event.waitlist, user]
            };
          }
        }
        return event;
      })
    );
  };

  // Simple feedback submission (in a real app, this would send to a server)
  const submitFeedback = (feedback: FeedbackSubmission) => {
    console.log('Feedback submitted:', feedback);
    // In a real app, we would send this to an API
  };

  // Check if an answer to a question is correct
  const checkAnswer = (questionId: string, answerIndex: number): boolean => {
    const question = questions.find(q => q.id === questionId);
    return question ? question.correctAnswer === answerIndex : false;
  };

  return (
    <DataContext.Provider value={{ 
      questions, 
      flashcards, 
      events, 
      faqs, 
      downloads, 
      ruleUpdates,
      addParticipant,
      submitFeedback,
      checkAnswer
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  
  return context;
}