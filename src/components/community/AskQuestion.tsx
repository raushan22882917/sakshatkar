import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MessageSquarePlus, ThumbsUp, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";

interface Question {
  id: string;
  title: string;
  content: string;
  likes: number;
  created_at: string;
  user_id: string;
  responses: Array<{
    id: string;
    content: string;
    likes: number;
    created_at: string;
    user_id: string;
  }>;
}

export function AskQuestion() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { toast } = useToast();
  const { user } = useAuth();

  const { data: questions, refetch } = useQuery({
    queryKey: ["community-questions"],
    queryFn: async () => {
      const { data: questions, error } = await supabase
        .from("community_questions")
        .select(`
          *,
          responses:question_responses(*)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return questions as Question[];
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to post a question.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.from("community_questions").insert({
        title,
        content,
        user_id: user.id
      });

      if (error) throw error;

      toast({
        title: "Question posted successfully!",
        description: "Your question has been shared with the community.",
      });

      setTitle("");
      setContent("");
      refetch();
    } catch (error) {
      console.error("Error posting question:", error);
      toast({
        title: "Error",
        description: "Failed to post your question. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddResponse = async (questionId: string, response: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to post a response.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.from("question_responses").insert({
        question_id: questionId,
        content: response,
        user_id: user.id
      });

      if (error) throw error;

      toast({
        title: "Response added successfully!",
        description: "Your response has been posted.",
      });

      refetch();
    } catch (error) {
      console.error("Error posting response:", error);
      toast({
        title: "Error",
        description: "Failed to post your response. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquarePlus className="h-5 w-5" />
              Ask a Question
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Question title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Textarea
              placeholder="Describe your question..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="min-h-[100px]"
            />
            <Button type="submit" className="w-full">
              Post Question
            </Button>
          </CardContent>
        </Card>
      </form>

      <div className="space-y-4">
        {questions?.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            onAddResponse={handleAddResponse}
          />
        ))}
      </div>
    </div>
  );
}

function QuestionCard({
  question,
  onAddResponse,
}: {
  question: Question;
  onAddResponse: (questionId: string, response: string) => Promise<void>;
}) {
  const [response, setResponse] = useState("");
  const [showResponseInput, setShowResponseInput] = useState(false);

  const handleSubmitResponse = (e: React.FormEvent) => {
    e.preventDefault();
    onAddResponse(question.id, response);
    setResponse("");
    setShowResponseInput(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{question.title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          Posted on {new Date(question.created_at).toLocaleDateString()}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>{question.content}</p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Button variant="ghost" size="sm" className="gap-2">
            <ThumbsUp className="h-4 w-4" />
            {question.likes}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            onClick={() => setShowResponseInput(!showResponseInput)}
          >
            <MessageCircle className="h-4 w-4" />
            {question.responses?.length || 0} Responses
          </Button>
        </div>

        {showResponseInput && (
          <form onSubmit={handleSubmitResponse} className="space-y-2">
            <Textarea
              placeholder="Write your response..."
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              required
            />
            <Button type="submit" size="sm">
              Submit Response
            </Button>
          </form>
        )}

        {question.responses && question.responses.length > 0 && (
          <div className="space-y-4 mt-4 border-t pt-4">
            <h3 className="font-semibold">Responses</h3>
            {question.responses.map((response) => (
              <div
                key={response.id}
                className="bg-muted p-4 rounded-lg space-y-2"
              >
                <p>{response.content}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Button variant="ghost" size="sm" className="gap-1">
                    <ThumbsUp className="h-3 w-3" />
                    {response.likes}
                  </Button>
                  <span>·</span>
                  <span>
                    {new Date(response.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}