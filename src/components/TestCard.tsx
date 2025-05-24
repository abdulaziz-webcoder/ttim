
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Star, Play, CheckCircle, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Test } from '@/types/test';

interface TestCardProps {
  test: Test;
  delay?: number;
  expanded?: boolean;
}

const TestCard = ({ test, delay = 0, expanded = false }: TestCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  console.log('TestCard rendering with test:', test);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'from-green-500 to-teal-600';
      case 'available': return 'from-indigo-500 to-blue-600';
      case 'upcoming': return 'from-gray-400 to-gray-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'available': return Play;
      case 'upcoming': return Calendar;
      default: return Clock;
    }
  };

  const handleStartTest = () => {
    console.log('Attempting to start test:', test);
    
    if (test.status === 'available') {
      console.log('Starting test with ID:', test.id);
      navigate(`/test/${test.id}`);
    } else if (test.status === 'upcoming') {
      toast({
        title: "Test hali mavjud emas",
        description: "Bu test hali boshlanmagan.",
        variant: "destructive",
      });
    } else if (test.status === 'completed') {
      toast({
        title: "Test allaqachon yakunlangan",
        description: "Siz bu testni allaqachon topshirgansiz.",
      });
    }
  };

  const StatusIcon = getStatusIcon(test.status);
  const scorePercentage = test.score ? (test.score / test.max_score) * 100 : 0;

  return (
    <Card 
      className={`group bg-white/90 backdrop-blur-md shadow-lg border border-white/30 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-500 animate-fade-in rounded-2xl overflow-hidden`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className={`w-14 h-14 bg-gradient-to-r ${getStatusColor(test.status)} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent group-hover:from-indigo-600 group-hover:to-purple-600 transition-colors duration-300">
                {test.title}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs bg-indigo-100 text-indigo-700 hover:bg-indigo-200">
                  {test.subject}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  {test.date}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <StatusIcon className={`w-5 h-5 ${
              test.status === 'completed' 
                ? 'text-green-500' 
                : test.status === 'available' 
                  ? 'text-indigo-500' 
                  : 'text-gray-400'
            }`} />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {test.status === 'completed' && test.score !== null && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Ball</span>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500" />
                <span className="font-bold text-lg">{test.score}/{test.max_score}</span>
              </div>
            </div>
            <Progress 
              value={scorePercentage} 
              className="h-2 bg-gray-100"
            />
            <div className="text-right">
              <span className={`text-sm font-semibold ${
                scorePercentage >= 90 
                  ? 'text-green-600' 
                  : scorePercentage >= 70 
                    ? 'text-amber-600' 
                    : 'text-red-600'
              }`}>
                {scorePercentage.toFixed(1)}%
              </span>
            </div>
          </div>
        )}

        {expanded && (
          <div className="mt-4 flex gap-2">
            {test.status === 'available' && (
              <Button 
                onClick={handleStartTest}
                className="flex-1 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-indigo-400/20 border-none"
              >
                <Play className="w-4 h-4 mr-2" />
                Testni boshlash
              </Button>
            )}
            {test.status === 'completed' && (
              <Button 
                variant="outline" 
                className="flex-1 border-indigo-200 hover:bg-indigo-50 transition-colors duration-300 text-indigo-700"
                onClick={() => toast({ title: "Natijalarni ko'rish", description: "Ushbu funksiya tez orada qo'shiladi." })}
              >
                Natijalarni ko'rish
              </Button>
            )}
            {test.status === 'upcoming' && (
              <Button variant="outline" disabled className="flex-1">
                <Calendar className="w-4 h-4 mr-2" />
                Rejalashtirilgan
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TestCard;
