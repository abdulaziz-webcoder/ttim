
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatisticsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  delay?: number;
}

const StatisticsCard = ({ title, value, icon: Icon, color, delay = 0 }: StatisticsCardProps) => {
  return (
    <Card 
      className={`group bg-white/90 backdrop-blur-md shadow-xl border border-white/30 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 animate-fade-in rounded-2xl overflow-hidden`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="p-6 relative">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
              {value}
            </p>
          </div>
          <div className={`w-14 h-14 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
            <Icon className="w-7 h-7 text-white drop-shadow-md" />
          </div>
        </div>
        
        {/* Animated background glow */}
        <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
        
        {/* Light beam effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 blur-sm transform -rotate-12 group-hover:animate-shine"></div>
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;
