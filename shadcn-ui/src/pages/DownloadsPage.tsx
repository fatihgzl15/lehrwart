import { useState } from "react";
import { useData } from "@/context/DataContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Download, FileText, Search, Video, FileImage } from "lucide-react";

export default function DownloadsPage() {
  const { downloads } = useData();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Get unique categories for filters
  const categories = Array.from(new Set(downloads.map(download => download.category)));
  
  // Filter downloads by search query
  const filteredDownloads = downloads.filter(download => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      download.title.toLowerCase().includes(query) ||
      download.description.toLowerCase().includes(query) ||
      download.category.toLowerCase().includes(query)
    );
  });

  // Function to get appropriate icon based on file extension
  const getFileIcon = (fileUrl?: string) => {
    if (!fileUrl) return <FileText className="h-6 w-6" />;
    
    const extension = fileUrl.split('.').pop()?.toLowerCase();
    
    switch(extension) {
      case 'pdf':
        return <FileText className="h-6 w-6" />;
      case 'doc':
      case 'docx':
        return <FileText className="h-6 w-6" />;
      case 'mp4':
      case 'mov':
      case 'avi':
        return <Video className="h-6 w-6" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <FileImage className="h-6 w-6" />;
      default:
        return <FileText className="h-6 w-6" />;
    }
  };

  return (
    <div className="container py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Downloads</h1>
        <p className="text-xl text-muted-foreground mb-8">Dokumente und Materialien für Schiedsrichter</p>
        
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Suche nach Dokumenten..." 
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

        {/* All Downloads Tab */}
        <TabsContent value="all">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredDownloads.length > 0 ? (
              filteredDownloads.map(download => (
                <Card key={download.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      {getFileIcon(download.fileUrl)}
                      <div>
                        <CardTitle>{download.title}</CardTitle>
                        <CardDescription>{download.category}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{download.description}</p>
                    <div className="text-xs text-muted-foreground">
                      <span>Hochgeladen am: {new Date(download.uploadDate).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full flex items-center gap-2">
                      <a href={download.fileUrl} download>
                        <Download className="h-4 w-4" /> Herunterladen
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">Keine passenden Dokumente gefunden.</p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Category Tabs */}
        {categories.map(category => (
          <TabsContent key={category} value={category}>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredDownloads
                .filter(download => download.category === category)
                .map(download => (
                  <Card key={download.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        {getFileIcon(download.fileUrl)}
                        <div>
                          <CardTitle>{download.title}</CardTitle>
                          <CardDescription>{download.category}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{download.description}</p>
                      <div className="text-xs text-muted-foreground">
                        <span>Hochgeladen am: {new Date(download.uploadDate).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full flex items-center gap-2">
                        <a href={download.fileUrl} download>
                          <Download className="h-4 w-4" /> Herunterladen
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
                
              {filteredDownloads.filter(download => download.category === category).length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">Keine passenden Dokumente in dieser Kategorie gefunden.</p>
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}