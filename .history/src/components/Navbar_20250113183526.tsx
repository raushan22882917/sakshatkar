import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiMenu, FiSun, FiMoon, FiUser, FiBell, FiPhone } from "react-icons/fi"; // FiMenu for hamburger icon
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

export function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu visibility
  const [profile, setProfile] = useState<any>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchNotifications();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data: existingProfile, error } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching profile:", error);
        throw error;
      }

      setProfile(existingProfile || { name: user.email });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load profile.",
        variant: "destructive",
      });
    }
  };

  const fetchNotifications = async () => {
    try {
      const { data: notifications, error } = await supabase
        .from("notifications")
        .select("id, title, message, created_at")
        .eq("created_by", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setNotifications(
        notifications?.filter(
          (notification, index, self) =>
            self.findIndex((n) => n.id === notification.id) === index
        ) || []
      );
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newMode);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="border-b bg-white/50 backdrop-blur-sm dark:bg-gray-800/50">
      <div className="container flex h-16 items-center px-4 justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text"
          >
            Sakshatkar
          </Button>
        </div>

        {/* Hamburger Menu */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            className="p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FiMenu className="w-6 h-6" />
          </Button>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate("/news")}>
            News
          </Button>
          <Button variant="ghost" onClick={() => navigate("/contact")}>
            Contact
          </Button>
          <DropdownMenu>
            <DropdownMenuContent align="end">
              {notifications.length ? (
                notifications.map((notification) => (
                  <DropdownMenuItem key={notification.id}>
                    <span>{notification.title}</span>
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem>No new notifications</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" onClick={toggleDarkMode}>
            {isDarkMode ? <FiSun className="w-6 h-6" /> : <FiMoon className="w-6 h-6" />}
          </Button>
          {user ? (
            <DropdownMenu>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Login
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col items-start p-4 space-y-2">
            <Button
              variant="ghost"
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/news");
              }}
            >
              News
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/contact");
              }}
            >
              Contact
            </Button>
            <Button
              variant="ghost"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <FiSun className="w-6 h-6" /> : <FiMoon className="w-6 h-6" />}
            </Button>
            {user ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/dashboard");
                  }}
                >
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogout();
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/login");
                }}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
