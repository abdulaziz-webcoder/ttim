
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Trophy, TrendingUp, Clock, Star, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from '@tanstack/react-query';
import { getStudentTests, getStudentStatistics } from '@/services/api';
import Navigation from "@/components/Navigation";
import TestCard from "@/components/TestCard";
import StatisticsCard from "@/components/StatisticsCard";
import GradeChart from "@/components/GradeChart";
import ContactSection from "@/components/ContactSection";
import { useAuth } from '@/contexts/AuthContext';

// Define interfaces for API data
interface TestData {
  id: number;
  title: string;
  subject: string;
  score: number | null;
  maxScore: number;
  status: 'completed' | 'available' | 'upcoming';
  date: string;
}

interface StatisticsData {
  totalTests: number;
  completedTests: number;
  averageScore: number;
  rank: number;
  totalStudents: number;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  // Fetch student tests
  const { data: testsData, isLoading: isLoadingTests } = useQuery({
    queryKey: ['student-tests'],
    queryFn: getStudentTests,
  });

  // Fetch student statistics
  const { data: statisticsData, isLoading: isLoadingStats } = useQuery({
    queryKey: ['student-statistics'],
    queryFn: getStudentStatistics,
  });

  // Transform API data for our components
  const transformedTests: TestData[] = testsData ? testsData.map((test: any) => ({
    id: test.id,
    title: test.title,
    subject: test.subject,
    score: test.score,
    maxScore: test.max_score || 100,
    status: test.status.toLowerCase(),
    date: new Date(test.created_at).toLocaleDateString(),
  })) : [];

  // Until we have real data, use placeholder stats
  const studentStats: StatisticsData = statisticsData ? {
    totalTests: statisticsData.total_tests,
    completedTests: statisticsData.completed_tests,
    averageScore: statisticsData.average_score,
    rank: statisticsData.rank,
    totalStudents: statisticsData.total_students,
  } : {
    totalTests: 0,
    completedTests: 0,
    averageScore: 0,
    rank: 0,
    totalStudents: 0,
  };

  useEffect(() => {
    setIsVisible(true);
    // Welcome toast notification
    setTimeout(() => {
      toast({
        title: "TIM ga xush kelibsiz!",
        description: "Intellektual test platformasi",
        variant: "default",
      });
    }, 1000);
  }, [toast]);

