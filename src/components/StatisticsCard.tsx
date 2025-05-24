
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
      className={`group bg-white/90 backdrop-blur-sm shadow-lg border border-white/30 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-500 animate-fade-in`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900 group-hover:scale-110 transition-transform duration-300">
              {value}
            </p>
          </div>
          <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
        
        {/* Animated background glow */}
        <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-10 rounded-lg transition-opacity duration-300`}></div>
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;
