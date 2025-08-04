import { useData } from "@/context/DataContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, BookOpen, Users, FileText, Download, HelpCircle, MessageSquare } from "lucide-react";

export default function HomePage() {
  const { events, ruleUpdates } = useData();
  const upcomingEvents = events.filter(event => new Date(event.date) > new Date()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const latestRuleUpdate = ruleUpdates.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  return (
    <div className="container py-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Willkommen bei der Schiedsrichter Vereinigung Wolfsburg</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Deine Plattform für Schiedsrichter-Ausbildung und Organisation
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/learn">Jetzt Lernen</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/events">Termine anzeigen</Link>
          </Button>
        </div>
      </section>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Feature Cards */}
        <Card>
          <CardHeader>
            <BookOpen className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Lernmaterialien</CardTitle>
            <CardDescription>Regelwissen auffrischen und vertiefen</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Quiz, Karteikarten und interaktive Übungen helfen dir beim Lernen der Regeln.</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/learn">Zum Lernbereich</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <Calendar className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Veranstaltungen</CardTitle>
            <CardDescription>Lehrabende und praktische Übungen</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Melde dich für Lehrabende und praktische Trainingseinheiten an.</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/events">Zu den Terminen</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <FileText className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Regelwerk</CardTitle>
            <CardDescription>Aktuelle Regeln und Änderungen</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Zugriff auf das aktuelle Regelwerk und wichtige Regeländerungen.</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/rules">Zum Regelwerk</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Recent Updates Section */}
      <section className="mt-16 mb-8">
        <h2 className="text-2xl font-bold mb-6">Aktuelle Informationen</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Next Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" /> Nächste Veranstaltungen
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingEvents.length > 0 ? (
                <ul className="space-y-4">
                  {upcomingEvents.slice(0, 2).map((event) => (
                    <li key={event.id} className="border-b pb-3 last:border-0">
                      <h3 className="font-medium">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(event.date).toLocaleDateString('de-DE')} um {event.time} Uhr
                      </p>
                      <p className="text-sm">{event.location}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Keine anstehenden Veranstaltungen.</p>
              )}
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost" size="sm" className="w-full">
                <Link to="/events">Alle Termine anzeigen</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Latest Rule Update */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" /> Aktuelle Regeländerung
              </CardTitle>
            </CardHeader>
            <CardContent>
              {latestRuleUpdate && (
                <div>
                  <h3 className="font-medium">{latestRuleUpdate.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Gültig ab: {new Date(latestRuleUpdate.date).toLocaleDateString('de-DE')}
                  </p>
                  <p className="text-sm">{latestRuleUpdate.description}</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost" size="sm" className="w-full">
                <Link to="/rules">Alle Regeländerungen anzeigen</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
}