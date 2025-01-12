import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-600/10 to-blue-600/10 backdrop-blur-sm">
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
              Welcome back! Enter your credentials to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: 'rgb(124 58 237)',
                      brandAccent: 'rgb(99 102 241)',
                    },
                  },
                },
                className: {
                  container: 'w-full',
                  button: 'w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200',
                  input: 'w-full px-3 py-2 border rounded-md bg-white/50',
                },
              }}
              providers={["google", "github"]}
              view="sign_in"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}