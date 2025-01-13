import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  Users,
  DollarSign,
  Info,
  LogIn,
  HelpCircle,
  Code,
  BookOpen,
  UserCheck,
  Settings,
  Trophy,
  Briefcase, // Added Briefcase for Jobs icon
} from 'lucide-react';
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
  { title: 'Home', icon: Home, url: '/' },
  { title: 'Coding Practice', icon: Code, url: '/coding' },
  { title: 'Resources', icon: BookOpen, url: '/resources' },
  { title: 'Interview Rounds', icon: UserCheck, url: '/interview-rounds' },
  { title: 'Hackathons', icon: Trophy, url: '/hackathons' },
  { title: 'Community', icon: Users, url: '/community' },
  { title: 'Jobs', icon: Briefcase, url: '/jobs' }, // Added Jobs to the navigation items
  { title: 'Pricing', icon: DollarSign, url: '/pricing' },
  { title: 'About', icon: Info, url: '/about' },
  { title: 'FAQ', icon: HelpCircle, url: '/faq' },
  { title: 'Account Settings', icon: Settings, url: '/settings' },
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

        {/* Need Help Button */}
        <div className="p-4">
          <button
            onClick={() => navigate('/help')}
            className="w-full flex items-center justify-center p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-150"
          >
            <HelpCircle className="w-5 h-5 mr-2" />
            Need Help?
          </button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
