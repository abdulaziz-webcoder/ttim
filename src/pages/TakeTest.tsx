
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Clock, ChevronLeft, ChevronRight, Flag } from "lucide-react";
import { useQuery, useMutation } from '@tanstack/react-query';
import { getTestDetails, getTestQuestions, submitTest } from '@/services/api';
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

interface Question {
  id: number;
  question_text: string;
  question_type: string;
  options: Array<{
    id: number;
    option_text: string;
  }>;
}

interface TestDetails {
  id: number;
  title: string;
  description: string;
  duration: number;
  max_score: number;
}

const TakeTest = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);

  // Fetch test details
  const { data: testDetails, isLoading: isLoadingTest } = useQuery({
    queryKey: ['test-details', testId],
    queryFn: () => getTestDetails(Number(testId)),
    enabled: !!testId,
  });

  // Fetch test questions
  const { data: questions, isLoading: isLoadingQuestions } = useQuery({
    queryKey: ['test-questions', testId],
    queryFn: () => getTestQuestions(Number(testId)),
    enabled: !!testId,
  });

  // Submit test mutation
  const submitTestMutation = useMutation({
    mutationFn: submitTest,
    onSuccess: () => {
      toast({
        title: "Test yakunlandi!",
        description: "Sizning javoblaringiz muvaffaqiyatli yuborildi.",
      });
      navigate('/');
    },
  });

  // Timer effect
  useEffect(() => {
    if (testDetails?.duration) {
      setTimeRemaining(testDetails.duration * 60); // Convert minutes to seconds
    }
  }, [testDetails]);

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && questions?.length > 0) {
      handleSubmitTest();
    }
  }, [timeRemaining, questions]);

  const handleAnswerChange = (questionId: number, optionId: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (questions?.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitTest = () => {
    const submissionData = {
      test: Number(testId),
      answers: Object.entries(answers).map(([questionId, optionId]) => ({
        question: Number(questionId),
        selected_option: optionId
      }))
    };

    submitTestMutation.mutate(submissionData);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (isLoadingTest || isLoadingQuestions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 mb-4 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-indigo-600 font-medium">Test yuklanmoqda...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!testDetails || !questions?.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Test topilmadi</h2>
          <p className="text-gray-600 mb-8">Bu test mavjud emas yoki sizga ruxsat berilmagan.</p>
          <Button onClick={() => navigate('/')}>Bosh sahifaga qaytish</Button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const answeredQuestions = Object.keys(answers).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Test Header */}
        <Card className="mb-6 bg-white/90 backdrop-blur-md shadow-xl border border-white/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-indigo-600">
                  {testDetails.title}
                </CardTitle>
                <p className="text-gray-600 mt-1">{testDetails.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-orange-600">
                  <Clock className="w-5 h-5" />
                  <span className="font-mono text-lg font-bold">
                    {formatTime(timeRemaining)}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {answeredQuestions}/{questions.length} javoblangan
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Savol {currentQuestionIndex + 1} / {questions.length}</span>
                <span>{progress.toFixed(0)}% yakunlangan</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardHeader>
        </Card>

        {/* Question Card */}
        <Card className="mb-6 bg-white/90 backdrop-blur-md shadow-xl border border-white/30">
          <CardHeader>
            <CardTitle className="text-xl">
              {currentQuestion.question_text}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={answers[currentQuestion.id]?.toString() || ""} 
              onValueChange={(value) => handleAnswerChange(currentQuestion.id, Number(value))}
              className="space-y-4"
            >
              {currentQuestion.options?.map((option) => (
                <div key={option.id} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-indigo-50 transition-colors">
                  <RadioGroupItem value={option.id.toString()} id={`option-${option.id}`} />
                  <Label htmlFor={`option-${option.id}`} className="flex-1 cursor-pointer">
                    {option.option_text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Oldingi savol
          </Button>

          <div className="flex gap-2">
            {currentQuestionIndex === questions.length - 1 ? (
              <Button 
                onClick={handleSubmitTest}
                disabled={submitTestMutation.isPending}
                className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
              >
                <Flag className="w-4 h-4" />
                {submitTestMutation.isPending ? 'Yuborilmoqda...' : 'Testni yakunlash'}
              </Button>
            ) : (
              <Button 
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === questions.length - 1}
                className="flex items-center gap-2"
              >
                Keyingi savol
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakeTest;
