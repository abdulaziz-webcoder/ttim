
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Bell, BookOpen, TrendingUp, Award, FileText, LogOut, User } from "lucide-react";
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Navigation = () => {
  const [notifications] = useState(3);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  
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
          <Link to="/">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  TIM
                </h1>
                <p className="text-xs text-gray-500">Test Intellekt Markazi</p>
              </div>
            </div>
          </Link>

          {/* Navigation Links - visible on medium screens and up */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center gap-6">
              <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-indigo-50 transition-colors duration-300" asChild>
                <Link to="/">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>Testlar</span>
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-indigo-50 transition-colors duration-300" asChild>
                <Link to="/">
                  <TrendingUp className="w-4 h-4 text-indigo-600" />
                  <span>Statistika</span>
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-indigo-50 transition-colors duration-300" asChild>
                <Link to="/">
                  <Award className="w-4 h-4 text-indigo-600" />
                  <span>Baholar</span>
                </Link>
              </Button>
              {user && (user.role === "teacher" || user.role === "admin") && (
                <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-indigo-50 transition-colors duration-300" asChild>
                  <Link to="/teacher">
                    <FileText className="w-4 h-4 text-indigo-600" />
                    <span>O'qituvchi</span>
                  </Link>
                </Button>
              )}
            </div>
          )}

          {/* User Actions */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="sm" className="relative hover:bg-indigo-50 transition-colors duration-300">
                  <Bell className="w-5 h-5 text-indigo-600" />
                  {notifications > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-gradient-to-r from-red-500 to-pink-500 text-xs animate-pulse border-none">
                      {notifications}
                    </Badge>
                  )}
                </Button>

                <div className="flex items-center gap-2">
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-gray-700">{user?.first_name} {user?.last_name}</p>
                    <p className="text-xs text-gray-500">
                      {user?.role === "teacher" ? "O'qituvchi" : user?.role === "admin" ? "Admin" : "O'quvchi"}
                    </p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={logout} 
                    className="hover:bg-red-50 text-red-500"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/login">
                    <User className="w-4 h-4 mr-1" />
                    Kirish
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/register">Ro'yxatdan o'tish</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
