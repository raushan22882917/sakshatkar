import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Star, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export function Mentorship() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [mentors, setMentors] = useState<any[]>([]);
  const [selectedMentor, setSelectedMentor] = useState<any>(null);
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      const { data, error } = await supabase
        .from('mentor_profiles')
        .select(`
          *,
          profiles:user_id (
            name,
            profile_image_url
          )
        `);
      
      if (error) throw error;
      setMentors(data || []);
    } catch (error) {
      console.error('Error fetching mentors:', error);
      toast({
        title: "Error",
        description: "Failed to load mentors",
        variant: "destructive",
      });
    }
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login to book a session",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('mentor_bookings')
        .insert({
          mentor_id: selectedMentor.id,
          student_id: user.id,
          booking_date: bookingDate,
          start_time: startTime,
          end_time: endTime
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Session booked successfully!",
      });
      
      setSelectedMentor(null);
    } catch (error) {
      console.error('Error booking session:', error);
      toast({
        title: "Error",
        description: "Failed to book session",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Find a Mentor</h2>
        <Button>Become a Mentor</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mentors.map((mentor) => (
          <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={mentor.profiles?.profile_image_url} alt={mentor.profiles?.name} />
                  <AvatarFallback>
                    {mentor.profiles?.name?.split(" ").map((n: string) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg">{mentor.profiles?.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  <User className="inline h-4 w-4 mr-1" />
                  {mentor.expertise?.join(", ")}
                </p>
                <p className="text-sm">
                  <Star className="inline h-4 w-4 mr-1 text-yellow-500" />
                  {mentor.rating} rating
                </p>
                <p className="text-sm">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  {mentor.availability}
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full mt-2"
                      onClick={() => setSelectedMentor(mentor)}
                    >
                      Schedule Session
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Book Session with {mentor.profiles?.name}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleBooking} className="space-y-4">
                      <div>
                        <Label>Date</Label>
                        <Input
                          type="date"
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          required
                        />
                      </div>
                      <div>
                        <Label>Start Time</Label>
                        <Input
                          type="time"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label>End Time</Label>
                        <Input
                          type="time"
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          min={startTime}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Book Session
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}