import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar, Clock, Trophy } from "lucide-react";

interface Hackathon {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  banner_image_url?: string;
  organization_image_url?: string;
  prize_money?: number;
  offerings?: string[];
  status: "upcoming" | "ongoing" | "past";
}

export default function Hackathons() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHackathons();
  }, []);

  const fetchHackathons = async () => {
    try {
      const { data, error } = await supabase
        .from("hackathons")
        .select("*")
        .order("start_date", { ascending: true });

      if (error) throw error;

      if (data) {
        const categorizedHackathons = data.map((hackathon) => {
          const startDate = new Date(hackathon.start_date);
          const endDate = new Date(hackathon.end_date);
          const now = new Date();

          let status: "upcoming" | "ongoing" | "past";
          if (now < startDate) {
            status = "upcoming";
          } else if (now > endDate) {
            status = "past";
          } else {
            status = "ongoing";
          }

          return { ...hackathon, status };
        });

        setHackathons(categorizedHackathons);
      }
    } catch (error: any) {
      console.error("Error fetching hackathons:", error);
      toast({
        title: "Error",
        description: "Failed to load hackathons",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const registerForHackathon = async (hackathonId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to register for hackathons",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    try {
      const { error } = await supabase
        .from("hackathon_participants")
        .insert([{ hackathon_id: hackathonId, user_id: user.id }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "You have successfully registered for the hackathon",
      });
    } catch (error: any) {
      console.error("Error registering for hackathon:", error);
      toast({
        title: "Error",
        description: "Failed to register for the hackathon",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Hackathons</h1>
      </div>

      <Tabs defaultValue="ongoing" className="space-y-4">
        <TabsList>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>

        {["ongoing", "upcoming", "past"].map((status) => (
          <TabsContent key={status} value={status}>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {hackathons
                .filter((h) => h.status === status)
                .map((hackathon) => (
                  <Card key={hackathon.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      {hackathon.banner_image_url && (
                        <img
                          src={hackathon.banner_image_url}
                          alt={hackathon.title}
                          className="w-full h-32 object-cover rounded-t-lg mb-4"
                        />
                      )}
                      <div className="flex items-center justify-between">
                        <CardTitle>{hackathon.title}</CardTitle>
                        <Badge
                          className={
                            status === "ongoing"
                              ? "bg-green-500"
                              : status === "upcoming"
                              ? "bg-blue-500"
                              : "bg-gray-500"
                          }
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {hackathon.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(hackathon.start_date).toLocaleDateString()} - 
                            {new Date(hackathon.end_date).toLocaleDateString()}
                          </span>
                        </div>
                        {hackathon.prize_money && (
                          <div className="flex items-center gap-2">
                            <Trophy className="w-4 h-4" />
                            <span>${hackathon.prize_money}</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-4 flex justify-between items-center">
                        <Button
                          variant="outline"
                          onClick={() => navigate(`/hackathons/${hackathon.id}`)}
                        >
                          View Details
                        </Button>
                        {status === "upcoming" && (
                          <Button
                            onClick={() => registerForHackathon(hackathon.id)}
                          >
                            Register Now
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}