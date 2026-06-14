import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoadingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-6 tracking-wide">
          AI Estimation System
        </h1>

        <div className="flex justify-center items-center gap-2 mb-6">
          <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></span>
          <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:150ms]"></span>
          <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:300ms]"></span>
        </div>

        {/* SUB TEXT */}
        <p className="text-gray-400 text-sm animate-pulse">
          Initializing AI Engine...
        </p>

        <div className="mt-6 w-64 h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-blue-500 animate-loadingBar"></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingPage;
