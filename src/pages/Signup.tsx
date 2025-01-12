import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { SignupForm } from "@/components/auth/SignupForm";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function Signup() {
  const { toast } = useToast();

  const handleGoogleSignup = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-600/10 to-blue-600/10 backdrop-blur-sm">
      <Navbar />
      <div className="flex-1 container flex items-center justify-center py-12">
        <Card className="w-full max-w-md bg-white/30 backdrop-blur-md shadow-xl border-0">
          <CardHeader className="space-y-1">
            <div className="flex flex-col items-center space-y-2">
              <img
                src="/logo.jpg"
                alt="Sakshatkar Logo"
                className="w-20 h-20 rounded-full object-cover"
              />
              <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
                Sakshatkar
              </CardTitle>
            </div>
            <CardDescription className="text-center text-gray-600">
              Enter your details to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignupForm onGoogleSignup={handleGoogleSignup} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}