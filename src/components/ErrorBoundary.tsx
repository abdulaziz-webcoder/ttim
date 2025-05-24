
import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md p-8 bg-white/90 backdrop-blur-lg shadow-xl border border-white/30 rounded-2xl text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Xatolik yuz berdi</h2>
              <p className="text-gray-600 mb-6">
                Dasturda xatolik yuzaga keldi. Qayta yuklashni sinab ko'ring.
              </p>
              <div className="space-y-2">
                <Button 
                  onClick={() => window.location.reload()} 
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                >
                  <RefreshCw className="h-4 w-4" />
                  Sahifani qayta yuklash
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    localStorage.removeItem("jwt_token");
                    localStorage.removeItem("refresh_token");
                    localStorage.removeItem("token_expiry");
                    window.location.href = "/login";
                  }}
                  className="w-full"
                >
                  Login sahifasiga qaytish
                </Button>
              </div>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
