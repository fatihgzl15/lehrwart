import { useState } from "react";
import { useData } from "@/context/DataContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle, Timer, BarChart3 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function QuizPage() {
  const { questions, checkAnswer } = useData();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResults, setQuizResults] = useState<{correct: number, total: number, percentage: number}>({
    correct: 0,
    total: 0,
    percentage: 0
  });

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setQuizCompleted(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setQuizResults({ correct: 0, total: 0, percentage: 0 });
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (!isAnswered) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer !== null && !isAnswered) {
      const isCorrect = checkAnswer(questions[currentQuestionIndex].id, selectedAnswer);
      
      setIsAnswered(true);
      
      if (isCorrect) {
        setScore(prev => prev + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      // Quiz completed
      const finalScore = score + (isAnswered && selectedAnswer !== null && 
                        checkAnswer(questions[currentQuestionIndex].id, selectedAnswer) ? 1 : 0);
      
      setQuizCompleted(true);
      setQuizResults({
        correct: finalScore,
        total: questions.length,
        percentage: Math.round((finalScore / questions.length) * 100)
      });
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  
  if (!quizStarted) {
    return (
      <div className="container py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Regelquiz</CardTitle>
              <CardDescription>Teste dein Wissen zu den Fußballregeln</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-6">
                Das Quiz besteht aus {questions.length} Fragen. Zu jeder Frage gibt es
                mehrere Antwortmöglichkeiten, von denen genau eine richtig ist.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Timer className="h-5 w-5 text-muted-foreground" />
                  <span>Keine Zeitbegrenzung</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span>Sofortiges Feedback zu jeder Antwort</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-500" />
                  <span>Auswertung am Ende des Quiz</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleStartQuiz} className="w-full">Quiz starten</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="container py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Quiz abgeschlossen!</CardTitle>
              <CardDescription>Hier ist deine Auswertung</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-4">
                <div className="text-5xl font-bold mb-2">{quizResults.percentage}%</div>
                <p className="text-muted-foreground">
                  {quizResults.correct} von {quizResults.total} Fragen richtig beantwortet
                </p>
              </div>
              
              <Progress value={quizResults.percentage} className="h-3" />
              
              <div className="space-y-2 text-center pt-4">
                {quizResults.percentage >= 80 ? (
                  <p className="font-medium text-green-500">Ausgezeichnet! Du kennst die Regeln sehr gut.</p>
                ) : quizResults.percentage >= 60 ? (
                  <p className="font-medium text-yellow-500">Gut gemacht! Du kennst die meisten Regeln.</p>
                ) : (
                  <p className="font-medium text-red-500">Es gibt noch Verbesserungspotenzial. Versuche es erneut!</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between flex-wrap gap-4">
              <Button onClick={handleStartQuiz} variant="default">Quiz wiederholen</Button>
              <Button onClick={() => window.location.href = '/learn'} variant="outline">Zurück zum Lernbereich</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center mb-2">
              <CardTitle>Frage {currentQuestionIndex + 1} von {questions.length}</CardTitle>
              <span className="text-sm text-muted-foreground">Punkte: {score}</span>
            </div>
            <Progress value={(currentQuestionIndex / questions.length) * 100} className="h-2" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-6">
              <div className="text-lg font-medium">{currentQuestion.text}</div>
              
              <RadioGroup value={selectedAnswer?.toString()} className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className={`flex items-center space-x-2 border rounded-md p-4 ${
                    isAnswered 
                      ? index === currentQuestion.correctAnswer 
                        ? "border-green-500 bg-green-50" 
                        : selectedAnswer === index 
                          ? "border-red-500 bg-red-50" 
                          : "border-gray-200"
                      : "border-gray-200 hover:border-gray-300"
                  }`}>
                    <RadioGroupItem 
                      value={index.toString()} 
                      id={`option-${index}`}
                      disabled={isAnswered}
                      onClick={() => handleAnswerSelect(index)}
                    />
                    <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                      {option}
                    </Label>
                    {isAnswered && index === currentQuestion.correctAnswer && (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    )}
                    {isAnswered && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                ))}
              </RadioGroup>

              {isAnswered && (
                <div className={`p-4 rounded-md ${
                  selectedAnswer === currentQuestion.correctAnswer
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}>
                  <p className="font-medium mb-2">
                    {selectedAnswer === currentQuestion.correctAnswer
                      ? "Richtig!"
                      : "Falsch!"}
                  </p>
                  <p>{currentQuestion.explanation}</p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            {!isAnswered ? (
              <Button 
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className="w-full"
              >
                Antwort prüfen
              </Button>
            ) : (
              <Button 
                onClick={handleNextQuestion}
                className="w-full"
              >
                {currentQuestionIndex < questions.length - 1 ? "Nächste Frage" : "Ergebnis anzeigen"}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}