
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send, ExternalLink, Star } from "lucide-react";

const ContactSection = () => {
  const handleTelegramContact = () => {
    window.open('https://t.me/yordam_42', '_blank');
  };

  const handleChannelSubscribe = () => {
    window.open('https://t.me/pythonnews_uzbekistan', '_blank');
  };

  return (
    <div className="mt-16 mb-8">
      <Card className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 border-none shadow-2xl animate-fade-in delay-700 rounded-2xl overflow-hidden">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-white flex items-center justify-center gap-2 mb-2">
            <MessageCircle className="w-7 h-7" />
            Stay Connected
          </CardTitle>
          <p className="text-blue-100">Get support and stay updated with the latest news</p>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              onClick={handleTelegramContact}
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm rounded-full py-6 shadow-lg hover:shadow-xl"
              size="lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Contact: @yordam_42
              <ExternalLink className="w-4 h-4 ml-2 opacity-70" />
            </Button>
            
            <Button 
              onClick={handleChannelSubscribe}
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm rounded-full py-6 shadow-lg hover:shadow-xl"
              size="lg"
            >
              <Send className="w-5 h-5 mr-2" />
              Subscribe @pythonnews_uzbekistan
              <ExternalLink className="w-4 h-4 ml-2 opacity-70" />
            </Button>
          </div>
          
          <div className="text-sm text-blue-100 bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/10 shadow-lg max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-1 mb-3">
              <Star className="w-5 h-5 text-yellow-300" fill="currentColor" />
              <Star className="w-5 h-5 text-yellow-300" fill="currentColor" />
              <Star className="w-5 h-5 text-yellow-300" fill="currentColor" />
              <Star className="w-5 h-5 text-yellow-300" fill="currentColor" />
              <Star className="w-5 h-5 text-yellow-300" fill="currentColor" />
            </div>
            <p className="font-medium text-lg mb-2">🚀 Join our community!</p>
            <p>Get technical support, updates, and connect with fellow learners in our Telegram channels. Our dedicated team is ready to assist you 24/7.</p>
          </div>

          <div className="text-xs text-blue-200 opacity-80">
            © 2025 TIMT - Test Intelligence Management Tool. All rights reserved.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactSection;
