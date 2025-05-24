
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Plus, BarChart, Save, Trash2, Edit, Eye, CheckCircle, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const Teacher = () => {
  const [activeTab, setActiveTab] = useState("tests");
  const [isVisible, setIsVisible] = useState(true);
  const { toast } = useToast();
  const [newTest, setNewTest] = useState({
    title: "",
    subject: "",
    description: "",
    duration: 60,
    questions: [
      { text: "", options: [{ text: "", isCorrect: false }, { text: "", isCorrect: false }, { text: "", isCorrect: false }, { text: "", isCorrect: false }] }
    ]
  });

  // Mock data
  const tests = [
    { id: 1, title: "Matematika", completions: 45, averageScore: 76, questions: 12, subject: "Matematika", created: "12.05.2025" },
    { id: 2, title: "Fizika", completions: 32, averageScore: 68, questions: 10, subject: "Fizika", created: "10.05.2025" },
    { id: 3, title: "Kimyo", completions: 28, averageScore: 72, questions: 15, subject: "Kimyo", created: "08.05.2025" },
  ];

  const statistics = [
    { id: 1, test: "Matematika", student: "Aziz Karimov", score: 92, timeTaken: "45 daqiqa", date: "15.05.2025" },
    { id: 2, test: "Matematika", student: "Nodira Saidova", score: 88, timeTaken: "52 daqiqa", date: "15.05.2025" },
    { id: 3, test: "Fizika", student: "Jasur Alimov", score: 76, timeTaken: "48 daqiqa", date: "14.05.2025" },
    { id: 4, test: "Kimyo", student: "Dilnoza Rahimova", score: 84, timeTaken: "58 daqiqa", date: "13.05.2025" },
    { id: 5, test: "Matematika", student: "Botir Qodirov", score: 68, timeTaken: "55 daqiqa", date: "12.05.2025" },
  ];

  const addQuestion = () => {
    setNewTest({
      ...newTest,
      questions: [...newTest.questions, 
        { text: "", options: [{ text: "", isCorrect: false }, { text: "", isCorrect: false }, { text: "", isCorrect: false }, { text: "", isCorrect: false }] }
      ]
    });
  };

  const saveTest = () => {
    // Here would be the API call to save the test
    toast({
      title: "Test saqlandi",
      description: "Test muvaffaqiyatli yaratildi va saqlandi",
    });
    
    // Reset form
    setNewTest({
      title: "",
      subject: "",
      description: "",
      duration: 60,
      questions: [
        { text: "", options: [{ text: "", isCorrect: false }, { text: "", isCorrect: false }, { text: "", isCorrect: false }, { text: "", isCorrect: false }] }
      ]
    });
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updatedQuestions = [...newTest.questions];
    updatedQuestions[index].text = value;
    setNewTest({...newTest, questions: updatedQuestions});
  };

  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    const updatedQuestions = [...newTest.questions];
    updatedQuestions[questionIndex].options[optionIndex].text = value;
    setNewTest({...newTest, questions: updatedQuestions});
  };

  const setCorrectOption = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...newTest.questions];
    updatedQuestions[questionIndex].options = updatedQuestions[questionIndex].options.map((option, i) => ({
      ...option,
      isCorrect: i === optionIndex
    }));
    setNewTest({...newTest, questions: updatedQuestions});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-300/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-pink-200/10 rounded-full blur-2xl animate-pulse delay-700"></div>
        <div className="absolute bottom-1/3 left-1/4 w-56 h-56 bg-teal-200/10 rounded-full blur-2xl animate-pulse delay-300"></div>
      </div>

      <Navigation />

      <main className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-white/20">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-inner shadow-white/40">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              O'qituvchi paneli
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-fade-in">
            Test yaratish va boshqarish
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in delay-300">
            Testlarni yarating, nazorat qiling va statistikalarni ko'ring
          </p>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/90 backdrop-blur-md shadow-xl border border-white/30 rounded-2xl overflow-hidden p-1">
            <TabsTrigger value="tests" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300">
              <FileText className="w-4 h-4" />
              Testlar
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300">
              <Plus className="w-4 h-4" />
              Yangi test
            </TabsTrigger>
            <TabsTrigger value="statistics" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all duration-300">
              <BarChart className="w-4 h-4" />
              Statistika
            </TabsTrigger>
          </TabsList>

          {/* Tests Tab */}
          <TabsContent value="tests" className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-md shadow-2xl border border-white/30 rounded-2xl animate-fade-in overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  <FileText className="w-6 h-6 text-indigo-500" />
                  Mavjud testlar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Fan</TableHead>
                        <TableHead>Savollar</TableHead>
                        <TableHead>O'rtacha ball</TableHead>
                        <TableHead>Yaratildi</TableHead>
                        <TableHead>Harakatlar</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tests.map((test) => (
                        <TableRow key={test.id} className="hover:bg-indigo-50/50">
                          <TableCell className="font-medium">{test.title}</TableCell>
                          <TableCell>{test.subject}</TableCell>
                          <TableCell>{test.questions}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={test.averageScore} className="h-2 bg-indigo-100" />
                              <span className="text-sm">{test.averageScore}%</span>
                            </div>
                          </TableCell>
                          <TableCell>{test.created}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4 text-indigo-500" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Edit className="h-4 w-4 text-amber-500" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Create New Test Tab */}
          <TabsContent value="create" className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-md shadow-2xl border border-white/30 rounded-2xl animate-fade-in overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  <Plus className="w-6 h-6 text-indigo-500" />
                  Yangi test yaratish
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Test nomi</label>
                    <Input 
                      value={newTest.title}
                      onChange={(e) => setNewTest({...newTest, title: e.target.value})}
                      placeholder="Test nomini kiriting"
                      className="border-indigo-100 focus:border-indigo-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Fan</label>
                    <Input 
                      value={newTest.subject}
                      onChange={(e) => setNewTest({...newTest, subject: e.target.value})}
                      placeholder="Fanni kiriting"
                      className="border-indigo-100 focus:border-indigo-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Tavsif</label>
                  <Textarea 
                    value={newTest.description}
                    onChange={(e) => setNewTest({...newTest, description: e.target.value})}
                    placeholder="Test haqida qisqacha ma'lumot"
                    className="border-indigo-100 focus:border-indigo-300 min-h-[100px]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Test davomiyligi (daqiqada)</label>
                  <Input 
                    type="number"
                    value={newTest.duration}
                    onChange={(e) => setNewTest({...newTest, duration: parseInt(e.target.value)})}
                    className="border-indigo-100 focus:border-indigo-300 w-24"
                    min="1"
                  />
                </div>

                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">Savollar</h3>
                    <Badge variant="outline" className="bg-indigo-50 text-indigo-600 border-indigo-200">
                      {newTest.questions.length} ta savol
                    </Badge>
                  </div>

                  {newTest.questions.map((question, qIndex) => (
                    <div key={qIndex} className="p-6 bg-white/60 rounded-xl border border-indigo-100 shadow-sm">
                      <div className="mb-4">
                        <div className="flex justify-between mb-1">
                          <label className="block text-sm font-medium text-gray-600">Savol #{qIndex + 1}</label>
                        </div>
                        <Input 
                          value={question.text}
                          onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                          placeholder="Savolni kiriting"
                          className="border-indigo-100 focus:border-indigo-300"
                        />
                      </div>

                      <div className="space-y-3">
                        <p className="text-sm font-medium text-gray-600">Javob variantlari</p>
                        {question.options.map((option, oIndex) => (
                          <div key={oIndex} className="flex items-center gap-2">
                            <Button
                              type="button"
                              size="sm"
                              variant={option.isCorrect ? "default" : "outline"}
                              onClick={() => setCorrectOption(qIndex, oIndex)}
                              className={`h-8 w-8 p-0 ${option.isCorrect ? 'bg-green-500 hover:bg-green-600' : ''}`}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Input 
                              value={option.text}
                              onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                              placeholder={`Variant ${oIndex + 1}`}
                              className="border-indigo-100 focus:border-indigo-300"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  <Button 
                    onClick={addQuestion}
                    className="w-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                  >
                    <Plus className="w-4 h-4 mr-2" /> Yana savol qo'shish
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t border-gray-100 py-4">
                <Button onClick={saveTest} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                  <Save className="w-4 h-4 mr-2" /> Testni saqlash
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="statistics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white/90 backdrop-blur-md shadow-xl border border-white/30 rounded-2xl overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-gray-700">Test topshirishlar</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-indigo-600">105</p>
                  <p className="text-sm text-gray-500">So'ngi 30 kun</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur-md shadow-xl border border-white/30 rounded-2xl overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-gray-700">O'rtacha ball</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-green-600">76.5%</p>
                  <div className="w-full bg-gray-100 rounded-full h-2.5 mt-2">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '76.5%' }}></div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/90 backdrop-blur-md shadow-xl border border-white/30 rounded-2xl overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-gray-700">Aktiv o'quvchilar</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-amber-600">48</p>
                  <p className="text-sm text-gray-500">Jami 56 dan</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/90 backdrop-blur-md shadow-2xl border border-white/30 rounded-2xl animate-fade-in overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  <BarChart className="w-6 h-6 text-indigo-500" />
                  Test natijalari
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>O'quvchi</TableHead>
                        <TableHead>Test</TableHead>
                        <TableHead>Ball</TableHead>
                        <TableHead>Vaqt</TableHead>
                        <TableHead>Sana</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {statistics.map((stat) => (
                        <TableRow key={stat.id} className="hover:bg-indigo-50/50">
                          <TableCell className="font-medium">{stat.student}</TableCell>
                          <TableCell>{stat.test}</TableCell>
                          <TableCell>
                            <Badge className={`${
                              stat.score >= 85 ? 'bg-green-100 text-green-800' :
                              stat.score >= 70 ? 'bg-amber-100 text-amber-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {stat.score}%
                            </Badge>
                          </TableCell>
                          <TableCell className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-gray-400" />
                            {stat.timeTaken}
                          </TableCell>
                          <TableCell>{stat.date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

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

export default Teacher;
