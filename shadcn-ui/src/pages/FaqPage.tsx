import { useState } from "react";
import { useData } from "@/context/DataContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function FaqPage() {
  const { faqs } = useData();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Get unique categories
  const categories = Array.from(new Set(faqs.map(faq => faq.category)));
  
  // Filter FAQs by search query
  const filteredFaqs = faqs.filter(faq => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query) ||
      faq.category.toLowerCase().includes(query)
    );
  });

  return (
    <div className="container py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">FAQ</h1>
        <p className="text-xl text-muted-foreground mb-8">Häufig gestellte Fragen</p>
        
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Suche in den FAQs..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs defaultValue={categories[0] || "all"}>
        <TabsList className="mb-4 flex flex-wrap">
          <TabsTrigger value="all">Alle</TabsTrigger>
          {categories.map(category => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* All FAQs Tab */}
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Alle häufig gestellten Fragen</CardTitle>
              <CardDescription>
                Antworten auf die häufigsten Fragen zu verschiedenen Themen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, index) => (
                    <AccordionItem key={faq.id} value={`faq-${index}`}>
                      <AccordionTrigger className="text-left">
                        <div>
                          <span className="font-medium">{faq.question}</span>
                          <p className="text-xs text-muted-foreground mt-1">Kategorie: {faq.category}</p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Keine passenden Fragen gefunden.</p>
                  </div>
                )}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Category Tabs */}
        {categories.map(category => (
          <TabsContent key={category} value={category}>
            <Card>
              <CardHeader>
                <CardTitle>{category}</CardTitle>
                <CardDescription>
                  Häufig gestellte Fragen zum Thema {category}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs
                    .filter(faq => faq.category === category)
                    .map((faq, index) => (
                      <AccordionItem key={faq.id} value={`category-faq-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                    
                  {filteredFaqs.filter(faq => faq.category === category).length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        Keine passenden Fragen in dieser Kategorie gefunden.
                      </p>
                    </div>
                  )}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}