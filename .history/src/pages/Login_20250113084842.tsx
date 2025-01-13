import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-2xl shadow-lg border border-gray-200 rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Side - Animated Image */}
          <div className="relative flex items-center justify-center bg-gradient-to-tr from-purple-600 via-blue-600 to-indigo-600">
            <img
              src="login.jpg"
              alt="Login Animation"
              className="w-full h-full object-cover opacity-80 animate-pulse"
            />
            <div className="absolute inset-0 bg-black/30" />
            <h1 className="absolute text-white text-4xl font-bold drop-shadow-lg">Welcome Back</h1>
          </div>

          {/* Right Side - Login Form */}
          <div className="p-8 flex flex-col justify-center">
            <CardContent>
              <CardHeader className="text-center mb-6">
                <CardTitle className="text-3xl font-bold text-gray-800">Sign In</CardTitle>
              </CardHeader>
              <Auth
                supabaseClient={supabase}
                appearance={{
                  theme: ThemeSupa,
                  variables: {
                    default: {
                      colors: {
                        brand: "#7c3aed",
                        brandAccent: "#6366f1",
                      },
                    },
                  },
                  className: {
                    container: "w-full",
                    button: "w-full py-2 px-4 text-sm rounded-lg shadow-md transition-all text-white font-medium",
                  },
                }}
                providers={["google", "github"]}
                view="sign_in"
                redirectTo={`${window.location.origin}/auth/callback`}
              />
              <div className="mt-4 text-center">
                <Button
                  variant="ghost"
                  onClick={() => navigate("/signup")}
                  className="text-purple-600 hover:text-purple-700"
                >
                  Don't have an account? Sign up
                </Button>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
}