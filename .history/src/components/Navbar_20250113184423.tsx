import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiSun, FiMoon, FiUser, FiBell, FiChevronDown, FiBookOpen, FiPhone } from "react-icons/fi"; // Add FiPhone for Contact icon
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
          .upsert([
            {
              id: user.id,
              email: user.email,
            },
          ])
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
      if (!user) return;

      const { data: notifications, error } = await supabase
        .from("notifications")
        .select("id, title, message, created_at, created_by, is_admin_notification")
        .eq("created_by", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching notifications:", error);
        throw error;
      }

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
      <div className="container flex flex-wrap h-auto px-4 justify-between">
        {/* First Line: Brand and Sidebar */}
        <div className="flex items-center w-full lg:w-auto mb-2 lg:mb-0">
          <SidebarTrigger className="mr-4" />
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text"
          >
            Sakshatkar
          </Button>
        </div>

        {/* Second Line: Links */}
        <div className="flex flex-wrap w-full lg:w-auto justify-between items-center mb-2 lg:mb-0 space-x-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/news")}
            className="flex items-center space-x-2"
          >
            <FiBookOpen className="w-6 h-6" />
            <span>News</span>
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate("/contact")}
            className="flex items-center space-x-2"
          >
            <FiPhone className="w-6 h-6" />
            <span>Contact</span>
          </Button>
        </div>

        {/* Third Line: Notifications, Dark Mode, and Profile */}
        <div className="flex items-center w-full lg:w-auto space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative">
                <FiBell className="w-6 h-6" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-xs">
                    {notifications.length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="flex flex-col">
                    <span className="font-medium">{notification.title}</span>
                    <span>{notification.message}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(notification.created_at).toLocaleString()}
                    </span>
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem>No new notifications</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            onClick={toggleDarkMode}
            className="text-lg font-semibold text-gray-800 dark:text-white"
          >
            {isDarkMode ? <FiSun className="w-6 h-6" /> : <FiMoon className="w-6 h-6" />}
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <FiUser className="w-5 h-5" />
                  <span>{profile?.name || user.email}</span>
                  <FiChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
