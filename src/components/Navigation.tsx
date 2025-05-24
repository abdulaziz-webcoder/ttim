
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Bell, BookOpen, TrendingUp, Award } from "lucide-react";

const Navigation = () => {
  const [notifications] = useState(3);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-lg shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                TIMT
              </h1>
              <p className="text-xs text-gray-500">Test Intelligence Management</p>
            </div>
          </div>

          {/* Navigation Links - visible on medium screens and up */}
          <div className="hidden md:flex items-center gap-6">
            <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-indigo-50 transition-colors duration-300">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Tests</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-indigo-50 transition-colors duration-300">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              <span>Statistics</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-indigo-50 transition-colors duration-300">
              <Award className="w-4 h-4 text-indigo-600" />
              <span>Grades</span>
            </Button>
          </div>

          {/* Notifications */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="relative hover:bg-indigo-50 transition-colors duration-300">
              <Bell className="w-5 h-5 text-indigo-600" />
              {notifications > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-gradient-to-r from-red-500 to-pink-500 text-xs animate-pulse border-none">
                  {notifications}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
