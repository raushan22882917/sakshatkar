import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Link as LinkIcon, Download } from "lucide-react";

export function ResourceSharing() {
  const resources = [
    {
      title: "Complete DSA Guide",
      type: "PDF",
      author: "John Doe",
      downloads: 234,
      link: "#",
    },
    {
      title: "System Design Interview Prep",
      type: "Document",
      author: "Jane Smith",
      downloads: 156,
      link: "#",
    },
    {
      title: "React Best Practices",
      type: "Link",
      author: "Tech Blog",
      downloads: 89,
      link: "#",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Learning Resources</h2>
        <Button>Share Resource</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {resource.type === "Link" ? (
                  <LinkIcon className="h-5 w-5" />
                ) : (
                  <FileText className="h-5 w-5" />
                )}
                {resource.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Shared by: {resource.author}
                </p>
                <p className="text-sm">
                  <Download className="inline h-4 w-4 mr-1" />
                  {resource.downloads} downloads
                </p>
                <Button variant="outline" className="w-full mt-2">
                  Access Resource
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}