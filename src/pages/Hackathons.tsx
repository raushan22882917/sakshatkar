import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, Clock, Trophy, Users } from 'lucide-react';

interface Hackathon {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  rules: string;
  status: 'upcoming' | 'ongoing' | 'past';
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
        .from('hackathons')
        .select('*')
        .order('start_date', { ascending: true });

      if (error) throw error;

      setHackathons(data || []);
    } catch (error: any) {
      console.error('Error fetching hackathons:', error);
      toast({
        title: 'Error',
        description: 'Failed to load hackathons',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const registerForHackathon = async (hackathonId: string) => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to register for hackathons',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('hackathon_participants')
        .insert([
          { hackathon_id: hackathonId, user_id: user.id }
        ]);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'You have successfully registered for the hackathon',
      });
    } catch (error: any) {
      console.error('Error registering for hackathon:', error);
      toast({
        title: 'Error',
        description: 'Failed to register for the hackathon',
        variant: 'destructive',
      });
    }
  };

  const HackathonCard = ({ hackathon }: { hackathon: Hackathon }) => (
    <Card className="w-full mb-4 hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{hackathon.title}</span>
          <span className={`text-sm px-3 py-1 rounded-full ${
            hackathon.status === 'ongoing' ? 'bg-green-100 text-green-800' :
            hackathon.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {hackathon.status.charAt(0).toUpperCase() + hackathon.status.slice(1)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">{hackathon.description}</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(hackathon.start_date).toLocaleDateString()} - {new Date(hackathon.end_date).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <Button
              onClick={() => navigate(`/hackathons/${hackathon.id}`)}
              variant="outline"
            >
              View Details
            </Button>
            {hackathon.status === 'upcoming' && (
              <Button
                onClick={() => registerForHackathon(hackathon.id)}
                variant="default"
              >
                Register Now
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Hackathons</h1>
        {user && (
          <Button onClick={() => navigate('/hackathons/dashboard')}>
            My Dashboard
          </Button>
        )}
      </div>

      <Tabs defaultValue="ongoing" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>

        {['ongoing', 'upcoming', 'past'].map((status) => (
          <TabsContent key={status} value={status}>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {hackathons
                .filter(h => h.status === status)
                .map((hackathon) => (
                  <HackathonCard key={hackathon.id} hackathon={hackathon} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}