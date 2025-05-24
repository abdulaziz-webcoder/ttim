
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { TrendingUp, Calendar, BookOpen, AlertCircle } from "lucide-react";

const GradeChart = () => {
  const monthlyData = [
    { month: 'Sep', score: 78 },
    { month: 'Oct', score: 82 },
    { month: 'Nov', score: 85 },
    { month: 'Dec', score: 88 },
    { month: 'Jan', score: 87 },
  ];

  const subjectData = [
    { subject: 'Math', score: 92 },
    { subject: 'Physics', score: 85 },
    { subject: 'Chemistry', score: 78 },
    { subject: 'Biology', score: 88 },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-white/90 backdrop-blur-md shadow-xl border border-white/30 rounded-2xl overflow-hidden animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              <TrendingUp className="w-5 h-5 text-indigo-500" />
              Performance Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e4e7" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(255, 255, 255, 0.95)', 
                    border: 'none', 
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="url(#gradient)" 
                  strokeWidth={3}
                  dot={{ fill: '#4f46e5', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, fill: '#4338ca', strokeWidth: 0 }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#4f46e5" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-md shadow-xl border border-white/30 rounded-2xl overflow-hidden animate-fade-in delay-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              <Calendar className="w-5 h-5 text-purple-500" />
              Subject Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subjectData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e4e7" />
                <XAxis dataKey="subject" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(255, 255, 255, 0.95)', 
                    border: 'none', 
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Bar 
                  dataKey="score" 
                  fill="url(#barGradient)"
                  radius={[4, 4, 0, 0]}
                />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#4f46e5" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Add Grade Distribution Card */}
      <Card className="bg-white/90 backdrop-blur-md shadow-xl border border-white/30 rounded-2xl overflow-hidden animate-fade-in delay-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            <BookOpen className="w-5 h-5 text-indigo-500" />
            Grade Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {['A+', 'A', 'B', 'C', 'D'].map((grade, index) => (
              <div key={grade} className="text-center">
                <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${
                  index === 0 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  <span className="text-xl font-bold">{grade}</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  {index === 0 ? 'Your Grade' : ''}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Tips Card */}
      <Card className="bg-gradient-to-r from-amber-500 to-orange-600 border-none shadow-xl rounded-2xl overflow-hidden animate-fade-in delay-400">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <AlertCircle className="w-5 h-5" />
            Tips to Improve
          </CardTitle>
        </CardHeader>
        <CardContent className="text-white/90">
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <div className="rounded-full bg-white/20 p-1 mt-0.5">
                <span className="block w-2 h-2 rounded-full bg-white" />
              </div>
              <p>Focus more time on Chemistry where your performance is lowest</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="rounded-full bg-white/20 p-1 mt-0.5">
                <span className="block w-2 h-2 rounded-full bg-white" />
              </div>
              <p>Complete the "Chemistry Lab Test" which is currently available</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="rounded-full bg-white/20 p-1 mt-0.5">
                <span className="block w-2 h-2 rounded-full bg-white" />
              </div>
              <p>Review your mistakes in previous tests to identify knowledge gaps</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GradeChart;
