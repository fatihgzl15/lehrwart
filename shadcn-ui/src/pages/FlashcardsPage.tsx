import { useState } from "react";
import { useData } from "@/context/DataContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Rotate3D } from "lucide-react";
import "@/components/flashcard/flashcard.css";

export default function FlashcardsPage() {
  const { flashcards } = useData();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string | "all">("all");

  // Get categories for filter
  const categories = Array.from(new Set(flashcards.map(card => card.category)));
  
  // Filter cards by category
  const filteredCards = categoryFilter === "all" 
    ? flashcards
    : flashcards.filter(card => card.category === categoryFilter);

  const currentCard = filteredCards[currentCardIndex];

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex(prev => 
      prev > 0 ? prev - 1 : filteredCards.length - 1
    );
  };

  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex(prev => 
      prev < filteredCards.length - 1 ? prev + 1 : 0
    );
  };

  const handleFlip = () => {
    setIsFlipped(prev => !prev);
  };

  if (filteredCards.length === 0) {
    return (
      <div className="container py-8">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-6">Karteikarten</h1>
          <p className="text-muted-foreground mb-4">Keine Karteikarten für diese Kategorie gefunden.</p>
          <Button onClick={() => setCategoryFilter("all")}>Alle Kategorien anzeigen</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="max-w-xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-bold mb-6">Karteikarten</h1>
          
          <div className="w-full max-w-xs mb-6">
            <Select value={categoryFilter} onValueChange={(value) => {
              setCategoryFilter(value);
              setCurrentCardIndex(0);
              setIsFlipped(false);
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Kategorie wählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Kategorien</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="text-sm text-muted-foreground mb-4">
            Karte {currentCardIndex + 1} von {filteredCards.length}
          </div>
        </div>

        <div className="mb-6 flashcard-container">
          <div className={`flashcard ${isFlipped ? 'flipped' : ''}`}>
            {/* Front of card */}
            <Card className="flashcard-face">
              <CardHeader className="flex items-center justify-center h-12 bg-muted/20">
                <CardTitle className="text-lg">Begriff</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-[calc(300px-6rem)] py-8 text-center">
                <h3 className="text-2xl font-bold">{currentCard.term}</h3>
              </CardContent>
              <CardFooter className="flex justify-center items-center h-12 border-t">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleFlip}
                  className="flex items-center gap-1"
                >
                  <Rotate3D className="h-4 w-4" />
                  Karte umdrehen
                </Button>
              </CardFooter>
            </Card>

            {/* Back of card */}
            <Card className="flashcard-face flashcard-back">
              <CardHeader className="flex items-center justify-center h-12 bg-muted/20">
                <CardTitle className="text-lg">Definition</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-[calc(300px-6rem)] py-8 text-center overflow-y-auto">
                <p>{currentCard.definition}</p>
              </CardContent>
              <CardFooter className="flex justify-center items-center h-12 border-t">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleFlip}
                  className="flex items-center gap-1"
                >
                  <Rotate3D className="h-4 w-4" />
                  Karte umdrehen
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="flex justify-between">
          <Button onClick={handlePrevCard} variant="outline">
            Zurück
          </Button>
          <Button onClick={handleNextCard}>
            Weiter
          </Button>
        </div>
      </div>
    </div>
  );
}