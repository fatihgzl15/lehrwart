import { useState } from "react";
import { useData } from "@/context/DataContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Rating } from "@/types";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { FeedbackSubmission } from "@/types";

export default function FeedbackPage() {
  const { submitFeedback } = useData();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const [feedbackData, setFeedbackData] = useState<FeedbackSubmission>({
    id: "",
    name: "",
    email: "",
    category: "Allgemein",
    subject: "",
    message: "",
    rating: "5" as Rating,
    date: new Date().toISOString()
  });
  
  const feedbackCategories = [
    "Allgemein",
    "Plattform/Website",
    "Lernmaterialien",
    "Veranstaltungen",
    "Regelwerk",
    "Vorschläge"
  ];

  const handleInputChange = (field: keyof FeedbackSubmission, value: string) => {
    setFeedbackData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!feedbackData.name.trim()) {
      toast.error("Bitte gib deinen Namen ein.");
      return false;
    }
    
    if (!feedbackData.email.trim()) {
      toast.error("Bitte gib deine E-Mail-Adresse ein.");
      return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(feedbackData.email)) {
      toast.error("Bitte gib eine gültige E-Mail-Adresse ein.");
      return false;
    }
    
    if (!feedbackData.subject.trim()) {
      toast.error("Bitte gib einen Betreff ein.");
      return false;
    }
    
    if (!feedbackData.message.trim()) {
      toast.error("Bitte gib eine Nachricht ein.");
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      submitFeedback({
        ...feedbackData,
        id: crypto.randomUUID(), // Generate a unique ID
        date: new Date().toISOString()
      });
      
      toast.success("Vielen Dank für dein Feedback!");
      setFormSubmitted(true);
    } catch (error) {
      console.error(error);
      toast.error("Es gab ein Problem beim Übermitteln deines Feedbacks.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFeedbackData({
      id: "",
      name: "",
      email: "",
      category: "Allgemein",
      subject: "",
      message: "",
      rating: "5" as Rating,
      date: new Date().toISOString()
    });
    setFormSubmitted(false);
  };

  // Star rating component
  const StarRating = () => {
    const rating = parseInt(feedbackData.rating);
    
    return (
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-6 w-6 cursor-pointer ${
              star <= rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
            }`}
            onClick={() => handleInputChange("rating", star.toString() as Rating)}
          />
        ))}
      </div>
    );
  };

  if (formSubmitted) {
    return (
      <div className="container py-8">
        <div className="max-w-xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Feedback erfolgreich gesendet</CardTitle>
              <CardDescription>
                Vielen Dank für dein Feedback!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Deine Nachricht wurde erfolgreich übermittelt. Wir arbeiten daran, 
                unsere Plattform kontinuierlich zu verbessern, und dein Feedback 
                ist dabei sehr wertvoll für uns.
              </p>
            </CardContent>
            <CardFooter>
              <Button onClick={handleReset}>
                Neues Feedback senden
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Feedback</h1>
        <p className="text-xl text-muted-foreground">
          Teile uns deine Meinung mit und hilf uns, die Plattform zu verbessern
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Feedback-Formular</CardTitle>
              <CardDescription>
                Wir freuen uns über jedes Feedback, Lob oder Verbesserungsvorschläge
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name"
                    placeholder="Dein Name"
                    value={feedbackData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-Mail</Label>
                  <Input 
                    id="email"
                    type="email"
                    placeholder="deine@email.de"
                    value={feedbackData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Kategorie</Label>
                <Select 
                  value={feedbackData.category} 
                  onValueChange={(value) => handleInputChange("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Wähle eine Kategorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {feedbackCategories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Betreff</Label>
                <Input 
                  id="subject"
                  placeholder="Betreff deiner Nachricht"
                  value={feedbackData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Deine Nachricht</Label>
                <Textarea 
                  id="message"
                  placeholder="Beschreibe dein Feedback, deine Idee oder dein Problem..."
                  rows={5}
                  value={feedbackData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Wie bewertest du die Plattform?</Label>
                <StarRating />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="reset" variant="outline" onClick={handleReset}>
                Zurücksetzen
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Wird gesendet..." : "Feedback senden"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}