
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Search, TrendingUp, Award, AlertCircle } from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { getStudentTests, getStudentStatistics } from '@/services/api';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import TestCard from "@/components/TestCard";
import { Test, Statistics } from '@/types/test';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();

  // Fetch student tests
  const { data: tests = [], isLoading: isLoadingTests, error: testsError } = useQuery({
    queryKey: ['student-tests'],
    queryFn: getStudentTests,
    retry: 1,
    enabled: isAuthenticated,
  });

  // Fetch student statistics
  const { data: stats, isLoading: isLoadingStats, error: statsError } = useQuery({
    queryKey: ['student-stats'],
    queryFn: getStudentStatistics,
    retry: 1,
    enabled: isAuthenticated,
  });

  // Handle API errors
  if (testsError || statsError) {
    console.error('API Errors:', { testsError, statsError });
  }

  // Transform and validate API data
  const transformedTests: Test[] = Array.isArray(tests) ? tests.map((test: any) => ({
    id: test?.id || 0,
    title: test?.title || 'Nomsiz test',
    subject: test?.subject || 'Umumiy',
    description: test?.description || '',
    duration: test?.duration || 60,
    max_score: test?.max_score || 100,
    status: test?.status || 'available',
    date: test?.created_at ? new Date(test.created_at).toLocaleDateString('uz-UZ') : 'Noma\'lum',
    score: test?.score || null,
  })).filter(test => test.id > 0) : [];

  // Filter tests
  const filteredTests = transformedTests.filter((test) => {
    const title = test.title || '';
    const subject = test.subject || '';
    const searchLower = (searchTerm || '').toLowerCase();
    
    const matchesSearch = title.toLowerCase().includes(searchLower) ||
                         subject.toLowerCase().includes(searchLower);
    const matchesStatus = statusFilter === 'all' || test.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const defaultStats: Statistics = {
    total_tests_taken: stats?.total_tests_taken || 0,
    average_score: stats?.average_score || 0,
    total_tests_available: stats?.total_tests_available || 0,
  };

  if (isLoadingTests) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 mb-4 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-indigo-600 font-medium">Testlar yuklanmoqda...</p>
          </div>
        </div>
      </div>
    );
  }

  if (testsError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ma'lumotlar yuklanmadi</h2>
          <p className="text-gray-600 mb-8">
            Testlar ma'lumotlarini olishda xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.
          </p>
          <Button onClick={() => window.location.reload()}>Qayta yuklash</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Test Intellekt Markazi
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Bilimingizni sinab ko'ring va o'z darajangizni aniqlang
          </p>
          {user && (
            <p className="text-lg text-indigo-600 font-medium">
              Xush kelibsiz, {user.first_name || user.email}!
            </p>
          )}
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur-md shadow-xl border border-white/30 animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Jami testlar</CardTitle>
              <BookOpen className="h-4 w-4 text-indigo-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-indigo-600">
                {isLoadingStats ? '...' : defaultStats.total_tests_available}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-md shadow-xl border border-white/30 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Topshirilgan</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {isLoadingStats ? '...' : defaultStats.total_tests_taken}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-md shadow-xl border border-white/30 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">O'rtacha ball</CardTitle>
              <Award className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">
                {isLoadingStats ? '...' : `${defaultStats.average_score.toFixed(1)}%`}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="mb-8 bg-white/90 backdrop-blur-md shadow-xl border border-white/30">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Testlarni qidiring..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/50 border-white/30"
                />
              </div>
              <div className="flex gap-2">
                {['all', 'available', 'completed', 'upcoming'].map((filter) => (
                  <Button
                    key={filter}
                    variant={statusFilter === filter ? 'default' : 'outline'}
                    onClick={() => setStatusFilter(filter)}
                    size="sm"
                  >
                    {filter === 'all' ? 'Barchasi' : 
                     filter === 'available' ? 'Mavjud' :
                     filter === 'completed' ? 'Yakunlangan' : 'Rejalashtirilgan'}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tests Grid */}
        {filteredTests.length === 0 ? (
          <Card className="bg-white/90 backdrop-blur-md shadow-xl border border-white/30">
            <CardContent className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {searchTerm || statusFilter !== 'all' ? 'Test topilmadi' : 'Testlar mavjud emas'}
              </h3>
              <p className="text-gray-500">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Qidiruv shartlaringizni o\'zgartiring' 
                  : 'Hozircha testlar mavjud emas'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map((test, index) => (
              <TestCard
                key={test.id}
                test={test}
                delay={index * 100}
                expanded={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
