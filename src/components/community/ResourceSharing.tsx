import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Link as LinkIcon, Download } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export function ResourceSharing() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [resources, setResources] = useState<any[]>([]);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*');
      
      if (error) throw error;
      setResources(data || []);
    } catch (error) {
      console.error('Error fetching resources:', error);
      toast({
        title: "Error",
        description: "Failed to load resources",
        variant: "destructive",
      });
    }
  };

  const handleDownload = async (resource: any) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login to download resources",
        variant: "destructive",
      });
      return;
    }

    try {
      // Track download
      const { error: downloadError } = await supabase
        .from('resource_downloads')
        .insert({
          resource_id: resource.id,
          user_id: user.id
        });

      if (downloadError) throw downloadError;

      // Update download count
      const { error: updateError } = await supabase
        .from('resources')
        .update({ downloads: (resource.downloads || 0) + 1 })
        .eq('id', resource.id);

      if (updateError) throw updateError;

      // Trigger actual download
      window.open(resource.url, '_blank');
      
      toast({
        title: "Success",
        description: "Resource download started",
      });
      
      fetchResources();
    } catch (error) {
      console.error('Error downloading resource:', error);
      toast({
        title: "Error",
        description: "Failed to download resource",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Learning Resources</h2>
        <Button>Share Resource</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource) => (
          <Card key={resource.id} className="hover:shadow-lg transition-shadow">
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
                  {resource.description}
                </p>
                <p className="text-sm">
                  <Download className="inline h-4 w-4 mr-1" />
                  {resource.downloads || 0} downloads
                </p>
                <Button 
                  variant="outline" 
                  className="w-full mt-2"
                  onClick={() => handleDownload(resource)}
                >
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