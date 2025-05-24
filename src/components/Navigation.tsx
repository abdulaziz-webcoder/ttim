
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, User, Settings, LogOut, Bell } from "lucide-react";

const Navigation = () => {
  const [notifications] = useState(3);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TIMT
              </h1>
              <p className="text-xs text-gray-500">Test Intelligence Management</p>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="relative hover:bg-blue-50 transition-colors duration-300">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-xs animate-pulse">
                  {notifications}
                </Badge>
              )}
            </Button>
            
            <Button variant="ghost" size="sm" className="hover:bg-blue-50 transition-colors duration-300">
              <User className="w-5 h-5" />
            </Button>
            
            <Button variant="ghost" size="sm" className="hover:bg-blue-50 transition-colors duration-300">
              <Settings className="w-5 h-5" />
            </Button>
            
            <Button variant="outline" size="sm" className="hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors duration-300">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
