import { useState } from "react";
import { useData } from "@/context/DataContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileText, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function RulesPage() {
  const { ruleUpdates, faqs } = useData();
  const [activeTab, setActiveTab] = useState("updates");
  
  // Filter FAQs for only rule-related ones
  const ruleFaqs = faqs.filter(faq => faq.category === "Regelwerk");

  // Sort rule updates by date, most recent first
  const sortedRuleUpdates = [...ruleUpdates].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="container py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Regelwerk</h1>
        <p className="text-xl text-muted-foreground">Aktuelle Regelinformationen und Änderungen</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="updates">Regeländerungen</TabsTrigger>
          <TabsTrigger value="faq">Häufige Regelfragen</TabsTrigger>
          <TabsTrigger value="documents">Dokumente</TabsTrigger>
        </TabsList>
        
        {/* Rule Updates */}
        <TabsContent value="updates" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {sortedRuleUpdates.map((update) => (
              <Card key={update.id} className="overflow-hidden">
                <CardHeader className="bg-muted/30">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{update.title}</CardTitle>
                      <CardDescription>{update.description}</CardDescription>
                    </div>
                    <Badge variant="outline">
                      Gültig ab: {new Date(update.date).toLocaleDateString('de-DE')}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p>{update.details}</p>
                </CardContent>
              </Card>
            ))}
            
            {sortedRuleUpdates.length === 0 && (
              <div className="col-span-2 text-center py-8">
                <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Keine aktuellen Regeländerungen vorhanden.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        {/* FAQ */}
        <TabsContent value="faq" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Häufig gestellte Regelfragen</CardTitle>
              <CardDescription>
                Antworten auf die häufigsten Fragen zum Regelwerk
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {ruleFaqs.map((faq, index) => (
                  <AccordionItem key={faq.id} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
                
                {ruleFaqs.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Keine Regelfragen vorhanden.</p>
                  </div>
                )}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Rule Documents */}
        <TabsContent value="documents" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle>Offizielles Regelwerk 2025</CardTitle>
                    <CardDescription>Die aktuellste Version des Regelwerks</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Das offizielle Regelwerk enthält alle grundlegenden Regeln und Bestimmungen 
                  für den Fußball, inklusive der neuesten Änderungen für die Saison 2025.
                </p>
                <a 
                  href="/downloads/regelwerk_2025.pdf" 
                  className="text-primary underline hover:text-primary/80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Regelwerk als PDF herunterladen
                </a>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle>Regelauslegungen</CardTitle>
                    <CardDescription>Spezifische Auslegungen und Interpretationen</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Dieses Dokument ergänzt das Regelwerk und bietet detaillierte Erklärungen
                  zu Spezialfällen und komplexen Situationen.
                </p>
                <a 
                  href="/downloads/regelauslegungen_2025.pdf" 
                  className="text-primary underline hover:text-primary/80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Regelauslegungen als PDF herunterladen
                </a>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle>Interaktive Regelvisualisierung</CardTitle>
                    <CardDescription>Regelinterpretationen mit Beispielszenen</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  In diesem interaktiven Dokument werden komplexe Regelsituationen durch 
                  Grafiken und Diagramme veranschaulicht, um das Verständnis zu erleichtern.
                </p>
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Interaktive Visualisierung wird geladen...
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}