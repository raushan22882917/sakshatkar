import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/Navbar";
import { Users, MessageSquare, Trophy, Calendar, BookOpen, Target } from "lucide-react";
import { useState } from "react";

const features = [
  {
    icon: Users,
    title: "Study Groups",
    description: "Join or create study groups to learn and practice together",
    status: "Coming Soon",
  },
  {
    icon: MessageSquare,
    title: "Discussion Forums",
    description: "Engage in technical discussions and share knowledge",
    status: "Coming Soon",
  },
  {
    icon: Trophy,
    title: "Competitions",
    description: "Participate in coding competitions and challenges",
    status: "Coming Soon",
  },
  {
    icon: Calendar,
    title: "Events",
    description: "Join online workshops, webinars, and meetups",
    status: "Coming Soon",
  },
  {
    icon: BookOpen,
    title: "Resource Sharing",
    description: "Share and discover learning resources",
    status: "Coming Soon",
  },
  {
    icon: Target,
    title: "Mentorship",
    description: "Connect with mentors or become one",
    status: "Coming Soon",
  },
];

const upcomingEvents = [
  {
    title: "DSA Workshop",
    date: "March 15, 2024",
    time: "2:00 PM EST",
    type: "Workshop",
  },
  {
    title: "Mock Interview Session",
    date: "March 18, 2024",
    time: "3:30 PM EST",
    type: "Practice",
  },
  {
    title: "Web Development Basics",
    date: "March 20, 2024",
    time: "1:00 PM EST",
    type: "Workshop",
  },
];

export function Community() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const onlineUsers = [
    { name: "Alice", profilePic: "/images/alice.jpg" },
    { name: "Bob", profilePic: "/images/bob.jpg" },
    { name: "Charlie", profilePic: "/images/charlie.jpg" },
    { name: "David", profilePic: "/images/david.jpg" },
    { name: "Eve", profilePic: "/images/eve.jpg" },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { user: "You", text: message }]);
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            Join Our Coding Community
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Connect with fellow developers, share knowledge, and grow together
          </p>
        </div>

        {/* Start Chat Button */}
        <div className="text-center mb-6">
          <Button onClick={() => setIsChatOpen(true)} className="bg-blue-500 hover:bg-blue-700">
            Start Chat
          </Button>
        </div>

        {/* Chat Room */}
        {isChatOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-96 h-[500px] flex flex-col overflow-hidden">
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                <h2 className="text-xl font-semibold">Chat Room</h2>
                <Button onClick={() => setIsChatOpen(false)} className="text-white hover:text-gray-200">
                  X
                </Button>
              </div>

              <div className="p-4 border-b bg-gray-100 dark:bg-gray-700">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Online Users</h3>
                <div className="space-y-3">
                  {onlineUsers.map((user, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <img
                        src={user.profilePic}
                        alt={user.name}
                        className="w-12 h-12 rounded-full border-2 border-blue-500"
                      />
                      <span className="text-gray-800 dark:text-gray-100 font-medium">{user.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <div key={index} className="flex justify-start space-x-2">
                      <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg max-w-xs shadow-md">
                        <p className="text-gray-800 dark:text-gray-100">
                          <strong>{msg.user}</strong>: {msg.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t bg-gray-100 dark:bg-gray-700 flex items-center">
                <Input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message"
                  className="flex-1 rounded-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                />
                <Button onClick={handleSendMessage} className="ml-3 bg-blue-500 hover:bg-blue-700 text-white rounded-full p-2">
                  Send
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <feature.icon className="h-6 w-6 text-blue-500" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">{feature.description}</p>
                <p className="text-gray-500 dark:text-gray-400">{feature.status}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Upcoming Events */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-4">
            Upcoming Events
          </h2>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="border-2 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <h3 className="text-xl text-gray-800 dark:text-gray-100">{event.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {event.date} at {event.time}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">{event.type}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Community;
