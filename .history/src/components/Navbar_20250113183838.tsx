import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiSun, FiMoon, FiUser, FiBell, FiChevronDown, FiBookOpen, FiPhone, FiMenu, FiX } from "react-icons/fi"; // Added FiMenu and FiX for hamburger menu
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";

export function Navbar() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [menuOpen, setMenuOpen] = useState(false); // State for hamburger menu
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchNotifications();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      if (!user) return;

      const { data: existingProfile, error: fetchError } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", user.id)
        .maybeSingle();

      if (fetchError) {
        console.error("Error fetching profile:", fetchError);
        throw fetchError;
      }

      if (existingProfile) {
        setProfile(existingProfile);
      } else {
        const { data: newProfile, error: insertError } = await supabase
          .from("profiles")
          .upsert([{
            id: user.id,
            email: user.email,
          }])
          .select("name")
          .maybeSingle();

        if (insertError) {
          console.error("Error creating profile:", insertError);
          throw insertError;
        }
        setProfile(newProfile);
      }
    } catch (error: any) {
      console.error("Error in profile management:", error);
      toast({
        title: "Error",
        description: "Failed to load profile. Please try refreshing the page.",
        variant: "destructive",
      });
    }
  };

  const fetchNotifications = async () => {
    try {
      if (!user) return; // Ensure the user is logged in

      const { data: notifications, error } = await supabase
        .from("notifications")
        .select("id, title, message, created_at, created_by, is_admin_notification")
        .eq("created_by", user.id) // Fetch notifications specific to the logged-in user
        .order("created_at", { ascending: false }); // Order by most recent notifications

      if (error) {
        console.error("Error fetching notifications:", error);
        throw error;
      }

      // Remove duplicate notifications based on unique `id`
      const uniqueNotifications = notifications?.filter(
        (notification, index, self) =>
          self.findIndex((n) => n.id === notification.id) === index
      );

      setNotifications(uniqueNotifications || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    if (savedMode === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
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
        {/* Left Section: Logo */}
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text"
          >
            Sakshatkar
          </Button>
        </div>

        {/* Right Section: Menu and Toggle */}
        <div className="flex items-center space-x-4">
          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-lg font-semibold text-gray-800 dark:text-white"
            >
              {menuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </Button>
          </div>

          {/* Desktop Menu */}
          <div className={`hidden md:flex items-center space-x-4`}>
            <Button variant="ghost" onClick={() => navigate("/news")}>
              News
            </Button>
            <Button variant="ghost" onClick={() => navigate("/contact")}>
              Contact
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <FiBell className="w-6 h-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <DropdownMenuItem key={notification.id} className="flex flex-col">
                      <span className="font-medium">{notification.title}</span>
                      <span>{notification.message}</span>
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
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden flex flex-col space-y-2 p-4 bg-gray-100 dark:bg-gray-900">
          <Button variant="ghost" onClick={() => navigate("/news")}>
            News
          </Button>
          <Button variant="ghost" onClick={() => navigate("/contact")}>
            Contact
          </Button>
          <Button variant="ghost" onClick={toggleDarkMode}>
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </Button>
          {user ? (
            <>
              <Button variant="ghost" onClick={() => navigate("/dashboard")}>
                Dashboard
              </Button>
              <Button variant="ghost" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Login
            </Button>
          )}
        </div>
      )}
    </nav>
  );
}
