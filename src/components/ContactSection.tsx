
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send } from "lucide-react";

const ContactSection = () => {
  const handleTelegramContact = () => {
    window.open('https://t.me/yordam_42', '_blank');
  };

  const handleChannelSubscribe = () => {
    window.open('https://t.me/pythonnews_uzbekistan', '_blank');
  };

  return (
    <div className="mt-16 mb-8">
      <Card className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 border-none shadow-2xl animate-fade-in delay-700">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white flex items-center justify-center gap-2 mb-2">
            <MessageCircle className="w-6 h-6" />
            Stay Connected
          </CardTitle>
          <p className="text-blue-100">Get support and stay updated with the latest news</p>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              onClick={handleTelegramContact}
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
              size="lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Contact: @yordam_42
            </Button>
            
            <Button 
              onClick={handleChannelSubscribe}
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
              size="lg"
            >
              <Send className="w-5 h-5 mr-2" />
              Subscribe @pythonnews_uzbekistan
            </Button>
          </div>
          
          <div className="text-sm text-blue-100 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <p className="font-medium mb-2">🚀 Join our community!</p>
            <p>Get technical support, updates, and connect with fellow learners in our Telegram channels.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactSection;
