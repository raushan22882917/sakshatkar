import React, { useState } from 'react';
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
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [subQuestions, setSubQuestions] = useState<string[]>([]);
  const [userQuery, setUserQuery] = useState('');

  // Predefined questions and sub-questions
  const questions = [
    { title: 'How do I reset my password?', subQuestions: ['Forgotten Password', 'Account Locked', 'Change Password'] },
    { title: 'How do I update my profile?', subQuestions: ['Change Name', 'Change Email', 'Add Profile Picture'] },
    { title: 'How do I apply for a job?', subQuestions: ['Job Requirements', 'Application Process', 'Interview Tips'] },
    { title: 'How can I report a bug?', subQuestions: ['Bug Details', 'Steps to Reproduce', 'Submit Logs'] },
    { title: 'How can I contact support?', subQuestions: ['Email Support', 'Live Chat', 'Phone Support'] },
  ];

  const handleQuestionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedQuestionTitle = event.target.value;
    setSelectedQuestion(selectedQuestionTitle);

    // Find sub-questions based on the selected question
    const question = questions.find((q) => q.title === selectedQuestionTitle);
    if (question) {
      setSubQuestions(question.subQuestions);
    } else {
      setSubQuestions([]);
    }
  };

  const handleSubmitQuery = () => {
    console.log('User Query Submitted:', userQuery);
    // Add your logic to submit the query here
  };

  const handleContactSupport = () => {
    navigate('/contact');
  };

  return (
    <Sidebar className="flex flex-col h-full bg-white dark:bg-gray-800">
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
            onClick={() => setShowHelpModal(true)}
            className="w-full flex items-center justify-center p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-150"
          >
            <HelpCircle className="w-5 h-5 mr-2" />
            Need Help?
          </button>
        </div>

        {/* Help Modal (Popup above Need Help Button) */}
        {showHelpModal && (
  <div className="absolute bottom-16 left-[150px] w-96 bg-white dark:bg-gray-700 p-6 rounded-md shadow-lg z-50">
    <button
      onClick={() => setShowHelpModal(false)}
      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-200"
    >
      ×
    </button>

    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Need Help?</h2>

    <div className="my-4">
      <label htmlFor="question" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Select a Question</label>
      <select
        id="question"
        value={selectedQuestion}
        onChange={handleQuestionChange}
        className="w-full mt-2 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      >
        <option value="">--Select a Question--</option>
        {questions.map((q) => (
          <option key={q.title} value={q.title}>{q.title}</option>
        ))}
      </select>
    </div>

    {selectedQuestion && (
      <div className="my-4">
        <label htmlFor="sub-question" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Select Sub-question</label>
        <select
          id="sub-question"
          className="w-full mt-2 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          <option value="">--Select a Sub-question--</option>
          {subQuestions.map((sub, index) => (
            <option key={index} value={sub}>{sub}</option>
          ))}
        </select>
      </div>
    )}

    <div className="my-4">
      <label htmlFor="user-query" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Query</label>
      <textarea
        id="user-query"
        value={userQuery}
        onChange={(e) => setUserQuery(e.target.value)}
        className="w-full mt-2 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        placeholder="Type your query here..."
      />
    </div>

    <div className="flex justify-between space-x-2">
      <button
        onClick={handleSubmitQuery}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
      >
        Submit
      </button>
      <button
        onClick={handleContactSupport}
        className="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700"
      >
        Contact Support
      </button>
    </div>
  </div>
)}

      </SidebarContent>
    </Sidebar>
  );
}
