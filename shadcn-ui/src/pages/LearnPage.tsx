import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FlaskConical, Brain, FileText, Video, Lightbulb } from "lucide-react";

export default function LearnPage() {
  return (
    <div className="container py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Lernbereich</h1>
        <p className="text-xl text-muted-foreground">Verbessere dein Regelwissen und deine Schiedsrichterfähigkeiten</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <FlaskConical className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Quiz</CardTitle>
            <CardDescription>Teste dein Wissen mit Fragen aus dem Regelwerk</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Beantworte Fragen verschiedener Schwierigkeitsgrade und erhalte sofortiges Feedback.</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link to="/quiz">Quiz starten</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <Brain className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Karteikarten</CardTitle>
            <CardDescription>Lerne und wiederhole Regelbegriffe</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Nutze digitale Karteikarten zum Lernen wichtiger Begriffe und Definitionen.</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link to="/flashcards">Karteikarten öffnen</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <FileText className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Regelwerk</CardTitle>
            <CardDescription>Das offizielle Regelwerk und Erklärungen</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Greife auf das aktuelle Regelwerk zu und verstehe komplexe Regeln durch Erläuterungen.</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link to="/rules">Zum Regelwerk</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <Video className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Video-Szenenanalyse</CardTitle>
            <CardDescription>Analysiere Spielszenen und lerne aus Praxisbeispielen</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Schaue dir Spielszenen an und lerne, wie die Regeln in realen Situationen angewendet werden.</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/learn/videos">Szenen ansehen</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <Lightbulb className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Regelfrage des Monats</CardTitle>
            <CardDescription>Diskutiere aktuelle und herausfordernde Regelfragen</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Jede Monat gibt es eine neue knifflige Regelfrage mit detaillierter Lösung und Diskussion.</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/learn/question-of-month">Zur Regelfrage</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <BookOpen className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Regel-Lexikon</CardTitle>
            <CardDescription>Nachschlagewerk für Fachbegriffe</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Finde Erklärungen für alle wichtigen Fachbegriffe im Schiedsrichterwesen.</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/learn/glossary">Lexikon öffnen</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}