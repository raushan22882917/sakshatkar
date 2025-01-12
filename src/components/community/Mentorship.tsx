import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Star, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Mentorship() {
  const mentors = [
    {
      name: "Dr. Sarah Johnson",
      expertise: "System Architecture",
      rating: 4.9,
      availability: "Available this week",
      image: "/placeholder.svg",
    },
    {
      name: "Michael Chen",
      expertise: "Full Stack Development",
      rating: 4.8,
      availability: "Next week",
      image: "/placeholder.svg",
    },
    {
      name: "Emma Williams",
      expertise: "Data Structures & Algorithms",
      rating: 4.7,
      availability: "Available today",
      image: "/placeholder.svg",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Find a Mentor</h2>
        <Button>Become a Mentor</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mentors.map((mentor, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={mentor.image} alt={mentor.name} />
                  <AvatarFallback>
                    {mentor.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg">{mentor.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  <User className="inline h-4 w-4 mr-1" />
                  {mentor.expertise}
                </p>
                <p className="text-sm">
                  <Star className="inline h-4 w-4 mr-1 text-yellow-500" />
                  {mentor.rating} rating
                </p>
                <p className="text-sm">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  {mentor.availability}
                </p>
                <Button variant="outline" className="w-full mt-2">
                  Schedule Session
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}