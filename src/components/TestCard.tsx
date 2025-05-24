
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Star, Play, CheckCircle, Calendar } from "lucide-react";

interface Test {
  id: number;
  title: string;
  subject: string;
  score: number | null;
  maxScore: number;
  status: 'completed' | 'available' | 'upcoming';
  date: string;
}

interface TestCardProps {
  test: Test;
  delay?: number;
  expanded?: boolean;
}

const TestCard = ({ test, delay = 0, expanded = false }: TestCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'from-green-500 to-green-600';
      case 'available': return 'from-blue-500 to-blue-600';
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

  const StatusIcon = getStatusIcon(test.status);
  const scorePercentage = test.score ? (test.score / test.maxScore) * 100 : 0;

  return (
    <Card 
      className={`group bg-white/90 backdrop-blur-sm shadow-lg border border-white/30 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-500 animate-fade-in`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className={`w-12 h-12 bg-gradient-to-r ${getStatusColor(test.status)} rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                {test.title}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs">
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
            <StatusIcon className={`w-5 h-5 ${test.status === 'completed' ? 'text-green-500' : test.status === 'available' ? 'text-blue-500' : 'text-gray-400'}`} />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {test.status === 'completed' && test.score !== null && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Score</span>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="font-bold text-lg">{test.score}/{test.maxScore}</span>
              </div>
            </div>
            <Progress value={scorePercentage} className="h-2" />
            <div className="text-right">
              <span className={`text-sm font-semibold ${scorePercentage >= 90 ? 'text-green-600' : scorePercentage >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                {scorePercentage.toFixed(1)}%
              </span>
            </div>
          </div>
        )}

        {expanded && (
          <div className="mt-4 flex gap-2">
            {test.status === 'available' && (
              <Button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
                <Play className="w-4 h-4 mr-2" />
                Start Test
              </Button>
            )}
            {test.status === 'completed' && (
              <Button variant="outline" className="flex-1 hover:bg-blue-50 transition-colors duration-300">
                View Results
              </Button>
            )}
            {test.status === 'upcoming' && (
              <Button variant="outline" disabled className="flex-1">
                <Calendar className="w-4 h-4 mr-2" />
                Scheduled
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TestCard;
