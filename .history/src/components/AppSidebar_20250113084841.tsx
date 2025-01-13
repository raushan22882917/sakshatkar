import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Users, DollarSign, Info, LogIn, HelpCircle, Code, BookOpen, UserCheck, Settings, Trophy } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import CompanyLogo from '@/assets/logo.jpg';

const navigationItems = [
  { 
    title: 'Home', 
    icon: Home, 
    url: '/' 
  },
  { 
    title: 'Coding Practice', 
    icon: Code, 
    url: '/coding' 
  },
  { 
    title: 'Resources', 
    icon: BookOpen, 
    url: '/resources' 
  },
  { 
    title: 'Interview Rounds', 
    icon: UserCheck, 
    url: '/interview-rounds' 
  },
  { 
    title: 'Hackathons', 
    icon: Trophy, 
    url: '/hackathons' 
  },
  { 
    title: 'Community', 
    icon: Users, 
    url: '/community' 
  },
  { 
    title: 'Pricing', 
    icon: DollarSign, 
    url: '/pricing' 
  },
  { 
    title: 'About', 
    icon: Info, 
    url: '/about' 
  },
  { 
    title: 'FAQ', 
    icon: HelpCircle, 
    url: '/faq' 
  },
  { 
    title: 'Account Settings', 
    icon: Settings, 
    url: '/settings' 
  },
];

export function AppSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Sidebar className="flex flex-col h-full">
      <SidebarContent className="flex flex-col flex-grow">
        {/* Company Logo and Name */}
        <div className="flex items-center p-4 space-x-3">
          <img src={CompanyLogo} alt="Company Logo" className="w-12 h-12 rounded-full" />
          <span className="text-xl font-extrabold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-green-400 to-purple-500">
            Sakshatkar
          </span>
        </div>

        <hr className="border-gray-300 dark:border-gray-700 my-2" />

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton onClick={() => navigate(item.url)} className="flex items-center space-x-2">
                    <item.icon className="text-gray-500 dark:text-gray-300" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Spacer to push footer items to the bottom */}
        <div className="flex-grow" />
      </SidebarContent>
    </Sidebar>
  );
}