  // Loading state
  if (isLoadingTests || isLoadingStats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mb-4 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-indigo-600 font-medium">Ma'lumotlar yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      {/* Enhanced Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-300/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-pink-200/10 rounded-full blur-2xl animate-pulse delay-700"></div>
        <div className="absolute bottom-1/3 left-1/4 w-56 h-56 bg-teal-200/10 rounded-full blur-2xl animate-pulse delay-300"></div>
      </div>

      <Navigation />

      <main className="relative z-10 container mx-auto px-4 py-8">
        {/* Enhanced Hero Section */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-white/20">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-inner shadow-white/40">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              TIM - Test Intellekt Markazi
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-fade-in">
            O'rganish yo'lingizda ustun bo'ling
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in delay-300">
            Real vaqt tahlillari, shaxsiy ko'rsatkichlar va zamonaviy o'quv tajribasi bilan ilg'or test platformasi
          </p>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 bg-white/90 backdrop-blur-md shadow-xl border border-white/30 rounded-2xl overflow-hidden p-1">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300">
              <TrendingUp className="w-4 h-4" />
              Bosh sahifa
            </TabsTrigger>
            <TabsTrigger value="tests" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300">
              <BookOpen className="w-4 h-4" />
              Testlar
            </TabsTrigger>
            <TabsTrigger value="statistics" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300">
              <Trophy className="w-4 h-4" />
              Statistika
            </TabsTrigger>
            <TabsTrigger value="grades" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300">
              <Star className="w-4 h-4" />
              Baholar
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatisticsCard
                title="Jami testlar"
                value={studentStats.totalTests}
                icon={BookOpen}
                color="from-indigo-500 to-indigo-600"
                delay={0}
              />
              <StatisticsCard
                title="Bajarilgan"
                value={studentStats.completedTests}
                icon={Trophy}
                color="from-green-500 to-teal-600"
                delay={100}
              />
              <StatisticsCard
                title="O'rtacha ball"
                value={`${studentStats.averageScore}%`}
                icon={Star}
                color="from-amber-500 to-orange-600"
                delay={200}
              />
              <StatisticsCard
                title="Sinf reytingi"
                value={`#${studentStats.rank}`}
                icon={Trophy}
                color="from-purple-500 to-fuchsia-600"
                delay={300}
              />
            </div>

            {/* Recent Tests */}
            <Card className="bg-white/90 backdrop-blur-md shadow-2xl border border-white/30 rounded-2xl animate-fade-in delay-500 overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  <Clock className="w-6 h-6 text-indigo-500" />
                  So'nggi testlar
                </CardTitle>
              </CardHeader>
              <CardContent>
                {transformedTests.length > 0 ? (
                  <div className="grid gap-4">
                    {transformedTests.slice(0, 4).map((test, index) => (
                      <TestCard key={test.id} test={test} delay={index * 100} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Hozircha testlar mavjud emas</p>
                    <Button className="mt-4">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Test topish
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tests Tab */}
          <TabsContent value="tests" className="space-y-6">
            {transformedTests.length > 0 ? (
              <div className="grid gap-6">
                {transformedTests.map((test, index) => (
                  <TestCard key={test.id} test={test} delay={index * 100} expanded />
                ))}
              </div>
            ) : (
              <Card className="bg-white/90 backdrop-blur-md shadow-xl border border-white/30 rounded-xl p-8 text-center">
                <div className="flex flex-col items-center">
                  <BookOpen className="h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Testlar mavjud emas</h3>
                  <p className="text-gray-500 mb-6">
                    Hozircha sizga mo'ljallangan testlar mavjud emas.
                  </p>
                </div>
              </Card>
            )}
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="statistics" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-white/90 backdrop-blur-md shadow-2xl border border-white/30 rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    <TrendingUp className="w-5 h-5 text-indigo-500" />
                    Natijalar tahlili
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {statisticsData?.subject_scores ? (
                    <div className="space-y-4">
                      {Object.entries(statisticsData.subject_scores).map(([subject, score]) => (
                        <div key={subject}>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">{subject}</span>
                            <span className="text-sm text-gray-600">{score}%</span>
                          </div>
                          <div className="h-2 bg-indigo-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600" 
                              style={{ width: `${score}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-4 text-gray-500">Ma'lumotlar hali mavjud emas</p>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-md shadow-2xl border border-white/30 rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    <Trophy className="w-5 h-5 text-purple-500" />
                    Sinf statistikasi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">#{studentStats.rank || '-'}</div>
                      <div className="text-sm text-gray-600">Sizning reytingingiz</div>
                      <div className="text-xs text-gray-500 mt-1">{studentStats.totalStudents || '-'} o'quvchi ichida</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-4 bg-white/80 rounded-xl shadow-lg border border-white/30 backdrop-blur-sm">
                        <div className="text-xl font-semibold text-green-600">
                          {statisticsData?.current_grade || '-'}
                        </div>
                        <div className="text-xs text-gray-600">Hozirgi baho</div>
                      </div>
                      <div className="p-4 bg-white/80 rounded-xl shadow-lg border border-white/30 backdrop-blur-sm">
                        <div className="text-xl font-semibold text-indigo-600">
                          {statisticsData?.class_average || '-'}%
                        </div>
                        <div className="text-xs text-gray-600">Sinf o'rtachasi</div>
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
        
        {/* Footer */}
        <div className="mt-20 text-center">
          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
            <span>Made with</span>
            <div className="flex items-center">
              <span className="inline-block bg-gradient-to-r from-green-600 to-green-700 text-white px-1 rounded text-xs">Django</span>
              <span className="mx-1">+</span>
              <span className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-1 rounded text-xs">React</span>
            </div>
            <span>with ❤️ by Abdulaziz</span>
          </div>
          <div className="mt-2">
            <a href="https://t.me/yordam_42" target="_blank" rel="noreferrer" className="text-xs text-indigo-500 hover:text-indigo-700">
              @yordam_42
            </a>
            <span className="mx-2 text-gray-300">|</span>
            <a href="https://t.me/pythonnews_uzbekistan" target="_blank" rel="noreferrer" className="text-xs text-indigo-500 hover:text-indigo-700">
              @pythonnews_uzbekistan
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
