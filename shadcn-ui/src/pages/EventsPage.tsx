import { useState } from "react";
import { useData } from "@/context/DataContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EventsPage() {
  const { events, addParticipant } = useData();
  const [registrationData, setRegistrationData] = useState<{name: string; email: string}>({
    name: "",
    email: ""
  });
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Sort events by date
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  // Split events into upcoming and past
  const currentDate = new Date();
  const upcomingEvents = sortedEvents.filter(
    event => new Date(event.date) >= currentDate
  );
  const pastEvents = sortedEvents.filter(
    event => new Date(event.date) < currentDate
  );

  const handleRegisterClick = (eventId: string) => {
    setSelectedEventId(eventId);
    setRegistrationData({ name: "", email: "" });
  };

  const handleRegisterSubmit = () => {
    if (!selectedEventId) return;

    // Validate form
    if (!registrationData.name.trim() || !registrationData.email.trim()) {
      toast.error("Bitte fülle alle Felder aus.");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registrationData.email)) {
      toast.error("Bitte gib eine gültige E-Mail-Adresse ein.");
      return;
    }

    setIsRegistering(true);

    // Create user object
    const user: User = {
      name: registrationData.name,
      email: registrationData.email
    };

    // Register user for the event
    try {
      addParticipant(selectedEventId, user);
      
      // Show success message
      toast.success("Du wurdest erfolgreich angemeldet!");
      
      // Reset form and close dialog
      setRegistrationData({ name: "", email: "" });
      setSelectedEventId(null);
    } catch (error) {
      toast.error("Bei der Anmeldung ist ein Fehler aufgetreten.");
      console.error(error);
    } finally {
      setIsRegistering(false);
    }
  };

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('de-DE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  function EventCard({ event }: { event: (typeof events)[0] }) {
    const isFull = event.participants.length >= event.maxParticipants;
    const spotsRemaining = event.maxParticipants - event.participants.length;
    
    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{event.title}</CardTitle>
              <CardDescription>{event.description}</CardDescription>
            </div>
            {isFull && <Badge variant="destructive">Ausgebucht</Badge>}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{event.time} Uhr</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{event.participants.length} / {event.maxParticipants} Teilnehmer</span>
            </div>
            {!isFull && (
              <div className="text-sm text-muted-foreground">
                Noch {spotsRemaining} {spotsRemaining === 1 ? 'Platz' : 'Plätze'} verfügbar
              </div>
            )}
            {isFull && event.waitlist.length > 0 && (
              <div className="text-sm text-muted-foreground">
                {event.waitlist.length} {event.waitlist.length === 1 ? 'Person' : 'Personen'} auf der Warteliste
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                className="w-full" 
                onClick={() => handleRegisterClick(event.id)}
                variant={isFull ? "outline" : "default"}
              >
                {isFull ? "Auf Warteliste setzen" : "Anmelden"}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Anmeldung für Veranstaltung</DialogTitle>
                <DialogDescription>
                  {event.title} - {formatDate(event.date)}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Dein Name"
                    className="col-span-3"
                    value={registrationData.name}
                    onChange={(e) => setRegistrationData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    E-Mail
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="deine@email.de"
                    className="col-span-3"
                    value={registrationData.email}
                    onChange={(e) => setRegistrationData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="submit" 
                  onClick={handleRegisterSubmit}
                  disabled={isRegistering}
                >
                  {isRegistering ? "Wird angemeldet..." : isFull ? "Auf Warteliste setzen" : "Anmelden"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="container py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Veranstaltungen</h1>
        <p className="text-xl text-muted-foreground">Melde dich für Lehrabende und praktische Trainingseinheiten an</p>
      </div>

      <Tabs defaultValue="upcoming" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming">Kommende Veranstaltungen</TabsTrigger>
          <TabsTrigger value="past">Vergangene Veranstaltungen</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          {upcomingEvents.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aktuell sind keine kommenden Veranstaltungen geplant.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="past">
          {pastEvents.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pastEvents.map(event => (
                <Card key={event.id} className="opacity-75">
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription>{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{event.time} Uhr</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{event.participants.length} Teilnehmer</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="w-full" disabled>
                      Abgeschlossen
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Keine vergangenen Veranstaltungen gefunden.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}