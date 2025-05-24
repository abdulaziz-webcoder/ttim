
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Trophy, TrendingUp, Clock, Star, Users, Target, Award, MessageCircle, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import TestCard from "@/components/TestCard";
import StatisticsCard from "@/components/StatisticsCard";
import GradeChart from "@/components/GradeChart";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Mock data for demonstration
  const studentStats = {
    totalTests: 24,
    completedTests: 18,
    averageScore: 87.5,
    rank: 3,
    totalStudents: 156
  };

  const recentTests = [
    { id: 1, title: "Mathematics Quiz", subject: "Math", score: 92, maxScore: 100, status: "completed", date: "2025-01-20" },
    { id: 2, title: "Physics Chapter 5", subject: "Physics", score: 85, maxScore: 100, status: "completed", date: "2025-01-18" },
    { id: 3, title: "Chemistry Lab Test", subject: "Chemistry", score: null, maxScore: 100, status: "available", date: "2025-01-25" },
    { id: 4, title: "Biology Evolution", subject: "Biology", score: null, maxScore: 100, status: "upcoming", date: "2025-01-28" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <Navigation />

      <main className="relative z-10 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/20">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TIMT - Test Intelligence Management Tool
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-fade-in">
            Master Your Learning Journey
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in delay-300">
            Advanced testing platform with real-time analytics, personalized insights, and modern learning experience
          </p>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/80 backdrop-blur-sm shadow-lg border border-white/20">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300">
              <TrendingUp className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="tests" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300">
              <BookOpen className="w-4 h-4" />
              Tests
            </TabsTrigger>
            <TabsTrigger value="statistics" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300">
              <Trophy className="w-4 h-4" />
              Statistics
            </TabsTrigger>
            <TabsTrigger value="grades" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300">
              <Award className="w-4 h-4" />
              Grades
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatisticsCard
                title="Total Tests"
                value={studentStats.totalTests}
                icon={BookOpen}
                color="from-blue-500 to-blue-600"
                delay={0}
              />
              <StatisticsCard
                title="Completed"
                value={studentStats.completedTests}
                icon={Trophy}
                color="from-green-500 to-green-600"
                delay={100}
              />
              <StatisticsCard
                title="Average Score"
                value={`${studentStats.averageScore}%`}
                icon={Star}
                color="from-yellow-500 to-orange-500"
                delay={200}
              />
              <StatisticsCard
                title="Class Rank"
                value={`#${studentStats.rank}`}
                icon={Award}
                color="from-purple-500 to-purple-600"
                delay={300}
              />
            </div>

            {/* Recent Tests */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border border-white/20 animate-fade-in delay-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl font-bold text-gray-800">
                  <Clock className="w-6 h-6 text-blue-500" />
                  Recent Tests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {recentTests.map((test, index) => (
                    <TestCard key={test.id} test={test} delay={index * 100} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tests Tab */}
          <TabsContent value="tests" className="space-y-6">
            <div className="grid gap-6">
              {recentTests.map((test, index) => (
                <TestCard key={test.id} test={test} delay={index * 100} expanded />
              ))}
            </div>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="statistics" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-white/80 backdrop-blur-sm shadow-xl border border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                    Performance Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Mathematics</span>
                        <span className="text-sm text-gray-600">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Physics</span>
                        <span className="text-sm text-gray-600">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Chemistry</span>
                        <span className="text-sm text-gray-600">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Biology</span>
                        <span className="text-sm text-gray-600">88%</span>
                      </div>
                      <Progress value={88} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm shadow-xl border border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-500" />
                    Class Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">#3</div>
                      <div className="text-sm text-gray-600">Your Rank</div>
                      <div className="text-xs text-gray-500 mt-1">out of {studentStats.totalStudents} students</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-xl font-semibold text-green-600">A+</div>
                        <div className="text-xs text-gray-600">Current Grade</div>
                      </div>
                      <div>
                        <div className="text-xl font-semibold text-blue-600">87.5%</div>
                        <div className="text-xs text-gray-600">Class Average</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Grades Tab */}
          <TabsContent value="grades" className="space-y-6">
            <GradeChart />
          </TabsContent>
        </Tabs>

        {/* Contact Section */}
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
